import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Beer, Utensils, Sparkles } from 'lucide-react'
import { StarRating } from '../ui/StarRating'

interface ExperienceVideoItem {
  id: string
  title: string
  desc: string
  videoSrc: string
  posterSrc: string
  tag: string
  badge: string
  Icon: typeof Beer
  objectPosition: string
}

const VIDEO_EXPERIENCES: ExperienceVideoItem[] = [
  {
    id: 'brewery',
    title: 'Our Brewery',
    desc: 'Discover a distinctive brewery experience with refreshing pours, rich flavours, and a welcoming atmosphere.',
    videoSrc: '/video/ourbrewarypeepai.mp4',
    posterSrc: '/video/ourbrewarypeepai-poster.jpg',
    tag: '01 / Microbrewery',
    badge: 'Fresh Craft On Tap',
    Icon: Beer,
    objectPosition: 'center 35%',
  },
  {
    id: 'kitchen',
    title: 'Our Kitchen',
    desc: 'Explore a variety of food experiences, from satisfying bites to dishes made for sharing.',
    videoSrc: '/video/ourkitchenpeepai.mp4',
    posterSrc: '/video/ourkitchenpeepai-poster.jpg',
    tag: '02 / Culinary',
    badge: 'Artisanal Kitchen',
    Icon: Utensils,
    objectPosition: 'center 40%',
  },
  {
    id: 'environment',
    title: 'Our Environment',
    desc: 'Enjoy an inviting space for memorable gatherings, relaxed evenings, and good times together.',
    videoSrc: '/video/ourenvironmentpeepai.mp4',
    posterSrc: '/video/ourenvironmentpeepai-poster.jpg',
    tag: '03 / Atmosphere',
    badge: 'Vibrant Spaces',
    Icon: Sparkles,
    objectPosition: 'center 35%',
  },
]

function VideoExperienceCard({
  item,
  index,
  inView,
}: {
  item: ExperienceVideoItem
  index: number
  inView: boolean
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Respect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Lazy-playback: IntersectionObserver plays when visible, pauses when off-screen
  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container || prefersReducedMotion) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
            if (video.paused && isPlaying) {
              video.play().catch(() => {
                // Low-power mode or autoplay policy fallback
              })
            }
          } else {
            if (!video.paused) {
              video.pause()
            }
          }
        })
      },
      { threshold: [0, 0.2, 0.5] }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [prefersReducedMotion, isPlaying])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play().catch(() => {})
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    const video = videoRef.current
    if (!video) return
    video.muted = !isMuted
    setIsMuted(!isMuted)
  }

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.14, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-[2px] w-full"
      style={{
        background: 'var(--color-card)',
        border: '1px solid rgba(180,138,69,0.20)',
        transition: 'border-color 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(180,138,69,0.45)'
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.45), 0 0 25px rgba(180,138,69,0.12)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(180,138,69,0.20)'
        e.currentTarget.style.transform = 'none'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* ── Portrait Video Frame (Strict 9:16 aspect ratio) ── */}
      <div
        className="relative w-full overflow-hidden bg-[#14120E] cursor-pointer"
        style={{
          aspectRatio: '9 / 16',
          maxHeight: '540px',
        }}
        onClick={togglePlay}
        role="region"
        aria-label={`${item.title} video player`}
      >
        {/* High-Res Static Poster Fallback / Loading State */}
        <img
          src={item.posterSrc}
          alt={item.title}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 pointer-events-none ${
            isLoaded && !hasError && !prefersReducedMotion ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ objectPosition: item.objectPosition }}
          loading="lazy"
        />

        {/* Video Element */}
        {!prefersReducedMotion && (
          <video
            ref={videoRef}
            src={item.videoSrc}
            poster={item.posterSrc}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="metadata"
            onLoadedData={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            style={{ objectPosition: item.objectPosition }}
            aria-label={item.title}
          />
        )}

        {/* Cinematic Vignette Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(30,28,24,0.95) 0%, rgba(30,28,24,0.15) 35%, transparent 65%, rgba(23,23,19,0.4) 100%)',
          }}
        />

        {/* Top Floating Badge */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.35rem 0.75rem',
              background: 'rgba(23,23,19,0.85)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(180,138,69,0.32)',
              borderRadius: '2px',
              fontFamily: 'Manrope, sans-serif',
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#B48A45',
            }}
          >
            <item.Icon className="w-3 h-3 text-[#B48A45]" />
            {item.badge}
          </span>
        </div>

        {/* Top-Right Audio & Playback Controls */}
        <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1.5">
          {/* Mute/Unmute Toggle */}
          <button
            type="button"
            onClick={toggleMute}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer"
            style={{
              background: 'rgba(23,23,19,0.80)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(200,189,170,0.22)',
              color: isMuted ? 'rgba(200,189,170,0.7)' : '#B48A45',
            }}
            aria-label={isMuted ? `Unmute ${item.title}` : `Mute ${item.title}`}
            title={isMuted ? 'Click to unmute sound' : 'Click to mute sound'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Play/Pause Toggle */}
          <button
            type="button"
            onClick={e => {
              e.stopPropagation()
              togglePlay()
            }}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer"
            style={{
              background: 'rgba(23,23,19,0.80)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(200,189,170,0.22)',
              color: '#F4EFE5',
            }}
            aria-label={isPlaying ? `Pause ${item.title}` : `Play ${item.title}`}
            title={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </button>
        </div>
      </div>

      {/* ── Card Content Directly Below Video ── */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          <span
            style={{
              display: 'block',
              fontFamily: 'Manrope, sans-serif',
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#B48A45',
              marginBottom: '0.45rem',
            }}
          >
            {item.tag}
          </span>
          <h3
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: '1.65rem',
              fontWeight: 600,
              color: '#F4EFE5',
              lineHeight: 1.2,
              marginBottom: '0.65rem',
            }}
          >
            {item.title}
          </h3>
          <p
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: '0.88rem',
              lineHeight: 1.65,
              color: 'rgba(200,189,170,0.78)',
              fontWeight: 400,
            }}
          >
            {item.desc}
          </p>
        </div>

        <div
          className="mt-6 pt-4 flex items-center justify-between"
          style={{ borderTop: '1px solid rgba(200,189,170,0.08)' }}
        >
          <span
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#B48A45',
            }}
          >
            Peepai Experience
          </span>
          <div
            className="w-6 h-px transition-all duration-300 group-hover:w-12"
            style={{ background: '#B48A45' }}
          />
        </div>
      </div>
    </motion.div>
  )
}

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
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-6 h-[1px] bg-[#B48A45]" />
            <p className="section-label" style={{ margin: 0 }}>
              THE PEEPAI EXPERIENCE
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
            Where Beer, Food &amp; <span style={{ color: '#B48A45', fontStyle: 'italic' }}>Fun Meet</span>
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
            Discover the craft, flavours, and atmosphere that make every visit to Peepai memorable.
          </p>
        </motion.div>

        {/* ── 3-Card Portrait Video Experience (Our Brewery, Our Kitchen, Our Environment) ── */}
        <div className="grid grid-cols-1 min-[901px]:grid-cols-3 gap-8 sm:gap-10 lg:gap-7 max-w-md min-[901px]:max-w-none mx-auto mb-16 sm:mb-20">
          {VIDEO_EXPERIENCES.map((item, i) => (
            <VideoExperienceCard
              key={item.id}
              item={item}
              index={i}
              inView={inView}
            />
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
