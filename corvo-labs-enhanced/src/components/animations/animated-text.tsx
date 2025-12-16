'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/utils'

interface AnimatedCounterProps {
  value: number
  duration?: number
  className?: string
  prefix?: string
  suffix?: string
  decimalPlaces?: number
}

export function AnimatedCounter({
  value,
  duration = 2000,
  className,
  prefix = "",
  suffix = "",
  decimalPlaces = 0
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true })

  useEffect(() => {
    if (!inView) return

    let startTime: number | null = null
    const startValue = 0
    const endValue = value

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = startValue + (endValue - startValue) * easeOutQuart

      setCount(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [inView, value, duration])

  const displayValue = decimalPlaces > 0
    ? count.toFixed(decimalPlaces)
    : Math.floor(count).toString()

  return (
    <span ref={ref} className={cn(className)}>
      {prefix}{displayValue}{suffix}
    </span>
  )
}

interface TypewriterProps {
  text: string
  className?: string
  speed?: number
  delay?: number
  cursor?: boolean
  onComplete?: () => void
}

export function Typewriter({
  text,
  className,
  speed = 50,
  delay = 0,
  cursor = true,
  onComplete
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [ref, inView] = useInView({ triggerOnce: true })

  useEffect(() => {
    if (!inView) return

    const timer = setTimeout(() => {
      setIsTyping(true)
      let currentIndex = 0

      const typeInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(typeInterval)
          setIsTyping(false)
          onComplete?.()
        }
      }, speed)

      return () => clearInterval(typeInterval)
    }, delay)

    return () => clearTimeout(timer)
  }, [inView, text, speed, delay, onComplete])

  return (
    <span ref={ref} className={cn(className)}>
      {displayText}
      <AnimatePresence>
        {isTyping && cursor && (
          <motion.span
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="inline-block w-0.5 h-5 bg-current ml-1"
          />
        )}
      </AnimatePresence>
    </span>
  )
}

interface AnimatedTextProps {
  words: string[]
  className?: string
  duration?: number
  pauseDuration?: number
}

export function AnimatedText({
  words,
  className,
  duration = 2000,
  pauseDuration = 1000
}: AnimatedTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true })

  useEffect(() => {
    if (!inView) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length)
    }, duration + pauseDuration)

    return () => clearInterval(interval)
  }, [inView, words.length, duration, pauseDuration])

  return (
    <span ref={ref} className={cn("inline-block", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  colors?: string[]
  animated?: boolean
}

export function GradientText({
  children,
  className,
  colors = ["from-ai-blue", "via-ai-cyan", "to-accent-500"],
  animated = false
}: GradientTextProps) {
  const gradientClass = `bg-gradient-to-r ${colors.join(" ")} bg-clip-text text-transparent`

  if (animated) {
    return (
      <motion.span
        className={cn(gradientClass, className)}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundSize: "200% 200%"
        }}
      >
        {children}
      </motion.span>
    )
  }

  return (
    <span className={cn(gradientClass, className)}>
      {children}
    </span>
  )
}