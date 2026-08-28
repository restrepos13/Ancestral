import { useEffect, useState } from 'react'
import { LOTS_SHEET_CSV_URL } from '../config'

const CACHE_KEY = 'ancestral_lot_status_cache_v1'

function parseCsv(text) {
  const rows = text.trim().split('\n').map((row) => row.split(',').map((cell) => cell.trim()))
  const [header, ...body] = rows
  const numberIdx = header.findIndex((h) => h.toLowerCase() === 'number')
  const statusIdx = header.findIndex((h) => h.toLowerCase() === 'status')
  const map = {}
  body.forEach((row) => {
    const number = row[numberIdx]
    const status = row[statusIdx]?.toLowerCase()
    if (number && status) map[number] = status
  })
  return map
}

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function writeCache(map) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(map))
  } catch {
    // Almacenamiento no disponible (modo privado, cuota llena, etc.) — no es crítico.
  }
}

// Lee el estado de los lotes (disponible | reservado | vendido) desde un Google Sheet
// publicado como CSV.
//
// Si la hoja no carga (caída, despublicada, error de red), en vez de asumir que todos
// los lotes están disponibles de la nada, se usa el último estado que sí se cargó bien
// (guardado en el navegador). Si nunca hubo una carga exitosa, se sigue mostrando todo
// como disponible (comportamiento anterior), pero `isLive` queda en `false` para que la
// interfaz pueda avisar que no es información confirmada en tiempo real.
export default function useLotStatus() {
  const [statusByLot, setStatusByLot] = useState(() => readCache() || {})
  const [loading, setLoading] = useState(Boolean(LOTS_SHEET_CSV_URL))
  const [isLive, setIsLive] = useState(false)

  useEffect(() => {
    if (!LOTS_SHEET_CSV_URL) return

    let cancelled = false
    fetch(LOTS_SHEET_CSV_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Respuesta no válida del Google Sheet')
        return res.text()
      })
      .then((text) => {
        const map = parseCsv(text)
        if (Object.keys(map).length === 0) throw new Error('Hoja vacía o con formato inesperado')
        if (cancelled) return
        setStatusByLot(map)
        setIsLive(true)
        writeCache(map)
      })
      .catch(() => {
        // Se conserva lo que ya había (caché local o, si nunca hubo caché, el estado
        // vacío inicial = todos "disponible"). Solo se marca que no es dato en vivo.
        if (!cancelled) setIsLive(false)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { statusByLot, loading, isLive }
}
