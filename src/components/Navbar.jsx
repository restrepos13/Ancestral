import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Logo from './Logo'

const LINKS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#lotes', label: 'Lotes' },
  { href: '#preguntas', label: 'Preguntas' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-ink/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-6xl px-6 md:px-10 h-20 flex items-center justify-between">
        <a href="#inicio">
          <Logo height={38} />
        </a>

        <div className="hidden md:flex items-center gap-9">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-cream/80 hover:text-cream transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#contacto"
          className="hidden md:inline-flex items-center rounded-full bg-clay px-5 py-2.5 text-sm text-cream transition-all duration-300 hover:bg-clay-light hover:text-ink hover:-translate-y-0.5"
        >
          Contáctanos
        </a>

        <button
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span className={`h-0.5 w-6 bg-cream transition-transform duration-300 ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-6 bg-cream transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-6 bg-cream transition-transform duration-300 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </nav>

      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="md:hidden overflow-hidden bg-ink/95 backdrop-blur-md"
      >
        <div className="flex flex-col gap-1 px-6 pb-6">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2.5 text-cream/80 hover:text-cream transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-clay px-5 py-2.5 text-sm text-cream"
          >
            Contáctanos
          </a>
        </div>
      </motion.div>
    </motion.header>
  )
}
