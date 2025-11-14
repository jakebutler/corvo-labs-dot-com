/**
 * Parallax Provider
 *
 * Context provider for managing parallax state across the application.
 * Provides centralized parallax configuration, mouse tracking, and performance optimization.
 */

'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  ReactNode
} from 'react'
import { useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'

import {
  ParallaxConfig,
  MousePosition,
  ViewportDimensions,
  ParallaxLayer,
  PerformanceMetrics,
  DEFAULT_PARALLAX_CONFIG,
  calculateMousePosition,
  getViewportDimensions,
  generateParallaxLayers,
  getDeviceCapabilities,
  getOptimalPerformanceSettings,
  throttle,
  debounce,
  useParallaxPerformance
} from './parallax-utils'

// ============================================================================
// CONTEXT TYPES
// ============================================================================

export interface ParallaxContextType {
  // Configuration
  config: ParallaxConfig
  updateConfig: (updates: Partial<ParallaxConfig>) => void

  // Mouse tracking
  mousePosition: MousePosition
  viewport: ViewportDimensions
  isMouseActive: boolean

  // Parallax layers
  layers: ParallaxLayer[]
  generateLayers: (count: number) => void

  // Performance
  performance: ReturnType<typeof useParallaxPerformance>
  isOptimized: boolean

  // Methods
  enable: () => void
  disable: () => void
  reset: () => void
  updateLayerTransform: (layerIndex: number, transform: Partial<ParallaxLayer>) => void
}

const ParallaxContext = createContext<ParallaxContextType | null>(null)

// ============================================================================
// PROVIDER COMPONENT
// ============================================================================

interface ParallaxProviderProps {
  children: ReactNode
  config?: Partial<ParallaxConfig>
  enabled?: boolean
  performanceMode?: 'high' | 'medium' | 'low'
  respectReducedMotion?: boolean
}

export function ParallaxProvider({
  children,
  config: userConfig = {},
  enabled = true,
  performanceMode: userPerformanceMode,
  respectReducedMotion = true
}: ParallaxProviderProps) {
  const shouldReduceMotion = useReducedMotion()
  const [isInitialized, setIsInitialized] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Configuration state
  const [config, setConfig] = useState<ParallaxConfig>(() => ({
    ...DEFAULT_PARALLAX_CONFIG,
    ...userConfig,
    enabled,
    respectReducedMotion,
    performanceMode: userPerformanceMode || 'high'
  }))

  // Viewport and mouse state
  const [viewport, setViewport] = useState<ViewportDimensions>(getViewportDimensions())
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
    clientX: 0,
    clientY: 0,
    velocityX: 0,
    velocityY: 0,
    timestamp: Date.now() as any
  })
  const [isMouseActive, setIsMouseActive] = useState(false)

  // Parallax layers
  const [layers, setLayers] = useState<ParallaxLayer[]>([])
  const [layerCount, setLayerCount] = useState(5)

  // Motion values for smooth animations
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 400, damping: 30 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 400, damping: 30 })

  // Performance monitoring
  const performance = useParallaxPerformance()
  const [isOptimized, setIsOptimized] = useState(false)

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  useEffect(() => {
    if (!isInitialized) {
      // Initialize parallax layers
      const initialLayers = generateParallaxLayers(layerCount, config)
      setLayers(initialLayers)

      // Set initial performance mode
      if (userPerformanceMode) {
        setConfig(prev => ({ ...prev, performanceMode: userPerformanceMode }))
      } else {
        const optimalMode = getOptimalPerformanceSettings(performance.metrics || getDeviceCapabilities())
        setConfig(prev => ({ ...prev, performanceMode: optimalMode }))
      }

      setIsInitialized(true)
    }
  }, [isInitialized, layerCount, config, userPerformanceMode, performance.metrics])

  // ============================================================================
  // VIEWPORT HANDLING
  // ============================================================================

  const updateViewport = useCallback(() => {
    const newViewport = getViewportDimensions()
    setViewport(newViewport)
  }, [])

  useEffect(() => {
    updateViewport()
    const handleResize = debounce(updateViewport, 250)
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [updateViewport])

  // ============================================================================
  // MOUSE TRACKING
  // ============================================================================

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!config.enabled || (config.respectReducedMotion && shouldReduceMotion)) return

    const newPosition = calculateMousePosition(event, viewport, mousePosition)
    setMousePosition(newPosition)
    setIsMouseActive(true)

    // Update motion values for smooth animations
    mouseX.set(newPosition.normalizedX)
    mouseY.set(newPosition.normalizedY)

    // Update layer transforms
    setLayers(prevLayers =>
      prevLayers.map(layer => ({
        ...layer,
        lastMousePosition: newPosition
      }))
    )
  }, [config.enabled, config.respectReducedMotion, shouldReduceMotion, viewport, mousePosition, mouseX, mouseY])

  const handleTouchMove = useCallback((event: TouchEvent) => {
    if (!config.enabled || (config.respectReducedMotion && shouldReduceMotion)) return
    handleMouseMove(event as any)
  }, [config.enabled, config.respectReducedMotion, shouldReduceMotion, handleMouseMove])

  const handleMouseEnter = useCallback(() => {
    setIsMouseActive(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsMouseActive(false)
    // Reset mouse position gradually
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
  }, [mouseX, mouseY])

  // Mouse event listeners
  useEffect(() => {
    if (!config.enabled) return

    const throttledMouseMove = throttle(handleMouseMove, 1000 / 60) // 60fps throttle
    const throttledTouchMove = throttle(handleTouchMove, 1000 / 60)

    document.addEventListener('mousemove', throttledMouseMove)
    document.addEventListener('touchmove', throttledTouchMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', throttledMouseMove)
      document.removeEventListener('touchmove', throttledTouchMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [config.enabled, handleMouseMove, handleTouchMove, handleMouseEnter, handleMouseLeave])

  // ============================================================================
  // PERFORMANCE OPTIMIZATION
  // ============================================================================

  useEffect(() => {
    if (performance.metrics) {
      const optimalMode = getOptimalPerformanceSettings(performance.metrics)

      // Update performance mode if needed
      if (optimalMode !== config.performanceMode) {
        setConfig(prev => ({ ...prev, performanceMode: optimalMode }))
      }

      // Update optimization state
      setIsOptimized(
        performance.performanceMode === 'low' ||
        performance.metrics.fps < 30 ||
        (config.respectReducedMotion && shouldReduceMotion)
      )
    }
  }, [performance.metrics, performance.performanceMode, config.performanceMode, config.respectReducedMotion, shouldReduceMotion])

  // ============================================================================
  // CONFIGURATION MANAGEMENT
  // ============================================================================

  const updateConfig = useCallback((updates: Partial<ParallaxConfig>) => {
    setConfig(prev => {
      const newConfig = { ...prev, ...updates }

      // Regenerate layers if depth changed
      if (updates.depthLayers && updates.depthLayers !== prev.depthLayers) {
        const newLayers = generateParallaxLayers(updates.depthLayers, newConfig)
        setLayers(newLayers)
        setLayerCount(updates.depthLayers)
      }

      return newConfig
    })
  }, [])

  // ============================================================================
  // LAYER MANAGEMENT
  // ============================================================================

  const generateLayers = useCallback((count: number) => {
    const newLayers = generateParallaxLayers(count, config)
    setLayers(newLayers)
    setLayerCount(count)
    setConfig(prev => ({ ...prev, depthLayers: count }))
  }, [config])

  const updateLayerTransform = useCallback((layerIndex: number, updates: Partial<ParallaxLayer>) => {
    setLayers(prevLayers =>
      prevLayers.map((layer, index) =>
        index === layerIndex ? { ...layer, ...updates } : layer
      )
    )
  }, [])

  // ============================================================================
  // CONTROL METHODS
  // ============================================================================

  const enable = useCallback(() => {
    updateConfig({ enabled: true })
  }, [updateConfig])

  const disable = useCallback(() => {
    updateConfig({ enabled: false })
    // Reset transforms
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
  }, [updateConfig])

  const reset = useCallback(() => {
    // Reset mouse position
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
      timestamp: Date.now() as any
    })
    setIsMouseActive(false)

    // Reset layers
    const initialLayers = generateParallaxLayers(layerCount, config)
    setLayers(initialLayers)

    // Reset config to defaults
    setConfig({
      ...DEFAULT_PARALLAX_CONFIG,
      ...userConfig,
      enabled,
      respectReducedMotion
    })
  }, [mouseX, mouseY, layerCount, config, userConfig, enabled, respectReducedMotion])

  // ============================================================================
  // CONTEXT VALUE
  // ============================================================================

  const contextValue: ParallaxContextType = {
    config,
    updateConfig,
    mousePosition,
    viewport,
    isMouseActive,
    layers,
    generateLayers,
    performance,
    isOptimized,
    enable,
    disable,
    reset,
    updateLayerTransform
  }

  return (
    <ParallaxContext.Provider value={contextValue}>
      <div ref={containerRef} className="parallax-provider">
        {children}
      </div>
    </ParallaxContext.Provider>
  )
}

// ============================================================================
// HOOK FOR USING PARALLAX CONTEXT
// ============================================================================

export function useParallaxContext(): ParallaxContextType {
  const context = useContext(ParallaxContext)
  if (!context) {
    throw new Error('useParallaxContext must be used within a ParallaxProvider')
  }
  return context
}

// ============================================================================
// CONSUMER COMPONENT
// ============================================================================

interface ParallaxConsumerProps {
  children: (context: ParallaxContextType) => ReactNode
}

export function ParallaxConsumer({ children }: ParallaxConsumerProps) {
  const context = useParallaxContext()
  return <>{children(context)}</>
}

export default ParallaxProvider