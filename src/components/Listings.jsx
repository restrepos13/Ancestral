import heroImg from '../assets/images/hero-paisaje.jpeg'
import lotsData from '../data/lotes-plano.json'
import useLotStatus from '../hooks/useLotStatus'
import { buildWhatsAppLink } from '../config'
import Reveal from './Reveal'

const FEATURED_NUMBERS = [14, 26, 1, 20]

const BENEFITS = [
  {
    title: 'Escritura individual',
    text: 'Cada lote queda legalmente independiente, con su propia escritura.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6 2h9l5 5v15H6z" />
        <path d="M15 2v5h5M9 13h6M9 17h6" />
      </svg>
    ),
  },
  {
    title: 'Coordenadas certificadas',
    text: 'Plano trazado con levantamiento topográfico oficial, no un boceto.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="10" r="3" />
        <path d="M12 21s7-6.5 7-11a7 7 0 1 0-14 0c0 4.5 7 11 7 11Z" />
      </svg>
    ),
  },
  {
    title: 'Clima todo el año',
    text: 'Entre 23 y 25 °C, sin extremos, en el Oriente Antioqueño.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
      </svg>
    ),
  },
  {
    title: 'Ecoturismo real',
    text: 'Cascadas, río Samaná Norte y senderos, a minutos de tu lote.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2 L12 22 M12 2 C6 6 4 10 4 14 C4 18 8 20 12 20 C16 20 20 18 20 14 C20 10 18 6 12 2Z" />
      </svg>
    ),
  },
]

const STATUS_LABEL = {
  disponible: 'Disponible',
  reservado: 'Reservado',
  vendido: 'Vendido',
}

export default function Listings() {
  const { statusByLot } = useLotStatus()
  const getStatus = (number) => statusByLot[String(number)] || 'disponible'
  const featured = FEATURED_NUMBERS.map((n) => lotsData.lots.find((l) => l.number === n)).filter(Boolean)
  const [big, ...rest] = featured

  return (
    <section id="lotes-destacados" className="bg-cream py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p className="font-display text-sm text-clay">02. Lotes</p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl leading-tight text-ink">
              Algunos lotes disponibles.
            </h2>
          </div>
          <a href="#lotes" className="text-sm text-moss-dark underline underline-offset-4 hover:text-ink transition-colors">
            Ver el plano completo →
          </a>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {big && (
            <Reveal className="relative overflow-hidden rounded-2xl aspect-[4/3] md:aspect-auto md:row-span-1">
              <img src={heroImg} alt={`Lote ${big.number}`} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <span className="absolute top-4 left-4 rounded-full bg-cream/90 px-3 py-1 text-[11px] text-moss-dark">
                {STATUS_LABEL[getStatus(big.number)]}
              </span>
              <div className="absolute bottom-0 p-5">
                <p className="text-cream font-display text-xl">Lote {big.number}</p>
                <p className="text-cream/75 text-sm mt-1">{big.area.toLocaleString('es-CO')} m² · San Carlos</p>
              </div>
            </Reveal>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-5">
            {rest.map((lot, i) => (
              <Reveal
                key={lot.number}
                delay={i * 0.08}
                className="flex items-center gap-4 rounded-2xl bg-cream-soft p-4"
              >
                <div className="h-16 w-16 shrink-0 rounded-xl bg-moss-light/40 flex items-center justify-center text-moss-dark font-display text-lg">
                  {lot.number}
                </div>
                <div>
                  <p className="text-ink font-medium">Lote {lot.number}</p>
                  <p className="text-xs text-ink-soft">{lot.area.toLocaleString('es-CO')} m²</p>
                  <span className="mt-1 inline-block text-[11px] text-moss-dark">
                    {STATUS_LABEL[getStatus(lot.number)]}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-14 max-w-3xl mx-auto text-center">
          <p className="text-ink-soft leading-relaxed">
            Comprar tierra en <span className="text-ink">San Carlos</span> es invertir en un
            municipio con <span className="text-ink">riqueza hídrica</span> real, clima estable
            y <span className="text-ink">acceso certificado</span> a cada lote. Sin promesas de
            zonas comunes que no se van a construir: solo tierra, papeles en regla y un entorno
            que ya existe.
          </p>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.08} className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream-soft text-moss-dark">
                {b.icon}
              </div>
              <p className="mt-4 text-ink font-medium">{b.title}</p>
              <p className="mt-1.5 text-sm text-ink-soft leading-relaxed">{b.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
