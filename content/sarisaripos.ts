export const sariSariPosEvidence = {
  sourceUrl: "https://github.com/kristerlloyd23-netizen/SariSariPOS",
  releaseUrl: "https://github.com/kristerlloyd23-netizen/SariSariPOS/releases/tag/v1.0.0",
  apkUrl:
    "https://github.com/kristerlloyd23-netizen/SariSariPOS/releases/download/v1.0.0/SariSariPOS-debug.apk",
  inspectedCommit: "29a5712fad15d907324c5c4dba980c2f3eda611c",
  inspectedOn: "25 October 2026",
  screenshotStatus:
    "Eight owner-supplied application captures, documented as app version 1.2 on 25 October 2026, supplement the separate source review. They were not reproduced against the inspected commit and are not independent end-to-end verification.",
} as const;

export const sourceSupportedFeatures = [
  {
    title: "POS and checkout",
    description:
      "Product search/filtering, cart behavior, barcode entry, Cash / Utang / GCash-Maya payment paths, and cash-change calculation are represented in the application source.",
  },
  {
    title: "Inventory and break-bulk stock",
    description:
      "Product editing, cost and selling prices, low-stock thresholds, restocking, and pack/box-to-piece deduction logic are implemented in source.",
  },
  {
    title: "Customer credit and records",
    description:
      "Customer records, credit-limit checks, transaction items, payment records, and repayment history structures are present.",
  },
  {
    title: "Local persistence and migrations",
    description:
      "Room/SQLite is configured at database version 3, with explicit 1→2 and 2→3 migrations and app-private product-image storage.",
  },
  {
    title: "Local backup exports",
    description:
      "A repository and WorkManager worker create timestamped local ZIP exports containing a JSON manifest and product images. This is local export, not cloud synchronization.",
  },
  {
    title: "Assistant retrieval and grounding",
    description:
      "Document ingestion/chunking, Room FTS4 retrieval, cited source models, allowlisted local data queries, deterministic local answers, and optional Gemini/private-HTTPS generation are represented in source.",
  },
  {
    title: "Reports",
    description:
      "Reporting UI and repository code cover revenue, cost, estimated gross profit, payment breakdowns, repayments, trends, and top-product queries.",
  },
] as const;

export const engineeringDecisions = [
  {
    title: "Keep the sales workflow local",
    decision:
      "Room/SQLite is the system of record for core POS work, so sales do not depend on an external service being reachable.",
    tradeoff:
      "A single-device local store simplifies offline behavior but does not provide multi-device synchronization or an off-device backup by itself.",
  },
  {
    title: "Make external services optional",
    decision:
      "Open Food Facts and remote assistant generation sit outside the core sales path. Local product records and assistant retrieval remain available without them.",
    tradeoff:
      "Catalog data can be incomplete or mismatched, and remote answers introduce privacy, availability, and configuration concerns.",
  },
  {
    title: "Use explicit database migrations",
    decision:
      "Registered migrations add product-image and assistant structures while moving the Room schema to version 3.",
    tradeoff:
      "Migration code is present, but upgrade behavior still needs device-level testing against real older databases.",
  },
  {
    title: "Call backups exports, not cloud sync",
    decision:
      "The worker writes local ZIP files and the README identifies a future server-integration seam.",
    tradeoff:
      "Shared backups can contain customer and store data. Authentication, conflict handling, transport security, and restore testing remain future work.",
  },
] as const;

export const verificationRows = [
  {
    area: "Source and configuration review",
    status: "Completed for this portfolio",
    detail: `Static review at commit ${sariSariPosEvidence.inspectedCommit.slice(0, 12)} on ${sariSariPosEvidence.inspectedOn}.`,
  },
  {
    area: "Owner-supplied interface captures",
    status: "8 screens documented · not independent testing",
    detail:
      "The supplied photo document labels the captures as app v1.2 on 25 October 2026. They document interface appearance and sample/test state; the Suki Ledger names and phone numbers are masked in the public derivative.",
  },
  {
    area: "Break-bulk JVM tests",
    status: "Tests present · not executed here",
    detail:
      "Five JUnit test methods cover stock deduction and cart feasibility. The portfolio environment lacks JDK 17 and the Android SDK, so no passing result is claimed.",
  },
  {
    area: "Core POS and checkout runtime",
    status: "Catalog captured · checkout unverified",
    detail:
      "An owner-supplied POS catalog shows product search, prices, stock, and cart summary. No checkout/payment completion evidence was supplied or independently reproduced.",
  },
  {
    area: "Room migration runtime",
    status: "Runtime verification pending",
    detail:
      "Migration code is present; upgrades from older on-device databases have not been independently tested.",
  },
  {
    area: "Open Food Facts and Gemini integrations",
    status: "Runtime verification pending",
    detail:
      "Clients and integration code are present; live API responses, quotas, and fallback behavior were not exercised.",
  },
  {
    area: "Assistant retrieval and answer quality",
    status: "Local example captured · evaluation pending",
    detail:
      "One owner capture shows a local answer with source cards and a no-external-model label. Retrieval quality, cited-source correctness, and optional Gemini/private-HTTPS generation still require evaluation.",
  },
  {
    area: "Performance, security, and production readiness",
    status: "Not established",
    detail:
      "No benchmarks, penetration test, production signing review, or store-release approval is claimed.",
  },
] as const;

export const limitations = [
  "End-to-end Android behavior has not been independently verified for this portfolio.",
  "The eight owner-supplied captures document interface appearance and sample/test state, not field deployment, usability, response accuracy, or measured business impact.",
  "The captures are documented as app v1.2 and are not independent runtime evidence for the separately reviewed source commit; the public Suki Ledger derivative masks customer names and phone numbers.",
  "The published APK is debug-signed for local testing, not a production-signed Play Store release.",
  "The five visible JUnit tests focus on break-bulk logic and do not establish broad application coverage.",
  "Local backup exports are not a cloud account, multi-device sync, or verified disaster-recovery solution.",
  "Assistant implementation evidence does not establish response accuracy, retrieval quality, or production AI safety.",
] as const;

export const roadmap = [
  "Run and record core POS, inventory, repayment, migration, and backup/restore tests on real devices.",
  "Add a captioned checkout/payment and barcode-scanner demonstration using non-sensitive demo data, plus recorded migration and backup/restore checks.",
  "Expand unit and instrumented coverage around checkout transactions, migrations, repositories, and assistant retrieval.",
  "Evaluate assistant source relevance, grounded responses, fallback behavior, and privacy with explicit test cases.",
  "Move from debug signing to a documented release-signing and distribution process.",
  "Design authenticated, conflict-aware cloud synchronization only if multi-device use becomes a verified requirement.",
] as const;

const captureMeta = "Owner-supplied · documented app v1.2 · 25 Oct 2026";

export const screenshotCaptures = [
  {
    key: "pos",
    title: "POS catalog",
    src: "/projects/sarisaripos/01-pos.webp",
    alt: "SariSariPOS Point of Sale catalog with product search, category filters, prices, stock, and an empty cart summary.",
    description:
      "The catalog shows search, category filters, product prices and stock, add controls, and cart summary. It does not document a completed checkout.",
    meta: captureMeta,
  },
  {
    key: "suki-ledger",
    title: "Suki Ledger · privacy-redacted",
    src: "/projects/sarisaripos/02-suki-ledger-redacted.webp",
    alt: "Privacy-redacted Suki Ledger showing outstanding balances, credit limits, and repayment, history, edit, and delete controls; customer names and phone numbers are masked.",
    description:
      "Customer names and phone numbers are masked. Balances and limits remain as captured sample/test state, not business metrics or field-study findings.",
    meta: `Privacy-redacted names + phone numbers · ${captureMeta}`,
  },
  {
    key: "inventory",
    title: "Inventory",
    src: "/projects/sarisaripos/03-inventory.webp",
    alt: "SariSariPOS Inventory screen with low-stock filtering, product cost and selling prices, barcodes, stock counts, and item actions.",
    description:
      "The stock list includes search, low-stock and category filters, cost/SRP, barcodes, and restock/edit/delete actions. It is not a stocktake-validation result.",
    meta: captureMeta,
  },
  {
    key: "reports-overview",
    title: "Reports · overview",
    src: "/projects/sarisaripos/04-reports-overview.webp",
    alt: "SariSariPOS Sales Reports overview with Today selected, revenue, cost, estimated gross profit, payment breakdown, and the start of sales trend and top products.",
    description:
      "The Today view shows revenue, cost of goods, estimated gross profit, payment totals, and the start of trend/top-product sections. Values are captured sample/test data.",
    meta: captureMeta,
  },
  {
    key: "reports-detail",
    title: "Reports · detail",
    src: "/projects/sarisaripos/05-reports-detail.webp",
    alt: "Continuation of SariSariPOS Sales Reports showing payment totals, a sales trend, and ranked top products with captured amounts and quantities.",
    description:
      "A second scroll position of the same Reports feature documents payment totals, sales trend, and ranked products for the selected range.",
    meta: captureMeta,
  },
  {
    key: "settings-profile",
    title: "Settings · profile and privacy",
    src: "/projects/sarisaripos/06-settings-profile.webp",
    alt: "SariSariPOS Settings with a generic store name, blank wallet account fields, and the start of optional assistant privacy information.",
    description:
      "Store and wallet profile fields are visible alongside optional assistant/privacy information. Wallet account fields are blank in this capture.",
    meta: captureMeta,
  },
  {
    key: "settings-backup",
    title: "Settings · QR and local backup",
    src: "/projects/sarisaripos/07-settings-backup.webp",
    alt: "SariSariPOS Settings showing empty GCash and Maya receive-QR controls and an offline local ZIP backup section with a Run backup now button.",
    description:
      "No wallet QR is visible. The capture documents receive-QR controls and local ZIP export information—not a completed payment, cloud sync, or restore test.",
    meta: captureMeta,
  },
  {
    key: "assistant",
    title: "Ate Sari · local example",
    src: "/projects/sarisaripos/08-assistant-local.webp",
    alt: "Ate Sari assistant showing a sample local sales response with visible source cards and a local RAG, no external model label.",
    description:
      "One captured local answer includes source cards and a no-external-model label. This single example is not an accuracy, retrieval-quality, or usability evaluation.",
    meta: captureMeta,
  },
] as const;
