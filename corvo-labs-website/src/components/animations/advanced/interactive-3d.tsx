/**
 * Interactive 3D Animation Components
 *
 * Advanced 3D interactive components with mouse tracking, gesture support,
 * and perspective transforms optimized for healthcare AI consulting website.
 */

"use client"

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useGestures, useViewportAnimation } from '../../../lib/animations/animation-hooks'
import { useAnimationAccessibility } from '../../../lib/animations/accessibility-utils'
import { HEALTHCARE_COLORS, HEALTHCARE_ANIMATION_TIMING } from '../../../lib/animations/animation-config'
import { globalPerformanceMonitor } from '../../../lib/animations/performance-utils'

// ============================================================================
// 1. INTERACTIVE 3D CARD WITH PERSPECTIVE
// ============================================================================

interface Interactive3DCardProps {
  children: React.ReactNode
  className?: string
  intensity?: number
  perspective?: number
  disabled?: boolean
  glowEffect?: boolean
  shadowColor?: string
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export function Interactive3DCard({
  children,
  className = '',
  intensity = 15,
  perspective = 1000,
  disabled = false,
  glowEffect = true,
  shadowColor = HEALTHCARE_COLORS.primary.blue,
  onClick,
  onMouseEnter,
  onMouseLeave
}: Interactive3DCardProps) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [scale, setScale] = useState(1)
  const cardRef = useRef<HTMLDivElement>(null)
  const { shouldReduceAnimation } = useAnimationAccessibility()
  const { isMobile } = useViewportAnimation()

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !cardRef.current || shouldReduceAnimation() || isMobile) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const x = (e.clientX - centerX) / (rect.width / 2)
    const y = (e.clientY - centerY) / (rect.height / 2)

    setRotateX(y * -intensity)
    setRotateY(x * intensity)
  }, [intensity, disabled, shouldReduceAnimation, isMobile])

  const handleMouseEnter = useCallback(() => {
    if (!disabled && !shouldReduceAnimation()) {
      setScale(1.05)
    }
    onMouseEnter?.()
  }, [disabled, shouldReduceAnimation, onMouseEnter])

  const handleMouseLeave = useCallback(() => {
    setRotateX(0)
    setRotateY(0)
    setScale(1)
    onMouseLeave?.()
  }, [onMouseLeave])

  const motionProps = useMemo(() => {
    if (shouldReduceAnimation()) {
      return {
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 }
      }
    }

    return {
      animate: {
        rotateX,
        rotateY,
        scale,
        boxShadow: glowEffect
          ? `${rotateY * 2}px ${rotateX * 2}px ${20 + Math.abs(rotateX + rotateY)}px ${shadowColor}40`
          : "0 10px 30px rgba(0,0,0,0.1)"
      },
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8
      },
      whileHover: !disabled ? { scale: 1.05 } : {},
      whileTap: !disabled ? { scale: 0.95 } : {}
    }
  }, [rotateX, rotateY, scale, glowEffect, shadowColor, disabled, shouldReduceAnimation])

  return (
    <motion.div
      ref={cardRef}
      className={`relative transform-gpu ${className}`}
      style={{
        perspective: shouldReduceAnimation() ? undefined : perspective,
        transformStyle: 'preserve-3d'
      }}
      {...motionProps}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

// ============================================================================
// 2. 3D FLIPPING CARD
// ============================================================================

interface FlippingCard3DProps {
  frontContent: React.ReactNode
  backContent: React.ReactNode
  width?: number
  height?: number
  className?: string
  flipDirection?: 'horizontal' | 'vertical'
  autoFlip?: boolean
  flipInterval?: number
  disabled?: boolean
  onFlip?: (isFlipped: boolean) => void
}

export function FlippingCard3D({
  frontContent,
  backContent,
  width = 300,
  height = 200,
  className = '',
  flipDirection = 'horizontal',
  autoFlip = false,
  flipInterval = 5000,
  disabled = false,
  onFlip
}: FlippingCard3DProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const { shouldReduceAnimation } = useAnimationAccessibility()

  useEffect(() => {
    if (autoFlip && !disabled && !shouldReduceAnimation()) {
      const interval = setInterval(() => {
        setIsFlipped(prev => !prev)
      }, flipInterval)

      return () => clearInterval(interval)
    }
  }, [autoFlip, flipInterval, disabled, shouldReduceAnimation])

  const handleFlip = useCallback(() => {
    if (!disabled) {
      const newFlippedState = !isFlipped
      setIsFlipped(newFlippedState)
      onFlip?.(newFlippedState)
    }
  }, [isFlipped, disabled, onFlip])

  const flipAxis = flipDirection === 'horizontal' ? 'rotateY' : 'rotateX'
  const flipValue = isFlipped ? 180 : 0

  if (shouldReduceAnimation()) {
    return (
      <div
        className={`${className} cursor-pointer`}
        style={{ width, height }}
        onClick={handleFlip}
      >
        {isFlipped ? backContent : frontContent}
      </div>
    )
  }

  return (
    <motion.div
      className={`relative cursor-pointer ${className}`}
      style={{ width, height, perspective: 1000 }}
      onClick={handleFlip}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      <motion.div
        className="absolute inset-0"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ [flipAxis]: flipValue }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Front face */}
        <motion.div
          className="absolute inset-0"
          style={{
            backfaceVisibility: 'hidden',
            transform: flipDirection === 'horizontal' ? 'rotateY(0deg)' : 'rotateX(0deg)'
          }}
        >
          {frontContent}
        </motion.div>

        {/* Back face */}
        <motion.div
          className="absolute inset-0"
          style={{
            backfaceVisibility: 'hidden',
            transform: flipDirection === 'horizontal' ? 'rotateY(180deg)' : 'rotateX(180deg)'
          }}
        >
          {backContent}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// ============================================================================
// 3. 3D ROTATING CAROUSEL
// ============================================================================

interface Carousel3DProps {
  items: React.ReactNode[]
  itemWidth?: number
  itemHeight?: number
  radius?: number
  className?: string
  autoRotate?: boolean
  rotationSpeed?: number
  showControls?: boolean
  disabled?: boolean
  onIndexChange?: (index: number) => void
}

export function Carousel3D({
  items,
  itemWidth = 200,
  itemHeight = 150,
  radius = 250,
  className = '',
  autoRotate = false,
  rotationSpeed = 50,
  showControls = true,
  disabled = false,
  onIndexChange
}: Carousel3DProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const { shouldReduceAnimation } = useAnimationAccessibility()
  const containerRef = useRef<HTMLDivElement>(null)

  const rotation = useMotionValue(0)
  const smoothRotation = useSpring(rotation, { stiffness: 100, damping: 30 })

  useEffect(() => {
    if (autoRotate && !disabled && !shouldReduceAnimation()) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % items.length)
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [autoRotate, items.length, disabled, shouldReduceAnimation])

  useEffect(() => {
    rotation.set(-(currentIndex * 360) / items.length)
    onIndexChange?.(currentIndex)
  }, [currentIndex, items.length, rotation, onIndexChange])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!disabled) {
      setIsDragging(true)
      setStartX(e.clientX)
    }
  }, [disabled])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging && !disabled) {
      const deltaX = e.clientX - startX
      rotation.set(deltaX * 0.5)
    }
  }, [isDragging, startX, rotation, disabled])

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false)
      const snapAngle = Math.round(rotation.get() / (360 / items.length)) * (360 / items.length)
      rotation.set(snapAngle)
      const newIndex = Math.round((-snapAngle / 360) * items.length + items.length) % items.length
      setCurrentIndex(newIndex)
    }
  }, [isDragging, rotation, items.length])

  const nextItem = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % items.length)
  }, [items.length])

  const prevItem = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + items.length) % items.length)
  }, [items.length])

  if (shouldReduceAnimation()) {
    return (
      <div className={`${className} p-4`}>
        <div className="flex justify-center items-center space-x-4">
          {showControls && (
            <button
              onClick={prevItem}
              className="p-2 bg-blue-500 text-white rounded"
              disabled={disabled}
            >
              ←
            </button>
          )}
          <div className="p-8 bg-gray-100 rounded-lg">
            {items[currentIndex]}
          </div>
          {showControls && (
            <button
              onClick={nextItem}
              className="p-2 bg-blue-500 text-white rounded"
              disabled={disabled}
            >
              →
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div
        className="relative flex justify-center items-center"
        style={{ height: itemHeight + 100, perspective: 1000 }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <motion.div
          className="relative"
          style={{
            width: itemWidth,
            height: itemHeight,
            transformStyle: 'preserve-3d',
            rotateY: smoothRotation
          }}
        >
          {items.map((item, index) => {
            const angle = (index * 360) / items.length
            const x = Math.sin((angle * Math.PI) / 180) * radius
            const z = Math.cos((angle * Math.PI) / 180) * radius

            return (
              <motion.div
                key={index}
                className="absolute"
                style={{
                  width: itemWidth,
                  height: itemHeight,
                  transform: `translate3d(${x}px, 0, ${z}px) rotateY(${angle}deg)`,
                  transformStyle: 'preserve-3d'
                }}
                animate={{
                  scale: index === currentIndex ? 1.1 : 0.8,
                  opacity: index === currentIndex ? 1 : 0.7
                }}
                transition={{ duration: 0.3 }}
              >
                {item}
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Controls */}
      {showControls && (
        <div className="flex justify-center mt-8 space-x-4">
          <motion.button
            onClick={prevItem}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg"
            whileHover={{ scale: disabled ? 1 : 1.05 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
            disabled={disabled}
          >
            Previous
          </motion.button>
          <div className="flex space-x-2">
            {items.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
                }`}
                whileHover={{ scale: disabled ? 1 : 1.2 }}
                whileTap={{ scale: disabled ? 1 : 0.8 }}
                disabled={disabled}
              />
            ))}
          </div>
          <motion.button
            onClick={nextItem}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg"
            whileHover={{ scale: disabled ? 1 : 1.05 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
            disabled={disabled}
          >
            Next
          </motion.button>
        </div>
      )}
    </div>
  )
}

// ============================================================================
// 4. 3D PARALLAX CONTAINER
// ============================================================================

interface ParallaxContainer3DProps {
  children: React.ReactNode[]
  className?: string
  intensity?: number
  disabled?: boolean
  perspective?: number
}

export function ParallaxContainer3D({
  children,
  className = '',
  intensity = 20,
  disabled = false,
  perspective = 1000
}: ParallaxContainer3DProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const { shouldReduceAnimation } = useAnimationAccessibility()

  useEffect(() => {
    if (disabled || shouldReduceAnimation()) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const x = (e.clientX - centerX) / window.innerWidth
      const y = (e.clientY - centerY) / window.innerHeight

      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [disabled, shouldReduceAnimation])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ perspective: shouldReduceAnimation() ? undefined : perspective }}
    >
      {React.Children.map(children, (child, index) => {
        const depth = (index + 1) * 0.5
        const moveX = mousePosition.x * intensity * depth
        const moveY = mousePosition.y * intensity * depth

        return (
          <motion.div
            key={index}
            className="absolute inset-0"
            style={{
              transform: shouldReduceAnimation()
                ? undefined
                : `translate3d(${moveX}px, ${moveY}px, ${depth * 50}px)`
            }}
            transition={{ type: "spring", stiffness: 100, damping: 30 }}
          >
            {child}
          </motion.div>
        )
      })}
    </div>
  )
}

// ============================================================================
// 5. 3D MORPHING SHAPE
// ============================================================================

interface MorphingShape3DProps {
  shapes: string[]
  width?: number
  height?: number
  color?: string
  duration?: number
  autoMorph?: boolean
  className?: string
  onShapeChange?: (index: number) => void
}

export function MorphingShape3D({
  shapes,
  width = 200,
  height = 200,
  color = HEALTHCARE_COLORS.accent.purple,
  duration = 3,
  autoMorph = true,
  className = '',
  onShapeChange
}: MorphingShape3DProps) {
  const [currentShapeIndex, setCurrentShapeIndex] = useState(0)
  const { shouldReduceAnimation, getAccessibleDuration } = useAnimationAccessibility()

  useEffect(() => {
    if (autoMorph && !shouldReduceAnimation()) {
      const interval = setInterval(() => {
        setCurrentShapeIndex(prev => (prev + 1) % shapes.length)
      }, getAccessibleDuration(duration) * 1000)

      return () => clearInterval(interval)
    }
  }, [autoMorph, duration, shapes.length, shouldReduceAnimation, getAccessibleDuration])

  useEffect(() => {
    onShapeChange?.(currentShapeIndex)
  }, [currentShapeIndex, onShapeChange])

  if (shouldReduceAnimation() || shapes.length === 0) {
    return (
      <svg width={width} height={height} className={className}>
        <path
          d={shapes[0] || ''}
          fill={color}
          stroke={color}
          strokeWidth="2"
        />
      </svg>
    )
  }

  return (
    <motion.svg
      width={width}
      height={height}
      className={className}
      style={{ transformStyle: 'preserve-3d' }}
      whileHover={{ rotateZ: 5, rotateY: 5 }}
      transition={{ duration: 0.3 }}
    >
      <motion.path
        d={shapes[currentShapeIndex]}
        fill={color}
        stroke={color}
        strokeWidth="2"
        initial={{ pathLength: 0, scale: 0.8 }}
        animate={{ pathLength: 1, scale: 1 }}
        transition={{
          duration: getAccessibleDuration(0.8),
          ease: "easeInOut"
        }}
      />

      {/* 3D effect layers */}
      {[1, 2, 3].map((layer) => (
        <motion.path
          key={layer}
          d={shapes[currentShapeIndex]}
          fill="none"
          stroke={color}
          strokeWidth="2"
          opacity={0.3 - layer * 0.1}
          style={{
            transform: `translateZ(${layer * 10}px)`,
            filter: `blur(${layer}px)`
          }}
          animate={{
            scale: [1, 1.02, 1]
          }}
          transition={{
            duration: getAccessibleDuration(duration),
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.svg>
  )
}

// ============================================================================
// 6. 3D GESTURE CONTROLLED OBJECT
// ============================================================================

interface GestureControlled3DProps {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  onGesture?: (gesture: string) => void
}

export function GestureControlled3D({
  children,
  className = '',
  disabled = false,
  onGesture
}: GestureControlled3DProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 })
  const [scale, setScale] = useState(1)
  const { gestureState, gestureProps } = useGestures({
    drag: true,
    swipe: true,
    onSwipeLeft: () => onGesture?.('swipeLeft'),
    onSwipeRight: () => onGesture?.('swipeRight'),
    onSwipeUp: () => onGesture?.('swipeUp'),
    onSwipeDown: () => onGesture?.('swipeDown')
  })

  const { shouldReduceAnimation } = useAnimationAccessibility()

  useEffect(() => {
    if (!disabled && !shouldReduceAnimation()) {
      setRotation({
        x: gestureState.dragOffset.y * 0.5,
        y: gestureState.dragOffset.x * 0.5,
        z: 0
      })
    }
  }, [gestureState.dragOffset, disabled, shouldReduceAnimation])

  if (shouldReduceAnimation()) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={`${className} cursor-grab active:cursor-grabbing`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
        rotateZ: rotation.z,
        scale: scale
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 25
      }}
      {...gestureProps}
      onDoubleClick={() => {
        if (!disabled) {
          setScale(scale === 1 ? 1.2 : 1)
          onGesture?.('doubleTap')
        }
      }}
    >
      {children}
    </motion.div>
  )
}