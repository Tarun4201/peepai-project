import { useEffect, useRef } from 'react'
import type { RestaurantConfig } from '../../config/restaurant'

interface Props { config: RestaurantConfig }

export function Welcome({ config }: Props) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        e.target.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
          if (e.isIntersecting) el.classList.add('in-view')
        })
      }),
      { threshold: 0.12 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="welcome"
      className="section-py"
      style={{ background: 'var(--color-bg-warm)' }}
    >
      <div className="container-xl">
        {/* ── Top: Label + Photo collage row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 lg:mb-24">

          {/* Left: full-bleed photo with editorial frame */}
          <div className="reveal-left" style={{ transitionDelay: '0.05s' }}>
            <div
              className="relative w-full aspect-[4/5] sm:aspect-[4/5] max-h-[560px] overflow-hidden rounded-[2px] shadow-2xl border border-[rgba(200,189,170,0.12)] bg-[#1e1c18]"
            >
              <img
                src="/photos/intro%20photo.jpg"
                alt="Gilded Birdcage Lounges and Vaulted Mirrored Spirit Salon — Peepai Brewery & Kitchen"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
              {/* Inset text label */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '1.25rem',
                  left: '1.25rem',
                  padding: '0.45rem 0.9rem',
                  background: 'rgba(23,23,19,0.85)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(180,138,69,0.30)',
                  borderRadius: '2px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '0.62rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#B48A45',
                    fontWeight: 700,
                  }}
                >
                  Gilded Birdcage Lounges &amp; Spirit Salon
                </span>
              </div>
            </div>
          </div>

          {/* Right: Story copy */}
          <div className="reveal-right" style={{ transitionDelay: '0.15s' }}>
            <p className="section-label">Our Story</p>
            <h2
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: 'clamp(2.4rem, 5vw, 4rem)',
                fontWeight: 600,
                lineHeight: 1.08,
                letterSpacing: '-0.01em',
                color: '#F4EFE5',
                marginBottom: '1.5rem',
              }}
            >
              More than a<br />
              <em style={{ color: '#B48A45' }}>restaurant</em>.
            </h2>
            <p
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '1.15rem',
                lineHeight: 1.75,
                color: 'rgba(200,189,170,0.80)',
                marginBottom: '1.5rem',
                fontWeight: 400,
              }}
            >
              {config.about}
            </p>

            {/* Features chips */}
            <div className="flex flex-wrap gap-2 mt-6">
              {config.features.map((f, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    padding: '0.35rem 0.85rem',
                    border: '1px solid rgba(180,138,69,0.22)',
                    borderRadius: '2px',
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(200,189,170,0.75)',
                  }}
                >
                  {f}
                </span>
              ))}
            </div>

            {/* Rating line */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                marginTop: '2rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(200,189,170,0.10)',
              }}
            >
              <div style={{ display: 'flex', gap: '2px' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} viewBox="0 0 12 12" width="14" height="14" fill={i < Math.floor(config.rating) ? '#B48A45' : 'none'} stroke="#B48A45" strokeWidth="1">
                    <polygon points="6,1 7.5,4.5 11.5,5 8.5,7.5 9.5,11.5 6,9.5 2.5,11.5 3.5,7.5 0.5,5 4.5,4.5" />
                  </svg>
                ))}
              </div>
              <span style={{ fontFamily: '"Bricolage Grotesque", Manrope, sans-serif', fontWeight: 700, color: '#B48A45', fontSize: '1.1rem' }}>
                {config.rating}
              </span>
              <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.72rem', color: 'rgba(200,189,170,0.55)' }}>
                on Google — {config.reviewCount} reviews
              </span>
            </div>
          </div>
        </div>

        {/* ── Bottom: panoramic photo strip of real ambience (4K & neatly cropped) ── */}
        <div className="divider mb-12" />
        <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {[
            { src: 'ambience6.jpg', label: 'Two-Tier Decks', pos: 'center 40%' },
            { src: 'ambience1.jpg', label: 'Bacardi Bar Counter', pos: 'center 35%' },
            { src: 'ambience4.jpg', label: 'Acoustic Stage & Wall', pos: 'center center' },
            { src: 'ambience7.jpg', label: 'Garden Courtyard', pos: 'center 45%' },
          ].map(photo => (
            <div
              key={photo.src}
              className="relative h-44 sm:h-60 lg:h-72 overflow-hidden rounded-[2px] group border border-[rgba(200,189,170,0.12)] bg-[#1e1c18]"
            >
              <img
                src={`/photos/${photo.src}`}
                alt={photo.label}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: photo.pos,
                  transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1)',
                }}
                loading="lazy"
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(23,23,19,0.85) 0%, transparent 60%)',
                  pointerEvents: 'none',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '0.85rem',
                  left: '0.85rem',
                  padding: '0.3rem 0.65rem',
                  background: 'rgba(23,23,19,0.85)',
                  border: '1px solid rgba(180,138,69,0.3)',
                  borderRadius: '2px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '0.58rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#B48A45',
                    fontWeight: 700,
                  }}
                >
                  {photo.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
