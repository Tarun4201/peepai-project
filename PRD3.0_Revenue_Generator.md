# PRODUCT REQUIREMENTS DOCUMENT (PRD 3.0)
## Peepai Brewery & Kitchen — High-Value Revenue Generator & Corporate Engine

**Document Version:** 3.0  
**Target Client:** Peepai Brewery & Kitchen, Hebbal, Bengaluru  
**Target Revenue Model:** ₹30,000 Upfront Build Fee + Optional Annual Retainer  
**Author:** Digital Product & Engineering Team  
**Status:** Ready for Review (No code changes executed until approved)

---

## 1. Executive Summary & Business Justification

### The Core Problem
Most Bengaluru microbrewery websites are digital dead ends: static brochure pages or buried PDF menus that don't drive direct revenue. As a result, restaurant owners rely heavily on aggregators (Zomato, Swiggy, EazyDiner) that charge 10%–20% commissions on bookings and customer acquisition.

### The ₹30,000 Value Proposition
This website is engineered not as a passive catalog, but as a **Direct Revenue Engine**:
1. **Corporate Outings & Bulk Events (₹50,000 – ₹2,50,000 per booking)**: Manyata Tech Park and Kirloskar Tech Park are within a 5–10 minute radius of Peepai in Hebbal. Capturing **one single corporate team outing** pays for the entire ₹30,000 website fee immediately.
2. **Zero-Commission Table Reservations**: Direct routing to the restaurant manager's WhatsApp eliminates 3rd-party cover charges.
3. **Frictionless Mobile Menus**: 95% of guests view menus on mobile while en route; instant interactive tap & food filters increase average order value.
4. **Google Search Dominance (Hebbal)**: Captures high-intent local search queries like *"best craft brewery in Hebbal"* and *"team lunch brewery near Manyata"*.

---

## 2. The 5 Core High-Value Features

### Feature 1: High-Converting "Corporate & Bulk Booking" Portal
- **Business Rationale:** Microbreweries make their highest margins on group bookings (30 to 200+ guests) for tech company mixers, quarterly achievements, product launches, and sundowners.
- **Location on Site:** Dedicated high-visibility section in the primary navigation and a standalone highlight block after the Vibe/Spaces section.
- **Form Architecture:**
  - **Company / Organizer Name** (e.g., Amazon, Cognizant, Philips, Target).
  - **Event Type:** Corporate Team Outing, Product Launch / Mixer, Birthday / Anniversary, Private Mezzanine Hire.
  - **Estimated Group Size:** 15–30 guests, 30–75 guests, 75–150 guests, 150+ full floor.
  - **Budget per Head:** ₹1,000–₹1,500, ₹1,500–₹2,500, ₹2,500+ Premium Unlimited.
  - **Date & Preferred Time Slot:** Lunch / Day Party (12 PM – 4 PM), Sunset Mixer (4 PM – 8 PM), Dinner & DJ (8 PM – 12:30 AM).
  - **Contact Details:** Name, Work Phone / WhatsApp, Corporate Email.
- **Lead Delivery Mechanism:**
  - Instant pre-formatted WhatsApp transmission directly to the Events Manager with all fields tabulated for immediate quote turnaround.
  - Secondary fallback to direct email (`mailto:` / reservation desk).
- **Venue Space Highlights Included in the Portal:**
  - *Mezzanine Double-Deck Lounge* (up to 120 pax).
  - *Twilight Sky Open Terrace* (up to 200 pax).
  - *Courtyard & Live Stage Area* (up to 80 pax).

---

### Feature 2: Interactive, Mobile-First "Tap & Food Menu"
- **Business Rationale:** Diners in Bengaluru make dining decisions in under 30 seconds. Pinching and zooming a multi-page PDF on a smartphone causes high drop-offs.
- **Interactive Component Design:**
  - **Segmented Tabs:**
    1. 🍺 **Craft Beers on Tap:** House-brewed beers with Style, ABV %, IBU (bitterness score), and Tasting Profile notes (e.g., Belgian Witbier, Crisp American IPA, Dark Chocolate Stout, Mango Cider).
    2. 🍸 **Signature Cocktails & Spirits:** Craft concoctions, botanical gins, single malts.
    3. 🍽️ **Food & Kitchen:** North Indian specialties, Woodfired Pizzas, Asian Appetizers, Gourmet Desserts.
  - **Smart Filters:** One-tap dietary toggles (**🟢 Veg Only**, **🔴 Non-Veg**, **🟡 Egg**).
  - **Hybrid Architecture:** Retains the existing high-res **Official PDF Catalog** as an expandable "View Printed Bar & Food Menu" drawer for diners who prefer the printed experience.

---

### Feature 3: Local SEO Optimization & Google "Schema" Integration
- **Business Rationale:** When tech employees or residents search *"brewpub near Hebbal"* or *"best microbrewery with outdoor seating Bengaluru"*, Google uses structured metadata to populate rich snippets, knowledge panels, and map pack rankings.
- **Technical Implementation:**
  - Full `schema.org/Brewery` and `schema.org/Restaurant` JSON-LD embedding.
  - Standardized Open Graph (OG) tags and Twitter Card metadata for crisp link previews on WhatsApp, LinkedIn, and Instagram.
  - Explicit geo-coordinates, operating hours (`12:00 to 00:30`), cuisine taxonomy, and payment options.
  - High-intent meta titles and descriptions optimized for Hebbal and North Bengaluru catchment areas.

---

### Feature 4: Smooth Integration with Existing Ecosystem
- **Business Rationale:** The restaurant staff has zero time to learn a complex admin dashboard. Integration must feed straight into their existing operational tools.
- **Ecosystem Touchpoints:**
  - **Primary CTA:** Direct WhatsApp Business booking with pre-populated reservation string.
  - **Secondary CTA:** Direct phone dialer (`tel:+919632706699`) for immediate assistance.
  - **Aggregator Bridges:** Option to open official table booking on Zomato / EazyDiner for users tied to aggregator loyalty programs.
  - **Navigation:** 1-tap Google Maps directions anchor opening Apple Maps or Google Maps directly.

---

### Feature 5: High-Speed Edge Performance & Enterprise SSL
- **Business Rationale:** Over 80% of visits originate on mobile 4G/5G connections. Every 1-second delay reduces conversion rates by 20%.
- **Technical Architecture:**
  - Zero-server client-side static build (Vite + React + Tailwind).
  - Cloudflare Pages edge hosting with automatic global CDN caching, HTTP/3, and Brotli compression.
  - Automatic SSL (HTTPS padlock) ensuring zero browser security warnings.
  - Responsive WebP images with lazy-loading and explicit aspect ratios.
  - Performance target: **90+ Lighthouse Mobile Performance Score**.

---

## 3. Pitch Script for the Restaurant Owner (Word-for-Word)

> *"Hi [Owner/Manager Name],*  
>  
> *I didn't just build a website that looks good—I built a **direct revenue generator** for Peepai Brewery & Kitchen.*  
>  
> *Right now, thousands of IT professionals at Manyata Tech Park and Kirloskar Tech Park are planning quarterly team lunches, corporate milestone parties, and Friday sundowners. Instead of letting them book through 3rd-party aggregators who take a 15–20% commission, your new site has a dedicated **Corporate Outings Portal** that delivers structured group inquiries straight to your manager's WhatsApp.*  
>  
> *A single 40-person corporate booking at ₹1,500 per head brings in ₹60,000 in one afternoon. This ₹30,000 website pays for itself on day one.*  
>  
> *On top of that, your craft beers on tap are interactive and mobile-first, your Google local search presence is fully indexed, and the site loads in under a second on any smartphone.*  
>  
> *Let's put your best foot forward and capture these high-ticket bookings."*

---

## 4. Phased Implementation Plan

### Phase 1: Corporate & Events Inquiry Portal
1. Create `src/components/sections/CorporateEvents.tsx` with high-impact corporate event photography, venue capacity breakdown (Mezzanine, Terrace, Courtyard), and a dedicated corporate booking form.
2. Build an intelligent WhatsApp corporate lead generator with pre-formatted message:
   `"New Corporate Event Inquiry: Company: [X], Guests: [Y], Budget: [Z], Date: [D]..."`.
3. Add a "Corporate & Events" nav link in `src/components/ui/Navbar.tsx` and quick link in Hero.

### Phase 2: Interactive Mobile-First Tap & Food Menu
1. Build `src/components/sections/InteractiveMenu.tsx` featuring tabbed navigation:
   - **On Tap** (Craft beers with ABV, IBU, style tags).
   - **Cocktails** (Signature concoctions).
   - **Food** (Starters, Pizzas, Mains with Veg/Non-Veg indicators).
2. Retain the dual PDF viewer buttons as a secondary "View Full Printed Menu (PDF)" drawer.

### Phase 3: Technical SEO & Schema Injection
1. Inject comprehensive `schema.org/Brewery` and `schema.org/Restaurant` structured JSON-LD into `index.html`.
2. Optimize Open Graph tags, canonical links, and local search keywords for Hebbal and North Bengaluru.

### Phase 4: Aggregator & Booking Ecosystem Links
1. Update `src/components/sections/Reserve.tsx` with seamless dual options: Direct WhatsApp Booking (Recommended) + Quick Aggregator links (Zomato/EazyDiner/Call).

### Phase 5: Verification & Production Build
1. Execute `npm run build` and verify bundle optimization.
2. Test on mobile viewports (360px–430px) and verify performance.
3. Commit and push updates to `Tarun4201/peepai-project`.
