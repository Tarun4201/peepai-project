import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Music,
  Trees,
  Beer,
  Phone,
  Users,
  Clock,
  Send,
  Calendar,
  Sparkles,
} from 'lucide-react'
import type { RestaurantConfig } from '../../config/restaurant'

interface ReserveProps {
  config: RestaurantConfig
}

export function Reserve({ config }: ReserveProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [form, setForm] = useState({
    name: '',
    guests: '2',
    date: '',
    time: '19:00',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault()
    const dateStr = form.date
      ? new Date(form.date).toLocaleDateString('en-IN', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
        })
      : form.date
    const text = `Table Reservation Request — Peepai Brewery & Kitchen\n\nName: ${form.name}\nParty Size: ${form.guests} Guest(s)\nDate: ${dateStr}\nTime: ${form.time}\n${form.message ? `Special Request: ${form.message}\n` : ''}\nPlease let me know if a table is available. Thank you!`
    window.open(`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(text)}`, '_blank')
  }

  const today = new Date().toISOString().split('T')[0]

  const timeSlots = [
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
  ]

  return (
    <section
      id="reserve"
      ref={ref}
      className="section-py relative overflow-hidden"
      style={{ background: 'var(--color-bg-warm)' }}
    >
      <div className="container-xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Info Column (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <p className="section-label">Table Reservations</p>
            <h2
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
                fontWeight: 600,
                lineHeight: 1.12,
                color: '#F4EFE5',
                marginBottom: '1.25rem',
              }}
            >
              Reserve Your Table <br />
              <span style={{ color: '#B48A45', fontStyle: 'italic' }}>at Peepai Hebbal</span>
            </h2>
            <p
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: '0.9rem',
                lineHeight: 1.65,
                color: 'rgba(200,189,170,0.78)',
                marginBottom: '2rem',
              }}
            >
              Whether celebrating milestones, planning an intimate date, or organizing an evening
              with friends, reserve your spot for a seamless dining and craft beer experience.
            </p>

            {/* Quick highlights */}
            <div className="flex flex-col gap-3.5 mb-8">
              {[
                { icon: Beer, text: 'Seasonal Craft Beers brewed on tap' },
                { icon: Trees, text: 'Open-air Sky Terrace & ambient indoor seating' },
                { icon: Music, text: 'Live acoustic sets on select evenings' },
                { icon: Sparkles, text: 'Dedicated valet parking available' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-[2px] flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'rgba(180,138,69,0.12)',
                      border: '1px solid rgba(180,138,69,0.25)',
                      color: '#B48A45',
                    }}
                  >
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '0.82rem',
                      color: 'rgba(244,239,229,0.85)',
                    }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Call Direct */}
            <div
              className="p-5 rounded-[2px] flex items-center justify-between"
              style={{
                background: 'var(--color-card)',
                border: '1px solid rgba(180,138,69,0.2)',
              }}
            >
              <div>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '0.65rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#B48A45',
                    fontWeight: 700,
                  }}
                >
                  Direct Telephone Booking
                </span>
                <span
                  style={{
                    fontFamily: '"Bricolage Grotesque", Manrope, sans-serif',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: '#F4EFE5',
                  }}
                >
                  {config.phone}
                </span>
              </div>
              <a
                href={`tel:${config.phone}`}
                className="btn-outline text-xs py-2 px-4"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>
            </div>
          </motion.div>

          {/* Right Form Column (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div
              className="p-8 sm:p-10 rounded-[2px]"
              style={{
                background: 'var(--color-card)',
                border: '1px solid rgba(200,189,170,0.12)',
              }}
            >
              <h3
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: '1.75rem',
                  fontWeight: 600,
                  color: '#F4EFE5',
                  marginBottom: '0.5rem',
                }}
              >
                Table Booking Details
              </h3>
              <p
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: '0.8rem',
                  color: 'rgba(200,189,170,0.7)',
                  marginBottom: '1.75rem',
                }}
              >
                Fill in your details below and we will prefill a WhatsApp message to our reservations desk for instant confirmation.
              </p>

              <form onSubmit={handleWhatsApp} className="flex flex-col gap-4">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    style={{
                      display: 'block',
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '0.68rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#B48A45',
                      fontWeight: 700,
                      marginBottom: '0.4rem',
                    }}
                  >
                    Your Full Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Sharma"
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      background: 'rgba(23,23,19,0.6)',
                      border: '1px solid rgba(200,189,170,0.18)',
                      borderRadius: '2px',
                      color: '#F4EFE5',
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                    onFocus={e => (e.target.style.borderColor = '#B48A45')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(200,189,170,0.18)')}
                  />
                </div>

                {/* Guests & Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="guests"
                      style={{
                        display: 'block',
                        fontFamily: 'Manrope, sans-serif',
                        fontSize: '0.68rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#B48A45',
                        fontWeight: 700,
                        marginBottom: '0.4rem',
                      }}
                    >
                      <Users className="w-3 h-3 inline mr-1" />
                      Number of Guests
                    </label>
                    <select
                      id="guests"
                      name="guests"
                      value={form.guests}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        background: '#171713',
                        border: '1px solid rgba(200,189,170,0.18)',
                        borderRadius: '2px',
                        color: '#F4EFE5',
                        fontFamily: 'Manrope, sans-serif',
                        fontSize: '0.85rem',
                        outline: 'none',
                      }}
                      onFocus={e => (e.target.style.borderColor = '#B48A45')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(200,189,170,0.18)')}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, '10+'].map(num => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="date"
                      style={{
                        display: 'block',
                        fontFamily: 'Manrope, sans-serif',
                        fontSize: '0.68rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#B48A45',
                        fontWeight: 700,
                        marginBottom: '0.4rem',
                      }}
                    >
                      <Calendar className="w-3 h-3 inline mr-1" />
                      Date *
                    </label>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      required
                      min={today}
                      value={form.date}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        background: 'rgba(23,23,19,0.6)',
                        border: '1px solid rgba(200,189,170,0.18)',
                        borderRadius: '2px',
                        color: '#F4EFE5',
                        fontFamily: 'Manrope, sans-serif',
                        fontSize: '0.85rem',
                        outline: 'none',
                      }}
                      onFocus={e => (e.target.style.borderColor = '#B48A45')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(200,189,170,0.18)')}
                    />
                  </div>
                </div>

                {/* Time Slot */}
                <div>
                  <label
                    htmlFor="time"
                    style={{
                      display: 'block',
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '0.68rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#B48A45',
                      fontWeight: 700,
                      marginBottom: '0.4rem',
                    }}
                  >
                    <Clock className="w-3 h-3 inline mr-1" />
                    Preferred Time
                  </label>
                  <select
                    id="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      background: '#171713',
                      border: '1px solid rgba(200,189,170,0.18)',
                      borderRadius: '2px',
                      color: '#F4EFE5',
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                    onFocus={e => (e.target.style.borderColor = '#B48A45')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(200,189,170,0.18)')}
                  >
                    {timeSlots.map(t => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Special Request */}
                <div>
                  <label
                    htmlFor="message"
                    style={{
                      display: 'block',
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '0.68rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#B48A45',
                      fontWeight: 700,
                      marginBottom: '0.4rem',
                    }}
                  >
                    Special Requests (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="e.g. Outdoor terrace seating, birthday celebration, quiet corner..."
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      background: 'rgba(23,23,19,0.6)',
                      border: '1px solid rgba(200,189,170,0.18)',
                      borderRadius: '2px',
                      color: '#F4EFE5',
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '0.85rem',
                      outline: 'none',
                      resize: 'none',
                    }}
                    onFocus={e => (e.target.style.borderColor = '#B48A45')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(200,189,170,0.18)')}
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="btn-primary w-full justify-center py-3.5 mt-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Reserve via WhatsApp</span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
