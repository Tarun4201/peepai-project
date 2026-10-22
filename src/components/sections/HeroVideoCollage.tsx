import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause } from 'lucide-react'

export interface HeroVideoScene {
  id: string
  title: string
  subtitle: string
  src: string
  poster: string
  objectPositionDesktop: string
  objectPositionTablet: string
  objectPositionMobile: string
  tag: string
  badge: string
  icon: string
}

export const HERO_VIDEOS: HeroVideoScene[] = [
  {
    id: 'mixology',
    title: 'Craft Mixology',
    subtitle: 'Artisanal Cocktails & Strained Coupes',
    src: '/video/food1.mp4',
    poster: '/video/food1-poster.jpg',
    objectPositionDesktop: 'center 32%',
    objectPositionTablet: 'center 30%',
    objectPositionMobile: 'center 28%',
    tag: '01 / Mixology',
    badge: 'Cocktail Bar',
    icon: '🍸',
  },
  {
    id: 'kitchen',
    title: 'Kitchen Sizzle',
    subtitle: 'Handmade Pasta & Simmered Reductions',
    src: '/video/food2.mp4',
    poster: '/video/food2-poster.jpg',
    objectPositionDesktop: 'center 50%',
    objectPositionTablet: 'center 48%',
    objectPositionMobile: 'center 46%',
    tag: '02 / Sauté',
    badge: 'Live Kitchen',
    icon: '🍳',
  },
  {
    id: 'artisan',
    title: 'Culinary Art',
    subtitle: 'Fresh Prep & Gourmet Ingredients',
    src: '/video/food3.mp4',
    poster: '/video/food3-poster.jpg',
    objectPositionDesktop: 'center 45%',
    objectPositionTablet: 'center 42%',
    objectPositionMobile: 'center 40%',
    tag: '03 / Artisan',
    badge: 'Gourmet Prep',
    icon: '🥗',
  },
  {
    id: 'flame',
    title: 'Live Flame',
    subtitle: 'High Wok Energy & Culinary Fire',
    src: '/video/food4.mp4',
    poster: '/video/food4-poster.jpg',
    objectPositionDesktop: 'center 55%',
    objectPositionTablet: 'center 52%',
    objectPositionMobile: 'center 50%',
    tag: '04 / Flame',
    badge: 'Wok Station',
    icon: '🔥',
  },
]

interface HeroVideoCollageProps {
  parallaxY?: number
}

export function HeroVideoCollage({ parallaxY = 0 }: HeroVideoCollageProps) {
  // Mobile active scene index
  const [activeMobileIndex, setActiveMobileIndex] = useState(0)

  // Hovered panel on desktop for subtle luxury focus
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Master ambient playback state
  const [isPlaying, setIsPlaying] = useState(true)
  const [hasReducedMotion, setHasReducedMotion] = useState(false)
  const [hasError, setHasError] = useState<Record<string, boolean>>({})

  // Video element refs
  const desktopVideoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const mobileVideoRef = useRef<HTMLVideoElement | null>(null)

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setHasReducedMotion(true)
      setIsPlaying(false)
    }

    const handler = (e: MediaQueryListEvent) => {
      setHasReducedMotion(e.matches)
      if (e.matches) {
        setIsPlaying(false)
      }
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Sync play/pause with refs
  useEffect(() => {
    if (hasReducedMotion) return

    desktopVideoRefs.current.forEach(video => {
      if (!video) return
      if (isPlaying) {
        video.play().catch(() => {
          // Autoplay was blocked or aborted; poster remains visible
        })
      } else {
        video.pause()
      }
    })

    if (mobileVideoRef.current) {
      if (isPlaying) {
        mobileVideoRef.current.play().catch(() => {})
      } else {
        mobileVideoRef.current.pause()
      }
    }
  }, [isPlaying, hasReducedMotion])

  const togglePlayback = () => {
    setIsPlaying(prev => !prev)
  }

  const handleVideoError = (id: string) => {
    setHasError(prev => ({ ...prev, [id]: true }))
  }

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden select-none"
      style={{
        transform: `translateY(${parallaxY}px)`,
        willChange: 'transform',
        top: `-${parallaxY}px`,
      }}
      aria-hidden="true"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. DESKTOP & LAPTOP: 4-COLUMN CINEMATIC EDITORIAL COLLAGE (>= 1024px)
          Arranges the 4 portrait clips into 4 sleek vertical slit panels
          ───────────────────────────────────────────────────────────── */}
      <div className="hidden lg:grid grid-cols-4 h-full w-full absolute inset-0">
        {HERO_VIDEOS.map((scene, idx) => {
          const isDimmed = hoveredIndex !== null && hoveredIndex !== idx
          const isFocal = hoveredIndex === idx

          return (
            <div
              key={scene.id}
              className="relative h-full overflow-hidden border-r border-[rgba(180,138,69,0.18)] last:border-r-0 group cursor-pointer transition-all duration-700"
              style={{
                opacity: isDimmed ? 0.65 : 1,
                transform: isFocal ? 'scale(1.015)' : 'scale(1)',
                zIndex: isFocal ? 10 : 1,
              }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Poster Image Always Loaded for zero-CLS & instant render */}
              <img
                src={scene.poster}
                alt={scene.title}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                style={{
                  objectPosition: scene.objectPositionDesktop,
                  filter: 'brightness(0.92) contrast(1.05)',
                }}
                loading={idx === 0 ? 'eager' : 'lazy'}
                fetchPriority={idx === 0 ? 'high' : 'auto'}
              />

              {/* Video Element */}
              {!hasReducedMotion && !hasError[scene.id] && (
                <video
                  ref={el => {
                    desktopVideoRefs.current[idx] = el
                  }}
                  src={scene.src}
                  poster={scene.poster}
                  autoPlay={isPlaying}
                  muted
                  loop
                  playsInline
                  preload={idx === 0 ? 'auto' : 'metadata'}
                  onError={() => handleVideoError(scene.id)}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
                  style={{
                    objectPosition: scene.objectPositionDesktop,
                    filter: isFocal
                      ? 'brightness(1.0) contrast(1.08) saturate(1.15)'
                      : 'brightness(0.88) contrast(1.05) saturate(1.05)',
                  }}
                />
              )}

              {/* Top Panel Identifier Chip */}
              <div className="absolute top-28 left-4 z-20 pointer-events-none transition-opacity duration-300">
                <span
                  className="px-2 py-0.5 rounded-[2px] text-[10px] font-bold font-['Manrope'] tracking-[0.16em] uppercase text-[#F4EFE5] transition-all"
                  style={{
                    background: isFocal
                      ? 'rgba(180,138,69,0.85)'
                      : 'rgba(23,23,19,0.75)',
                    border: '1px solid rgba(180,138,69,0.3)',
                    backdropFilter: 'blur(8px)',
                    color: isFocal ? '#171713' : '#F4EFE5',
                  }}
                >
                  {scene.tag}
                </span>
              </div>

              {/* Bottom Scene Badge on Hover */}
              <div
                className={`absolute bottom-24 left-4 right-4 z-20 pointer-events-none transition-all duration-500 ${
                  isFocal ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                }`}
              >
                <div
                  className="p-2.5 rounded-[2px]"
                  style={{
                    background: 'rgba(23,23,19,0.88)',
                    border: '1px solid rgba(180,138,69,0.4)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <p className="text-[11px] font-bold text-[#F4EFE5] tracking-wide uppercase">
                    {scene.title}
                  </p>
                  <p className="text-[10px] text-[rgba(200,189,170,0.8)] line-clamp-1">
                    {scene.subtitle}
                  </p>
                </div>
              </div>

              {/* Individual Column Warm Amber Overlay */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                style={{
                  background:
                    'linear-gradient(to top, rgba(23,23,19,0.7) 0%, transparent 40%, rgba(23,23,19,0.35) 100%)',
                  opacity: isFocal ? 0.3 : 0.6,
                }}
              />
            </div>
          )
        })}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. TABLET: 2-COLUMN BALANCED EDITORIAL COLLAGE (640px to 1023px)
          Features Mixology (food1) and Live Flame (food4)
          ───────────────────────────────────────────────────────────── */}
      <div className="hidden sm:grid lg:hidden grid-cols-2 h-full w-full absolute inset-0">
        {[HERO_VIDEOS[0], HERO_VIDEOS[3]].map((scene) => (
          <div
            key={scene.id}
            className="relative h-full overflow-hidden border-r border-[rgba(180,138,69,0.18)] last:border-r-0"
          >
            <img
              src={scene.poster}
              alt={scene.title}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                objectPosition: scene.objectPositionTablet,
                filter: 'brightness(0.9) contrast(1.05)',
              }}
            />
            {!hasReducedMotion && !hasError[scene.id] && (
              <video
                src={scene.src}
                poster={scene.poster}
                autoPlay={isPlaying}
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  objectPosition: scene.objectPositionTablet,
                  filter: 'brightness(0.85) contrast(1.05) saturate(1.1)',
                }}
              />
            )}
            <div className="absolute top-24 left-4 z-20 pointer-events-none">
              <span
                className="px-2 py-0.5 rounded-[2px] text-[10px] font-bold font-['Manrope'] tracking-[0.16em] uppercase text-[#F4EFE5]"
                style={{
                  background: 'rgba(23,23,19,0.75)',
                  border: '1px solid rgba(180,138,69,0.3)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {scene.tag}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. MOBILE: FULL-BLEED NATIVE 9:16 PORTRAIT EXPERIENCE (< 640px)
          Seamlessly plays the selected portrait video with zero distortion
          ───────────────────────────────────────────────────────────── */}
      <div className="sm:hidden absolute inset-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={HERO_VIDEOS[activeMobileIndex].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Poster fallback */}
            <img
              src={HERO_VIDEOS[activeMobileIndex].poster}
              alt={HERO_VIDEOS[activeMobileIndex].title}
              className="w-full h-full object-cover"
              style={{
                objectPosition:
                  HERO_VIDEOS[activeMobileIndex].objectPositionMobile,
                filter: 'brightness(0.88) contrast(1.05)',
              }}
              loading="eager"
            />

            {!hasReducedMotion && !hasError[HERO_VIDEOS[activeMobileIndex].id] && (
              <video
                ref={mobileVideoRef}
                src={HERO_VIDEOS[activeMobileIndex].src}
                poster={HERO_VIDEOS[activeMobileIndex].poster}
                autoPlay={isPlaying}
                muted
                loop
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  objectPosition:
                    HERO_VIDEOS[activeMobileIndex].objectPositionMobile,
                  filter: 'brightness(0.85) contrast(1.05) saturate(1.1)',
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Mobile Scene Indicator & Quick Switcher (Thumb-friendly bottom bar) */}
        <div className="absolute bottom-5 left-4 z-30 flex items-center gap-1.5 p-1 rounded-full bg-[rgba(23,23,19,0.85)] border border-[rgba(180,138,69,0.3)] backdrop-blur-md">
          {HERO_VIDEOS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActiveMobileIndex(i)}
              className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all ${
                activeMobileIndex === i
                  ? 'bg-[#B48A45] text-[#171713] scale-110 shadow-sm'
                  : 'text-[rgba(244,239,229,0.65)] hover:text-[#F4EFE5]'
              }`}
              title={s.title}
              aria-label={`Switch to ${s.title}`}
            >
              {s.icon}
            </button>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. MASTER CINEMATIC GRADIENT SCRIMS (AAA CONTRAST & LEGIBILITY)
          ───────────────────────────────────────────────────────────── */}
      {/* Primary Horizontal Scrim: Darkens left side for crystal-clear headline readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to right, 
              rgba(23,23,19,0.94) 0%, 
              rgba(23,23,19,0.85) 34%, 
              rgba(23,23,19,0.48) 60%, 
              rgba(23,23,19,0.22) 100%
            )
          `,
        }}
      />

      {/* Vertical Vignette: Darkens bottom for CTAs, address, and discover button */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to top, 
              rgba(23,23,19,0.98) 0%, 
              rgba(23,23,19,0.55) 30%, 
              transparent 70%
            )
          `,
        }}
      />

      {/* Top Navbar Scrim */}
      <div
        className="absolute inset-x-0 top-0 h-40 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(23,23,19,0.85) 0%, transparent 100%)',
        }}
      />

      {/* Warm Ambient Radial Glow for Bengaluru Craft Hospitality */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 15% 45%, rgba(180,138,69,0.12) 0%, transparent 55%)',
        }}
      />

      {/* ─────────────────────────────────────────────────────────────
          5. AMBIENT MOTION CONTROLS (ACCESSIBILITY & USER CHOICE)
          ───────────────────────────────────────────────────────────── */}
      <div className="absolute bottom-6 right-4 sm:right-8 z-30 flex items-center gap-2">
        <button
          onClick={togglePlayback}
          className="px-3 py-1.5 rounded-full text-[11px] font-['Manrope'] font-semibold tracking-wider uppercase inline-flex items-center gap-1.5 transition-all text-[#F4EFE5] hover:text-[#B48A45]"
          style={{
            background: 'rgba(23,23,19,0.85)',
            border: '1px solid rgba(180,138,69,0.35)',
            backdropFilter: 'blur(10px)',
          }}
          title={isPlaying ? 'Pause Background Videos' : 'Play Background Videos'}
          aria-label={isPlaying ? 'Pause Background Videos' : 'Play Background Videos'}
        >
          {isPlaying ? (
            <>
              <Pause className="w-3 h-3 text-[#B48A45]" />
              <span className="hidden sm:inline">Pause Motion</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 text-[#B48A45]" />
              <span className="hidden sm:inline">Play Motion</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
