import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import config from './config/restaurant.ts'

// Apply theme tokens from config to :root
const root_el = document.documentElement
root_el.style.setProperty('--color-bg', config.theme.bg)
root_el.style.setProperty('--color-ink', config.theme.ink)
root_el.style.setProperty('--color-accent', config.theme.accent)
root_el.style.setProperty('--color-accent2', config.theme.accent2)
root_el.style.setProperty('--color-card', config.theme.card)
root_el.style.setProperty('--color-muted', config.theme.muted)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
