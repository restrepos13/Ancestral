import Reveal from './Reveal'
import { buildWhatsAppLink } from '../config'

const STATS = [
  { value: '29', label: 'Lotes reales' },
  { value: '108 km', label: 'Desde Medellín' },
]

export default function About() {
  return (
    <section id="nosotros" className="bg-ink py-24 text-cream">
      <div className="mx-auto max-w-6xl px-6 md:px-10 grid md:grid-cols-2 gap-16 items-center">
        <Reveal>
          <p className="font-display text-sm text-clay-light">01. Nosotros</p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl leading-tight">
            Un proyecto con coordenadas reales, no promesas en el aire.
          </h2>

          <div className="mt-8 flex gap-10">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex h-24 w-24 flex-col items-center justify-center rounded-full border border-cream/25 text-center"
              >
                <p className="font-display text-xl">{stat.value}</p>
                <p className="text-[10px] leading-tight text-cream/60 px-2">{stat.label}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-md text-cream/70 leading-relaxed">
            Ancestral está en San Carlos, Oriente Antioqueño: un municipio de clima cálido,
            cascadas y ríos, a poco más de dos horas de Medellín. Cada lote está trazado con
            el levantamiento topográfico oficial del predio, con coordenadas verificables.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="relative">
          <svg viewBox="0 0 400 260" className="w-full text-cream/20">
            <path d="M10 220 C 80 180, 120 200, 180 160 S 300 120, 390 90" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <path d="M0 190 C 90 160, 130 175, 190 135 S 310 95, 400 65" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <path d="M0 160 C 100 135, 140 150, 200 110 S 320 70, 400 45" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <path d="M20 130 C 110 108, 150 122, 210 85 S 330 48, 395 25" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="215" cy="112" r="5" fill="var(--color-clay)" />
            <circle cx="215" cy="112" r="10" fill="none" stroke="var(--color-clay)" strokeWidth="1.5" opacity="0.6" />
          </svg>
          <span className="absolute left-[47%] top-[30%] -translate-x-1/2 -translate-y-full text-xs whitespace-nowrap text-cream">
            San Carlos, Antioquia
          </span>

          <div className="mt-6 flex flex-col items-start gap-3 rounded-2xl bg-moss p-6">
            <p className="font-display text-lg">Habla con nosotros</p>
            <p className="text-xs text-cream/70">Resolvemos tus dudas por WhatsApp.</p>
            <a
              href={buildWhatsAppLink('Hola, quiero más información sobre Ancestral.')}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex w-fit items-center rounded-full bg-cream px-4 py-2 text-xs text-ink transition-transform duration-300 hover:-translate-y-0.5"
            >
              Escribir →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
