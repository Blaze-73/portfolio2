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
        'group relative rounded-2xl border border-[var(--border)] bg-[var(--bg)] overflow-hidden shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:border-[var(--accent)]/40',
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
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[var(--bg)]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {image ? (
          <>
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              loading="lazy"
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {demo && (
                <a
                  href={demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white/90 px-5 py-2.5 text-sm font-semibold text-black shadow-lg backdrop-blur-sm transition-transform duration-300 hover:scale-105"
                >
                  Live Demo
                </a>
              )}
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-black/80 px-5 py-2.5 text-sm font-semibold text-white shadow-lg backdrop-blur-sm transition-transform duration-300 hover:scale-105"
                >
                  GitHub
                </a>
              )}
            </div>
          </>
        ) : (
          <div className="text-4xl font-bold text-[var(--accent)] opacity-20 select-none group-hover:opacity-40 group-hover:scale-125 transition-all duration-500">
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
                className="group/btn text-sm font-medium text-[var(--text)] transition-all duration-300 hover:text-[var(--text-h)]"
              >
                <span className="inline-flex items-center gap-1">
                  GitHub
                  <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                </span>
              </a>
            )}
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn text-sm font-medium text-[var(--accent)] transition-all duration-300 hover:opacity-80"
              >
                <span className="inline-flex items-center gap-1">
                  Live Demo
                  <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
