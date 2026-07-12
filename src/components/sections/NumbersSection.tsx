import { useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface CounterProps {
  target: number
  suffix?: string
  label: string
  duration?: number
}

function Counter({ target, suffix = '', label, duration = 2 }: CounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [count, setCount] = useState(0)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!inView) return
    if (reducedMotion) {
      setCount(target)
      return
    }

    const totalFrames = duration * 60
    let frame = 0
    let rafId: number

    const animate = () => {
      frame++
      const progress = Math.min(frame / totalFrames, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))

      if (frame < totalFrames) {
        rafId = requestAnimationFrame(animate)
      }
    }

    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [inView, target, duration, reducedMotion])

  return (
    <div ref={ref} className="text-center">
      <span className="block text-5xl font-bold tracking-tight text-[var(--text-h)] md:text-6xl lg:text-7xl">
        {count}
        {suffix}
      </span>
      <span className="mt-3 block text-sm uppercase tracking-[0.15em] text-[var(--text)]">
        {label}
      </span>
    </div>
  )
}

const counters = [
  { target: 6, suffix: '+', label: 'Projects Built' },
  { target: 20, suffix: '+', label: 'Technologies' },
  { target: 2, suffix: '+', label: 'Years Learning' },
  { target: 5, suffix: '+', label: 'Real Deployments' },
]

export function NumbersSection() {
  return (
    <Section id="numbers">
      <SectionHeader
        label="Numbers"
        title="By the numbers"
        subtitle="Real numbers from my development journey."
      />

      <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        {counters.map((counter) => (
          <Counter
            key={counter.label}
            target={counter.target}
            suffix={counter.suffix}
            label={counter.label}
          />
        ))}
      </div>
    </Section>
  )
}
