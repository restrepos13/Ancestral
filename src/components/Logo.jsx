import { motion } from 'framer-motion'
import logoImg from '../assets/images/logo-ancestral.png'

export default function Logo({ className = '', height = 40 }) {
  return (
    <motion.img
      src={logoImg}
      alt="Ancestral"
      className={className}
      animate={{ height }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ width: 'auto' }}
      draggable={false}
    />
  )
}
