import { useState, Fragment } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from './Reveal'

const EASE = [0.16, 1, 0.3, 1]

// Convierte **texto** en <strong>, dentro de un solo párrafo.
function renderBold(text) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-medium text-ink">
        {part}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  )
}

const QUESTIONS = [
  {
    q: '¿Los lotes tienen matrícula inmobiliaria independiente?',
    a: [
      'Sí. **Todos los lotes cuentan con matrícula inmobiliaria independiente y están listos para escriturar**, brindando claridad y seguridad al momento de realizar la compra.',
    ],
  },
  {
    q: '¿Cómo puedo separar un lote?',
    a: [
      'Puedes separar el lote que elijas con **$5.000.000**. Al momento de la separación se firma una **carta de intención de compra** y, 30 días después, se firma la **promesa de compraventa** y se realiza el pago de la cuota inicial.',
    ],
  },
  {
    q: '¿Qué opciones de financiación tienen?',
    a: [
      'Puedes iniciar con una **cuota inicial desde el 30% del valor total del lote**. El 70% restante puede financiarse entre **12 y 24 cuotas mensuales sin intereses**.',
      'Además, estamos abiertos a **estudiar otras modalidades de pago propuestas por cada cliente**, buscando una alternativa que se adapte a sus necesidades.',
    ],
  },
  {
    q: '¿Desde qué área están disponibles los lotes?',
    a: [
      'Ancestral cuenta con lotes desde **1.750 m² hasta 7.506 m²**, con diferentes características y ubicaciones entre río, bosque y montaña.',
    ],
  },
  {
    q: '¿Cómo funcionan los servicios de agua, energía y aguas residuales?',
    a: [
      'Cada lote se entrega con **conexión de agua proveniente de nacimientos propios y/o del sistema veredal**.',
      'Para la **energía eléctrica**, cada propietario tramita directamente ante EPM su respectivo punto de conexión.',
      'En cuanto al manejo de **aguas residuales**, cada propietario adquiere e instala el pozo séptico correspondiente, de acuerdo con el desarrollo que realice en su lote.',
    ],
  },
  {
    q: '¿Cómo son las vías de acceso al proyecto?',
    a: [
      'Las vías internas de Ancestral están desarrolladas en **afirmado y placa huella**, facilitando el acceso y recorrido por las diferentes zonas del proyecto.',
    ],
  },
  {
    q: '¿Dónde está ubicado Ancestral?',
    a: [
      'Ancestral está ubicado en **San Carlos, Antioquia, Colombia**, aproximadamente a **800 metros del Batallón y a 2 km del parque principal de San Carlos**.',
      'Desde Medellín, el recorrido por carretera es de aproximadamente **190 km y alrededor de 3 horas**, dependiendo del punto de salida, la ruta y las condiciones del tráfico.',
    ],
  },
  {
    q: '¿Puedo conocer Ancestral antes de elegir mi lote?',
    a: [
      '¡Claro! Puedes **agendar una visita y recorrer Ancestral con nosotros**. Te mostraremos las diferentes zonas del proyecto, los lotes disponibles y sus características para que puedas elegir con calma el lugar que mejor se adapte a lo que estás buscando.',
    ],
  },
]

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section id="preguntas" className="bg-cream-soft py-24">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <Reveal>
          <p className="font-display text-sm text-clay text-center">03. Preguntas</p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl leading-tight text-ink text-center">
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
                      <div className="pt-3 pr-8 space-y-3">
                        {item.a.map((paragraph, pi) => (
                          <p key={pi} className="text-justify text-ink-soft leading-relaxed">
                            {renderBold(paragraph)}
                          </p>
                        ))}
                      </div>
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
