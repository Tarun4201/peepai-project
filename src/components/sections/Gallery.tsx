import { useRef, useState, useCallback, useEffect, useMemo } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ZoomIn, ChevronLeft, ChevronRight, X, LayoutGrid, LayoutTemplate } from 'lucide-react'
import type { RestaurantConfig, GalleryItem } from '../../config/restaurant'

interface GalleryProps {
  config: RestaurantConfig
}

export function Gallery({ config }: GalleryProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'mosaic' | 'grid'>('mosaic')

  const allItems: GalleryItem[] = useMemo(() => {
    return (
      config.galleryItems ||
      config.photos.map((src, i) => ({
        src,
        title: `Peepai Ambience ${i + 1}`,
        caption: 'Verified photograph of Peepai Brewery & Kitchen premises.',
      }))
    )
  }, [config.galleryItems, config.photos])

  // Extract categories
  const categories = useMemo(() => {
    const cats = new Set<string>()
    allItems.forEach(item => {
      if (item.category) cats.add(item.category)
    })
    return ['all', ...Array.from(cats)]
  }, [allItems])

  // Filtered items
  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') return allItems
    return allItems.filter(item => item.category === selectedCategory)
  }, [allItems, selectedCategory])

  const closeLightbox = useCallback(() => setLightbox(null), [])

  const prev = useCallback(() => {
    setLightbox(l =>
      l !== null ? (l - 1 + filteredItems.length) % filteredItems.length : null
    )
  }, [filteredItems.length])

  const next = useCallback(() => {
    setLightbox(l =>
      l !== null ? (l + 1) % filteredItems.length : null
    )
  }, [filteredItems.length])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox === null) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, closeLightbox, prev, next])

  // Lock body scroll when lightbox is active
  useEffect(() => {
    if (lightbox !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [lightbox])

  if (!allItems.length) return null

  // Function to compute symmetrical column spans & heights based on position and viewMode
  const getCardLayoutClasses = (index: number, total: number) => {
    // If filtered by category (2 items each):
    if (selectedCategory !== 'all') {
      if (total <= 2) {
        return 'col-span-12 md:col-span-6 h-[320px] sm:h-[380px]'
      }
      return 'col-span-12 sm:col-span-6 lg:col-span-3 h-[270px] sm:h-[300px]'
    }

    // In uniform grid view:
    if (viewMode === 'grid') {
      return 'col-span-12 sm:col-span-6 lg:col-span-3 h-[270px] sm:h-[300px]'
    }

    // In Symmetrical Mosaic view:
    // Row 1: Items 0 & 1 -> 50% / 50% (span 6 each, height 380px)
    // Row 2: Items 2, 3, 4, 5 -> 25% each (span 3 each, height 280px)
    // Row 3: Items 6 & 7 -> 50% / 50% (span 6 each, height 380px)
    if (index === 0 || index === 1) {
      return 'col-span-12 md:col-span-6 lg:col-span-6 h-[320px] sm:h-[380px]'
    }
    if (index >= 2 && index <= 5) {
      return 'col-span-12 sm:col-span-6 lg:col-span-3 h-[250px] sm:h-[280px]'
    }
    if (index === 6 || index === 7) {
      return 'col-span-12 md:col-span-6 lg:col-span-6 h-[320px] sm:h-[380px]'
    }
    return 'col-span-12 sm:col-span-6 lg:col-span-3 h-[270px] sm:h-[300px]'
  }

  // Focal center for images to avoid awkward cropping
  const getImageFocalPosition = (src: string) => {
    if (src.includes('ambience1')) return 'center 38%'
    if (src.includes('ambience6')) return 'center 35%'
    if (src.includes('ambience2')) return 'center 40%'
    if (src.includes('ambience4')) return 'center 35%'
    if (src.includes('ambience3')) return 'center 45%'
    if (src.includes('ambience7')) return 'center 45%'
    if (src.includes('ambience5')) return 'center 40%'
    if (src.includes('corporate')) return 'center 45%'
    return 'center 35%'
  }

  return (
    <section
      id="gallery"
      ref={ref}
      className="section-py relative overflow-hidden"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="container-xl relative z-10">
        {/* Editorial Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-6 h-[1px] bg-[#B48A45]" />
            <p className="section-label" style={{ margin: 0 }}>
              Visual Journal &amp; Interior Architecture
            </p>
            <span className="w-6 h-[1px] bg-[#B48A45]" />
          </div>

          <h2
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              color: '#F4EFE5',
              marginBottom: '1rem',
            }}
          >
            The <span style={{ color: '#B48A45', fontStyle: 'italic' }}>Peepai Gallery</span>
          </h2>
          <p
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: '0.95rem',
              color: 'rgba(200,189,170,0.75)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Take a visual tour through our two-tier brewery deck, twilight sky terrace,
            illuminated amber bar, and the iconic Golden Elephant lounge.
          </p>
        </motion.div>

        {/* ─── Category Filter Pills & Symmetrical View Mode Switcher ─── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-[rgba(200,189,170,0.08)]">
          {/* Category Filter Pills */}
          <div className="flex items-center justify-center flex-wrap gap-2">
            {categories.map(cat => {
              const isActive = selectedCategory === cat
              const count =
                cat === 'all'
                  ? allItems.length
                  : allItems.filter(i => i.category === cat).length
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat)
                    setLightbox(null)
                  }}
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    padding: '0.5rem 1rem',
                    borderRadius: '2px',
                    border: isActive
                      ? '1px solid #B48A45'
                      : '1px solid rgba(200,189,170,0.12)',
                    background: isActive ? '#B48A45' : 'var(--color-card)',
                    color: isActive ? '#171713' : 'rgba(244,239,229,0.75)',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                  className="hover:border-[#B48A45]"
                >
                  {cat === 'all' ? `All Spaces (${count})` : `${cat} (${count})`}
                </button>
              )
            })}
          </div>

          {/* Symmetrical Layout Switcher (Visible on desktop) */}
          {selectedCategory === 'all' && (
            <div className="hidden md:flex items-center gap-1.5 p-1 rounded-[2px] bg-[#1E1C18] border border-[rgba(200,189,170,0.12)]">
              <button
                type="button"
                onClick={() => setViewMode('mosaic')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] text-xs font-semibold font-['Manrope'] transition-all cursor-pointer ${
                  viewMode === 'mosaic'
                    ? 'bg-[#B48A45] text-[#171713]'
                    : 'text-[rgba(200,189,170,0.7)] hover:text-[#F4EFE5]'
                }`}
                title="Symmetrical Architectural Mosaic (2 + 4 + 2)"
              >
                <LayoutTemplate className="w-3.5 h-3.5" />
                <span>Bento Mosaic</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] text-xs font-semibold font-['Manrope'] transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#B48A45] text-[#171713]'
                    : 'text-[rgba(200,189,170,0.7)] hover:text-[#F4EFE5]'
                }`}
                title="Uniform Symmetrical Grid (4 × 2)"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Uniform Grid</span>
              </button>
            </div>
          )}
        </div>

        {/* ─── Symmetrical Architectural Grid ─── */}
        <div className="grid grid-cols-12 gap-4 sm:gap-5 lg:gap-6">
          {filteredItems.map((item, i) => {
            const layoutClass = getCardLayoutClasses(i, filteredItems.length)
            const focalPos = getImageFocalPosition(item.src)
            return (
              <motion.div
                key={item.src}
                layout
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.05, duration: 0.55 }}
                className={layoutClass}
              >
                <button
                  type="button"
                  onClick={() => setLightbox(i)}
                  className="w-full h-full group relative overflow-hidden block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B48A45] text-left rounded-[2px] cursor-pointer"
                  style={{
                    background: 'var(--color-card)',
                    border: '1px solid rgba(180,138,69,0.20)',
                    transition: 'border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(180,138,69,0.55)'
                    e.currentTarget.style.boxShadow =
                      '0 14px 34px rgba(0,0,0,0.55), 0 0 25px rgba(180,138,69,0.15)'
                    e.currentTarget.style.transform = 'translateY(-3px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(180,138,69,0.20)'
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.transform = 'none'
                  }}
                  aria-label={`View photo of ${item.title}`}
                >
                  <img
                    src={`/photos/${item.src}`}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                    style={{ objectPosition: focalPos }}
                    loading="lazy"
                  />

                  {/* Gradient Vignette for Text Legibility */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(23,23,19,0.95) 0%, rgba(23,23,19,0.4) 50%, transparent 80%)',
                    }}
                  />

                  {/* Top-Right Floating Zoom Pill */}
                  <div className="absolute top-3.5 right-3.5 z-10">
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 opacity-75 group-hover:opacity-100 group-hover:scale-110"
                      style={{
                        background: 'rgba(23,23,19,0.85)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        border: '1px solid rgba(180,138,69,0.35)',
                        color: '#B48A45',
                      }}
                      title="Enlarge image"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Bottom Text Details */}
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10">
                    <span
                      style={{
                        display: 'block',
                        fontFamily: 'Manrope, sans-serif',
                        fontSize: '0.62rem',
                        fontWeight: 700,
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: '#B48A45',
                        marginBottom: '0.25rem',
                      }}
                    >
                      {item.category || 'Interior Space'}
                    </span>
                    <h3
                      style={{
                        fontFamily: '"Cormorant Garamond", Georgia, serif',
                        fontSize: 'clamp(1.15rem, 1.8vw, 1.45rem)',
                        fontWeight: 600,
                        color: '#F4EFE5',
                        lineHeight: 1.2,
                        marginBottom: '0.25rem',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p className="line-clamp-2 text-xs text-[rgba(200,189,170,0.78)] font-['Manrope'] leading-relaxed transition-opacity duration-300 opacity-85 group-hover:opacity-100">
                      {item.caption}
                    </p>
                  </div>
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* ─── Lightbox Modal ─── */}
      <AnimatePresence>
        {lightbox !== null && filteredItems[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lightbox"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Image Lightbox"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-2 rounded-full transition-colors z-30 hover:bg-red-500 hover:border-red-500"
              style={{
                background: 'rgba(23,23,19,0.85)',
                color: '#F4EFE5',
                border: '1px solid rgba(200,189,170,0.2)',
                cursor: 'pointer',
              }}
              aria-label="Close lightbox (Esc)"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev Button */}
            <button
              onClick={e => {
                e.stopPropagation()
                prev()
              }}
              className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full transition-colors z-30 hover:border-[#B48A45]"
              style={{
                background: 'rgba(23,23,19,0.85)',
                color: '#F4EFE5',
                border: '1px solid rgba(200,189,170,0.25)',
                cursor: 'pointer',
              }}
              aria-label="Previous image"
              title="Previous (Left Arrow)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={e => {
                e.stopPropagation()
                next()
              }}
              className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full transition-colors z-30 hover:border-[#B48A45]"
              style={{
                background: 'rgba(23,23,19,0.85)',
                color: '#F4EFE5',
                border: '1px solid rgba(200,189,170,0.25)',
                cursor: 'pointer',
              }}
              aria-label="Next image"
              title="Next (Right Arrow)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image & Caption Container */}
            <div
              className="relative max-w-5xl max-h-[88vh] flex flex-col items-center select-none"
              onClick={e => e.stopPropagation()}
            >
              <motion.img
                key={filteredItems[lightbox].src}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.28 }}
                src={`/photos/${filteredItems[lightbox].src}`}
                alt={filteredItems[lightbox].title}
                className="max-h-[72vh] w-auto max-w-full object-contain rounded-[2px]"
                style={{
                  border: '1px solid rgba(180,138,69,0.3)',
                  boxShadow: '0 16px 50px rgba(0,0,0,0.8)',
                }}
              />

              <div className="mt-4 text-center max-w-xl px-4">
                <div className="flex items-center justify-center gap-2 mb-1.5">
                  <span
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '0.62rem',
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: '#B48A45',
                    }}
                  >
                    {filteredItems[lightbox].category || 'Ambience'} • {lightbox + 1} of{' '}
                    {filteredItems.length}
                  </span>
                </div>
                <h4
                  style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontSize: '1.45rem',
                    fontWeight: 600,
                    color: '#F4EFE5',
                    marginBottom: '0.35rem',
                  }}
                >
                  {filteredItems[lightbox].title}
                </h4>
                <p
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '0.82rem',
                    color: 'rgba(200,189,170,0.8)',
                    lineHeight: 1.5,
                  }}
                >
                  {filteredItems[lightbox].caption}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
