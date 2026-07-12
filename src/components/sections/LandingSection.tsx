import { motion } from 'framer-motion'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { GithubIcon, LinkedinIcon, MailIcon } from '../ui/Icons'
import LiquidEther from '../ui/LiquidEther'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { fadeUp, fadeIn, staggerContainer, springTransition } from '../../lib/animations'

const socialLinks = [
  { href: 'https://github.com/mouataz-bk', label: 'GitHub', Icon: GithubIcon },
  { href: 'https://linkedin.com/in/mouatazbk', label: 'LinkedIn', Icon: LinkedinIcon },
  { href: 'mailto:mouataz@example.com', label: 'Email', Icon: MailIcon },
]

export function LandingSection() {
  const reducedMotion = useReducedMotion()

  return (
    <section
      id="landing"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 z-0">
          <LiquidEther
            colors={['#aa3bff', '#7c3aed', '#5227FF']}
            autoDemo={!reducedMotion}
            resolution={0.35}
            mouseForce={15}
            cursorSize={80}
            autoSpeed={0.3}
            autoIntensity={1.5}
            takeoverDuration={0.3}
            autoResumeDelay={2000}
            style={{ opacity: 0.3 }}
          />
        </div>
        <div className="absolute -left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-[var(--accent)] opacity-[0.03] blur-[120px]" />
        <div className="absolute -right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-[var(--accent)] opacity-[0.02] blur-[100px]" />
      </div>

      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          <motion.span
            variants={fadeUp}
            transition={reducedMotion ? { duration: 0 } : springTransition}
            className="mb-6 inline-block text-sm font-medium uppercase tracking-[0.25em] text-[var(--accent)]"
          >
            Full Stack Web Developer
          </motion.span>

          <motion.h1
            variants={fadeUp}
            transition={reducedMotion ? { duration: 0 } : { ...springTransition, delay: 0.1 }}
            className="max-w-4xl text-5xl font-bold leading-tight tracking-tight text-[var(--text-h)] md:text-7xl lg:text-8xl"
          >
            Mouataz Billah{' '}
            <span className="text-[var(--accent)]">Kachkach</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={reducedMotion ? { duration: 0 } : { ...springTransition, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--text)] md:text-xl"
          >
            I transform ideas into polished web applications. I write clean,
            maintainable code and build smooth user experiences across the
            full stack.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={reducedMotion ? { duration: 0 } : { ...springTransition, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Button href="#projects">View Projects</Button>
            <Button href="#contact" variant="secondary">
              Contact Me
            </Button>
          </motion.div>

          <motion.div
            variants={fadeIn}
            transition={reducedMotion ? { duration: 0 } : { ...springTransition, delay: 0.5 }}
            className="mt-16 flex items-center gap-6"
          >
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-lg p-2 text-[var(--text)] transition-colors duration-300 hover:text-[var(--text-h)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                <Icon />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
