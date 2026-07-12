import { motion } from 'framer-motion'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'
import { ProjectCard } from '../ui/ProjectCard'
import { staggerContainer, springTransition } from '../../lib/animations'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const featuredProject = {
  title: 'Fleur de Luxe',
  description:
    'A luxury flower e-commerce platform with a premium shopping experience. Built with Next.js, TypeScript, and TailwindCSS, featuring a product catalog, cart, checkout flow, and Supabase backend.',
  technologies: ['Next.js', 'TypeScript', 'TailwindCSS', 'Supabase'],
  github: 'https://github.com/mouataz-bk/fleur-de-luxe',
  demo: 'https://fleur-de-luxe.vercel.app',
}

const projects = [
  {
    title: 'AHAYZONE',
    description:
      'Modern art gallery and tourism platform showcasing Asilah\'s artistic culture. Features multilingual support, responsive gallery, and smooth animations.',
    technologies: ['React', 'TailwindCSS', 'Framer Motion'],
    github: 'https://github.com/mouataz-bk/ahayzone',
    demo: 'https://ahayzone.vercel.app',
  },
  {
    title: 'Gym Management System',
    description:
      'Full-stack management platform with member management, admin dashboard, authentication, and REST API built with Laravel and React.',
    technologies: ['Laravel', 'React', 'REST API', 'Auth'],
    github: 'https://github.com/mouataz-bk/gym-management',
  },
  {
    title: 'Pharmacy Platform',
    description:
      'Medicine management platform with a modern React frontend and Laravel backend. Features authentication, inventory, and responsive UI.',
    technologies: ['React', 'Laravel', 'MySQL'],
    github: 'https://github.com/mouataz-bk/pharmacy-platform',
  },
  {
    title: 'Centre Hassan II',
    description:
      'Modern platform built with React and Laravel for the Centre Hassan II cultural institution.',
    technologies: ['React', 'Laravel', 'PostgreSQL'],
    github: 'https://github.com/mouataz-bk/centre-hassan2',
  },
]

export function ProjectsSection() {
  const reducedMotion = useReducedMotion()

  return (
    <Section id="projects">
      <SectionHeader
        label="Projects"
        title="Selected work"
        subtitle="Real projects I have built — from e-commerce platforms to full-stack management systems."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="mt-16 space-y-8"
      >
        <motion.div
          variants={staggerContainer}
          transition={reducedMotion ? { duration: 0 } : springTransition}
        >
          <ProjectCard {...featuredProject} featured />
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </motion.div>
    </Section>
  )
}
