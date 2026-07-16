import { useMemo } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const COLS = 12
const ROWS = 8
const SIZE = 6

interface PixelOverlayProps {
  hovered: boolean
}

export function PixelOverlay({ hovered }: PixelOverlayProps) {
  const reducedMotion = useReducedMotion()

  const pixels = useMemo(() => {
    const pxs = []
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const dist = Math.sqrt(
          (c - (COLS - 1) / 2) ** 2 + (r - (ROWS - 1) / 2) ** 2
        )
        pxs.push({
          x: `${((c + 0.5) / COLS) * 100}%`,
          y: `${((r + 0.5) / ROWS) * 100}%`,
          delay: dist * 25,
          alpha: 0.15 + ((r * 7 + c * 3) % 6) * 0.05,
        })
      }
    }
    return pxs
  }, [])

  if (reducedMotion) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {pixels.map((p, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
            width: SIZE,
            height: SIZE,
            borderRadius: 1,
            backgroundColor: 'var(--accent)',
            opacity: hovered ? p.alpha : 0,
            transform: `translate(-50%, -50%) scale(${hovered ? 1 : 0.2})`,
            transition: `opacity 0.45s cubic-bezier(0.4, 0, 0.2, 1) ${p.delay}ms, transform 0.45s cubic-bezier(0.4, 0, 0.2, 1) ${p.delay}ms`,
          }}
        />
      ))}
    </div>
  )
}
