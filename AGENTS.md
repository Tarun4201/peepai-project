# Project: Restaurant website system (first client: Peepai Brewery & Kitchen)

Build a full, config-driven, 3D-animated restaurant website. One codebase, one config file per client. The first client is Peepai Brewery & Kitchen, a brewpub in Hebbal, Bengaluru.

## Reference
`/reference/peepai-brewery-3d.html` is a working single-file prototype. Match its look, 3D intro (a pint of beer pouring, foam, bubbles, mouse and scroll parallax), sections and behaviour. Rebuild it properly; do not copy the single-file structure.

## Stack
- Vite + React + TypeScript
- three, @react-three/fiber, @react-three/drei for 3D
- GSAP (ScrollTrigger) or Framer Motion for scroll and UI motion
- Tailwind CSS with CSS variables for theming
- Static build only (no server). Deploy to Cloudflare Pages (free tier allows commercial use). Do not use Vercel Hobby for client sites.

## Config-driven design
All client content lives in `src/config/restaurant.ts`: name, tagline, about, features, rating, phone, WhatsApp number, address, maps link, hours, theme tokens, 3D shape or GLB path, photo list, menu (categories, items, optional prices, veg flag). Changing the config and `/public/photos` must be enough to launch a new client. No client text hard-coded in components.

## Pages and sections
1. Hero: 3D scene, name, tagline, open-now badge, "See the menu" button. First photo as a soft backdrop when present.
2. Welcome: about copy, feature chips, rating line.
3. Menu: category chips, veg-only toggle, search, add-to-list, send list on WhatsApp. Price is optional per item. Veg dot only when the flag is set.
4. Gallery: masonry of `/public/photos`, lightbox with keyboard support. Hidden when there are no photos.
5. Reserve: form (name, guests, date, time) that opens WhatsApp with a prefilled message, plus a Call button.
6. Visit: address, hours, directions link, embedded map link, call button.
7. Footer: credit line from config.

## 3D
- Intro: pint pours once on first load, then idles. Skip the pour when `prefers-reduced-motion`.
- Support `shape: 'pint' | 'bowl' | 'knot' | 'donut'` and an optional `glb` path for a real model.
- Pause rendering when the hero is off-screen. Cap pixel ratio at 2. Fall back to the photo backdrop if WebGL is unavailable.

## Quality bar
- Responsive from 360px up. Keyboard focus visible. Contrast AA. Respect reduced motion.
- Lighthouse mobile performance 85+, images lazy-loaded and compressed (WebP), fonts preloaded with a system fallback.
- SEO: title, meta description, Open Graph tags, JSON-LD `Restaurant` schema built from the config.
- Typography: one display/body family with a distinct weight scale (prototype uses Bricolage Grotesque).

## Content rules
- Use only facts present in the config. Never invent dishes, prices, awards or reviews.
- Missing menu data stays missing. Leave a clearly marked TODO in the config instead.
- Keep the footer credit: "Concept design for the owner to review. Not the official website." until the owner approves.

## Peepai starting data
- Name: Peepai Brewery & Kitchen. Brewpub, Hebbal, Bengaluru. 4.5 on Google from 5.6K reviews.
- Address: 102/1 & 102/2, Ground Floor, GM Arcade, Service Road, Bellary Road, Hebbal, Bengaluru 560092
- Phone: +91 96327 06699. Hours: daily, 12 pm to 12:30 am.
- Cuisine: North Indian, pizza, Chinese, craft beer. Veg and non-veg. Live music, dancing, outdoor seating, parking.
- Menu known so far: Peepai Nachos Veg (starter, veg), Pistachio Tres Leches (dessert). One more dessert name was cut off, so ask the owner for the full menu.
- Theme "amber": bg #17110c, ink #f5ead6, accent #f0a030, accent2 #c8602a, card #241a12, muted #b9a58c.

## Done means
`npm run build` passes, the site runs on mobile and desktop, the config alone controls all client content, and a README explains how to add a new client, add photos, and deploy to Cloudflare Pages.
