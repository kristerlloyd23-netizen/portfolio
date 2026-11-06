# Design Direction

**Direction name:** Quietly Technical — Editorial Engineering Portfolio  
**Established:** 2026-10-25

## 1. Creative idea

The portfolio should read like a well-edited engineering notebook: confident typography, precise metadata, visible evidence, and no ornamental claims. The visual “cinematic” quality comes from scale, pacing, asymmetry, and restrained motion—not scroll hijacking or a heavy 3D scene.

Three principles govern the design:

1. **Evidence before decoration.** Project status, source links, and limitations are part of the visual content.
2. **Warmth without noise.** Charcoal, ivory, sage, and amber soften the technical workspace aesthetic.
3. **Motion communicates state.** Reveals and transitions remain brief, interruptible, and non-essential.

## 2. Audience journeys

### Developer recruiter or hiring manager

Home → flagship project → architecture/implementation evidence → source or debug release → resume/contact.

### Technical reviewer

Projects → SariSariPOS case study → evidence matrix → offline/data/integration decisions → testing limitations → repository.

### IT support recruiter

Home or Resume → Experience → accurate responsibilities and dates → support-focused resume/contact.

### Potential freelance client

Home → practical problem/project concept → verified capabilities → contact. No invented client stories, pricing, or outcomes are shown.

## 3. Information architecture

- **Home:** positioning, flagship project, evidence themes, experience preview, contact CTA.
- **Projects:** filterable verified work and honest empty states.
- **SariSariPOS case study:** narrative, architecture, media, verification, limitations, roadmap, source/release.
- **About:** education, development focus, support background, approach reflected in project work.
- **Skills:** Android evidence, web technologies used in this site, professional support capabilities.
- **Experience:** both roles with unmodified overlapping dates, education, and training.
- **Contact:** direct links and a server-validated persisted contact form.
- **Resume:** useful web resume plus real PDF download when generated.

## 4. Design tokens

### Dark theme (primary)

| Token                  |     Value | Use                                   |
| ---------------------- | --------: | ------------------------------------- |
| `--color-bg`           | `#111311` | Page background                       |
| `--color-surface`      | `#191C19` | Elevated surfaces                     |
| `--color-text`         | `#F1EFE7` | Primary text                          |
| `--color-sage`         | `#A8B5A0` | Technical labels and secondary accent |
| `--color-amber`        | `#C7A46A` | Actions, focus, and active state      |
| `--color-secondary`    | `#B6BAB3` | Secondary text                        |
| `--color-field-border` | `#697264` | Essential control boundaries          |

### Light theme

| Token                  |     Value | Use                                   |
| ---------------------- | --------: | ------------------------------------- |
| `--color-bg`           | `#F1EFE7` | Page background                       |
| `--color-surface`      | `#FAF9F4` | Elevated surfaces                     |
| `--color-text`         | `#191C19` | Primary text                          |
| `--color-sage`         | `#425540` | Technical labels and secondary accent |
| `--color-amber`        | `#765619` | Text-level accent and focus           |
| `--color-secondary`    | `#4F564F` | Secondary text                        |
| `--color-field-border` | `#7B8278` | Essential control boundaries          |

### Calculated contrast checks

Ratios calculated with the WCAG relative-luminance formula on 2026-10-25:

| Pair                               |   Ratio |
| ---------------------------------- | ------: |
| Ivory on charcoal                  | 16.21:1 |
| Sage on charcoal                   |  8.69:1 |
| Amber on charcoal                  |  7.95:1 |
| Secondary text on charcoal         |  9.48:1 |
| Secondary text on elevated dark    |  8.73:1 |
| Dark field border on elevated dark |  3.43:1 |
| Dark text on ivory                 | 14.93:1 |
| Light secondary on ivory           |  6.57:1 |
| Light amber on ivory               |  5.85:1 |
| Light sage on ivory                |  7.00:1 |
| Light field border on ivory        |  3.44:1 |
| Charcoal text on amber action      |  7.95:1 |

These calculations cover the listed pairs only. Browser axe checks and manual review remain necessary for actual component states.

## 5. Typography

- **Display:** Newsreader, an editorial serif used for major headlines and project titles.
- **Body:** Inter, used for paragraphs, navigation, forms, and UI copy.
- **Technical:** IBM Plex Mono, used for labels, evidence status, dates, and metadata.

All three are open-source font families available through Google Fonts. `next/font` will self-host the selected subsets at build time, with system fallbacks and `display: swap`. Body copy stays at readable sizes with a target line length around 60–75 characters.

Font references:

- [Newsreader](https://fonts.google.com/specimen/Newsreader)
- [Inter](https://fonts.google.com/specimen/Inter)
- [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono)

## 6. Layout and spacing

- Mobile-first, with a centered maximum content width around 1280px.
- A 12-column desktop grid; simplified single-column flow on narrow screens.
- Editorial asymmetry in the hero and case-study chapter headings.
- A 4px base spacing scale with primary intervals of 8, 12, 16, 24, 32, 48, 64, 96, and 128px.
- Hairline decorative borders; stronger borders for essential field identification.
- Small corner radii and restrained shadows. No glassmorphism or generic gradient backdrop.
- DOM order follows reading order even when the desktop composition is asymmetric.

## 7. Signature compositions

### Hero

A large editorial promise sits beside a compact “flagship evidence” panel. The real SariSariPOS launcher icon provides product identity; an adjacent owner-supplied POS capture provides a real interface view with checkout verification still qualified.

### Evidence ledger

Project facts appear as a technical ledger rather than unsupported statistics. Rows identify local persistence, migration evidence, integrations, and verification state.

### Case-study chapters

Each chapter uses a numeric technical label, a descriptive heading, concise prose, and a consistent evidence/status treatment. A semantic architecture diagram uses dashed paths for optional external services.

### Project gallery

Filtering uses real buttons and live result counts. Categories without verified projects show an honest empty state rather than filler cards.

## 8. Media rules

- Use the actual launcher asset copied from the inspected SariSariPOS repository.
- Do not generate app interfaces or use stock devices as evidence.
- Published captures must retain factual alt text/captions, version context, and full-size access. Privacy redactions must be solid, disclosed, and limited to identifying fields.
- When captures arrive, use WebP/AVIF where appropriate, intrinsic dimensions, meaningful alt text, and `next/image` sizing.
- Architecture graphics must include a text equivalent.

## 9. Interaction and motion

- Header disclosure, active navigation, project filtering, theme toggle, copy-email feedback, print controls, and form submission status are real controls.
- Reveal motion uses a small opacity/translation change driven by IntersectionObserver.
- Hover never becomes the only way to discover information.
- Focus-visible states use a high-contrast outline and offset.
- `prefers-reduced-motion: reduce` removes smooth scrolling, reveal transforms, and non-essential transitions.
- No autoplay, scroll-jacking, custom cursor, or perpetual decorative animation.

## 10. Accessibility acceptance criteria

- Semantic landmarks and one clear page-level H1.
- Keyboard-operable navigation, filters, theme control, copy control, print control, and form.
- Visible labels and linked error descriptions.
- No unintended horizontal overflow at the target widths.
- Text and essential control colors use the validated token pairs.
- Reduced-motion behavior in both CSS and JavaScript.
- Automated WCAG-tagged axe scans plus manual keyboard review; no claim of formal WCAG certification.
