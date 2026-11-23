# AMZTRIX page map

Each route keeps its page composition and route-specific styling together:

- `page.tsx` + `page.css` — homepage
- `about/page.tsx` + `about/page.css` — About
- `careers/page.tsx` + `careers/page.css` — Careers
- `contact/page.tsx` + `contact/page.css` — Contact
- `services/page.tsx` + `services/page.css` — Services index
- `services/[slug]/page.tsx` + `services/[slug]/page.css` — individual service pages
- `portfolio/page.tsx` + `portfolio/page.css` — Portfolio index
- `portfolio/[slug]/page.tsx` + `portfolio/[slug]/page.css` — portfolio examples
- `work/page.tsx` + `work/page.css` — management-scope index
- `work/[slug]/page.tsx` + `work/[slug]/page.css` — management-area details
- `privacy/page.tsx` + `privacy/page.css` — Privacy
- `process/page.tsx` + `process/page.css` — operating process and responsibility model
- `not-found.tsx` + `not-found.css` — 404 page

Shared elements remain in `src/components`, each with its own TSX and CSS file. `globals.css` is reserved for global resets, legacy shared utilities, and the WebGL/background foundation.

When redesigning a page, start with that route's `page.tsx` and `page.css`. When redesigning a shared element such as the header, footer, cards, or CTA, edit the matching folder under `src/components`.
