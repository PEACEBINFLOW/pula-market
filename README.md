# 🇧🇼 Pula Market — Botswana Economic Intelligence Hub

**SAGEWORKS AI** — Real-time Botswana economic data, market intelligence, and SME tracking.

## 🚀 Live Site

**[https://peacebinflow.github.io/pula-market](https://peacebinflow.github.io/pula-market)**

## 📊 Features

- **Economic Intelligence Feed** — Curated articles from BITC, IFC, and Botswana sources
- **Market Data Dashboard** — BWP/USD, inflation, GDP growth, business confidence
- **SME Tracker** — Live small business daily logs from field data
- **Supabase Backend** — Real-time PostgreSQL database
- **Offline Fallback** — Works when database is unreachable

## 🗄️ Database (Supabase)

### Tables
| Table | Description |
|-------|-------------|
| `articles` | Economic intelligence articles |
| `market_data` | BSE market metrics |
| `sme_daily_log` | Daily SME operations logs |
| `data_sources` | Source registry |
| `companies` | Company directory |

### Schema
See `supabase-schema.sql` for the complete database setup.

## 📁 Project Structure
pula-market/
├── index.html # Complete application (HTML + CSS + JS)
├── .gitignore
├── README.md
└── supabase-schema.sql # Database setup script

text

## 🔧 Local Development

```bash
git clone https://github.com/PeacebinfLow/pula-market.git
cd pula-market
open index.html
