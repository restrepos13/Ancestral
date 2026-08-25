import badgeNaturaleza from '../assets/images/badge-naturaleza.png'
import badgeInversion from '../assets/images/badge-inversion.png'
import badgeLegado from '../assets/images/badge-legado.png'
import Reveal from './Reveal'

const VALUES = [
  {
    img: badgeNaturaleza,
    title: 'Naturaleza',
    text: 'Río, montaña y aire limpio como paisaje cotidiano.',
  },
  {
    img: badgeInversion,
    title: 'Inversión',
    text: 'Lotes con coordenadas reales y escritura individual.',
  },
  {
    img: badgeLegado,
    title: 'Legado',
    text: 'Un lugar propio para construir una historia que se hereda.',
  },
]

export default function Values() {
  return (
    <section className="bg-cream py-20">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <div className="grid sm:grid-cols-3 gap-10 sm:gap-6">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.12} className="flex flex-col items-center text-center">
              <img src={v.img} alt={v.title} className="h-40 w-auto" draggable={false} />
              <p className="mt-2 text-justify text-sm text-ink-soft leading-relaxed max-w-[220px]">{v.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
