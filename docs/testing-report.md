# Testing Report

**Project:** Krister Lloyd Magalso — Quietly Technical Portfolio  
**Verification date:** 2026-10-25  
**Workspace:** Node.js 20.20.2, Next.js 16.4.3, Playwright Chromium  
**Overall local result:** passed after corrections  
**Deployment result:** not attempted

## 1. Final quality gate

The final application gate used:

```bash
npm run check
```

This runs Prettier verification, ESLint, strict TypeScript, Vitest, and the optimized production build.

| Check                   | Final result                                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------------------------- |
| `npm run format:check`  | Passed; all matched files use Prettier style                                                            |
| `npm run lint`          | Passed with no reported errors or warnings                                                              |
| `npm run typecheck`     | Passed with `tsc --noEmit` and strict TypeScript                                                        |
| `npm test`              | Passed: 6 test files, 30 tests                                                                          |
| `npm run build`         | Passed; optimized Next.js build compiled, type-checked, and generated 13 framework routes/files         |
| `npm run test:e2e`      | Passed: 33 Playwright tests                                                                             |
| Production-server smoke | Passed for all 8 primary routes, hydration, theme, filters, and expected unavailable-storage form state |

The production build identifies the primary content routes as static/prerendered and `/api/contact` as dynamic/server-rendered on demand.

Vitest emits a non-failing Vite configuration-loader warning about ESM syntax in `vitest.config.ts`. It does not affect the test result; the warning is recorded rather than hidden.

## 2. Unit and integration coverage

**Result:** 30/30 passed.

Covered behavior includes:

- Contact normalization, valid input, invalid email, short fields, maximum lengths, null characters, and timestamps.
- Same-origin, forwarded-host, missing-origin, cross-origin, and malformed-origin handling.
- Rate-limit allowance, boundary rejection, retry delay, expiration, and independent keys.
- JSONL persistence, complete record shape, UUID/timestamp creation, and serialized concurrent writes.
- Contact API success after persistence, validation errors, malformed JSON, unsupported content type, oversized bodies, cross-origin requests, timing/honeypot rejection, rate limiting, storage failure, and production-unavailable behavior.
- Employment-date invariants, project scope, reviewed commit/release URLs, required assets, eight real capture paths with alt/caption metadata, privacy-redaction disclosure, and separation of direct contact details from the shared profile module.

No real personal messages or credentials are used in fixtures. Test addresses use reserved `.test` examples.

## 3. Browser and interaction coverage

**Result:** 33/33 passed using Playwright Chromium against the local Next.js development server.

The suite covers:

- One visible page-level H1 on every primary route.
- Metadata-related routes, robots, sitemap, social image, launcher asset, PDF response, and not-found page.
- All eight owner-supplied captures, the redacted-ledger label, absence of media-placeholder copy, and a working full-size WebP response.
- Project filters, result counts, verified results, and empty-state recovery.
- Mobile navigation opening, Escape dismissal, and routing.
- Theme switching and persistence after reload.
- Reduced-motion scrolling/reveal behavior.
- Skip-link keyboard destination.
- Contact client/server validation and a real development JSONL insert before success feedback.
- Copy-email confirmation.
- Print layout retaining the resume identity while removing site chrome.
- Mobile navigation with JavaScript disabled.
- Responsive overflow checks on every primary route at 320, 375, 768, 1024, and 1440px: 40 route/width combinations.
- Automated accessibility scans described below.

Each contact browser submission uses an isolated test rate-limit key so repeated suites do not disable or exhaust the real abuse-control path.

## 4. Automated accessibility checks

**Result:** 16 scans passed with zero axe-reported violations in the tested stable states.

Scans cover all eight primary routes in both dark and light themes. Tags include WCAG 2 A/AA, WCAG 2.1 A/AA, and WCAG 2.2 AA rules supported by axe. The scanner waits beyond the 650ms reveal duration so it evaluates stable content rather than a partially transparent animation frame.

Additional automated checks exercise keyboard focus, mobile disclosure semantics, form labels/errors, reduced motion, no-JavaScript navigation, target sizing, and print visibility.

Issues found and corrected during verification included:

- Resume contact links initially measured 23.4px high; their targets now exceed the 24px minimum.
- The global print selector would have hidden the resume's own header; it now removes only site-level chrome.
- The case-study title overflowed at 320px; its small-screen type scale now fits.

**Limit:** these are automated Chromium checks, not a screen-reader evaluation, manual audit across assistive technologies, or WCAG certification.

## 5. Visual review

The route review covered all eight routes at 1440×900 and 375×812, the 320px case-study hero, light-theme Home, and full-page Home composition. After the media integration, additional review covered the real POS Home hero and the complete eight-capture gallery on desktop, plus media and the redacted ledger on mobile.

The review confirmed the intended editorial hierarchy, readable mobile stacking, real launcher imagery, and clear capture captions. All eight application screens retain their aspect ratio; the ledger masks remain visible in the published asset. The small “N” indicator visible in some development screenshots is Next.js development tooling, not production site content.

Browser automation supplies keyboard-event and layout checks; this report does not claim a formal manual device-lab review.

## 6. Production-server smoke check

The optimized server was started separately with `next start` on a local test port. A Playwright smoke script verified:

- HTTP 200 and one H1 for all eight primary routes.
- HTTP 200 with `image/webp` for all eight capture assets, plus successful lazy-loaded rendering of all eight gallery images.
- Client hydration through theme switching and project filtering.
- A filled contact form returning HTTP 503 and showing the truthful storage-unavailable message when no production database was configured.

The 503/unavailable behavior is expected for that database-less smoke environment. It is not reported as a successful contact submission. The smoke server was stopped afterward.

## 7. Asset and data checks

Validated locally:

- Resume PDF: 1 page, 2,830 extracted text characters, valid `%PDF` response through the site.
- Social card: 1200×630 PNG.
- SariSariPOS launcher: genuine 192×192 PNG from the reviewed repository.
- Eight owner-supplied WebP captures: each 1080×2396, optimized from the supplied photo-documentation DOCX; no generated interface is presented as a capture.
- Suki Ledger: customer names and phone numbers masked before publication; the redacted derivative was visually inspected and the unredacted source is outside `public/`.
- Personal-data source scan: direct contact details occur only in `content/contact.ts` and the intended resume generator, not tests or general documentation.
- Only `.env.example` exists at the project root; no local credential file was created.

## 8. Corrections made during verification

The quality passes led to real fixes rather than result suppression:

- Strict project typing, React key composition, Postgres notice callback, render-time ref purity, and an unused import.
- Playwright host consistency so development hydration runs reliably; development preview origins are explicitly configured.
- Small-screen title sizing and resume target sizing.
- Print stylesheet scope.
- Accessibility scan timing around reveal motion.
- Browser-test isolation from the persistent development rate-limit window.
- Oversized-body fixture corrected to exceed the actual 16,000-byte limit.

## 9. Not performed or externally blocked

The following remain unperformed and are not claimed as successful:

- SariSariPOS Android compilation, JVM tests, emulator/device tests, migration execution, assistant evaluation, or external API verification. The workspace lacked the required JDK 17/Android SDK setup.
- Independent reproduction of the owner captures, checkout/payment or barcode-scanner capture, backup/restore verification, or confirmation that capture v1.2 matches the separately reviewed v1.0.0 source snapshot.
- PostgreSQL migration or insertion against an external authorized database.
- Deployment, live-domain metadata verification, or production persistence verification on a public host.
- Email delivery; no email provider is integrated.
- Lighthouse, lab performance timing, or real-user Core Web Vitals measurement.
- Firefox, WebKit/Safari, native Android browser, screen-reader, or formal WCAG audit coverage.
- Global/serverless rate-limit consistency; the included limiter is intentionally best-effort and process-local.

## 10. Reproduce locally

```bash
npm ci
npm run check
npx playwright install --with-deps chromium
npm run test:e2e
```

For deployment-specific verification, follow `docs/deployment-guide.md`. Do not run submission tests against a real production inbox without authorization.
