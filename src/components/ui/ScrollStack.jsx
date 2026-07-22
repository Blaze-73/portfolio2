import { useEffect, useRef, useCallback, useMemo, Children } from 'react'
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion'
import './ScrollStack.css'

const SPRING = { stiffness: 280, damping: 35, mass: 0.4 }

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
)

function StackCard({ index, register, children }) {
  const translateY = useMotionValue(0)
  const scale = useMotionValue(1)
  const rotation = useMotionValue(0)

  const smoothY = useSpring(translateY, SPRING)
  const smoothScale = useSpring(scale, SPRING)
  const smoothRot = useSpring(rotation, SPRING)

  const transform = useMotionTemplate`translate3d(0, ${smoothY}px, 0) scale(${smoothScale}) rotate(${smoothRot}deg)`

  const api = useMemo(() => ({ translateY, scale, rotation }), [translateY, scale, rotation])

  useEffect(() => {
    register(index, api)
    return () => register(index, null)
  }, [index, register, api])

  return (
    <motion.div
      className="scroll-stack-card"
      style={{
        transform,
        transformOrigin: 'top center',
        willChange: 'transform',
        backfaceVisibility: 'hidden',
      }}
    >
      {children}
    </motion.div>
  )
}

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  rotationAmount = 0,
  useWindowScroll = false,
  onStackComplete,
}) => {
  const scrollerRef = useRef(null)
  const stackCompletedRef = useRef(false)
  const animationFrameRef = useRef(null)
  const cardApisRef = useRef(new Map())

  const register = useCallback((index, api) => {
    if (api) {
      cardApisRef.current.set(index, api)
    } else {
      cardApisRef.current.delete(index)
    }
  }, [])

  const parsePct = useCallback((v, h) => {
    if (typeof v === 'string' && v.includes('%')) return (parseFloat(v) / 100) * h
    return parseFloat(v)
  }, [])

  const getOffset = useCallback(
    (el) => {
      if (useWindowScroll) return el.getBoundingClientRect().top + window.scrollY
      return el.offsetTop
    },
    [useWindowScroll],
  )

  const updateTransforms = useCallback(() => {
    const apis = cardApisRef.current
    if (!apis.size) return

    const scrollTop = useWindowScroll
      ? window.scrollY
      : scrollerRef.current?.scrollTop ?? 0
    const containerHeight = window.innerHeight
    const stackPx = parsePct(stackPosition, containerHeight)
    const scaleEndPx = parsePct(scaleEndPosition, containerHeight)

    const endEl = useWindowScroll
      ? document.querySelector('.scroll-stack-end')
      : scrollerRef.current?.querySelector('.scroll-stack-end')
    const endTop = endEl ? getOffset(endEl) : 0

    const cardEls = useWindowScroll
      ? document.querySelectorAll('.scroll-stack-card')
      : scrollerRef.current?.querySelectorAll('.scroll-stack-card')

    if (!cardEls?.length) return

    cardEls.forEach((card, i) => {
      const api = apis.get(i)
      if (!api) return

      const cardTop = getOffset(card)
      const triggerStart = cardTop - stackPx - itemStackDistance * i
      const triggerEnd = cardTop - scaleEndPx
      const pinStart = triggerStart
      const pinEnd = endTop - containerHeight / 2

      const progress =
        scrollTop < triggerStart
          ? 0
          : scrollTop > triggerEnd
            ? 1
            : (scrollTop - triggerStart) / (triggerEnd - triggerStart)

      const targetScale = baseScale + i * itemScale
      const s = 1 - progress * (1 - targetScale)
      const r = rotationAmount ? i * rotationAmount * progress : 0

      let translateY = 0
      if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        translateY = scrollTop - cardTop + stackPx + itemStackDistance * i
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPx + itemStackDistance * i
      }

      api.translateY.set(Math.round(translateY))
      api.scale.set(Math.round(s * 1000) / 1000)
      api.rotation.set(Math.round(r * 100) / 100)

      if (i === cardEls.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true
          onStackComplete?.()
        } else if (!isInView) {
          stackCompletedRef.current = false
        }
      }
    })
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    useWindowScroll,
    onStackComplete,
    parsePct,
    getOffset,
  ])

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const cards = useWindowScroll
      ? document.querySelectorAll('.scroll-stack-card')
      : scroller.querySelectorAll('.scroll-stack-card')

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`
      }
    })

    updateTransforms()

    const onScroll = () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = requestAnimationFrame(updateTransforms)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    const apis = cardApisRef.current

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      window.removeEventListener('scroll', onScroll)
      stackCompletedRef.current = false
      apis.clear()
    }
  }, [itemDistance, useWindowScroll, updateTransforms])

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {Children.map(children, (child, i) => (
          <StackCard key={child.key ?? i} index={i} register={register}>
            {child}
          </StackCard>
        ))}
        <div className="scroll-stack-end" />
      </div>
    </div>
  )
}

export default ScrollStack
