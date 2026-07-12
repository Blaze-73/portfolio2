import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { Container } from './Container'

interface SectionProps {
  id?: string
  children: ReactNode
  className?: string
  containerClassName?: string
}

export function Section({ id, children, className, containerClassName }: SectionProps) {
  return (
    <section id={id} className={cn('py-24 md:py-20 sm:py-16', className)}>
      <Container className={containerClassName}>
        {children}
      </Container>
    </section>
  )
}
