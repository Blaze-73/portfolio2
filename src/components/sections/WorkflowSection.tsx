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

  return (
    <Section id="workflow">
      <SectionHeader
        label="Workflow"
        title="How I work"
        subtitle="From understanding client needs to deploying polished products — a structured approach that ensures quality at every stage."
      />

      <div className="relative mt-16">
        <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-[var(--accent)] via-[var(--border)] to-transparent md:block" aria-hidden="true" />

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
              <div
                className="absolute left-3.5 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[var(--accent)] bg-[var(--bg)] md:left-4"
                aria-hidden="true"
              >
                <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
              </div>

              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 shadow-sm transition-all duration-300 hover:shadow-md md:p-8">
                <span className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-[var(--accent)]">
                  Step {step.step}
                </span>
                <h3 className="mb-2 text-xl font-semibold text-[var(--text-h)]">
                  {step.title}
                </h3>
                <p className="max-w-2xl leading-relaxed text-[var(--text)]">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}
