/**
 * Enhanced Parallax Hook
 *
 * Advanced hook for implementing sophisticated parallax effects with
 * multi-layer support, performance optimization, and healthcare-themed animations.
 */

'use client';

import { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'
import { useWindowSize } from 'react-use'

import {
  ParallaxConfig,
  MousePosition,
  ViewportDimensions,
  ParallaxLayer,
  ParallaxTransform,
  PerformanceMetrics,
  DEFAULT_PARALLAX_CONFIG,
  calculateMousePosition,
  getViewportDimensions,
  calculateParallaxTransform,
  generateParallaxLayers,
  getDeviceCapabilities,
  getOptimalPerformanceSettings,
  throttle,
  debounce,
  generateCSSTransform,
  generateCSSCustomProperties,
  getMedicalParallaxEffect,
  useParallaxCalculations
} from '@/lib/parallax/parallax-utils'

import { useParallaxContext } from '@/lib/parallax/parallax-provider'

// ============================================================================
// HOOK CONFIGURATION
// ============================================================================

export interface UseParallaxOptions {
  // Basic configuration
  enabled?: boolean
  intensity?: number
  depth?: number
  easing?: number

  // Layer configuration
  layerCount?: number
  layerDepth?: number[]
  customLayers?: ParallaxLayer[]

  // Transform constraints
  maxRotation?: number
  maxTranslation?: number
  maxScale?: number
  perspective?: number

  // Performance settings
  performanceMode?: 'high' | 'medium' | 'low'
  targetFPS?: number
  throttleMs?: number

  // Behavior settings
  respectReducedMotion?: boolean
  disableOnMobile?: boolean
  enableTouch?: boolean
  autoReset?: boolean

  // Healthcare themes
  medicalTheme?: boolean
  medicalEffect?: 'heartbeat' | 'breathing' | 'pulse' | 'wave'
  colorMode?: 'oxygen' | 'diagnostic' | 'healing'

  // Callbacks
  onMouseMove?: (position: MousePosition) => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onLayerUpdate?: (layer: ParallaxLayer, index: number) => void
  onPerformanceChange?: (metrics: PerformanceMetrics) => void
}

// ============================================================================
// MAIN PARALLAX HOOK
// ============================================================================

export function useParallax(options: UseParallaxOptions = {}) {
  // Get context if available
  const context = useParallaxContext()
  const shouldReduceMotion = useReducedMotion()
  const { width, height } = useWindowSize()

  // Configuration
  const config = useMemo<ParallaxConfig>(() => ({
    ...DEFAULT_PARALLAX_CONFIG,
    enabled: options.enabled ?? true,
    intensity: options.intensity ?? DEFAULT_PARALLAX_CONFIG.intensity,
    easing: options.easing ?? DEFAULT_PARALLAX_CONFIG.easing,
    depthLayers: options.layerCount ?? DEFAULT_PARALLAX_CONFIG.depthLayers,
    maxRotation: options.maxRotation ?? DEFAULT_PARALLAX_CONFIG.maxRotation,
    maxTranslation: options.maxTranslation ?? DEFAULT_PARALLAX_CONFIG.maxTranslation,
    perspective: options.perspective ?? DEFAULT_PARALLAX_CONFIG.perspective,
    performanceMode: options.performanceMode ?? 'high',
    respectReducedMotion: options.respectReducedMotion ?? true
  }), [options])

  // State management
  const [isInitialized, setIsInitialized] = useState(false)
  const [isMouseActive, setIsMouseActive] = useState(false)
  const [isOptimized, setIsOptimized] = useState(false)
  const [layers, setLayers] = useState<ParallaxLayer[]>([])
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
    clientX: 0,
    clientY: 0,
    velocityX: 0,
    velocityY: 0,
    timestamp: Date.now()
  })

  // Refs
  const containerRef = useRef<HTMLDivElement>(null)
  const frameCount = useRef(0)
  const lastFrameTime = useRef(Date.now())
  const fps = useRef(60)
  const animationFrameId = useRef<number>()

  // Motion values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 400, damping: 30 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 400, damping: 30 })

  // Viewport dimensions
  const [viewport, setViewport] = useState<ViewportDimensions>(() => getViewportDimensions())

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  useEffect(() => {
    if (!isInitialized) {
      // Initialize layers
      const initialLayers = options.customLayers ||
        generateParallaxLayers(config.depthLayers, config)

      // Apply custom depth if provided
      if (options.layerDepth) {
        options.layerDepth.forEach((depth, index) => {
          if (initialLayers[index]) {
            initialLayers[index].depth = depth
          }
        })
      }

      setLayers(initialLayers)

      // Initialize viewport
      setViewport(getViewportDimensions())

      setIsInitialized(true)
    }
  }, [isInitialized, config, options])

  // ============================================================================
  // DEVICE CAPABILITY DETECTION
  // ============================================================================

  const deviceCapabilities = useMemo(() => {
    return getDeviceCapabilities()
  }, [])

  const isMobile = useMemo(() => {
    return width < 768 || (options.disableOnMobile && width < 1024)
  }, [width, options.disableOnMobile])

  const effectivePerformanceMode = useMemo(() => {
    if (options.performanceMode) return options.performanceMode
    if (context?.performance) return context.performance.performanceMode
    return getOptimalPerformanceSettings(deviceCapabilities)
  }, [options.performanceMode, context?.performance, deviceCapabilities])

  // ============================================================================
  // MOUSE TRACKING
  // ============================================================================

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!config.enabled ||
        (config.respectReducedMotion && shouldReduceMotion) ||
        (isMobile && !options.enableTouch)) {
      return
    }

    const newPosition = calculateMousePosition(event, viewport, mousePosition)
    setMousePosition(newPosition)
    setIsMouseActive(true)

    // Update motion values
    mouseX.set(newPosition.normalizedX)
    mouseY.set(newPosition.normalizedY)

    // Calculate FPS
    frameCount.current++
    const now = Date.now()
    if (now - lastFrameTime.current >= 1000) {
      fps.current = frameCount.current
      frameCount.current = 0
      lastFrameTime.current = now

      // Adjust performance based on FPS
      if (fps.current < 30) {
        setIsOptimized(true)
      } else if (fps.current > 50) {
        setIsOptimized(false)
      }
    }

    // Update layers with new transforms
    setLayers(prevLayers =>
      prevLayers.map((layer, index) => {
        const transform = calculateParallaxTransform(
          newPosition,
          layer,
          config,
          isMobile
        )

        const updatedLayer = {
          ...layer,
          transform,
          lastMousePosition: newPosition
        }

        // Call callback if provided
        options.onLayerUpdate?.(updatedLayer, index)

        return updatedLayer
      })
    )

    // Call mouse move callback
    options.onMouseMove?.(newPosition)
  }, [
    config,
    shouldReduceMotion,
    isMobile,
    options.enableTouch,
    viewport,
    mousePosition,
    mouseX,
    mouseY,
    options.onMouseMove,
    options.onLayerUpdate
  ])

  const handleTouchMove = useCallback((event: TouchEvent) => {
    if (!options.enableTouch || isMobile) return
    handleMouseMove(event as any)
  }, [options.enableTouch, isMobile, handleMouseMove])

  const handleMouseEnter = useCallback(() => {
    setIsMouseActive(true)
    options.onMouseEnter?.()
  }, [options.onMouseEnter])

  const handleMouseLeave = useCallback(() => {
    setIsMouseActive(false)
    options.onMouseLeave?.()

    // Auto-reset if enabled
    if (options.autoReset) {
      mouseX.set(0)
      mouseY.set(0)
      setMousePosition(prev => ({
        ...prev,
        x: 0,
        y: 0,
        normalizedX: 0,
        normalizedY: 0,
        velocityX: 0,
        velocityY: 0
      }))
    }
  }, [options.autoReset, options.onMouseLeave, mouseX, mouseY])

  // ============================================================================
  // EVENT LISTENERS
  // ============================================================================

  useEffect(() => {
    if (!config.enabled) return

    const throttledMouseMove = throttle(handleMouseMove, options.throttleMs || 16)
    const throttledTouchMove = throttle(handleTouchMove, options.throttleMs || 16)

    const element = containerRef.current || document

    element.addEventListener('mousemove', throttledMouseMove)
    element.addEventListener('touchmove', throttledTouchMove)
    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', throttledMouseMove)
      element.removeEventListener('touchmove', throttledTouchMove)
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [
    config.enabled,
    handleMouseMove,
    handleTouchMove,
    handleMouseEnter,
    handleMouseLeave,
    options.throttleMs
  ])

  // ============================================================================
  // VIEWPORT RESIZE HANDLING
  // ============================================================================

  useEffect(() => {
    const handleResize = debounce(() => {
      const newViewport = getViewportDimensions()
      setViewport(newViewport)
    }, 250)

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])

  // ============================================================================
  // MEDICAL EFFECTS
  // ============================================================================

  const medicalEffect = useMemo(() => {
    if (!options.medicalTheme) return null

    return getMedicalParallaxEffect(
      config.intensity,
      options.medicalEffect || 'pulse'
    )
  }, [options.medicalTheme, config.intensity, options.medicalEffect])

  // ============================================================================
  // TRANSFORM UTILITIES
  // ============================================================================

  const getLayerTransform = useCallback((layerIndex: number): ParallaxTransform => {
    const layer = layers[layerIndex]
    if (!layer) {
      return {
        translateX: 0,
        translateY: 0,
        translateZ: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        scale: 1,
        skewX: 0,
        skewY: 0,
        opacity: 1
      }
    }

    // Apply medical effect if enabled
    if (medicalEffect && !shouldReduceMotion) {
      const time = Date.now() / 1000
      const medicalOffset = Math.sin(time * medicalEffect.frequency + medicalEffect.phase) * medicalEffect.amplitude

      return {
        ...layer.transform,
        translateY: layer.transform.translateY + medicalOffset,
        scale: layer.transform.scale * (1 + medicalOffset * 0.001)
      }
    }

    return layer.transform
  }, [layers, medicalEffect, shouldReduceMotion])

  const getLayerCSS = useCallback((layerIndex: number): string => {
    const transform = getLayerTransform(layerIndex)
    return generateCSSTransform(transform)
  }, [getLayerTransform])

  const getCSSProperties = useCallback((): Record<string, string> => {
    return generateCSSCustomProperties(mousePosition, layers)
  }, [mousePosition, layers])

  // ============================================================================
  // MOTION VALUE TRANSFORMS
  // ============================================================================

  const parallaxX = useTransform(smoothMouseX, [-1, 1], [-config.maxTranslation, config.maxTranslation])
  const parallaxY = useTransform(smoothMouseY, [-1, 1], [-config.maxTranslation, config.maxTranslation])
  const parallaxRotateX = useTransform(smoothMouseY, [-1, 1], [-config.maxRotation, config.maxRotation])
  const parallaxRotateY = useTransform(smoothMouseX, [-1, 1], [config.maxRotation, -config.maxRotation])

  // ============================================================================
  // CONTROL METHODS
  // ============================================================================

  const updateLayer = useCallback((layerIndex: number, updates: Partial<ParallaxLayer>) => {
    setLayers(prevLayers =>
      prevLayers.map((layer, index) =>
        index === layerIndex ? { ...layer, ...updates } : layer
      )
    )
  }, [])

  const reset = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
    setMousePosition({
      x: 0,
      y: 0,
      normalizedX: 0,
      normalizedY: 0,
      clientX: 0,
      clientY: 0,
      velocityX: 0,
      velocityY: 0,
      timestamp: Date.now()
    })
    setIsMouseActive(false)

    // Reset layers
    setLayers(prevLayers =>
      prevLayers.map(layer => ({
        ...layer,
        transform: {
          translateX: 0,
          translateY: 0,
          translateZ: 0,
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          scale: 1,
          skewX: 0,
          skewY: 0,
          opacity: 1
        }
      }))
    )
  }, [mouseX, mouseY])

  const disable = useCallback(() => {
    reset()
    setIsOptimized(true)
  }, [reset])

  const enable = useCallback(() => {
    setIsOptimized(false)
  }, [])

  // ============================================================================
  // PERFORMANCE METRICS
  // ============================================================================

  const performanceMetrics = useMemo(() => ({
    fps: fps.current,
    isOptimal: fps.current >= (options.targetFPS || 55),
    isOptimized,
    isMobile,
    shouldReduceMotion: shouldReduceMotion || (config.respectReducedMotion && shouldReduceMotion),
    deviceCapabilities,
    performanceMode: effectivePerformanceMode,
    layerCount: layers.length,
    isMouseActive
  }), [
    fps.current,
    options.targetFPS,
    isOptimized,
    isMobile,
    shouldReduceMotion,
    config.respectReducedMotion,
    deviceCapabilities,
    effectivePerformanceMode,
    layers.length,
    isMouseActive
  ])

  // ============================================================================
  // RETURN VALUE
  // ============================================================================

  return {
    // Refs
    containerRef,

    // State
    isInitialized,
    isMouseActive,
    isOptimized,
    layers,
    mousePosition,
    viewport,

    // Motion values
    mouseX,
    mouseY,
    smoothMouseX,
    smoothMouseY,
    parallaxX,
    parallaxY,
    parallaxRotateX,
    parallaxRotateY,

    // Methods
    getLayerTransform,
    getLayerCSS,
    getCSSProperties,
    updateLayer,
    reset,
    enable,
    disable,

    // Metrics
    performance: performanceMetrics,

    // Configuration
    config,

    // Medical effects
    medicalEffect
  }
}

// ============================================================================
// SPECIALIZED HOOKS
// ============================================================================

/**
 * Hook for creating simple parallax effects on a single element
 */
export function useSimpleParallax(intensity: number = 0.02) {
  const { getLayerCSS, containerRef, performance } = useParallax({
    intensity,
    layerCount: 1,
    performanceMode: 'high'
  })

  return {
    style: {
      transform: getLayerCSS(0),
      willChange: 'transform'
    },
    ref: containerRef,
    isOptimized: performance.isOptimized
  }
}

/**
 * Hook for multi-layer parallax backgrounds
 */
export function useLayeredParallax(layerCount: number = 3) {
  const { layers, getLayerCSS, containerRef, performance } = useParallax({
    layerCount,
    maxTranslation: 50,
    performanceMode: 'high'
  })

  const layerStyles = useMemo(() =>
    layers.map((_, index) => ({
      style: {
        transform: getLayerCSS(index),
        willChange: 'transform',
        zIndex: layerCount - index
      }
    })), [layers, getLayerCSS, layerCount])

  return {
    layers: layerStyles,
    containerRef,
    performance
  }
}

/**
 * Hook for healthcare-themed parallax with medical effects
 */
export function useMedicalParallax(effectType: 'heartbeat' | 'breathing' | 'pulse' | 'wave' = 'pulse') {
  const { getLayerCSS, medicalEffect, containerRef, performance } = useParallax({
    medicalTheme: true,
    medicalEffect: effectType,
    intensity: 0.03,
    performanceMode: 'medium'
  })

  return {
    getLayerCSS,
    medicalEffect,
    containerRef,
    performance,
    isActive: medicalEffect !== null
  }
}

/**
 * Hook for performance-optimized parallax
 */
export function useOptimizedParallax() {
  const { getLayerCSS, containerRef, performance, isOptimized, disable } = useParallax({
    performanceMode: 'low',
    throttleMs: 32, // 30fps
    maxTranslation: 20,
    maxRotation: 5
  })

  useEffect(() => {
    if (performance.fps < 30 && !isOptimized) {
      disable()
    }
  }, [performance.fps, isOptimized, disable])

  return {
    getLayerCSS,
    containerRef,
    performance: {
      ...performance,
      isAdaptive: true
    }
  }
}

export default useParallax