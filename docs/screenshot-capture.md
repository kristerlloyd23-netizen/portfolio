# SariSariPOS Screenshot Capture and Replacement

## Current status

Eight owner-supplied application captures are published under `public/projects/sarisaripos/`. The supplied photo document labels them as **app version 1.2**, captured on **25 October 2026**.

These images were not present in the inspected source repository and were not independently reproduced against the reviewed commit. They document interface appearance and sample/test app state—not field deployment, measured impact, usability results, or comprehensive runtime verification.

Checkout/payment completion and barcode-scanner dialogs were not included in the supplied set.

## Published captures

| File                           | Visible interface                   | Evidence and privacy note                                                                                          |
| ------------------------------ | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `01-pos.webp`                  | POS product catalog                 | Search, filters, prices, stock, and cart summary; no completed checkout implied                                    |
| `02-suki-ledger-redacted.webp` | Suki Ledger                         | Customer name/phone blocks masked with owner-approved solid redactions; captured balances are not business metrics |
| `03-inventory.webp`            | Inventory                           | Stock list, filters, cost/SRP, barcodes, and item actions; not a stocktake validation                              |
| `04-reports-overview.webp`     | Reports summary                     | Revenue, cost, estimated gross profit, payments, and start of trend/top products; sample/test values               |
| `05-reports-detail.webp`       | Reports continuation                | Payment totals, trend, and ranked products at a second scroll position                                             |
| `06-settings-profile.webp`     | Store profile and assistant privacy | Generic store name and blank wallet account fields                                                                 |
| `07-settings-backup.webp`      | Receive QR and local backup         | No QR image visible; local export is not cloud sync, completed payment, or restore evidence                        |
| `08-assistant-local.webp`      | Ate Sari local example              | One local response with source cards and a no-external-model label; not an accuracy evaluation                     |

Every capture has descriptive alt text, a factual caption, version/date context, and a full-size image link in the case study.

## Source and derivative workflow used

1. Exported the owner-supplied Google Doc as DOCX and extracted its eight original JPEG captures.
2. Reviewed every image for direct identifiers, wallet details, QR codes, secrets, and unsupported claims.
3. Asked the owner how to handle visible Suki Ledger names and phone numbers; the owner selected redaction.
4. Applied solid masks only to the two customer name/phone blocks. Kept the unedited original outside the public directory.
5. Converted all eight images to 1080×2396 WebP at quality 86. Published derivatives range from approximately 67–128 KB each.
6. Added the files, typed content, accessible full-capture links, and evidence-qualified captions.
7. Visually inspected the redacted derivative and ran responsive, browser, and accessibility checks.

## Future capture prerequisites

1. Use the real SariSariPOS application on an emulator or physical Android device.
2. Verify the flow being captured; do not stage a screen the application cannot produce.
3. Use clearly marked demonstration products, prices, customers, and sales.
4. Remove or securely mask customer names/phone numbers, API keys, wallet details, QR codes, personal information, and real store-sensitive data before publishing.
5. Keep cloud assistant behavior distinct from local behavior in captions.
6. Record the app build/version, capture date, and whether the visible flow was actually exercised.

## Useful missing evidence

| Capture or recording   | Verification note                                                                               |
| ---------------------- | ----------------------------------------------------------------------------------------------- |
| Checkout/payment flow  | Complete the shown path before describing checkout as tested                                    |
| Barcode scanner dialog | Record whether a real/test barcode was recognized and how the result was used                   |
| Migration check        | Document the starting database version, resulting version, and preserved records                |
| Backup and restore     | Show export and restore outcomes without exposing customer or store-sensitive files             |
| Assistant evaluation   | Use explicit questions and expected sources; distinguish local, Gemini, and private-HTTPS paths |

## Replacement rules

1. Capture PNG at native device resolution and preserve a private original for verification.
2. Crop only empty device margins. Do not rearrange or repaint interface elements.
3. Use solid masks for privacy redaction rather than a potentially reversible blur; disclose the edit in the filename/caption.
4. Convert public derivatives to WebP at an appropriate resolution and quality, normally 82–88.
5. Use intrinsic dimensions and responsive `next/image` sizing to avoid layout shift.
6. Keep captions factual: visible screen, documented version, capture date, redactions, and unverified boundaries.
7. Do not mark an entire feature tested after checking only one happy path.
8. If a flow fails, document the failure rather than capturing around it.
9. Re-run the responsive, asset, browser, and accessibility checks after replacement.

No generated interface or AI-created mockup may be substituted for a real application capture.
