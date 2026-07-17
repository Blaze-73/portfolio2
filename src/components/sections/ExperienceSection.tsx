import { motion } from 'framer-motion'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'
import { Badge } from '../ui/Badge'
import { HoverCard } from '../ui/HoverCard'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import {
  staggerContainer,
  fadeUp,
  springTransition,
} from '../../lib/animations'

const experiences = [
  {
    period: '2023',
    title: 'FST Tangier ÔÇö Algorithms & Problem Solving',
    description:
      'Studied at FST Tangier where I discovered algorithms and problem-solving. This is where I fell in love with coding and started my journey into software development.',
    tags: ['Algorithms', 'Problem Solving', 'C'],
  },
  {
    period: '2024',
    title: 'ISMONTIC Tangier ÔÇö Web Development Foundations',
    description:
      'Started learning web development from scratch at ISMONTIC Tangier. Covered the fundamentals: HTML, CSS, and JavaScript, building a strong base for modern web development.',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    period: '2024',
    title: 'ISMONTIC ÔÇö Security & Kali Linux',
    description:
      'Studied security vulnerabilities and ethical hacking using Kali Linux. Learned to understand and test system security, gaining insights into how applications are attacked and defended.',
    tags: ['Security', 'Kali Linux', 'Vulnerabilities'],
  },
  {
    period: '2025 ÔÇö Present',
    title: 'ISMONTIC ÔÇö Full Stack Development',
    description:
      'Second year focused on building real-world projects using modern frameworks. Applying all the knowledge gathered ÔÇö from frontend to backend ÔÇö to create complete full-stack applications.',
    tags: ['React', 'Next.js', 'Laravel', 'Full Stack'],
  },
]

export function ExperienceSection() {
  const reducedMotion = useReducedMotion()

  return (
    <Section id="experience">
      <SectionHeader
        label="Experience"
        title="Professional journey"
        subtitle="My journey as a developer through education and real project experience."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="mt-16 grid gap-6 md:grid-cols-2"
      >
        {experiences.map((exp) => (
          <motion.div
            key={exp.title}
            variants={fadeUp}
            transition={reducedMotion ? { duration: 0 } : springTransition}
          >
            <HoverCard>
              <div className="p-6 md:p-8">
                <span className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-[var(--accent)]">
                  {exp.period}
                </span>
                <h3 className="text-lg font-semibold text-[var(--text-h)] transition-colors duration-300">
                  {exp.title}
                </h3>
                <p className="mt-3 leading-relaxed text-[var(--text)]">
                  {exp.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </div>
            </HoverCard>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
