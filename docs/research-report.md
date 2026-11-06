# Research Report

**Project:** Krister Lloyd Magalso — Developer Portfolio  
**Research date:** 2026-10-25 (Asia/Manila)  
**Status:** Completed before application implementation

## 1. Scope and method

Research covered current portfolio/design patterns, accessibility and performance guidance, the Next.js App Router stack, contact-form persistence and security, testing, free-tier deployment, and the public SariSariPOS repository.

Evidence is separated into:

- **Established engineering guidance:** official framework, standards, browser, and tooling documentation.
- **Emerging patterns:** useful but optional approaches whose cost depends on context.
- **Subjective visual trends:** direction-setting references, not evidence of hiring or conversion outcomes.
- **Project evidence:** repository files and release metadata inspected directly.

No hiring statistics, conversion claims, popularity measures, or performance results are inferred from design articles.

## 2. Portfolio content and recruiting-oriented UX

Nielsen Norman Group's portfolio guidance recommends scannable case studies that explain process rather than relying only on final screenshots. Its web-writing guidance favors concise, objective, well-structured content. These are UX sources rather than Android-hiring studies, so this project applies them as general reading guidance, not as hiring guarantees.

Recommended structure:

1. Identity, target development focus, and primary project are visible first.
2. Project cards expose the problem, technologies, evidence status, and a clear case-study route.
3. The case study separates implementation evidence, runtime verification, limitations, and future work.
4. Source and release links use their real destinations.
5. Skills used in the Android project, professional support experience, and technologies introduced by this website remain distinct.

Sources:

- [Nielsen Norman Group — 5 Steps to Creating a UX-Design Portfolio](https://www.nngroup.com/articles/ux-design-portfolios/)
- [Nielsen Norman Group — Concise, Scannable, and Objective](https://www.nngroup.com/articles/concise-scannable-and-objective-how-to-write-for-the-web/)

## 3. Visual and interaction research

| Pattern                                         | Classification                        | Decision                              | Reason and risk control                                                                                                                           |
| ----------------------------------------------- | ------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Editorial typography and asymmetric composition | Current visual pattern                | **Adopt**                             | Creates a distinctive hierarchy without requiring heavy media. Body measure and readable sizes remain constraints.                                |
| Dark interface with warm neutrals               | Current visual pattern                | **Adopt with a light alternative**    | Fits the “Quietly Technical” direction. Every text and control token must pass its intended contrast requirement in both themes.                  |
| Bento grids                                     | Established trend commentary          | **Use selectively**                   | Useful for project evidence and skill grouping. Avoid equal, decorative cards and preserve DOM reading order on mobile.                           |
| Cinematic scrolling/scrollytelling              | Emerging/established trend commentary | **Reject full scrollytelling**        | It adds scripting, accessibility, and maintenance costs disproportionate to a small portfolio. Use ordinary scrolling and subtle reveals instead. |
| Purposeful micro-interactions                   | Established UX pattern                | **Adopt**                             | Navigation, filtering, copy feedback, form status, and hover/focus changes communicate state.                                                     |
| Heavy 3D, custom cursors, scroll-jacking        | Subjective visual trend               | **Reject**                            | No clear content benefit; potential mobile, input, and motion-accessibility costs.                                                                |
| Real screenshots and demos                      | Content/evidence practice             | **Adopt; placeholder until supplied** | Generated interfaces must not be presented as product evidence.                                                                                   |
| Native CSS motion                               | Engineering choice                    | **Adopt**                             | Avoids an animation dependency for simple transitions. Always provide reduced-motion behavior.                                                    |
| Variable/editorial fonts                        | Design and delivery pattern           | **Adopt through `next/font`**         | Self-hosting through the framework reduces third-party runtime requests; use readable fallbacks.                                                  |

Contemporary trend commentary was used only to understand the visual landscape. It did not determine engineering requirements:

- [Bubble — Web Design Trends 2026](https://bubble.io/blog/web-design-trends/)
- [Netguru — Web Design Trends 2026: Adopt, Test or Skip](https://www.netguru.com/blog/modern-web-design-trends)

These sources are subjective industry commentary. Claims in them about engagement, adoption, conversion, or rankings are not repeated as facts here.

## 4. Accessibility and performance research

WCAG 2.2 AA is the design target, not a certification claim. Relevant requirements include text alternatives, contrast, keyboard operation, visible focus, reflow, target size, labels/instructions, and motion preferences.

Engineering decisions:

- Semantic landmarks and heading order before ARIA.
- Native links, buttons, disclosures, and form controls.
- A mobile navigation disclosure with `aria-expanded`, not a desktop-style ARIA menu.
- Minimum 44px primary control height where practical, exceeding WCAG 2.2's 24 CSS-pixel minimum target-size criterion.
- No content available only on hover.
- Reduced-motion CSS and JavaScript behavior.
- Browser testing at 320, 375, 768, 1024, and 1440 pixels.
- Automated axe checks supplemented by manual keyboard checks; automated scans are not a complete audit.

Performance goals are based on the published Core Web Vitals thresholds: LCP at or below 2.5s, INP at or below 200ms, and CLS at or below 0.1 at the 75th percentile of field visits. These are goals, not measured results for this project. Local build/package observations will be recorded separately from field performance.

Sources:

- [W3C — How to Meet WCAG 2.2](https://www.w3.org/WAI/WCAG22/quickref/)
- [W3C — WCAG 2 Overview](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [web.dev — Animation and Motion](https://web.dev/learn/accessibility/motion)
- [web.dev — Web Vitals](https://web.dev/articles/vitals)
- [web.dev — Core Web Vitals Thresholds](https://web.dev/articles/defining-core-web-vitals-thresholds)

## 5. Technical stack research

### Next.js, React, and TypeScript

The current installation documentation requires Node.js 20.9 or newer and TypeScript 5.1 or newer. The workspace runs Node.js 20.20.2, which satisfies that requirement. App Router provides Server Components, Route Handlers, metadata files, font optimization, and integrated production builds.

The implementation will pin versions resolved from npm on the research date rather than describe them as future-proof or universally latest. TypeScript 5.9.3 is selected instead of the newly available 7.x line to reduce tooling compatibility risk while retaining strict checking.

Sources:

- [Next.js — Installation](https://nextjs.org/docs/app/getting-started/installation)
- [Next.js — App Router](https://nextjs.org/docs/app)
- [Next.js — Route Handlers](https://nextjs.org/docs/app/getting-started/route-handlers)
- [Next.js — Font Optimization](https://nextjs.org/docs/app/getting-started/fonts)
- [Next.js — Metadata and OG Images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- [Next.js — ESLint](https://nextjs.org/docs/app/api-reference/config/eslint)

### Styling and animation

**Chosen:** global design tokens with CSS Modules and native CSS transitions.  
**Alternative:** Tailwind CSS 4, which is a valid default in `create-next-app` but not necessary for this compact, custom editorial system.  
**Rejected for this release:** a large component library or animation package; either would add abstraction without solving a demonstrated need.

### Validation and persistence

Zod provides TypeScript-first schema validation. Postgres.js converts tagged-template values into separate PostgreSQL protocol parameters, supporting parameterized inserts without string-built values.

A database is justified only for contact messages. Project content is typed local content because there is one author, no public editor, and only a small number of projects. A project CMS, public registration, and admin authentication are deferred.

Sources:

- [Zod — Introduction](https://zod.dev/)
- [Zod — Defining Schemas](https://zod.dev/api)
- [Postgres.js — Query Parameters and Options](https://github.com/porsager/postgres)
- [PostgreSQL — SSL Support](https://www.postgresql.org/docs/current/libpq-ssl.html)

### Testing

Next.js documents both Vitest and Playwright. Playwright's own accessibility guide uses axe for automatically detectable issues and acknowledges that automated checks do not replace broader accessibility testing.

Sources:

- [Next.js — Testing Guides](https://nextjs.org/docs/app/guides/testing)
- [Next.js — Vitest](https://nextjs.org/docs/app/guides/testing/vitest)
- [Playwright — Accessibility Testing](https://playwright.dev/docs/accessibility-testing)
- [Playwright — Emulation](https://playwright.dev/docs/emulation)

## 6. Deployment and email research

### Hosting

**Netlify Free + Neon Free** is the initial documented deployment target. Netlify documents App Router support through its OpenNext-based runtime, and its current Free plan uses a 300-credit monthly hard limit. Netlify states that its Free plan can host commercial projects, which makes it a more flexible default if the portfolio later includes paid freelance inquiries.

**Vercel Hobby + Neon** is a simpler Next.js-oriented alternative only while the site qualifies as personal, non-commercial use. Vercel explicitly states that Hobby is restricted to non-commercial, personal use. That restriction must be reviewed before using Hobby for commercial freelance promotion.

**Neon Free** currently documents 100 CU-hours per project per month, 1 GB Postgres storage per project, and 5 GB public network transfer per project. Limits and terms can change and must be checked at deployment time.

Sources:

- [Netlify — Next.js Support](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/)
- [Netlify — Pricing](https://www.netlify.com/pricing/)
- [Netlify — Credit-Based Plans](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/)
- [Vercel — Hobby Plan](https://vercel.com/docs/plans/hobby)
- [Neon — Plans](https://neon.com/docs/introduction/plans)

### Email delivery

Resend documents a free transactional tier (3,000 emails/month and 100/day at research time), but email is not required for the first release. A persisted contact inbox avoids an external delivery dependency and avoids falsely reporting email delivery. Email notification can be added later only after database persistence succeeds and delivery is separately confirmed.

Source: [Resend — Pricing](https://resend.com/pricing)

No hosting, database, or email account was accessed during research; no plan limit is treated as a deployment result.

## 7. SariSariPOS repository inspection

**Repository:** [SariSariPOS](https://github.com/kristerlloyd23-netizen/SariSariPOS)  
**Inspected commit:** `29a5712fad15d907324c5c4dba980c2f3eda611c`  
**Commit timestamp:** 2026-10-25T07:33:05+08:00  
**Inspection type:** shallow source clone and static review

Verified source/configuration evidence includes:

- Kotlin and Jetpack Compose application structure.
- Room database version 3 with explicit 1→2 and 2→3 migrations.
- Product, customer, transaction, transaction-item, payment, assistant-document, and assistant-chunk entities.
- POS, inventory, customer/utang, reports, settings, and assistant UI/repository files.
- CameraX, ML Kit, WorkManager, Room 2.6.1, JDK 17, SDK 34, Gradle/Kotlin/KSP configuration.
- Local ZIP backup export and a six-hour periodic WorkManager request.
- Open Food Facts integration and product-photo attribution assets.
- Assistant document ingestion/chunking, Room FTS4 retrieval, cited source models, allowlisted local data queries, deterministic local answers, and optional Gemini/private-HTTPS generation.
- Five JUnit test methods covering break-bulk stock deduction and cart feasibility.
- A real launcher icon suitable for use as a project thumbnail.
- A public v1.0.0 release page with a debug APK asset.

Important limitations:

- No product screenshots were present in the cloned repository.
- No end-to-end Android runtime verification was performed.
- The environment has Java 11 and no Android SDK, while the project requires JDK 17 and SDK 34. The Android tests were therefore **not run**, and no passing result is claimed.
- JUnit coverage is limited; the presence of five tests is not evidence that checkout, migrations, assistant behavior, or external integrations work end to end.
- The assistant can be described as a **source-supported local retrieval and grounding implementation**, but runtime retrieval quality, source grounding, and model behavior remain unverified.
- The debug APK is not represented as a production-signed or Play Store release.

Release evidence: [SariSariPOS v1.0.0 release](https://github.com/kristerlloyd23-netizen/SariSariPOS/releases/tag/v1.0.0)

**Post-research media update:** the owner subsequently supplied eight interface captures in a separate photo document, labeled app v1.2 on 25 October 2026. Their provenance, privacy redaction, and verification boundaries are recorded in `docs/asset-sources.md`; they do not change the repository-inspection findings above.

## 8. Other repository decision

A public `notifyhub` repository was found. It is omitted from the initial portfolio gallery because its runtime behavior, authentication, and persistence/security posture were not validated for this release. Repository presence alone is not enough to promote its full feature list. No environment-file contents, credentials, or database records were inspected or copied.

## 9. Rejected alternatives

- **Static landing page only:** rejected because the contact workflow needs a real server boundary.
- **Database-backed project CMS:** rejected for initial scope; one author does not justify the security and maintenance burden.
- **Decorative admin login:** rejected; no authentication UI will exist without real authorization.
- **Public user registration:** unnecessary for a single-owner portfolio.
- **Heavy animation/3D stack:** rejected on value, performance, and accessibility grounds.
- **Generated app mockups as screenshots:** rejected because they would misrepresent evidence.
- **Email-only contact form:** rejected because delivery can fail or be unconfigured; persistence is the primary success condition.
- **Adding NotifyHub to fill the gallery:** rejected until its claims and security receive appropriate verification.

## 10. Research limitations

- No recruiter interviews or hiring experiments were conducted.
- Design references inform direction only; they do not predict employment outcomes.
- No runtime SariSariPOS tests, production Lighthouse runs, or deployment measurements exist yet.
- Hosting and database limits are point-in-time documentation findings and must be rechecked when accounts are configured.
