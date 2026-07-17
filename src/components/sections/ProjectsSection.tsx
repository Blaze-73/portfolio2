import { useState } from 'react'
import { motion } from 'framer-motion'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'
import { MagicBento, type Project } from '../ui/MagicBento'
import { ProjectDetail } from '../ui/ProjectDetail'
import { staggerContainer, springTransition } from '../../lib/animations'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const featuredProject = {
  title: 'Gym Management System',
  description:
    'Full-stack management platform with member management, admin dashboard, authentication, and REST API built with Laravel and React.',
  technologies: ['Laravel', 'React', 'REST API', 'Auth'],
  github: 'https://github.com/mouataz-bk/gym-management',
  demo: 'https://alien-gym-management.vercel.app/',
  image: '/images/gympic.png',
}

const projects = [
  {
    title: 'Riad Assilah',
    description:
      'A boutique riad guesthouse website with multilingual support (FR/EN/AR), room management, booking system, image gallery, and JWT-authenticated admin panel.',
    technologies: ['React', 'Express.js', 'MongoDB', 'TailwindCSS', 'Framer Motion', 'i18next'],
    demo: 'https://riad-assilah-client.vercel.app',
    image: '/images/riad.png',
  },
  {
    title: 'Fleur de Luxe',
    description:
      'A luxury flower e-commerce platform with a premium shopping experience. Built with Next.js, TypeScript, and TailwindCSS, featuring a product catalog, cart, checkout flow, and Supabase backend.',
    technologies: ['Next.js', 'TypeScript', 'TailwindCSS', 'Supabase'],
    github: 'https://github.com/mouataz-bk/fleur-de-luxe',
    demo: 'https://fleur-de-luxe.vercel.app',
    image: '/images/fleure.png',
  },
  {
    title: 'AHAYZONE',
    description:
      'Modern art gallery and tourism platform showcasing Asilah\'s artistic culture. Features multilingual support, responsive gallery, and smooth animations.',
    technologies: ['React', 'TailwindCSS', 'Framer Motion'],
    github: 'https://github.com/mouataz-bk/ahayzone',
    demo: 'https://ahayzone.vercel.app',
    image: '/images/ahayzone.png',
  },
  {
    title: 'Pharmacy Platform',
    description:
      'Medicine management platform with a modern React frontend and Laravel backend. Features authentication, inventory, and responsive UI.',
    technologies: ['React', 'Laravel', 'MySQL'],
    github: 'https://github.com/mouataz-bk/pharmacy-platform',
    image: '/images/para.png',
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
  const [selected, setSelected] = useState<Project | null>(null)

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
        transition={reducedMotion ? { duration: 0 } : springTransition}
        className="mt-16"
      >
        <MagicBento
          projects={[featuredProject, ...projects]}
          glowColor="132, 0, 255"
          onProjectClick={(p) => setSelected(p)}
        />
      </motion.div>

      <ProjectDetail project={selected} onClose={() => setSelected(null)} />
    </Section>
  )
}
