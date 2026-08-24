import Reveal from './Reveal'
import { buildWhatsAppLink } from '../config'

export default function ClosingCta() {
  return (
    <section className="bg-sage py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
        <Reveal>
          <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl md:text-5xl">
            Hay lugares que hay que vivir para entenderlos.
          </h2>
          <p className="mt-5 text-ink-soft leading-relaxed">
            Ven a conocer Ancestral y descubre tu lugar entre el río, el bosque y la montaña.
          </p>
          <a
            href={buildWhatsAppLink('Hola, quiero agendar una visita a Ancestral.')}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center rounded-full bg-clay px-7 py-3.5 text-sm text-cream transition-all duration-300 hover:bg-clay-light hover:text-ink hover:-translate-y-0.5"
          >
            Agendar visita →
          </a>
        </Reveal>
      </div>
    </section>
  )
}
