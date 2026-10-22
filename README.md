# Peepai Brewery & Kitchen — Restaurant Website System

> **Concept design for the owner to review. Not the official website.**

A config-driven, 3D-animated restaurant website built with Vite + React + TypeScript. One codebase, one config file per client.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Build | Vite 5 + TypeScript |
| UI | React 18 + Tailwind CSS (with CSS variables) |
| 3D | Three.js + @react-three/fiber + @react-three/drei |
| Animation | Framer Motion |
| Deploy | Cloudflare Pages (static, free tier) |

---

## Getting Started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # Production build → ./dist
npm run preview    # Preview production build locally
```

---

## Adding a New Client

All client content lives in one config file. Changing the config and /public/photos is enough to launch a new client.

### Step 1 — Fill in the config

Edit src/config/restaurant.ts (or duplicate it for multi-client repos):

- name, tagline, about, features, rating, reviewCount
- phone, whatsapp, address, mapsLink, mapsEmbedSrc
- hours, theme tokens, shape (pint/bowl/knot/donut)
- photos array (filenames in /public/photos, no spaces)
- galleryItems (src, title, caption)
- menu categories and items (price and veg are optional)
- metaDescription, ogImage, footerCredit

### Step 2 — Add photos

Place files in public/photos/ with no spaces in filenames.
Use hyphens: peepai-bar.jpg not peepai bar.jpg
Preferred: WebP or JPEG, at least 1200x800px.

### Step 3 — Update index.html

Update the title, meta description, og:image, and JSON-LD Restaurant schema block.

---

## Deploying to Cloudflare Pages

1. Build locally: npm run build (dist/ should appear with no errors)
2. Push to GitHub: git push origin main
3. Go to dash.cloudflare.com → Pages → Create a project
4. Connect your GitHub repo
5. Build settings:
   - Framework preset: Vite
   - Build command: npm run build
   - Build output directory: dist
   - Node.js version: 18 or 20
6. Save and Deploy. Cloudflare assigns a free *.pages.dev URL.
7. Add a custom domain in Pages → Custom Domains.

Every push to main auto-deploys. No further configuration needed.

### Optional: public/_headers for caching

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff

/photos/*
  Cache-Control: public, max-age=31536000, immutable

/assets/*
  Cache-Control: public, max-age=31536000, immutable
```

---

## Project Structure

```
peepai/
  public/
    photos/           client photos (lazy-loaded)
    logo.png          client logo
    favicon.svg
  src/
    config/
      restaurant.ts   single source of truth for all client content
    components/
      3d/
        HeroScene.tsx   R3F Canvas, WebGL detection, render-pause on scroll
        PintGlass.tsx   Procedural 3D pint glass + pour animation
      sections/
        Hero.tsx        3D hero + open badge + CTAs
        Welcome.tsx     Heritage story + feature cards
        Vibe.tsx        Ambience highlights
        Menu.tsx        Filterable menu + WhatsApp dish tray
        Gallery.tsx     Masonry gallery + accessible lightbox
        Reserve.tsx     Table reservation form → WhatsApp
        Visit.tsx       Address, hours, Google Map embed
        Footer.tsx
      ui/
        Navbar.tsx
    hooks/
      useOpenNow.ts     Real-time open/closed calculation
      useIntersection.ts
    App.tsx
    main.tsx            Injects theme tokens → CSS :root variables
    index.css           Design system: tokens, glassmorphism, animations
  index.html            SEO meta, Open Graph, JSON-LD schema
  tailwind.config.js
  README.md
```

---

## Menu Content Rules

- Only use facts in the config. Never invent dishes, prices, or reviews.
- Omit price if unknown — the UI gracefully skips it.
- Mark TODO comments next to placeholder categories.
- The veg dot only shows when veg: true is explicitly set.

---

## Outstanding TODOs — Peepai Client

- [ ] Full menu not yet confirmed — ask the owner for the complete dish list and prices
- [ ] Owner approval needed before removing the "Concept design" footer disclaimer
- [ ] Convert /public/photos to WebP for ~50% smaller file sizes
- [ ] Confirm exact Google Maps Place ID for accurate map pin
