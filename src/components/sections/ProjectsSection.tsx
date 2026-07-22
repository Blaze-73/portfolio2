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
  description: `Complete gym management platform serving three roles — admin, coach, and member. Includes membership plans with PayPal checkout, QR code attendance check-in/out, workout and nutrition tracking, coach assignment with messaging, a product store with order management, and weekly class scheduling.

Built with Laravel 12 REST API (25+ models) and React 18 frontend. Features real-time notifications, subscription auto-expiry alerts, site reviews, and a full admin dashboard with member/order/attendance analytics.`,  technologies: ['Laravel', 'React', 'MySQL', 'PayPal API', 'QR Code', 'Sanctum Auth'],
  github: 'https://github.com/Blaze-73/gym-management',
  demo: 'https://alien-gym-management.vercel.app/',
  image: '/images/gympic.png',
}

const projects = [
  {
    title: 'Riad Assilah',
    description: `A boutique riad guesthouse website for a traditional Moroccan lodging in Asilah. Features room browsing by bed type and capacity, a booking inquiry system via WhatsApp and email, a masonry gallery with Cloudinary lightbox, and an experience section showcasing local activities.

Built with the MERN stack (React 18 + Express + MongoDB Atlas) with JWT authentication for the admin panel. Supports three languages (French, English, Arabic RTL) via i18next, and uses GSAP for scroll animations. Admin can manage rooms, inquiries, testimonials, and gallery uploads.`,
    technologies: ['React', 'Express.js', 'MongoDB', 'JWT', 'Cloudinary', 'GSAP', 'i18next'],
    demo: 'https://riad-assilah-client.vercel.app',
    image: '/images/riad.png',
  },
  {
    title: 'Najiya Flowers',
    description: `A luxury flower e-commerce platform with a full shopping experience. Browse categorized bouquets, manage a persisted cart and wishlist (Zustand), complete multi-step checkout, and track orders through status updates. Includes an admin dashboard for product, order, and user management.

Built with Next.js 16 App Router and TypeScript. Supports three languages (French, English, Arabic) via next-intl with full RTL layout. Uses Radix UI primitives, Framer Motion animations, and Tailwind CSS v4.`,
    technologies: ['Next.js', 'TypeScript', 'TailwindCSS', 'Zustand', 'Radix UI', 'next-intl'],
    github: 'https://github.com/Blaze-73/fleur-de-luxe',
    demo: 'https://najiya-flowers.vercel.app',
    image: '/images/fleure.png',
  },
  {
    title: 'AHAYZONE',
    description: `An art gallery and tourism platform for Asilah, showcasing the Arabic calligraphy portraits of artist Abderrahim Ahizoune. Features artist profiles, curated collections, artwork showcases, a studio process section, testimonials, and an Instagram gallery.

Built with React 19 and Vite, featuring Lenis smooth scrolling, Framer Motion page transitions, and full i18n support (Arabic/French/English) with RTL switching. All content is driven by JSON data files, with Schema.org structured data for SEO.`,
    technologies: ['React', 'Vite', 'TailwindCSS', 'Framer Motion', 'Lenis', 'i18next'],
    github: 'https://github.com/Blaze-73/ahayzone',
    demo: 'https://ahayzone.vercel.app',
    image: '/images/ahayzone.png',
  },
  {
    title: 'Parapharmacy',
    description: `A medicine and parapharmacy e-commerce platform with product catalog, promo pricing, cart management, favorites, and order tracking. Features a RESTful Laravel backend with Sanctum authentication and a React 18 frontend using Zustand for state management and TanStack Query for data fetching.

Includes an admin dashboard with product CRUD, order status management, and customer overview. Products support categories, brands, stock tracking, and automatic discount calculation.`,
    technologies: ['React', 'Laravel', 'MySQL', 'TanStack Query', 'Zustand', 'Sanctum Auth'],
    github: 'https://github.com/Blaze-73/pharmacy-platform',
    demo: 'https://parapharmacyy.vercel.app',
    image: '/images/para.png',
  },
  {
    title: 'Centre Hassan II',
    description: `A comprehensive content management platform for the Centre Hassan II international meetings center. Features public pages for events, news, spaces, gallery, and practical info, plus a full admin panel with rich content editing via Tiptap.

Built with a Laravel 13 REST API (Sanctum auth) and React 19 frontend. Supports multilingual content (French primary) with dynamic locale handling. Includes event management with featured/upcoming filtering, news/blog with rich text, venue/space management, photo gallery with lightbox, and contact form management.`,
    technologies: ['React', 'Laravel', 'PostgreSQL', 'Tiptap', 'Framer Motion', 'Sanctum Auth'],
    github: 'https://github.com/Blaze-73/centre-hassan2',
    demo: 'https://centre-hassan-2-front.vercel.app',
    image: '/images/ch2.png',
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
