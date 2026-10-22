import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Star } from 'lucide-react'
import { useOpenNow } from '../../hooks/useOpenNow'
import type { RestaurantConfig } from '../../config/restaurant'
import { HeroVideoCollage } from './HeroVideoCollage'

interface HeroProps { config: RestaurantConfig }

export function Hero({ config }: HeroProps) {
  const isOpen = useOpenNow(config.hours)
  const [parallax, setParallax] = useState(0)
  const heroRef = useRef<HTMLElement>(null)

  // Subtle scroll parallax on background collage
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setParallax(window.scrollY))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [])

  const scrollToMenu = () =>
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })
  const scrollDown = () =>
    document.getElementById('welcome')?.scrollIntoView({ behavior: 'smooth' })

  const py = parallax * 0.15

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden pt-20 sm:pt-24 pb-14 sm:pb-16"
      style={{ background: '#171713' }}
    >
      {/* ── 4K Cinematic Video Background & Editorial Collage (food1–food4) ── */}
      <HeroVideoCollage parallaxY={py} />

      {/* ── Hero Content ── */}
      <div className="container-xl relative z-10 w-full">
        <div className="max-w-3xl">

          {/* Peepai Iconic Glowing Brand Emblem & Live Status */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mb-4 sm:mb-6 flex flex-row items-center gap-3.5 sm:gap-7"
          >
            {/* Radiant Golden Elephant Logo Emblem */}
            <div className="relative flex-shrink-0 group">
              {/* Radial warm golden aura behind logo */}
              <div
                className="absolute inset-0 -m-2.5 sm:-m-5 rounded-full blur-2xl pointer-events-none opacity-85"
                style={{
                  background:
                    'radial-gradient(circle, rgba(240,160,48,0.55) 0%, rgba(200,121,60,0.25) 50%, transparent 75%)',
                }}
              />
              <img
                src={config.logo ?? '/logo.png'}
                alt="Peepai Brewery & Kitchen Golden Emblem"
                className="relative z-10 w-16 h-auto sm:w-28 md:w-32 lg:w-36 object-contain logo-glow-hero transition-transform duration-500 group-hover:scale-108"
              />
            </div>

            {/* Badges & Tagline */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 flex-wrap">
                {isOpen ? (
                  <span className="badge-open">
                    <span className="dot" />
                    Open Now
                  </span>
                ) : (
                  <span className="badge-closed">
                    <span className="dot" />
                    Opens at 12 PM
                  </span>
                )}
                <span
                  className="inline-flex items-center gap-1.5"
                  style={{
                    color: 'rgba(200,189,170,0.75)',
                    fontSize: '0.74rem',
                    fontFamily: 'Manrope, sans-serif',
                    letterSpacing: '0.06em',
                  }}
                >
                  <Star className="w-3.5 h-3.5" style={{ color: '#B48A45' }} />
                  <span style={{ color: '#B48A45', fontWeight: 700 }}>{config.rating}</span>
                  <span>({config.reviewCount} reviews)</span>
                </span>
              </div>

              {/* Tagline chip */}
              <p
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: '0.70rem',
                  fontWeight: 700,
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  color: '#B48A45',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span
                  style={{
                    display: 'block',
                    width: 18,
                    height: 1,
                    background: '#B48A45',
                    opacity: 0.7,
                  }}
                />
                Brewpub · Hebbal · Bengaluru
              </p>
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: '"Bricolage Grotesque", Manrope, system-ui, sans-serif',
              fontSize: 'clamp(2.4rem, 8.5vw, 7.5rem)',
              fontWeight: 800,
              lineHeight: 0.94,
              letterSpacing: '-0.03em',
              color: '#F4EFE5',
              marginBottom: '1.15rem',
            }}
          >
            A PLACE<br />
            <span style={{ color: '#B48A45' }}>TO COME</span><br />
            ALIVE.
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(0.95rem, 2vw, 1.45rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'rgba(200,189,170,0.80)',
              maxWidth: '480px',
              lineHeight: 1.5,
              marginBottom: '1.5rem',
            }}
          >
            Craft brews, bold flavours, live music — and that golden elephant that makes you look twice.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.78 }}
            className="flex flex-wrap gap-2.5 sm:gap-3"
          >
            <button onClick={scrollToMenu} className="btn-primary">
              See the Menu
            </button>
            <button
              onClick={() => document.getElementById('reserve')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-outline"
            >
              Reserve a Table
            </button>
            <button
              onClick={() => document.getElementById('corporate')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-4 py-2.5 rounded-[2px] transition-all text-xs font-semibold flex items-center gap-1.5"
              style={{
                background: 'rgba(180,138,69,0.14)',
                border: '1px solid rgba(180,138,69,0.35)',
                color: '#F4EFE5',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(180,138,69,0.24)'
                e.currentTarget.style.borderColor = '#B48A45'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(180,138,69,0.14)'
                e.currentTarget.style.borderColor = 'rgba(180,138,69,0.35)'
              }}
            >
              <span>Corporate Outings &amp; Events</span>
              <span style={{ color: '#B48A45' }}>→</span>
            </button>
          </motion.div>

          {/* Location pill */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            style={{
              marginTop: '1.25rem',
              fontFamily: 'Manrope, sans-serif',
              fontSize: '0.70rem',
              color: 'rgba(200,189,170,0.50)',
              letterSpacing: '0.06em',
            }}
          >
            GM Arcade, Bellary Road, Hebbal · Open 12 PM – 12:30 AM
          </motion.p>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.button
        onClick={scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        aria-label="Scroll down"
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <span
          style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: '0.60rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(200,189,170,0.40)',
          }}
        >
          Discover
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4" style={{ color: 'rgba(180,138,69,0.55)' }} />
        </motion.div>
      </motion.button>
    </section>
  )
}
