import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  MapPin,
  Clock,
  Phone,
  Navigation,
  ExternalLink,
  Music,
  Trees,
  Car,
  Beer,
  Utensils,
  Sparkles,
  Camera,
} from 'lucide-react'
import type { RestaurantConfig } from '../../config/restaurant'

interface VisitProps {
  config: RestaurantConfig
}

const AMENITIES = [
  { Icon: Music, label: 'Live Acoustic & DJ Nights' },
  { Icon: Trees, label: 'Open-Air Sky Terrace' },
  { Icon: Car, label: 'Dedicated Valet Parking' },
  { Icon: Beer, label: 'Fresh Microbrewery On Tap' },
  { Icon: Utensils, label: 'Multi-Cuisine Kitchen' },
  { Icon: Sparkles, label: 'VIP Lounge & Elephant Relief' },
  { Icon: Camera, label: 'Contemporary Interior Design' },
  { Icon: Clock, label: 'Late Night Service until 12:30 AM' },
]

export function Visit({ config }: VisitProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="visit"
      ref={ref}
      className="section-py relative overflow-hidden"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="container-xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="section-label">Location &amp; Hours</p>
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
            Plan Your <span style={{ color: '#B48A45', fontStyle: 'italic' }}>Visit</span>
          </h2>
          <p
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: '0.95rem',
              color: 'rgba(200,189,170,0.75)',
              maxWidth: '560px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Conveniently situated along the Bellary Road corridor in Hebbal with valet parking and immediate transit access.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Address, Hours, Contact, Amenities (6 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col gap-5 justify-between"
          >
            {/* Address Card */}
            <div
              className="p-6 rounded-[2px]"
              style={{
                background: 'var(--color-card)',
                border: '1px solid rgba(200,189,170,0.1)',
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-[2px] flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'rgba(180,138,69,0.12)',
                    border: '1px solid rgba(180,138,69,0.3)',
                    color: '#B48A45',
                  }}
                >
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3
                    style={{
                      fontFamily: '"Cormorant Garamond", Georgia, serif',
                      fontSize: '1.35rem',
                      fontWeight: 600,
                      color: '#F4EFE5',
                      marginBottom: '0.4rem',
                    }}
                  >
                    Our Address
                  </h3>
                  <p
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '0.85rem',
                      lineHeight: 1.6,
                      color: 'rgba(200,189,170,0.75)',
                      marginBottom: '0.75rem',
                    }}
                  >
                    {config.address}
                  </p>
                  <a
                    href={config.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
                    style={{ color: '#B48A45' }}
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div
              className="p-6 rounded-[2px]"
              style={{
                background: 'var(--color-card)',
                border: '1px solid rgba(200,189,170,0.1)',
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-[2px] flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'rgba(180,138,69,0.12)',
                    border: '1px solid rgba(180,138,69,0.3)',
                    color: '#B48A45',
                  }}
                >
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3
                    style={{
                      fontFamily: '"Cormorant Garamond", Georgia, serif',
                      fontSize: '1.35rem',
                      fontWeight: 600,
                      color: '#F4EFE5',
                      marginBottom: '0.4rem',
                    }}
                  >
                    Operating Hours
                  </h3>
                  {config.hours.map((h, i) => (
                    <div key={i} className="flex justify-between items-center text-xs sm:text-sm py-1">
                      <span style={{ fontFamily: 'Manrope, sans-serif', color: 'rgba(200,189,170,0.7)' }}>
                        {h.days}
                      </span>
                      <span
                        style={{
                          fontFamily: 'Manrope, sans-serif',
                          fontWeight: 700,
                          color: '#F4EFE5',
                        }}
                      >
                        {h.time}
                      </span>
                    </div>
                  ))}
                  <div className="mt-3 flex items-center gap-2">
                    <span className="badge-open">
                      <span className="dot" />
                      Daily Service
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Telephone Card */}
            <div
              className="p-6 rounded-[2px]"
              style={{
                background: 'var(--color-card)',
                border: '1px solid rgba(200,189,170,0.1)',
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-[2px] flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'rgba(180,138,69,0.12)',
                    border: '1px solid rgba(180,138,69,0.3)',
                    color: '#B48A45',
                  }}
                >
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3
                    style={{
                      fontFamily: '"Cormorant Garamond", Georgia, serif',
                      fontSize: '1.35rem',
                      fontWeight: 600,
                      color: '#F4EFE5',
                      marginBottom: '0.2rem',
                    }}
                  >
                    Phone &amp; Enquiries
                  </h3>
                  <p
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '0.8rem',
                      color: 'rgba(200,189,170,0.7)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Call for instant table bookings, private event enquiries, or venue walk-throughs.
                  </p>
                  <a
                    href={`tel:${config.phone}`}
                    style={{
                      fontFamily: '"Bricolage Grotesque", Manrope, sans-serif',
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      color: '#B48A45',
                    }}
                    className="hover:underline inline-block"
                  >
                    {config.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Amenities Grid */}
            <div
              className="p-6 rounded-[2px]"
              style={{
                background: 'var(--color-card)',
                border: '1px solid rgba(200,189,170,0.1)',
              }}
            >
              <h4
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#B48A45',
                  marginBottom: '1rem',
                }}
              >
                Guest Amenities
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {AMENITIES.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <amenity.Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#B48A45' }} />
                    <span
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        fontSize: '0.74rem',
                        color: 'rgba(200,189,170,0.85)',
                      }}
                    >
                      {amenity.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Google Maps & Directions (6 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col"
          >
            <div
              className="relative w-full h-full min-h-[420px] rounded-[2px] overflow-hidden flex flex-col"
              style={{
                border: '1px solid rgba(180,138,69,0.22)',
                background: 'var(--color-card)',
              }}
            >
              {/* Floating Pin Indicator */}
              <div
                className="absolute top-3 right-3 z-10 flex items-center gap-2 px-3 py-1.5 rounded-[2px] shadow-lg pointer-events-none"
                style={{
                  background: 'rgba(23, 23, 19, 0.92)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(180, 138, 69, 0.4)',
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                </span>
                <span
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: '#F4EFE5',
                    letterSpacing: '0.02em',
                  }}
                >
                  📍 Verified Pin Location
                </span>
              </div>

              {/* Map embed iframe */}
              <iframe
                title="Peepai Brewery & Kitchen Location Map"
                src={config.mapsEmbedSrc}
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  minHeight: '380px',
                  flex: 1,
                }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Map Action Bar */}
              <div
                className="p-5 flex items-center justify-between flex-wrap gap-4"
                style={{
                  background: 'var(--color-card)',
                  borderTop: '1px solid rgba(200,189,170,0.1)',
                }}
              >
                <div>
                  <span
                    style={{
                      display: 'block',
                      fontFamily: '"Cormorant Garamond", Georgia, serif',
                      fontSize: '1.15rem',
                      fontWeight: 600,
                      color: '#F4EFE5',
                    }}
                  >
                    Peepai Brewery &amp; Kitchen
                  </span>
                  <span
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '0.72rem',
                      color: 'rgba(200,189,170,0.65)',
                    }}
                  >
                    GM Arcade, Bellary Road, Hebbal
                  </span>
                </div>
                <a
                  href={config.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs py-2.5 px-4"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
