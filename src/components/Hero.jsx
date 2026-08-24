import { motion } from 'framer-motion'
import heroImg from '../assets/images/hero-rio.jpg'

const EASE = [0.16, 1, 0.3, 1]

const BAR_STATS = [
  { label: 'Ubicación', value: 'San Carlos, Antioquia', sub: 'Colombia' },
  { label: 'Lotes', value: '64' },
  { label: 'Área desde', value: '1.750 m²' },
]

export default function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-svh flex-col overflow-hidden pb-28 sm:pb-8">
      <img src={heroImg} alt="Río en la selva de San Carlos, cerca de Ancestral" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/35 to-ink/70" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pt-28 md:px-10">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="max-w-xl font-display text-4xl leading-[1.1] text-cream sm:text-5xl md:text-6xl"
        >
          Tu próximo gran paso comienza aquí.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          className="mt-5 max-w-md text-sm text-cream/80 leading-relaxed sm:mt-6 sm:text-base"
        >
          Entre el río y la montaña, un lugar para volver a lo esencial, vivir sin prisa y llamar hogar a la naturaleza.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
          className="mt-7 sm:mt-8"
        >
          <a
            href="#lotes"
            className="inline-flex items-center rounded-full bg-clay px-6 py-3 text-sm text-cream transition-all duration-300 hover:bg-clay-light hover:text-ink hover:-translate-y-0.5 sm:px-7 sm:py-3.5"
          >
            Ver lotes disponibles →
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
        className="relative z-10 mx-4 -mt-6 rounded-2xl bg-cream/70 px-5 py-5 shadow-xl backdrop-blur-md sm:absolute sm:inset-x-6 sm:bottom-8 sm:mx-auto sm:mt-0 sm:max-w-3xl sm:px-6 md:inset-x-0"
      >
        <div className="flex flex-col items-stretch gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="grid grid-cols-3 gap-3 sm:flex sm:gap-10">
            {BAR_STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-[10px] uppercase tracking-widest text-ink-soft sm:text-[11px]">{stat.label}</p>
                <p className="mt-1 font-display text-base text-ink sm:text-lg">{stat.value}</p>
                {stat.sub && <p className="text-[11px] text-ink-soft/80">{stat.sub}</p>}
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
