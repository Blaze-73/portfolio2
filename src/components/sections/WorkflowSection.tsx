import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'
import ScrollStack from '../ui/ScrollStack'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const colors = [
  { border: '#fb7185', bg: '#3b0f18', text: '#fb7185' },
  { border: '#fbbf24', bg: '#3b2f08', text: '#fbbf24' },
  { border: '#a3e635', bg: '#1d3b08', text: '#a3e635' },
  { border: '#2dd4bf', bg: '#083b33', text: '#2dd4bf' },
  { border: '#60a5fa', bg: '#0f233b', text: '#60a5fa' },
  { border: '#818cf8', bg: '#1a133b', text: '#818cf8' },
  { border: '#e879f9', bg: '#3b0f2d', text: '#e879f9' },
]

const workflowSteps = [
  { step: '01', title: 'Understand', description: 'I dive deep into client goals, project scope, and user needs — asking the right questions before a single line of code is written.' },
  { step: '02', title: 'Plan', description: 'I map out architecture, data flow, component trees, and API contracts — choosing the right stack for each unique challenge.' },
  { step: '03', title: 'Design', description: 'I craft clean, intuitive interfaces with attention to every micro-interaction, making sure the experience feels natural and polished.' },
  { step: '04', title: 'Frontend', description: 'I build reactive, type-safe frontends with React, Next.js, and TailwindCSS — optimised for both performance and developer experience.' },
  { step: '05', title: 'Backend', description: 'I design secure RESTful APIs, manage relational databases, and implement authentication using Laravel and Node.js.' },
  { step: '06', title: 'Test', description: 'I run through edge cases, write meaningful tests, and audit performance to catch issues before they ever reach production.' },
  { step: '07', title: 'Deploy', description: 'I deploy with confidence using CI/CD pipelines, monitor live behaviour, and iterate based on real user feedback.' },
]

export function WorkflowSection() {
  const reducedMotion = useReducedMotion()

  const renderCard = (step: typeof workflowSteps[number], i: number) => {
    const c = colors[i]
    return (
      <div
        key={step.step}
        className="relative overflow-hidden rounded-2xl border p-6 md:p-8"
        style={{
          borderColor: c.border,
          backgroundColor: c.bg,
        }}
      >
        <span
          className="absolute right-4 top-2 select-none text-[4.5rem]/none font-black leading-none opacity-10 md:text-[7rem]"
          style={{ color: c.text, fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}
        >
          {step.step}
        </span>
        <span
          className="relative mb-2 block text-xs font-semibold uppercase tracking-[0.2em]"
          style={{ color: c.text }}
        >
          Step {step.step}
        </span>
        <h3
          className="relative mb-3 text-2xl font-bold md:text-3xl"
          style={{ color: c.text }}
        >
          {step.title}
        </h3>
        <p className="relative max-w-2xl leading-relaxed opacity-85 text-[var(--text)]">
          {step.description}
        </p>
      </div>
    )
  }

  if (reducedMotion) {
    return (
      <Section id="workflow">
        <SectionHeader
          label="Workflow"
          title="How I work"
          subtitle="From understanding client needs to deploying polished products — a structured approach that ensures quality at every stage."
        />
        <div className="mt-16 space-y-6">
          {workflowSteps.map((step, i) => renderCard(step, i))}
        </div>
      </Section>
    )
  }

  return (
    <Section id="workflow">
      <SectionHeader
        label="Workflow"
        title="How I work"
        subtitle="From understanding client needs to deploying polished products — a structured approach that ensures quality at every stage."
      />

      <div className="mt-16">
        <ScrollStack
          useWindowScroll
          stackPosition="15%"
          scaleEndPosition="8%"
          baseScale={0.9}
          itemScale={0.025}
          itemStackDistance={40}
          itemDistance={120}
        >
          {workflowSteps.map((step, i) => (
            <div key={step.step}>
              {renderCard(step, i)}
            </div>
          ))}
        </ScrollStack>
      </div>
    </Section>
  )
}
