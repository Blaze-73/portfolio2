import { useState, useEffect, useCallback } from 'react'
import { cn } from '../../lib/utils'
import { ThemeToggle } from './ThemeToggle'
import { GithubIcon } from './Icons'

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
              <a
                href="https://github.com/Blaze-73"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-[var(--text)] transition-all duration-200 hover:text-[var(--accent)] hover:bg-[var(--code-bg)]"
                aria-label="GitHub profile"
              >
                <GithubIcon />
              </a>
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
                  aria-current={active === id ? 'true' : undefined}
                >
                  {labels[id] || id}
                </a>
              ))}
            </div>
          </div>

          <div className="flex md:hidden flex-1 items-center justify-end gap-3">
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

      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={cn(
          'absolute inset-x-0 top-full z-50 min-h-[calc(100dvh-57px)] max-h-[calc(100dvh-57px)] overflow-y-auto overscroll-contain',
          'bg-[var(--bg)] border-t border-[var(--border)] shadow-lg transition-[opacity,transform] duration-300 md:hidden',
          menuOpen
            ? 'visible translate-y-0 opacity-100'
            : 'pointer-events-none invisible -translate-y-2 opacity-0'
        )}
      >
        <nav className="mx-auto max-w-7xl px-6 py-8" aria-label="Mobile navigation">
          <div className="mb-6 flex items-center gap-3 px-5">
            <a
              href="https://github.com/Blaze-73"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--code-bg)] text-[var(--text)] transition-all duration-200 hover:text-[var(--accent)]"
              aria-label="GitHub profile"
            >
              <GithubIcon />
            </a>
          </div>
          <div className="space-y-1">
            {sectionIds.map((id, i) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => { e.preventDefault(); handleClick(id) }}
                style={{ transitionDelay: menuOpen ? `${i * 30}ms` : '0ms' }}
                className={cn(
                  'flex items-center rounded-xl px-5 py-3.5 text-base font-medium transition-all duration-200',
                  menuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0',
                  active === id
                    ? 'text-[var(--accent)] bg-[var(--accent-bg)]'
                    : 'text-[var(--text)] bg-[var(--code-bg)] hover:text-[var(--text-h)]'
                )}
                aria-current={active === id ? 'true' : undefined}
              >
                <span className="mr-4 text-xs font-mono text-[var(--text)]/50 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {labels[id] || id}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </nav>
  )
}
