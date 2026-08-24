import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import rioImg from '../assets/images/hero-rio.jpg'
import paisajeImg from '../assets/images/hero-paisaje.jpeg'
import Reveal from './Reveal'

const EASE = [0.16, 1, 0.3, 1]

const SLIDES = [
  {
    img: rioImg,
    position: 'center',
    title: 'VIP · Junto al río',
    text: 'El privilegio de vivir con el río como parte de tu paisaje.',
  },
  {
    img: paisajeImg,
    position: 'center 25%',
    title: 'Premio de montaña',
    text: 'Vistas que inspiran calma: un lugar que te conecta con lo esencial.',
  },
  {
    img: paisajeImg,
    position: '85% 70%',
    title: 'Bosque mágico',
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
    <section className="bg-ink py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl leading-tight text-cream sm:text-4xl md:text-5xl">
            Una tierra. <span className="text-clay-light">Tres formas de vivirla.</span>
          </h2>
          <p className="mt-5 text-cream/70 leading-relaxed">
            Ancestral es un proyecto de lotes campestres en San Carlos, Antioquia, pensado para
            quienes buscan algo más que tierra: un lugar propio entre río, bosque y montaña.
            Aquí, la naturaleza marca el ritmo, el paisaje cambia la forma de vivir y cada lote
            se convierte en el comienzo de una historia que vale la pena construir.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="relative mt-10 aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-[16/10]">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.img
              key={index}
              src={slide.img}
              alt={slide.title}
              style={{ objectPosition: slide.position }}
              initial={{ opacity: 0, x: dir * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -dir * 60 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />

          <button
            onClick={() => go(-1)}
            aria-label="Anterior"
            className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-cream/20 text-cream backdrop-blur-sm transition-colors duration-300 hover:bg-cream/35 sm:left-6"
          >
            ←
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Siguiente"
            className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-cream/20 text-cream backdrop-blur-sm transition-colors duration-300 hover:bg-cream/35 sm:right-6"
          >
            →
          </button>

          <div className="absolute inset-x-6 bottom-6 sm:inset-x-10 sm:bottom-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <p className="font-display text-2xl text-cream sm:text-3xl md:text-4xl">{slide.title}</p>
                <p className="mt-2 max-w-md text-sm text-cream/80 sm:text-base">{slide.text}</p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-5 flex gap-2">
              {SLIDES.map((s, i) => (
                <button
                  key={s.title}
                  aria-label={`Ir a ${s.title}`}
                  onClick={() => {
                    setDir(i > index ? 1 : -1)
                    setIndex(i)
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? 'w-8 bg-cream' : 'w-4 bg-cream/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
