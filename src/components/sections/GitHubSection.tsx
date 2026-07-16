import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
} from 'react'
import { motion } from 'framer-motion'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'
import { Button } from '../ui/Button'
import { HoverCard } from '../ui/HoverCard'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import {
  staggerContainer,
  fadeUp,
  fadeIn,
  springTransition,
} from '../../lib/animations'

const stats = [
  { label: 'Repositories', value: 40, suffix: '+' },
  { label: 'Followers', value: 120, suffix: '+' },
  { label: 'Following', value: 60, suffix: '+' },
  { label: 'Contributions', value: 2500, suffix: '+' },
]

const repoLines = [
  { prefix: '$' as const, command: 'gh repo list --limit 3', highlight: false },
  { prefix: '>' as const, command: 'fleur-de-luxe', highlight: true },
  { prefix: '>' as const, command: 'ahayzone', highlight: false },
  { prefix: '>' as const, command: 'gym-management', highlight: false },
  { prefix: '$' as const, command: 'gh status', highlight: false },
  { prefix: '>' as const, command: 'All repositories up to date', highlight: false },
]

function useInView(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

function AnimatedCounter({
  value,
  suffix = '',
  label,
}: {
  value: number
  suffix: string
  label: string
}) {
  const { ref, inView } = useInView(0.5)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const steps = 40
    const stepValue = value / steps
    let current = 0
    const interval = setInterval(() => {
      current += stepValue
      if (current >= value) {
        setCount(value)
        clearInterval(interval)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(interval)
  }, [inView, value])

  const display =
    value >= 1000
      ? `${(count / 1000).toFixed(1)}k`
      : String(count)

  return (
    <div ref={ref} className="p-5 text-center">
      <span className="block text-2xl font-bold text-[var(--text-h)] tabular-nums">
        {display}
        {suffix}
      </span>
      <span className="mt-1 block text-xs uppercase tracking-[0.1em] text-[var(--text)]">
        {label}
      </span>
    </div>
  )
}

function TypewriterLine({
  prefix,
  command,
  highlight,
  active,
  isTyping,
  speed,
  onDone,
}: {
  prefix: '$' | '>'
  command: string
  highlight?: boolean
  active: boolean
  isTyping: boolean
  speed: number
  onDone: () => void
}) {
  const [text, setText] = useState('')
  const doneRef = useRef(false)

  useEffect(() => {
    if (!active || doneRef.current) return
    if (!isTyping) {
      setText(command)
      return
    }
    let i = 0
    const interval = setInterval(() => {
      i++
      setText(command.slice(0, i))
      if (i >= command.length) {
        clearInterval(interval)
        doneRef.current = true
        onDone()
      }
    }, speed)
    return () => clearInterval(interval)
  }, [active, isTyping, command, speed, onDone])

  return (
    <div className="flex gap-2 min-h-[1.25em]" aria-label={active ? command : ''}>
      <span
        className={
          prefix === '$' ? 'text-green-500' : 'text-[var(--text)]'
        }
      >
        {prefix}
      </span>
      <span
        className={
          highlight ? 'text-[var(--accent)]' : 'text-[var(--text-h)]'
        }
      >
        {text}
        {isTyping && text.length < command.length && (
          <span className="animate-pulse ml-px text-[var(--text)]">▊</span>
        )}
      </span>
    </div>
  )
}

function TerminalWindow({ reducedMotion }: { reducedMotion: boolean }) {
  const { ref, inView } = useInView(0.3)
  const [activeLine, setActiveLine] = useState(-1)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    return () => timersRef.current.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (!inView || reducedMotion) {
      if (reducedMotion) setActiveLine(repoLines.length)
      return
    }
    const t = setTimeout(() => setActiveLine(0), 400)
    timersRef.current.push(t)
    return () => clearTimeout(t)
  }, [inView, reducedMotion])

  const handleLineDone = useCallback(
    (i: number) => {
      if (i >= repoLines.length - 1) return
      const delay = repoLines[i + 1].prefix === '$' ? 350 : 150
      const t = setTimeout(
        () => setActiveLine((prev) => Math.max(prev, i + 1)),
        delay,
      )
      timersRef.current.push(t)
    },
    [],
  )

  return (
    <div ref={ref} className="overflow-hidden rounded-2xl bg-[var(--code-bg)]">
      <div className="flex items-center gap-1.5 border-b border-[var(--border)] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-yellow-400" />
        <span className="h-3 w-3 rounded-full bg-green-400" />
        <span className="ml-2 text-xs text-[var(--text)]">terminal</span>
      </div>

      <div className="space-y-2 p-4 font-mono text-sm leading-relaxed min-h-[180px]">
        {repoLines.map((line, i) =>
          reducedMotion ? (
            <div key={i} className="flex gap-2">
              <span
                className={
                  line.prefix === '$'
                    ? 'text-green-500'
                    : 'text-[var(--text)]'
                }
              >
                {line.prefix}
              </span>
              <span
                className={
                  line.highlight
                    ? 'text-[var(--accent)]'
                    : 'text-[var(--text-h)]'
                }
              >
                {line.command}
              </span>
            </div>
          ) : (
            <TypewriterLine
              key={i}
              prefix={line.prefix}
              command={line.command}
              highlight={line.highlight}
              active={i <= activeLine}
              isTyping={i === activeLine}
              speed={line.prefix === '$' ? 25 : 15}
              onDone={() => handleLineDone(i)}
            />
          ),
        )}
        {activeLine >= repoLines.length && !reducedMotion && (
          <div className="flex gap-2 text-[var(--text)]">
            <span className="text-green-500">$</span>
            <span className="animate-pulse">▊</span>
          </div>
        )}
      </div>
    </div>
  )
}

function ContributionGrid() {
  const { ref, inView } = useInView(0.3)
  const weeks = 26
  const days = 7

  const grid = Array.from({ length: weeks }, () =>
    Array.from({ length: days }, () => Math.floor(Math.random() * 5)),
  )

  const getColor = (level: number) => {
    if (level === 0) return 'var(--border)'
    if (level === 1) return 'rgba(170, 59, 255, 0.15)'
    if (level === 2) return 'rgba(170, 59, 255, 0.3)'
    if (level === 3) return 'rgba(170, 59, 255, 0.55)'
    return 'var(--accent)'
  }

  return (
    <div ref={ref} className="p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-[0.1em] text-[var(--text)]">
          Contribution Activity
        </span>
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-[var(--text)]">Less</span>
          {[0, 1, 2, 3, 4].map((l) => (
            <span
              key={l}
              className="inline-block rounded-sm"
              style={{
                width: 10,
                height: 10,
                backgroundColor: getColor(l),
              }}
            />
          ))}
          <span className="text-[10px] text-[var(--text)]">More</span>
        </div>
      </div>
      <motion.div
        className="flex gap-[3px]"
        initial={inView ? {} : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        {grid.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((day, di) => (
              <span
                key={di}
                className="rounded-sm"
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: getColor(day),
                  transition: 'background-color 0.3s ease',
                }}
              />
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export function GitHubSection() {
  const reducedMotion = useReducedMotion()

  return (
    <Section id="github">
      <SectionHeader
        label="GitHub"
        title="Open source & contributions"
        subtitle="Building real-world projects and contributing to the developer community."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="mt-16 grid gap-6 lg:grid-cols-5"
      >
        <div className="flex flex-col gap-6 lg:col-span-2">
          <HoverCard>
            <div className="grid grid-cols-2">
              {stats.map((stat) => (
                <AnimatedCounter
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              ))}
            </div>
          </HoverCard>

          <motion.div
            variants={fadeUp}
            transition={
              reducedMotion ? { duration: 0 } : { ...springTransition, delay: 0.2 }
            }
          >
            <Button href="https://github.com/mouataz-bk" variant="secondary">
              View GitHub Profile →
            </Button>
          </motion.div>
        </div>

        <motion.div
          variants={fadeIn}
          transition={
            reducedMotion ? { duration: 0 } : { ...springTransition, delay: 0.15 }
          }
          className="flex flex-col gap-6 lg:col-span-3"
        >
          <HoverCard>
            <TerminalWindow reducedMotion={reducedMotion} />
          </HoverCard>

          <HoverCard>
            <ContributionGrid />
          </HoverCard>
        </motion.div>
      </motion.div>
    </Section>
  )
}
