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
✅ The `intent_events` table is already set up in your TEST database.
The table structure includes: `id` (uuid), `event_type`, `page`, `created_at`, `referrer`, and `user_agent` columns.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- **Minimal hero section** - Clear problem statement and research intent
- **Single intent button** - "Ik zou dit gebruiken" tracks interest clicks
- **Simple explanation** - One-line description of the idea
- **Trust section** - Transparent about being a test page
- **Intent tracking** - All clicks stored in Supabase `intent_events` table
- **Mobile-first design** - Clean, minimal, lots of white space

## Intent Tracking

The page tracks user interest through a single button click:
- **Event type**: `interest_click`
- **Page**: `bonnenhulp_landing`
- **Data captured**: timestamp, referrer, user_agent

After clicking, users see: "Dank je! We bouwen dit alleen als genoeg mensen dit willen."

## Viewing Intent Data

Query the `intent_events` table in Supabase to see:
- Total interest clicks
- Click timestamps
- Referrer sources
- User agents

## Design Philosophy

This page is designed for **signal testing**, not product building:
- No WhatsApp integration
- No email collection
- No manual handling
- One clear button
- Honest messaging about being a test

The goal is to measure if the problem is big enough to solve, not to build a product yet.
