// Article Feed Loader
document.addEventListener('DOMContentLoaded', async function() {
    const feedContainer = document.getElementById('article-feed');
    
    if (!feedContainer) return;
    
    try {
        const articles = await window.pulaDB.fetchArticles();
        renderArticles(articles, feedContainer);
    } catch (error) {
        console.error('Error loading articles:', error);
        feedContainer.innerHTML = `
            <div class="error-state">
                <p>⚠️ Unable to load articles. Please try again later.</p>
                <p style="font-size: 14px; margin-top: 10px;">Using offline data if available.</p>
            </div>
        `;
    }
});

function renderArticles(articles, container) {
    if (!articles || articles.length === 0) {
        container.innerHTML = `
            <div class="error-state">
                <p>📭 No articles available yet.</p>
                <p style="font-size: 14px; margin-top: 10px;">Check back soon for Botswana economic insights.</p>
            </div>
        `;
        return;
    }
    
    const articlesHTML = articles.map(article => `
        <article class="article-card">
            <div class="article-category">${escapeHtml(article.category || 'General')}</div>
            <div class="article-content">
                <h3 class="article-title">${escapeHtml(article.title)}</h3>
                <p class="article-summary">${escapeHtml(article.summary)}</p>
                <div class="article-meta">
                    <span class="article-source">${escapeHtml(article.source || 'Pula Market')}</span>
                    <time datetime="${article.published_at}">${formatDate(article.published_at)}</time>
                </div>
            </div>
        </article>
    `).join('');
    
    container.innerHTML = articlesHTML;
}

function formatDate(dateString) {
    if (!dateString) return 'Recently';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}
