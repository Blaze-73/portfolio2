import { motion } from 'framer-motion'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { GithubIcon, LinkedinIcon, MailIcon } from '../ui/Icons'
import { TechMarquee } from './TechMarquee'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { fadeUp, fadeIn, staggerContainer, springTransition } from '../../lib/animations'

const socialLinks = [
  { href: 'https://github.com/Blaze-73', label: 'GitHub', Icon: GithubIcon },
  { href: 'https://linkedin.com/in/mouataz-billah-kachkach-67dih', label: 'LinkedIn', Icon: LinkedinIcon },
  { href: 'mailto:kachkachmouataz@gmail.com', label: 'Email', Icon: MailIcon },
]

export function LandingSection() {
  const reducedMotion = useReducedMotion()

  return (
    <section
      id="landing"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div className="absolute -left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-[var(--accent)] opacity-[0.03] blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="absolute -right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-[var(--accent)] opacity-[0.02] blur-[100px] pointer-events-none" aria-hidden="true" />

      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
          style={{ willChange: 'transform' }}
        >
          <motion.div
            variants={fadeUp}
            transition={reducedMotion ? { duration: 0 } : springTransition}
            className="flex items-center justify-center gap-5 md:gap-8 lg:gap-10"
          >
            <img
              src="/images/pfp.png"
              alt="Mouataz Billah Kachkach"
              fetchPriority="high"
              className="h-36 w-36 flex-shrink-0 object-cover aspect-square ring-4 ring-[var(--accent)]/20 md:h-48 md:w-48 lg:h-56 lg:w-56"
            />
            <div className="text-left">
              <span className="mb-2 block text-sm font-medium uppercase tracking-[0.25em] text-[var(--accent)]">
                Full Stack Web Developer
              </span>
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-[var(--text-h)] md:text-5xl lg:text-6xl">
                Mouataz Billah{' '}
                <span className="text-[var(--accent)]">Kachkach</span>
              </h1>
            </div>
          </motion.div>

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

      <div className="absolute bottom-0 left-0 right-0">
        <TechMarquee bordered={false} />
      </div>
    </section>
  )
}
