import { useEffect, useRef, useState, type ReactNode } from 'react'
import { gsap } from 'gsap'
import './DecayCard.css'

interface DecayCardProps {
  children: ReactNode
  className?: string
  fill?: string
  image?: string
  baseFrequency?: number
  numOctaves?: number
  seed?: number
  maxDisplacement?: number
  movementBound?: number
}

function useReducedMotion(): boolean {
  const mq = useRef<MediaQueryList | null>(null)
  if (typeof window !== 'undefined' && !mq.current) {
    mq.current = window.matchMedia('(prefers-reduced-motion: reduce)')
  }
  return mq.current?.matches ?? false
}

function useMobile(): boolean {
  const [mobile, setMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth <= 768,
  )
  useEffect(() => {
    const check = () => setMobile(window.innerWidth <= 768)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return mobile
}

export function DecayCard({
  children,
  className = '',
  fill = '#1a1a2e',
  image,
  baseFrequency = 0.015,
  numOctaves = 5,
  seed = 4,
  maxDisplacement = 400,
  movementBound = 50,
}: DecayCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null)
  const filterId = `decay-${Math.random().toString(36).slice(2, 9)}`
  const reducedMotion = useReducedMotion()
  const mobile = useMobile()

  useEffect(() => {
    if (reducedMotion || mobile) return

    const el = cardRef.current
    if (!el) return

    const cursor = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const cachedCursor = { ...cursor }
    const winsize = { width: window.innerWidth, height: window.innerHeight }
    let active = false
    let rafId = 0
    let idleTimer: ReturnType<typeof setTimeout> | null = null

    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b

    const map = (x: number, a: number, b: number, c: number, d: number) =>
      ((x - a) * (d - c)) / (b - a) + c

    const distance = (x1: number, x2: number, y1: number, y2: number) =>
      Math.hypot(x1 - x2, y1 - y2)

    const handleResize = () => {
      winsize.width = window.innerWidth
      winsize.height = window.innerHeight
    }

    const handleMouseMove = (ev: MouseEvent) => {
      cursor.x = ev.clientX
      cursor.y = ev.clientY
      if (!active) {
        active = true
        rafId = requestAnimationFrame(render)
      }
      if (idleTimer) clearTimeout(idleTimer)
      idleTimer = setTimeout(() => {
        active = false
      }, 100)
    }

    const state = { x: 0, y: 0, rz: 0, displacementScale: 0 }

    const render = () => {
      if (!active) return

      let targetX = lerp(
        state.x,
        map(cursor.x, 0, winsize.width, -120, 120),
        0.1,
      )
      let targetY = lerp(
        state.y,
        map(cursor.y, 0, winsize.height, -120, 120),
        0.1,
      )
      let targetRz = lerp(
        state.rz,
        map(cursor.x, 0, winsize.width, -10, 10),
        0.1,
      )

      if (targetX > movementBound)
        targetX = movementBound + (targetX - movementBound) * 0.2
      if (targetX < -movementBound)
        targetX = -movementBound + (targetX + movementBound) * 0.2
      if (targetY > movementBound)
        targetY = movementBound + (targetY - movementBound) * 0.2
      if (targetY < -movementBound)
        targetY = -movementBound + (targetY + movementBound) * 0.2

      state.x = targetX
      state.y = targetY
      state.rz = targetRz

      gsap.set(el, { x: state.x, y: state.y, rotateZ: state.rz })

      const dist = distance(cachedCursor.x, cursor.x, cachedCursor.y, cursor.y)
      state.displacementScale = lerp(
        state.displacementScale,
        map(dist, 0, 200, 0, maxDisplacement),
        0.06,
      )

      if (displacementRef.current) {
        gsap.set(displacementRef.current, { attr: { scale: state.displacementScale } })
      }

      cachedCursor.x = cursor.x
      cachedCursor.y = cursor.y

      rafId = requestAnimationFrame(render)
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      if (idleTimer) clearTimeout(idleTimer)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [reducedMotion, mobile, maxDisplacement, movementBound])

  return (
    <div className={`decay-card ${className}`.trim()} ref={cardRef}>
      <svg
        className="decay-card-svg"
        viewBox="-60 -75 720 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <filter id={filterId}>
          <feTurbulence
            type="turbulence"
            baseFrequency={baseFrequency}
            numOctaves={numOctaves}
            seed={seed}
            stitchTiles="stitch"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="turbulence1"
          />
          <feDisplacementMap
            ref={displacementRef}
            in="SourceGraphic"
            in2="turbulence1"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="B"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="displacementMap3"
          />
        </filter>
        <g>
          {image ? (
            <image
              href={image}
              x="0"
              y="0"
              width="600"
              height="750"
              filter={`url(#${filterId})`}
              preserveAspectRatio="xMidYMid slice"
            />
          ) : (
            <rect
              x="0"
              y="0"
              width="600"
              height="750"
              fill={fill}
              filter={`url(#${filterId})`}
              rx="16"
            />
          )}
        </g>
      </svg>
      <div className="decay-card-content">{children}</div>
    </div>
  )
}
