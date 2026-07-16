import { useEffect, useRef, type ReactNode } from 'react'
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
  const cursor = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const cachedCursor = useRef({ ...cursor.current })
  const winsize = useRef({ width: window.innerWidth, height: window.innerHeight })
  const filterId = `decay-${Math.random().toString(36).slice(2, 9)}`

  useEffect(() => {
    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b

    const map = (x: number, a: number, b: number, c: number, d: number) =>
      ((x - a) * (d - c)) / (b - a) + c

    const distance = (x1: number, x2: number, y1: number, y2: number) =>
      Math.hypot(x1 - x2, y1 - y2)

    const handleResize = () => {
      winsize.current = { width: window.innerWidth, height: window.innerHeight }
    }

    const handleMouseMove = (ev: MouseEvent) => {
      cursor.current = { x: ev.clientX, y: ev.clientY }
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    const state = {
      x: 0,
      y: 0,
      rz: 0,
      displacementScale: 0,
    }

    const render = () => {
      let targetX = lerp(
        state.x,
        map(cursor.current.x, 0, winsize.current.width, -120, 120),
        0.1,
      )
      let targetY = lerp(
        state.y,
        map(cursor.current.y, 0, winsize.current.height, -120, 120),
        0.1,
      )
      let targetRz = lerp(
        state.rz,
        map(cursor.current.x, 0, winsize.current.width, -10, 10),
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

      if (cardRef.current) {
        gsap.set(cardRef.current, {
          x: state.x,
          y: state.y,
          rotateZ: state.rz,
        })
      }

      const dist = distance(
        cachedCursor.current.x,
        cursor.current.x,
        cachedCursor.current.y,
        cursor.current.y,
      )
      state.displacementScale = lerp(
        state.displacementScale,
        map(dist, 0, 200, 0, maxDisplacement),
        0.06,
      )

      if (displacementRef.current) {
        gsap.set(displacementRef.current, {
          attr: { scale: state.displacementScale },
        })
      }

      cachedCursor.current = { ...cursor.current }

      rafId = requestAnimationFrame(render)
    }

    let rafId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [maxDisplacement, movementBound])

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
