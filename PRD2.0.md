# Peepai Brewery & Kitchen --- PRD 2.0

## Master Prompt for Google Antigravity

**Project:** Upgrade the existing Peepai Brewery & Kitchen website\
**Location:** Hebbal, Bengaluru\
**Document purpose:** Product requirements and implementation master
prompt\
**Primary brand reference:** The supplied Peepai logo

------------------------------------------------------------------------

## 1. Project Objective

Act as a senior UI/UX designer, creative director, and frontend engineer
specializing in premium restaurant and hospitality websites.

A first version of the Peepai Brewery & Kitchen website already exists
and includes a gallery with photographs of the restaurant interior.

Upgrade the existing website into a premium, immersive, interactive
restaurant website while preserving its existing functionality, menu
data, routes, and working features.

**Before making changes:** inspect the complete existing project,
including its framework, routes, components, styling, assets, and
current functionality. Implement improvements directly in the existing
codebase. Do not create a separate demo or replace the entire project
unnecessarily.

## 2. Brand Identity and Design System

Use the supplied Peepai logo as the primary visual reference. The
website should feel like a premium brewery, contemporary restaurant, and
sophisticated nightlife destination.

### 2.1 Brand colours

Build a consistent design system around these colours:

-   **Deep teal:** `#03445A` or a visually matching colour sampled from
    the supplied logo.
-   **Rich navy:** `#062B3A` for darker backgrounds and premium
    sections.
-   **Warm metallic gold:** `#D9B34A` for restrained accents, borders,
    icons, and highlights.
-   **Champagne gold:** `#F0D77A` for subtle highlights.
-   **Warm ivory:** `#F7F3E8` for light sections and text on dark
    backgrounds.
-   **Charcoal:** `#171B1E` for readable dark text on light surfaces.

Use deep teal as the primary brand colour, with gold as a restrained
accent. Avoid excessive gold, bright gradients, generic purple themes,
and unrelated colour combinations.

Use the supplied logo wherever appropriate. Preserve its aspect ratio.
Do not distort, recolour, or recreate it unnecessarily.

Apply the design system consistently across the navbar, hero, menu,
gallery, buttons, footer, loading states, and interactive elements.

### 2.2 Typography

Use a premium, carefully selected font pairing:

-   **Headings:** Cormorant Garamond or Playfair Display.
-   **Body text and navigation:** Manrope or Inter.
-   **Prices and metadata:** Manrope, with consistent numerical
    alignment.

Use a clear typographic hierarchy, elegant headings, readable body text,
balanced letter spacing, and generous line height. Load fonts
efficiently through a reliable font provider or locally hosted assets,
with suitable fallbacks.

Avoid excessive uppercase text, oversized paragraphs, inconsistent font
weights, and too many font families.

## 3. Hero Section

Create an immersive first impression.

Requirements: - Large, high-quality photograph of the actual restaurant
interior or dining experience. - Deep teal overlay to maintain brand
consistency and text readability. - Peepai logo or wordmark with
appropriate spacing. - Elegant headline introducing the restaurant
experience. - Concise supporting text. - Primary CTA: **Explore Our
Menu**. - Secondary CTA: **Discover Peepai**. - Subtle scroll
indicator. - Refined entrance animations and gentle image transitions.

The hero should feel cinematic and premium without compromising loading
speed.

Use an actual, verified Peepai photograph wherever possible. Do not use
an unrelated restaurant image and represent it as Peepai.

## 4. Restaurant Photography and Gallery

The existing website already contains an interior-photo gallery. Upgrade
it rather than removing it.

Where available and verified, include photographs showing: - Restaurant
interiors and seating areas. - Overall ambience and architectural
details. - Bar and counter areas. - Lighting, dÃ©cor, and distinctive
interior elements. - Dining tables and group seating. - Food
presentation and signature dishes. - Exterior and entrance.

### 4.1 Image sourcing rules

Prioritize: 1. Existing photographs already present in the project. 2.
Original photographs supplied by the restaurant. 3. Official restaurant
photography authorized for website use. 4. Properly licensed
professional hospitality photography, only for clearly generic
illustrative purposes.

Do not scrape or hotlink Zomato images without permission. Do not
fabricate restaurant-specific scenes or use generic stock photographs as
if they depict the actual premises.

If additional verified Peepai photographs are unavailable, keep the
existing photographs, improve their presentation, and provide clearly
identified placeholders for future replacement.

### 4.2 Gallery experience

Implement: - Responsive masonry or editorial grid layout. - A mix of
large feature images and smaller supporting images. - Rounded or subtly
softened corners. - Consistent image ratios where appropriate. - Smooth
hover zoom. - Gold-accented hover states. - Click-to-open lightbox. -
Previous and next navigation. - Keyboard navigation and
Escape-to-close. - Accurate image captions where available. - Lazy
loading and optimized image formats.

The gallery should feel like a premium hospitality magazine rather than
a generic image grid.

## 5. Interactive UI/UX Requirements

Use interaction extensively but purposefully.

### 5.1 Navigation

-   Sticky navigation with a transparent initial state over the hero.
-   Transition into a deep teal background when scrolling.
-   Smooth hover underline animations in gold.
-   Responsive mobile navigation drawer.
-   Clearly visible active section.
-   Accessible keyboard and focus states.

### 5.2 Scrolling and motion

-   Smooth scrolling between sections.
-   Subtle reveal animations as sections enter the viewport.
-   Gentle parallax for selected background imagery, if performance
    permits.
-   Animated section transitions without excessive movement.

### 5.3 Menu interactions

-   Interactive category navigation.
-   Search by dish name with a clear button.
-   Dish cards with smooth hover effects.
-   Prominent, accurately displayed prices.
-   Filters only for verified dietary attributes.
-   Dish detail modal or drawer where useful.
-   Clear empty state when a search returns no results.

Preserve existing menu data. Interactions must operate on real data
rather than hardcoded demo items.

### 5.4 Gallery interactions

-   Lightbox with image navigation.
-   Smooth transitions between images.
-   Close button and keyboard support.
-   Touch-friendly mobile interactions.

### 5.5 Micro-interactions

-   Elegant button transitions.
-   Subtle gold highlights.
-   Smooth accordion and dropdown animations.
-   Tasteful loading states.
-   Clear feedback for form submissions.
-   Consistent focus, hover, active, and disabled states.

Motion must remain restrained, fast, accessible, and comfortable to
browse.

## 6. Reduce Emoji Usage

Audit the complete existing website and significantly reduce emoji
usage.

Remove decorative emojis from: - Navigation labels. - Hero text. -
Section headings. - Menu categories. - Dish cards. - Buttons and calls
to action. - Contact information. - Footer content.

Use Lucide icons or another consistent professional SVG icon library
instead. Prefer clean line icons in ivory or restrained gold. Keep icon
size, stroke, and spacing consistent.

Do not automatically replace every emoji with an icon. Remove purely
decorative elements when unnecessary.

## 7. Website Sections and Content

Inspect existing routes and sections, then improve them while preserving
their purpose. Where present, polish:

-   Navigation.
-   Hero.
-   About Peepai.
-   Featured dishes.
-   Complete food menu.
-   Restaurant gallery.
-   Ambience and experience.
-   Contact information.
-   Location and directions.
-   Reservation or enquiry section, if supported.
-   Footer.

Use the same spacing system, typography, colour tokens, button styles,
iconography, and animation principles throughout the website.

Avoid repetitive card layouts. Combine editorial image sections, clean
grids, generous whitespace, and immersive full-width sections.

Do not invent customer reviews, awards, ratings, opening hours, contact
details, offers, or restaurant claims. Use existing verified project
data.

## 8. Technical Requirements

-   Preserve the current framework and project structure.
-   Reuse existing components where appropriate.
-   Use reusable, maintainable components and design tokens.
-   Support mobile, tablet, laptop, and large desktop screens.
-   Optimize image sizes and use WebP or AVIF where appropriate.
-   Lazy-load below-the-fold images.
-   Avoid unnecessary dependencies.
-   Prevent layout shifts while images load.
-   Use semantic HTML and accessible labels.
-   Maintain suitable colour contrast.
-   Respect reduced-motion preferences.
-   Ensure every button and interactive control has a meaningful action.
-   Preserve existing routes, working features, and menu information.
-   Do not expose API keys or secrets.

## 9. Visual Quality Target

The final result should resemble a professionally designed website for a
premium urban brewery and kitchen.

Desired characteristics: - Deep teal and gold identity inspired by the
actual logo. - Editorial-quality restaurant photography. - Elegant serif
display headings paired with modern sans-serif body text. -
Sophisticated navigation and spacing. - Smooth, purposeful animations. -
Minimal emoji usage. - Consistent professional icons. - Excellent mobile
presentation. - Premium appearance without excessive decoration.

Avoid generic AI-generated landing-page layouts, excessive gradients,
excessive glassmorphism, floating decorative shapes, emoji-heavy cards,
and repetitive animations.

## 10. Implementation and Verification

Do not stop after proposing a design or generating a screenshot.
Implement the changes in the existing project.

After implementation: 1. Run the project's existing development or build
commands. 2. Fix compilation errors and broken imports. 3. Check that
every existing route still works. 4. Test navbar behaviour, menu
navigation, search, gallery lightbox, and responsive mobile menu. 5.
Verify image paths and remove broken image references. 6. Check for
horizontal overflow on mobile. 7. Confirm that the supplied logo
displays correctly. 8. Verify that no existing menu items or prices were
accidentally removed. 9. Summarize the files changed and improvements
completed. 10. List any missing restaurant photographs or information
that still needs to be supplied.

## 11. Definition of Done

The upgrade is complete when: - The website uses a cohesive
deep-teal-and-gold visual identity based on the supplied logo. - Premium
typography is applied consistently. - The existing interior gallery is
improved and remains functional. - Additional images are verified or
clearly marked as placeholders. - Menu items, prices, and existing data
are preserved. - Interactive controls work on desktop and mobile. -
Emoji usage is significantly reduced in favour of professional icons or
clean text. - Responsive layouts and accessibility considerations are
addressed. - Existing routes and features continue to work. - The
project builds successfully, or any pre-existing build issue is clearly
documented.

------------------------------------------------------------------------

## Master Instruction to Antigravity

**Inspect first, then implement.** Treat this document as the master
product requirement for the Peepai website upgrade. Make changes
directly in the existing project, preserve working functionality and
verified data, and prioritize brand consistency, real photography,
premium UI/UX, performance, accessibility, and responsive behaviour. Do
not merely return suggestions or a mockup; complete the implementation
and report what changed and what still requires restaurant-provided
assets or verification.
