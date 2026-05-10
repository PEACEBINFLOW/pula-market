# Content Entry Workflow — Pula Market

This guide explains how to add, update, and manage content for the Pula Market platform.

## 📝 Adding New Articles

### Via Supabase Dashboard (Recommended)
1. Go to: https://supabase.com/dashboard/project/sjladuwbjctoxeuxcfmg
2. Navigate to: **Table Editor** → **articles**
3. Click **+ Insert row**
4. Fill in the fields:
   - `title`: Article headline (required)
   - `summary`: 2-3 sentence summary (required)
   - `category`: One of: Economic Growth, Currency Markets, Small Business, Monetary Policy, Investment, Agriculture, Trade, Energy (required)
   - `source`: Publication or source name (optional)
   - `url`: Link to original article (optional)
   - `published_at`: Will auto-fill with current timestamp
5. Click **Save**

### Via Supabase SQL Editor (for bulk imports)
```sql
INSERT INTO articles (title, summary, category, source, published_at)
VALUES 
  ('Article Title Here', 'Summary text here', 'Category Name', 'Source Name', NOW());
