// Configuración de pixeles de publicidad y analítica.
//
// Deja el valor en '' hasta que tengas el ID real; mientras esté vacío no se
// carga ningún script (nada de qué preocuparse si aún no los tienes).
//
// GA4_ID:         Google Analytics > Administrador > Flujos de datos > Web > ID de medición (G-XXXXXXX)
// META_PIXEL_ID:  Meta Business Manager > Administrador de eventos > Orígenes de datos > tu píxel
// TIKTOK_PIXEL_ID: TikTok Ads Manager > Herramientas > Eventos > Web Events > tu píxel
//
// OJO: GA4 (G-7M162QZYPX), Google Tag Manager (GTM-N8SNF5L5) y el pixel de Meta
// (1778327993188254) ya estan instalados directamente en index.html, para que
// carguen antes que React y los verificadores de Google y Meta los detecten.
// Por eso estos valores se dejan vacios a proposito: si los rellenas, los
// scripts se cargarian dos veces y cada visita se contaria doble.
export const GA4_ID = ''
export const META_PIXEL_ID = ''
export const TIKTOK_PIXEL_ID = ''

function injectScript(src, attrs = {}) {
  const script = document.createElement('script')
  script.src = src
  script.async = true
  Object.entries(attrs).forEach(([k, v]) => script.setAttribute(k, v))
  document.head.appendChild(script)
  return script
}

function initGA4() {
  if (!GA4_ID) return
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA4_ID)
  injectScript(`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`)
}

function initMetaPixel() {
  if (!META_PIXEL_ID) return
  /* eslint-disable */
  ;(function (f, b, e, v, n, t, s) {
    if (f.fbq) return
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    }
    if (!f._fbq) f._fbq = n
    n.push = n
    n.loaded = true
    n.version = '2.0'
    n.queue = []
    t = b.createElement(e)
    t.async = true
    t.src = v
    s = b.getElementsByTagName(e)[0]
    s.parentNode.insertBefore(t, s)
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
  /* eslint-enable */
  window.fbq('init', META_PIXEL_ID)
  window.fbq('track', 'PageView')
}

function initTikTokPixel() {
  if (!TIKTOK_PIXEL_ID) return
  /* eslint-disable */
  ;(function (w, d, t) {
    w.TiktokAnalyticsObject = t
    var ttq = (w[t] = w[t] || [])
    ttq.methods = [
      'page', 'track', 'identify', 'instances', 'debug', 'on', 'off', 'once',
      'ready', 'alias', 'group', 'enableCookie', 'disableCookie',
    ]
    ttq.setAndDefer = function (t, e) {
      t[e] = function () {
        t.push([e].concat(Array.prototype.slice.call(arguments, 0)))
      }
    }
    for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i])
    ttq.load = function (e, n) {
      var i = 'https://analytics.tiktok.com/i18n/pixel/events.js'
      ttq._i = ttq._i || {}
      ttq._i[e] = []
      ttq._i[e]._u = i
      ttq._t = ttq._t || {}
      ttq._t[e] = +new Date()
      ttq._o = ttq._o || {}
      ttq._o[e] = n || {}
      var script = d.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script.src = i + '?sdkid=' + e + '&lib=' + t
      var firstScript = d.getElementsByTagName('script')[0]
      firstScript.parentNode.insertBefore(script, firstScript)
    }
    ttq.load(TIKTOK_PIXEL_ID)
    ttq.page()
  })(window, document, 'ttq')
  /* eslint-enable */
}

export function initAnalytics() {
  initGA4()
  initMetaPixel()
  initTikTokPixel()
}

// Dispara un evento de "lead" cuando alguien hace clic en un botón de WhatsApp.
// `source` identifica desde qué sección del sitio se hizo clic (hero, mapa de
// lotes, cta de cierre, footer, etc.) para poder comparar cuál convierte más.
export function trackWhatsAppClick(source) {
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', { method: 'whatsapp', content_name: source })
    }
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Lead', { content_name: source })
    }
    if (typeof window.ttq !== 'undefined' && window.ttq.track) {
      window.ttq.track('Contact', { content_name: source })
    }
  } catch {
    // Si algún script de pixel falla o no cargó, nunca debe romper el clic real.
  }
}
