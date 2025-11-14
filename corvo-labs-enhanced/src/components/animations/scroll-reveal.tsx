'use client'

import React from 'react'
import { motion, useInView, UseInViewOptions, MotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ScrollRevealProps extends MotionProps {
  children: React.ReactNode
  className?: string
  variants?: any
  initial?: any
  animate?: any
  whileInView?: any
  viewport?: UseInViewOptions
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade'
}

const defaultVariants = {
  up: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  },
  down: {
    hidden: { opacity: 0, y: -60 },
    visible: { opacity: 1, y: 0 }
  },
  left: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 }
  },
  right: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }
}

export function ScrollReveal({
  children,
  className,
  variants,
  initial = "hidden",
  animate = "visible",
  whileInView,
  viewport = { once: true, margin: "-100px" },
  delay = 0,
  duration = 0.6,
  direction = "up",
  transition,
  ...motionProps
}: ScrollRevealProps) {
  const selectedVariants = variants || defaultVariants[direction]

  const defaultTransition = {
    duration,
    delay,
    ease: [0.16, 1, 0.3, 1]
  }

  return (
    <motion.div
      className={cn(className)}
      initial={initial}
      whileInView={whileInView || animate}
      viewport={viewport}
      variants={selectedVariants}
      transition={transition || defaultTransition}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}

// Staggered scroll reveal for lists
interface ScrollRevealStaggeredProps {
  children: React.ReactNode[]
  className?: string
  staggerDelay?: number
  itemDelay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade'
  itemClassName?: string
}

export function ScrollRevealStaggered({
  children,
  className,
  staggerDelay = 0.1,
  itemDelay = 0,
  duration = 0.6,
  direction = "up",
  itemClassName
}: ScrollRevealStaggeredProps) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay
      }
    }
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      {React.Children.map(children, (child, index) => (
        <ScrollReveal
          key={index}
          className={itemClassName}
          delay={itemDelay + index * staggerDelay}
          duration={duration}
          direction={direction}
          variants={defaultVariants[direction]}
        >
          {child}
        </ScrollReveal>
      ))}
    </motion.div>
  )
}