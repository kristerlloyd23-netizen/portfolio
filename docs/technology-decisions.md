# Technology Decisions

**Decision date:** 2026-10-25  
**Architecture:** Next.js App Router with typed local project content and a persisted contact-message backend

## 1. Selected runtime and dependencies

Versions are pinned from npm metadata checked on 2026-10-25. They describe this implementation, not a claim that each is the newest version for every ecosystem.

| Area                           | Selection                                            |
| ------------------------------ | ---------------------------------------------------- |
| Runtime                        | Node.js 20.20.2 workspace; Node.js >=20.9 required   |
| Framework                      | Next.js 16.4.3, App Router                           |
| UI                             | React 19.3.1 / React DOM 19.3.1                      |
| Language                       | TypeScript 5.9.3 with `strict: true`                 |
| Styling                        | Global CSS design tokens + CSS Modules               |
| Fonts                          | `next/font/google`: Newsreader, Inter, IBM Plex Mono |
| Validation                     | Zod 4.6.7                                            |
| PostgreSQL access              | Postgres.js 3.4.9                                    |
| Unit/integration tests         | Vitest 4.1.12                                        |
| Browser tests                  | Playwright 1.64.1                                    |
| Automated accessibility checks | `@axe-core/playwright` 4.13.0                        |
| Lint                           | ESLint 10.13.0 + `eslint-config-next` 16.4.3         |
| Formatting                     | Prettier 3.9.10                                      |

TypeScript 5.9.3 is intentionally retained instead of adopting the newly available TypeScript 7 line, minimizing avoidable compiler/plugin risk. Vitest 4.1.12 is selected because the initially queried Vitest 5.0.5 requires Node.js 22.12 or newer, while this workspace and deployment baseline use Node.js 20. The axe adapter is likewise pinned at 4.13.0 because 4.14.0 declares the same newer Node.js baseline. ESLint uses the supported 10.x line, which Next.js 16.4 documents as compatible; some transitive plugins still publish older peer ranges, so the real ESLint run is treated as the compatibility gate rather than relying on resolver warnings alone. ESLint is run directly because Next.js 16 no longer provides the old `next lint` workflow.

## 2. Why Next.js App Router

Next.js provides one deployable application for static content, interactive React islands, the contact Route Handler, metadata, sitemap/robots files, image/font handling, and production builds.

Compared alternatives:

- **Vite React SPA:** strong client tooling, but a separate server would be needed for the same integrated contact/metadata architecture.
- **Astro:** attractive for content sites, but the requested React/Next.js experience and integrated Route Handler make Next.js a better fit for demonstrating this portfolio's web stack.
- **Separate frontend/backend services:** unnecessary operational complexity for one contact form.

Server Components remain the default. Client Components are limited to navigation, theme state, reveal behavior, project filtering, copy-email, print controls, and the contact form.

## 3. Why tokens + CSS Modules

The visual system is small and highly custom. CSS variables centralize color, type, spacing, and motion; CSS Modules keep component selectors local. This avoids a utility-class learning layer and a component-library visual signature.

Tailwind CSS remains a reasonable alternative, but it is not required to produce a maintainable design system. No Tailwind classes or configuration will be included unnecessarily.

## 4. Content architecture

Project, skill, experience, and resume content live in typed TypeScript modules.

Reasons:

- Single author and small content volume.
- Git history provides review and rollback.
- No public editor or authentication attack surface.
- Build-time type checks catch malformed content.
- No database is needed to claim that the site is full-stack; the contact workflow supplies the real persistence requirement.

A CMS can be introduced later only if non-technical editing becomes a real requirement.

## 5. Contact backend

### Request flow

1. Browser submits JSON to `/api/contact`.
2. Server checks content type/body size and, when supplied, same-origin headers.
3. A shared Zod schema normalizes and validates every field.
4. Honeypot and minimum-completion-time checks reject obvious abuse.
5. A transient fixed-window rate limiter provides best-effort abuse resistance.
6. The selected store persists the message.
7. Only a successful insert returns HTTP 201 and a reference UUID.

The UI never displays “sent” for a validation error, unavailable database, rate limit, or failed insert. Its success copy says **saved**, not emailed.

### Storage drivers

- **PostgreSQL (production):** selected with `DATABASE_URL` or `CONTACT_STORAGE=postgres`. Inserts use Postgres.js tagged parameters. A SQL migration defines constraints and indexes.
- **Local JSONL file (development/test only):** explicit development convenience, gitignored and outside source fixtures. It is not represented as durable serverless production storage.
- **Unavailable:** production without a configured database returns a truthful 503 response and directs the visitor to the email link.

### ContactMessage model

- `id` — application-generated UUID.
- `name` — 2–80 characters after normalization.
- `email` — validated, trimmed, lowercased, maximum 254 characters.
- `subject` — 2–120 characters.
- `message` — 20–4000 characters.
- `status` — `new`, `read`, or `archived`; defaults to `new`.
- `created_at` — UTC timestamp.

No project table or admin dashboard is created.

## 6. Security decisions

- Server-only database credentials and environment variables.
- `.env*` ignored except `.env.example`; no real secret in examples.
- Parameterized PostgreSQL inserts.
- Strict input lengths, email validation, normalization, and output-safe React rendering.
- Request-size limit and malformed-JSON handling.
- Honeypot, completion-time check, and best-effort rate limiting.
- No message-body or unnecessary personal-data logging.
- Generic client errors; internal details stay out of responses.
- Security headers that do not block the required iframe-based workspace preview.
- No authentication UI, public registration, or privileged inbox API.
- No third-party CAPTCHA or email key in the initial release.

Limitations to document:

- In-memory rate limiting is not globally consistent across serverless instances. A managed edge/database rate limit is recommended before significant public traffic.
- Forwarded IP headers depend on the hosting platform's trusted-proxy behavior.
- A production inbox needs an authenticated reading/retention process; this release stores messages but does not expose an admin reader.
- Database transport requirements depend on the provider; use a trusted TLS-enabled connection string and do not disable certificate verification.

## 7. Resume strategy

The resume page contains useful semantic content even without a download. A real PDF is generated and placed under `public/resume/`; the link is enabled only when that file exists. Build checks verify the file rather than rendering a fake download.

## 8. SEO and sharing

- Route-specific titles/descriptions and canonical paths.
- `metadataBase` comes from `NEXT_PUBLIC_SITE_URL`; local fallback is explicitly a development value, not a fabricated domain.
- Static Open Graph image with real portfolio copy.
- `sitemap.ts`, `robots.ts`, valid Person structured data, and semantic HTML.
- No domain, search ranking, deployed URL, or social metric is invented.

## 9. Testing architecture

- **Vitest:** schema normalization/limits, rate-limit boundaries, typed content invariants, file-store persistence, and selected route errors.
- **Playwright:** all primary routes, project filters, mobile disclosure, theme toggle, copy feedback, contact validation/success, keyboard paths, reduced motion, and responsive overflow at 320/375/768/1024/1440.
- **axe:** WCAG-tagged automated checks on every primary route in both themes after reveal motion settles.
- **Quality gates:** Prettier check, ESLint, TypeScript, unit tests, production build.
- **Manual checks:** keyboard-only smoke path and visual review; automated results are not presented as a complete accessibility audit.

## 10. Deployment decision

**Primary documented target:** Netlify Free + Neon Free.

Reasons: official Next.js App Router support, Git deployment, a free credit-based plan, and documented allowance for commercial projects. This is more flexible than Vercel Hobby if freelance inquiries become commercial activity.

**Alternative:** Vercel Hobby + Neon Free only for qualifying personal, non-commercial use.

No deployment is attempted without account access and authorization. Current plan terms and Next.js runtime compatibility must be rechecked at deployment time.
