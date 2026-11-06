# Deployment Guide

**Primary target:** Netlify + Neon PostgreSQL  
**Prepared:** 2026-10-25  
**Current state:** no hosting or database account was accessed, and no deployment was attempted.

Deploy only with the owner's authorization, access to the intended accounts, and a verifiable production database. Do not invent a public URL or treat the workspace preview as production.

## 1. Deployment gates

Before deployment:

- Run `npm run check` and `npm run test:e2e` successfully.
- Confirm the desired Git commit contains the intended resume and public assets.
- Review `docs/testing-report.md` and the explicit limitations in `README.md`.
- Replace `NEXT_PUBLIC_SITE_URL` with the real HTTPS origin after the domain is known.
- Provision PostgreSQL and apply the reviewed migration.
- Establish an authenticated inbox-reading and retention process.
- Recheck current hosting/database plan terms and Next.js runtime support.

## 2. Create and migrate Neon PostgreSQL

1. In the authorized Neon account, create a project/database in an appropriate region.
2. Copy the TLS-enabled connection string into a local, gitignored `.env.local`. Do not paste it into source, tickets, screenshots, browser code, or logs.
3. Configure local migration variables:

   ```dotenv
   DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require
   CONTACT_STORAGE=postgres
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. Review `db/migrations/001_create_contact_messages.sql`.
5. Apply migrations from the project root:

   ```bash
   npm ci
   npm run db:migrate
   ```

6. Expected output identifies `001_create_contact_messages.sql` as applied. Repeating the command should report it as already applied.

The migration creates `contact_messages`, constraints, indexes, and the runner creates `schema_migrations`. The migration was not executed against an external database during local portfolio verification.

## 3. Configure Netlify

1. Push this project to the owner's authorized Git repository.
2. Import that repository into the authorized Netlify account.
3. Keep the supplied build configuration:
   - Build command: `npm run build`
   - Node version: `20`
   - Next.js runtime: Netlify's current automatic Next.js/App Router support
4. Add environment variables in Netlify's protected environment settings:

   | Variable                       | Production value                                    |
   | ------------------------------ | --------------------------------------------------- |
   | `NEXT_PUBLIC_SITE_URL`         | Real canonical HTTPS origin, with no trailing slash |
   | `CONTACT_STORAGE`              | `postgres`                                          |
   | `DATABASE_URL`                 | TLS-enabled Neon connection string; server-only     |
   | `CONTACT_RATE_LIMIT_MAX`       | Optional; default `5`                               |
   | `CONTACT_RATE_LIMIT_WINDOW_MS` | Optional; default `600000`                          |

5. Deploy the selected commit.

`DATABASE_URL` must never use a `NEXT_PUBLIC_` prefix. `NEXT_PUBLIC_SITE_URL` is public metadata and must contain only the origin—not credentials or private paths.

Netlify's Next.js runtime and plan terms can change. Confirm them at deployment time rather than relying on this preparation date.

## 4. Verify the deployed release

Use an authorized browser and database console.

### Public application

- Open `/`, `/projects`, `/projects/sarisaripos`, `/about`, `/skills`, `/experience`, `/contact`, and `/resume`.
- Exercise mobile navigation, theme persistence, project filters, copy feedback, and the PDF download.
- Check keyboard focus and reduced-motion behavior.
- Confirm no unintended horizontal overflow at 320, 375, 768, 1024, and 1440px.
- Confirm `/robots.txt` and `/sitemap.xml` use the real origin.
- Inspect a page's canonical and Open Graph URLs; they must not point to localhost.
- Verify source/release links reach the intended GitHub destinations.
- Confirm the not-found route and form error states remain useful.

### Real contact persistence

1. Submit a clearly identified deployment-test message through the production form.
2. Wait for the HTTP-confirmed success state and copy its UUID reference.
3. In the authenticated Neon console, query only the operational fields needed for verification:

   ```sql
   SELECT id, status, created_at
   FROM contact_messages
   WHERE id = 'PASTE_THE_RETURNED_UUID';
   ```

4. Confirm one matching row. The browser success state alone is not deployment verification.
5. Remove the test record when finished, if authorized:

   ```sql
   DELETE FROM contact_messages
   WHERE id = 'PASTE_THE_RETURNED_UUID';
   ```

6. Separately verify invalid input, cross-origin rejection, and unavailable/over-limit behavior without creating unnecessary real messages.

Do not paste real message bodies or personal data into the testing report.

### Production failure behavior

Temporarily verifying configuration behavior must not disrupt a live form. In a non-production preview, an unavailable store should return HTTP 503 and the UI should direct the visitor to the email link. A failed insert must return HTTP 500, never a success reference.

## 5. Inbox operations and retention

This release deliberately has no public admin reader. Until a protected reader exists:

- Use only the authenticated database console with least-privilege owner access.
- Read new messages through a private operational process; do not create a public `GET` endpoint for them.
- Define a review cadence and retain messages only as long as needed for follow-up.
- Delete or archive records according to the owner's documented retention decision.
- Restrict backups and exports to authorized storage; never commit them to Git.

Email delivery is not implemented. If notifications are added later, persist first, then send, and report persistence and delivery as separate outcomes.

## 6. Abuse-control scaling

The included limiter is process-local and best-effort. Serverless concurrency can create multiple independent limiter windows. Before meaningful public traffic, add a shared managed limiter or durable rate-limit store and review the host's trusted forwarded-IP behavior. Keep the existing schema, size, origin, honeypot, and timing checks; they are complementary controls, not a complete anti-abuse guarantee.

## 7. Rollback

- For an application regression, redeploy the last known-good Netlify build from the authorized dashboard.
- The initial migration is additive. Do not drop `contact_messages` as an application rollback shortcut; that would delete messages.
- Take a database backup before any future destructive migration and test recovery separately.
- Rotate the database credential immediately if it is exposed.

## 8. Alternative hosting

Vercel + Neon is a technically plausible alternative, but Vercel Hobby has personal/non-commercial usage restrictions. Review those terms before using it for freelance or other commercial promotion. The same environment, migration, persistence-verification, and honest-status requirements apply.

## 9. Evidence that remains external

A completed deployment handoff should record the actual deployment URL, Git commit, migration output, verification date, and authorized persistence check. None of those production results exists yet, so this guide does not claim them.
