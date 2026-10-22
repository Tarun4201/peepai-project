import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  UtensilsCrossed,
  Beer,
  Download,
  ExternalLink,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Send,
  X,
  Sparkles,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  FileText,
  Search,
  GlassWater,
} from 'lucide-react'
import type { RestaurantConfig } from '../../config/restaurant'
import { MENU_FOOD_PHOTOS, ALL_MENU_ITEMS } from '../../data/menuData'

export const CRAFT_BEERS_ON_TAP = [
  {
    id: 'witbier',
    name: 'Peepai Belgian Witbier',
    style: 'Wheat Ale / Belgian Wit',
    abv: '4.8%',
    ibu: '14',
    notes: 'Brewed with crushed coriander seeds and sun-dried orange peel. Cloud-golden, light-bodied, and delightfully crisp.',
    badge: 'Guest Favourite',
    serving: 'Pint 500ml • Pitcher 1.5L',
    image: '/photos/peepai-bar-counter.jpg',
  },
  {
    id: 'ipa',
    name: 'Hebbal Session IPA',
    style: 'India Pale Ale',
    abv: '5.2%',
    ibu: '38',
    notes: 'Explosive aromas of ripe tropical mango and citrus zest balanced with a clean resinous pine finish. Bold yet sessionable.',
    badge: 'Brewmaster Pick',
    serving: 'Pint 500ml • Pitcher 1.5L',
    image: '/photos/peepai-brewery.jpg',
  },
  {
    id: 'stout',
    name: 'Roasted Chocolate Stout',
    style: 'Dark Dry Stout',
    abv: '5.4%',
    ibu: '26',
    notes: 'Deep dark pour infused with roasted barley and cocoa nibs. Notes of dark chocolate, caramel, and espresso cream.',
    badge: 'Chef Special',
    serving: 'Pint 500ml • Pitcher 1.5L',
    image: '/photos/peepai-bar-stools.jpg',
  },
  {
    id: 'hefeweizen',
    name: 'Bavarian Hefeweizen',
    style: 'German Wheat',
    abv: '5.0%',
    ibu: '12',
    notes: 'Classic top-fermented wheat ale displaying signature aromas of clove spice and ripe banana with a creamy head.',
    badge: 'Classic Pours',
    serving: 'Pint 500ml • Pitcher 1.5L',
    image: '/photos/peepai-dining.jpg',
  },
  {
    id: 'cider',
    name: 'Himachal Crisp Apple Cider',
    style: 'Artisanal Fruit Cider',
    abv: '4.5%',
    ibu: '8',
    notes: 'Crushed crisp mountain apples fermented for a semi-dry, naturally effervescent and refreshing pour.',
    badge: 'Sweet & Crisp',
    serving: 'Pint 500ml • Pitcher 1.5L',
    image: '/photos/peepai-cocktail-bar-canopy.jpg',
  },
]

export const SIGNATURE_COCKTAILS = [
  {
    id: 'liit',
    name: 'Peepai Electric LIIT',
    spirit: 'Vodka, Dry Gin, White Rum, Tequila, Triple Sec, Blue Curaçao, Fresh Citrus',
    price: 649,
    notes: 'High-octane house signature with electric citrus fizz and layered botanicals.',
    badge: 'House Signature',
  },
  {
    id: 'old-fashioned',
    name: 'Smoked Amber Old Fashioned',
    spirit: 'Bourbon Whisky, Angostura Bitters, Brown Sugar Cube, Oak Wood Smoke',
    price: 599,
    notes: 'Poured over handcrafted ice sphere, slow-smoked over charred oak wood.',
    badge: 'Connoisseur Pick',
  },
  {
    id: 'gnt',
    name: 'Bangalore Botanical G&T',
    spirit: 'Artisan Dry Gin, Fresh Rosemary, Dehydrated Grapefruit, Elderflower Tonic',
    price: 529,
    notes: 'Delicately floral and aromatic, crafted for sundowners on our sky terrace.',
    badge: 'Terrace Special',
  },
  {
    id: 'picante',
    name: 'Fiery Mango Picante',
    spirit: 'Silver Tequila, Fresh Alphonso Mango, Bird’s Eye Chilli, Lime, Black Salt',
    price: 549,
    notes: 'Sweet tropical mango purée ignited with spicy green chilli and tangy citrus.',
    badge: 'Bestseller',
  },
]

interface MenuProps {
  config: RestaurantConfig
}

interface MenuPage {
  pageNumber: number;
  title: string;
  image: string;
  thumb: string;
}

const FOOD_MENU_PAGES: MenuPage[] = [
  {
    pageNumber: 1,
    title: 'Cover — Food Menu & Terrace',
    image: '/menu-pages/food-page-01.jpg',
    thumb: '/menu-pages/thumbs/food-page-01.jpg',
  },
  {
    pageNumber: 2,
    title: 'Welcome to Peepai Story',
    image: '/menu-pages/food-page-02.jpg',
    thumb: '/menu-pages/thumbs/food-page-02.jpg',
  },
  {
    pageNumber: 3,
    title: 'Soups & Salads',
    image: '/menu-pages/food-page-03.jpg',
    thumb: '/menu-pages/thumbs/food-page-03.jpg',
  },
  {
    pageNumber: 4,
    title: 'Munchies, Chaats & Egg Dishes',
    image: '/menu-pages/food-page-04.jpg',
    thumb: '/menu-pages/thumbs/food-page-04.jpg',
  },
  {
    pageNumber: 5,
    title: 'Dumplings & Chinese Appetisers',
    image: '/menu-pages/food-page-05.jpg',
    thumb: '/menu-pages/thumbs/food-page-05.jpg',
  },
  {
    pageNumber: 6,
    title: 'South Indian Appetisers',
    image: '/menu-pages/food-page-06.jpg',
    thumb: '/menu-pages/thumbs/food-page-06.jpg',
  },
  {
    pageNumber: 7,
    title: 'Indian Kebabs & Tandoor',
    image: '/menu-pages/food-page-07.jpg',
    thumb: '/menu-pages/thumbs/food-page-07.jpg',
  },
  {
    pageNumber: 8,
    title: 'Continental Appetisers & Pasta',
    image: '/menu-pages/food-page-08.jpg',
    thumb: '/menu-pages/thumbs/food-page-08.jpg',
  },
  {
    pageNumber: 9,
    title: 'Wood-Fired Pizza & Garlic Bread',
    image: '/menu-pages/food-page-09.jpg',
    thumb: '/menu-pages/thumbs/food-page-09.jpg',
  },
  {
    pageNumber: 10,
    title: 'European Grill & Smash Burgers',
    image: '/menu-pages/food-page-10.jpg',
    thumb: '/menu-pages/thumbs/food-page-10.jpg',
  },
  {
    pageNumber: 11,
    title: 'South Indian Curry & Biryani',
    image: '/menu-pages/food-page-11.jpg',
    thumb: '/menu-pages/thumbs/food-page-11.jpg',
  },
  {
    pageNumber: 12,
    title: 'Sushi, Asian Noodles & Rice',
    image: '/menu-pages/food-page-12.jpg',
    thumb: '/menu-pages/thumbs/food-page-12.jpg',
  },
  {
    pageNumber: 13,
    title: 'North Indian Curries & Breads',
    image: '/menu-pages/food-page-13.jpg',
    thumb: '/menu-pages/thumbs/food-page-13.jpg',
  },
  {
    pageNumber: 14,
    title: 'Peepai Patisserie — Cakes & Desserts',
    image: '/menu-pages/food-page-14.jpg',
    thumb: '/menu-pages/thumbs/food-page-14.jpg',
  },
]

const BAR_MENU_PAGES: MenuPage[] = [
  {
    pageNumber: 1,
    title: 'Beverage Menu Cover',
    image: '/menu-pages/bar-page-01.jpg',
    thumb: '/menu-pages/thumbs/bar-page-01.jpg',
  },
  {
    pageNumber: 2,
    title: 'Classic Cocktails, Single Malt, Vodka & Gin',
    image: '/menu-pages/bar-page-02.jpg',
    thumb: '/menu-pages/thumbs/bar-page-02.jpg',
  },
  {
    pageNumber: 3,
    title: 'Blended Scotch, Tequila, Wines & Shooters',
    image: '/menu-pages/bar-page-03.jpg',
    thumb: '/menu-pages/thumbs/bar-page-03.jpg',
  },
  {
    pageNumber: 4,
    title: 'Whisky, Mocktails, Liqueurs & Cognac',
    image: '/menu-pages/bar-page-04.jpg',
    thumb: '/menu-pages/thumbs/bar-page-04.jpg',
  },
  {
    pageNumber: 5,
    title: 'Craft Beers on Tap & Brewery Specials',
    image: '/menu-pages/bar-page-05.jpg',
    thumb: '/menu-pages/thumbs/bar-page-05.jpg',
  },
]

export function Menu({ config }: MenuProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  // Top-level display mode: 'interactive' (mobile-first tap & food cards) vs 'pdf' (exact print flipbook)
  const [displayMode, setDisplayMode] = useState<'interactive' | 'pdf'>('interactive')
  const [interactiveCategory, setInteractiveCategory] = useState<'beers' | 'cocktails' | 'food'>('beers')
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'non-veg'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [foodCategoryTab, setFoodCategoryTab] = useState<string>('All')

  // Active menu tab: 'food' (Left Button) vs 'bar' (Right Button)
  const [activeMenu, setActiveMenu] = useState<'food' | 'bar'>('food')

  // Page index for single-page slide view
  const [currentPage, setCurrentPage] = useState<number>(0)

  // View mode: 'single' (page flip/slide) vs 'continuous' (all pages stacked)
  const [viewMode, setViewMode] = useState<'single' | 'continuous'>('single')

  // Fullscreen view modal
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Zoom scale: 1, 1.25, 1.5
  const [zoomLevel, setZoomLevel] = useState<number>(1)

  const activePages = activeMenu === 'food' ? FOOD_MENU_PAGES : BAR_MENU_PAGES
  const activePdfUrl =
    activeMenu === 'food' ? '/peepai-food-menu.pdf' : '/peepai-bar-menu.pdf'
  const activePdfName =
    activeMenu === 'food'
      ? 'Peepai-Brewery-Food-Menu.pdf'
      : 'Peepai-Brewery-Bar-Menu.pdf'

  // Reset page when switching menu
  const handleSwitchMenu = (type: 'food' | 'bar') => {
    setActiveMenu(type)
    setCurrentPage(0)
    setZoomLevel(1)
  }

  // Next / Prev handlers
  const handleNextPage = () => {
    if (currentPage < activePages.length - 1) {
      setCurrentPage(prev => prev + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1)
    }
  }

  // Keyboard navigation for arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNextPage()
      if (e.key === 'ArrowLeft') handlePrevPage()
      if (e.key === 'Escape' && isFullscreen) setIsFullscreen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentPage, activePages.length, isFullscreen])

  // Computed filter for interactive food items
  const filteredFoodItems = ALL_MENU_ITEMS.filter(item => {
    if (dietaryFilter === 'veg' && item.dietary !== 'veg') return false
    if (dietaryFilter === 'non-veg' && item.dietary === 'veg') return false
    if (foodCategoryTab !== 'All' && !item.category.toLowerCase().includes(foodCategoryTab.toLowerCase())) return false
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      return item.name.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
    }
    return true
  })

  return (
    <section
      id="menu"
      ref={ref}
      className="section-py relative overflow-hidden"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* ─── CONTINUOUS SIDE-SCROLLING SHOWCASE OF FOOD & DRINKS (ENLARGED & PROMINENT) ─── */}
      <div className="relative w-full overflow-hidden mb-14 select-none border-y border-[rgba(180,138,69,0.22)] bg-[#13120f] py-8 sm:py-10 shadow-2xl">
        {/* Section Mini Header */}
        <div className="container-xl mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-5 h-[1px] bg-[#B48A45]" />
            <span
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#B48A45',
              }}
            >
              Kitchen &amp; Brewery Highlights
            </span>
          </div>
          <span
            className="text-[11px] text-[rgba(200,189,170,0.5)] font-['Manrope'] hidden sm:inline"
          >
            Hover card to pause · Scroll horizontally
          </span>
        </div>

        {/* Ambient Left & Right Vignette Fades */}
        <div
          className="absolute inset-y-0 left-0 w-16 sm:w-32 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, #13120f 0%, transparent 100%)',
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-16 sm:w-32 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(270deg, #13120f 0%, transparent 100%)',
          }}
        />

        {/* Marquee Track looping infinitely */}
        <div className="marquee-track flex items-stretch gap-6 sm:gap-8 px-4">
          {[...MENU_FOOD_PHOTOS, ...MENU_FOOD_PHOTOS].map(
            (photo, idx) => (
              <div
                key={`food-reel-${idx}`}
                className="w-72 sm:w-80 md:w-96 flex-shrink-0 flex flex-col rounded-[4px] overflow-hidden transition-all duration-300 group hover:-translate-y-1"
                style={{
                  background: 'rgba(28,26,22,0.92)',
                  border: '1px solid rgba(180,138,69,0.22)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
                }}
              >
                {/* Large Food Image Container */}
                <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden bg-[#181612]">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{
                      objectPosition: photo.src.includes('bar-counter')
                        ? 'center 35%'
                        : photo.src.includes('cocktail')
                        ? 'center 35%'
                        : photo.src.includes('bar-stools')
                        ? 'center 40%'
                        : 'center center',
                    }}
                  />
                  {/* Subtle Top & Bottom Gradient Shadows */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(23,23,19,0.85)] via-transparent to-[rgba(23,23,19,0.3)] opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Badge Pill */}
                  {photo.badge && (
                    <div className="absolute top-3 left-3 z-10">
                      <span
                        className="px-2.5 py-1 rounded-[2px] text-[10px] sm:text-[11px] font-bold font-['Manrope'] tracking-wider uppercase backdrop-blur-sm"
                        style={{
                          background: 'rgba(23,23,19,0.85)',
                          border: '1px solid rgba(180,138,69,0.4)',
                          color: '#B48A45',
                        }}
                      >
                        {photo.badge}
                      </span>
                    </div>
                  )}

                  {/* Category Pill */}
                  {photo.category && (
                    <div className="absolute bottom-3 right-3 z-10">
                      <span
                        className="px-2 py-0.5 rounded-[2px] text-[9px] sm:text-[10px] font-semibold font-['Manrope'] tracking-wider uppercase"
                        style={{
                          background: 'rgba(180,138,69,0.22)',
                          color: '#F4EFE5',
                          border: '1px solid rgba(200,189,170,0.2)',
                        }}
                      >
                        {photo.category}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Text Content */}
                <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <h3
                      style={{
                        fontFamily: '"Cormorant Garamond", Georgia, serif',
                        fontSize: '1.35rem',
                        fontWeight: 600,
                        color: '#F4EFE5',
                        lineHeight: 1.2,
                        marginBottom: '0.35rem',
                      }}
                      className="group-hover:text-[#B48A45] transition-colors"
                    >
                      {photo.dishName}
                    </h3>

                    {photo.description && (
                      <p
                        style={{
                          fontFamily: 'Manrope, sans-serif',
                          fontSize: '0.78rem',
                          lineHeight: 1.5,
                          color: 'rgba(200,189,170,0.72)',
                        }}
                        className="line-clamp-2"
                      >
                        {photo.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-3 pt-3 border-t border-[rgba(200,189,170,0.08)] flex items-center justify-between">
                    <span
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#B48A45',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                      }}
                    >
                      <Sparkles className="w-3 h-3 text-[#B48A45]" />
                      Fresh In Kitchen
                    </span>
                    <span
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        fontSize: '0.68rem',
                        color: 'rgba(200,189,170,0.45)',
                      }}
                    >
                      Served Daily
                    </span>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <div className="container-xl relative z-10">
        {/* Header Title & Description */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-6 h-[1px] bg-[#B48A45]" />
            <p className="section-label" style={{ margin: 0 }}>
              Official Printed Editions
            </p>
            <span className="w-6 h-[1px] bg-[#B48A45]" />
          </div>

          <h2
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              fontWeight: 600,
              lineHeight: 1.12,
              letterSpacing: '-0.01em',
              color: '#F4EFE5',
              marginBottom: '0.85rem',
            }}
          >
            The Food &amp;{' '}
            <span style={{ color: '#B48A45', fontStyle: 'italic' }}>
              Bar Menus
            </span>
          </h2>
          <p
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: '0.92rem',
              color: 'rgba(200,189,170,0.75)',
              maxWidth: '640px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Switch between our Kitchen Food Menu and Brewery Bar Menu below.
            Optimized for seamless high-definition viewing across mobile and desktop.
          </p>
        </motion.div>

        {/* ─── DISPLAY MODE TOGGLE: INTERACTIVE QUICK BROWSE vs. OFFICIAL PDF FLIPBOOK ─── */}
        <div className="flex justify-center mb-8 px-4">
          <div
            className="p-1 rounded-full inline-flex items-center gap-1.5"
            style={{
              background: '#151410',
              border: '1px solid rgba(180, 138, 69, 0.35)',
            }}
          >
            <button
              onClick={() => setDisplayMode('interactive')}
              className={`px-4 sm:px-6 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                displayMode === 'interactive'
                  ? 'bg-[#B48A45] text-[#171713] shadow-md'
                  : 'text-[rgba(244,239,229,0.7)] hover:text-[#F4EFE5]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Menu &amp; Tap</span>
            </button>

            <button
              onClick={() => setDisplayMode('pdf')}
              className={`px-4 sm:px-6 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                displayMode === 'pdf'
                  ? 'bg-[#B48A45] text-[#171713] shadow-md'
                  : 'text-[rgba(244,239,229,0.7)] hover:text-[#F4EFE5]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Official Printed Menu (PDF)</span>
            </button>
          </div>
        </div>

        {displayMode === 'interactive' ? (
          <div>
            {/* Interactive Category Selector */}
            <div className="flex justify-center gap-2 sm:gap-3 mb-8 flex-wrap">
              <button
                onClick={() => setInteractiveCategory('beers')}
                className={`px-4 sm:px-5 py-2.5 rounded-[2px] text-xs font-bold transition-all flex items-center gap-2 ${
                  interactiveCategory === 'beers'
                    ? 'bg-[#B48A45] text-[#171713]'
                    : 'bg-[#1c1a16] text-[#F4EFE5] border border-[rgba(180,138,69,0.25)] hover:border-[#B48A45]'
                }`}
              >
                <Beer className="w-3.5 h-3.5" />
                <span>Craft Beers on Tap</span>
              </button>

              <button
                onClick={() => setInteractiveCategory('cocktails')}
                className={`px-4 sm:px-5 py-2.5 rounded-[2px] text-xs font-bold transition-all flex items-center gap-2 ${
                  interactiveCategory === 'cocktails'
                    ? 'bg-[#B48A45] text-[#171713]'
                    : 'bg-[#1c1a16] text-[#F4EFE5] border border-[rgba(180,138,69,0.25)] hover:border-[#B48A45]'
                }`}
              >
                <GlassWater className="w-3.5 h-3.5" />
                <span>Signature Cocktails</span>
              </button>

              <button
                onClick={() => setInteractiveCategory('food')}
                className={`px-4 sm:px-5 py-2.5 rounded-[2px] text-xs font-bold transition-all flex items-center gap-2 ${
                  interactiveCategory === 'food'
                    ? 'bg-[#B48A45] text-[#171713]'
                    : 'bg-[#1c1a16] text-[#F4EFE5] border border-[rgba(180,138,69,0.25)] hover:border-[#B48A45]'
                }`}
              >
                <UtensilsCrossed className="w-3.5 h-3.5" />
                <span>Kitchen Classics &amp; Starters</span>
              </button>
            </div>

            {/* If Beers */}
            {interactiveCategory === 'beers' && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {CRAFT_BEERS_ON_TAP.map(beer => (
                  <div
                    key={beer.id}
                    className="p-6 rounded-[2px] flex flex-col justify-between transition-all hover:-translate-y-1"
                    style={{
                      background: 'var(--color-card)',
                      border: '1px solid rgba(180,138,69,0.22)',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                    }}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[0.65rem] font-bold tracking-wider uppercase text-[#B48A45]">
                          {beer.style}
                        </span>
                        <span className="px-2 py-0.5 rounded-[2px] text-[0.65rem] font-semibold bg-[rgba(180,138,69,0.15)] text-[#B48A45] border border-[rgba(180,138,69,0.3)]">
                          {beer.badge}
                        </span>
                      </div>

                      <h4
                        style={{
                          fontFamily: '"Cormorant Garamond", Georgia, serif',
                          fontSize: '1.5rem',
                          fontWeight: 600,
                          color: '#F4EFE5',
                          marginBottom: '0.5rem',
                        }}
                      >
                        {beer.name}
                      </h4>

                      <p
                        style={{
                          fontFamily: 'Manrope, sans-serif',
                          fontSize: '0.82rem',
                          lineHeight: 1.55,
                          color: 'rgba(200,189,170,0.8)',
                          marginBottom: '1.25rem',
                        }}
                      >
                        {beer.notes}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[rgba(200,189,170,0.12)] flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <span className="text-[#F4EFE5] font-semibold">ABV: {beer.abv}</span>
                        <span className="text-[rgba(200,189,170,0.6)]">IBU: {beer.ibu}</span>
                      </div>
                      <span className="text-[#B48A45] font-medium">{beer.serving}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* If Cocktails */}
            {interactiveCategory === 'cocktails' && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {SIGNATURE_COCKTAILS.map(cocktail => (
                  <div
                    key={cocktail.id}
                    className="p-6 rounded-[2px] flex flex-col justify-between transition-all hover:-translate-y-1"
                    style={{
                      background: 'var(--color-card)',
                      border: '1px solid rgba(180,138,69,0.22)',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                    }}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded-[2px] text-[0.65rem] font-semibold bg-[rgba(180,138,69,0.15)] text-[#B48A45] border border-[rgba(180,138,69,0.3)]">
                          {cocktail.badge}
                        </span>
                        <span className="font-['Bricolage_Grotesque'] text-lg font-bold text-[#F4EFE5]">
                          ₹{cocktail.price}
                        </span>
                      </div>

                      <h4
                        style={{
                          fontFamily: '"Cormorant Garamond", Georgia, serif',
                          fontSize: '1.6rem',
                          fontWeight: 600,
                          color: '#F4EFE5',
                          marginBottom: '0.4rem',
                        }}
                      >
                        {cocktail.name}
                      </h4>

                      <p className="text-xs text-[#B48A45] font-medium mb-2">
                        {cocktail.spirit}
                      </p>

                      <p
                        style={{
                          fontFamily: 'Manrope, sans-serif',
                          fontSize: '0.82rem',
                          lineHeight: 1.55,
                          color: 'rgba(200,189,170,0.8)',
                        }}
                      >
                        {cocktail.notes}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* If Food */}
            {interactiveCategory === 'food' && (
              <div>
                {/* Search & Dietary Filters */}
                <div className="mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  {/* Search Bar */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[rgba(200,189,170,0.5)]" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Search starters, pizzas, curries..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-[2px] text-xs text-[#F4EFE5] outline-none"
                      style={{
                        background: '#1c1a16',
                        border: '1px solid rgba(180,138,69,0.25)',
                      }}
                    />
                  </div>

                  {/* Dietary Toggle */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDietaryFilter('all')}
                      className={`px-3 py-1.5 rounded-[2px] text-xs font-semibold ${
                        dietaryFilter === 'all'
                          ? 'bg-[#B48A45] text-[#171713]'
                          : 'bg-[#1c1a16] text-[rgba(200,189,170,0.7)] border border-[rgba(180,138,69,0.2)]'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setDietaryFilter('veg')}
                      className={`px-3 py-1.5 rounded-[2px] text-xs font-semibold flex items-center gap-1.5 ${
                        dietaryFilter === 'veg'
                          ? 'bg-green-700 text-white'
                          : 'bg-[#1c1a16] text-green-400 border border-green-800/40'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      <span>Veg Only</span>
                    </button>
                    <button
                      onClick={() => setDietaryFilter('non-veg')}
                      className={`px-3 py-1.5 rounded-[2px] text-xs font-semibold flex items-center gap-1.5 ${
                        dietaryFilter === 'non-veg'
                          ? 'bg-red-800 text-white'
                          : 'bg-[#1c1a16] text-red-400 border border-red-800/40'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      <span>Non-Veg</span>
                    </button>
                  </div>
                </div>

                {/* Course Category Chips */}
                <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1 scrollbar-none">
                  {['All', 'Starters', 'Pizza', 'Main Course', 'Desserts'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setFoodCategoryTab(cat)}
                      className={`px-3 py-1 rounded-[2px] text-xs font-medium whitespace-nowrap transition-all ${
                        foodCategoryTab === cat
                          ? 'bg-[#B48A45]/20 text-[#B48A45] border border-[#B48A45]'
                          : 'bg-[#151410] text-[rgba(200,189,170,0.6)] border border-[rgba(200,189,170,0.15)] hover:text-[#F4EFE5]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Food Items Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredFoodItems.slice(0, 36).map(item => (
                    <div
                      key={item.id}
                      className="p-4 rounded-[2px] flex flex-col justify-between"
                      style={{
                        background: 'var(--color-card)',
                        border: '1px solid rgba(180,138,69,0.18)',
                      }}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full flex-shrink-0 ${
                              item.dietary === 'veg' ? 'bg-green-500' : 'bg-red-500'
                            }`}
                          />
                          <h5 className="font-semibold text-sm text-[#F4EFE5] leading-snug">
                            {item.name}
                          </h5>
                        </div>
                        {item.price && (
                          <span className="font-bold text-sm text-[#B48A45] whitespace-nowrap">
                            ₹{item.price}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-[0.7rem] text-[rgba(200,189,170,0.55)]">
                        <span>{item.category}</span>
                        {item.badge && (
                          <span className="text-[#B48A45] font-medium">{item.badge}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Switch to PDF Prompt */}
            <div className="mt-12 text-center p-6 rounded-[2px] bg-[#141310] border border-[rgba(180,138,69,0.2)]">
              <p className="text-sm text-[rgba(244,239,229,0.8)] mb-3">
                Want to browse the full printed menu pages exactly as served on the tables?
              </p>
              <button
                onClick={() => setDisplayMode('pdf')}
                className="btn-outline text-xs py-2 px-5 inline-flex items-center gap-2"
              >
                <FileText className="w-3.5 h-3.5 text-[#B48A45]" />
                <span>Switch to 14-Page Official PDF Flipbook</span>
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* ─── PRIMARY TOGGLE BUTTONS: LEFT (FOOD MENU) & RIGHT (BAR MENU) ─── */}
            <div className="max-w-2xl mx-auto mb-8 px-2 sm:px-0">
              <div
                className="grid grid-cols-2 gap-2 sm:gap-3 p-1 sm:p-1.5 rounded-[4px]"
                style={{
                  background: '#1c1a16',
                  border: '1px solid rgba(180, 138, 69, 0.25)',
                }}
              >
                {/* LEFT BUTTON: Peepai Food Menu */}
                <button
                  onClick={() => handleSwitchMenu('food')}
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    borderRadius: '3px',
                    border:
                      activeMenu === 'food'
                        ? '1px solid #B48A45'
                        : '1px solid transparent',
                    background:
                      activeMenu === 'food'
                        ? 'linear-gradient(135deg, rgba(180,138,69,0.25) 0%, rgba(30,28,24,0.9) 100%)'
                        : 'transparent',
                    color: activeMenu === 'food' ? '#F4EFE5' : 'rgba(200,189,170,0.65)',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                  className="p-2 sm:p-3.5 flex items-center justify-center gap-2 sm:gap-3 text-left group"
                >
                  <div
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
                    style={{
                      background:
                        activeMenu === 'food'
                          ? '#B48A45'
                          : 'rgba(200,189,170,0.08)',
                      color: activeMenu === 'food' ? '#171713' : '#B48A45',
                    }}
                  >
                    <UtensilsCrossed className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[11px] sm:text-sm font-bold tracking-wide uppercase truncate">
                      Peepai Food Menu
                    </span>
                    <span className="block text-[9px] sm:text-xs text-[rgba(200,189,170,0.55)] truncate">
                      14 Pages • Kitchen Specials
                    </span>
                  </div>
                </button>

                {/* RIGHT BUTTON: Peepai Bar Menu */}
                <button
                  onClick={() => handleSwitchMenu('bar')}
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    borderRadius: '3px',
                    border:
                      activeMenu === 'bar'
                        ? '1px solid #B48A45'
                        : '1px solid transparent',
                    background:
                      activeMenu === 'bar'
                        ? 'linear-gradient(135deg, rgba(180,138,69,0.25) 0%, rgba(30,28,24,0.9) 100%)'
                        : 'transparent',
                    color: activeMenu === 'bar' ? '#F4EFE5' : 'rgba(200,189,170,0.65)',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                  className="p-2 sm:p-3.5 flex items-center justify-center gap-2 sm:gap-3 text-left group"
                >
                  <div
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
                    style={{
                      background:
                        activeMenu === 'bar'
                          ? '#B48A45'
                          : 'rgba(200,189,170,0.08)',
                      color: activeMenu === 'bar' ? '#171713' : '#B48A45',
                    }}
                  >
                    <Beer className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[11px] sm:text-sm font-bold tracking-wide uppercase truncate">
                      Peepai Bar Menu
                    </span>
                    <span className="block text-[9px] sm:text-xs text-[rgba(200,189,170,0.55)] truncate">
                      5 Pages • Microbrews
                    </span>
                  </div>
                </button>
              </div>
            </div>

        {/* ─── VIEWER CONTAINER (OPTIMIZED FOR LAPTOP & MOBILE) ─── */}
        <motion.div
          key={activeMenu}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative w-full rounded-[4px] overflow-hidden shadow-2xl"
          style={{
            background: 'var(--color-card)',
            border: '1px solid rgba(180, 138, 69, 0.28)',
          }}
        >
          {/* Top Control Bar */}
          <div
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-[rgba(180,138,69,0.18)]"
            style={{ background: '#1c1a16' }}
          >
            {/* Current Page Title & Counter */}
            <div className="flex items-center gap-3">
              <span
                className="px-2.5 py-1 rounded-[2px] text-xs font-bold font-['Manrope'] tracking-wider uppercase flex-shrink-0"
                style={{
                  background: 'rgba(180, 138, 69, 0.18)',
                  border: '1px solid rgba(180, 138, 69, 0.35)',
                  color: '#B48A45',
                }}
              >
                Page {currentPage + 1} / {activePages.length}
              </span>

              <p
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  color: '#F4EFE5',
                }}
                className="truncate"
              >
                {activePages[currentPage]?.title}
              </p>
            </div>

            {/* Viewer Action Controls */}
            <div className="flex items-center flex-wrap gap-2 justify-between sm:justify-end">
              {/* View Mode Toggle: Single Page vs All Pages Scroll */}
              <div
                className="flex items-center rounded-[2px] overflow-hidden"
                style={{
                  background: 'rgba(23,23,19,0.8)',
                  border: '1px solid rgba(200,189,170,0.15)',
                }}
              >
                <button
                  onClick={() => setViewMode('single')}
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '0.66rem',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    padding: '0.45rem 0.75rem',
                    background:
                      viewMode === 'single' ? '#B48A45' : 'transparent',
                    color:
                      viewMode === 'single' ? '#171713' : 'rgba(200,189,170,0.7)',
                    cursor: 'pointer',
                  }}
                  title="Single Page Flip Mode"
                >
                  Page View
                </button>
                <button
                  onClick={() => setViewMode('continuous')}
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '0.66rem',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    padding: '0.45rem 0.75rem',
                    background:
                      viewMode === 'continuous' ? '#B48A45' : 'transparent',
                    color:
                      viewMode === 'continuous'
                        ? '#171713'
                        : 'rgba(200,189,170,0.7)',
                    cursor: 'pointer',
                  }}
                  title="All Pages Continuous Scroll Mode"
                >
                  All Pages
                </button>
              </div>

              {/* Zoom controls (Active in Single Page mode) */}
              {viewMode === 'single' && (
                <div className="hidden sm:flex items-center gap-1 bg-[#171713] px-1.5 py-1 rounded-[2px] border border-[rgba(200,189,170,0.12)]">
                  <button
                    onClick={() =>
                      setZoomLevel(z => Math.max(1, +(z - 0.25).toFixed(2)))
                    }
                    disabled={zoomLevel <= 1}
                    className="p-1 text-[rgba(200,189,170,0.7)] hover:text-white disabled:opacity-30"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] font-bold font-['Manrope'] text-[#B48A45] px-1">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    onClick={() =>
                      setZoomLevel(z => Math.min(1.75, +(z + 0.25).toFixed(2)))
                    }
                    disabled={zoomLevel >= 1.75}
                    className="p-1 text-[rgba(200,189,170,0.7)] hover:text-white disabled:opacity-30"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  {zoomLevel > 1 && (
                    <button
                      onClick={() => setZoomLevel(1)}
                      className="p-1 text-[#C8793C] hover:text-white"
                      title="Reset Zoom"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                  )}
                </div>
              )}

              {/* Fullscreen Button */}
              <button
                onClick={() => setIsFullscreen(true)}
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: '0.66rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '0.45rem 0.8rem',
                  borderRadius: '2px',
                  background: 'rgba(23,23,19,0.8)',
                  border: '1px solid rgba(200,189,170,0.18)',
                  color: '#F4EFE5',
                  cursor: 'pointer',
                }}
                className="inline-flex items-center gap-1.5 hover:border-[#B48A45] hover:text-[#B48A45]"
                title="Fullscreen Reader"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Fullscreen</span>
              </button>

              {/* Download PDF button */}
              <a
                href={activePdfUrl}
                download={activePdfName}
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: '0.66rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '2px',
                  background: '#B48A45',
                  border: '1px solid #B48A45',
                  color: '#171713',
                  textDecoration: 'none',
                }}
                className="inline-flex items-center gap-1.5 hover:bg-[#C8973D] shadow-sm flex-shrink-0"
                title="Download Official PDF"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF</span>
              </a>
            </div>
          </div>

          {/* ─── MAIN DISPLAY CANVAS ─── */}
          {viewMode === 'single' ? (
            /* Mode 1: Single Page Slide View */
            <div className="relative w-full bg-[#12120e] flex flex-col items-center justify-center p-3 sm:p-6 select-none overflow-hidden min-h-[520px] sm:min-h-[720px] lg:min-h-[860px]">
              {/* Prev Page Button */}
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                style={{
                  background: 'rgba(23,23,19,0.85)',
                  border: '1px solid rgba(180,138,69,0.3)',
                  color: '#F4EFE5',
                }}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-12 sm:h-12 rounded-full flex items-center justify-center disabled:opacity-20 hover:scale-105 hover:border-[#B48A45] transition-all cursor-pointer shadow-xl"
                aria-label="Previous Page"
                title="Previous Page (Left Arrow)"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Page Image Display Container */}
              <div
                className="relative max-w-full flex items-center justify-center transition-transform duration-200 ease-out"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'center center',
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`${activeMenu}-${currentPage}`}
                    src={activePages[currentPage].image}
                    alt={activePages[currentPage].title}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className="max-h-[70vh] sm:max-h-[82vh] lg:max-h-[880px] w-auto max-w-full object-contain rounded-[2px] shadow-2xl"
                    style={{
                      boxShadow:
                        '0 12px 40px rgba(0,0,0,0.8), 0 0 1px rgba(180,138,69,0.3)',
                    }}
                  />
                </AnimatePresence>
              </div>

              {/* Next Page Button */}
              <button
                onClick={handleNextPage}
                disabled={currentPage === activePages.length - 1}
                style={{
                  background: 'rgba(23,23,19,0.85)',
                  border: '1px solid rgba(180,138,69,0.3)',
                  color: '#F4EFE5',
                }}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-12 sm:h-12 rounded-full flex items-center justify-center disabled:opacity-20 hover:scale-105 hover:border-[#B48A45] transition-all cursor-pointer shadow-xl"
                aria-label="Next Page"
                title="Next Page (Right Arrow)"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Mobile Quick Pagination Indicator */}
              <div className="sm:hidden flex items-center gap-3 mt-4 z-20">
                <span className="text-xs text-[rgba(200,189,170,0.6)] font-['Manrope']">
                  Swipe or tap arrows to navigate
                </span>
              </div>
            </div>
          ) : (
            /* Mode 2: Continuous Vertical Scroll of All Pages */
            <div className="w-full bg-[#12120e] p-3 sm:p-8 max-h-[85vh] overflow-y-auto space-y-6 scrollbar-thin">
              {activePages.map((page, idx) => (
                <div
                  key={`continuous-${page.pageNumber}`}
                  className="relative max-w-4xl mx-auto flex flex-col items-center"
                >
                  <div className="w-full flex items-center justify-between px-2 py-1 mb-1.5 text-xs text-[rgba(200,189,170,0.6)] font-['Manrope']">
                    <span>Page {idx + 1} of {activePages.length}</span>
                    <span className="text-[#B48A45] font-semibold">{page.title}</span>
                  </div>
                  <img
                    src={page.image}
                    alt={page.title}
                    loading={idx < 2 ? 'eager' : 'lazy'}
                    className="w-full h-auto object-contain rounded-[2px] shadow-2xl"
                    style={{
                      boxShadow: '0 8px 30px rgba(0,0,0,0.7)',
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* ─── THUMBNAIL FILMSTRIP JUMP-DRAWER ─── */}
          <div
            className="p-3 border-t border-[rgba(180,138,69,0.15)] bg-[#171713]"
          >
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-[11px] font-bold font-['Manrope'] tracking-wider uppercase text-[rgba(200,189,170,0.6)]">
                Jump to Section ({activePages.length} Pages)
              </span>
              <span className="text-[11px] text-[#B48A45] font-['Manrope'] hidden sm:inline">
                Click any page to view
              </span>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-[rgba(180,138,69,0.3)]">
              {activePages.map((page, idx) => {
                const isActive = currentPage === idx && viewMode === 'single'
                return (
                  <button
                    key={`thumb-${page.pageNumber}`}
                    onClick={() => {
                      setCurrentPage(idx)
                      setViewMode('single')
                      setZoomLevel(1)
                    }}
                    style={{
                      border: isActive
                        ? '2px solid #B48A45'
                        : '1px solid rgba(200,189,170,0.15)',
                      borderRadius: '2px',
                    }}
                    className="flex-shrink-0 relative overflow-hidden group focus:outline-none transition-all w-16 sm:w-20"
                    title={`${page.title} (Page ${page.pageNumber})`}
                  >
                    <img
                      src={page.thumb}
                      alt={page.title}
                      loading="lazy"
                      className="w-full h-20 sm:h-24 object-cover object-top transition-transform group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-x-0 bottom-0 py-0.5 text-[9px] font-bold text-center"
                      style={{
                        background: isActive
                          ? '#B48A45'
                          : 'rgba(23,23,19,0.85)',
                        color: isActive ? '#171713' : '#F4EFE5',
                      }}
                    >
                      P. {page.pageNumber}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* ─── BOTTOM WHATSAPP BAR ─── */}
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-3.5 border-t border-[rgba(180,138,69,0.15)] text-xs"
            style={{ background: '#1c1a16' }}
          >
            <div className="flex items-center gap-2 text-[rgba(200,189,170,0.7)] font-['Manrope']">
              <Sparkles className="w-3.5 h-3.5 text-[#B48A45]" />
              <span>
                Want to enquire about dishes, craft brews or book a table?
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <a
                href={activePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '2px',
                  background: 'rgba(23,23,19,0.7)',
                  border: '1px solid rgba(200,189,170,0.2)',
                  color: '#F4EFE5',
                  textDecoration: 'none',
                }}
                className="inline-flex items-center gap-1.5 hover:border-[#B48A45] hover:text-[#B48A45]"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Tab</span>
              </a>

              <a
                href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
                  `Hi Peepai Brewery & Kitchen! 🍻 I am reviewing your ${
                    activeMenu === 'food' ? 'Food Menu' : 'Bar Menu'
                  } and would like to reserve a table.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '0.45rem 1rem',
                  borderRadius: '2px',
                  background: 'rgba(180,138,69,0.18)',
                  border: '1px solid rgba(180,138,69,0.35)',
                  color: '#B48A45',
                  textDecoration: 'none',
                }}
                className="inline-flex items-center gap-2 hover:bg-[#B48A45] hover:text-[#171713] transition-all"
              >
                <Send className="w-3 h-3" />
                <span>WhatsApp Table Booking</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    )}
  </div>

      {/* ─── FULLSCREEN MODAL VIEWER EXTENSION ─── */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-[#0b0b09] select-none"
          role="dialog"
          aria-modal="true"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#171713] border-b border-[rgba(180,138,69,0.25)]">
            <div className="flex items-center gap-3">
              <span className="text-[#B48A45] font-bold uppercase text-xs tracking-wider">
                {activeMenu === 'food' ? 'Food Menu' : 'Bar Menu'}
              </span>
              <span className="text-white text-xs font-['Manrope'] hidden sm:inline">
                • Page {currentPage + 1} of {activePages.length} — {activePages[currentPage].title}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={activePdfUrl}
                download={activePdfName}
                className="btn-primary text-xs py-1.5 px-3.5 inline-flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </a>

              <button
                onClick={() => setIsFullscreen(false)}
                style={{
                  color: '#F4EFE5',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '2px',
                  padding: '0.45rem',
                  cursor: 'pointer',
                }}
                className="hover:bg-red-500 hover:border-red-500 transition-colors"
                title="Close Fullscreen (Esc)"
                aria-label="Close Fullscreen"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Canvas */}
          <div className="flex-1 w-full flex items-center justify-center p-3 relative overflow-hidden bg-[#10100d]">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[rgba(23,23,19,0.85)] border border-[rgba(180,138,69,0.35)] text-white flex items-center justify-center disabled:opacity-20 hover:border-[#B48A45] cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <img
              src={activePages[currentPage].image}
              alt={activePages[currentPage].title}
              className="max-h-[90vh] w-auto max-w-full object-contain shadow-2xl rounded-[2px]"
            />

            <button
              onClick={handleNextPage}
              disabled={currentPage === activePages.length - 1}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[rgba(23,23,19,0.85)] border border-[rgba(180,138,69,0.35)] text-white flex items-center justify-center disabled:opacity-20 hover:border-[#B48A45] cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
