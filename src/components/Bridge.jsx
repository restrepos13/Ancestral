import puenteImg from '../assets/images/puente-rio.jpg'
import Reveal from './Reveal'
import { buildWhatsAppLink } from '../config'

const STATS = [
  {
    title: 'Matrícula independiente',
    text: 'Cada lote tiene su propia matrícula inmobiliaria y escritura.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6 2h9l5 5v15H6z" />
        <path d="M15 2v5h5M9 13h6M9 17h6" />
      </svg>
    ),
  },
  {
    title: 'Vías internas',
    text: 'Vías de acceso construidas y trazadas dentro del proyecto.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M8 3 C4 9 4 15 8 21 M16 3c4 6 4 12 0 18" strokeLinecap="round" />
        <path d="M12 3v2.2M12 8.4v2.2M12 13.6v2.2M12 18.8V21" />
      </svg>
    ),
  },
  {
    title: 'Lotes desde 1.750 m²',
    text: 'Amplios espacios pensados por debajo o encima de lo esencial.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    title: 'A 2 km del parque principal',
    text: 'A solo 800 m del Batallón y un corto trayecto del centro de San Carlos.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="10" r="3" />
        <path d="M12 21s7-6.5 7-11a7 7 0 1 0-14 0c0 4.5 7 11 7 11Z" />
      </svg>
    ),
  },
]

export default function Bridge() {
  return (
    <section id="nosotros" className="bg-ink">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24 md:px-10">
        <div className="grid gap-8 md:grid-cols-2 md:items-stretch md:gap-0">
          <Reveal className="overflow-hidden rounded-3xl md:rounded-r-none">
            <img
              src={puenteImg}
              alt="Puente sobre el río cerca de Ancestral, San Carlos"
              className="h-64 w-full object-cover sm:h-80 md:h-full"
            />
          </Reveal>

          <Reveal
            delay={0.1}
            className="flex flex-col justify-center rounded-3xl bg-moss p-8 text-cream md:rounded-l-none md:p-12"
          >
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">
              Pasar el puente es dejar atrás el ruido.
            </h2>
            <p className="mt-5 text-cream/80 leading-relaxed">
              Ancestral está en San Carlos, Oriente Antioqueño: un municipio de clima cálido,
              cascadas y ríos, a unas 3 horas de Medellín. Cada lote está trazado con el
              levantamiento topográfico oficial del predio, con coordenadas verificables.
            </p>
            <a
              href={buildWhatsAppLink('Hola, quiero cotizar un lote en Ancestral.')}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex w-fit items-center rounded-full bg-cream px-6 py-3 text-sm text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-cream/90"
            >
              Cotizar lote →
            </a>
          </Reveal>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.title} delay={0.15 + i * 0.08} className="rounded-2xl bg-cream/[0.06] p-5 sm:p-6">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cream/10 text-clay-light">
                {s.icon}
              </div>
              <p className="mt-4 text-sm font-medium text-cream sm:text-base">{s.title}</p>
              <p className="mt-1.5 text-xs text-cream/60 leading-relaxed sm:text-sm">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
