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
  Gift,
  Zap,
} from 'lucide-react'
import type { RestaurantConfig } from '../../config/restaurant'

interface CorporateEventsProps {
  config: RestaurantConfig
}

interface SpaceOption {
  id: string
  name: string
  description: string
  capacity: string
}

const SPACE_OPTIONS: SpaceOption[] = [
  {
    id: 'main-hall',
    name: 'Main Brewery Hall & Stage (Live Energy • Up to 250 Pax)',
    description: 'Central dynamic dining hall with high-energy vibe, emerald velvet armchairs, big-screen AV, and DJ stage access.',
    capacity: 'Up to 250 Guests',
  },
  {
    id: 'mezzanine',
    name: 'The Mezzanine Brewery Balcony (Overlooking Bar • 60–120 Pax)',
    description: 'Elevated architectural balcony overlooking the copper kettles and underlit emerald bar with dedicated bar team.',
    capacity: '60 – 120 Guests',
  },
  {
    id: 'terrace',
    name: 'Twilight Open-Sky Terrace (Al Fresco • 80–200 Pax)',
    description: 'Al fresco open-air rooftop with panoramic Hebbal skyline vistas, cooling mist, and breezy cabana pods.',
    capacity: '80 – 200 Guests',
  },
  {
    id: 'vip-lounge',
    name: 'Pop-Art VIP Suite & Lounge (Intimate • 20–45 Pax)',
    description: 'Intimate, acoustic-dampened private enclave with mirrored ceiling and bespoke floral seating.',
    capacity: '20 – 45 Guests',
  },
  {
    id: 'courtyard',
    name: 'Courtyard & Live Amphitheatre (Open Garden • 50–100 Pax)',
    description: 'Botanical vertical gardens, acoustic live performance stage, and relaxed courtyard seating.',
    capacity: '50 – 100 Guests',
  },
  {
    id: 'buyout',
    name: 'Full Venue Exclusive Buyout (All Floors • 250+ Pax)',
    description: 'Complete multi-floor takeover with all bars, decks, stages, and dedicated kitchen brigade.',
    capacity: '250+ Guests',
  },
  {
    id: 'any',
    name: 'Open to Concierge Recommendation (Best Value & Fit)',
    description: 'Our senior events director evaluates your group size and budget to assign the perfect zone.',
    capacity: 'Flexible',
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

  const [form, setForm] = useState({
    companyName: '',
    organizerName: '',
    phone: '',
    email: '',
    eventType: 'Corporate Team Outing',
    spacePreference: 'main-hall',
    guestCount: '31-75',
    budgetTier: 'tier-2', // ₹1,600 - ₹2,400
    preferredDate: '',
    timeSlot: 'Sunset Mixer (4:00 PM – 8:00 PM)',
    specialRequests: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault()
    const selectedSpace =
      SPACE_OPTIONS.find(s => s.id === form.spacePreference)?.name || 'Main Hall & Brewery Spaces'
    const budgetLabel =
      form.budgetTier === 'tier-1'
        ? '₹1,200 – ₹1,600 / head (Craft Beers & Heavy Starters)'
        : form.budgetTier === 'tier-2'
        ? '₹1,600 – ₹2,400 / head (Unlimited Brews & Grand Buffet)'
        : '₹2,400+ / head (Premium Spirits & Bespoke Dining)'

    const text = `*CORPORATE & PARTY BOOKING INQUIRY — PEEPAI BREWERY & KITCHEN*\n\n` +
      `🏢 *Company / Group / Event:* ${form.companyName || 'Private Celebration'}\n` +
      `👤 *Organizer / SPOC:* ${form.organizerName}\n` +
      `📱 *Contact:* ${form.phone}\n` +
      `✉️ *Work Email:* ${form.email || 'N/A'}\n` +
      `🎉 *Event Type:* ${form.eventType}\n` +
      `📍 *Preferred Seating:* ${selectedSpace}\n` +
      `👥 *Estimated Guests:* ${form.guestCount} Pax\n` +
      `💰 *Budget Target:* ${budgetLabel}\n` +
      `📅 *Target Date:* ${form.preferredDate || 'Flexible / To be discussed'}\n` +
      `⏰ *Time Slot:* ${form.timeSlot}\n` +
      `${form.specialRequests ? `📝 *Requirements:* ${form.specialRequests}\n` : ''}\n` +
      `🎁 *Direct Web Privilege:* Requesting Complimentary Brewer's Craft Tasting Flight for Host & Priority Slot Hold.\n\n` +
      `*Please share available packages and corporate GST estimate.*`

    window.open(`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(text)}`, '_blank')
    setSubmitted(true)
  }

  const handleSendEmail = () => {
    const selectedSpace =
      SPACE_OPTIONS.find(s => s.id === form.spacePreference)?.name || 'Main Hall & Brewery Spaces'
    const subject = `Corporate & Party Booking RFP: ${form.companyName || form.organizerName} at Peepai Brewery`
    const body = `Hi Peepai Events Team,\n\nI am requesting a corporate / party booking proposal.\n\nEvent Parameters:\n- Company / Group: ${form.companyName}\n- Organizer / SPOC: ${form.organizerName}\n- Phone / WhatsApp: ${form.phone}\n- Event Type: ${form.eventType}\n- Preferred Setup: ${selectedSpace}\n- Guest Count: ${form.guestCount}\n- Target Date: ${form.preferredDate}\n- Time Slot: ${form.timeSlot}\n\nSpecial Requirements: ${form.specialRequests}\n\n*Direct Web Privilege: Please include the complimentary craft beer tasting flight for our host team in the quote.*\n\nKindly share package details and corporate GST invoicing breakdown.`
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
              Corporate &amp; Party Bookings • Open for 2026
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
            From high-energy tech team outings (Manyata &amp; Kirloskar Tech Parks) to milestone birthday parties, product launch sundowners, and executive dinners. Our multi-tier brewery spaces, craft kegs, and personalized concierges make planning effortless.
          </motion.p>
        </div>

        {/* ── 1. Unified Open to Corporate & Party Bookings Showcase ── */}
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
                Bengaluru's Premier Venue
              </span>
              <h3
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: 'clamp(1.75rem, 3vw, 2.4rem)',
                  color: '#F4EFE5',
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                Open to Corporate &amp; Party Bookings
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold"
                style={{
                  background: 'rgba(37,211,102,0.12)',
                  border: '1px solid rgba(37,211,102,0.3)',
                  color: '#25D366',
                }}
              >
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                Calendar Open for 2026 Outings &amp; Celebrations
              </span>
            </div>
          </div>

          {/* Unified Showcase Card */}
          <div
            className="rounded-[2px] overflow-hidden grid lg:grid-cols-12 gap-0"
            style={{
              background: 'var(--color-card)',
              border: '1px solid rgba(180,138,69,0.25)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            }}
          >
            {/* Visual Showcase (7 cols) */}
            <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[460px] overflow-hidden group">
              <img
                src="/photos/peepai-corporate-gatherings.jpg"
                alt="Peepai Brewery & Kitchen bustling main dining hall, live stage, and corporate party gathering"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: 'center 40%' }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(23,23,19,0.92) 0%, rgba(23,23,19,0.35) 50%, rgba(23,23,19,0.1) 100%)',
                }}
              />

              {/* Floating badges */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3.5 py-1.5 rounded-[2px] glass-strong border border-[rgba(180,138,69,0.35)] shadow-lg">
                <Users className="w-4 h-4 text-[#B48A45]" />
                <span className="text-xs font-bold text-[#F4EFE5] tracking-wide">
                  Accommodating 15 to 250+ Guests
                </span>
              </div>

              <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-[2px] glass-strong border border-[rgba(180,138,69,0.35)] shadow-lg">
                <Zap className="w-3.5 h-3.5 text-[#B48A45]" />
                <span className="text-[0.72rem] font-bold text-[#B48A45] tracking-wide uppercase">
                  Fast-Track Web Concierge
                </span>
              </div>

              {/* Bottom overlay specifications */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-[2px] glass-strong border border-[rgba(200,189,170,0.15)] backdrop-blur-md">
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-[0.75rem] text-[rgba(244,239,229,0.9)]">
                  <span className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B48A45]" />
                    Two-Tier Brewery &amp; Emerald Bar
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B48A45]" />
                    4K Stage AV, Projector &amp; Wireless Mics
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B48A45]" />
                    Fresh Craft Beer Kegs &amp; Tailored Buffets
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B48A45]" />
                    Valet Parking on Main Bellary Road
                  </span>
                </div>
              </div>
            </div>

            {/* Information & Why Booking on Website Beats Calling (5 cols) */}
            <div className="lg:col-span-5 p-7 sm:p-9 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[2px] bg-[rgba(180,138,69,0.1)] border border-[rgba(180,138,69,0.25)] mb-3">
                  <Gift className="w-3.5 h-3.5 text-[#B48A45]" />
                  <span className="text-[0.66rem] font-bold tracking-wider uppercase text-[#B48A45]">
                    Direct Web Booking Privileges
                  </span>
                </div>

                <h4
                  style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontSize: '1.85rem',
                    fontWeight: 600,
                    color: '#F4EFE5',
                    lineHeight: 1.2,
                    marginBottom: '0.85rem',
                  }}
                >
                  Why Booking Online Beats Calling Us Directly
                </h4>

                <p
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '0.85rem',
                    lineHeight: 1.6,
                    color: 'rgba(200,189,170,0.85)',
                    marginBottom: '1.25rem',
                  }}
                >
                  During peak hours, brewery floor music and bar chatter make phone calls loud and prone to misheard details. Submitting your parameters via our website takes under 60 seconds and unlocks exclusive host privileges:
                </p>

                {/* 4 Compelling Value Cards */}
                <div className="space-y-3 mb-6">
                  <div className="p-3 rounded-[2px] bg-[rgba(180,138,69,0.08)] border border-[rgba(180,138,69,0.2)] flex items-start gap-3">
                    <div className="w-7 h-7 rounded-[2px] bg-[rgba(180,138,69,0.15)] flex items-center justify-center text-[#B48A45] flex-shrink-0 mt-0.5">
                      <Gift className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-[#F4EFE5] mb-0.5">
                        Free Master Brewer Tasting Flight for Host
                      </h5>
                      <p className="text-[0.74rem] text-[rgba(200,189,170,0.75)] leading-snug">
                        Organizers who book via this portal receive a complimentary craft sampler &amp; brewer consultation upon arrival.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-[2px] bg-[rgba(30,28,24,0.6)] border border-[rgba(200,189,170,0.12)] flex items-start gap-3">
                    <div className="w-7 h-7 rounded-[2px] bg-[rgba(37,211,102,0.12)] flex items-center justify-center text-[#25D366] flex-shrink-0 mt-0.5">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-[#F4EFE5] mb-0.5">
                        Guaranteed WhatsApp RFP in &lt;15 Mins
                      </h5>
                      <p className="text-[0.74rem] text-[rgba(200,189,170,0.75)] leading-snug">
                        Dispatches a structured, itemized brief directly to our Senior Events Director with prioritized queue status.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-[2px] bg-[rgba(30,28,24,0.6)] border border-[rgba(200,189,170,0.12)] flex items-start gap-3">
                    <div className="w-7 h-7 rounded-[2px] bg-[rgba(180,138,69,0.15)] flex items-center justify-center text-[#B48A45] flex-shrink-0 mt-0.5">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-[#F4EFE5] mb-0.5">
                        Instant GST Invoice &amp; PO Estimate
                      </h5>
                      <p className="text-[0.74rem] text-[rgba(200,189,170,0.75)] leading-snug">
                        Ready-to-submit itemized proposal with corporate GST input credit details for seamless finance reimbursement.
                      </p>
                    </div>
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
                <span>Customize Your Event Inquiry Below</span>
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
                marginTop: '0.25rem',
              }}
            >
              Engineered for Seamless Outings &amp; Parties
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CORPORATE_PERKS.map((perk, i) => {
              const Icon = perk.icon
              return (
                <motion.div
                  key={perk.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="p-6 rounded-[2px] transition-all hover:-translate-y-1"
                  style={{
                    background: 'var(--color-card)',
                    border: '1px solid rgba(180,138,69,0.18)',
                  }}
                >
                  <div className="w-10 h-10 rounded-[2px] bg-[rgba(180,138,69,0.12)] flex items-center justify-center text-[#B48A45] mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4
                    style={{
                      fontFamily: '"Cormorant Garamond", Georgia, serif',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: '#F4EFE5',
                      marginBottom: '0.4rem',
                    }}
                  >
                    {perk.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '0.8rem',
                      lineHeight: 1.6,
                      color: 'rgba(200,189,170,0.75)',
                    }}
                  >
                    {perk.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* ── 3. High-Converting Corporate & Party Inquiry Portal ── */}
        <div id="corporate-form" className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Desk & Web Reassurance (5 cols) */}
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
              Direct Event Concierge
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
              <span style={{ color: '#B48A45', fontStyle: 'italic' }}>Within 15 Minutes</span>
            </h3>

            <p
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: '0.85rem',
                lineHeight: 1.6,
                color: 'rgba(200,189,170,0.8)',
                marginBottom: '1.75rem',
              }}
            >
              Skip the noisy phone calls and busy bar queues. Submitting through this portal routes your event brief with priority status directly to the Senior Events Director with itemized package options and corporate GST invoicing.
            </p>

            {/* Why web inquiry is superior */}
            <div className="p-4 rounded-[2px] bg-[rgba(180,138,69,0.06)] border border-[rgba(180,138,69,0.2)] mb-6">
              <span className="block text-[0.68rem] tracking-wider uppercase font-bold text-[#B48A45] mb-2">
                Why Organizers Prefer Web Inquiries
              </span>
              <ul className="space-y-2 text-xs text-[rgba(244,239,229,0.85)]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B48A45] flex-shrink-0 mt-0.5" />
                  <span><strong>100% Written Accuracy:</strong> Dates, guest counts, and dietary requirements recorded cleanly without miscommunication.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B48A45] flex-shrink-0 mt-0.5" />
                  <span><strong>Priority Queue:</strong> Web submissions are automatically flagged for fastest executive response.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B48A45] flex-shrink-0 mt-0.5" />
                  <span><strong>Host Tasting Perk:</strong> Automatically registers your complimentary brewer's craft flight.</span>
                </li>
              </ul>
            </div>

            {/* Direct contact shortcuts */}
            <div className="flex flex-col gap-3 mb-6">
              <a
                href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
                  'Hi Peepai Events Team, I want to inquire about hosting a corporate / party booking.'
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

          {/* Right Column: Structured Corporate & Party RFP Form (7 cols) */}
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
                Corporate &amp; Party Inquiry Engine
              </h4>
              <p
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: '0.8rem',
                  color: 'rgba(200,189,170,0.75)',
                  marginBottom: '1.75rem',
                }}
              >
                Configure your event parameters below. We’ll generate an instant formatted RFP directly to our events manager with your host tasting privilege applied.
              </p>

              <form onSubmit={handleSendWhatsApp} className="flex flex-col gap-4">
                {/* Company / Group & Organizer Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="companyName"
                      className="block text-[0.68rem] tracking-wider uppercase font-bold text-[#B48A45] mb-1.5"
                    >
                      <Building2 className="w-3 h-3 inline mr-1" />
                      Company / Group / Event Name *
                    </label>
                    <input
                      id="companyName"
                      name="companyName"
                      type="text"
                      required
                      value={form.companyName}
                      onChange={handleChange}
                      placeholder="e.g. Amazon, Cognizant, Target, Birthday Bash..."
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
                      Email (For Formal Quote &amp; GST PO)
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

                {/* Event Type & Atmosphere Preference */}
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
                      <option value="Birthday & Private Social Celebration">Birthday &amp; Private Social Celebration</option>
                      <option value="Product Launch & Mixer">Product Launch &amp; Mixer</option>
                      <option value="Executive Dinner & Offsite">Executive Dinner &amp; Offsite</option>
                      <option value="Full Venue Buyout">Full Venue Buyout (150–250+ Pax)</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="spacePreference"
                      className="block text-[0.68rem] tracking-wider uppercase font-bold text-[#B48A45] mb-1.5"
                    >
                      Seating &amp; Atmosphere Preference
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
                      {SPACE_OPTIONS.map(opt => (
                        <option key={opt.id} value={opt.id}>
                          {opt.name}
                        </option>
                      ))}
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

                {/* Direct Web Privilege Reassurance Banner */}
                <div className="p-3 rounded-[2px] bg-[rgba(180,138,69,0.08)] border border-[rgba(180,138,69,0.22)] flex items-center gap-2.5">
                  <Gift className="w-4 h-4 text-[#B48A45] flex-shrink-0" />
                  <span className="text-[0.74rem] text-[rgba(244,239,229,0.9)]">
                    <strong className="text-[#B48A45]">Web Booking Privilege:</strong> Organizing via our website automatically unlocks a <strong>Complimentary Craft Tasting Flight</strong> for the host team + priority &lt;15 min manager response.
                  </span>
                </div>

                {/* Submission CTA Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="btn-primary flex-1 justify-center py-3.5 text-xs font-bold"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry on WhatsApp (Instant Response)</span>
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
