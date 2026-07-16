import { motion } from 'framer-motion'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'
import { Badge } from '../ui/Badge'
import { DecayCard } from '../ui/DecayCard'
import {
  staggerContainer,
  fadeUp,
  springTransition,
} from '../../lib/animations'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const categoryColors = [
  'oklch(0.28 0.12 255)',
  'oklch(0.28 0.1 170)',
  'oklch(0.28 0.1 85)',
  'oklch(0.28 0.12 310)',
  'oklch(0.28 0.1 20)',
]

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

const Title = ({ children }: { children: string }) => (
  <h3 className="relative mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-white/90">
    {children}
  </h3>
)

const TechList = ({ items }: { items: string[] }) => (
  <div className="relative flex flex-wrap justify-center gap-1.5">
    {items.map((tech) => (
      <Badge key={tech} className="bg-black/20 text-white/80 backdrop-blur-sm border-white/10">
        {tech}
      </Badge>
    ))}
  </div>
)

export function TechStackSection() {
  const reducedMotion = useReducedMotion()

  return (
    <Section id="tech-stack">
      <SectionHeader
        label="Tech Stack"
        title="Technologies I work with"
        subtitle="Technologies I use regularly to build modern, scalable web applications."
      />

      {reducedMotion ? (
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((category, i) => (
            <DecayCard key={category.title} fill={categoryColors[i]}>
              <Title>{category.title}</Title>
              <TechList items={category.technologies} />
            </DecayCard>
          ))}
        </div>
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {categories.map((category, i) => (
            <motion.div
              key={category.title}
              variants={fadeUp}
              transition={reducedMotion ? { duration: 0 } : springTransition}
            >
              <DecayCard fill={categoryColors[i]}>
                <Title>{category.title}</Title>
                <TechList items={category.technologies} />
              </DecayCard>
            </motion.div>
          ))}
        </motion.div>
      )}
    </Section>
  )
}
