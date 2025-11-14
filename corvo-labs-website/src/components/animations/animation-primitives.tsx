"use client"

import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence, useAnimation, useReducedMotion, useScroll, useTransform, useSpring, useMotionValue, useVelocity, useAnimationControls } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useWindowSize } from 'react-use'

// ============================================================================
// 1. ADVANCED ANIMATION CONFIGURATION CONSTANTS
// ============================================================================

export const ANIMATION_VARIANTS = {
  // Enhanced variants with 3D support
  fadeIn: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  },

  fadeIn3D: {
    hidden: { opacity: 0, y: 30, rotateX: 15 },
    visible: { opacity: 1, y: 0, rotateX: 0 }
  },

  slideInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  },

  slideInRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  },

  slideInPerspective: {
    hidden: { opacity: 0, x: -100, rotateY: -45, z: -50 },
    visible: { opacity: 1, x: 0, rotateY: 0, z: 0 }
  },

  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  },

  scaleIn3D: {
    hidden: { opacity: 0, scale: 0.8, rotateX: -10, rotateY: 10 },
    visible: { opacity: 1, scale: 1, rotateX: 0, rotateY: 0 }
  },

  rotateIn: {
    hidden: { opacity: 0, rotate: -180, scale: 0.5 },
    visible: { opacity: 1, rotate: 0, scale: 1 }
  },

  flipIn: {
    hidden: { opacity: 0, rotateY: -90, transformPerspective: 1000 },
    visible: { opacity: 1, rotateY: 0, transformPerspective: 1000 }
  },

  staggerContainer: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },

  morphingBlob: {
    initial: {
      d: "M300,150 Q400,50 500,150 T700,150 Q600,250 500,150 T300,150",
      scale: 1,
      rotate: 0
    },
    animate: {
      d: [
        "M300,150 Q400,50 500,150 T700,150 Q600,250 500,150 T300,150",
        "M320,180 Q420,80 520,180 T720,180 Q620,280 520,180 T320,180",
        "M280,120 Q380,20 480,120 T680,120 Q580,220 480,120 T280,120"
      ],
      scale: [1, 1.1, 1],
      rotate: [0, 5, -5, 0]
    }
  }
}

export const HOVER_VARIANTS = {
  lift: {
    hover: {
      y: -8,
      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  },

  glow: {
    hover: {
      boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)",
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  },

  scale: {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2, ease: "easeOut" }
    }
  },

  tilt3D: {
    hover: {
      rotateX: 5,
      rotateY: 5,
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  },

  flip: {
    hover: {
      rotateY: 180,
      transition: { duration: 0.6, ease: "easeInOut" }
    }
  }
}

// Enhanced easing functions
export const EASING = {
  // Custom healthcare-themed easing
  medical: [0.25, 0.46, 0.45, 0.94], // Smooth, professional
  precision: [0.87, 0, 0.13, 1], // Sharp, accurate
  gentle: [0.23, 1, 0.32, 1], // Soft, caring
  confident: [0.68, -0.55, 0.265, 1.55], // Bold, impressive

  // Standard easings
  easeOut: "easeOut",
  easeInOut: "easeInOut",
  easeIn: "easeIn",
  linear: "linear"
}

// Healthcare-specific durations
export const DURATIONS = {
  instant: 0.15,
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  verySlow: 1.2,
  presentation: 2.0
}

// ============================================================================
// 2. PERFORMANCE MONITORING AND OPTIMIZATION
// ============================================================================

interface AnimationPerformanceMetrics {
  fps: number
  frameTime: number
  memoryUsage: number
  animationCount: number
  droppedFrames: number
}

export class AnimationPerformanceMonitor {
  private frameCount: number = 0
  private lastTime: number = 0
  private fps: number = 60
  private droppedFrames: number = 0
  private animationCount: number = 0
  private observers: Set<(metrics: AnimationPerformanceMetrics) => void> = new Set()

  constructor() {
    if (typeof window !== 'undefined') {
      this.startMonitoring()
    }
  }

  private startMonitoring() {
    const measure = (currentTime: number) => {
      if (this.lastTime !== 0) {
        const delta = currentTime - this.lastTime
        this.frameCount++

        if (this.frameCount % 30 === 0) {
          this.fps = Math.round(1000 / delta)

          if (delta > 16.67) {
            this.droppedFrames++
          }

          const metrics: AnimationPerformanceMetrics = {
            fps: this.fps,
            frameTime: delta,
            memoryUsage: (performance as any).memory?.usedJSHeapSize || 0,
            animationCount: this.animationCount,
            droppedFrames: this.droppedFrames
          }

          this.observers.forEach(callback => callback(metrics))
        }
      }

      this.lastTime = currentTime
      requestAnimationFrame(measure)
    }

    requestAnimationFrame(measure)
  }

  registerAnimation() {
    this.animationCount++
  }

  unregisterAnimation() {
    this.animationCount = Math.max(0, this.animationCount - 1)
  }

  subscribe(callback: (metrics: AnimationPerformanceMetrics) => void) {
    this.observers.add(callback)
    return () => this.observers.delete(callback)
  }

  getMetrics(): AnimationPerformanceMetrics {
    return {
      fps: this.fps,
      frameTime: 1000 / this.fps,
      memoryUsage: (performance as any).memory?.usedJSHeapSize || 0,
      animationCount: this.animationCount,
      droppedFrames: this.droppedFrames
    }
  }
}

// Global performance monitor instance
export const performanceMonitor = new AnimationPerformanceMonitor()

// ============================================================================
// 3. ADVANCED SCROLL-REVEAL COMPONENT
// ============================================================================

interface ScrollRevealProps {
  children: React.ReactNode
  variant?: keyof typeof ANIMATION_VARIANTS
  delay?: number
  className?: string
  threshold?: number
  rootMargin?: string
  once?: boolean
  viewport?: { once?: boolean; amount?: number }
  onViewportEnter?: () => void
  onViewportLeave?: () => void
  disabled?: boolean
  springConfig?: any
}

export function ScrollReveal({
  children,
  variant = 'fadeIn',
  delay = 0,
  className = '',
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  once = true,
  viewport = {},
  onViewportEnter,
  onViewportLeave,
  disabled = false,
  springConfig
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion()
  const { ref, inView } = useInView({
    threshold,
    rootMargin,
    triggerOnce: once,
    ...viewport
  })

  useEffect(() => {
    if (inView && onViewportEnter) onViewportEnter()
    if (!inView && onViewportLeave) onViewportLeave()
  }, [inView, onViewportEnter, onViewportLeave])

  if (disabled || shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  const variants = ANIMATION_VARIANTS[variant]

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={springConfig || {
        duration: DURATIONS.normal,
        ease: EASING.medical,
        delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ============================================================================
// 4. 3D INTERACTIVE CARD COMPONENT
// ============================================================================

interface Card3DProps {
  children: React.ReactNode
  className?: string
  intensity?: number
  perspective?: number
  disabled?: boolean
  glowEffect?: boolean
  shadowIntensity?: number
}

export function Card3D({
  children,
  className = '',
  intensity = 15,
  perspective = 1000,
  disabled = false,
  glowEffect = true,
  shadowIntensity = 0.3
}: Card3DProps) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [scale, setScale] = useState(1)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const x = (e.clientX - centerX) / (rect.width / 2)
    const y = (e.clientY - centerY) / (rect.height / 2)

    setRotateX(y * -intensity)
    setRotateY(x * intensity)
  }, [intensity, disabled])

  const handleMouseEnter = useCallback(() => {
    if (!disabled) setScale(1.05)
  }, [disabled])

  const handleMouseLeave = useCallback(() => {
    setRotateX(0)
    setRotateY(0)
    setScale(1)
  }, [])

  return (
    <motion.div
      ref={cardRef}
      className={`relative transform-gpu ${className}`}
      style={{
        perspective,
        transformStyle: 'preserve-3d'
      }}
      animate={{
        rotateX,
        rotateY,
        scale,
        boxShadow: glowEffect
          ? `${rotateY * 2}px ${rotateX * 2}px ${20 + Math.abs(rotateX + rotateY)}px rgba(59, 130, 246, ${shadowIntensity})`
          : "0 10px 30px rgba(0,0,0,0.1)"
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}

// ============================================================================
// 5. ADVANCED SCROLL-TRIGGERED ANIMATION SYSTEM
// ============================================================================

interface ScrollTriggeredAnimationProps {
  children: React.ReactNode
  start?: string | number
  end?: string | number
  scrub?: boolean | number
  pin?: boolean
  pinSpacing?: boolean
  onUpdate?: (progress: number) => void
  className?: string
}

export function ScrollTriggeredAnimation({
  children,
  start = "top bottom",
  end = "bottom top",
  scrub = true,
  pin = false,
  pinSpacing = true,
  onUpdate,
  className = ''
}: ScrollTriggeredAnimationProps) {
  const { scrollYProgress } = useScroll()
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1, 0.8])
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const rotate = useTransform(smoothProgress, [0, 1], [0, 360])

  useEffect(() => {
    if (onUpdate) {
      const unsubscribe = smoothProgress.on("change", onUpdate)
      return unsubscribe
    }
  }, [onUpdate, smoothProgress])

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        scale,
        opacity,
        rotate
      }}
    >
      {children}
    </motion.div>
  )
}

// ============================================================================
// 6. MOUSE-TRACKING PARALLAX COMPONENT
// ============================================================================

interface MouseParallaxProps {
  children: React.ReactNode
  className?: string
  intensity?: number
  easing?: number
  disabled?: boolean
}

export function MouseParallax({
  children,
  className = '',
  intensity = 20,
  easing = 0.1,
  disabled = false
}: MouseParallaxProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (disabled) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const x = (e.clientX - centerX) / window.innerWidth
      const y = (e.clientY - centerY) / window.innerHeight

      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [disabled])

  const translateX = useSpring(mousePosition.x * intensity, { stiffness: 400, damping: 90 })
  const translateY = useSpring(mousePosition.y * intensity, { stiffness: 400, damping: 90 })

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        translateX,
        translateY,
      }}
    >
      {children}
    </motion.div>
  )
}

// ============================================================================
// 7. GESTURE-AWARE ANIMATION COMPONENT
// ============================================================================

interface GestureAnimationProps {
  children: React.ReactNode
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  onPinch?: (scale: number) => void
  onRotate?: (rotation: number) => void
  className?: string
  disabled?: boolean
}

export function GestureAnimation({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onPinch,
  onRotate,
  className = '',
  disabled = false
}: GestureAnimationProps) {
  const [gestureState, setGestureState] = useState({
    isDragging: false,
    dragStart: { x: 0, y: 0 },
    dragEnd: { x: 0, y: 0 }
  })

  const handleDragEnd = (event: any, info: any) => {
    const { offset, velocity } = info

    // Swipe detection
    if (Math.abs(offset.x) > 50 || Math.abs(velocity.x) > 500) {
      if (offset.x > 0) {
        onSwipeRight?.()
      } else {
        onSwipeLeft?.()
      }
    }

    if (Math.abs(offset.y) > 50 || Math.abs(velocity.y) > 500) {
      if (offset.y > 0) {
        onSwipeDown?.()
      } else {
        onSwipeUp?.()
      }
    }
  }

  return (
    <motion.div
      className={className}
      drag={!disabled}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  )
}

// ============================================================================
// 8. ADVANCED TEXT ANIMATIONS
// ============================================================================

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  staggerDelay?: number
  as?: keyof React.JSX.IntrinsicElements
  variant?: 'word' | 'char' | 'line'
  animation?: 'fadeIn' | 'slideUp' | 'scale' | 'rotate'
}

export function TextRevealAdvanced({
  text,
  className = '',
  delay = 0,
  staggerDelay = 0.03,
  as: Component = 'h2',
  variant = 'word',
  animation = 'fadeIn'
}: TextRevealProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <Component className={className}>{text}</Component>
  }

  const getAnimationVariants = () => {
    switch (animation) {
      case 'slideUp':
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        }
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 }
        }
      case 'rotate':
        return {
          hidden: { opacity: 0, rotate: -10 },
          visible: { opacity: 1, rotate: 0 }
        }
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        }
    }
  }

  const variants = getAnimationVariants()

  const getContent = () => {
    switch (variant) {
      case 'char':
        return text.split('').map((char, index) => (
          <motion.span
            key={index}
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{
              delay: delay + index * staggerDelay,
              duration: DURATIONS.fast,
              ease: EASING.medical
            }}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))

      case 'line':
        return text.split('\n').map((line, index) => (
          <motion.div
            key={index}
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{
              delay: delay + index * staggerDelay * 5,
              duration: DURATIONS.normal,
              ease: EASING.medical
            }}
            className="block"
          >
            {line}
          </motion.div>
        ))

      default: // word
        return text.split(' ').map((word, index) => (
          <motion.span
            key={index}
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{
              delay: delay + index * staggerDelay,
              duration: DURATIONS.fast,
              ease: EASING.medical
            }}
            className="inline-block mr-1"
          >
            {word}
          </motion.span>
        ))
    }
  }

  return <Component className={className}>{getContent()}</Component>
}

// ============================================================================
// 9. MORPHING SVG COMPONENT
// ============================================================================

interface MorphingBlobProps {
  className?: string
  duration?: number
  colors?: string[]
  size?: number
  autoAnimate?: boolean
}

export function MorphingBlob({
  className = '',
  duration = DURATIONS.verySlow,
  colors = ['#3B82F6', '#8B5CF6', '#EC4899'],
  size = 200,
  autoAnimate = true
}: MorphingBlobProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return (
      <div
        className={`rounded-full ${className}`}
        style={{
          width: size,
          height: size,
          backgroundColor: colors[0]
        }}
      />
    )
  }

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 800 400"
      className={className}
      animate={autoAnimate ? "animate" : "initial"}
      variants={ANIMATION_VARIANTS.morphingBlob}
      transition={{
        duration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }}
    >
      <motion.path
        d="M300,150 Q400,50 500,150 T700,150 Q600,250 500,150 T300,150"
        fill={colors[0]}
        animate={{
          fill: colors
        }}
        transition={{
          duration: duration * 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </motion.svg>
  )
}

// ============================================================================
// 10. SMART ANIMATION CONTAINER
// ============================================================================

interface SmartAnimationContainerProps {
  children: React.ReactNode
  className?: string
  performanceMode?: 'high' | 'medium' | 'low'
  respectMotionPreference?: boolean
}

export function SmartAnimationContainer({
  children,
  className = '',
  performanceMode = 'high',
  respectMotionPreference = true
}: SmartAnimationContainerProps) {
  const shouldReduceMotion = useReducedMotion()
  const [performanceLevel, setPerformanceLevel] = useState(performanceMode)

  useEffect(() => {
    const unsubscribe = performanceMonitor.subscribe((metrics) => {
      if (metrics.fps < 30 && performanceLevel === 'high') {
        setPerformanceLevel('medium')
      } else if (metrics.fps < 20 && performanceLevel === 'medium') {
        setPerformanceLevel('low')
      } else if (metrics.fps > 50 && performanceLevel !== 'high') {
        setPerformanceLevel('high')
      }
    })

    return unsubscribe
  }, [performanceLevel])

  const getAnimationProps = () => {
    if (respectMotionPreference && shouldReduceMotion) {
      return { disabled: true }
    }

    switch (performanceLevel) {
      case 'low':
        return {
          disabled: true
        }
      case 'medium':
        return {
          duration: DURATIONS.fast,
          ease: EASING.linear
        }
      default:
        return {
          duration: DURATIONS.normal,
          ease: EASING.medical
        }
    }
  }

  const animationProps = getAnimationProps()

  return (
    <motion.div className={className} {...animationProps}>
      {children}
    </motion.div>
  )
}

// ============================================================================
// 11. ADVANCED PAGE TRANSITION
// ============================================================================

interface PageTransitionAdvancedProps {
  children: React.ReactNode
  className?: string
  variant?: 'fade' | 'slide' | 'flip' | 'scale' | 'rotate'
  direction?: 'up' | 'down' | 'left' | 'right'
}

export function PageTransitionAdvanced({
  children,
  className = '',
  variant = 'fade',
  direction = 'up'
}: PageTransitionAdvancedProps) {
  const shouldReduceMotion = useReducedMotion()

  const getVariants = () => {
    switch (variant) {
      case 'slide':
        const slideOffset = direction === 'left' || direction === 'right' ? 100 : 50
        const slideAxis = direction === 'left' || direction === 'right' ? 'x' : 'y'
        const slideValue = (direction === 'left' || direction === 'up') ? -slideOffset : slideOffset

        return {
          initial: { opacity: 0, [slideAxis]: slideValue },
          animate: { opacity: 1, [slideAxis]: 0 },
          exit: { opacity: 0, [slideAxis]: -slideValue }
        }

      case 'flip':
        return {
          initial: { opacity: 0, rotateY: -90, transformPerspective: 1000 },
          animate: { opacity: 1, rotateY: 0, transformPerspective: 1000 },
          exit: { opacity: 0, rotateY: 90, transformPerspective: 1000 }
        }

      case 'scale':
        return {
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 1.2 }
        }

      case 'rotate':
        return {
          initial: { opacity: 0, rotate: -10, scale: 0.9 },
          animate: { opacity: 1, rotate: 0, scale: 1 },
          exit: { opacity: 0, rotate: 10, scale: 0.9 }
        }

      default: // fade
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 }
        }
    }
  }

  const variants = getVariants()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={typeof window !== 'undefined' ? window.location.pathname : 'default'}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={{
          duration: DURATIONS.normal,
          ease: EASING.medical
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// ============================================================================
// 12. ANIMATION HOOKS AND UTILITIES
// ============================================================================

export function useParallax(speed = 0.5) {
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY * speed)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return {
    transform: `translateY(${offsetY}px)`
  }
}

export function useIntersectionAnimation(threshold = 0.1) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true
  })

  return { ref, inView }
}

export function useReducedMotionAnimations() {
  const shouldReduceMotion = useReducedMotion()
  return shouldReduceMotion
}

export function useResponsiveAnimation() {
  const { width } = useWindowSize()

  return {
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
    reducedIntensity: width < 768 ? 0.5 : width < 1024 ? 0.75 : 1
  }
}

// Animation utility functions
export const animationUtils = {
  // Create staggered animation delays
  createStaggerDelay: (index: number, baseDelay: number = 0.1) => index * baseDelay,

  // Calculate responsive animation duration
  getResponsiveDuration: (baseDuration: number, scaleFactor: number) =>
    baseDuration * scaleFactor,

  // Generate spring configuration
  createSpringConfig: (stiffness = 300, damping = 30, mass = 1) => ({
    type: "spring",
    stiffness,
    damping,
    mass
  }),

  // Performance-optimized animation variants
  optimizedVariants: {
    fast: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      transition: { duration: 0.2 }
    },
    smooth: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }
}