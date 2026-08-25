import Reveal from './Reveal'
import { buildWhatsAppLink } from '../config'

export default function ClosingCta() {
  return (
    <section className="bg-ink py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal className="grid gap-8 md:grid-cols-[1.3fr_auto] md:items-center">
          <div>
            <h2 className="font-display text-3xl uppercase leading-tight text-cream sm:text-4xl">
              Hay lugares que hay que vivir para entenderlos.
            </h2>
            <p className="mt-4 max-w-md text-justify text-cream/70 leading-relaxed">
              Ven a conocer Ancestral y descubre tu lugar entre el río, el bosque y la montaña.
            </p>
          </div>
          <a
            href={buildWhatsAppLink('Hola, quiero agendar una visita a Ancestral.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-clay-light px-8 py-5 text-sm uppercase tracking-wide text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-clay hover:text-cream md:justify-self-end"
          >
            Agendar visita →
          </a>
        </Reveal>
      </div>
    </section>
  )
}
