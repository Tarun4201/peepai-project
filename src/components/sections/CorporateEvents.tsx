import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Building2,
  Users,
  Calendar,
  Clock,
  Sparkles,
  Beer,
  Utensils,
  Mic2,
  Car,
  FileText,
  MapPin,
  Send,
  Phone,
  Mail,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react'
import type { RestaurantConfig } from '../../config/restaurant'

interface CorporateEventsProps {
  config: RestaurantConfig
}

interface EventSpace {
  id: string
  name: string
  subtitle: string
  capacity: string
  image: string
  description: string
  bestFor: string[]
  amenities: string[]
}

const EVENT_SPACES: EventSpace[] = [
  {
    id: 'mezzanine',
    name: 'The Mezzanine Brewery Lounge',
    subtitle: 'Overlooking Copper Brew Kettles & Emerald Bar',
    capacity: '60 – 120 Guests',
    image: '/photos/peepai-double-deck-brewery.jpg',
    description:
      'A dramatic two-tier architectural balcony with lush hanging tropical planters and an exclusive underlit emerald bar. Perfect for high-energy tech team celebrations, quarterly achievements, and private corporate buyouts.',
    bestFor: ['Tech Team Outings', 'Quarterly Milestones', 'Product Launches', 'Mixers'],
    amenities: ['Dedicated Private Bar', 'Plug-and-Play AV & Projector', 'Dedicated Service Staff', 'Flexible Seating'],
  },
  {
    id: 'terrace',
    name: 'Twilight Sky Terrace',
    subtitle: 'Open-Air Bengaluru Skyline & Birdcage Cabanas',
    capacity: '80 – 200 Guests',
    image: '/photos/peepai-twilight-sky-terrace.jpg',
    description:
      'Bask under the evening skies of North Bengaluru. Features panoramic skyline vistas, cozy birdcage cabana pods, cooling mist systems, and dedicated acoustic zoning for evening sundowners and grand celebrations.',
    bestFor: ['Corporate Sundowners', 'Annual Dinners', 'Cocktail Mixers', 'Al Fresco Banquets'],
    amenities: ['Open-Sky Views', 'Dedicated DJ Setup Area', 'Private Restrooms Access', 'Weather Protection'],
  },
  {
    id: 'vip-lounge',
    name: 'Pop-Art VIP Suite & Lounge',
    subtitle: 'Mirrored Ceiling & Intimate Velvet Luxury',
    capacity: '20 – 45 Guests',
    image: '/photos/peepai-vip-lounge.jpg',
    description:
      'An intimate, design-forward enclave featuring mirrored ceilings, bespoke floral armchairs, and acoustic dampening. Crafted for executive dinners, confidential team milestones, and leadership summits.',
    bestFor: ['Executive Dinners', 'Leadership Offsites', 'Department Wins', 'Client Entertaining'],
    amenities: ['Acoustic Privacy', 'Bespoke Sommelier Service', 'Executive Lounge Seating', 'Presentation Screen'],
  },
  {
    id: 'courtyard',
    name: 'Courtyard & Live Amphitheatre',
    subtitle: 'Living Wall Garden & Performance Stage',
    capacity: '50 – 100 Guests',
    image: '/photos/peepai-live-stage-courtyard.jpg',
    description:
      'Lush vertical botanical gardens and mountain relief art frame a live performance stage. Ideal for award nights, acoustic music mixers, and interactive team-building sessions.',
    bestFor: ['Awards Nights', 'Acoustic Evenings', 'Company Celebrations', 'Daytime Offsites'],
    amenities: ['Live Performance Stage', 'High-Output Sound System', 'Living Wall Backdrop', 'Tiered Seating Options'],
  },
]

const CORPORATE_PERKS = [
  {
    icon: Beer,
    title: 'Fresh Microbrews on Tap',
    desc: 'Exclusive keg taps & custom beer tasting flights guided by our master brewer.',
  },
  {
    icon: Utensils,
    title: 'Custom Multi-Cuisine Menus',
    desc: 'Tailored live BBQ grills, woodfired pizzas, and extensive vegetarian/Jain spreads.',
  },
  {
    icon: Mic2,
    title: 'Plug-and-Play AV Systems',
    desc: 'High-lumen projectors, wireless cordless mics, and independent zone audio controls.',
  },
  {
    icon: Car,
    title: 'Dedicated Valet Parking',
    desc: 'Hassle-free parking for 100+ vehicles on the main Bellary Road corridor.',
  },
  {
    icon: FileText,
    title: 'Seamless Corporate Billing',
    desc: 'GST input tax invoices, customized company POs, and multiple payment rails.',
  },
  {
    icon: MapPin,
    title: '5 Mins from Tech Parks',
    desc: 'Conveniently situated for Manyata Tech Park, Kirloskar, and RMZ Galleria teams.',
  },
]

export function CorporateEvents({ config }: CorporateEventsProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [activeSpace, setActiveSpace] = useState<string>('mezzanine')
  const [form, setForm] = useState({
    companyName: '',
    organizerName: '',
    phone: '',
    email: '',
    eventType: 'Corporate Team Outing',
    spacePreference: 'mezzanine',
    guestCount: '30-75',
    budgetTier: 'tier-2', // ₹1,600 - ₹2,400
    preferredDate: '',
    timeSlot: 'Sunset Mixer (4:00 PM – 8:00 PM)',
    specialRequests: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const selectedSpaceObj = EVENT_SPACES.find(s => s.id === activeSpace) || EVENT_SPACES[0]

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault()
    const spaceName = EVENT_SPACES.find(s => s.id === form.spacePreference)?.name || 'Any Space'
    const budgetLabel =
      form.budgetTier === 'tier-1'
        ? '₹1,200 – ₹1,600 / head (Craft Beers & Heavy Starters)'
        : form.budgetTier === 'tier-2'
        ? '₹1,600 – ₹2,400 / head (Unlimited Brews & Grand Buffet)'
        : '₹2,400+ / head (Premium Spirits & Bespoke Dining)'

    const text = `*CORPORATE & PRIVATE EVENT INQUIRY — PEEPAI BREWERY & KITCHEN*\n\n` +
      `🏢 *Company / Org:* ${form.companyName || 'N/A'}\n` +
      `👤 *Organizer:* ${form.organizerName}\n` +
      `📱 *Contact:* ${form.phone}\n` +
      `✉️ *Work Email:* ${form.email || 'N/A'}\n` +
      `🎉 *Event Type:* ${form.eventType}\n` +
      `📍 *Preferred Space:* ${spaceName}\n` +
      `👥 *Estimated Guests:* ${form.guestCount} Pax\n` +
      `💰 *Budget Target:* ${budgetLabel}\n` +
      `📅 *Target Date:* ${form.preferredDate || 'To be discussed'}\n` +
      `⏰ *Time Slot:* ${form.timeSlot}\n` +
      `${form.specialRequests ? `📝 *Requirements:* ${form.specialRequests}\n` : ''}\n` +
      `*Please share available slots and a tailored corporate package proposal.*`

    window.open(`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(text)}`, '_blank')
    setSubmitted(true)
  }

  const handleSendEmail = () => {
    const spaceName = EVENT_SPACES.find(s => s.id === form.spacePreference)?.name || 'Any Space'
    const subject = `Corporate Event RFP: ${form.companyName} at Peepai Brewery`
    const body = `Hi Peepai Events Desk,\n\nWe would like to request a corporate event proposal for ${form.companyName}.\n\nDetails:\n- Organizer: ${form.organizerName}\n- Phone: ${form.phone}\n- Event Type: ${form.eventType}\n- Preferred Space: ${spaceName}\n- Guest Count: ${form.guestCount}\n- Date: ${form.preferredDate}\n- Time Slot: ${form.timeSlot}\n\nNotes: ${form.specialRequests}\n\nKindly send across your event packages.`
    window.location.href = `mailto:events@peepaibrewery.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section
      id="corporate"
      ref={ref}
      className="section-py relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #171713 0%, #1a1813 50%, #171713 100%)',
        borderTop: '1px solid rgba(180,138,69,0.18)',
        borderBottom: '1px solid rgba(180,138,69,0.18)',
      }}
    >
      {/* Background ambient glow */}
      <div
        className="absolute top-1/4 -left-48 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-20"
        style={{ background: '#B48A45' }}
      />
      <div
        className="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full blur-[160px] pointer-events-none opacity-15"
        style={{ background: '#C8793C' }}
      />

      <div className="container-xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-4"
            style={{
              background: 'rgba(180,138,69,0.12)',
              border: '1px solid rgba(180,138,69,0.3)',
            }}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B48A45]" />
            <span
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#B48A45',
              }}
            >
              Corporate &amp; Private Events
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              fontWeight: 600,
              lineHeight: 1.1,
              color: '#F4EFE5',
              marginBottom: '1rem',
            }}
          >
            Host Extraordinary Gatherings <br />
            <span style={{ color: '#B48A45', fontStyle: 'italic' }}>
              Where Business Meets Craft &amp; Celebration
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: '0.95rem',
              lineHeight: 1.65,
              color: 'rgba(200,189,170,0.8)',
            }}
          >
            From high-energy IT team outings (Manyata &amp; Kirloskar Tech Parks) to product launch sundowners and executive dinners. Our multi-tier brewery spaces, craft kegs, and personalized concierges make your events effortless.
          </motion.p>
        </div>

        {/* ── 1. Interactive Event Spaces Showcase ── */}
        <div className="mb-20">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6 border-b border-[rgba(200,189,170,0.12)] pb-4">
            <div>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: '0.65rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: '#B48A45',
                  fontWeight: 700,
                }}
              >
                Tailored Venues
              </span>
              <h3
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: '1.75rem',
                  color: '#F4EFE5',
                  fontWeight: 600,
                }}
              >
                Choose Your Space
              </h3>
            </div>

            {/* Space selector tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
              {EVENT_SPACES.map(space => (
                <button
                  key={space.id}
                  onClick={() => {
                    setActiveSpace(space.id)
                    setForm(f => ({ ...f, spacePreference: space.id }))
                  }}
                  className="px-3.5 py-2 rounded-[2px] transition-all text-xs font-semibold whitespace-nowrap"
                  style={{
                    background: activeSpace === space.id ? '#B48A45' : 'rgba(30,28,24,0.7)',
                    color: activeSpace === space.id ? '#171713' : 'rgba(244,239,229,0.75)',
                    border: activeSpace === space.id ? '1px solid #B48A45' : '1px solid rgba(180,138,69,0.2)',
                  }}
                >
                  {space.name.split(' ')[1] || space.name}
                </button>
              ))}
            </div>
          </div>

          {/* Active Space Detail Card */}
          <div
            className="rounded-[2px] overflow-hidden grid lg:grid-cols-12 gap-0"
            style={{
              background: 'var(--color-card)',
              border: '1px solid rgba(180,138,69,0.25)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            }}
          >
            {/* Space Image (7 cols) */}
            <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[420px] overflow-hidden">
              <img
                src={selectedSpaceObj.image}
                alt={selectedSpaceObj.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                style={{ objectPosition: 'center 35%' }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(23,23,19,0.85) 0%, rgba(23,23,19,0.2) 60%, transparent 100%)',
                }}
              />
              {/* Capacity badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-[2px] glass-strong border border-[rgba(180,138,69,0.35)]">
                <Users className="w-3.5 h-3.5 text-[#B48A45]" />
                <span className="text-xs font-bold text-[#F4EFE5] tracking-wide">
                  Capacity: {selectedSpaceObj.capacity}
                </span>
              </div>
            </div>

            {/* Space Information (5 cols) */}
            <div className="lg:col-span-5 p-7 sm:p-9 flex flex-col justify-between">
              <div>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '0.62rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#B48A45',
                    fontWeight: 700,
                    marginBottom: '0.35rem',
                  }}
                >
                  {selectedSpaceObj.subtitle}
                </span>
                <h4
                  style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontSize: '2rem',
                    fontWeight: 600,
                    color: '#F4EFE5',
                    lineHeight: 1.15,
                    marginBottom: '1rem',
                  }}
                >
                  {selectedSpaceObj.name}
                </h4>

                <p
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '0.85rem',
                    lineHeight: 1.65,
                    color: 'rgba(200,189,170,0.85)',
                    marginBottom: '1.5rem',
                  }}
                >
                  {selectedSpaceObj.description}
                </p>

                {/* Best For Tags */}
                <div className="mb-6">
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '0.62rem',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'rgba(200,189,170,0.6)',
                      marginBottom: '0.5rem',
                      fontWeight: 600,
                    }}
                  >
                    Recommended For
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedSpaceObj.bestFor.map(item => (
                      <span
                        key={item}
                        className="px-2.5 py-1 rounded-[2px] text-[0.72rem] font-medium"
                        style={{
                          background: 'rgba(180,138,69,0.12)',
                          border: '1px solid rgba(180,138,69,0.22)',
                          color: '#F4EFE5',
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Included Amenities */}
                <div className="mb-6">
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '0.62rem',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'rgba(200,189,170,0.6)',
                      marginBottom: '0.5rem',
                      fontWeight: 600,
                    }}
                  >
                    Key Features &amp; Setup
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedSpaceObj.amenities.map(am => (
                      <div key={am} className="flex items-center gap-1.5 text-xs text-[rgba(244,239,229,0.8)]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#B48A45] flex-shrink-0" />
                        <span className="truncate">{am}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Instant Book Button */}
              <button
                onClick={() => {
                  document.getElementById('corporate-form')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="btn-primary w-full justify-center py-3 text-xs"
              >
                <span>Request Availability for {selectedSpaceObj.name.split(' ')[1] || 'this Space'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ── 2. Why Bangalore Tech Teams Choose Peepai (Amenities Grid) ── */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: '0.65rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#B48A45',
                fontWeight: 700,
              }}
            >
              The Peepai Advantage
            </span>
            <h3
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '2.2rem',
                color: '#F4EFE5',
                fontWeight: 600,
              }}
            >
              Engineered for Seamless Corporate Hosting
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CORPORATE_PERKS.map((perk, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
                className="p-6 rounded-[2px] transition-all hover:translate-y-[-2px]"
                style={{
                  background: 'var(--color-card)',
                  border: '1px solid rgba(180,138,69,0.18)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-[2px] flex items-center justify-center mb-4"
                  style={{
                    background: 'rgba(180,138,69,0.14)',
                    border: '1px solid rgba(180,138,69,0.3)',
                    color: '#B48A45',
                  }}
                >
                  <perk.icon className="w-5 h-5" />
                </div>
                <h4
                  style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontSize: '1.25rem',
                    color: '#F4EFE5',
                    fontWeight: 600,
                    marginBottom: '0.4rem',
                  }}
                >
                  {perk.title}
                </h4>
                <p
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '0.8rem',
                    lineHeight: 1.55,
                    color: 'rgba(200,189,170,0.75)',
                  }}
                >
                  {perk.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── 3. High-Converting Corporate Booking Engine ── */}
        <div id="corporate-form" className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Concierge & Assurance (5 cols) */}
          <div className="lg:col-span-5">
            <span
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: '0.65rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#B48A45',
                fontWeight: 700,
              }}
            >
              Dedicated Event Desk
            </span>
            <h3
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '2.2rem',
                color: '#F4EFE5',
                fontWeight: 600,
                lineHeight: 1.2,
                marginTop: '0.35rem',
                marginBottom: '1rem',
              }}
            >
              Get a Customized Proposal <br />
              <span style={{ color: '#B48A45', fontStyle: 'italic' }}>Within 30 Minutes</span>
            </h3>

            <p
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: '0.85rem',
                lineHeight: 1.6,
                color: 'rgba(200,189,170,0.8)',
                marginBottom: '2rem',
              }}
            >
              Our dedicated corporate planning team works with your date, group size, and dietary requirements to structure fixed packages, drink coupons, and tailored invoicing.
            </p>

            {/* Direct contact shortcuts */}
            <div className="flex flex-col gap-3 mb-6">
              <a
                href={`tel:${config.phone}`}
                className="p-4 rounded-[2px] flex items-center justify-between transition-colors group"
                style={{
                  background: 'var(--color-card)',
                  border: '1px solid rgba(180,138,69,0.22)',
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-[2px] bg-[rgba(180,138,69,0.12)] flex items-center justify-center text-[#B48A45]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[0.62rem] uppercase tracking-wider text-[#B48A45] font-bold">
                      Corporate Hotline
                    </span>
                    <span className="text-sm font-bold text-[#F4EFE5]">{config.phone}</span>
                  </div>
                </div>
                <span className="text-xs text-[#B48A45] group-hover:underline">Call Desk →</span>
              </a>

              <a
                href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
                  'Hi Peepai Events Team, I want to inquire about hosting a corporate outing.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-[2px] flex items-center justify-between transition-colors group"
                style={{
                  background: 'var(--color-card)',
                  border: '1px solid rgba(37,211,102,0.25)',
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-[2px] bg-[rgba(37,211,102,0.12)] flex items-center justify-center text-[#25D366]">
                    <Send className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[0.62rem] uppercase tracking-wider text-[#25D366] font-bold">
                      WhatsApp Concierge
                    </span>
                    <span className="text-sm font-bold text-[#F4EFE5]">Direct Chat with Event Lead</span>
                  </div>
                </div>
                <span className="text-xs text-[#25D366] group-hover:underline">Chat Now →</span>
              </a>
            </div>

            {/* Trust badge */}
            <div className="p-4 rounded-[2px] bg-[rgba(180,138,69,0.06)] border border-[rgba(180,138,69,0.15)] flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#B48A45] flex-shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-bold text-[#F4EFE5] mb-0.5">
                  Trusted by Hebbal &amp; Manyata Tech Teams
                </span>
                <span className="text-[0.74rem] text-[rgba(200,189,170,0.7)] leading-relaxed">
                  Regular hosts to quarterly celebrations from leading IT, finance, and startup teams across North Bengaluru.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Structured Corporate RFP Form (7 cols) */}
          <div className="lg:col-span-7">
            <div
              className="p-7 sm:p-9 rounded-[2px]"
              style={{
                background: 'var(--color-card)',
                border: '1px solid rgba(180,138,69,0.25)',
              }}
            >
              <h4
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: '1.8rem',
                  fontWeight: 600,
                  color: '#F4EFE5',
                  marginBottom: '0.4rem',
                }}
              >
                Corporate Event Inquiry &amp; Estimate
              </h4>
              <p
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: '0.8rem',
                  color: 'rgba(200,189,170,0.75)',
                  marginBottom: '1.75rem',
                }}
              >
                Fill in your team event parameters below. We’ll generate an instant formatted RFP straight to our events manager.
              </p>

              <form onSubmit={handleSendWhatsApp} className="flex flex-col gap-4">
                {/* Company & Organizer Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="companyName"
                      className="block text-[0.68rem] tracking-wider uppercase font-bold text-[#B48A45] mb-1.5"
                    >
                      <Building2 className="w-3 h-3 inline mr-1" />
                      Company / Organization Name *
                    </label>
                    <input
                      id="companyName"
                      name="companyName"
                      type="text"
                      required
                      value={form.companyName}
                      onChange={handleChange}
                      placeholder="e.g. Amazon, Cognizant, Target..."
                      className="w-full px-3.5 py-2.5 rounded-[2px] text-sm text-[#F4EFE5] outline-none"
                      style={{
                        background: 'rgba(23,23,19,0.6)',
                        border: '1px solid rgba(200,189,170,0.2)',
                      }}
                      onFocus={e => (e.target.style.borderColor = '#B48A45')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(200,189,170,0.2)')}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="organizerName"
                      className="block text-[0.68rem] tracking-wider uppercase font-bold text-[#B48A45] mb-1.5"
                    >
                      Organizer / SPOC Name *
                    </label>
                    <input
                      id="organizerName"
                      name="organizerName"
                      type="text"
                      required
                      value={form.organizerName}
                      onChange={handleChange}
                      placeholder="e.g. Vikram Sharma"
                      className="w-full px-3.5 py-2.5 rounded-[2px] text-sm text-[#F4EFE5] outline-none"
                      style={{
                        background: 'rgba(23,23,19,0.6)',
                        border: '1px solid rgba(200,189,170,0.2)',
                      }}
                      onFocus={e => (e.target.style.borderColor = '#B48A45')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(200,189,170,0.2)')}
                    />
                  </div>
                </div>

                {/* Phone & Work Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-[0.68rem] tracking-wider uppercase font-bold text-[#B48A45] mb-1.5"
                    >
                      Phone / WhatsApp *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-[2px] text-sm text-[#F4EFE5] outline-none"
                      style={{
                        background: 'rgba(23,23,19,0.6)',
                        border: '1px solid rgba(200,189,170,0.2)',
                      }}
                      onFocus={e => (e.target.style.borderColor = '#B48A45')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(200,189,170,0.2)')}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-[0.68rem] tracking-wider uppercase font-bold text-[#B48A45] mb-1.5"
                    >
                      Work Email (For Formal Quote)
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="e.g. vikram@company.com"
                      className="w-full px-3.5 py-2.5 rounded-[2px] text-sm text-[#F4EFE5] outline-none"
                      style={{
                        background: 'rgba(23,23,19,0.6)',
                        border: '1px solid rgba(200,189,170,0.2)',
                      }}
                      onFocus={e => (e.target.style.borderColor = '#B48A45')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(200,189,170,0.2)')}
                    />
                  </div>
                </div>

                {/* Event Type & Preferred Venue */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="eventType"
                      className="block text-[0.68rem] tracking-wider uppercase font-bold text-[#B48A45] mb-1.5"
                    >
                      Event Type
                    </label>
                    <select
                      id="eventType"
                      name="eventType"
                      value={form.eventType}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-[2px] text-sm text-[#F4EFE5] outline-none"
                      style={{
                        background: '#171713',
                        border: '1px solid rgba(200,189,170,0.2)',
                      }}
                    >
                      <option value="Corporate Team Outing">Corporate Team Outing</option>
                      <option value="Quarterly Party & Celebration">Quarterly Party &amp; Celebration</option>
                      <option value="Product Launch & Mixer">Product Launch &amp; Mixer</option>
                      <option value="Executive Dinner & Offsite">Executive Dinner &amp; Offsite</option>
                      <option value="Full Venue Buyout">Full Venue Buyout (250+ Pax)</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="spacePreference"
                      className="block text-[0.68rem] tracking-wider uppercase font-bold text-[#B48A45] mb-1.5"
                    >
                      Preferred Space
                    </label>
                    <select
                      id="spacePreference"
                      name="spacePreference"
                      value={form.spacePreference}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-[2px] text-sm text-[#F4EFE5] outline-none"
                      style={{
                        background: '#171713',
                        border: '1px solid rgba(200,189,170,0.2)',
                      }}
                    >
                      <option value="mezzanine">The Mezzanine Brewery Lounge (60–120 Pax)</option>
                      <option value="terrace">Twilight Sky Terrace (80–200 Pax)</option>
                      <option value="vip-lounge">Pop-Art VIP Suite (20–45 Pax)</option>
                      <option value="courtyard">Courtyard Amphitheatre (50–100 Pax)</option>
                      <option value="any">Open to Concierge Recommendation</option>
                    </select>
                  </div>
                </div>

                {/* Estimated Guests & Budget Per Head Tier */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="guestCount"
                      className="block text-[0.68rem] tracking-wider uppercase font-bold text-[#B48A45] mb-1.5"
                    >
                      <Users className="w-3 h-3 inline mr-1" />
                      Estimated Guests
                    </label>
                    <select
                      id="guestCount"
                      name="guestCount"
                      value={form.guestCount}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-[2px] text-sm text-[#F4EFE5] outline-none"
                      style={{
                        background: '#171713',
                        border: '1px solid rgba(200,189,170,0.2)',
                      }}
                    >
                      <option value="15-30">15 – 30 Guests</option>
                      <option value="31-75">31 – 75 Guests</option>
                      <option value="76-150">76 – 150 Guests</option>
                      <option value="150+">150+ Full Buyout</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="budgetTier"
                      className="block text-[0.68rem] tracking-wider uppercase font-bold text-[#B48A45] mb-1.5"
                    >
                      Budget Range (Per Head)
                    </label>
                    <select
                      id="budgetTier"
                      name="budgetTier"
                      value={form.budgetTier}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-[2px] text-sm text-[#F4EFE5] outline-none"
                      style={{
                        background: '#171713',
                        border: '1px solid rgba(200,189,170,0.2)',
                      }}
                    >
                      <option value="tier-1">₹1,200 – ₹1,600 (Craft Beers + Heavy Starters)</option>
                      <option value="tier-2">₹1,600 – ₹2,400 (Unlimited Brews + Grand Buffet)</option>
                      <option value="tier-3">₹2,400+ (Premium Spirits + Full Custom Spread)</option>
                    </select>
                  </div>
                </div>

                {/* Date & Time Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="preferredDate"
                      className="block text-[0.68rem] tracking-wider uppercase font-bold text-[#B48A45] mb-1.5"
                    >
                      <Calendar className="w-3 h-3 inline mr-1" />
                      Target Date *
                    </label>
                    <input
                      id="preferredDate"
                      name="preferredDate"
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={form.preferredDate}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-[2px] text-sm text-[#F4EFE5] outline-none"
                      style={{
                        background: 'rgba(23,23,19,0.6)',
                        border: '1px solid rgba(200,189,170,0.2)',
                      }}
                      onFocus={e => (e.target.style.borderColor = '#B48A45')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(200,189,170,0.2)')}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="timeSlot"
                      className="block text-[0.68rem] tracking-wider uppercase font-bold text-[#B48A45] mb-1.5"
                    >
                      <Clock className="w-3 h-3 inline mr-1" />
                      Preferred Slot
                    </label>
                    <select
                      id="timeSlot"
                      name="timeSlot"
                      value={form.timeSlot}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-[2px] text-sm text-[#F4EFE5] outline-none"
                      style={{
                        background: '#171713',
                        border: '1px solid rgba(200,189,170,0.2)',
                      }}
                    >
                      <option value="Day / Lunch Mixer (12:00 PM – 4:00 PM)">Day / Lunch Mixer (12:00 PM – 4:00 PM)</option>
                      <option value="Sunset Mixer (4:00 PM – 8:00 PM)">Sunset Mixer (4:00 PM – 8:00 PM)</option>
                      <option value="Dinner & Party (8:00 PM – 12:30 AM)">Dinner &amp; Party (8:00 PM – 12:30 AM)</option>
                      <option value="Full Day Corporate Offsite">Full Day Corporate Offsite</option>
                    </select>
                  </div>
                </div>

                {/* Special Requests / AV Notes */}
                <div>
                  <label
                    htmlFor="specialRequests"
                    className="block text-[0.68rem] tracking-wider uppercase font-bold text-[#B48A45] mb-1.5"
                  >
                    Special Requests &amp; Setup Needs (Optional)
                  </label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    rows={2}
                    value={form.specialRequests}
                    onChange={handleChange}
                    placeholder="e.g. Need projector & wireless mic for 15-min quarterly speech, 40% vegetarian guests, custom beer tasting..."
                    className="w-full px-3.5 py-2.5 rounded-[2px] text-sm text-[#F4EFE5] outline-none resize-none"
                    style={{
                      background: 'rgba(23,23,19,0.6)',
                      border: '1px solid rgba(200,189,170,0.2)',
                    }}
                    onFocus={e => (e.target.style.borderColor = '#B48A45')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(200,189,170,0.2)')}
                  />
                </div>

                {/* Submission CTA Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="btn-primary flex-1 justify-center py-3.5 text-xs"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry on WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSendEmail}
                    className="btn-outline justify-center py-3.5 px-5 text-xs"
                  >
                    <Mail className="w-4 h-4 text-[#B48A45]" />
                    <span>Request Email Quote</span>
                  </button>
                </div>

                {submitted && (
                  <p className="text-xs text-[#25D366] text-center font-medium mt-1">
                    ✓ Your inquiry was sent to WhatsApp. Our events manager will confirm slot availability shortly!
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
