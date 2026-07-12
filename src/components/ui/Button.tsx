import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  href?: string
  className?: string
  onClick?: () => void
}

const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]'

const variants = {
  primary:
    'bg-[var(--accent)] text-white hover:opacity-90 shadow-sm hover:shadow-md active:scale-[0.98]',
  secondary:
    'border border-[var(--border)] text-[var(--text-h)] hover:border-[var(--accent)] hover:text-[var(--accent)]',
  ghost: 'text-[var(--text)] hover:text-[var(--text-h)]',
}

export function Button({ children, variant = 'primary', href, className, onClick }: ButtonProps) {
  const classes = cn(baseStyles, variants[variant], className)

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
