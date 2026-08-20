import { useEffect, useState } from 'react'
import { LOTS_SHEET_CSV_URL } from '../config'

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

// Lee el estado de los lotes (disponible | reservado | vendido) desde un Google Sheet
// publicado como CSV. Si LOTS_SHEET_CSV_URL no está configurada o falla la carga,
// todos los lotes se consideran "disponible" por defecto.
export default function useLotStatus() {
  const [statusByLot, setStatusByLot] = useState({})
  const [loading, setLoading] = useState(Boolean(LOTS_SHEET_CSV_URL))

  useEffect(() => {
    if (!LOTS_SHEET_CSV_URL) return

    let cancelled = false
    fetch(LOTS_SHEET_CSV_URL)
      .then((res) => res.text())
      .then((text) => {
        if (!cancelled) setStatusByLot(parseCsv(text))
      })
      .catch(() => {
        if (!cancelled) setStatusByLot({})
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { statusByLot, loading }
}
