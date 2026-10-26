import { useState, useRef, useMemo } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Sparkles, ArrowRight, Eye, X, UtensilsCrossed } from 'lucide-react'

export interface FoodShowcaseItem {
  id: string
  src: string
  title: string
  category: 'pizzas' | 'grills' | 'mains' | 'drinks-desserts'
  categoryLabel: string
  tag: string
  description: string
  aspectRatio?: string
  spanDesktop?: string
}

export const FOOD_SHOWCASE_ITEMS: FoodShowcaseItem[] = [
  {
    id: 'food-1',
    src: '/photos/realfood1.jpg',
    title: 'The Peepai Grand Feast Spread',
    category: 'mains',
    categoryLabel: 'The Feast Table',
    tag: 'Signature Spread',
    description:
      'An abundant table setting featuring in-house craft beer, fresh wood-fired pizzas, loaded appetizers, and clay-oven specialties.',
    aspectRatio: '16/10',
    spanDesktop: 'col-span-12 lg:col-span-8',
  },
  {
    id: 'food-2',
    src: '/photos/realfood2.jpg',
    title: 'Botanical Craft Cocktail Flight',
    category: 'drinks-desserts',
    categoryLabel: 'Mixology & Pours',
    tag: 'Artisanal Bar',
    description:
      'House-infused botanical gin cocktails, fresh citrus wheels, and delicate edible orchids presented on an onyx-lit marble bar.',
    aspectRatio: '4/3',
    spanDesktop: 'col-span-12 sm:col-span-6 lg:col-span-4',
  },
  {
    id: 'food-3',
    src: '/photos/realfood3.jpg',
    title: 'Wood-Fired Pesto Chicken Pizza',
    category: 'pizzas',
    categoryLabel: 'Artisanal Pizzas',
    tag: 'Oven Baked',
    description:
      'Hand-stretched sourdough crust fired at 450°C, fresh Genovese basil pesto, roasted chicken, and molten mozzarella pull.',
    aspectRatio: '4/3',
    spanDesktop: 'col-span-12 sm:col-span-6 lg:col-span-4',
  },
  {
    id: 'food-4',
    src: '/photos/realfood4.jpg',
    title: 'Char-Grilled Tandoori Murgh Tikka',
    category: 'grills',
    categoryLabel: 'Small Plates & Grills',
    tag: 'Clay Oven Classic',
    description:
      'Tender morsels of chicken marinated in spiced hung curd and mustard oil, smoked in the clay tandoor with mint chutney.',
    aspectRatio: '4/3',
    spanDesktop: 'col-span-12 sm:col-span-6 lg:col-span-4',
  },
  {
    id: 'food-5',
    src: '/photos/realfood5.jpg',
    title: 'Slow-Cooked BBQ Glazed Pork Ribs',
    category: 'mains',
    categoryLabel: 'Hearty Mains',
    tag: 'House Special',
    description:
      'Succulent fall-off-the-bone ribs basted with smoky barbecue glaze poured hot from an artisan ceramic server.',
    aspectRatio: '4/3',
    spanDesktop: 'col-span-12 sm:col-span-6 lg:col-span-4',
  },
  {
    id: 'food-6',
    src: '/photos/realfood6.jpg',
    title: 'Steamed Crystal Dim Sum',
    category: 'grills',
    categoryLabel: 'Small Plates & Grills',
    tag: 'Pan-Asian',
    description:
      'Delicate handcrafted translucent dumplings filled with fresh aromatic greens, served with house fiery chilli crisp oil.',
    aspectRatio: '4/3',
    spanDesktop: 'col-span-12 sm:col-span-6 lg:col-span-4',
  },
  {
    id: 'food-7',
    src: '/photos/realfood7.jpg',
    title: 'Traditional Coastal Curry Bowl & Basmati',
    category: 'mains',
    categoryLabel: 'Hearty Mains',
    tag: 'Regional Cuisine',
    description:
      'Slow-simmered coconut and roasted spice gravy paired with steaming long-grain fragrant basmati rice.',
    aspectRatio: '4/3',
    spanDesktop: 'col-span-12 sm:col-span-6 lg:col-span-4',
  },
  {
    id: 'food-8',
    src: '/photos/realfood8.jpg',
    title: 'Mangalorean Spiced Ghee Roast',
    category: 'grills',
    categoryLabel: 'Small Plates & Grills',
    tag: 'Desi Ghee Classic',
    description:
      'Rich Byadgi chilli and coriander masala tossed in pure golden desi ghee, served on authentic fresh banana leaf.',
    aspectRatio: '4/3',
    spanDesktop: 'col-span-12 sm:col-span-6 lg:col-span-4',
  },
  {
    id: 'food-9',
    src: '/photos/realfood9.jpg',
    title: 'Farmhouse Garden Mozzarella Pizza',
    category: 'pizzas',
    categoryLabel: 'Artisanal Pizzas',
    tag: 'Vegetarian Classic',
    description:
      'Crisp blistered crust loaded with sweet peppers, field mushrooms, black olives, and rich melted mozzarella.',
    aspectRatio: '4/3',
    spanDesktop: 'col-span-12 sm:col-span-6 lg:col-span-6',
  },
  {
    id: 'food-10',
    src: '/photos/realfood10.jpg',
    title: 'Hazelnut Rocher Chocolate Gateau',
    category: 'drinks-desserts',
    categoryLabel: 'Mixology & Pours',
    tag: 'Peepai Patisserie',
    description:
      'Layered dark Belgian chocolate sponge, silky hazelnut praline mousse, and crunchy chocolate shell on matte stoneware.',
    aspectRatio: '4/3',
    spanDesktop: 'col-span-12 sm:col-span-6 lg:col-span-6',
  },
  {
    id: 'food-11',
    src: '/photos/realfood11.jpg',
    title: 'Seafood Tapas & Signature Orchid Elixir',
    category: 'grills',
    categoryLabel: 'Small Plates & Grills',
    tag: 'Bar Pairing',
    description:
      'Pan-seared seafood glazed in garlic butter, garnished with micro-greens and paired with a hand-shaken orchid cocktail.',
    aspectRatio: '4/3',
    spanDesktop: 'col-span-12 sm:col-span-6 lg:col-span-4',
  },
  {
    id: 'food-12',
    src: '/photos/realfood12.jpg',
    title: 'Gourmet Slider Trio & Wire Basket Fries',
    category: 'grills',
    categoryLabel: 'Small Plates & Grills',
    tag: 'Brewpub Classic',
    description:
      'Toasted brioche buns, aged cheddar, caramelised onions, and juicy patties paired with seasoned wire-basket fries.',
    aspectRatio: '4/3',
    spanDesktop: 'col-span-12 sm:col-span-6 lg:col-span-4',
  },
  {
    id: 'food-13',
    src: '/photos/realfood13.jpg',
    title: 'Royal Saffron Dum Biryani',
    category: 'mains',
    categoryLabel: 'Hearty Mains',
    tag: 'Clay Pot Dum',
    description:
      'Fragrant saffron basmati rice layered with aromatics and slow-cooked in sealed clay handi, served with burani raita and roasted papad.',
    aspectRatio: '4/3',
    spanDesktop: 'col-span-12 sm:col-span-6 lg:col-span-4',
  },
  {
    id: 'food-14',
    src: '/photos/realfood14.jpg',
    title: 'Crisp Caesar Salad & Herb Garlic Bread',
    category: 'pizzas',
    categoryLabel: 'Artisanal Pizzas',
    tag: 'Farm Fresh',
    description:
      'Fresh romaine leaves tossed in emulsion dressing, shaved parmesan flakes, and toasted herb-garlic crostini.',
    aspectRatio: '4/3',
    spanDesktop: 'col-span-12 sm:col-span-6 lg:col-span-6',
  },
  {
    id: 'food-15',
    src: '/photos/realfood15.jpg',
    title: 'Charred Tiger Prawn & Bocconcini Skewers',
    category: 'grills',
    categoryLabel: 'Small Plates & Grills',
    tag: 'Flame Charred',
    description:
      'Jumbo tiger prawns threaded with fresh mozzarella bocconcini, charred over flames, and finished with aged balsamic glaze.',
    aspectRatio: '4/3',
    spanDesktop: 'col-span-12 sm:col-span-6 lg:col-span-6',
  },
]

type FilterCategory = 'all' | 'pizzas' | 'grills' | 'mains' | 'drinks-desserts'

const CATEGORY_TABS: { key: FilterCategory; label: string }[] = [
  { key: 'all', label: 'All Curations (15)' },
  { key: 'pizzas', label: 'Wood-Fired Pizzas' },
  { key: 'grills', label: 'Small Plates & Grills' },
  { key: 'mains', label: 'Hearty Mains & Feasts' },
  { key: 'drinks-desserts', label: 'Mixology & Patisserie' },
]

export function FoodShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [activeTab, setActiveTab] = useState<FilterCategory>('all')
  const [activeModalItem, setActiveModalItem] = useState<FoodShowcaseItem | null>(null)

  const filteredItems = useMemo(() => {
    if (activeTab === 'all') return FOOD_SHOWCASE_ITEMS
    return FOOD_SHOWCASE_ITEMS.filter(item => item.category === activeTab)
  }, [activeTab])

  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="culinary"
      ref={sectionRef}
      className="section-py relative overflow-hidden"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="container-xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-2.5">
            <span className="w-6 h-[1px] bg-[#B48A45]" />
            <p className="section-label" style={{ margin: 0 }}>
              Culinary Artistry &amp; Mixology
            </p>
            <span className="w-6 h-[1px] bg-[#B48A45]" />
          </div>

          <h2
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              color: '#F4EFE5',
              marginBottom: '1rem',
            }}
          >
            Crafted for the <span style={{ color: '#B48A45', fontStyle: 'italic' }}>Discerning Palate</span>
          </h2>
          <p
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: '0.95rem',
              color: 'rgba(200,189,170,0.75)',
              maxWidth: '620px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Every dish at Peepai is an exploration of bold flavour, from blistering sourdough pizzas
            and Mangalorean ghee roasts to botanical cocktail flights and artisan patisserie.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex items-center justify-center flex-wrap gap-2 pt-6">
            {CATEGORY_TABS.map(tab => {
              const isActive = activeTab === tab.key
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className="px-4 py-2 rounded-[2px] transition-all text-xs font-semibold cursor-pointer min-h-[44px]"
                  style={{
                    background: isActive ? 'rgba(180,138,69,0.22)' : 'rgba(23,23,19,0.75)',
                    border: `1px solid ${isActive ? '#B48A45' : 'rgba(200,189,170,0.14)'}`,
                    color: isActive ? '#F4EFE5' : 'rgba(200,189,170,0.75)',
                    fontFamily: 'Manrope, sans-serif',
                  }}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Dynamic Editorial Grid */}
        <div className="grid grid-cols-12 gap-4 sm:gap-6 mb-12">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, delay: Math.min(idx * 0.05, 0.4) }}
              className={`${item.spanDesktop || 'col-span-12 sm:col-span-6 lg:col-span-4'} group relative rounded-[2px] overflow-hidden border border-[rgba(200,189,170,0.12)] bg-[#1e1c18] cursor-pointer`}
              onClick={() => setActiveModalItem(item)}
            >
              {/* Image Container with controlled Aspect Ratio */}
              <div
                className="relative w-full overflow-hidden"
                style={{
                  aspectRatio: item.aspectRatio || '4/3',
                  minHeight: '240px',
                }}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                  loading="lazy"
                />

                {/* Subtle dark gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(23,23,19,0.94) 0%, rgba(23,23,19,0.3) 55%, transparent 100%)',
                  }}
                />

                {/* Floating Tag */}
                <div className="absolute top-3.5 left-3.5">
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.3rem 0.65rem',
                      background: 'rgba(23,23,19,0.85)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(180,138,69,0.35)',
                      borderRadius: '2px',
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '0.62rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#B48A45',
                    }}
                  >
                    <Sparkles className="w-3 h-3 text-[#B48A45]" />
                    {item.tag}
                  </span>
                </div>

                {/* Hover Quick View Icon */}
                <div className="absolute top-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="w-8 h-8 rounded-full bg-[rgba(23,23,19,0.85)] border border-[rgba(180,138,69,0.4)] flex items-center justify-center text-[#B48A45]">
                    <Eye className="w-4 h-4" />
                  </span>
                </div>

                {/* Bottom Information Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#B48A45] font-['Manrope'] block mb-1">
                    {item.categoryLabel}
                  </span>
                  <h3
                    style={{
                      fontFamily: '"Cormorant Garamond", Georgia, serif',
                      fontSize: 'clamp(1.2rem, 1.8vw, 1.55rem)',
                      fontWeight: 600,
                      color: '#F4EFE5',
                      lineHeight: 1.2,
                      marginBottom: '0.35rem',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="line-clamp-2 text-xs font-['Manrope']"
                    style={{ color: 'rgba(200,189,170,0.72)', lineHeight: 1.5 }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Full Menu Invitation Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="p-6 sm:p-8 rounded-[2px] border border-[rgba(180,138,69,0.22)] flex flex-col sm:flex-row items-center justify-between gap-5"
          style={{ background: 'var(--color-bg-warm)' }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-[2px] bg-[rgba(180,138,69,0.12)] border border-[rgba(180,138,69,0.3)] flex items-center justify-center flex-shrink-0">
              <UtensilsCrossed className="w-6 h-6 text-[#B48A45]" />
            </div>
            <div>
              <h4
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: '1.4rem',
                  fontWeight: 600,
                  color: '#F4EFE5',
                  marginBottom: '0.2rem',
                }}
              >
                Explore the Complete Verified Menu
              </h4>
              <p className="text-xs font-['Manrope'] text-[rgba(200,189,170,0.7)]">
                Browse all 180+ verified culinary creations, vegetarian selections, craft beer taps, and bar cocktails.
              </p>
            </div>
          </div>

          <button
            onClick={scrollToMenu}
            className="btn-primary min-h-[44px] flex items-center gap-2 whitespace-nowrap cursor-pointer flex-shrink-0 w-full sm:w-auto justify-center"
          >
            <span>Open Menu &amp; Flipbook</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Interactive Item Modal / Lightbox */}
      <AnimatePresence>
        {activeModalItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            style={{ background: 'rgba(10,9,7,0.88)', backdropFilter: 'blur(10px)' }}
            onClick={() => setActiveModalItem(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-2xl w-full rounded-[2px] overflow-hidden border border-[rgba(180,138,69,0.35)] shadow-2xl"
              style={{ background: '#1c1a16' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[rgba(23,23,19,0.85)] border border-[rgba(180,138,69,0.4)] flex items-center justify-center text-[#F4EFE5] hover:text-[#B48A45] transition-colors cursor-pointer min-h-[36px] min-w-[36px]"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {/* High-Res Image */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#12110e]">
                <img
                  src={activeModalItem.src}
                  alt={activeModalItem.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1a16] via-transparent to-transparent opacity-80" />
              </div>

              {/* Details & CTA */}
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#B48A45] font-['Manrope']">
                    {activeModalItem.categoryLabel}
                  </span>
                  <span className="text-[rgba(200,189,170,0.3)]">•</span>
                  <span className="text-[10px] font-semibold text-[rgba(200,189,170,0.6)] font-['Manrope'] uppercase tracking-wider">
                    {activeModalItem.tag}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontSize: '1.9rem',
                    fontWeight: 600,
                    color: '#F4EFE5',
                    lineHeight: 1.2,
                    marginBottom: '0.75rem',
                  }}
                >
                  {activeModalItem.title}
                </h3>

                <p
                  className="text-sm font-['Manrope'] mb-6"
                  style={{ color: 'rgba(200,189,170,0.8)', lineHeight: 1.6 }}
                >
                  {activeModalItem.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-[rgba(200,189,170,0.1)] flex-wrap gap-3">
                  <span className="text-xs text-[rgba(200,189,170,0.5)] font-['Manrope']">
                    Authentic dish photograph from Peepai Brewery &amp; Kitchen
                  </span>

                  <button
                    onClick={() => {
                      setActiveModalItem(null)
                      scrollToMenu()
                    }}
                    className="btn-primary py-2 px-5 text-xs min-h-[44px] cursor-pointer"
                  >
                    View in Full Menu
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
