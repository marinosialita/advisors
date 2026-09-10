# SC Advisors deployment

## Current status
The supplied React/Vite website has been imported without redesigning it.
Cloudflare Pages SPA fallback and basic response headers have been added.
Source is uploaded to https://github.com/marinosialita/advisors. No Supabase backend or Cloudflare deployment has been created.
Sites registration was rejected because the account hosting usage limit was reached.

## GitHub and Cloudflare Pages
Create a dedicated SC Advisors repository and upload this app directory as its root.
In Cloudflare Pages connect that repository, select the intended production branch,
use build command `npm run build`, and set output directory to `dist`.
Use Node.js 22. Install reproducibly using the supplied package-lock.json.
Connect the intended domain only after confirming ownership and the target website.
Do not replace DNS records for an existing website without confirming the cutover.

## Features requiring completion before public launch
- Contact and career forms currently only validate locally and display success;
  they do not send or store submissions. Connect a server endpoint before launch.
- The chat widget currently requests a visitor API key and calls OpenAI from the
  browser. Replace that with a server-side endpoint and server-held secret before
  offering a company-funded chatbot. Never put a secret key in VITE_* variables.
- Select or create a dedicated Supabase project for this website. No existing
  projects have been changed. Enable RLS, restrict access to submissions, and add
  server-side validation and abuse protection when implementing forms.
- Verify final domain references, sitemap, contact details and legal/tax content
  with SC Advisors before public release. Content has not been legally reviewed.

## Original source
The original design, assets, routes and English/Russian content are retained.

## Validation limitation
Dependency installation encountered HTTP 502 errors from the package mirror; no successful production build or browser test has been completed.

Cloudflare reference: https://developers.cloudflare.com/pages/framework-guides/deploy-a-vite3-project/
