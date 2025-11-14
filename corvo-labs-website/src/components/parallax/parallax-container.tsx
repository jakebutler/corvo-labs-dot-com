/**
 * Parallax Container Component
 *
 * Main container component for implementing sophisticated parallax effects.
 * Provides multi-layer support, performance optimization, and healthcare-themed animations.
 */

'use client'

import React, {
  forwardRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
  ReactNode,
  CSSProperties
} from 'react'
import { motion, useSpring, useTransform, MotionValue } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'

import { useParallax } from '@/hooks/use-parallax'
import { ParallaxConfig } from '@/lib/parallax/parallax-utils'

// ============================================================================
// COMPONENT PROPS
// ============================================================================

export interface ParallaxContainerProps {
  children: ReactNode
  className?: string
  style?: CSSProperties

  // Parallax configuration
  enabled?: boolean
  intensity?: number
  depth?: number
  layerCount?: number

  // Visual effects
  perspective?: number
  transformStyle?: 'flat' | 'preserve-3d'
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto'

  // Performance settings
  performanceMode?: 'high' | 'medium' | 'low'
  targetFPS?: number
  optimizeForMobile?: boolean

  // Behavior
  respectReducedMotion?: boolean
  disableOnMobile?: boolean
  enableTouch?: boolean
  autoReset?: boolean

  // Healthcare themes
  medicalTheme?: boolean
  medicalAnimation?: 'heartbeat' | 'breathing' | 'pulse' | 'wave'
  colorMode?: 'oxygen' | 'diagnostic' | 'healing'

  // Events
  onMouseMove?: (position: any) => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onLayerUpdate?: (layer: any, index: number) => void
  onPerformanceChange?: (metrics: any) => void

  // Advanced options
  customLayers?: any[]
  layerDepth?: number[]
  maxRotation?: number
  maxTranslation?: number
  maxScale?: number
  easing?: number
  throttleMs?: number

  // Debug options
  debug?: boolean
  showPerformanceMonitor?: boolean
}

// ============================================================================
// PERFORMANCE OVERLAY COMPONENT
// ============================================================================

interface PerformanceOverlayProps {
  metrics: any
  visible: boolean
}

const PerformanceOverlay: React.FC<PerformanceOverlayProps> = ({ metrics, visible }) => {
  if (!visible) return null

  return (
    <div className="fixed top-4 right-4 z-50 bg-black/80 text-white p-3 rounded-lg text-xs font-mono">
      <div>FPS: {metrics.fps}</div>
      <div>Optimized: {metrics.isOptimized ? 'Yes' : 'No'}</div>
      <div>Mobile: {metrics.isMobile ? 'Yes' : 'No'}</div>
      <div>Layers: {metrics.layerCount}</div>
      <div>Mouse Active: {metrics.isMouseActive ? 'Yes' : 'No'}</div>
      <div>Mode: {metrics.performanceMode}</div>
    </div>
  )
}

// ============================================================================
// MAIN PARALLAX CONTAINER COMPONENT
// ============================================================================

export const ParallaxContainer = forwardRef<HTMLDivElement, ParallaxContainerProps>(
  ({
    children,
    className = '',
    style = {},

    // Basic configuration
    enabled = true,
    intensity,
    depth,
    layerCount,

    // Visual effects
    perspective = 1000,
    transformStyle = 'preserve-3d',
    overflow = 'visible',

    // Performance settings
    performanceMode,
    targetFPS,
    optimizeForMobile = true,

    // Behavior
    respectReducedMotion = true,
    disableOnMobile = true,
    enableTouch = true,
    autoReset = true,

    // Healthcare themes
    medicalTheme = false,
    medicalAnimation: medicalAnimationProp,
    colorMode,

    // Events
    onMouseMove,
    onMouseEnter,
    onMouseLeave,
    onLayerUpdate,
    onPerformanceChange,

    // Advanced options
    customLayers,
    layerDepth,
    maxRotation,
    maxTranslation,
    maxScale,
    easing,
    throttleMs,

    // Debug options
    debug = false,
    showPerformanceMonitor = false,

    ...rest
  }, ref) => {
    const shouldReduceMotion = useReducedMotion()
    const [isHovering, setIsHovering] = useState(false)
    const [cssProperties, setCssProperties] = useState<Record<string, string>>({})

    // Use parallax hook with all configuration
    const {
      containerRef,
      isInitialized,
      isMouseActive,
      isOptimized,
      layers,
      mousePosition,
      viewport,
      performance: performanceMetrics,
      getCSSProperties,
      getLayerTransform,
      reset,
      enable,
      disable,
      config,
      medicalEffect
    } = useParallax({
      enabled: enabled && !shouldReduceMotion,
      intensity,
      depth,
      layerCount,
      performanceMode,
      targetFPS,
      respectReducedMotion,
      disableOnMobile: optimizeForMobile ? disableOnMobile : false,
      enableTouch,
      autoReset,
      medicalTheme,
      medicalAnimation: medicalAnimationProp,
      colorMode,
      onMouseMove,
      onMouseEnter,
      onMouseLeave,
      onLayerUpdate,
      customLayers,
      layerDepth,
      maxRotation,
      maxTranslation,
      maxScale,
      easing,
      throttleMs,
      onPerformanceChange
    })

    // Merge refs
    const mergedRef = useCallback((element: HTMLDivElement) => {
      containerRef.current = element
      if (typeof ref === 'function') {
        ref(element)
      } else if (ref) {
        ref.current = element
      }
    }, [containerRef, ref])

    // ============================================================================
    // EVENT HANDLERS
    // ============================================================================

    const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
      setIsHovering(true)
      onMouseMove?.(event)
    }, [onMouseMove])

    const handleMouseEnter = useCallback(() => {
      setIsHovering(true)
      onMouseEnter?.()
    }, [onMouseEnter])

    const handleMouseLeave = useCallback(() => {
      setIsHovering(false)
      onMouseLeave?.()
    }, [onMouseLeave])

    // ============================================================================
    // CSS PROPERTIES UPDATES
    // ============================================================================

    useEffect(() => {
      if (isInitialized) {
        const properties = getCSSProperties()
        setCssProperties(properties)
      }
    }, [isInitialized, getCSSProperties, mousePosition, layers])

    // ============================================================================
    // PERFORMANCE ADJUSTMENTS
    // ============================================================================

    useEffect(() => {
      if (performanceMetrics.fps < 30 && !isOptimized) {
        disable()
      } else if (performanceMetrics.fps > 50 && isOptimized) {
        enable()
      }
    }, [performanceMetrics.fps, isOptimized, disable, enable])

    // ============================================================================
    // DYNAMIC STYLES
    // ============================================================================

    const containerStyle = useMemo<CSSProperties>(() => {
      const baseStyle: CSSProperties = {
        ...style,
        perspective,
        transformStyle,
        overflow,
        position: 'relative'
      }

      // Add CSS custom properties for dynamic styling
      Object.entries(cssProperties).forEach(([property, value]) => {
        baseStyle[property as keyof CSSProperties] = value as any
      })

      // Add healthcare-themed styles
      if (medicalTheme && medicalAnimationProp) {
        baseStyle.filter = isHovering
          ? 'brightness(1.05) contrast(1.02)'
          : 'brightness(1) contrast(1)'
      }

      // Add performance-optimized styles
      if (isOptimized || shouldReduceMotion) {
        baseStyle.transition = 'none'
        baseStyle.willChange = 'auto'
      } else {
        baseStyle.willChange = 'transform'
      }

      return baseStyle
    }, [style, perspective, transformStyle, overflow, cssProperties, medicalTheme, medicalAnimationProp, isHovering, isOptimized, shouldReduceMotion, medicalEffect])

    // ============================================================================
    // MOTION CONFIGURATION
    // ============================================================================

    const motionConfig = useMemo(() => {
      if (shouldReduceMotion || isOptimized) {
        return {
          initial: { opacity: 1 },
          animate: { opacity: 1 },
          transition: { duration: 0 }
        }
      }

      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }
    }, [shouldReduceMotion, isOptimized])

    // ============================================================================
    // DEBUG VISUALIZATION
    // ============================================================================

    const debugVisualization = useMemo(() => {
      if (!debug) return null

      return (
        <div className="absolute inset-0 pointer-events-none z-50">
          {/* Mouse position indicator */}
          <div
            className="absolute w-4 h-4 bg-red-500 rounded-full opacity-50"
            style={{
              left: `${mousePosition.normalizedX * 50 + 50}%`,
              top: `${mousePosition.normalizedY * 50 + 50}%`,
              transform: 'translate(-50%, -50%)'
            }}
          />

          {/* Layer depth indicators */}
          {layers.map((layer, index) => (
            <div
              key={index}
              className="absolute border border-blue-500 opacity-30"
              style={{
                inset: `${index * 10}px`,
                zIndex: index
              }}
            />
          ))}
        </div>
      )
    }, [debug, mousePosition, layers])

    // ============================================================================
    // RENDER
    // ============================================================================

    return (
      <>
        <motion.div
          ref={mergedRef}
          className={`parallax-container ${className}`}
          style={containerStyle}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...motionConfig}
          {...rest}
        >
          {/* Render children with enhanced parallax context */}
          <div className="parallax-content">
            {children}
          </div>

          {/* Debug visualization */}
          {debugVisualization}

          {/* Healthcare effect overlay */}
          {medicalTheme && medicalEffect && !shouldReduceMotion && (
            <div
              className="absolute inset-0 pointer-events-none opacity-5 mix-blend-screen"
              style={{
                background: medicalEffect.type === 'heartbeat'
                  ? 'radial-gradient(circle at center, rgba(59, 130, 246, 0.3) 0%, transparent 70%)'
                  : medicalEffect.type === 'breathing'
                  ? 'radial-gradient(circle at center, rgba(16, 185, 129, 0.2) 0%, transparent 60%)'
                  : medicalEffect.type === 'pulse'
                  ? 'radial-gradient(circle at center, rgba(139, 92, 246, 0.25) 0%, transparent 65%)'
                  : 'radial-gradient(circle at center, rgba(6, 182, 212, 0.2) 0%, transparent 70%)',
                animation: `medical-${medicalEffect.type} ${4 / medicalEffect.frequency}s ease-in-out infinite`
              }}
            />
          )}
        </motion.div>

        {/* Performance monitor overlay */}
        <PerformanceOverlay
          metrics={performanceMetrics}
          visible={showPerformanceMonitor}
        />

        {/* Healthcare animation styles */}
        {medicalTheme && (
          <style jsx>{`
            @keyframes medical-heartbeat {
              0%, 100% { transform: scale(1); opacity: 0.05; }
              50% { transform: scale(1.1); opacity: 0.1; }
            }
            @keyframes medical-breathing {
              0%, 100% { transform: scale(1); opacity: 0.05; }
              50% { transform: scale(1.05); opacity: 0.08; }
            }
            @keyframes medical-pulse {
              0%, 100% { transform: scale(1); opacity: 0.05; }
              25% { transform: scale(1.02); opacity: 0.06; }
              75% { transform: scale(1.08); opacity: 0.1; }
            }
            @keyframes medical-wave {
              0% { transform: translateY(0) scale(1); opacity: 0.05; }
              50% { transform: translateY(-5px) scale(1.02); opacity: 0.08; }
              100% { transform: translateY(0) scale(1); opacity: 0.05; }
            }
          `}</style>
        )}
      </>
    )
  }
)

ParallaxContainer.displayName = 'ParallaxContainer'

// ============================================================================
// SPECIALIZED CONTAINER VARIANTS
// ============================================================================

/**
 * Healthcare-themed parallax container with medical effects
 */
export const MedicalParallaxContainer: React.FC<Omit<ParallaxContainerProps, 'medicalTheme'>> = (props) => (
  <ParallaxContainer
    {...props}
    medicalTheme={true}
    medicalAnimation="pulse"
    colorMode="oxygen"
    performanceMode="medium"
  />
)

/**
 * High-performance parallax container for optimized experiences
 */
export const OptimizedParallaxContainer: React.FC<ParallaxContainerProps> = (props) => (
  <ParallaxContainer
    {...props}
    performanceMode="high"
    targetFPS={60}
    throttleMs={16}
    maxTranslation={20}
    maxRotation={5}
  />
)

/**
 * Mobile-friendly parallax container with touch support
 */
export const MobileParallaxContainer: React.FC<ParallaxContainerProps> = (props) => (
  <ParallaxContainer
    {...props}
    enableTouch={true}
    disableOnMobile={false}
    intensity={0.01}
    maxTranslation={15}
    performanceMode="medium"
  />
)

/**
 * Simple parallax container for basic effects
 */
export const SimpleParallaxContainer: React.FC<Omit<ParallaxContainerProps, 'layerCount' | 'intensity'>> = (props) => (
  <ParallaxContainer
    {...props}
    layerCount={1}
    intensity={0.02}
    maxTranslation={10}
    maxRotation={2}
    performanceMode="high"
  />
)

export default ParallaxContainer