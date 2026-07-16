import { useRef, useState, useCallback, useEffect, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '../../lib/utils'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './HoverCard.css'

const isTouch =
  typeof window !== 'undefined' && 'ontouchstart' in window

interface HoverCardProps {
  children: ReactNode
  className?: string
}

export function HoverCard({ children, className }: HoverCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [hover, setHover] = useState(false)
  const touchTimer = useRef<ReturnType<typeof setTimeout>>()

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const tiltX = useSpring(useTransform(mouseY, [0, 1], [6, -6]), {
    stiffness: 200,
    damping: 15,
  })
  const tiltY = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), {
    stiffness: 200,
    damping: 15,
  })

  const glowX = useSpring(mouseX, { stiffness: 120, damping: 20 })
  const glowY = useSpring(mouseY, { stiffness: 120, damping: 20 })
  const glowBg = useTransform([glowX, glowY], ([x, y]) => {
    const cx = Math.round(x * 100)
    const cy = Math.round(y * 100)
    return `radial-gradient(circle at ${cx}% ${cy}%, var(--accent-border), transparent 65%)`
  })

  useEffect(() => {
    return () => clearTimeout(touchTimer.current)
  }, [])

  const handleMouseEnter = useCallback(() => {
    if (isTouch) return
    setHover(true)
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouch || !cardRef.current || reducedMotion) return
      const rect = cardRef.current.getBoundingClientRect()
      mouseX.set((e.clientX - rect.left) / rect.width)
      mouseY.set((e.clientY - rect.top) / rect.height)
    },
    [reducedMotion],
  )

  const handleMouseLeave = useCallback(() => {
    if (isTouch) return
    setHover(false)
    mouseX.set(0.5)
    mouseY.set(0.5)
  }, [])

  const handleClick = useCallback(() => {
    if (!isTouch) return
    setHover((prev) => {
      const next = !prev
      if (next) {
        clearTimeout(touchTimer.current)
        touchTimer.current = setTimeout(() => setHover(false), 2500)
      }
      return next
    })
  }, [])

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      style={{
        rotateX: tiltX,
        rotateY: tiltY,
        transformPerspective: 800,
        transformStyle: 'preserve-3d',
      }}
      animate={{ scale: hover ? 1.02 : 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn(
        'relative overflow-hidden rounded-2xl shadow-sm transition-shadow duration-300',
        hover ? 'shadow-xl' : 'shadow-sm',
        className,
      )}
    >
      <div
        className="absolute -inset-2 rounded-2xl pointer-events-none"
        style={{
          background:
            'conic-gradient(from 0deg, var(--accent-border), transparent 25%, var(--accent) 50%, transparent 75%, var(--accent-border))',
          opacity: hover ? 1 : 0,
          transition: 'opacity 0.5s ease',
          animation: hover ? 'hc-spin 4s linear infinite' : 'none',
        }}
      />

      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ background: glowBg, opacity: hover ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="relative m-[1px] rounded-2xl bg-[var(--bg)]"
        animate={{ z: hover ? 24 : 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
