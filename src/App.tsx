import config from './config/restaurant'
import { Navbar } from './components/ui/Navbar'
import { Hero } from './components/sections/Hero'
import { Welcome } from './components/sections/Welcome'
import { Vibe } from './components/sections/Vibe'
import { CorporateEvents } from './components/sections/CorporateEvents'
import { FoodShowcase } from './components/sections/FoodShowcase'
import { Menu } from './components/sections/Menu'
import { Gallery } from './components/sections/Gallery'
import { Reserve } from './components/sections/Reserve'
import { Visit } from './components/sections/Visit'
import { Footer } from './components/sections/Footer'

export default function App() {
  return (
    <>
      <Navbar config={config} />
      <main>
        <Hero config={config} />
        <Welcome config={config} />
        <Vibe />
        <CorporateEvents config={config} />
        <FoodShowcase />
        <Menu config={config} />
        {config.photos.length > 0 && <Gallery config={config} />}
        <Reserve config={config} />
        <Visit config={config} />
      </main>
      <Footer config={config} />
    </>
  )
}
