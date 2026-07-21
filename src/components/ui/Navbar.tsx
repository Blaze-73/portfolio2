import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'
import { ThemeToggle } from './ThemeToggle'

interface NavbarProps {
  sectionIds: string[]
}

const labels: Record<string, string> = {
  landing: 'Home',
  about: 'About',
  workflow: 'Workflow',
  'tech-stack': 'Tech Stack',
  projects: 'Projects',
  github: 'GitHub',
  experience: 'Experience',
  contact: 'Contact',
}

const ease = [0.25, 0.1, 0.25, 1] as const

const menuVariants = {
  closed: {
    opacity: 0,
    transition: { duration: 0.25, ease },
  },
  open: {
    opacity: 1,
    transition: { duration: 0.3, ease },
  },
}

const itemVariants = {
  closed: { opacity: 0, x: -24 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, delay: 0.05 * i, ease },
  }),
}

function useScrollLock(lock: boolean) {
  useEffect(() => {
    if (!lock) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = original }
  }, [lock])
}

export function Navbar({ sectionIds }: NavbarProps) {
  const [active, setActive] = useState('landing')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useScrollLock(menuOpen)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)

      const offset = 120
      let current = 'landing'
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i])
        if (el && el.getBoundingClientRect().top <= offset) {
          current = sectionIds[i]
          break
        }
      }
      setActive(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [sectionIds])

  const handleClick = useCallback((id: string) => {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-[60] transition-all duration-300 will-change-transform bg-[var(--bg)]',
        scrolled || menuOpen
          ? 'backdrop-blur-md md:backdrop-blur-xl border-b border-[var(--border)] shadow-sm'
          : 'md:bg-[var(--bg)]/80 md:backdrop-blur-sm border-b border-[var(--border)]/30 md:border-transparent'
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="flex items-center py-3">
          <a
            href="#landing"
            onClick={(e) => { e.preventDefault(); handleClick('landing') }}
            className="text-sm font-bold tracking-tight text-[var(--text-h)] transition-colors hover:text-[var(--accent)]"
          >
            MBK
          </a>

          <div className="hidden md:flex flex-1 items-center justify-center gap-10">
            <div className="flex items-center gap-1">
              <ThemeToggle />
              {sectionIds.map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => { e.preventDefault(); handleClick(id) }}
                  className={cn(
                    'rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200',
                    active === id
                      ? 'text-[var(--accent)] bg-[var(--accent-bg)]'
                      : 'text-[var(--text)] hover:text-[var(--text-h)] hover:bg-[var(--code-bg)]'
                  )}
                >
                  {labels[id] || id}
                </a>
              ))}
            </div>
          </div>

          <div className="flex md:hidden flex-1 items-center justify-end gap-3 mr-12 sm:mr-16">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center justify-center p-2 text-[var(--text)] hover:text-[var(--text-h)] transition-colors"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span className="relative flex h-5 w-5 flex-col items-center justify-center gap-[5px]">
                <span
                  className={cn(
                    'h-[2px] w-full rounded-full bg-current transition-all duration-300',
                    menuOpen ? 'translate-y-[7px] rotate-45' : ''
                  )}
                />
                <span
                  className={cn(
                    'h-[2px] w-full rounded-full bg-current transition-all duration-300',
                    menuOpen ? 'opacity-0' : ''
                  )}
                />
                <span
                  className={cn(
                    'h-[2px] w-full rounded-full bg-current transition-all duration-300',
                    menuOpen ? '-translate-y-[7px] -rotate-45' : ''
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className={cn(
              'fixed inset-x-0 top-[57px] bottom-0 z-50',
              'bg-[var(--bg)] backdrop-blur-xl border-t border-[var(--border)]'
            )}
          >
            <nav className="mx-auto max-w-7xl px-6 py-8" aria-label="Mobile navigation">
              <div className="space-y-1">
                {sectionIds.map((id, i) => (
                  <motion.a
                    key={id}
                    href={`#${id}`}
                    onClick={(e) => { e.preventDefault(); handleClick(id) }}
                    custom={i}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className={cn(
                      'flex items-center rounded-xl px-5 py-3.5 text-base font-medium transition-all duration-200 bg-[var(--code-bg)]',
                      active === id
                        ? 'text-[var(--accent)] bg-[var(--accent-bg)]'
                        : 'text-[var(--text)] hover:text-[var(--text-h)]'
                    )}
                  >
                    <span className="mr-4 text-xs font-mono text-[var(--text)]/50 tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {labels[id] || id}
                  </motion.a>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
