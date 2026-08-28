import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import rioImg from '../assets/images/vip-rio.jpg'
import montanaImg from '../assets/images/premio-montana.jpg'
import bosqueImg from '../assets/images/bosque-magico.jpg'
import Reveal from './Reveal'

const EASE = [0.16, 1, 0.3, 1]

const SLIDES = [
  {
    img: rioImg,
    position: 'center',
    titleWhite: 'VIP · ',
    titleGold: 'Junto al río',
    text: 'El privilegio de tener el río como parte de tu paisaje.',
  },
  {
    img: montanaImg,
    position: 'center',
    titleWhite: 'Premio de',
    titleGold: 'Montaña',
    twoLine: true,
    text: 'Vistas que inspiran. Un entorno elevado que te conecta con lo esencial.',
  },
  {
    img: bosqueImg,
    position: 'center',
    titleWhite: 'Bosque ',
    titleGold: 'Mágico',
    text: 'Privacidad, frescura y naturaleza en su máxima expresión.',
  },
]

export default function Carousel() {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)

  const go = (delta) => {
    setDir(delta)
    setIndex((i) => (i + delta + SLIDES.length) % SLIDES.length)
  }

  const slide = SLIDES[index]

  return (
    <section className="bg-ink">
      <Reveal className="px-6 py-7 text-center sm:py-8">
        <h2 className="font-display text-2xl uppercase leading-tight text-cream sm:text-3xl md:text-4xl">
          Una tierra. <span style={{ color: '#b39a50' }}>Tres formas de vivirla</span>
        </h2>
      </Reveal>

      <Reveal delay={0.1} className="relative aspect-[3/4] w-full overflow-hidden sm:aspect-[16/9]">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.img
            key={index}
            src={slide.img}
            alt={`${slide.titleWhite}${slide.titleGold}`}
            style={{ objectPosition: slide.position }}
            initial={{ opacity: 0, x: dir * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -dir * 60 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

        <button
          onClick={() => go(-1)}
          aria-label="Anterior"
          className="absolute left-4 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border-2 border-clay-light/70 text-cream transition-colors duration-300 hover:bg-cream/10 sm:left-8 sm:h-20 sm:w-20"
        >
          ←
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Siguiente"
          className="absolute right-4 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border-2 border-clay-light/70 text-cream transition-colors duration-300 hover:bg-cream/10 sm:right-8 sm:h-20 sm:w-20"
        >
          →
        </button>

        <div className="absolute inset-x-6 bottom-8 sm:inset-x-16 sm:bottom-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <p className="font-display text-4xl uppercase leading-tight text-cream sm:text-5xl md:text-6xl">
                {slide.titleWhite}
                {slide.twoLine && <br />}
                <span style={{ color: '#ebc158' }}>{slide.titleGold}</span>
              </p>
              <span className="mt-3 block h-px w-28 bg-clay-light/70" />
              <p className="mt-4 max-w-md text-justify text-base text-cream/85 sm:text-lg">{slide.text}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  )
}
