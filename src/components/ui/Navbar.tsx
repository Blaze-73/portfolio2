import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'

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
  numbers: 'Numbers',
  contact: 'Contact',
}

function Hamburger({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-5 w-5 flex-col items-center justify-center gap-[5px]">
      <span
        className={cn(
          'h-[2px] w-full rounded-full bg-current transition-all duration-300',
          open ? 'translate-y-[7px] rotate-45' : ''
        )}
      />
      <span
        className={cn(
          'h-[2px] w-full rounded-full bg-current transition-all duration-300',
          open ? 'opacity-0' : ''
        )}
      />
      <span
        className={cn(
          'h-[2px] w-full rounded-full bg-current transition-all duration-300',
          open ? '-translate-y-[7px] -rotate-45' : ''
        )}
      />
    </span>
  )
}

export function Navbar({ sectionIds }: NavbarProps) {
  const [active, setActive] = useState('landing')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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

  const handleClick = (id: string) => {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-[60] transition-all duration-300',
        scrolled || menuOpen
          ? 'bg-[var(--bg)]/85 backdrop-blur-xl border-b border-[var(--border)] shadow-sm'
          : 'bg-[var(--bg)]/50 backdrop-blur-sm'
      )}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between md:justify-center md:gap-10 py-3">
          <a
            href="#landing"
            onClick={(e) => { e.preventDefault(); handleClick('landing') }}
            className="text-sm font-bold tracking-tight text-[var(--text-h)] transition-colors hover:text-[var(--accent)]"
          >
            MBK
          </a>

          <div className="hidden md:flex items-center gap-1">
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

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex md:hidden items-center justify-center p-1.5 text-[var(--text)] hover:text-[var(--text-h)] transition-colors"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <Hamburger open={menuOpen} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden border-t border-[var(--border)]/50"
          >
            <div className="mx-auto max-w-7xl px-6 py-4 space-y-1">
              {sectionIds.map((id, i) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => { e.preventDefault(); handleClick(id) }}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.2, delay: i * 0.04 }}
                  className={cn(
                    'block rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200',
                    active === id
                      ? 'text-[var(--accent)] bg-[var(--accent-bg)]'
                      : 'text-[var(--text)] hover:text-[var(--text-h)] hover:bg-[var(--code-bg)]'
                  )}
                >
                  {labels[id] || id}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
