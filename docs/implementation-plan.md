# Implementation Plan

**Created:** 2026-10-25  
**Project root:** `/home/user/portfolio`  
**Completion update:** application, local verification, preview, and handoff complete. Production deployment was intentionally not attempted; external database, Android runtime, genuine screenshot, and live-host verification limits remain explicit in the testing report.

## 1. Delivery sequence

### Phase 1 — Research and evidence

- [x] Inspect the existing workspace without overwriting resumes.
- [x] Research design, accessibility, performance, framework, testing, database, and deployment sources.
- [x] Inspect the public SariSariPOS repository and release metadata.
- [x] Identify missing screenshots and Android runtime-test blockers.
- [x] Document rejected alternatives and unverified claims.

### Phase 2 — Architecture

- [x] Create strict Next.js/TypeScript project configuration.
- [x] Define typed profile, project, skill, and experience content.
- [x] Define contact storage interface, PostgreSQL schema, and local development driver.
- [x] Establish route map, security plan, and testing plan.

### Phase 3 — Design system

- [x] Implement dark/light tokens and validated text/control pairs.
- [x] Configure optimized editorial, body, and monospace fonts.
- [x] Build shared buttons, labels, section headings, evidence badges, project cards, accessible screenshot frames, and architecture graphics.
- [x] Implement responsive navigation, theme toggle, focus states, and reduced-motion behavior.

### Phase 4 — Pages and interactions

- [x] Home.
- [x] Filterable Projects gallery.
- [x] Detailed SariSariPOS case study.
- [x] About, Skills, Experience, Resume, and Contact pages.
- [x] Real not-found, loading, and error states.
- [x] Metadata, Open Graph image, sitemap, robots, and structured data.

### Phase 5 — Backend

- [x] Shared client/server contact schema.
- [x] Server-only normalization, validation, origin/size checks, anti-spam checks, and rate limiting.
- [x] Parameterized PostgreSQL insert and migration runner.
- [x] Development-only JSONL persistence and unavailable-production behavior.
- [x] Truthful pending, success, and error feedback.

### Phase 6 — Assets

- [x] Copy and document the real SariSariPOS launcher icon.
- [x] Publish eight owner-supplied captures with evidence-qualified captions and approved privacy redaction; never fabricate app UI evidence.
- [x] Generate a real downloadable resume PDF.
- [x] Create a static social-sharing image and favicon.
- [x] Write real-screenshot capture/replacement instructions.

### Phase 7 — Verification

- [x] Format and lint checks.
- [x] Strict TypeScript check.
- [x] Unit/integration tests.
- [x] Production build.
- [x] Playwright browser tests at required widths.
- [x] Keyboard and reduced-motion checks.
- [x] Automated axe checks and documented limitations.
- [x] Secret/fixture scan and final content-evidence review.

### Phase 8 — Handoff and deployment

- [x] Complete README, testing report, deployment guide, asset instructions, and environment example.
- [x] Start a live workspace preview and verify critical flows.
- [x] Deploy only if authorized account access exists; otherwise record the blocker and exact deployment steps.

## 2. Planned route map

| Route                   | Purpose                                         |
| ----------------------- | ----------------------------------------------- |
| `/`                     | Positioning and flagship project                |
| `/projects`             | Verified, filterable project gallery            |
| `/projects/sarisaripos` | Flagship technical case study                   |
| `/about`                | Background, approach, and portfolio build notes |
| `/skills`               | Evidence-separated technical skills             |
| `/experience`           | Work history, education, and training           |
| `/contact`              | Direct contact and persisted form               |
| `/resume`               | Semantic resume and real PDF download           |
| `/api/contact`          | Server-validated contact persistence            |
| `/sitemap.xml`          | Search discovery                                |
| `/robots.txt`           | Crawler directives and sitemap                  |

## 3. Planned source structure

```text
app/                    App Router pages and API route
components/             Shared server/client UI
content/                Typed professional and project content
lib/                    Validation, storage, rate limiting, utilities
public/                 Real assets and generated resume/social files
db/migrations/          PostgreSQL migrations
scripts/                Migration and asset utilities
tests/                  Vitest and Playwright tests
docs/                   Research, architecture, testing, deployment, assets
```

CSS Modules live beside their components/pages; global tokens and base semantics live in `app/globals.css`.

## 4. Evidence model for SariSariPOS

The case study uses four explicit states:

1. **Source-supported:** implementation exists in the inspected repository/configuration.
2. **Tested:** only tests actually executed with recorded results; none are assumed.
3. **Runtime verification pending:** behavior not exercised end to end.
4. **Planned:** future work, not current capability.

The source review commit and inspection date appear near the testing section. README claims are not treated as independent runtime proof.

## 5. Contact test matrix

| Case                                 | Expected result                           |
| ------------------------------------ | ----------------------------------------- |
| Valid message with configured store  | HTTP 201; UUID returned; record persisted |
| Invalid email/short fields           | HTTP 400; no insert                       |
| Overlong fields                      | HTTP 400; no insert                       |
| Malformed JSON or wrong content type | HTTP 400/415; no insert                   |
| Honeypot filled                      | Rejected; no success UI                   |
| Excess requests                      | HTTP 429; no insert                       |
| Production without database          | HTTP 503; direct email remains available  |
| Database insert failure              | Generic HTTP 500; no success UI           |

## 6. Responsive and accessibility matrix

Test 320, 375, 768, 1024, and 1440px widths for overflow and navigation behavior. Exercise keyboard navigation, visible focus, mobile disclosure, theme switching, filter controls, copy feedback, print layout, and form errors. Emulate reduced motion. Run axe on every primary route in both themes without treating the scans as formal certification.

## 7. Performance budget

Initial budget, to be measured rather than claimed:

- No heavy hero media or 3D bundle.
- Keep route-specific client JavaScript limited to actual interactions.
- Self-hosted optimized font subsets and sensible fallbacks.
- Reserve media dimensions and avoid layout-shifting late content.
- Use responsive modern image formats when real screenshots arrive.
- Record production-bundle/build observations and any actual Lighthouse measurements separately.

## 8. Deployment gates

Deployment is allowed only after:

- Production build and automated checks pass.
- Real `NEXT_PUBLIC_SITE_URL` and `DATABASE_URL` are configured in the host.
- Migration succeeds against the intended database.
- Contact insert is verified in that deployed environment.
- Canonical/OG/sitemap URLs use the real deployment URL.
- Hosting terms fit the site's actual personal/commercial use.
- A secure inbox-reading and retention process is documented.

If credentials or assets are unavailable, the handoff must state exactly what remains blocked.
