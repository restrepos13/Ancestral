import { useState } from 'react'
import { buildMailtoLink, buildWhatsAppLink } from '../config'
import Logo from './Logo'

const COLUMNS = [
  {
    title: 'Explorar',
    links: [
      { label: 'Nosotros', href: '#nosotros' },
      { label: 'Lotes', href: '#lotes' },
      { label: 'Preguntas', href: '#preguntas' },
    ],
  },
  {
    title: 'Contacto',
    links: [
      { label: 'WhatsApp', href: '#contacto' },
      { label: 'San Carlos, Antioquia', href: '#contacto' },
    ],
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e) => {
    e.preventDefault()
    window.location.href = buildMailtoLink({
      subject: 'Quiero recibir información de Ancestral',
      body: `Mi correo es: ${email}`,
    })
  }

  return (
    <footer id="contacto" className="bg-ink text-cream">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-20">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center border-b border-cream/10 pb-16">
          <div>
            <h2 className="font-display text-3xl md:text-4xl leading-tight">
              Únete a nuestra lista de novedades.
            </h2>
            <p className="mt-3 text-cream/70 max-w-md">
              Te avisamos por correo cuando haya nuevos lotes o avances del proyecto.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu correo electrónico"
              className="w-full rounded-full bg-cream/10 border border-cream/20 px-5 py-3 text-sm text-cream placeholder:text-cream/50 outline-none transition-shadow duration-300 focus:shadow-[0_0_0_3px_rgba(247,242,231,0.15)]"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-clay px-6 py-3 text-sm text-cream transition-all duration-300 hover:bg-clay-light hover:text-ink"
            >
              Suscribirme
            </button>
          </form>
        </div>

        <div className="grid sm:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 pt-16">
          <div>
            <Logo height={44} />
            <p className="mt-4 text-sm text-cream/60 max-w-xs leading-relaxed">
              Una parcelación en San Carlos para quienes buscan tierra propia y una vida con
              más raíces y calma.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-medium text-cream/90">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-cream/60 hover:text-cream transition-colors duration-300">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="text-sm font-medium text-cream/90">Hablemos</p>
            <a
              href={buildWhatsAppLink('Hola, quiero más información sobre Ancestral.')}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center rounded-full bg-cream/10 px-4 py-2.5 text-sm text-cream transition-colors duration-300 hover:bg-cream/20"
            >
              WhatsApp →
            </a>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-cream/10 text-xs text-cream/50">
          © {new Date().getFullYear()} Ancestral. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
