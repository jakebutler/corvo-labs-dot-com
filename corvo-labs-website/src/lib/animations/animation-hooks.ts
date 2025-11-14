/**
 * Advanced Animation Hooks
 *
 * Custom React hooks for sophisticated animation patterns optimized for
 * healthcare AI consulting website with focus on performance and accessibility.
 */

import { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { motion, useAnimation, useScroll, useTransform, useSpring, useMotionValue, useVelocity, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useWindowSize, useMouse, useScrolling } from 'react-use'
import { performanceUtils, globalPerformanceMonitor, globalMemoryTracker } from './performance-utils'

// Hook interfaces
export interface ScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  delay?: number
  duration?: number
  easing?: string | number[]
  disabled?: boolean
}

export interface ParallaxOptions {
  speed?: number
  disabled?: boolean
  direction?: 'vertical' | 'horizontal' | 'both'
  clamp?: boolean
}

export interface StaggerOptions {
  staggerDelay?: number
  reverse?: boolean
  from?: 'first' | 'last' | 'center'
}

export interface GestureOptions {
  drag?: boolean
  swipe?: boolean
  pinch?: boolean
  rotate?: boolean
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  onPinch?: (scale: number) => void
  onRotate?: (rotation: number) => void
}

/**
 * Enhanced scroll-triggered animation hook
 */
export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    delay = 0,
    duration = 0.6,
    easing = [0.25, 0.46, 0.45, 0.94],
    disabled = false
  } = options

  const shouldReduceMotion = useReducedMotion()
  const controls = useAnimation()
  const { ref, inView } = useInView({
    threshold,
    rootMargin,
    triggerOnce
  })

  useEffect(() => {
    if (disabled || shouldReduceMotion) {
      controls.start('visible')
      return
    }

    if (inView) {
      setTimeout(() => {
        controls.start('visible')
      }, delay * 1000)
    } else if (!triggerOnce) {
      controls.start('hidden')
    }
  }, [inView, controls, delay, disabled, shouldReduceMotion, triggerOnce])

  const animationProps = useMemo(() => ({
    ref,
    initial: 'hidden',
    animate: controls,
    transition: {
      duration,
      ease: easing
    }
  }), [ref, controls, duration, easing])

  return {
    ref,
    inView,
    controls,
    animationProps,
    isAnimating: inView && !disabled && !shouldReduceMotion
  }
}

/**
 * Advanced parallax effect hook with mouse tracking
 */
export function useParallax(options: ParallaxOptions = {}) {
  const {
    speed = 0.5,
    disabled = false,
    direction = 'vertical',
    clamp = true
  } = options

  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const { scrollY } = useScroll()
  const { docX, docY } = useMouse()
  const windowSize = useWindowSize()

  // Scroll-based parallax
  const scrollTransformY = useTransform(scrollY, [0, 1000], [0, speed * 1000])
  const scrollTransformX = useTransform(scrollY, [0, 1000], [0, 0])

  // Mouse-based parallax
  const mouseTransformX = useSpring(
    useMotionValue((docX - windowSize.width / 2) * speed * 0.1),
    { stiffness: 400, damping: 90 }
  )
  const mouseTransformY = useSpring(
    useMotionValue((docY - windowSize.height / 2) * speed * 0.1),
    { stiffness: 400, damping: 90 }
  )

  useEffect(() => {
    if (disabled) return

    const handleScroll = performanceUtils.throttle(() => {
      const scrollOffset = window.scrollY * speed

      setOffset(prev => ({
        x: direction === 'horizontal' || direction === 'both' ? scrollOffset : prev.x,
        y: direction === 'vertical' || direction === 'both' ? scrollOffset : prev.y
      }))
    }, 16) // 60fps

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed, disabled, direction])

  const transform = useMemo(() => {
    if (disabled) return {}

    const x = direction === 'horizontal' || direction === 'both'
      ? scrollTransformX.get() + mouseTransformX.get()
      : 0
    const y = direction === 'vertical' || direction === 'both'
      ? scrollTransformY.get() + mouseTransformY.get()
      : 0

    return {
      transform: `translate3d(${x}px, ${y}px, 0)`
    }
  }, [direction, scrollTransformX, scrollTransformY, mouseTransformX, mouseTransformY, disabled])

  return {
    transform,
    offset,
    scrollTransform: { x: scrollTransformX, y: scrollTransformY },
    mouseTransform: { x: mouseTransformX, y: mouseTransformY }
  }
}

/**
 * Stagger animation hook for lists and grids
 */
export function useStagger(childrenCount: number, options: StaggerOptions = {}) {
  const {
    staggerDelay = 0.1,
    reverse = false,
    from = 'first'
  } = options

  const containerVariants = useMemo(() => {
    const getStaggerDirection = () => {
      if (from === 'last') return childrenCount - 1
      if (from === 'center') return Math.floor(childrenCount / 2)
      return 0
    }

    const startIndex = getStaggerDirection()

    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: reverse ? staggerDelay * childrenCount : 0,
          staggerDirection: reverse ? -1 : 1,
          when: 'beforeChildren'
        }
      }
    }
  }, [childrenCount, staggerDelay, reverse, from])

  const childVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }), [])

  const getStaggerDelay = useCallback((index: number) => {
    if (from === 'last') {
      return (childrenCount - 1 - index) * staggerDelay
    }
    if (from === 'center') {
      const centerIndex = Math.floor(childrenCount / 2)
      return Math.abs(index - centerIndex) * staggerDelay
    }
    return index * staggerDelay
  }, [childrenCount, staggerDelay, from])

  return {
    containerVariants,
    childVariants,
    getStaggerDelay
  }
}

/**
 * Gesture recognition hook for mobile interactions
 */
export function useGestures(options: GestureOptions = {}) {
  const {
    drag = true,
    swipe = true,
    pinch = false,
    rotate = false,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onPinch,
    onRotate
  } = options

  const [gestureState, setGestureState] = useState({
    isDragging: false,
    dragStart: { x: 0, y: 0 },
    dragOffset: { x: 0, y: 0 },
    scale: 1,
    rotation: 0
  })

  const handleDragStart = useCallback((event: any, info: any) => {
    setGestureState(prev => ({
      ...prev,
      isDragging: true,
      dragStart: { x: info.point.x, y: info.point.y }
    }))
  }, [])

  const handleDrag = useCallback((event: any, info: any) => {
    setGestureState(prev => ({
      ...prev,
      dragOffset: { x: info.offset.x, y: info.offset.y }
    }))
  }, [])

  const handleDragEnd = useCallback((event: any, info: any) => {
    const { offset, velocity } = info

    // Swipe detection
    if (swipe) {
      const swipeThreshold = 50
      const velocityThreshold = 500

      if (Math.abs(offset.x) > swipeThreshold || Math.abs(velocity.x) > velocityThreshold) {
        if (offset.x > 0) {
          onSwipeRight?.()
        } else {
          onSwipeLeft?.()
        }
      }

      if (Math.abs(offset.y) > swipeThreshold || Math.abs(velocity.y) > velocityThreshold) {
        if (offset.y > 0) {
          onSwipeDown?.()
        } else {
          onSwipeUp?.()
        }
      }
    }

    setGestureState(prev => ({
      ...prev,
      isDragging: false,
      dragOffset: { x: 0, y: 0 }
    }))
  }, [swipe, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown])

  const gestureProps = useMemo(() => ({
    drag,
    dragConstraints: { left: 0, right: 0, top: 0, bottom: 0 },
    dragElastic: 0.2,
    onDragStart: handleDragStart,
    onDrag: handleDrag,
    onDragEnd: handleDragEnd,
    whileTap: { scale: 0.95 },
    whileHover: { scale: 1.02 }
  }), [drag, handleDragStart, handleDrag, handleDragEnd])

  return {
    gestureState,
    gestureProps,
    isDragging: gestureState.isDragging,
    dragOffset: gestureState.dragOffset
  }
}

/**
 * Intersection-based animation hook with multiple triggers
 */
export function useIntersectionTriggers(thresholds: number[] = [0.1, 0.5, 0.9]) {
  const [currentThreshold, setCurrentThreshold] = useState<number>(0)
  const [triggerStates, setTriggerStates] = useState<Record<number, boolean>>({})
  const refs = useRef<(HTMLElement | null)[]>([])
  const observers = useRef<IntersectionObserver[]>([])

  useEffect(() => {
    thresholds.forEach((threshold, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setCurrentThreshold(threshold)
              setTriggerStates(prev => ({ ...prev, [threshold]: true }))
            } else {
              setTriggerStates(prev => ({ ...prev, [threshold]: false }))
            }
          })
        },
        { threshold }
      )

      if (refs.current[index]) {
        observer.observe(refs.current[index]!)
        observers.current[index] = observer
      }
    })

    return () => {
      observers.current.forEach(observer => observer.disconnect())
    }
  }, [thresholds])

  const setRef = useCallback((index: number) => (el: HTMLElement | null) => {
    refs.current[index] = el
    if (observers.current[index] && el) {
      observers.current[index].observe(el)
    }
  }, [])

  return {
    currentThreshold,
    triggerStates,
    setRef,
    hasTriggered: (threshold: number) => triggerStates[threshold] || false
  }
}

/**
 * Performance-aware animation state hook
 */
export function useAnimationState(animationId: string) {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const animationRef = useRef<string>(animationId)

  useEffect(() => {
    // Register animation with memory tracker
    globalMemoryTracker.register(animationRef.current, 50) // 50KB estimated size

    return () => {
      globalMemoryTracker.unregister(animationRef.current)
    }
  }, [])

  const startAnimation = useCallback(() => {
    setIsAnimating(true)
    setIsVisible(true)
    globalPerformanceMonitor.registerAnimation()
  }, [])

  const endAnimation = useCallback(() => {
    setIsAnimating(false)
    setHasAnimated(true)
    globalPerformanceMonitor.unregisterAnimation()
  }, [])

  const resetAnimation = useCallback(() => {
    setIsVisible(false)
    setIsAnimating(false)
    setHasAnimated(false)
  }, [])

  return {
    isVisible,
    isAnimating,
    hasAnimated,
    startAnimation,
    endAnimation,
    resetAnimation
  }
}

/**
 * Viewport-based animation hook for responsive behavior
 */
export function useViewportAnimation() {
  const { width, height } = useWindowSize()
  const isMobile = width < 768
  const isTablet = width >= 768 && width < 1024
  const isDesktop = width >= 1024

  const getAnimationConfig = useCallback(() => {
    if (isMobile) {
      return {
        duration: 0.3,
        easing: 'easeOut' as const,
        staggerDelay: 0.05,
        reducedIntensity: 0.5
      }
    } else if (isTablet) {
      return {
        duration: 0.5,
        easing: [0.25, 0.46, 0.45, 0.94] as const,
        staggerDelay: 0.08,
        reducedIntensity: 0.75
      }
    } else {
      return {
        duration: 0.6,
        easing: [0.25, 0.46, 0.45, 0.94] as const,
        staggerDelay: 0.1,
        reducedIntensity: 1
      }
    }
  }, [isMobile, isTablet])

  const animationConfig = useMemo(() => getAnimationConfig(), [getAnimationConfig])

  return {
    viewport: { width, height },
    isMobile,
    isTablet,
    isDesktop,
    animationConfig,
    getAnimationConfig
  }
}

/**
 * Animation sequence manager hook
 */
export function useAnimationSequence() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const sequenceRef = useRef<Array<() => Promise<void>>>([])
  const currentTimeoutRef = useRef<NodeJS.Timeout>()

  const addStep = useCallback((step: () => Promise<void>) => {
    sequenceRef.current.push(step)
  }, [])

  const play = useCallback(async () => {
    if (sequenceRef.current.length === 0) return

    setIsPlaying(true)
    setCurrentStep(0)

    for (let i = 0; i < sequenceRef.current.length; i++) {
      setCurrentStep(i)
      await sequenceRef.current[i]()

      // Add small delay between steps
      await new Promise(resolve => {
        currentTimeoutRef.current = setTimeout(resolve, 100)
      })
    }

    setIsPlaying(false)
    setCurrentStep(sequenceRef.current.length)
  }, [])

  const pause = useCallback(() => {
    setIsPlaying(false)
    if (currentTimeoutRef.current) {
      clearTimeout(currentTimeoutRef.current)
    }
  }, [])

  const reset = useCallback(() => {
    setCurrentStep(0)
    setIsPlaying(false)
    if (currentTimeoutRef.current) {
      clearTimeout(currentTimeoutRef.current)
    }
  }, [])

  const clear = useCallback(() => {
    reset()
    sequenceRef.current = []
  }, [reset])

  return {
    currentStep,
    isPlaying,
    totalSteps: sequenceRef.current.length,
    addStep,
    play,
    pause,
    reset,
    clear
  }
}

/**
 * Healthcare-specific animation timing hook
 */
export function useHealthcareAnimationTiming() {
  const shouldReduceMotion = useReducedMotion()

  const getHealthcareTiming = useCallback((type: 'gentle' | 'precise' | 'confident' | 'medical') => {
    if (shouldReduceMotion) {
      return {
        duration: 0.15,
        ease: 'linear' as const
      }
    }

    switch (type) {
      case 'gentle':
        return {
          duration: 0.8,
          ease: [0.23, 1, 0.32, 1] as const // Soft, caring
        }
      case 'precise':
        return {
          duration: 0.4,
          ease: [0.87, 0, 0.13, 1] as const // Sharp, accurate
        }
      case 'confident':
        return {
          duration: 0.6,
          ease: [0.68, -0.55, 0.265, 1.55] as const // Bold, impressive
        }
      case 'medical':
      default:
        return {
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94] as const // Smooth, professional
        }
    }
  }, [shouldReduceMotion])

  return { getHealthcareTiming }
}

/**
 * Complex animation composition hook
 */
export function useAnimationComposition() {
  const [activeAnimations, setActiveAnimations] = useState<Set<string>>(new Set())
  const animationControls = useRef<Map<string, any>>(new Map())

  const registerAnimation = useCallback((id: string, controls: any) => {
    animationControls.current.set(id, controls)
  }, [])

  const startAnimation = useCallback(async (id: string) => {
    const controls = animationControls.current.get(id)
    if (!controls) return

    setActiveAnimations(prev => new Set(prev).add(id))
    await controls.start('animate')
    setActiveAnimations(prev => {
      const newSet = new Set(prev)
      newSet.delete(id)
      return newSet
    })
  }, [])

  const startSequence = useCallback(async (animationIds: string[]) => {
    for (const id of animationIds) {
      await startAnimation(id)
    }
  }, [startAnimation])

  const startParallel = useCallback(async (animationIds: string[]) => {
    const promises = animationIds.map(id => startAnimation(id))
    await Promise.all(promises)
  }, [startAnimation])

  const hasActiveAnimations = activeAnimations.size > 0

  return {
    activeAnimations: Array.from(activeAnimations),
    hasActiveAnimations,
    registerAnimation,
    startAnimation,
    startSequence,
    startParallel
  }
}