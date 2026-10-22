import { useRef, useState, useCallback, useEffect, useMemo } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ZoomIn, ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { RestaurantConfig, GalleryItem } from '../../config/restaurant'

interface GalleryProps {
  config: RestaurantConfig
}

export function Gallery({ config }: GalleryProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

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

        {/* ─── Category Filter Pills ─── */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
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
                  padding: '0.55rem 1.15rem',
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

        {/* ─── Masonry Editorial Grid ─── */}
        <div className="masonry-grid">
          {filteredItems.map((item, i) => (
            <motion.div
              key={item.src}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06, duration: 0.55 }}
              className="masonry-item rounded-[2px]"
            >
              <button
                onClick={() => setLightbox(i)}
                className="w-full group relative overflow-hidden block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B48A45] text-left rounded-[2px]"
                style={{
                  background: 'var(--color-card)',
                  border: '1px solid rgba(200,189,170,0.1)',
                }}
                aria-label={`View photo of ${item.title}`}
              >
                <img
                  src={`/photos/${item.src}`}
                  alt={item.title}
                  className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Editorial Overlay on Hover */}
                <div
                  className="masonry-item-overlay"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(23,23,19,0.92) 0%, rgba(23,23,19,0.4) 60%, transparent 100%)',
                  }}
                >
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        style={{
                          fontFamily: 'Manrope, sans-serif',
                          fontSize: '0.62rem',
                          fontWeight: 700,
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          color: '#B48A45',
                        }}
                      >
                        {item.category || 'Interior Space'}
                      </span>
                      <ZoomIn className="w-4 h-4" style={{ color: '#B48A45' }} />
                    </div>
                    <h3
                      style={{
                        fontFamily: '"Cormorant Garamond", Georgia, serif',
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: '#F4EFE5',
                        marginBottom: '0.25rem',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        fontSize: '0.74rem',
                        color: 'rgba(200,189,170,0.75)',
                        lineHeight: 1.45,
                      }}
                    >
                      {item.caption}
                    </p>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
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
