
  # Design Startup Landing Page

  This is a code bundle for Design Startup Landing Page. The original project is available at https://www.figma.com/design/zBf2uiax0eLeBZNDqPKkug/Design-Startup-Landing-Page.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Supabase waitlist setup

  This repo now submits the waitlist form to Supabase.

  1. Create a Supabase project.
  2. Open the SQL Editor in Supabase and run the script in `supabase/waitlist_setup.sql`.
  3. Copy `.env.example` to `.env`.
  4. Fill in:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
  5. Run `npm i`.
  6. Run `npm run dev` and submit the form from the landing page.

  ## Where to see signups

  Open `Table Editor -> waitlist_signups` in Supabase to see:
  - who joined
  - which plan they chose
  - what stage they are at
  - their biggest bottleneck
  - when they joined

  ## Useful reporting queries

  The file `supabase/reporting_queries.sql` contains ready-to-run queries for:
  - all signups ordered newest first
  - total interest by plan
  - total interest by startup stage
  - total interest by bottleneck

  ## Notes

  - The site uses the public Supabase anon key in the browser, which is normal for client-side Supabase apps.
  - The SQL script enables Row Level Security and only allows public inserts. It does not expose your waitlist rows for public reads.
  - Duplicate emails are blocked and show a friendly message in the form.
  
