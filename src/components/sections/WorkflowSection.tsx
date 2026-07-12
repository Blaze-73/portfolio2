import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import {
  fadeUp,
  staggerContainer,
  springTransition,
} from '../../lib/animations'

const workflowSteps = [
  { step: '01', title: 'Understand', description: 'Understanding the client\'s needs and project requirements before writing code.' },
  { step: '02', title: 'Plan', description: 'Planning the application architecture, data flow, and technology choices.' },
  { step: '03', title: 'Design', description: 'Designing intuitive interfaces with attention to user experience.' },
  { step: '04', title: 'Frontend', description: 'Building scalable frontend architecture with React and Next.js.' },
  { step: '05', title: 'Backend', description: 'Developing secure backend APIs with Laravel and Node.js.' },
  { step: '06', title: 'Test', description: 'Testing thoroughly to ensure reliability and performance.' },
  { step: '07', title: 'Deploy', description: 'Deploying polished products to production with confidence.' },
]

export function WorkflowSection() {
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [lineProgress, setLineProgress] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || reducedMotion) return

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const sectionTop = rect.top
      const sectionHeight = rect.height
      const windowHeight = window.innerHeight
      const visible = Math.min(Math.max((windowHeight - sectionTop) / (sectionHeight + windowHeight), 0), 1)
      setLineProgress(visible * 0.85)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [reducedMotion])

  return (
    <Section id="workflow">
      <SectionHeader
        label="Workflow"
        title="How I work"
        subtitle="From understanding client needs to deploying polished products — a structured approach that ensures quality at every stage."
      />

      <div ref={sectionRef} className="relative mt-16">
        <div className="absolute left-6 top-0 hidden h-full w-px bg-[var(--border)]/30 md:block" aria-hidden="true">
          <motion.div
            className="w-full bg-gradient-to-b from-[var(--accent)] to-[var(--accent)]"
            style={{ height: `${reducedMotion ? 0 : lineProgress * 100}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="space-y-12"
        >
          {workflowSteps.map((step, i) => (
            <motion.div
              key={step.step}
              variants={fadeUp}
              transition={reducedMotion ? { duration: 0 } : { ...springTransition, delay: i * 0.05 }}
              className="relative pl-16 md:pl-20"
            >
              <motion.div
                className="absolute left-3.5 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[var(--accent)] md:left-4"
                aria-hidden="true"
                initial={reducedMotion ? {} : { scale: 0.8, boxShadow: '0 0 0px var(--accent)' }}
                whileInView={reducedMotion ? {} : { scale: 1, boxShadow: '0 0 12px var(--accent)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 + 0.15 }}
              >
                <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
              </motion.div>

              <motion.div
                className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 shadow-sm transition-all duration-500 hover:border-[var(--accent-border)] hover:shadow-lg hover:shadow-[var(--accent)]/5 md:p-8"
                initial={reducedMotion ? {} : { borderColor: 'var(--border)' }}
                whileInView={reducedMotion ? {} : { borderColor: 'var(--border)' }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="pointer-events-none absolute inset-0"
                  initial={reducedMotion ? {} : { x: '-100%', opacity: 0.3 }}
                  whileInView={reducedMotion ? {} : { x: '200%', opacity: 0 }}
                  viewport={{ once: true }}
                  transition={reducedMotion ? { duration: 0 } : { duration: 0.8, delay: i * 0.05 + 0.25, ease: 'easeInOut' }}
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, var(--accent-border) 40%, rgba(170, 59, 255, 0.15) 60%, transparent 100%)',
                  }}
                />

                <span className="relative z-10 mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-[var(--accent)]">
                  Step {step.step}
                </span>
                <h3 className="relative z-10 mb-2 text-xl font-semibold text-[var(--text-h)] transition-colors duration-300 group-hover:text-[var(--accent)]">
                  {step.title}
                </h3>
                <p className="relative z-10 max-w-2xl leading-relaxed text-[var(--text)]">
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}
