// SME Tracker Loader
document.addEventListener('DOMContentLoaded', async function() {
    const smeContainer = document.getElementById('sme-dashboard');
    if (!smeContainer) return;
    
    try {
        const smeData = await window.pulaDB.fetchSMEData();
        renderSMEDashboard(smeData, smeContainer);
    } catch (error) {
        console.error('Error loading SME data:', error);
        smeContainer.innerHTML = `
            <div class="error-state">
                <p>⚠️ Unable to load SME data. Please try again later.</p>
            </div>
        `;
    }
});

function renderSMEDashboard(smeData, container) {
    if (!smeData || smeData.length === 0) {
        container.innerHTML = `
            <div class="error-state">
                <p>📊 No SME data available yet.</p>
                <p style="font-size: 14px; margin-top: 10px;">Data is being collected from Botswana business registry.</p>
            </div>
        `;
        return;
    }
    
    const smeHTML = smeData.map(sme => {
        const growthClass = sme.growth_rate >= 0 ? 'positive' : 'negative';
        const growthSymbol = sme.growth_rate >= 0 ? '↑' : '↓';
        
        return `
            <div class="sme-card">
                <h3 class="sme-sector">${escapeHtml(sme.sector)}</h3>
                <div class="sme-stats">
                    <div>
                        <span class="sme-businesses">${sme.active_businesses.toLocaleString()}</span>
                        <p style="font-size: 12px; color: #6C757D; margin-top: 5px;">Active Businesses</p>
                    </div>
                    <div>
                        <span class="sme-growth ${growthClass}">
                            ${growthSymbol} ${Math.abs(sme.growth_rate).toFixed(1)}%
                        </span>
                        <p style="font-size: 12px; color: #6C757D; margin-top: 5px;">YoY Growth</p>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = smeHTML;
}
