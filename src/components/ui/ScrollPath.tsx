import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useSpring, useMotionValue } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useScrollProgress } from '../../hooks/useScrollProgress'

interface ScrollPathProps {
  sectionIds: string[]
}

export function ScrollPath({ sectionIds }: ScrollPathProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const [svgSize, setSvgSize] = useState({ width: 24, height: 0 })
  const progress = useScrollProgress()
  const reducedMotion = useReducedMotion()
  const progressVal = useMotionValue(progress)
  useEffect(() => { progressVal.set(progress) }, [progress, progressVal])
  const smoothProgress = useSpring(progressVal, { stiffness: 100, damping: 24 })
  const [dotPos, setDotPos] = useState({ x: 0, y: 0 })
  const [waypoints, setWaypoints] = useState<{ x: number; y: number }[]>([])
  const lineX = 12
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  // Opacity driven by scroll activity
  const idleOpacityVal = useMotionValue(0.12)
  const scrollOpacity = useSpring(idleOpacityVal, { stiffness: 80, damping: 16 })
  const [opac, setOpac] = useState(0.12)

  useEffect(() => {
    const onScroll = () => {
      idleOpacityVal.set(1)
      clearTimeout(scrollTimer.current)
      scrollTimer.current = setTimeout(() => {
        idleOpacityVal.set(0.12)
      }, 600)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(scrollTimer.current)
    }
  }, [idleOpacityVal])

  useEffect(() => {
    const unsub = scrollOpacity.on('change', setOpac)
    return unsub
  }, [scrollOpacity])

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
        return { x: lineX, y }
      })
    }
    const update = () => setWaypoints(calculate())
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

  const updateDot = useCallback(() => {
    if (!pathRef.current) return
    const length = pathRef.current.getTotalLength()
    if (length === 0) return
    const clamped = Math.max(0, Math.min(1, smoothProgress.get()))
    const point = pathRef.current.getPointAtLength(clamped * length)
    setDotPos({ x: point.x, y: point.y })
  }, [smoothProgress])

  useEffect(() => {
    const unsub = smoothProgress.on('change', updateDot)
    return unsub
  }, [smoothProgress, updateDot])

  useEffect(() => {
    updateDot()
  }, [pathD, updateDot])

  if (reducedMotion) return null

  const o = opac

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
            <stop offset={Math.max(0, smoothProgress.get() - 0.02)} stopColor="var(--border)" stopOpacity={0.35 * o} />
            <stop offset={Math.max(0, smoothProgress.get() - 0.01)} stopColor="var(--accent)" stopOpacity={0.25 * o} />
            <stop offset={smoothProgress.get()} stopColor="var(--accent)" stopOpacity={0.65 * o} />
            <stop offset={Math.min(1, smoothProgress.get() + 0.08)} stopColor="var(--accent)" stopOpacity={0.2 * o} />
            <stop offset={Math.min(1, smoothProgress.get() + 0.25)} stopColor="var(--border)" stopOpacity={0.25 * o} />
          </linearGradient>
        </defs>

        <path ref={pathRef} d={pathD} fill="none" stroke="url(#pathGrad)" strokeWidth="2" strokeLinecap="round" />

        {waypoints.map((wp, i) => (
          <circle key={i} cx={wp.x} cy={wp.y} r="3" fill="var(--border)" opacity={0.5 * o} />
        ))}

        <circle cx={dotPos.x} cy={dotPos.y} r="32" fill="var(--accent)" opacity={0.08 * Math.min(1, o * 2)} filter="url(#pathGlow)" />
        <circle cx={dotPos.x} cy={dotPos.y} r="10" fill="var(--accent)" opacity={0.7 * o} />
        <circle cx={dotPos.x} cy={dotPos.y} r="4" fill="#fff" opacity={0.9 * o} />
      </svg>
    </div>
  )
}
