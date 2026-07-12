import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { fadeUp, defaultTransition } from '../../lib/animations'

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  glass?: boolean
}

export function AnimatedCard({ children, className, glass }: AnimatedCardProps) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={reducedMotion ? { duration: 0 } : defaultTransition}
      className={cn(
        'rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-8 shadow-sm transition-all duration-300 hover:shadow-md',
        glass && 'backdrop-blur-xl bg-white/5',
        className
      )}
    >
      {children}
    </motion.div>
  )
}
