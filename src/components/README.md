# AMZTRIX component map

Each visible shared component has its own folder. Edit the `.tsx` file for content/markup and the matching `.css` file for appearance.

- `Header/Header.tsx` + `Header/Header.css` — desktop navigation and mobile menu
- `Footer/Footer.tsx` + `Footer/Footer.css` — footer contact pitch, links and legal row
- `Brand/Brand.tsx` + `Brand/Brand.css` — logo image and crop
- `PageIntro/PageIntro.tsx` + `PageIntro/PageIntro.css` — internal-page hero
- `ServiceGrid/ServiceGrid.tsx` + `ServiceGrid/ServiceGrid.css` — service cards
- `WorkGrid/WorkGrid.tsx` + `WorkGrid/WorkGrid.css` — portfolio cards
- `WorkGrid/ProjectArt.tsx` — artwork inside portfolio cards
- `AuditBanner/AuditBanner.tsx` + `AuditBanner/AuditBanner.css` — shared account-review CTA
- `astra-background.tsx` — WebGL particle background
- `navigation.ts` — shared menu labels and URLs
- `Theme/Theme.css` — complete website color palette and premium theme
- `ServiceDetail/ServiceDetail.tsx` + `ServiceDetail/ServiceDetail.css` — premium individual service pages
- `Motion/Motion.css` — card, button, menu, form and scroll interaction motion
- `Buttons/Buttons.css` — shared primary, secondary and text-button system
- `Contact/Contact.css` — contact hero, enquiry workspace and next-step cards
- `Scale/Scale.css` — website-wide sizing, spacing and density controls
- `ScrollReveal/ScrollReveal.css` — hydration-safe, CSS-only sequential animations used on every page
- `index.ts` — central export file used by pages

`src/app/globals.css` now remains for older page-level sections, global variables, resets, and contact-page layout. New shared component edits should be made in the component CSS files above.
