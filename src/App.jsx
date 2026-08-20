import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Values from './components/Values'
import About from './components/About'
import Listings from './components/Listings'
import LotsMap from './components/LotsMap'
import Faq from './components/Faq'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main>
        <Hero />
        <Values />
        <About />
        <Listings />
        <LotsMap />
        <Faq />
      </main>
      <Footer />
    </div>
  )
}
