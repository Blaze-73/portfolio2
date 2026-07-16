import { useState } from 'react'
import { motion } from 'framer-motion'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'
import { Button } from '../ui/Button'
import { GithubIcon, LinkedinIcon, MailIcon, LocationIcon } from '../ui/Icons'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import {
  staggerContainer,
  fadeLeft,
  fadeRight,
  springTransition,
} from '../../lib/animations'

type FormState = {
  name: string
  email: string
  message: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

const initialForm: FormState = { name: '', email: '', message: '' }

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {}
  if (!form.name.trim()) errors.name = 'Name is required'
  if (!form.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Invalid email address'
  }
  if (!form.message.trim()) errors.message = 'Message is required'
  return errors
}

export function ContactSection() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const reducedMotion = useReducedMotion()

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validation = validate(form)
    if (Object.keys(validation).length > 0) {
      setErrors(validation)
      return
    }
    setSubmitted(true)
  }

  const infoItems = [
    { icon: MailIcon, label: 'kachkachmouataz@gmail.com', href: 'mailto:kachkachmouataz@gmail.com' },
    { icon: GithubIcon, label: 'github.com/Blaze-73', href: 'https://github.com/Blaze-73' },
    { icon: LinkedinIcon, label: 'linkedin.com/in/mouataz-billah-kachkach-67dih', href: 'https://linkedin.com/in/mouataz-billah-kachkach-67dih' },
    { icon: LocationIcon, label: 'Morocco — Remote / Worldwide', href: undefined },
  ]

  return (
    <Section id="contact">
      <SectionHeader
        label="Contact"
        title="Let's work together"
        subtitle="Looking for a developer? Let's talk about your project."
        align="center"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-16"
      >
        <motion.div
          variants={fadeLeft}
          transition={reducedMotion ? { duration: 0 } : springTransition}
        >
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-[var(--text)]">
              I am currently seeking freelance opportunities and a Junior
              Full Stack Developer position. If you have a project or an
              idea, I would love to hear about it.
            </p>

            <div className="space-y-4">
              {infoItems.map(({ icon: Icon, label, href }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--accent)]">
                    <Icon />
                  </span>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--text)] transition-colors duration-300 hover:text-[var(--text-h)]"
                    >
                      {label}
                    </a>
                  ) : (
                    <span className="text-[var(--text)]">{label}</span>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--accent-bg)] to-transparent p-6">
              <p className="text-sm font-medium text-[var(--text-h)]">
                Looking for a reliable developer?
              </p>
              <p className="mt-1 text-sm text-[var(--text)]">
                Let's build something great together.
              </p>
              <Button href="mailto:kachkachmouataz@gmail.com" className="mt-4">
                Start a Conversation
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeRight}
          transition={reducedMotion ? { duration: 0 } : springTransition}
        >
          {submitted ? (
            <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-8 text-center shadow-sm">
              <div>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-h)]">
                  Message sent!
                </h3>
                <p className="mt-2 text-[var(--text)]">
                  Thanks for reaching out. I'll get back to you soon.
                </p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-sm font-medium text-[var(--text-h)]"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[var(--text-h)] transition-colors duration-300 placeholder:text-[var(--text)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block text-sm font-medium text-[var(--text-h)]"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[var(--text-h)] transition-colors duration-300 placeholder:text-[var(--text)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm font-medium text-[var(--text-h)]"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[var(--text-h)] transition-colors duration-300 placeholder:text-[var(--text)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                  placeholder="Tell me about your project..."
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-500">{errors.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </Section>
  )
}
