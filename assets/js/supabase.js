// Supabase Configuration
const SUPABASE_URL = 'https://sjladuwbjctoxeuxcfmg.supabase.co';
const SUPABASE_KEY = 'PASTE_YOUR_NEW_ANON_KEY_HERE';

let supabase = null;

// Initialize Supabase
try {
    if (SUPABASE_KEY !== 'PASTE_YOUR_NEW_ANON_KEY_HERE') {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        console.log('✅ Supabase client initialized');
    } else {
        console.warn('⚠️ Supabase key not configured — using fallback data');
    }
} catch (error) {
    console.error('❌ Supabase initialization failed:', error.message);
}

// Generic fetch with fallback
async function fetchWithFallback(endpoint, fallbackData) {
    if (!supabase) {
        console.log('📦 Using fallback data (no Supabase connection)');
        return fallbackData;
    }
    
    try {
        const { data, error } = await endpoint;
        
        if (error) {
            console.error('❌ Supabase query error:', error.message);
            return fallbackData;
        }
        
        if (!data || data.length === 0) {
            console.warn('⚠️ No data returned from Supabase, using fallback');
            return fallbackData;
        }
        
        console.log(`✅ Supabase connected. ${Array.isArray(data) ? 'Items: ' + data.length : 'Data retrieved'}`);
        return data;
    } catch (error) {
        console.error('❌ Fetch error:', error.message);
        return fallbackData;
    }
}

// Export for use in other modules
window.pulaDB = {
    fetchArticles: async () => {
        return fetchWithFallback(
            supabase
                .from('articles')
                .select('*')
                .order('published_at', { ascending: false })
                .limit(10),
            await fetchFallbackArticles()
        );
    },
    
    fetchMarketData: async () => {
        return fetchWithFallback(
            supabase
                .from('market_data')
                .select('*')
                .order('id', { ascending: true }),
            getFallbackMarketData()
        );
    },
    
    fetchSMEData: async () => {
        return fetchWithFallback(
            supabase
                .from('sme_data')
                .select('*')
                .order('sector', { ascending: true }),
            getFallbackSMEData()
        );
    }
};

// Fallback data loaders
async function fetchFallbackArticles() {
    try {
        const response = await fetch('../../data/seed/articles.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to load fallback articles:', error);
        return [];
    }
}

function getFallbackMarketData() {
    return [
        {
            metric_name: 'BWP/USD',
            value: 0.073,
            change_percent: 0.45,
            updated_at: new Date().toISOString()
        },
        {
            metric_name: 'Inflation Rate',
            value: 3.8,
            change_percent: -0.2,
            updated_at: new Date().toISOString()
        },
        {
            metric_name: 'GDP Growth',
            value: 4.2,
            change_percent: 0.8,
            updated_at: new Date().toISOString()
        },
        {
            metric_name: 'Business Confidence',
            value: 72.5,
            change_percent: 2.1,
            updated_at: new Date().toISOString()
        }
    ];
}

function getFallbackSMEData() {
    return [
        { sector: 'Agriculture', active_businesses: 2450, growth_rate: 3.2 },
        { sector: 'Manufacturing', active_businesses: 1890, growth_rate: 4.5 },
        { sector: 'Technology', active_businesses: 980, growth_rate: 12.8 },
        { sector: 'Retail', active_businesses: 4500, growth_rate: 2.1 },
        { sector: 'Tourism', active_businesses: 1650, growth_rate: -1.5 },
        { sector: 'Construction', active_businesses: 2100, growth_rate: 5.7 }
    ];
}
