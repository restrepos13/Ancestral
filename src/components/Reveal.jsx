import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

export default function Reveal({
  as = 'div',
  delay = 0,
  y = 28,
  className = '',
  children,
  ...rest
}) {
  const MotionTag = motion[as] ?? motion.div

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
