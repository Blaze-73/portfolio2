import { cn } from '../../lib/utils'

interface SectionHeaderProps {
  label?: string
  title: string
  subtitle?: string
  align?: 'center' | 'left'
  className?: string
}

export function SectionHeader({ label, title, subtitle, align = 'center', className }: SectionHeaderProps) {
  return (
    <div className={cn(
      'mb-16 md:mb-12',
      align === 'center' && 'text-center',
      className
    )}>
      {label && (
        <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
          {label}
        </span>
      )}
      <h2 className="text-4xl font-semibold tracking-tight text-[var(--text-h)] md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-[var(--text)]">
          {subtitle}
        </p>
      )}
    </div>
  )
}
