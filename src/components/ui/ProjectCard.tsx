import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'
import { Badge } from './Badge'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { defaultTransition } from '../../lib/animations'

interface ProjectCardProps {
  title: string
  description: string
  technologies: string[]
  github?: string
  demo?: string
  image?: string
  featured?: boolean
  className?: string
}

export function ProjectCard({
  title,
  description,
  technologies,
  github,
  demo,
  image,
  featured,
  className,
}: ProjectCardProps) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: 24 }}
      whileInView={reducedMotion ? {} : { opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={reducedMotion ? { duration: 0 } : { ...defaultTransition }}
      className={cn(
        'group rounded-2xl border border-[var(--border)] bg-[var(--bg)] overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md',
        featured && 'lg:col-span-2 lg:grid lg:grid-cols-2',
        className
      )}
    >
      <div
        className={cn(
          'relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[var(--accent-bg)] to-transparent',
          featured ? 'min-h-[300px]' : 'h-48'
        )}
      >
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="text-4xl font-bold text-[var(--accent)] opacity-20 select-none">
            {title.charAt(0)}
          </div>
        )}
      </div>

      <div className={cn('flex flex-col', featured && 'justify-center')}>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-[var(--text-h)] group-hover:text-[var(--accent)] transition-colors duration-300">
            {title}
          </h3>
          <p className="mt-2 leading-relaxed text-[var(--text)]">
            {description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-4">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[var(--text)] hover:text-[var(--text-h)] transition-colors duration-300"
              >
                GitHub →
              </a>
            )}
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[var(--accent)] hover:opacity-80 transition-opacity duration-300"
              >
                Live Demo →
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
