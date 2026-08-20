import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from './Reveal'

const EASE = [0.16, 1, 0.3, 1]

const QUESTIONS = [
  {
    q: '¿Cómo reservo un lote?',
    a: 'Escríbenos por WhatsApp, agendamos una visita a San Carlos y, si decides seguir adelante, formalizamos la reserva directamente con nuestro equipo.',
  },
  {
    q: '¿Cada lote tiene escritura individual?',
    a: 'Sí. Los 29 lotes están trazados sobre el levantamiento topográfico oficial del predio, con coordenadas reales y verificables.',
  },
  {
    q: '¿El proyecto tiene zonas comunes?',
    a: 'Por ahora no hay zonas comunes construidas; lo que compras es tierra propia, con acceso directo a tu lote.',
  },
  {
    q: '¿Qué tan lejos está San Carlos de Medellín?',
    a: 'Aproximadamente 108 km, unas 2 a 2.5 horas en carro dependiendo de la vía y el tráfico.',
  },
  {
    q: '¿Cómo se maneja la forma de pago?',
    a: 'Las opciones de pago se conversan directamente con nuestro equipo según el lote que te interese. Escríbenos y te contamos los detalles.',
  },
]

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section id="preguntas" className="bg-cream-soft py-24">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <Reveal>
          <p className="font-display text-sm text-clay text-center">03. Preguntas</p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl leading-tight text-ink text-center">
            Preguntas frecuentes.
          </h2>
        </Reveal>

        <div className="mt-12 divide-y divide-ink/10">
          {QUESTIONS.map((item, i) => {
            const isOpen = open === i
            return (
              <Reveal key={item.q} delay={i * 0.05} className="py-5">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 text-left"
                >
                  <span className="font-display text-lg text-ink">{item.q}</span>
                  <span
                    className={`shrink-0 text-xl text-moss-dark transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="pt-3 text-ink-soft leading-relaxed pr-8">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
