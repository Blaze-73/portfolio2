import { motion } from 'framer-motion'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'
import { AnimatedCard } from '../ui/AnimatedCard'
import { staggerContainer } from '../../lib/animations'

const cards = [
  {
    title: 'Education',
    items: [
      'OFPPT ISMONTIC — Software Development Full Stack',
      'Building real-world applications across the stack',
      'Continuous learning through projects and open source',
    ],
  },
  {
    title: 'Current Focus',
    items: [
      'Crafting modern interfaces with React & Next.js',
      'Building complete full-stack applications',
      'Seeking freelance and junior developer opportunities',
    ],
  },
  {
    title: 'Goals',
    items: [
      'Deliver high-quality web applications for clients',
      'Grow as a full-stack engineer',
      'Contribute to meaningful real-world projects',
    ],
  },
]

export function AboutSection() {
  return (
    <Section id="about">
      <SectionHeader
        label="About"
        title="About me"
        subtitle="I am a Full Stack Web Developer who enjoys transforming ideas into polished web applications. I focus on writing clean, maintainable code while creating smooth user experiences across both frontend and backend."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="mt-16 grid gap-6 md:grid-cols-3"
      >
        {cards.map((card) => (
          <AnimatedCard key={card.title}>
            <h3 className="mb-4 text-lg font-semibold text-[var(--text-h)]">
              {card.title}
            </h3>
            <ul className="space-y-3">
              {card.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[var(--text)]">
                  <span
                    className="mt-1.5 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--accent)]"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </AnimatedCard>
        ))}
      </motion.div>
    </Section>
  )
}
