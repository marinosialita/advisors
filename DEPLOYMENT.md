# SC Advisors deployment

Source: https://github.com/marinosialita/advisors
Supabase: SC Advisors Website, Frankfurt, project zhsrvidzhgfmqvxyxohd.

## Cloudflare Workers
Connect the advisors repository, branch main. Build: npm run build. Deploy: npx wrangler deploy.
wrangler.jsonc serves dist as static assets with single-page application routing.
Root directory: repository root. Use Node.js 22.
Cloudflare hosting and custom-domain cutover remain pending.

## Forms
Contact and career forms call the deployed website-api Edge Function.
Submissions are saved in public.website_submissions. Read them in the Supabase
Table Editor with an authorised project account. Website visitors cannot read,
update or delete these records. No email notifications have been configured.
Requests are validated server-side; UUID retries avoid duplicate records.
Global limit: 60 submissions/hour; per-email limit: 5/hour.
Career CVs are links, not uploaded files. Russian contact page uses direct contact links.

## Chatbot
Add OPENAI_API_KEY to the project's Edge Functions > Secrets to activate SCOPY.
Optional OPENAI_MODEL defaults to gpt-4o-mini, preserving the supplied model.
No OpenAI key belongs in browser code or GitHub. The widget displays direct
contact details until the server reports that a key is configured.
Global limits: 10 chat requests/minute and 200/day; maximum 12 messages,
1500 characters/message and 400 output tokens/request.
SCOPY reads the website team directory and biographies, all 24 service descriptions, contact details and both published articles. It can explain published figures with their conditions, but cannot assess individual eligibility.
After editing website content, run node scripts/sync-scopy-knowledge.mjs and redeploy website-api with both index.ts and knowledge.ts.
No chat history is stored in the database. Conversations sent to the chatbot
are processed by OpenAI when activated; update/approve privacy disclosures before launch.

## Security
The frontend contains only the Supabase publishable key. The Edge Function
checks that key itself (verify_jwt=false), validates input, and applies quotas.
Publishable keys are public and are not individual-user authentication.
Database tables have RLS enabled and no visitor grants or policies.
Only server credentials may insert/read submissions or consume quotas.
Review retention needs and periodically remove old rate-limit buckets.
Add CAPTCHA if traffic or abuse requires stronger protection.

## Schema
supabase/schema/website.sql records the initial database schema.
The remote schema is applied through a named Supabase migration.
Original website content has not been legally or factually reviewed.
