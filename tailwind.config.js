/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:      'var(--color-bg)',
        'bg-warm': 'var(--color-bg-warm)',
        ink:     'var(--color-ink)',
        accent:  'var(--color-accent)',
        accent2: 'var(--color-accent2)',
        card:    'var(--color-card)',
        muted:   'var(--color-muted)',
        olive:   'var(--color-olive)',
        charcoal: {
          DEFAULT: '#171713',
          warm:    '#211F1A',
        },
        brass: {
          DEFAULT: '#B48A45',
          light:   '#D4A85A',
          dark:    '#8A6830',
        },
        amber: {
          DEFAULT: '#C8793C',
          light:   '#E0925A',
        },
        ivory: {
          DEFAULT: '#F4EFE5',
          dim:     '#C8BDAA',
        },
        stone:   '#C8BDAA',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', '"Manrope"', 'system-ui', 'sans-serif'],
        serif:   ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body:    ['Manrope', 'system-ui', 'sans-serif'],
        sans:    ['Manrope', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up':  'fade-up 0.75s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in':  'fade-in 0.6s ease both',
        'badge-pulse': 'badge-pulse 2.5s ease-in-out infinite',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to:   { opacity: '1', transform: 'none' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'badge-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(180,138,69,0.35)' },
          '50%':      { boxShadow: '0 0 0 8px rgba(180,138,69,0)' },
        },
      },
    },
  },
  plugins: [],
}
