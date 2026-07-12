import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface BadgeProps {
  children: ReactNode
  className?: string
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--code-bg)] px-3 py-1 text-xs font-medium text-[var(--text)]',
        className
      )}
    >
      {children}
    </span>
  )
}
