// Función serverless (Vercel) que recibe nombre, correo y celular de un formulario
// y los envía por correo electrónico. Todavía NO está conectada a ningún formulario
// del sitio — cuando se agregue el formulario, debe hacer un POST a /api/lead con
// { name, email, phone }.
//
// Variables de entorno necesarias (Vercel > Settings > Environment Variables):
//   RESEND_API_KEY  → API key de https://resend.com (tiene plan gratis, 100 correos/día)
//   LEAD_EMAIL_TO   → el correo donde deben llegar los datos del formulario
//   LEAD_EMAIL_FROM → (opcional) remitente verificado en Resend. Si no se define,
//                      usa "onboarding@resend.dev" — ese remitente de prueba SOLO
//                      entrega a la casilla con la que se creó la cuenta de Resend.
//                      Para recibir en cualquier correo hay que verificar un dominio
//                      propio en Resend (ej. notificaciones@lotesancestral.com) y
//                      poner ese valor aquí.

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Método no permitido' })
  }

  const { name, email, phone } = req.body || {}

  if (!name?.trim() || !email?.trim() || !phone?.trim()) {
    return res.status(400).json({ error: 'Nombre, correo y celular son obligatorios' })
  }
  if (!EMAIL_REGEX.test(email.trim())) {
    return res.status(400).json({ error: 'Correo inválido' })
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY
  const LEAD_EMAIL_TO = process.env.LEAD_EMAIL_TO
  const LEAD_EMAIL_FROM = process.env.LEAD_EMAIL_FROM || 'onboarding@resend.dev'

  if (!RESEND_API_KEY || !LEAD_EMAIL_TO) {
    console.error('Faltan RESEND_API_KEY y/o LEAD_EMAIL_TO en las variables de entorno')
    return res.status(500).json({ error: 'El formulario no está configurado todavía' })
  }

  try {
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Ancestral <${LEAD_EMAIL_FROM}>`,
        to: [LEAD_EMAIL_TO],
        reply_to: email.trim(),
        subject: `Nuevo contacto desde el sitio · ${name.trim()}`,
        html: `
          <p><strong>Nombre:</strong> ${escapeHtml(name.trim())}</p>
          <p><strong>Correo:</strong> ${escapeHtml(email.trim())}</p>
          <p><strong>Celular:</strong> ${escapeHtml(phone.trim())}</p>
        `,
      }),
    })

    if (!emailRes.ok) {
      const detail = await emailRes.text()
      console.error('Resend respondió con error:', emailRes.status, detail)
      return res.status(502).json({ error: 'No se pudo enviar el correo' })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Error enviando el lead:', err)
    return res.status(500).json({ error: 'No se pudo enviar el correo' })
  }
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
