import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { GithubIcon, LinkedinIcon, MailIcon } from '../ui/Icons'
import { TechMarquee } from './TechMarquee'

const socialLinks = [
  { href: 'https://github.com/Blaze-73', label: 'GitHub', Icon: GithubIcon },
  { href: 'https://linkedin.com/in/mouataz-billah-kachkach-67dih', label: 'LinkedIn', Icon: LinkedinIcon },
  { href: 'mailto:kachkachmouataz@gmail.com', label: 'Email', Icon: MailIcon },
]

export function LandingSection() {
  return (
    <section
      id="landing"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div className="absolute -left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-[var(--accent)] opacity-[0.03] blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="absolute -right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-[var(--accent)] opacity-[0.02] blur-[100px] pointer-events-none" aria-hidden="true" />

      <Container>
        <div className="flex flex-col items-center text-center">
          <div className="hero-rise flex flex-col items-center justify-center gap-6 text-center md:flex-row md:gap-8 md:text-left lg:gap-10">
            <img
              src="/images/pfp.jpeg"
              alt="Mouataz Billah Kachkach"
              width={224}
              height={224}
              fetchPriority="high"
              decoding="async"
              className="h-32 w-32 flex-shrink-0 object-cover object-top aspect-square ring-4 ring-[var(--accent)]/20 md:h-48 md:w-48 lg:h-56 lg:w-56"
            />
            <div className="text-center md:text-left">
              <span className="mb-2 block text-xs font-medium uppercase tracking-[0.25em] text-[var(--accent)] sm:text-sm">
                Full Stack Web Developer
              </span>
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-[var(--text-h)] sm:text-4xl md:text-5xl lg:text-6xl">
                Mouataz Billah{' '}
                <span className="text-[var(--accent)]">Kachkach</span>
              </h1>
            </div>
          </div>

          <p className="hero-text-in mt-6 max-w-xl text-lg leading-relaxed text-[var(--text)] md:text-xl">
            I build web apps that feel good to use — from the interface down
            to the code behind it. I like clean solutions, small details, and
            shipping things that actually help someone.
          </p>

          <div className="hero-rise hero-delay-1 mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href="#projects">View Projects</Button>
            <Button href="#contact" variant="secondary">
              Contact Me
            </Button>
          </div>

          <div className="hero-rise hero-delay-2 mt-16 flex items-center gap-6">
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
          </div>
        </div>
      </Container>

      <div className="absolute bottom-0 left-0 right-0">
        <TechMarquee bordered={false} />
      </div>
    </section>
  )
}
