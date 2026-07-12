import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { motion, useSpring } from 'framer-motion'
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
  const smoothProgress = useSpring(progress, { stiffness: 80, damping: 22 })
  const [dotPos, setDotPos] = useState({ x: 12, y: 0 })

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

  const waypoints = useMemo(() => {
    if (sectionIds.length === 0 || svgSize.height === 0) return []

    const margin = 60

    return sectionIds.map((id, i) => {
      const el = document.getElementById(id)
      const raw = el ? el.offsetTop : 0
      const scrollHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
      const y = margin + ((raw / scrollHeight) * (svgSize.height - margin * 2))
      const x = i % 2 === 0 ? svgSize.width * 0.25 : svgSize.width * 0.75
      return { x, y }
    })
  }, [sectionIds, svgSize])

  const pathD = useMemo(() => {
    if (waypoints.length < 2) return ''

    let d = `M ${waypoints[0].x} ${waypoints[0].y}`
    for (let i = 1; i < waypoints.length; i++) {
      const prev = waypoints[i - 1]
      const curr = waypoints[i]
      const midY = (prev.y + curr.y) / 2
      const tension = 0.4
      const cp1x = prev.x + (curr.x - prev.x) * tension
      const cp2x = curr.x - (curr.x - prev.x) * tension
      d += ` C ${cp1x} ${midY}, ${cp2x} ${midY}, ${curr.x} ${curr.y}`
    }
    return d
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
    const unsubscribe = smoothProgress.on('change', updateDot)
    return unsubscribe
  }, [smoothProgress, updateDot])

  if (reducedMotion) return null

  return (
    <div
      ref={containerRef}
      className="fixed left-6 top-0 z-50 hidden h-screen w-6 lg:block"
      aria-hidden="true"
    >
      <svg
        className="h-full w-full overflow-visible"
        viewBox={`0 0 ${svgSize.width} ${svgSize.height}`}
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-subtle" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="pathGrad" x1="0" y1="0" x2="0" y2={svgSize.height}>
            <stop offset={Math.max(0, smoothProgress.get() - 0.02)} stopColor="var(--border)" stopOpacity="0.5" />
            <stop offset={Math.max(0, smoothProgress.get() - 0.01)} stopColor="var(--accent)" stopOpacity="0.3" />
            <stop offset={smoothProgress.get()} stopColor="var(--accent)" stopOpacity="0.6" />
            <stop offset={Math.min(1, smoothProgress.get() + 0.1)} stopColor="var(--accent)" stopOpacity="0.15" />
            <stop offset={Math.min(1, smoothProgress.get() + 0.3)} stopColor="var(--border)" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        <path
          d={pathD}
          fill="none"
          stroke="var(--border)"
          strokeWidth="1.5"
          strokeOpacity="0.4"
        />

        <path
          ref={pathRef}
          d={pathD}
          fill="none"
          stroke="url(#pathGrad)"
          strokeWidth="2.5"
          style={{ transition: 'd 0.3s ease' }}
        />

        <motion.circle
          cx={dotPos.x}
          cy={dotPos.y}
          r="7"
          fill="var(--accent)"
          opacity="0.15"
          filter="url(#glow-subtle)"
          animate={reducedMotion ? {} : { r: [7, 9, 7] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.circle
          cx={dotPos.x}
          cy={dotPos.y}
          r="4.5"
          fill="var(--accent)"
          opacity="0.3"
          filter="url(#glow)"
          animate={reducedMotion ? {} : { r: [4.5, 5.5, 4.5] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.circle
          cx={dotPos.x}
          cy={dotPos.y}
          r="3"
          fill="var(--accent)"
          opacity="0.7"
          filter="url(#glow)"
        />

        <circle
          cx={dotPos.x}
          cy={dotPos.y}
          r="2"
          fill="#fff"
          opacity="0.9"
        />
      </svg>
    </div>
  )
}
