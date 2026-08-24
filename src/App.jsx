import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Values from './components/Values'
import Carousel from './components/Carousel'
import Bridge from './components/Bridge'
import LotsMap from './components/LotsMap'
import Faq from './components/Faq'
import ClosingCta from './components/ClosingCta'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main>
        <Hero />
        <Values />
        <Carousel />
        <Bridge />
        <LotsMap />
        <Faq />
        <ClosingCta />
      </main>
      <Footer />
    </div>
  )
}
