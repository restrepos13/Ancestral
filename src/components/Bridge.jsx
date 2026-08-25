import puenteImg from '../assets/images/puente-rio.jpg'
import Reveal from './Reveal'

const STATS = [
  {
    title: 'Matrícula independiente',
    text: 'Cada lote cuenta con matrícula inmobiliaria independiente y está listo para escriturar.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6 2h9l5 5v15H6z" />
        <path d="M15 2v5h5M9 13h6M9 17h6" />
      </svg>
    ),
  },
  {
    title: 'Vías internas',
    text: 'Vías de acceso desarrolladas en placa huella y afirmado para recorrer el proyecto.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M8 3 C4 9 4 15 8 21 M16 3c4 6 4 12 0 18" strokeLinecap="round" />
        <path d="M12 3v2.2M12 8.4v2.2M12 13.6v2.2M12 18.8V21" />
      </svg>
    ),
  },
  {
    title: 'Lotes desde 1.750 m²',
    text: 'Áreas amplias con opciones junto al río, entre el bosque y con vista a la montaña.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2 L12 22 M12 2 C6 6 4 10 4 14 C4 18 8 20 12 20 C16 20 20 18 20 14 C20 10 18 6 12 2Z" />
      </svg>
    ),
  },
  {
    title: 'A solo 2 km del parque principal',
    text: 'Naturaleza y tranquilidad a pocos minutos del corazón de San Carlos.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="10" r="3" />
        <path d="M12 21s7-6.5 7-11a7 7 0 1 0-14 0c0 4.5 7 11 7 11Z" />
      </svg>
    ),
  },
]

export default function Bridge() {
  return (
    <section id="nosotros">
      <div className="grid md:grid-cols-2">
        <Reveal className="order-2 h-64 sm:h-96 md:order-1 md:h-full">
          <img
            src={puenteImg}
            alt="Puente sobre el río cerca de Ancestral, San Carlos"
            className="h-full w-full object-cover"
          />
        </Reveal>

        <Reveal delay={0.1} className="order-1 flex flex-col justify-center bg-ink px-6 py-14 text-cream sm:px-10 md:order-2 md:px-14 lg:px-16">
          <h2 className="font-display text-3xl uppercase leading-tight sm:text-4xl">
            Pasar el puente es
            <br />
            dejar atrás el <span className="text-[1.15em]" style={{ color: '#ebc158' }}>ruido</span>
          </h2>
          <p className="mt-6 max-w-lg text-justify text-cream/80 leading-relaxed">
            Ancestral es un proyecto de lotes campestres en San Carlos, Antioquia, pensado
            para quienes buscan algo más que tierra: un lugar propio entre río, bosque y
            montaña.
          </p>
          <p className="mt-4 max-w-lg text-justify text-cream/80 leading-relaxed">
            Aquí, la naturaleza marca el ritmo, el paisaje cambia la forma de vivir y cada
            lote se convierte en el comienzo de una historia que vale la pena construir.
          </p>
        </Reveal>
      </div>

      <div className="bg-cream-soft py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08} className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream-soft text-moss-dark">
                  {s.icon}
                </div>
                <p className="mt-4 text-sm font-medium text-ink sm:text-base">{s.title}</p>
                <p className="mt-1.5 text-justify text-xs text-ink-soft leading-relaxed sm:text-sm">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
