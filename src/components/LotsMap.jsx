import { useState } from 'react'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import planoRealImg from '../assets/images/plano-real.jpg'
import plano66Img from '../assets/images/plano-66.jpg'
import montanaImg from '../assets/images/premio-montana.jpg'
import bosqueImg from '../assets/images/bosque-magico.jpg'
import rioImg from '../assets/images/hero-rio.jpg'
import vipSinRioImg from '../assets/images/vip-sin-rio.jpg'
import lotsData29 from '../data/lotes-plano.json'
import lotsData66 from '../data/lotes-66-plano.json'
import useLotStatus from '../hooks/useLotStatus'
import { buildWhatsAppLink } from '../config'
import Reveal from './Reveal'
import Logo from './Logo'

const EASE = [0.16, 1, 0.3, 1]
const ZOOM = 1.8

const LOT_CATEGORIES = [
  { match: 'VIP Sin Río', img: vipSinRioImg, alt: 'Lote plano cercano al acceso en Ancestral, San Carlos', caption: 'VIP Sin Río' },
  { match: 'VIP Río', img: rioImg, alt: 'Río San Carlos cerca de Ancestral', caption: 'VIP Río' },
  { match: 'Bosque Mágico', img: bosqueImg, alt: 'Bosque en Ancestral, San Carlos', caption: 'Bosque Mágico' },
  { match: 'Premio de Montaña', img: montanaImg, alt: 'Vista de montaña en San Carlos, cerca de Ancestral', caption: 'Premio de Montaña' },
]
const DEFAULT_CATEGORY = { img: montanaImg, alt: 'Vista de montaña en San Carlos, cerca de Ancestral', caption: 'Premio de Montaña' }

function getLotCategory(lot, status) {
  if (status !== 'disponible' || !lot?.desc) return DEFAULT_CATEGORY
  return LOT_CATEGORIES.find((c) => lot.desc.startsWith(c.match)) || DEFAULT_CATEGORY
}

const STATUS_STYLES = {
  disponible: { fill: 'rgba(75,90,60,0.38)', hover: 'rgba(75,90,60,0.62)', label: 'Disponible', dot: 'bg-moss' },
  reservado: { fill: 'rgba(191,111,69,0.45)', hover: 'rgba(191,111,69,0.68)', label: 'Reservado', dot: 'bg-clay' },
  vendido: { fill: 'transparent', hover: 'transparent', label: 'Vendido', dot: 'bg-ink-soft' },
}

const VIEWS = {
  // Oculto por ahora (no borrado): reactivar quitando `hidden: true` cuando se necesite mostrar de nuevo.
  29: {
    hidden: true,
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
    label: 'Plano general de lotes',
    img: plano66Img,
    data: lotsData66,
    alt: 'Plano general de Ancestral con sus lotes delimitados',
    scaleLabel: 'Delimitación según plano',
    intro:
      'Plano general de la primera etapa. Toca un lote para ver su detalle; las áreas seleccionables siguen los linderos dibujados en el plano.',
    note: 'La delimitación visual fue ajustada contra el plano de coordenadas disponible en los archivos del proyecto.',
  },
}

const VISIBLE_VIEWS = Object.entries(VIEWS).filter(([, v]) => !v.hidden)

export default function LotsMap() {
  const { statusByLot } = useLotStatus()
  const [view, setView] = useState(66)
  const [selected, setSelected] = useState(null)
  const [hovered, setHovered] = useState(null)
  const [origin, setOrigin] = useState('50% 50%')
  const zoomControls = useAnimation()

  const current = VIEWS[view]
  const lots = current.data.lots
  const getStatus = (number) => statusByLot[String(number)] || 'disponible'
  const selectedLot = lots.find((l) => l.number === selected)
  const selectedStatus = selectedLot ? getStatus(selectedLot.number) : null
  const category = getLotCategory(selectedLot, selectedStatus)

  const changeView = (v) => {
    setView(v)
    setSelected(null)
    setHovered(null)
    zoomControls.set({ scale: 1 })
  }

  const selectLot = async (number) => {
    const lot = lots.find((l) => l.number === number)
    if (!lot) return
    if (selected !== null) {
      await zoomControls.start({ scale: 1, transition: { duration: 0.35, ease: EASE } })
    }
    const [cx, cy] = lot.label
    setOrigin(`${(cx / current.data.width) * 100}% ${(cy / current.data.height) * 100}%`)
    setSelected(number)
    await zoomControls.start({ scale: ZOOM, transition: { duration: 0.65, ease: EASE } })
  }

  const viewBlockedLot = (number) => {
    setSelected(number)
  }

  const resetZoom = async () => {
    if (selected === null) return
    await zoomControls.start({ scale: 1, transition: { duration: 0.45, ease: EASE } })
    setSelected(null)
  }

  return (
    <section id="lotes" className="bg-moss-dark py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex items-start justify-between gap-8">
          <Reveal className="max-w-xl">
            <h2 className="font-display text-4xl uppercase leading-tight text-cream sm:text-5xl">
              Encuentra <span style={{ color: '#ebc158' }}>tu lugar</span>
            </h2>
            <p className="mt-6 text-justify text-cream/70 leading-relaxed">{current.intro}</p>
          </Reveal>
          <Reveal delay={0.1} className="hidden shrink-0 md:block">
            <Logo height={64} />
          </Reveal>
        </div>

        {VISIBLE_VIEWS.length > 1 && (
          <div className="mt-8 inline-flex rounded-full bg-cream/10 p-1 shadow-sm">
            {VISIBLE_VIEWS.map(([key, v]) => (
              <button
                key={key}
                onClick={() => changeView(Number(key))}
                className={`rounded-full px-4 py-2 text-xs tracking-wide transition-colors duration-300 ${
                  view === Number(key) ? 'bg-moss text-cream' : 'text-cream/70'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        )}

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
                <motion.div
                  className="absolute inset-0"
                  style={{ transformOrigin: origin }}
                  initial={{ scale: 1 }}
                  animate={zoomControls}
                  onClick={(e) => {
                    if (e.target.tagName !== 'polygon') resetZoom()
                  }}
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
                      const isSelected = selected === lot.number && !isBlocked
                      const isActive = hovered === lot.number || isSelected

                      return (
                        <polygon
                          key={lot.number}
                          points={lot.points.map((p) => p.join(',')).join(' ')}
                          fill={isBlocked ? 'transparent' : isActive ? style.hover : 'transparent'}
                          stroke={isSelected ? 'rgba(191,111,69,0.75)' : isBlocked ? 'rgba(44,42,34,0.5)' : 'none'}
                          strokeWidth={isSelected ? 1.2 : isBlocked ? 1.5 : 0}
                          strokeDasharray={isBlocked ? '5 4' : undefined}
                          vectorEffect="non-scaling-stroke"
                          className="cursor-pointer transition-colors duration-300 ease-out"
                          onMouseEnter={() => !isBlocked && setHovered(lot.number)}
                          onMouseLeave={() => setHovered(null)}
                          onClick={() => (isBlocked ? viewBlockedLot(lot.number) : selectLot(lot.number))}
                        />
                      )
                    })}
                  </svg>
                </motion.div>

                <AnimatePresence>
                  {selected !== null && (
                    <motion.button
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      onClick={resetZoom}
                      className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-ink/70 px-3 py-1.5 text-xs text-cream backdrop-blur-sm transition-colors duration-300 hover:bg-ink/85"
                    >
                      Ver plano completo ✕
                    </motion.button>
                  )}
                </AnimatePresence>
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

          <div className="flex flex-col gap-6 lg:sticky lg:top-28">
          <Reveal delay={0.2} className="rounded-3xl bg-white p-6 shadow-lg min-h-[260px] flex flex-col justify-center">
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
                  {selectedStatus === 'vendido' ? (
                    <p className="mt-2 text-ink-soft">Lote no disponible.</p>
                  ) : (
                    <>
                      {selectedLot.area != null ? (
                        <p className="mt-2 text-ink-soft">
                          Área: {selectedLot.area.toLocaleString('es-CO')} m²
                        </p>
                      ) : (
                        <p className="mt-2 text-ink-soft/70">Área: pendiente de levantamiento oficial.</p>
                      )}
                      {selectedLot.desc && (
                        <p className="mt-1.5 text-sm text-ink-soft/80 leading-snug">{selectedLot.desc}</p>
                      )}
                      <a
                        href={buildWhatsAppLink(`Hola, me interesa el lote ${selectedLot.number} de Ancestral.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center rounded-full bg-moss px-6 py-3 text-sm text-cream transition-all duration-300 hover:bg-moss-dark hover:-translate-y-0.5 hover:shadow-lg"
                      >
                        Consultar por WhatsApp →
                      </a>
                    </>
                  )}
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

          <Reveal delay={0.3} className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lg">
            <AnimatePresence mode="wait">
              <motion.img
                key={category.img}
                src={category.img}
                alt={category.alt}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
            <p className="absolute bottom-5 left-5 font-display text-xl text-cream leading-tight uppercase">
              {category.caption}
            </p>
          </Reveal>
          </div>
        </div>

        <Reveal delay={0.35} className="mt-12 flex justify-center">
          <a
            href={buildWhatsAppLink('Hola, quiero cotizar un lote en Ancestral.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-clay-light px-8 py-4 text-sm uppercase tracking-wide text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-clay hover:text-cream"
          >
            Cotizar lote →
          </a>
        </Reveal>
      </div>
    </section>
  )
}
