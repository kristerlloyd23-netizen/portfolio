# Asset Sources and Licenses

**Reviewed:** 2026-10-25

## SariSariPOS launcher icon

- **File:** `public/projects/sarisaripos-icon.png`
- **Source:** `app/src/main/res/mipmap-xxxhdpi/ic_launcher.png` in the supplied public [SariSariPOS repository](https://github.com/kristerlloyd23-netizen/SariSariPOS).
- **Reviewed commit:** `29a5712fad15d907324c5c4dba980c2f3eda611c`.
- **Use:** Actual project identity/thumbnail, not a fabricated screenshot.

## Application screenshots

Eight owner-supplied captures were provided in the shared [SariSariPOS Application Photo Documentation](https://docs.google.com/document/d/1DOLfiT0PnfUWONKa27_2VeajwuMOXF6d/edit?usp=sharing). The document labels them as app version 1.2, captured on 25 October 2026. They supplement—but are not independent runtime evidence for—the separately reviewed source commit.

- Published files live under `public/projects/sarisaripos/` as 1080×2396 WebP derivatives, optimized at quality 86.
- The original captures document POS, Suki Ledger, Inventory, two Reports positions, two Settings positions, and one local Ate Sari example.
- The owner authorized privacy redaction for the Suki Ledger. Solid masks cover the two visible customer name/phone blocks; the public filename and caption disclose that edit. No other interface content is rearranged or repainted.
- Original unredacted downloads remain outside the public asset directory. The published WebP conversion does not carry forward the source JPEG metadata.
- Captured values are sample/test app state, not measured business impact, field deployment, usability findings, or assistant accuracy evidence.

See `docs/screenshot-capture.md` for the current asset list and future replacement workflow.

## Social image and favicon

- `public/og.png` is an original, programmatically composed social card using the portfolio's real name and positioning.
- `app/icon.svg` is an original geometric KLM mark.
- Neither asset depicts application functionality.

## Fonts

Newsreader, Inter, and IBM Plex Mono are open-source families delivered through `next/font`, which self-hosts the selected font files during the Next.js build. Their upstream font licenses should be retained if font files are later manually redistributed.

- [Newsreader — Google Fonts](https://fonts.google.com/specimen/Newsreader)
- [Inter — Google Fonts](https://fonts.google.com/specimen/Inter)
- [IBM Plex Mono — Google Fonts](https://fonts.google.com/specimen/IBM+Plex+Mono)
- [IBM Plex licensing](https://github.com/IBM/plex)

## Other imagery

No stock photography, AI-generated avatar, generated application interface, testimonial image, or unlicensed third-party screenshot is used.
