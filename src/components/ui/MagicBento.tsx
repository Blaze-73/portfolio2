import {
  useRef,
  useEffect,
  useState,
  type ReactNode,
  type HTMLAttributes,
} from 'react'
import { gsap } from 'gsap'
import './MagicBento.css'

const MOBILE_BREAKPOINT = 768

export interface Project {
  title: string
  description: string
  technologies: string[]
  github?: string
  demo?: string
  image?: string
}

interface MagicBentoProps {
  projects: Project[]
  textAutoHide?: boolean
  enableStars?: boolean
  enableSpotlight?: boolean
  enableBorderGlow?: boolean
  enableTilt?: boolean
  enableMagnetism?: boolean
  spotlightRadius?: number
  particleCount?: number
  glowColor?: string
  onProjectClick?: (project: Project) => void
}

function createParticle(x: number, y: number, color: string) {
  const el = document.createElement('div')
  el.className = 'mb-particle'
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 10;
    left: ${x}px;
    top: ${y}px;
  `
  return el
}

function updateGlow(
  card: HTMLElement,
  mx: number,
  my: number,
  intensity: number,
  radius: number,
) {
  const rect = card.getBoundingClientRect()
  const rx = ((mx - rect.left) / rect.width) * 100
  const ry = ((my - rect.top) / rect.height) * 100
  card.style.setProperty('--glow-x', `${rx}%`)
  card.style.setProperty('--glow-y', `${ry}%`)
  card.style.setProperty('--glow-intensity', intensity.toString())
  card.style.setProperty('--glow-radius', `${radius}px`)
}

function ParticleCard({
  children,
  className = '',
  disableAnimations = false,
  particleCount = 12,
  glowColor = '132, 0, 255',
  enableTilt = true,
  enableMagnetism = false,
  onClick,
}: {
  children: ReactNode
  className?: string
  disableAnimations?: boolean
  particleCount?: number
  glowColor?: string
  enableTilt?: boolean
  enableMagnetism?: boolean
  onClick?: () => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLElement[]>([])
  const timeoutsRef = useRef<number[]>([])
  const isHovered = useRef(false)
  const memoizedParticles = useRef<HTMLElement[]>([])
  const initialized = useRef(false)
  const magAnim = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el || disableAnimations) return

    const initParticles = () => {
      if (initialized.current) return
      const { width, height } = el.getBoundingClientRect()
      memoizedParticles.current = Array.from({ length: particleCount }, () =>
        createParticle(Math.random() * width, Math.random() * height, glowColor),
      )
      initialized.current = true
    }

    const clearParticles = () => {
      timeoutsRef.current.forEach(clearTimeout)
      timeoutsRef.current = []
      magAnim.current?.kill()
      particlesRef.current.forEach((p) => {
        gsap.to(p, {
          scale: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'back.in(1.7)',
          onComplete: () => p.parentNode?.removeChild(p),
        })
      })
      particlesRef.current = []
    }

    const animateParticles = () => {
      if (!el || !isHovered.current) return
      if (!initialized.current) initParticles()

      memoizedParticles.current.forEach((particle, i) => {
        const tid = window.setTimeout(() => {
          if (!isHovered.current || !el) return
          const clone = particle.cloneNode(true) as HTMLElement
          el.appendChild(clone)
          particlesRef.current.push(clone)

          gsap.fromTo(
            clone,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' },
          )
          gsap.to(clone, {
            x: (Math.random() - 0.5) * 100,
            y: (Math.random() - 0.5) * 100,
            rotation: Math.random() * 360,
            duration: 2 + Math.random() * 2,
            ease: 'none',
            repeat: -1,
            yoyo: true,
          })
          gsap.to(clone, {
            opacity: 0.3,
            duration: 1.5,
            ease: 'power2.inOut',
            repeat: -1,
            yoyo: true,
          })
        }, i * 100)
        timeoutsRef.current.push(tid)
      })
    }

    const onEnter = () => {
      isHovered.current = true
      animateParticles()
      if (enableTilt) {
        gsap.to(el, {
          rotateX: 5,
          rotateY: 5,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 1000,
        })
      }
    }

    const onLeave = () => {
      isHovered.current = false
      clearParticles()
      if (enableTilt) {
        gsap.to(el, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: 'power2.out',
        })
      }
      if (enableMagnetism) {
        gsap.to(el, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' })
      }
    }

    const onMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const cx = rect.width / 2
      const cy = rect.height / 2

      if (enableTilt) {
        gsap.to(el, {
          rotateX: ((y - cy) / cy) * -10,
          rotateY: ((x - cx) / cx) * 10,
          duration: 0.1,
          ease: 'power2.out',
          transformPerspective: 1000,
        })
      }
      if (enableMagnetism) {
        magAnim.current = gsap.to(el, {
          x: (x - cx) * 0.05,
          y: (y - cy) * 0.05,
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    }

    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    el.addEventListener('mousemove', onMove)

    return () => {
      isHovered.current = false
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
      el.removeEventListener('mousemove', onMove)
      clearParticles()
    }
  }, [disableAnimations, enableTilt, enableMagnetism, particleCount, glowColor])

  return (
    <div
      ref={cardRef}
      className={`mb-particle-container ${className}`.trim()}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick?.()
      }}
    >
      {children}
    </div>
  )
}

function GlobalSpotlight({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = 300,
  glowColor = '132, 0, 255',
}: {
  gridRef: React.RefObject<HTMLDivElement | null>
  disableAnimations?: boolean
  enabled?: boolean
  spotlightRadius?: number
  glowColor?: string
}) {
  const spotlightRef = useRef<HTMLDivElement | null>(null)
  const inside = useRef(false)

  useEffect(() => {
    if (disableAnimations || !gridRef.current || !enabled) return

    const spotlight = document.createElement('div')
    spotlight.className = 'mb-global-spotlight'
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.15) 0%,
        rgba(${glowColor}, 0.08) 15%,
        rgba(${glowColor}, 0.04) 25%,
        rgba(${glowColor}, 0.02) 40%,
        rgba(${glowColor}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
      will-change: transform, opacity;
    `
    document.body.appendChild(spotlight)
    spotlightRef.current = spotlight

    const proximity = spotlightRadius * 0.5
    const fadeDistance = spotlightRadius * 0.75

    let moveRaf: number | null = null

    const onMove = (e: MouseEvent) => {
      if (moveRaf) cancelAnimationFrame(moveRaf)
      moveRaf = requestAnimationFrame(() => {
        moveRaf = null
        if (!spotlightRef.current || !gridRef.current) return
        const section = gridRef.current.closest('.mb-bento-section') as HTMLElement | null
        const rect = section?.getBoundingClientRect()
        const mouseInside =
          rect &&
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom

        inside.current = mouseInside || false
        const cards = gridRef.current.querySelectorAll<HTMLElement>('.mb-particle-container')

        if (!mouseInside) {
          gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3, ease: 'power2.out' })
          cards.forEach((c) => c.style.setProperty('--glow-intensity', '0'))
          return
        }

        let minDist = Infinity
        cards.forEach((card) => {
          const cr = card.getBoundingClientRect()
          const cx = cr.left + cr.width / 2
          const cy = cr.top + cr.height / 2
          const dist = Math.max(
            0,
            Math.hypot(e.clientX - cx, e.clientY - cy) -
              Math.max(cr.width, cr.height) / 2,
          )
          minDist = Math.min(minDist, dist)

          let intensity = 0
          if (dist <= proximity) intensity = 1
          else if (dist <= fadeDistance)
            intensity = (fadeDistance - dist) / (fadeDistance - proximity)

          updateGlow(card, e.clientX, e.clientY, intensity, spotlightRadius)
        })

        gsap.to(spotlightRef.current, {
          left: e.clientX,
          top: e.clientY,
          duration: 0.1,
          ease: 'power2.out',
        })

        const opacity =
          minDist <= proximity
            ? 0.8
            : minDist <= fadeDistance
              ? ((fadeDistance - minDist) / (fadeDistance - proximity)) * 0.8
              : 0

        gsap.to(spotlightRef.current, {
          opacity,
          duration: opacity > 0 ? 0.2 : 0.5,
          ease: 'power2.out',
        })
      })
    }

    const onLeave = () => {
      inside.current = false
      gridRef.current
        ?.querySelectorAll<HTMLElement>('.mb-particle-container')
        .forEach((c) => c.style.setProperty('--glow-intensity', '0'))
      if (spotlightRef.current)
        gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3, ease: 'power2.out' })
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)

    return () => {
      if (moveRaf) cancelAnimationFrame(moveRaf)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current)
    }
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor])

  return null
}

function useMobile() {
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    const check = () => setMobile(window.innerWidth <= MOBILE_BREAKPOINT)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return mobile
}

export function MagicBento({
  projects,
  textAutoHide = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  enableTilt = true,
  enableMagnetism = true,
  spotlightRadius = 300,
  particleCount = 12,
  glowColor = '132, 0, 255',
  onProjectClick,
}: MagicBentoProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()
  const disabled = isMobile

  if (!projects.length) return null

  return (
    <>
      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={disabled}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}

      <div
        ref={gridRef}
        className="mb-bento-section"
        style={
          {
            '--glow-color': glowColor,
          } as HTMLAttributes<HTMLDivElement>['style']
        }
      >
        <div className="mb-grid">
          {projects.map((project) => (
            <ParticleCard
              key={project.title}
              className={`mb-card ${textAutoHide ? 'mb-card--autohide' : ''} ${enableBorderGlow ? 'mb-card--border-glow' : ''}`}
              disableAnimations={disabled}
              particleCount={particleCount}
              glowColor={glowColor}
              enableTilt={enableTilt}
              enableMagnetism={enableMagnetism}
              onClick={() => onProjectClick?.(project)}
            >
              {project.image && (
                <img
                  src={project.image}
                  alt=""
                  className="mb-card-bg"
                  aria-hidden="true"
                  loading="lazy"
                />
              )}
              <div className="mb-card-overlay" />
              <div className="mb-card-body">
                <h3 className="mb-card-title">{project.title}</h3>
                <p className="mb-card-desc">{project.description}</p>
                <div className="mb-card-tech">
                  {project.technologies.map((t) => (
                    <span key={t} className="mb-card-tech-badge">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </ParticleCard>
          ))}
        </div>
      </div>
    </>
  )
}
