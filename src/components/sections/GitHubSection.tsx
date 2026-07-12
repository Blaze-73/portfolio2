import { motion } from 'framer-motion'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'
import { Button } from '../ui/Button'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import {
  staggerContainer,
  fadeUp,
  fadeIn,
  springTransition,
} from '../../lib/animations'

const stats = [
  { label: 'Repositories', value: '40+' },
  { label: 'Followers', value: '120+' },
  { label: 'Following', value: '60+' },
  { label: 'Contributions', value: '2.5k+' },
]

const repoLines = [
  { prefix: '$', command: 'gh repo list --limit 3' },
  { prefix: '>', command: 'fleur-de-luxe', highlight: true },
  { prefix: '>', command: 'ahayzone' },
  { prefix: '>', command: 'gym-management' },
  { prefix: '$', command: 'gh status' },
  { prefix: '>', command: 'All repositories up to date' },
]

export function GitHubSection() {
  const reducedMotion = useReducedMotion()

  return (
    <Section id="github">
      <SectionHeader
        label="GitHub"
        title="Open source & contributions"
        subtitle="Building real-world projects and contributing to the developer community."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="mt-16 grid gap-6 lg:grid-cols-5"
      >
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                transition={reducedMotion ? { duration: 0 } : { ...springTransition, delay: i * 0.05 }}
                className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5 text-center shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <span className="block text-2xl font-bold text-[var(--text-h)]">
                  {stat.value}
                </span>
                <span className="mt-1 block text-xs uppercase tracking-[0.1em] text-[var(--text)]">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            transition={reducedMotion ? { duration: 0 } : { ...springTransition, delay: 0.2 }}
            className="mt-6"
          >
            <Button href="https://github.com/mouataz-bk" variant="secondary">
              View GitHub Profile →
            </Button>
          </motion.div>
        </div>

        <motion.div
          variants={fadeIn}
          transition={reducedMotion ? { duration: 0 } : { ...springTransition, delay: 0.15 }}
          className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--code-bg)] shadow-sm lg:col-span-3"
        >
          <div className="flex items-center gap-1.5 border-b border-[var(--border)] px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
            <span className="ml-2 text-xs text-[var(--text)]">terminal</span>
          </div>

          <div className="space-y-2 p-4 font-mono text-sm leading-relaxed">
            {repoLines.map((line, i) => (
              <motion.div
                key={i}
                initial={reducedMotion ? {} : { opacity: 0 }}
                whileInView={reducedMotion ? {} : { opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-2"
              >
                <span
                  className={
                    line.prefix === '$'
                      ? 'text-green-500'
                      : 'text-[var(--text)]'
                  }
                >
                  {line.prefix}
                </span>
                <span
                  className={
                    line.highlight
                      ? 'text-[var(--accent)]'
                      : 'text-[var(--text-h)]'
                  }
                >
                  {line.command}
                </span>
              </motion.div>
            ))}
            <motion.div
              initial={reducedMotion ? {} : { opacity: 0 }}
              whileInView={reducedMotion ? {} : { opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-2 flex items-center gap-1 text-[var(--text)]"
            >
              <span className="text-green-500">$</span>
              <span className={reducedMotion ? '' : 'animate-pulse'}>▊</span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  )
}
