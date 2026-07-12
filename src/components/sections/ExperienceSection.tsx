import { motion } from 'framer-motion'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'
import { Badge } from '../ui/Badge'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import {
  staggerContainer,
  fadeUp,
  springTransition,
} from '../../lib/animations'

const experiences = [
  {
    period: '2024 — Present',
    title: 'Full Stack Development Student',
    description:
      'Studying Software Development Full Stack at OFPPT ISMONTIC. Building complete real-world applications with React, Next.js, Laravel, and modern tools.',
    tags: ['React', 'Next.js', 'Laravel', 'TypeScript'],
  },
  {
    period: '2024',
    title: 'Project — Fleur de Luxe',
    description:
      'Built a luxury flower e-commerce platform from scratch using Next.js, TypeScript, TailwindCSS, and Supabase. Focused on premium UX and performance.',
    tags: ['Next.js', 'Supabase', 'E-commerce'],
  },
  {
    period: '2024',
    title: 'Project — AHAYZONE',
    description:
      'Developed a multilingual art gallery and tourism platform with React, TailwindCSS, and Framer Motion animations. Showcasing Asilah\'s artistic culture.',
    tags: ['React', 'Multilingual', 'Animations'],
  },
  {
    period: '2024',
    title: 'Freelance-Ready Developer',
    description:
      'Available for freelance opportunities and junior developer positions. Experienced in building full-stack applications with modern architectures.',
    tags: ['Freelance', 'Full Stack', 'Available'],
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
            className="group rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 shadow-sm transition-all duration-300 hover:shadow-md md:p-8"
          >
            <span className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-[var(--accent)]">
              {exp.period}
            </span>
            <h3 className="text-lg font-semibold text-[var(--text-h)] group-hover:text-[var(--accent)] transition-colors duration-300">
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
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
