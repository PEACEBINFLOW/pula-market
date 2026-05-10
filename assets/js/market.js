// Market Data Loader
document.addEventListener('DOMContentLoaded', async function() {
    const marketSection = document.getElementById('market');
    if (!marketSection) return;
    
    try {
        const marketData = await window.pulaDB.fetchMarketData();
        updateMarketDashboard(marketData);
        
        // Auto-refresh every 5 minutes
        setInterval(async () => {
            const freshData = await window.pulaDB.fetchMarketData();
            updateMarketDashboard(freshData);
        }, 300000);
    } catch (error) {
        console.error('Error loading market data:', error);
        showMarketError();
    }
});

function updateMarketDashboard(marketData) {
    if (!marketData || marketData.length === 0) {
        showMarketError();
        return;
    }
    
    marketData.forEach(metric => {
        updateElement(metric.metric_name, metric);
    });
}

function updateElement(metricName, data) {
    const elementMap = {
        'BWP/USD': 'bwp-usd',
        'Inflation Rate': 'inflation',
        'GDP Growth': 'gdp',
        'Business Confidence': 'confidence'
    };
    
    const elementId = elementMap[metricName];
    if (!elementId) return;
    
    const valueElement = document.getElementById(elementId);
    if (!valueElement) return;
    
    // Format value based on metric type
    const formattedValue = formatMetricValue(metricName, data.value);
    valueElement.textContent = formattedValue;
    
    // Update change indicator
    const changeElement = valueElement.nextElementSibling;
    if (changeElement && data.change_percent !== undefined) {
        const changeClass = data.change_percent >= 0 ? 'positive' : 'negative';
        const changeSymbol = data.change_percent >= 0 ? '▲' : '▼';
        changeElement.className = `metric-change ${changeClass}`;
        changeElement.textContent = `${changeSymbol} ${Math.abs(data.change_percent).toFixed(1)}%`;
    }
    
    // Add update timestamp tooltip
    if (data.updated_at) {
        const updateTime = new Date(data.updated_at);
        valueElement.title = `Last updated: ${updateTime.toLocaleString()}`;
    }
}

function formatMetricValue(metricName, value) {
    switch(metricName) {
        case 'BWP/USD':
            return `P ${value.toFixed(3)}`;
        case 'Inflation Rate':
            return `${value.toFixed(1)}%`;
        case 'GDP Growth':
            return `${value.toFixed(1)}%`;
        case 'Business Confidence':
            return value.toFixed(1);
        default:
            return value.toString();
    }
}

function showMarketError() {
    ['bwp-usd', 'inflation', 'gdp', 'confidence'].forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = 'N/A';
            const changeElement = element.nextElementSibling;
            if (changeElement) {
                changeElement.textContent = 'Data unavailable';
                changeElement.className = 'metric-change';
            }
        }
    });
}
