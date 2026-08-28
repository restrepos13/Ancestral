import { buildWhatsAppLink } from '../config'
import { trackWhatsAppClick } from '../analytics'
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
      { label: 'San Carlos, Antioquia', href: 'https://share.google/RkHKoXt6XGHV0TTQP', external: true },
    ],
  },
]

export default function Footer() {
  return (
    <footer id="contacto" className="border-t border-cream/10 bg-ink text-cream">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo height={44} />
            <p className="mt-4 text-sm text-justify text-cream/60 max-w-xs leading-relaxed">
              Ancestral. Tierra para vivirla, cuidarla y hacerla parte de tu historia.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-medium text-cream/90">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="text-sm text-cream/60 hover:text-cream transition-colors duration-300"
                    >
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
              onClick={() => trackWhatsAppClick('footer')}
              className="mt-4 inline-flex items-center rounded-full bg-cream/10 px-5 py-3 text-sm text-cream transition-colors duration-300 hover:bg-cream/20"
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
