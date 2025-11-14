/**
 * Hero Interaction Hook
 *
 * Custom hook for handling mouse tracking, 3D transforms, and interactive elements
 * for the advanced hero section with performance optimization.
 */

import { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useMouse, useWindowSize } from 'react-use'
import { useReducedMotion } from 'framer-motion'

export interface MousePosition {
  x: number
  y: number
}

export interface InteractionSettings {
  enableParallax: boolean
  enable3D: boolean
  enableMouseTracking: boolean
  parallaxStrength: number
  rotationStrength: number
  smoothness: number
}

export function useHeroInteractions(settings: Partial<InteractionSettings> = {}) {
  const defaultSettings: InteractionSettings = {
    enableParallax: true,
    enable3D: true,
    enableMouseTracking: true,
    parallaxStrength: 0.02,
    rotationStrength: 0.001,
    smoothness: 0.8,
    ...settings
  }

  const { width, height } = useWindowSize()
  const mouseRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })

  const shouldReduceMotion = useReducedMotion()

  // Mouse tracking with framer-motion
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring values
  const smoothMouseX = useSpring(mouseX, { stiffness: 400, damping: 30 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 400, damping: 30 })

  // Performance monitoring
  const frameCount = useRef(0)
  const lastFrameTime = useRef(Date.now())
  const fps = useRef(60)

  // Mouse event handlers
  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!defaultSettings.enableMouseTracking || shouldReduceMotion) return

    const target = event.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()

    const x = (event.clientX - rect.left - rect.width / 2) / rect.width
    const y = (event.clientY - rect.top - rect.height / 2) / rect.height

    setMousePosition({ x: event.clientX, y: event.clientY })
    mouseX.set(x)
    mouseY.set(y)

    // FPS calculation
    frameCount.current++
    const now = Date.now()
    if (now - lastFrameTime.current >= 1000) {
      fps.current = frameCount.current
      frameCount.current = 0
      lastFrameTime.current = now
    }
  }, [mouseX, mouseY, defaultSettings.enableMouseTracking, shouldReduceMotion])

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
    mouseX.set(0)
    mouseY.set(0)
  }, [mouseX, mouseY])

  // 3D transform calculations
  const rotateX = useTransform(
    smoothMouseY,
    [-1, 1],
    [-defaultSettings.rotationStrength * 10, defaultSettings.rotationStrength * 10]
  )

  const rotateY = useTransform(
    smoothMouseX,
    [-1, 1],
    [defaultSettings.rotationStrength * 10, -defaultSettings.rotationStrength * 10]
  )

  const translateX = useTransform(
    smoothMouseX,
    [-1, 1],
    [-defaultSettings.parallaxStrength * 20, defaultSettings.parallaxStrength * 20]
  )

  const translateY = useTransform(
    smoothMouseY,
    [-1, 1],
    [-defaultSettings.parallaxStrength * 20, defaultSettings.parallaxStrength * 20]
  )

  // Parallax calculations for different layers
  const getParallaxTransform = useCallback((layer: number, strength: number = 1) => {
    if (!defaultSettings.enableParallax || shouldReduceMotion) {
      return {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0
      }
    }

    const layerStrength = strength * (layer + 1)

    return {
      x: translateX.get() * layerStrength,
      y: translateY.get() * layerStrength,
      rotateX: rotateX.get() * layerStrength * 0.1,
      rotateY: rotateY.get() * layerStrength * 0.1
    }
  }, [translateX, translateY, rotateX, rotateY, defaultSettings.enableParallax, shouldReduceMotion])

  // Performance metrics
  const performanceMetrics = useMemo(() => ({
    fps: fps.current,
    isOptimal: fps.current >= 55,
    shouldReduceMotion,
    isHovering,
    mousePosition
  }), [fps.current, shouldReduceMotion, isHovering, mousePosition])

  // Cleanup
  useEffect(() => {
    return () => {
      mouseX.set(0)
      mouseY.set(0)
    }
  }, [mouseX, mouseY])

  return {
    // Refs
    mouseRef,
    containerRef,

    // State
    isHovering,
    mousePosition,
    performanceMetrics,

    // Motion values
    mouseX,
    mouseY,
    smoothMouseX,
    smoothMouseY,

    // Transforms
    rotateX,
    rotateY,
    translateX,
    translateY,

    // Methods
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    getParallaxTransform,

    // Settings
    settings: defaultSettings
  }
}