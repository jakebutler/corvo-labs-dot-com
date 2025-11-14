/**
 * Parallax Utility Functions
 *
 * Core utilities for calculating parallax effects, performance optimization,
 * and healthcare-themed visual transformations.
 */

'use client';

import { useCallback, useMemo, useState, useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'

// ============================================================================
// PARALLAX CONFIGURATION
// ============================================================================

export interface ParallaxConfig {
  enabled: boolean
  intensity: number
  easing: number
  maxRotation: number
  maxTranslation: number
  perspective: number
  depthLayers: number
  performanceMode: 'high' | 'medium' | 'low'
  respectReducedMotion: boolean
}

export const DEFAULT_PARALLAX_CONFIG: ParallaxConfig = {
  enabled: true,
  intensity: 0.02,
  easing: 0.8,
  maxRotation: 15,
  maxTranslation: 30,
  perspective: 1000,
  depthLayers: 5,
  performanceMode: 'high',
  respectReducedMotion: true
}

// Healthcare-themed easing functions
export const HEALTHCARE_EASING = {
  medical: [0.25, 0.46, 0.45, 0.94], // Smooth, professional
  precision: [0.87, 0, 0.13, 1], // Sharp, accurate
  gentle: [0.23, 1, 0.32, 1], // Soft, caring
  confident: [0.68, -0.55, 0.265, 1.55], // Bold, impressive
  healing: [0.4, 0, 0.2, 1], // Gradual, therapeutic
  diagnostic: [0.8, 0, 0.2, 1] // Quick, precise
}

// Healthcare color palette for parallax effects
export const HEALTHCARE_COLORS = {
  primary: '#2563eb', // Medical blue
  secondary: '#7c3aed', // Trust purple
  accent: '#06b6d4', // Technology cyan
  success: '#10b981', // Health green
  warning: '#f59e0b', // Alert amber
  danger: '#ef4444', // Critical red
  neutral: ['#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1'], // Professional grays
  ai: ['#3b82f6', '#8b5cf6', '#ec4899'] // AI gradient colors
}

// ============================================================================
// MOUSE POSITION CALCULATIONS
// ============================================================================

export interface MousePosition {
  x: number
  y: number
  normalizedX: number
  normalizedY: number
  clientX: number
  clientY: number
  velocityX: number
  velocityY: number
  timestamp?: number
}

export interface ViewportDimensions {
  width: number
  height: number
  centerX: number
  centerY: number
  aspectRatio: number
}

/**
 * Calculate normalized mouse position relative to viewport
 */
export const calculateMousePosition = (
  event: MouseEvent | TouchEvent,
  viewport: ViewportDimensions,
  previousPosition?: MousePosition
): MousePosition => {
  const clientX = 'touches' in event ? event.touches[0]?.clientX || 0 : event.clientX
  const clientY = 'touches' in event ? event.touches[0]?.clientY || 0 : event.clientY

  // Calculate normalized position (-1 to 1)
  const normalizedX = (clientX - viewport.centerX) / (viewport.width / 2)
  const normalizedY = (clientY - viewport.centerY) / (viewport.height / 2)

  // Calculate velocity
  const currentTime = Date.now()
  const deltaTime = previousPosition ? currentTime - (previousPosition as any).timestamp : 16
  const velocityX = previousPosition ? (clientX - previousPosition.clientX) / deltaTime : 0
  const velocityY = previousPosition ? (clientY - previousPosition.clientY) / deltaTime : 0

  return {
    x: normalizedX,
    y: normalizedY,
    normalizedX,
    normalizedY,
    clientX,
    clientY,
    velocityX,
    velocityY,
    timestamp: currentTime
  }
}

/**
 * Get viewport dimensions with aspect ratio
 */
export const getViewportDimensions = (): ViewportDimensions => {
  const width = window.innerWidth
  const height = window.innerHeight

  return {
    width,
    height,
    centerX: width / 2,
    centerY: height / 2,
    aspectRatio: width / height
  }
}

// ============================================================================
// PARALLAX TRANSFORM CALCULATIONS
// ============================================================================

export interface ParallaxTransform {
  translateX: number
  translateY: number
  translateZ: number
  rotateX: number
  rotateY: number
  rotateZ: number
  scale: number
  skewX: number
  skewY: number
  opacity: number
}

export interface ParallaxLayer {
  depth: number
  intensity: number
  transform: ParallaxTransform
  perspective: number
}

/**
 * Calculate parallax transform for a specific layer
 */
export const calculateParallaxTransform = (
  mousePosition: MousePosition,
  layer: ParallaxLayer,
  config: ParallaxConfig,
  isMobile: boolean = false
): ParallaxTransform => {
  const { x, y, velocityX, velocityY } = mousePosition
  const { depth, intensity } = layer
  const { maxRotation, maxTranslation, perspective } = config

  // Adjust intensity for mobile devices
  const adjustedIntensity = isMobile ? intensity * 0.5 : intensity
  const depthMultiplier = depth + 1

  // Translation calculations
  const translateX = x * maxTranslation * adjustedIntensity * depthMultiplier
  const translateY = y * maxTranslation * adjustedIntensity * depthMultiplier
  const translateZ = depth * 10 * adjustedIntensity // Simulate depth

  // Rotation calculations
  const rotateX = y * maxRotation * adjustedIntensity * 0.1
  const rotateY = x * maxRotation * adjustedIntensity * 0.1
  const rotateZ = (x + y) * maxRotation * adjustedIntensity * 0.05

  // Scale calculations (subtle zoom effect)
  const scale = 1 + (Math.abs(x) + Math.abs(y)) * 0.01 * adjustedIntensity

  // Skew calculations for dynamic distortion
  const skewX = velocityX * 2 * adjustedIntensity
  const skewY = velocityY * 2 * adjustedIntensity

  // Opacity for depth perception
  const opacity = Math.max(0.3, 1 - depth * 0.1)

  return {
    translateX,
    translateY,
    translateZ,
    rotateX,
    rotateY,
    rotateZ,
    scale,
    skewX,
    skewY,
    opacity
  }
}

/**
 * Generate parallax layers with depth-based properties
 */
export const generateParallaxLayers = (
  count: number,
  config: ParallaxConfig
): ParallaxLayer[] => {
  return Array.from({ length: count }, (_, index) => {
    const depth = index / (count - 1) // 0 to 1
    const intensity = 1 - (depth * 0.7) // Foreground moves more

    return {
      depth,
      intensity,
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
      },
      perspective: config.perspective
    }
  })
}

// ============================================================================
// PERFORMANCE OPTIMIZATION
// ============================================================================

export interface PerformanceMetrics {
  fps: number
  frameTime: number
  memoryUsage: number
  deviceMemory: number
  hardwareConcurrency: number
  webglSupported: boolean
  reducedMotion: boolean
}

/**
 * Get device performance capabilities
 */
export const getDeviceCapabilities = (): PerformanceMetrics => {
  const navigator = window.navigator as any
  const performance = window.performance as any

  return {
    fps: 60, // Default, will be updated by monitoring
    frameTime: 16.67, // Default for 60fps
    memoryUsage: performance.memory?.usedJSHeapSize || 0,
    deviceMemory: navigator.deviceMemory || 4,
    hardwareConcurrency: navigator.hardwareConcurrency || 4,
    webglSupported: !!document.createElement('canvas').getContext('webgl'),
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }
}

/**
 * Determine optimal performance settings based on device capabilities
 */
export const getOptimalPerformanceSettings = (
  capabilities: PerformanceMetrics
): 'high' | 'medium' | 'low' => {
  const { deviceMemory, hardwareConcurrency, webglSupported, reducedMotion } = capabilities

  if (reducedMotion) return 'low'
  if (!webglSupported) return 'medium'
  if (deviceMemory < 4 || hardwareConcurrency < 4) return 'medium'
  if (deviceMemory >= 8 && hardwareConcurrency >= 8) return 'high'

  return 'medium'
}

/**
 * Throttle function for performance optimization
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | null = null
  let lastExecTime = 0

  return (...args: Parameters<T>) => {
    const currentTime = Date.now()

    if (currentTime - lastExecTime > delay) {
      func(...args)
      lastExecTime = currentTime
    } else {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        func(...args)
        lastExecTime = Date.now()
      }, delay - (currentTime - lastExecTime))
    }
  }
}

/**
 * Debounce function for smooth transitions
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

// ============================================================================
// CSS TRANSFORM GENERATION
// ============================================================================

/**
 * Generate CSS transform string from parallax transform object
 */
export const generateCSSTransform = (transform: ParallaxTransform): string => {
  const {
    translateX,
    translateY,
    translateZ,
    rotateX,
    rotateY,
    rotateZ,
    scale,
    skewX,
    skewY
  } = transform

  return `
    translate3d(${translateX}px, ${translateY}px, ${translateZ}px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    rotateZ(${rotateZ}deg)
    scale(${scale})
    skew(${skewX}deg, ${skewY}deg)
  `.replace(/\s+/g, ' ').trim()
}

/**
 * Generate CSS custom properties for dynamic styling
 */
export const generateCSSCustomProperties = (
  mousePosition: MousePosition,
  layers: ParallaxLayer[]
): Record<string, string> => {
  const properties: Record<string, string> = {}

  // Mouse position properties
  properties['--mouse-x'] = `${(mousePosition.x + 1) * 50}%`
  properties['--mouse-y'] = `${(mousePosition.y + 1) * 50}%`
  properties['--mouse-velocity-x'] = `${Math.abs(mousePosition.velocityX * 100)}`
  properties['--mouse-velocity-y'] = `${Math.abs(mousePosition.velocityY * 100)}`

  // Layer-specific properties
  layers.forEach((layer, index) => {
    const prefix = `--parallax-${index}`
    const { transform } = layer

    properties[`${prefix}-translate-x`] = `${transform.translateX}px`
    properties[`${prefix}-translate-y`] = `${transform.translateY}px`
    properties[`${prefix}-translate-z`] = `${transform.translateZ}px`
    properties[`${prefix}-rotate-x`] = `${transform.rotateX}deg`
    properties[`${prefix}-rotate-y`] = `${transform.rotateY}deg`
    properties[`${prefix}-scale`] = transform.scale.toString()
    properties[`${prefix}-opacity`] = transform.opacity.toString()
  })

  return properties
}

// ============================================================================
// HEALTHCARE-SPECIFIC EFFECTS
// ============================================================================

/**
 * Generate medical-themed parallax effects
 */
export const getMedicalParallaxEffect = (
  intensity: number,
  type: 'heartbeat' | 'breathing' | 'pulse' | 'wave' = 'pulse'
): { amplitude: number; frequency: number; phase: number } => {
  switch (type) {
    case 'heartbeat':
      return {
        amplitude: intensity * 5,
        frequency: 1.2, // ~72 bpm
        phase: 0
      }
    case 'breathing':
      return {
        amplitude: intensity * 2,
        frequency: 0.2, // ~12 breaths per minute
        phase: Math.PI / 2
      }
    case 'pulse':
      return {
        amplitude: intensity * 3,
        frequency: 0.8, // Medical monitoring pulse
        phase: 0
      }
    case 'wave':
      return {
        amplitude: intensity * 4,
        frequency: 0.5, // Brain wave frequency
        phase: Math.PI / 4
      }
    default:
      return {
        amplitude: intensity * 3,
        frequency: 0.8,
        phase: 0
      }
  }
}

/**
 * Apply medical-themed color adjustments
 */
export const getMedicalColorAdjustment = (
  baseColor: string,
  intensity: number,
  type: 'oxygen' | 'diagnostic' | 'healing' = 'oxygen'
): string => {
  // Simple color manipulation for healthcare themes
  // In production, you'd use a proper color manipulation library
  const colors = {
    oxygen: {
      base: HEALTHCARE_COLORS.primary,
      tint: HEALTHCARE_COLORS.accent
    },
    diagnostic: {
      base: HEALTHCARE_COLORS.secondary,
      tint: HEALTHCARE_COLORS.success
    },
    healing: {
      base: HEALTHCARE_COLORS.success,
      tint: HEALTHCARE_COLORS.primary
    }
  }

  const { base, tint } = colors[type]
  return intensity > 0.5 ? base : tint
}

// ============================================================================
// UTILITY HOOKS
// ============================================================================

/**
 * Custom hook for parallax calculations
 */
export const useParallaxCalculations = (
  config: ParallaxConfig,
  isMobile: boolean = false
) => {
  const shouldReduceMotion = useReducedMotion()

  const calculateTransform = useCallback((
    mousePosition: MousePosition,
    layer: ParallaxLayer
  ): ParallaxTransform => {
    if (!config.enabled || (config.respectReducedMotion && shouldReduceMotion)) {
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

    return calculateParallaxTransform(mousePosition, layer, config, isMobile)
  }, [config, isMobile, shouldReduceMotion])

  const generateLayers = useCallback((count: number): ParallaxLayer[] => {
    return generateParallaxLayers(count, config)
  }, [config])

  return {
    calculateTransform,
    generateLayers,
    shouldReduceMotion
  }
}

/**
 * Performance monitoring hook
 */
export const useParallaxPerformance = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const [performanceMode, setPerformanceMode] = useState<'high' | 'medium' | 'low'>('high')

  useEffect(() => {
    const capabilities = getDeviceCapabilities()
    setMetrics(capabilities)
    setPerformanceMode(getOptimalPerformanceSettings(capabilities))

    // Monitor performance
    let frameCount = 0
    let lastTime = performance.now()

    const measureFPS = () => {
      frameCount++
      const currentTime = performance.now()

      if (currentTime - lastTime >= 1000) {
        const fps = frameCount
        frameCount = 0
        lastTime = currentTime

        // Adjust performance mode based on FPS
        if (fps < 30) {
          setPerformanceMode('low')
        } else if (fps < 45) {
          setPerformanceMode('medium')
        } else {
          setPerformanceMode('high')
        }
      }

      if (performanceMode !== 'low') {
        requestAnimationFrame(measureFPS)
      }
    }

    requestAnimationFrame(measureFPS)
  }, [performanceMode])

  return {
    metrics,
    performanceMode,
    shouldReduceMotion: metrics?.reducedMotion || false
  }
}

export default {
  DEFAULT_PARALLAX_CONFIG,
  HEALTHCARE_EASING,
  HEALTHCARE_COLORS,
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
  getMedicalColorAdjustment,
  useParallaxCalculations,
  useParallaxPerformance
}