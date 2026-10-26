import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Music, Beer, Trees, Sparkles } from 'lucide-react'
import { StarRating } from '../ui/StarRating'

const EXPERIENCES = [
  {
    Icon: Music,
    title: 'Live Acoustic & DJ Evenings',
    desc: 'Curated musical performances and acoustic sessions setting the pulse for Bengaluru nights in our courtyard amphitheatre.',
    highlight: 'Weekly Acts',
    photo: '/photos/ambience4.jpg',
  },
  {
    Icon: Beer,
    title: 'In-House Microbrewery & Decks',
    desc: 'European malts and authentic craft brews on tap across our dual-level open-air brewery deck.',
    highlight: 'Fresh Batches',
    photo: '/photos/ambience6.jpg',
  },
  {
    Icon: Trees,
    title: 'Twilight Sky Terrace',
    desc: 'Sprawling al fresco terrace seating with cool Bengaluru breezes, cozy cabanas, and panoramic city views.',
    highlight: 'Panoramic Views',
    photo: '/photos/ambience2.jpg',
  },
  {
    Icon: Sparkles,
    title: 'The Pop-Art VIP Suite',
    desc: 'Intimate bespoke lounge with floral wingbacks, mirrored ceiling art, and private dining elegance.',
    highlight: 'Signature Decor',
    photo: '/photos/ambience3.jpg',
  },
]

export function Vibe() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="vibe"
      ref={ref}
      className="section-py relative overflow-hidden"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="container-xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-6 h-[1px] bg-[#B48A45]" />
            <p className="section-label" style={{ margin: 0 }}>
              The Ambience &amp; Architecture
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
            Curated Spaces for <span style={{ color: '#B48A45', fontStyle: 'italic' }}>Every Occasion</span>
          </h2>
          <p
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: '0.95rem',
              color: 'rgba(200,189,170,0.75)',
              maxWidth: '580px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            From quiet sunset cocktails on the sky terrace to energetic weekend acoustic sets,
            explore the distinctive spaces that define Peepai Brewery &amp; Kitchen.
          </p>
        </motion.div>

        {/* 4 Experience Cards with Photography */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[2px]"
              style={{
                background: 'var(--color-card)',
                border: '1px solid rgba(200,189,170,0.08)',
                transition: 'border-color 0.3s ease, transform 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(180,138,69,0.28)'
                e.currentTarget.style.transform = 'translateY(-3px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(200,189,170,0.08)'
                e.currentTarget.style.transform = 'none'
              }}
            >
              {/* Image Header with Neat Focal Framing */}
              <div className="relative h-48 overflow-hidden bg-[#181612]">
                <img
                  src={exp.photo}
                  alt={exp.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  style={{
                    objectPosition:
                      exp.photo.includes('elephant')
                        ? 'center 20%'
                        : exp.photo.includes('double-deck')
                        ? 'center 35%'
                        : exp.photo.includes('terrace')
                        ? 'center 40%'
                        : 'center 35%',
                  }}
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, #1E1C18 0%, rgba(30,28,24,0.3) 60%, transparent 100%)',
                  }}
                />
                <div className="absolute top-3 left-3">
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.3rem 0.65rem',
                      background: 'rgba(23,23,19,0.85)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(180,138,69,0.25)',
                      borderRadius: '2px',
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '0.62rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#B48A45',
                    }}
                  >
                    <exp.Icon className="w-3 h-3" />
                    {exp.highlight}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    style={{
                      fontFamily: '"Cormorant Garamond", Georgia, serif',
                      fontSize: '1.35rem',
                      fontWeight: 600,
                      color: '#F4EFE5',
                      lineHeight: 1.25,
                      marginBottom: '0.6rem',
                    }}
                  >
                    {exp.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '0.8rem',
                      lineHeight: 1.6,
                      color: 'rgba(200,189,170,0.70)',
                      fontWeight: 400,
                    }}
                  >
                    {exp.desc}
                  </p>
                </div>

                <div
                  className="mt-6 pt-4 flex items-center justify-between"
                  style={{ borderTop: '1px solid rgba(200,189,170,0.08)' }}
                >
                  <span
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#B48A45',
                    }}
                  >
                    Explore
                  </span>
                  <div
                    className="w-5 h-px transition-all duration-300 group-hover:w-10"
                    style={{ background: '#B48A45' }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ─── Architectural Atmosphere Mosaic Collage ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[11px] font-bold font-['Manrope'] tracking-[0.18em] uppercase text-[#B48A45] block mb-1">
                Spatial Highlights
              </span>
              <h3
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: '2rem',
                  fontWeight: 600,
                  color: '#F4EFE5',
                }}
              >
                The Architecture Collage
              </h3>
            </div>
            <span className="text-xs text-[rgba(200,189,170,0.6)] font-['Manrope'] hidden sm:inline">
              GM Arcade, Hebbal • Bengaluru
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Large Focal Feature: Double Deck Brewery (span 7) */}
            <div className="md:col-span-7 relative h-72 sm:h-96 rounded-[2px] overflow-hidden group border border-[rgba(200,189,170,0.12)] bg-[#1e1c18]">
              <img
                src="/photos/ambience6.jpg"
                alt="Two-Tier Brewery Deck & Emerald Bar"
                className="w-full h-full object-cover object-[center_35%] transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(23,23,19,0.92)] via-[rgba(23,23,19,0.2)] to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#B48A45] font-['Manrope']">
                    Architecture &amp; Decks
                  </span>
                  <h4
                    style={{
                      fontFamily: '"Cormorant Garamond", Georgia, serif',
                      fontSize: '1.45rem',
                      fontWeight: 600,
                      color: '#F4EFE5',
                    }}
                  >
                    Two-Tier Brewery Deck &amp; Emerald Bar
                  </h4>
                </div>
                <span className="text-xs text-[rgba(200,189,170,0.7)] font-['Manrope'] hidden sm:inline">
                  Mezzanine Balcony
                </span>
              </div>
            </div>

            {/* Top Right: Illuminated Amber Bar Canopy (span 5) */}
            <div className="md:col-span-5 relative h-72 sm:h-96 rounded-[2px] overflow-hidden group border border-[rgba(200,189,170,0.12)] bg-[#1e1c18]">
              <img
                src="/photos/ambience1.jpg"
                alt="The Illuminated Bacardi Amber Bar & Emerald Lounge"
                className="w-full h-full object-cover object-[center_35%] transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(23,23,19,0.92)] via-[rgba(23,23,19,0.2)] to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#B48A45] font-['Manrope']">
                  Mixology &amp; Onyx Bar
                </span>
                <h4
                  style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontSize: '1.45rem',
                    fontWeight: 600,
                    color: '#F4EFE5',
                  }}
                >
                  The Bacardi Amber Canopy Bar
                </h4>
              </div>
            </div>

            {/* Bottom Left: VIP Suite & Pop Art Lounge (span 4) */}
            <div className="md:col-span-4 relative h-64 sm:h-80 rounded-[2px] overflow-hidden group border border-[rgba(200,189,170,0.12)] bg-[#1e1c18]">
              <img
                src="/photos/ambience3.jpg"
                alt="The Pop-Art VIP Suite & Mirrored Lounge"
                className="w-full h-full object-cover object-[center_45%] transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(23,23,19,0.92)] via-[rgba(23,23,19,0.2)] to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#B48A45] font-['Manrope']">
                  Private Suite
                </span>
                <h4
                  style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontSize: '1.3rem',
                    fontWeight: 600,
                    color: '#F4EFE5',
                  }}
                >
                  The Pop-Art VIP Suite
                </h4>
              </div>
            </div>

            {/* Bottom Center: Courtyard Amphitheatre (span 4) */}
            <div className="md:col-span-4 relative h-64 sm:h-80 rounded-[2px] overflow-hidden group border border-[rgba(200,189,170,0.12)] bg-[#1e1c18]">
              <img
                src="/photos/ambience4.jpg"
                alt="Courtyard Amphitheatre & Living Wall"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(23,23,19,0.92)] via-[rgba(23,23,19,0.2)] to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#B48A45] font-['Manrope']">
                  Acoustic Courtyard
                </span>
                <h4
                  style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontSize: '1.3rem',
                    fontWeight: 600,
                    color: '#F4EFE5',
                  }}
                >
                  Amphitheatre &amp; Living Wall
                </h4>
              </div>
            </div>

            {/* Bottom Right: Twilight Sky Terrace (span 4) */}
            <div className="md:col-span-4 relative h-64 sm:h-80 rounded-[2px] overflow-hidden group border border-[rgba(200,189,170,0.12)] bg-[#1e1c18]">
              <img
                src="/photos/ambience2.jpg"
                alt="Twilight Sky Terrace & Hebbal Skyline"
                className="w-full h-full object-cover object-[center_40%] transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(23,23,19,0.92)] via-[rgba(23,23,19,0.2)] to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#B48A45] font-['Manrope']">
                  Skyline Terrace
                </span>
                <h4
                  style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontSize: '1.3rem',
                    fontWeight: 600,
                    color: '#F4EFE5',
                  }}
                >
                  Twilight Sky Terrace
                </h4>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Editorial Quote Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="relative text-center overflow-hidden p-10 sm:p-14 rounded-[2px]"
          style={{
            background: 'var(--color-bg-warm)',
            border: '1px solid rgba(180,138,69,0.18)',
          }}
        >
          <div
            className="text-8xl font-serif absolute -top-4 left-6 opacity-10 select-none"
            style={{ color: '#B48A45' }}
            aria-hidden="true"
          >
            “
          </div>
          <div
            className="text-8xl font-serif absolute -bottom-10 right-6 opacity-10 select-none"
            style={{ color: '#B48A45' }}
            aria-hidden="true"
          >
            ”
          </div>

          <blockquote
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(1.5rem, 3.2vw, 2.5rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              lineHeight: 1.35,
              color: '#F4EFE5',
              maxWidth: '720px',
              margin: '0 auto 1.5rem auto',
              position: 'relative',
              zIndex: 1,
            }}
          >
            “Come for the craft beer, stay for the warmth, the music, and the people.”
          </blockquote>

          <div className="flex items-center justify-center gap-3 relative z-10 flex-wrap">
            <StarRating rating={4.5} size={16} idPrefix="vibe-stars" />
            <span
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                color: '#F4EFE5',
              }}
            >
              4.5 Stars · 5,600+ Google Reviews
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
