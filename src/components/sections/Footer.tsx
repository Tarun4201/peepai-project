import { Phone, Send, Clock, MapPin } from 'lucide-react'
import type { RestaurantConfig } from '../../config/restaurant'

interface FooterProps {
  config: RestaurantConfig
}

export function Footer({ config }: FooterProps) {
  const year = new Date().getFullYear()

  const handleNavClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: 'var(--color-bg)',
        borderTop: '1px solid rgba(180,138,69,0.18)',
      }}
    >
      {/* Top subtle brass accent line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] opacity-70"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(180,138,69,0.8), transparent)',
        }}
      />

      <div className="container-xl py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3.5 mb-5">
              <img
                src={config.logo || '/logo.png'}
                alt="Peepai Brewery & Kitchen Logo"
                className="h-12 w-auto object-contain logo-glow"
              />
              <div>
                <span
                  style={{
                    display: 'block',
                    fontFamily: '"Bricolage Grotesque", Manrope, sans-serif',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    letterSpacing: '-0.01em',
                    color: '#F4EFE5',
                    lineHeight: 1,
                  }}
                >
                  PEEPAI
                </span>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '0.58rem',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: '#B48A45',
                    marginTop: '2px',
                  }}
                >
                  Brewery &amp; Kitchen
                </span>
              </div>
            </div>

            <p
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: '0.82rem',
                lineHeight: 1.65,
                color: 'rgba(200,189,170,0.7)',
                maxWidth: '380px',
                marginBottom: '1.5rem',
              }}
            >
              Hebbal's premier craft brewery and dining lounge. Microbrews crafted in-house, wood-fired artisanal cuisine, live acoustic sets, and an open-air sky terrace.
            </p>

            {/* Social Media & Direct Actions */}
            <div className="mt-6">
              <span
                style={{
                  display: 'block',
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: '0.62rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#B48A45',
                  fontWeight: 700,
                  marginBottom: '0.6rem',
                }}
              >
                Follow Our Journey
              </span>
              <div className="flex items-center gap-2.5 flex-wrap">
                {config.socialLinks?.instagram && (
                  <a
                    href={config.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-[2px] flex items-center justify-center transition-all group"
                    style={{
                      background: 'var(--color-card)',
                      border: '1px solid rgba(180,138,69,0.25)',
                      color: '#F4EFE5',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = '#E1306C'
                      e.currentTarget.style.color = '#E1306C'
                      e.currentTarget.style.boxShadow = '0 0 12px rgba(225,48,108,0.25)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(180,138,69,0.25)'
                      e.currentTarget.style.color = '#F4EFE5'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                    aria-label="Peepai Instagram"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  </a>
                )}

                {config.socialLinks?.facebook && (
                  <a
                    href={config.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-[2px] flex items-center justify-center transition-all group"
                    style={{
                      background: 'var(--color-card)',
                      border: '1px solid rgba(180,138,69,0.25)',
                      color: '#F4EFE5',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = '#1877F2'
                      e.currentTarget.style.color = '#1877F2'
                      e.currentTarget.style.boxShadow = '0 0 12px rgba(24,119,242,0.25)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(180,138,69,0.25)'
                      e.currentTarget.style.color = '#F4EFE5'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                    aria-label="Peepai Facebook"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                )}

                {config.socialLinks?.linkedin && (
                  <a
                    href={config.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-[2px] flex items-center justify-center transition-all group"
                    style={{
                      background: 'var(--color-card)',
                      border: '1px solid rgba(180,138,69,0.25)',
                      color: '#F4EFE5',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = '#0A66C2'
                      e.currentTarget.style.color = '#0A66C2'
                      e.currentTarget.style.boxShadow = '0 0 12px rgba(10,102,194,0.25)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(180,138,69,0.25)'
                      e.currentTarget.style.color = '#F4EFE5'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                    aria-label="Peepai LinkedIn"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  </a>
                )}

                <a
                  href={`https://wa.me/${config.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-[2px] flex items-center justify-center transition-all"
                  style={{
                    background: 'var(--color-card)',
                    border: '1px solid rgba(180,138,69,0.25)',
                    color: '#25D366',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#25D366'
                    e.currentTarget.style.boxShadow = '0 0 12px rgba(37,211,102,0.25)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(180,138,69,0.25)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                  aria-label="Enquire on WhatsApp"
                >
                  <Send className="w-3.5 h-3.5" />
                </a>

                <a
                  href={`tel:${config.phone}`}
                  className="w-9 h-9 rounded-[2px] flex items-center justify-center transition-all"
                  style={{
                    background: 'var(--color-card)',
                    border: '1px solid rgba(180,138,69,0.25)',
                    color: '#B48A45',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#B48A45'
                    e.currentTarget.style.boxShadow = '0 0 12px rgba(180,138,69,0.25)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(180,138,69,0.25)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                  aria-label="Call Peepai"
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>

                <a
                  href={config.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-[2px] flex items-center justify-center transition-all"
                  style={{
                    background: 'var(--color-card)',
                    border: '1px solid rgba(180,138,69,0.25)',
                    color: '#F4EFE5',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#B48A45'
                    e.currentTarget.style.color = '#B48A45'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(180,138,69,0.25)'
                    e.currentTarget.style.color = '#F4EFE5'
                  }}
                  aria-label="Get directions on Google Maps"
                >
                  <MapPin className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Navigation (3 cols) */}
          <div className="lg:col-span-3">
            <h4
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#B48A45',
                marginBottom: '1.25rem',
              }}
            >
              Explore
            </h4>
            <ul className="flex flex-col gap-2.5">
              {[
                ['Heritage & Story', '#welcome'],
                ['The Peepai Ambience', '#vibe'],
                ['Corporate & Events', '#corporate'],
                ['Culinary Showcase', '#culinary'],
                ['Craft Beer & Food Menu', '#menu'],
                ['Visual Journal', '#gallery'],
                ['Table Reservations', '#reserve'],
                ['Location & Hours', '#visit'],
              ].map(([label, href]) => (
                <li key={href}>
                  <button
                    onClick={() => handleNavClick(href)}
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '0.8rem',
                      color: 'rgba(200,189,170,0.7)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      padding: 0,
                    }}
                    className="hover:text-[#B48A45] transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Contact, Hours & Order Online (4 cols) */}
          <div className="lg:col-span-4">
            <h4
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#B48A45',
                marginBottom: '1.25rem',
              }}
            >
              Visit &amp; Contact
            </h4>
            <div className="flex flex-col gap-3.5 text-xs mb-6">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#B48A45' }} />
                <span style={{ fontFamily: 'Manrope, sans-serif', color: 'rgba(200,189,170,0.75)', lineHeight: 1.5 }}>
                  {config.address}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: '#B48A45' }} />
                <a
                  href={`tel:${config.phone}`}
                  style={{ fontFamily: 'Manrope, sans-serif', color: '#F4EFE5', fontWeight: 600 }}
                  className="hover:underline"
                >
                  {config.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 flex-shrink-0" style={{ color: '#B48A45' }} />
                <span style={{ fontFamily: 'Manrope, sans-serif', color: 'rgba(200,189,170,0.75)' }}>
                  Daily: 12:00 PM – 12:30 AM
                </span>
              </div>
            </div>

            {/* Order Online / Food Delivery Partners */}
            {(config.deliveryLinks?.zomato || config.deliveryLinks?.swiggy) && (
              <div className="pt-4 border-t border-[rgba(200,189,170,0.12)]">
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '0.62rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#B48A45',
                    fontWeight: 700,
                    marginBottom: '0.6rem',
                  }}
                >
                  Order Food Online
                </span>
                <div className="flex items-center gap-2.5">
                  {config.deliveryLinks?.zomato && (
                    <a
                      href={config.deliveryLinks.zomato}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-[2px] flex items-center gap-1.5 transition-all"
                      style={{
                        background: 'rgba(226,55,68,0.12)',
                        border: '1px solid rgba(226,55,68,0.35)',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(226,55,68,0.22)'
                        e.currentTarget.style.borderColor = '#E23744'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(226,55,68,0.12)'
                        e.currentTarget.style.borderColor = 'rgba(226,55,68,0.35)'
                      }}
                    >
                      <span className="w-2 h-2 rounded-full bg-[#E23744]" />
                      <span
                        style={{
                          fontFamily: 'Manrope, sans-serif',
                          fontWeight: 700,
                          fontSize: '0.74rem',
                          color: '#F4EFE5',
                          letterSpacing: '0.02em',
                        }}
                      >
                        Zomato
                      </span>
                    </a>
                  )}

                  {config.deliveryLinks?.swiggy && (
                    <a
                      href={config.deliveryLinks.swiggy}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-[2px] flex items-center gap-1.5 transition-all"
                      style={{
                        background: 'rgba(252,128,25,0.12)',
                        border: '1px solid rgba(252,128,25,0.35)',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(252,128,25,0.22)'
                        e.currentTarget.style.borderColor = '#FC8019'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(252,128,25,0.12)'
                        e.currentTarget.style.borderColor = 'rgba(252,128,25,0.35)'
                      }}
                    >
                      <span className="w-2 h-2 rounded-full bg-[#FC8019]" />
                      <span
                        style={{
                          fontFamily: 'Manrope, sans-serif',
                          fontWeight: 700,
                          fontSize: '0.74rem',
                          color: '#F4EFE5',
                          letterSpacing: '0.02em',
                        }}
                      >
                        Swiggy
                      </span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar with Concept Credit */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{
            borderTop: '1px solid rgba(200,189,170,0.08)',
            color: 'rgba(200,189,170,0.5)',
            fontFamily: 'Manrope, sans-serif',
          }}
        >
          <p>© {year} {config.name}. All rights reserved.</p>
          <p
            className="text-center sm:text-right"
            style={{ color: '#B48A45', opacity: 0.85 }}
          >
            {config.footerCredit}
          </p>
        </div>
      </div>
    </footer>
  )
}
