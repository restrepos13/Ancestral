import logoImg from '../assets/images/logo-ancestral.png'

export default function Logo({ className = '', height = 40 }) {
  return (
    <img
      src={logoImg}
      alt="Ancestral"
      className={className}
      style={{ height, width: 'auto' }}
      draggable={false}
    />
  )
}
