import { motion } from 'framer-motion'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'
import { Badge } from '../ui/Badge'
import {
  staggerContainer,
  fadeUp,
  springTransition,
} from '../../lib/animations'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const categories = [
  {
    title: 'Frontend',
    technologies: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'TailwindCSS',
      'Framer Motion',
      'Redux Toolkit',
      'Vite',
    ],
  },
  {
    title: 'Backend',
    technologies: ['PHP', 'Laravel', 'Node.js', 'Express.js', 'REST APIs'],
  },
  {
    title: 'Database',
    technologies: ['MySQL', 'PostgreSQL', 'MongoDB', 'Supabase'],
  },
  {
    title: 'Tools',
    technologies: ['Git', 'GitHub', 'Docker', 'Redis', 'Figma', 'Postman', 'VS Code'],
  },
  {
    title: 'Cloud & DevOps',
    technologies: ['Vercel', 'Netlify', 'Supabase', 'Cloudflare', 'Linux', 'Nginx'],
  },
]

export function TechStackSection() {
  const reducedMotion = useReducedMotion()

  return (
    <Section id="tech-stack">
      <SectionHeader
        label="Tech Stack"
        title="Technologies I work with"
        subtitle="Technologies I use regularly to build modern, scalable web applications."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
      >
        {categories.map((category) => (
          <motion.div
            key={category.title}
            variants={fadeUp}
            transition={reducedMotion ? { duration: 0 } : springTransition}
            className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 shadow-sm transition-all duration-500 hover:scale-[1.03] hover:border-[var(--accent-border)] hover:shadow-xl hover:shadow-[var(--accent)]/10"
          >
            <div
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[var(--accent-border)]/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              aria-hidden="true"
            />

            <h3 className="relative z-10 mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-[var(--text-h)] transition-colors duration-300 group-hover:text-[var(--accent)]">
              {category.title}
            </h3>
            <div className="relative z-10 flex flex-wrap gap-2">
              {category.technologies.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
