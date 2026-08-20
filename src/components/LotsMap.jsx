import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import planoRealImg from '../assets/images/plano-real.jpg'
import plano66Img from '../assets/images/plano-66.jpg'
import lotsData29 from '../data/lotes-plano.json'
import lotsData66 from '../data/lotes-66-plano.json'
import useLotStatus from '../hooks/useLotStatus'
import { buildWhatsAppLink } from '../config'
import Reveal from './Reveal'

const EASE = [0.16, 1, 0.3, 1]

const STATUS_STYLES = {
  disponible: { fill: 'rgba(75,90,60,0.38)', hover: 'rgba(75,90,60,0.62)', label: 'Disponible', dot: 'bg-moss' },
  reservado: { fill: 'rgba(191,111,69,0.45)', hover: 'rgba(191,111,69,0.68)', label: 'Reservado', dot: 'bg-clay' },
  vendido: { fill: 'rgba(45,44,40,0.6)', hover: 'rgba(45,44,40,0.6)', label: 'Vendido', dot: 'bg-ink-soft' },
}

const VIEWS = {
  29: {
    label: '29 lotes certificados',
    img: planoRealImg,
    data: lotsData29,
    alt: 'Plano topográfico oficial de Ancestral con los 29 lotes',
    scaleLabel: 'Escala 1:1.200',
    intro:
      'Este es el plano oficial del levantamiento topográfico de Ancestral. Toca un lote para ver su detalle; los vendidos quedan bloqueados automáticamente.',
    note: 'Coordenadas reales, sistema MAGNA Colombia Bogotá · San Carlos, Antioquia.',
  },
  66: {
    label: 'Etapa 2 · plano general',
    img: plano66Img,
    data: lotsData66,
    alt: 'Plano general de la segunda etapa de Ancestral con sus lotes delimitados',
    scaleLabel: 'Delimitación según plano',
    intro:
      'Plano general de la segunda etapa. Toca un lote para ver su detalle; las áreas seleccionables siguen los linderos dibujados en el plano.',
    note: 'La delimitación visual fue ajustada contra el plano de coordenadas disponible en los archivos del proyecto.',
  },
}

export default function LotsMap() {
  const { statusByLot } = useLotStatus()
  const [view, setView] = useState(29)
  const [selected, setSelected] = useState(null)
  const [hovered, setHovered] = useState(null)

  const current = VIEWS[view]
  const lots = current.data.lots
  const getStatus = (number) => statusByLot[String(number)] || 'disponible'
  const selectedLot = lots.find((l) => l.number === selected)
  const selectedStatus = selectedLot ? getStatus(selectedLot.number) : null

  const changeView = (v) => {
    setView(v)
    setSelected(null)
    setHovered(null)
  }

  return (
    <section id="lotes" className="bg-sage py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs tracking-widest uppercase text-moss-dark">
            Plano de lotes
          </span>
          <h2 className="mt-6 font-display text-4xl md:text-5xl leading-tight text-ink">
            Encuentra tu lugar en el plano.
          </h2>
          <p className="mt-6 text-ink-soft leading-relaxed">{current.intro}</p>
          <p className="mt-3 text-xs text-ink-soft/70 max-w-lg">{current.note}</p>
        </Reveal>

        <div className="mt-8 inline-flex rounded-full bg-white p-1 shadow-sm">
          {Object.entries(VIEWS).map(([key, v]) => (
            <button
              key={key}
              onClick={() => changeView(Number(key))}
              className={`rounded-full px-4 py-2 text-xs tracking-wide transition-colors duration-300 ${
                view === Number(key) ? 'bg-moss text-cream' : 'text-ink-soft'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid lg:grid-cols-[1.7fr_1fr] gap-8 items-start">
          <Reveal delay={0.1} className="rounded-3xl bg-white p-6 shadow-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="relative w-full rounded-2xl overflow-hidden"
                style={{ aspectRatio: `${current.data.width} / ${current.data.height}` }}
              >
                <img
                  src={current.img}
                  alt={current.alt}
                  className="absolute inset-0 h-full w-full object-cover"
                  draggable={false}
                />
                <svg
                  viewBox={`0 0 ${current.data.width} ${current.data.height}`}
                  className="absolute inset-0 h-full w-full"
                >
                  {lots.map((lot) => {
                    const status = getStatus(lot.number)
                    const style = STATUS_STYLES[status]
                    const isBlocked = status === 'vendido'
                    const isActive = hovered === lot.number || selected === lot.number

                    return (
                      <polygon
                        key={lot.number}
                        points={lot.points.map((p) => p.join(',')).join(' ')}
                        fill={isActive || isBlocked ? style.hover : 'transparent'}
                        className={
                          isBlocked
                            ? 'cursor-not-allowed'
                            : 'cursor-pointer transition-colors duration-300 ease-out'
                        }
                        onMouseEnter={() => !isBlocked && setHovered(lot.number)}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() => !isBlocked && setSelected(lot.number)}
                      />
                    )
                  })}
                </svg>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-5">
              <div className="flex flex-wrap gap-5">
                {Object.entries(STATUS_STYLES).map(([key, style]) => (
                  <div key={key} className="flex items-center gap-2 text-xs text-ink-soft">
                    <span className={`h-2.5 w-2.5 rounded-full ${style.dot}`} />
                    {style.label}
                  </div>
                ))}
              </div>
              <p className="text-xs text-ink-soft/60">{current.scaleLabel}</p>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="rounded-3xl bg-white p-6 shadow-lg min-h-[260px] flex flex-col justify-center lg:sticky lg:top-28">
            <AnimatePresence mode="wait">
              {selectedLot ? (
                <motion.div
                  key={`${view}-${selectedLot.number}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs ${
                      selectedStatus === 'reservado' ? 'bg-clay-light/40 text-clay' : 'bg-cream-soft text-moss-dark'
                    }`}
                  >
                    {STATUS_STYLES[selectedStatus].label}
                  </span>
                  <h3 className="mt-4 font-display text-2xl text-ink">Lote {selectedLot.number}</h3>
                  {selectedLot.area != null ? (
                    <p className="mt-2 text-ink-soft">
                      Área aproximada: {selectedLot.area.toLocaleString('es-CO')} m²
                      {view === 66 && !selectedLot.certified && (
                        <span className="text-ink-soft/60"> (referencial)</span>
                      )}
                    </p>
                  ) : (
                    <p className="mt-2 text-ink-soft/70">Área: pendiente de levantamiento oficial.</p>
                  )}
                  <a
                    href={buildWhatsAppLink(`Hola, me interesa el lote ${selectedLot.number} de Ancestral.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center rounded-full bg-moss px-6 py-3 text-sm text-cream transition-all duration-300 hover:bg-moss-dark hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    Consultar por WhatsApp →
                  </a>
                </motion.div>
              ) : (
                <motion.p
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-ink-soft"
                >
                  Selecciona un lote en el plano para ver su detalle.
                </motion.p>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
