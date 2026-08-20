// Reemplaza con el número real de WhatsApp del proyecto (formato: código país + número, sin +, sin espacios).
export const WHATSAPP_NUMBER = '573000000000'

export function buildWhatsAppLink(message) {
  const text = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
}

// Correo al que llegan las solicitudes del formulario de contacto (vía mailto:).
export const CONTACT_EMAIL = 'contacto@ancestral.com'

export function buildMailtoLink({ subject, body }) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

// URL del CSV publicado del Google Sheet que controla el estado de los lotes.
// En Google Sheets: Archivo > Compartir > Publicar en la Web > elegir la hoja > formato CSV > copiar el enlace.
// La hoja debe tener columnas: number, status (valores: disponible | reservado | vendido)
export const LOTS_SHEET_CSV_URL = ''
