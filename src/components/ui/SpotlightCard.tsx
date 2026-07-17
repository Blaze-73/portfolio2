import { useRef, useState, useCallback, useEffect, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { fadeUp, defaultTransition } from '../../lib/animations'
import { PixelOverlay } from './PixelOverlay'

const isTouch =
  typeof window !== 'undefined' && 'ontouchstart' in window

interface SpotlightCardProps {
  children: ReactNode
  className?: string
}

export function SpotlightCard({ children, className }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 })
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hover, setHover] = useState(false)
  const touchTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    return () => clearTimeout(touchTimer.current)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || !cardRef.current || reducedMotion) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setSpotlight({ x, y, opacity: 1 })

    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const rotateX = ((e.clientY - centerY) / centerY) * -8
    const rotateY = ((e.clientX - centerX) / centerX) * 8
    setTilt({ x: rotateX, y: rotateY })
  }, [reducedMotion])

  const handleMouseLeave = useCallback(() => {
    if (isTouch) return
    setTilt({ x: 0, y: 0 })
    setHover(false)
  }, [])

  const handleMouseEnter = useCallback(() => {
    if (isTouch) return
    setHover(true)
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

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={reducedMotion ? { duration: 0 } : defaultTransition}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      className={cn(
        'group relative overflow-hidden rounded-2xl p-px transition-all duration-500',
        hover && !reducedMotion ? 'shadow-lg shadow-[var(--accent)]/10' : 'shadow-sm',
        className
      )}
      style={
        reducedMotion
          ? {}
          : {
              perspective: '600px',
            }
      }
    >
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={
          reducedMotion
            ? {}
            : {
                background: hover
                  ? `radial-gradient(300px circle at ${spotlight.x}% ${spotlight.y}%, var(--accent-border), transparent 70%)`
                  : 'transparent',
                opacity: hover ? 0.8 : 0,
              }
        }
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{ pointerEvents: 'none' }}
      />

      <motion.div
        className="relative rounded-2xl bg-[var(--bg)] p-8"
        style={{ transformStyle: 'preserve-3d' }}
        animate={
          reducedMotion
            ? {}
            : {
                rotateX: tilt.x,
                rotateY: tilt.y,
                scale: hover ? 1.02 : 1,
              }
        }
        transition={{ type: 'spring', stiffness: 250, damping: 25 }}
      >
        <PixelOverlay hovered={hover} />
        <div className="relative z-10">{children}</div>
      </motion.div>
    </motion.div>
  )
}
