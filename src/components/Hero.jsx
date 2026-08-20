import { motion } from 'framer-motion'
import heroImg from '../assets/images/hero-rio.jpg'

const EASE = [0.16, 1, 0.3, 1]

const BAR_STATS = [
  { label: 'Ubicación', value: 'San Carlos, Antioquia' },
  { label: 'Lotes', value: '64' },
  { label: 'Área desde', value: '1.750 m²' },
]

export default function Hero() {
  return (
    <section id="inicio" className="relative h-[92vh] min-h-[640px] overflow-hidden">
      <img src={heroImg} alt="Río en la selva de San Carlos, cerca de Ancestral" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/35 to-ink/70" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-6 md:px-10">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="max-w-xl font-display text-5xl md:text-6xl leading-[1.1] text-cream"
        >
          Tu próximo gran paso comienza aquí.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          className="mt-6 max-w-md text-cream/80 leading-relaxed"
        >
          Entre el río y la montaña, un lugar para volver a lo esencial, vivir sin prisa y llamar hogar a la naturaleza..
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
          className="mt-8"
        >
          <a
            href="#lotes"
            className="inline-flex items-center rounded-full bg-clay px-7 py-3.5 text-sm text-cream transition-all duration-300 hover:bg-clay-light hover:text-ink hover:-translate-y-0.5"
          >
            Ver lotes disponibles →
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
        className="absolute inset-x-6 bottom-8 z-10 mx-auto max-w-3xl rounded-2xl bg-cream/60 px-6 py-5 shadow-xl backdrop-blur-md md:inset-x-0"
      >
        <div className="flex flex-col items-stretch gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-5 sm:flex-row sm:gap-10">
            {BAR_STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-[11px] uppercase tracking-widest text-ink-soft">{stat.label}</p>
                <p className="mt-1 font-display text-lg text-ink">{stat.value}</p>
              </div>
            ))}
          </div>
          <a
            href="#lotes"
            className="inline-flex items-center justify-center rounded-full bg-moss px-6 py-3 text-sm text-cream transition-all duration-300 hover:bg-moss-dark"
          >
            Ver plano →
          </a>
        </div>
      </motion.div>
    </section>
  )
}
