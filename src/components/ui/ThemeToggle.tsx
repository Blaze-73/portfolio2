import { useTheme } from '../../hooks/useTheme'
import { cn } from '../../lib/utils'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'relative flex h-7 w-12 items-center rounded-full border border-[var(--border)] transition-all duration-300',
        theme === 'dark' ? 'bg-[#1f2028]' : 'bg-[#f4f3ec]',
      )}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <span
        className={cn(
          'flex h-5 w-5 items-center justify-center rounded-full text-xs transition-all duration-300',
          theme === 'dark'
            ? 'translate-x-[1.375rem] bg-[#c084fc] text-[#16171d]'
            : 'translate-x-[0.1875rem] bg-[#aa3bff] text-white',
        )}
      >
        {theme === 'dark' ? '☾' : '☀'}
      </span>
    </button>
  )
}
