/**
 * Interactive Elements for Hero Section
 *
 * Interactive components including animated stats counters, hover effects,
 * and engaging user interaction elements with 3D transforms.
 */

import React, { useState, useEffect, useRef, useMemo } from 'react'
import { motion, useAnimation, useInView, useTransform, useMotionValue } from 'framer-motion'
import { useInView as useReactIntersectionObserver } from 'react-intersection-observer'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Stats counter component with animation
interface StatCounterProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
  label: string
  description?: string
}

export function StatCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
  className = '',
  label,
  description
}: StatCounterProps) {
  const [count, setCount] = useState(0)
  const [ref, inView] = useReactIntersectionObserver({
    triggerOnce: true,
    threshold: 0.5
  })
  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      let startTime: number | null = null
      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)

        // Easing function for smooth counting
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentCount = Math.floor(easeOutQuart * value)

        setCount(currentCount)

        if (progress < 1) {
          requestAnimationFrame(animateCount)
        } else {
          setCount(value)
        }
      }

      requestAnimationFrame(animateCount)
      controls.start('visible')
    }
  }, [inView, value, duration, controls])

  return (
    <motion.div
      ref={ref}
      className={cn('text-center p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50', className)}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-lg font-semibold text-foreground mb-1">{label}</div>
      {description && (
        <div className="text-sm text-muted-foreground">{description}</div>
      )}
    </motion.div>
  )
}

// Interactive CTA button with 3D effects
interface InteractiveCTAProps {
  href?: string
  onClick?: () => void
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'default' | 'lg' | 'xl'
  className?: string
  disabled?: boolean
}

export function InteractiveCTA({
  href,
  onClick,
  children,
  variant = 'primary',
  size = 'lg',
  className = '',
  disabled = false
}: InteractiveCTAProps) {
  const [isHovered, setIsHovered] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    mouseX.set(event.clientX - centerX)
    mouseY.set(event.clientY - centerY)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  const rotateX = useTransform(mouseY, [-100, 100], [10, -10])
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10])

  const buttonVariants = {
    idle: {
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      transition: { duration: 0.3 }
    },
    hover: {
      scale: 1.02,
      rotateX: -5,
      rotateY: 5,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  }

  const glowVariants = {
    idle: { opacity: 0, scale: 0.8 },
    hover: { opacity: 1, scale: 1.2 },
    tap: { opacity: 0.8, scale: 0.9 }
  }

  const baseClasses = cn(
    'relative overflow-hidden transition-all duration-300 transform-gpu',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
    className
  )

  if (href) {
    return (
      <motion.a
        href={href}
        className={baseClasses}
        ref={buttonRef}
        variants={buttonVariants}
        initial="idle"
        whileHover="hover"
        whileTap="tap"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          perspective: '1000px',
          transform: `rotateX(${rotateX.get()}deg) rotateY(${rotateY.get()}deg)`
        }}
      >
        <Button
          variant={variant === 'primary' ? 'default' : 'outline'}
          size={size}
          className="relative z-10"
          disabled={disabled}
        >
          {children}
        </Button>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-primary/20 rounded-lg blur-lg"
          variants={glowVariants}
          initial="idle"
          animate={isHovered ? 'hover' : 'idle'}
        />

        {/* Shimmer effect */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        )}
      </motion.a>
    )
  }

  return (
    <motion.button
      className={baseClasses}
      ref={buttonRef}
      variants={buttonVariants}
      initial="idle"
      whileHover="hover"
      whileTap="tap"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
      style={{
        perspective: '1000px',
        transform: `rotateX(${rotateX.get()}deg) rotateY(${rotateY.get()}deg)`
      }}
    >
      <Button
        variant={variant === 'primary' ? 'default' : 'outline'}
        size={size}
        className="relative z-10"
        disabled={disabled}
      >
        {children}
      </Button>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-primary/20 rounded-lg blur-lg"
        variants={glowVariants}
        initial="idle"
        animate={isHovered ? 'hover' : 'idle'}
      />

      {/* Shimmer effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      )}
    </motion.button>
  )
}

// Interactive feature cards
interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
  delay?: number
}

export function FeatureCard({
  icon,
  title,
  description,
  className = '',
  delay = 0
}: FeatureCardProps) {
  const [ref, inView] = useReactIntersectionObserver({
    triggerOnce: true,
    threshold: 0.2
  })

  return (
    <motion.div
      ref={ref}
      className={cn(
        'p-6 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm',
        'hover:bg-card/50 transition-all duration-300 cursor-pointer',
        'hover:shadow-lg hover:scale-105 hover:-translate-y-1',
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{
        y: -5,
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        transition: { duration: 0.2 }
      }}
    >
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  )
}

// Text reveal animation component
interface TextRevealProps {
  text: string
  className?: string
  staggerDelay?: number
  animationDelay?: number
}

export function TextReveal({
  text,
  className = '',
  staggerDelay = 0.05,
  animationDelay = 0
}: TextRevealProps) {
  const [ref, inView] = useReactIntersectionObserver({
    triggerOnce: true,
    threshold: 0.5
  })

  const words = text.split(' ')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: animationDelay,
        staggerChildren: staggerDelay
      }
    }
  }

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(10px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      className={cn('inline-block', className)}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block mr-1"
          variants={wordVariants}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}