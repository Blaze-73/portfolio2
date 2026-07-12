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
  const smoothProgress = useSpring(progress, { stiffness: 80, damping: 25 })
  const [dotPos, setDotPos] = useState({ x: 0, y: 0 })

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

    const scrollHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
    const margin = 40

    return sectionIds.map((id, i) => {
      const el = document.getElementById(id)
      const top = el ? el.offsetTop : 0
      const y = margin + ((top / scrollHeight) * (svgSize.height - margin * 2))
      const x = i % 2 === 0 ? svgSize.width * 0.3 : svgSize.width * 0.7
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
      d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`
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
        className="h-full w-full"
        viewBox={`0 0 ${svgSize.width} ${svgSize.height}`}
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d={pathD}
          fill="none"
          stroke="var(--border)"
          strokeWidth="2"
        />
        <motion.circle
          cx={dotPos.x}
          cy={dotPos.y}
          r="4"
          fill="var(--accent)"
        />
      </svg>
    </div>
  )
}
