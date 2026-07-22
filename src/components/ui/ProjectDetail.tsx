import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
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

export function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (!project) return

    document.addEventListener('keydown', handleKey)

    const html = document.documentElement
    const body = document.body
    const scrollbarWidth = window.innerWidth - html.clientWidth

    const origOverflow = body.style.overflow
    const origPadding = body.style.paddingRight

    body.style.overflow = 'hidden'
    body.style.paddingRight = `${scrollbarWidth}px`
    html.setAttribute('data-modal-open', '')

    return () => {
      document.removeEventListener('keydown', handleKey)
      body.style.overflow = origOverflow
      body.style.paddingRight = origPadding
      html.removeAttribute('data-modal-open')
    }
  }, [project, handleKey])

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[999]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-black/60" onClick={onClose} />

          <div className="absolute inset-0 flex items-center justify-center p-0 sm:p-4 pointer-events-none">
            <div
              className="pointer-events-auto relative flex w-full flex-col bg-[var(--bg)] overflow-hidden h-full sm:max-h-[85vh] sm:rounded-2xl sm:border sm:border-[var(--border)] sm:shadow-2xl sm:max-w-3xl"
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
                <div className="relative w-full shrink-0 h-[220px] sm:h-[380px] sm:rounded-t-2xl overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 h-full w-full object-contain bg-[var(--code-bg)] p-2"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="flex h-[180px] sm:h-[280px] shrink-0 items-center justify-center sm:rounded-t-2xl bg-gradient-to-br from-[var(--accent-bg)] to-transparent">
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
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
