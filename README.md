# Bonnenhulp.nl - Intent Measurement Page

A minimal, focused landing page designed to measure user intent for a receipt management solution. This is a validation page, not a finished product.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Backend**: Supabase (for intent tracking only)
- **Language**: TypeScript

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env.local` file with:
```
NEXT_PUBLIC_SUPABASE_URL=https://eaefraghcxvecuondhon.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhZWZyYWdoY3h2ZWN1b25kaG9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxMDI0MTQsImV4cCI6MjA4MjY3ODQxNH0.YMkyLBTGvWsSntnHZno5bWC7zqU9NO5DKmzWtdtg5Dg
```

3. Supabase Setup:
✅ The `intent_feedback` table is already set up in your TEST database with UTM tracking columns.
The table structure includes: `id`, `pain_point`, `would_use`, `current_tool`, `email`, `created_at`, `referrer`, `user_agent`, and UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`).

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- **Minimal hero section** - Clear problem statement and research intent
- **Single intent button** - Opens modal with step-based form
- **Intent tracking** - All responses stored in Supabase `intent_feedback` table
- **UTM tracking** - Automatically captures UTM parameters from URL
- **Mobile-first design** - Clean, minimal, lots of white space

## UTM Tracking

The page automatically tracks UTM parameters from the URL. Use these parameters in your links:

**Example links:**
```
https://bonnenhulp.nl/?utm_source=facebook&utm_medium=social&utm_campaign=test
https://bonnenhulp.nl/?utm_source=linkedin&utm_medium=post&utm_campaign=zzp_community
https://bonnenhulp.nl/?utm_source=email&utm_medium=newsletter&utm_campaign=launch
```

**UTM Parameters tracked:**
- `utm_source` - Where the traffic comes from (facebook, linkedin, email, etc.)
- `utm_medium` - Marketing medium (social, email, cpc, etc.)
- `utm_campaign` - Campaign name
- `utm_term` - Keyword (optional)
- `utm_content` - Content identifier (optional)

All UTM parameters are automatically saved to Supabase when users submit the form.

## Viewing Traffic Data

Query the `intent_feedback` table in Supabase to see:
- Total submissions by source
- Campaign performance
- Traffic sources
- Conversion rates by UTM parameters

**Example SQL queries:**
```sql
-- Count submissions by source
SELECT utm_source, COUNT(*) as count 
FROM intent_feedback 
GROUP BY utm_source;

-- Campaign performance
SELECT utm_campaign, utm_source, COUNT(*) as submissions
FROM intent_feedback 
WHERE utm_campaign IS NOT NULL
GROUP BY utm_campaign, utm_source;
```

## Design Philosophy

This page is designed for **signal testing**, not product building:
- No WhatsApp integration
- No email collection (optional only)
- One clear button
- Honest messaging about being a test

The goal is to measure if the problem is big enough to solve, not to build a product yet.
