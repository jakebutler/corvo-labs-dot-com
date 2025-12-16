'use client'

import { useScroll, useTime, useTransform, useSpring, MotionValue } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'

export function useHeroAnimations() {
  const shouldReduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const time = useTime()

  // Parallax effects - optimized for performance
  const parallaxY = useTransform(
    scrollY,
    [0, 500],
    shouldReduceMotion ? [0, 0] : [0, 150]
  )

  const parallaxScale = useTransform(
    scrollY,
    [0, 300],
    shouldReduceMotion ? [1, 1] : [1, 0.8]
  )

  const parallaxOpacity = useTransform(
    scrollY,
    [0, 300],
    shouldReduceMotion ? [1, 1] : [1, 0]
  )

  // Floating animations - use spring for smooth 60fps
  const floatY = useSpring(
    useTransform(
      time,
      t => shouldReduceMotion ? 0 : Math.sin(t / 1000) * 10
    ),
    { stiffness: 100, damping: 20 }
  )

  const floatX = useSpring(
    useTransform(
      time,
      t => shouldReduceMotion ? 0 : Math.cos(t / 1500) * 10
    ),
    { stiffness: 100, damping: 20 }
  )

  return {
    parallaxY,
    parallaxScale,
    parallaxOpacity,
    floatY,
    floatX,
    shouldReduceMotion
  }
}

// Performance-optimized animation variants
export const heroVariants = {
  entrance: {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] // Natural entrance curve
      }
    }
  },
  scaleEntrance: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  },
  slideFromLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  },
  slideFromRight: {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }
} as const

// Staggered animation timing for sophisticated entrance
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
}

// Hover interaction variants
export const hoverVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
      duration: 0.3
    }
  },
  tap: { scale: 0.98 }
} as const

export type HeroAnimationProps = ReturnType<typeof useHeroAnimations>