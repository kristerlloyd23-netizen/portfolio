# Krister Lloyd Magalso — Quietly Technical

An editorial, evidence-led portfolio for junior Android/software development opportunities, with IT support as a secondary path. Built with Next.js App Router, React, strict TypeScript, CSS Modules, and a real server-validated contact persistence workflow.

**Current status:** implemented and locally verified. No production deployment has been attempted. Eight owner-supplied SariSariPOS interface captures are included with evidence-qualified captions; independent end-to-end Android verification remains pending.

## Included routes

| Route                         | Purpose                                                                                |
| ----------------------------- | -------------------------------------------------------------------------------------- |
| `/`                           | Positioning, flagship evidence, experience preview, and contact paths                  |
| `/projects`                   | Working category filters, verified project cards, and an honest empty state            |
| `/projects/sarisaripos`       | Eleven-chapter technical case study with evidence levels and limitations               |
| `/about`                      | Background, current direction, and portfolio implementation notes                      |
| `/skills`                     | Android evidence, professional support capabilities, and separate website technologies |
| `/experience`                 | Professional experience, education, and training with supplied dates preserved         |
| `/contact`                    | Direct contact channels and a persisted contact form                                   |
| `/resume`                     | Semantic web resume, print layout, and a real one-page PDF download                    |
| `/api/contact`                | Server-only validation, abuse controls, and contact persistence                        |
| `/sitemap.xml`, `/robots.txt` | Search discovery built from the configured canonical origin                            |

## Technology

- Node.js 20.9+; developed with Node 20.20.2
- Next.js 16.4.3 App Router and React 19.3.1
- Strict TypeScript 5.9.3
- Zod 4 for shared contact validation
- PostgreSQL through Postgres.js for production contact storage
- Development-only JSONL contact storage
- Vitest, Playwright, and axe for verification
- Newsreader, Inter, and IBM Plex Mono through `next/font`

These web technologies describe this website implementation. They are not presented as earlier professional employment skills.

## Run locally

1. Install Node.js 20.9 or newer. The repository includes `.nvmrc`.
2. Install dependencies:

   ```bash
   npm ci
   ```

3. Create `.env.local` with the local-only storage driver:

   ```dotenv
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   CONTACT_STORAGE=file
   CONTACT_DATA_DIR=.data
   ```

4. Start the application:

   ```bash
   npm run dev
   ```

5. Open `http://localhost:3000`.

Local form submissions are appended to `.data/contact-messages.jsonl`. The directory is gitignored, created with owner-only directory permissions where supported, and must not be committed or used as production serverless storage. Do not copy real messages into fixtures or logs.

`.env.example` documents both local and production variables. Never commit `.env.local`, database credentials, or exported contact data.

## Quality commands

```bash
npm run format          # Apply Prettier
npm run format:check    # Verify formatting
npm run lint            # ESLint
npm run typecheck       # Strict TypeScript, no emit
npm test                # Vitest unit/integration tests
npm run build           # Optimized production build
npm run check           # Formatting, lint, types, unit tests, and build
```

Browser verification requires Chromium:

```bash
npx playwright install --with-deps chromium
npm run test:e2e
```

The Playwright configuration starts a local development server when needed. To test an existing deployment instead, set `PLAYWRIGHT_BASE_URL` and disable or adapt tests that rely on local file persistence; never run submission tests against a real inbox without authorization.

CI is defined in `.github/workflows/ci.yml` and runs formatting, lint, types, unit/integration tests, production build, and Chromium browser tests.

## Production contact storage

Production intentionally fails closed with HTTP 503 when durable storage is unavailable. It never shows a success message before persistence completes.

1. Provision PostgreSQL.
2. Set server-only `DATABASE_URL` and `CONTACT_STORAGE=postgres`.
3. Review and apply migrations:

   ```bash
   npm run db:migrate
   ```

4. Configure the real public origin:

   ```dotenv
   NEXT_PUBLIC_SITE_URL=https://your-real-origin.example
   CONTACT_STORAGE=postgres
   DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require
   CONTACT_RATE_LIMIT_MAX=5
   CONTACT_RATE_LIMIT_WINDOW_MS=600000
   ```

The migration runner records filenames in `schema_migrations` and applies reviewed SQL files in order. The contact insert itself is parameterized. See `docs/deployment-guide.md` before deploying.

### Contact security and operating limits

- Request origin, content type, declared/actual body size, schema, honeypot, and completion-time checks run on the server.
- The fixed-window rate limiter is best-effort and process-local. It is not globally consistent across serverless instances; use a managed shared limiter before significant public traffic.
- Trusted proxy behavior determines the client IP key on a host.
- There is no public inbox, admin login, registration flow, or decorative authentication.
- There is no email notification in this release. “Saved” means inserted into the configured store, not emailed.
- A site owner needs an authenticated database-reading process and a retention/deletion routine. Do not expose message records through a public endpoint.

## Content maintenance

| Area                                                      | Source                   |
| --------------------------------------------------------- | ------------------------ |
| Profile, education, experience, navigation                | `content/profile.ts`     |
| Direct contact details                                    | `content/contact.ts`     |
| Skills and evidence grouping                              | `content/skills.ts`      |
| Project cards and filters                                 | `content/projects.ts`    |
| SariSariPOS evidence, decisions, limitations, and roadmap | `content/sarisaripos.ts` |
| Shared design tokens and print rules                      | `app/globals.css`        |
| Route metadata helpers                                    | `lib/site.ts`            |

Keep the February–April 2025 employment overlap unchanged unless the owner supplies a correction. Do not add employers, users, metrics, testimonials, awards, runtime outcomes, or feature-completion claims without evidence.

## Assets and resume

- `public/projects/sarisaripos-icon.png` is the genuine launcher asset from the reviewed SariSariPOS repository.
- `public/og.png` is a programmatically composed 1200×630 social card.
- `public/resume/krister-lloyd-magalso-android-developer.pdf` is a real one-page PDF, not a placeholder download.
- `public/projects/sarisaripos/` contains eight owner-supplied application captures converted to WebP. The Suki Ledger derivative masks customer names and phone numbers and is labeled as privacy-redacted.

For real capture and replacement steps, read `docs/screenshot-capture.md`. Asset provenance is in `docs/asset-sources.md`.

The checked-in PDF can be regenerated with Python:

```bash
python -m pip install reportlab pypdf
python scripts/generate_resume.py
```

Review the regenerated PDF visually and keep its claims aligned with the evidence rules before committing it.

## Documentation

- `docs/research-report.md` — sources, evidence review, and rejected alternatives
- `docs/design-direction.md` — editorial art direction, tokens, typography, and accessibility criteria
- `docs/technology-decisions.md` — architecture, backend, security, and deployment decisions
- `docs/implementation-plan.md` — delivery plan and completion status
- `docs/testing-report.md` — executed checks, results, and unperformed verification
- `docs/deployment-guide.md` — authorized Netlify/Neon deployment and verification procedure
- `docs/asset-sources.md` — provenance and licensing notes
- `docs/screenshot-capture.md` — genuine Android screenshot workflow

## Explicit limitations

- SariSariPOS was statically source-reviewed at the commit identified in the case study. Its Android runtime, migrations, external integrations, and assistant behavior were not independently executed here.
- Five break-bulk JUnit tests exist in the Android source, but they were not run in this workspace because JDK 17 and the Android SDK were unavailable. They are not claimed as passing.
- The v1.0.0 APK is debug-signed; it is not evidence of production signing or Play Store release readiness.
- Local export is not cloud synchronization.
- The eight owner-supplied captures are documented as app v1.2 and show sample/test interface state. They are not independent runtime evidence for the separately reviewed source commit, and they do not include checkout/payment or barcode-scanner dialogs.
- PostgreSQL migration and production insertion require an actual authorized database and have not been externally verified in this workspace.
- No Lighthouse, real-user Core Web Vitals, screen-reader, or formal WCAG audit has been performed. Automated axe and keyboard/browser checks do not establish certification.
- No production deployment, analytics, email delivery, or live-domain claim is made.
