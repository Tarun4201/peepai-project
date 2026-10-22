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

            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/${config.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-[2px] flex items-center justify-center transition-colors"
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
                aria-label="Enquire on WhatsApp"
              >
                <Send className="w-3.5 h-3.5" />
              </a>
              <a
                href={`tel:${config.phone}`}
                className="w-9 h-9 rounded-[2px] flex items-center justify-center transition-colors"
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
                aria-label="Call Peepai"
              >
                <Phone className="w-3.5 h-3.5" />
              </a>
              <a
                href={config.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-[2px] flex items-center justify-center transition-colors"
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

          {/* Quick Contact & Hours (4 cols) */}
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
            <div className="flex flex-col gap-3.5 text-xs">
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
