import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone } from 'lucide-react'
import type { RestaurantConfig } from '../../config/restaurant'

interface NavbarProps { config: RestaurantConfig }

const NAV_LINKS = [
  { href: '#welcome',  label: 'Our Story' },
  { href: '#menu',     label: 'Menu' },
  { href: '#gallery',  label: 'Gallery' },
  { href: '#reserve',  label: 'Reservations' },
  { href: '#visit',    label: 'Find Us' },
]

export function Navbar({ config }: NavbarProps) {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [active, setActive]       = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 48)
      const ids = NAV_LINKS.map(l => l.href.slice(1)).reverse()
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 160) {
          setActive(`#${id}`)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (href: string) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-strong py-3' : 'py-5 bg-gradient-to-b from-[rgba(23,23,19,0.55)] to-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container-xl flex items-center justify-between">
          {/* Brand */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3.5 group text-left cursor-pointer"
            aria-label={`${config.name} – back to top`}
          >
            <div className="relative flex items-center justify-center">
              <img
                src={config.logo ?? '/logo.png'}
                alt="Peepai Brewery & Kitchen Golden Emblem"
                className={`w-auto object-contain transition-all duration-300 logo-glow group-hover:scale-108 ${
                  scrolled ? 'h-9 sm:h-11' : 'h-11 sm:h-15'
                }`}
              />
            </div>
            <div>
              <span
                style={{
                  display: 'block',
                  fontFamily: '"Bricolage Grotesque", Manrope, sans-serif',
                  fontSize: scrolled ? '1rem' : '1.15rem',
                  fontWeight: 800,
                  letterSpacing: '-0.01em',
                  color: '#F4EFE5',
                  lineHeight: 1,
                  transition: 'font-size 0.3s ease',
                }}
              >
                PEEPAI
              </span>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: scrolled ? '0.52rem' : '0.58rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#B48A45',
                  marginTop: '3px',
                  fontWeight: 700,
                  transition: 'font-size 0.3s ease',
                }}
              >
                Brewery &amp; Kitchen
              </span>
            </div>
          </button>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map(l => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className={`nav-link ${active === l.href ? 'active' : ''}`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href={`tel:${config.phone}`}
              className="btn-outline text-xs py-2 px-4 flex items-center gap-1.5"
              aria-label={`Call us at ${config.phone}`}
            >
              <Phone className="w-3 h-3" style={{ color: '#B48A45' }} />
              <span>{config.phone}</span>
            </a>
            <button
              onClick={() => go('#reserve')}
              className="btn-primary text-xs py-2 px-5"
            >
              Reserve
            </button>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(m => !m)}
            className="lg:hidden w-10 h-10 flex flex-col justify-center gap-1.5 p-2 rounded-sm"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {[0, 1, 2].map(i => (
              <motion.span
                key={i}
                animate={{
                  rotate:  menuOpen ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
                  y:       menuOpen ? (i === 0 ? 8  : i === 2 ? -8 : 0)  : 0,
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
                transition={{ duration: 0.25 }}
                className="block w-5 h-px rounded-full"
                style={{ background: 'var(--color-accent)' }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 inset-x-0 z-40 glass-strong pt-24 pb-8 px-6 lg:hidden"
          >
            <nav className="flex flex-col gap-5" aria-label="Mobile navigation">
              {NAV_LINKS.map(l => (
                <button
                  key={l.href}
                  onClick={() => go(l.href)}
                  className="text-left"
                  style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontSize: '1.75rem',
                    fontWeight: 500,
                    color: active === l.href ? '#B48A45' : '#F4EFE5',
                    letterSpacing: '-0.01em',
                    transition: 'color 0.2s ease',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {l.label}
                </button>
              ))}
            </nav>
            <div
              className="mt-8 pt-6 flex flex-col gap-3"
              style={{ borderTop: '1px solid rgba(200,189,170,0.10)' }}
            >
              <a
                href={`tel:${config.phone}`}
                className="btn-outline justify-center w-full"
              >
                <Phone className="w-3.5 h-3.5" />
                {config.phone}
              </a>
              <button onClick={() => go('#reserve')} className="btn-primary justify-center w-full">
                Reserve a Table
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
