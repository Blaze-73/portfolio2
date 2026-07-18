import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Project {
  title: string
  description: string
  technologies: string[]
  github?: string
  demo?: string
  image?: string
}

interface ProjectDetailProps {
  project: Project | null
  onClose: () => void
}

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const panel = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 30, mass: 0.8 },
  },
  exit: { opacity: 0, y: 30, transition: { duration: 0.2 } },
}

export function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (project) {
      document.addEventListener('keydown', handleKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [project, handleKey])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/60"
            onClick={onClose}
          />

          <motion.div
            className="relative z-10 flex w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl border border-[var(--border)] bg-[var(--bg)] shadow-2xl max-h-[92vh] sm:max-h-[85vh]"
            variants={panel}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ willChange: 'transform' }}
          >
            <button
              onClick={onClose}
              className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white/80 transition-colors hover:bg-black/70 hover:text-white"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>

            {project.image ? (
              <div className="relative w-full shrink-0 aspect-[4/3] sm:aspect-[16/9] max-h-[220px] sm:max-h-[380px]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 h-full w-full object-contain bg-[var(--code-bg)] p-2"
                />
              </div>
            ) : (
              <div className="flex h-[180px] sm:h-[280px] shrink-0 items-center justify-center bg-gradient-to-br from-[var(--accent-bg)] to-transparent">
                <span className="text-5xl sm:text-6xl font-bold text-[var(--accent)]/20 select-none">
                  {project.title.charAt(0)}
                </span>
              </div>
            )}

            <div className="flex flex-col overflow-y-auto p-5 sm:p-8">
              <h2 className="text-xl sm:text-3xl font-bold text-[var(--text-h)]">
                {project.title}
              </h2>

              <p className="mt-3 sm:mt-4 leading-relaxed text-[var(--text)] text-sm sm:text-base">
                {project.description}
              </p>

              <div className="mt-4 sm:mt-5 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--code-bg)] px-3 py-1 text-xs font-medium text-[var(--text)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-xl bg-[var(--accent)] px-5 py-3 sm:py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] sm:hover:scale-105 hover:shadow-lg hover:shadow-[var(--accent)]/30"
                  >
                    Live Demo
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center justify-center rounded-xl border border-[var(--border)] px-5 py-3 sm:py-2.5 text-sm font-medium text-[var(--text)] transition-colors hover:text-[var(--text-h)] hover:bg-[var(--code-bg)]"
                  >
                    <span className="inline-flex items-center gap-1">
                      GitHub
                      <span className="inline-block transition-transform group-hover/btn:translate-x-1">
                        →
                      </span>
                    </span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
