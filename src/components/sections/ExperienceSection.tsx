import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'
import { Badge } from '../ui/Badge'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const experiences = [
  {
    period: '2023',
    title: 'FST Tangier — Algorithms & Problem Solving',
    description:
      'Studied at FST Tangier where I discovered algorithms and problem-solving. This is where I fell in love with coding and started my journey into software development.',
    tags: ['Algorithms', 'Problem Solving', 'C'],
  },
  {
    period: '2024',
    title: 'ISMONTIC Tangier — Web Development Foundations',
    description:
      'Started learning web development from scratch at ISMONTIC Tangier. Covered the fundamentals: HTML, CSS, and JavaScript, building a strong base for modern web development.',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    period: '2024',
    title: 'ISMONTIC — Security & Kali Linux',
    description:
      'Studied security vulnerabilities and ethical hacking using Kali Linux. Learned to understand and test system security, gaining insights into how applications are attacked and defended.',
    tags: ['Security', 'Kali Linux', 'Vulnerabilities'],
  },
  {
    period: '2025 — Present',
    title: 'ISMONTIC — Full Stack Development',
    description:
      'Second year focused on building real-world projects using modern frameworks. Applying all the knowledge gathered — from frontend to backend — to create complete full-stack applications.',
    tags: ['React', 'Next.js', 'Laravel', 'Full Stack'],
  },
]

function useActiveIndex(containerRef: React.RefObject<HTMLDivElement | null>, count: number) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const cards = el.querySelectorAll<HTMLElement>('[data-card]')
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const i = Number((entry.target as HTMLElement).dataset.card)
            setActive(i)
          }
        }
      },
      { threshold: 0, rootMargin: '-40% 0px -40% 0px' },
    )
    cards.forEach((c) => obs.observe(c))
    return () => obs.disconnect()
  }, [containerRef, count])

  return active
}

export function ExperienceSection() {
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [sectionTop, setSectionTop] = useState(0)

  const activeIndex = useActiveIndex(sectionRef, experiences.length)

  useEffect(() => {
    const update = () => {
      if (sectionRef.current) {
        setSectionTop(sectionRef.current.getBoundingClientRect().top + window.scrollY)
      }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const { scrollY } = useScroll()
  const sectionProgress = useTransform(scrollY, [sectionTop, sectionTop + experiences.length * window.innerHeight], [0, 1])

  return (
    <Section id="experience">
      <SectionHeader
        label="Experience"
        title="Professional journey"
        subtitle="My journey as a developer through education and real project experience."
      />

      <div ref={sectionRef} className="relative mt-16" style={{ height: `${experiences.length * 120}vh` }}>
        <div className="sticky top-24 flex items-start overflow-hidden" style={{ height: 'calc(100vh - 12rem)' }}>
          <div className="relative flex w-full gap-8" style={{ minHeight: 0 }}>
            {/* Timeline bar */}
            <div className="relative hidden w-0.5 shrink-0 md:block">
              <div className="absolute inset-0 bg-[var(--border)]" />
              <motion.div
                className="absolute left-0 top-0 w-full bg-[var(--accent)]"
                style={{ height: useTransform(sectionProgress, [0, 1], ['0%', '100%']) }}
              />
            </div>

            <div className="flex w-full flex-col gap-6">
              {experiences.map((exp, i) => (
                <div
                  key={exp.title}
                  data-card={i}
                  className="w-full"
                  style={{
                    position: 'sticky',
                    top: `${60 + i * 40}px`,
                    zIndex: experiences.length - i,
                  }}
                >
                  <motion.div
                    initial={reducedMotion ? false : { opacity: 0, y: 30 }}
                    animate={
                      reducedMotion
                        ? {}
                        : {
                            opacity: i <= activeIndex ? 1 : 0.2,
                            y: i <= activeIndex ? 0 : 20,
                            scale: i <= activeIndex ? 1 : 0.95,
                          }
                    }
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    className="overflow-hidden rounded-2xl border bg-[var(--bg)] transition-colors duration-300"
                    style={{
                      borderColor:
                        i === activeIndex ? 'var(--accent-border)' : 'var(--border)',
                      boxShadow:
                        i === activeIndex
                          ? '0 8px 30px rgba(var(--accent-rgb, 170, 59, 255), 0.12)'
                          : 'none',
                    }}
                  >
                    <div className="p-6 md:p-8">
                      <span className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-[var(--accent)]">
                        {exp.period}
                      </span>
                      <h3 className="text-lg font-semibold text-[var(--text-h)] transition-colors duration-300">
                        {exp.title}
                      </h3>
                      <p className="mt-3 leading-relaxed text-[var(--text)]">
                        {exp.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {exp.tags.map((tag) => (
                          <Badge key={tag}>{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
