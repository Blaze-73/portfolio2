import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface ScrollPathProps {
  sectionIds: string[]
}

const LINE_X = 12

function getProgress(): number {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  return docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0
}

export function ScrollPath({ sectionIds }: ScrollPathProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const dotRef = useRef<SVGCircleElement>(null)
  const glowRef = useRef<SVGCircleElement>(null)
  const dotInnerRef = useRef<SVGCircleElement>(null)
  const gradientRef = useRef<SVGLinearGradientElement>(null)
  const [svgSize, setSvgSize] = useState({ width: 24, height: 0 })
  const [waypoints, setWaypoints] = useState<{ x: number; y: number }[]>([])
  const reducedMotion = useReducedMotion()
  const smoothPct = useRef(getProgress())
  const rafId = useRef<number>(0)

  const updateDot = useCallback(() => {
    const path = pathRef.current
    const dot = dotRef.current
    const glow = glowRef.current
    const dotInner = dotInnerRef.current
    const grad = gradientRef.current
    if (!path || !dot || !glow || !dotInner || !grad) return

    const length = path.getTotalLength()
    if (length === 0) return

    const clamped = Math.max(0, Math.min(1, smoothPct.current))
    const point = path.getPointAtLength(clamped * length)

    dot.setAttribute('cy', String(point.y))
    glow.setAttribute('cy', String(point.y))
    dotInner.setAttribute('cy', String(point.y))

    const opacity = 0.12 + clamped * 0.6
    dot.setAttribute('opacity', String(0.7 * opacity))
    glow.setAttribute('opacity', String(0.08 * Math.min(1, opacity * 2)))

    grad.setAttribute('y1', String(clamped * svgSize.height))
  }, [svgSize.height])

  useEffect(() => {
    if (reducedMotion) return

    const onScroll = () => {
      cancelAnimationFrame(rafId.current)
      rafId.current = requestAnimationFrame(() => {
        smoothPct.current += (getProgress() - smoothPct.current) * 0.15
        updateDot()
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId.current)
    }
  }, [reducedMotion, updateDot])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const updateSize = () => {
      const rect = container.getBoundingClientRect()
      setSvgSize({ width: rect.width || 24, height: rect.height || window.innerHeight })
    }
    updateSize()
    const observer = new ResizeObserver(updateSize)
    observer.observe(container)
    window.addEventListener('resize', updateSize)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateSize)
    }
  }, [])

  useEffect(() => {
    const calculate = () => {
      if (sectionIds.length === 0 || svgSize.height === 0) return []
      const margin = 60
      const scrollHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
      return sectionIds.map((id) => {
        const el = document.getElementById(id)
        const raw = el ? el.offsetTop : 0
        const y = margin + ((raw / scrollHeight) * (svgSize.height - margin * 2))
        return { x: LINE_X, y }
      })
    }
    const update = () => {
      setWaypoints(calculate())
      smoothPct.current = getProgress()
    }
    update()
    const observers: ResizeObserver[] = []
    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (!el) continue
      const obs = new ResizeObserver(update)
      obs.observe(el)
      observers.push(obs)
    }
    window.addEventListener('resize', update)
    return () => {
      for (const obs of observers) obs.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [sectionIds, svgSize])

  const pathD = useMemo(() => {
    if (waypoints.length < 2) return ''
    return `M ${waypoints[0].x} ${waypoints[0].y} L ${waypoints[waypoints.length - 1].x} ${waypoints[waypoints.length - 1].y}`
  }, [waypoints])

  if (reducedMotion) return null

  return (
    <div
      ref={containerRef}
      className="fixed left-2 top-0 z-50 h-screen w-6 overflow-visible pointer-events-none max-lg:hidden"
      aria-hidden="true"
    >
      <svg
        className="h-full w-full overflow-visible"
        viewBox={`0 0 ${svgSize.width} ${svgSize.height}`}
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="pathGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="18" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="pathGrad" x1="0" y1="0" x2="0" y2={svgSize.height}>
            <stop offset="0" stopColor="var(--border)" stopOpacity="0.1" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        <path ref={pathRef} d={pathD} fill="none" stroke="url(#pathGrad)" strokeWidth="2" strokeLinecap="round" />

        {waypoints.map((wp, i) => (
          <circle key={i} cx={wp.x} cy={wp.y} r="3" fill="var(--border)" opacity="0.35" />
        ))}

        <circle ref={glowRef} cx={LINE_X} cy={0} r="32" fill="var(--accent)" opacity="0" filter="url(#pathGlow)" />
        <circle ref={dotRef} cx={LINE_X} cy={0} r="10" fill="var(--accent)" opacity="0" />
        <circle ref={dotInnerRef} cx={LINE_X} cy={0} r="4" fill="#fff" opacity="0" />
      </svg>
    </div>
  )
}
