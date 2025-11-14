/**
 * Parallax Layer Component
 *
 * Individual parallax layer component for implementing sophisticated depth-based effects.
 * Supports custom transforms, animations, and healthcare-themed styling.
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
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'

import { useParallaxContext } from '@/lib/parallax/parallax-provider'
import { ParallaxLayer as ParallaxLayerType, ParallaxTransform } from '@/lib/parallax/parallax-utils'

// ============================================================================
// COMPONENT PROPS
// ============================================================================

export interface ParallaxLayerProps {
  children: ReactNode
  className?: string
  style?: CSSProperties

  // Layer configuration
  depth?: number
  intensity?: number
  disabled?: boolean

  // Transform overrides
  translateX?: number
  translateY?: number
  translateZ?: number
  rotateX?: number
  rotateY?: number
  rotateZ?: number
  scale?: number
  skewX?: number
  skewY?: number
  opacity?: number

  // Animation settings
  animate?: boolean
  transition?: any
  variants?: any
  initial?: any
  animateWhileInView?: boolean

  // Visual effects
  blur?: number
  brightness?: number
  contrast?: number
  saturate?: number
  hueRotate?: number
  grayscale?: number
  sepia?: number

  // Performance settings
  optimize?: boolean
  willChange?: string[]
  transformOrigin?: string

  // Healthcare themes
  medicalTheme?: boolean
  medicalEffect?: 'heartbeat' | 'breathing' | 'pulse' | 'wave'
  medicalColorMode?: 'oxygen' | 'diagnostic' | 'healing'

  // Events
  onHoverStart?: () => void
  onHoverEnd?: () => void
  onTap?: () => void
  onAnimationComplete?: () => void

  // Debug options
  debug?: boolean
  showBounds?: boolean
  showDepth?: boolean

  // Layout
  position?: 'absolute' | 'relative' | 'fixed' | 'static'
  inset?: string
  zIndex?: number

  // Advanced options
  customTransform?: (transform: ParallaxTransform) => ParallaxTransform
  filterTransform?: (transform: ParallaxTransform) => ParallaxTransform
  springConfig?: any
}

// ============================================================================
// DEPTH INDICATOR COMPONENT
// ============================================================================

interface DepthIndicatorProps {
  depth: number
  visible: boolean
}

const DepthIndicator: React.FC<DepthIndicatorProps> = ({ depth, visible }) => {
  if (!visible) return null

  return (
    <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded z-50">
      Depth: {depth.toFixed(2)}
    </div>
  )
}

// ============================================================================
// BOUNDS VISUALIZATION COMPONENT
// ============================================================================

interface BoundsVisualizationProps {
  visible: boolean
}

const BoundsVisualization: React.FC<BoundsVisualizationProps> = ({ visible }) => {
  if (!visible) return null

  return (
    <div className="absolute inset-0 border-2 border-red-500 border-dashed pointer-events-none z-50">
      <div className="absolute -top-4 -left-4 w-2 h-2 bg-red-500 rounded-full" />
      <div className="absolute -top-4 -right-4 w-2 h-2 bg-red-500 rounded-full" />
      <div className="absolute -bottom-4 -left-4 w-2 h-2 bg-red-500 rounded-full" />
      <div className="absolute -bottom-4 -right-4 w-2 h-2 bg-red-500 rounded-full" />
    </div>
  )
}

// ============================================================================
// MAIN PARALLAX LAYER COMPONENT
// ============================================================================

export const ParallaxLayer = forwardRef<HTMLDivElement, ParallaxLayerProps>(
  ({
    children,
    className = '',
    style = {},

    // Layer configuration
    depth = 0,
    intensity = 1,
    disabled = false,

    // Transform overrides
    translateX,
    translateY,
    translateZ,
    rotateX,
    rotateY,
    rotateZ,
    scale,
    skewX,
    skewY,
    opacity,

    // Animation settings
    animate = true,
    transition,
    variants,
    initial,
    animateWhileInView = false,

    // Visual effects
    blur,
    brightness,
    contrast,
    saturate,
    hueRotate,
    grayscale,
    sepia,

    // Performance settings
    optimize = true,
    willChange = ['transform'],
    transformOrigin = 'center',

    // Healthcare themes
    medicalTheme = false,
    medicalEffect,
    medicalColorMode,

    // Events
    onHoverStart,
    onHoverEnd,
    onTap,
    onAnimationComplete,

    // Debug options
    debug = false,
    showBounds = false,
    showDepth = false,

    // Layout
    position = 'absolute',
    inset = '0',
    zIndex,

    // Advanced options
    customTransform,
    filterTransform,
    springConfig = { stiffness: 400, damping: 30 },

    ...rest
  }, ref) => {
    const shouldReduceMotion = useReducedMotion()
    const context = useParallaxContext()
    const [isInView, setIsInView] = useState(true)
    const [isHovering, setIsHovering] = useState(false)
    const [currentTransform, setCurrentTransform] = useState<ParallaxTransform>({
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
    })

    const layerRef = useRef<HTMLDivElement>(null)
    const observerRef = useRef<IntersectionObserver>()

    // Merge refs
    const mergedRef = useCallback((element: HTMLDivElement) => {
      layerRef.current = element
      if (typeof ref === 'function') {
        ref(element)
      } else if (ref) {
        ref.current = element
      }
    }, [ref])

    // ============================================================================
    // PARALLAX TRANSFORM CALCULATION
    // ============================================================================

    const calculateParallaxTransform = useCallback((): ParallaxTransform => {
      if (disabled || (context?.config.respectReducedMotion && shouldReduceMotion)) {
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

      // Get base transform from context or calculate locally
      let baseTransform: ParallaxTransform

      if (context?.layers && context.layers.length > 0) {
        // Use context layer transform
        const contextLayer = context.layers.find(l => Math.abs(l.depth - depth) < 0.1)
        baseTransform = contextLayer?.transform || {
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
      } else {
        // Calculate transform locally
        const mouseMultiplier = intensity * (depth + 1)
        baseTransform = {
          translateX: 0,
          translateY: 0,
          translateZ: depth * 10,
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          scale: 1,
          skewX: 0,
          skewY: 0,
          opacity: Math.max(0.3, 1 - depth * 0.1)
        }
      }

      // Apply manual overrides
      const overriddenTransform = {
        translateX: translateX ?? baseTransform.translateX,
        translateY: translateY ?? baseTransform.translateY,
        translateZ: translateZ ?? baseTransform.translateZ,
        rotateX: rotateX ?? baseTransform.rotateX,
        rotateY: rotateY ?? baseTransform.rotateY,
        rotateZ: rotateZ ?? baseTransform.rotateZ,
        scale: scale ?? baseTransform.scale,
        skewX: skewX ?? baseTransform.skewX,
        skewY: skewY ?? baseTransform.skewY,
        opacity: opacity ?? baseTransform.opacity
      }

      // Apply custom transform function
      if (customTransform) {
        return customTransform(overriddenTransform)
      }

      // Apply filter transform
      if (filterTransform) {
        return filterTransform(overriddenTransform)
      }

      return overriddenTransform
    }, [
      disabled,
      context,
      shouldReduceMotion,
      depth,
      intensity,
      translateX,
      translateY,
      translateZ,
      rotateX,
      rotateY,
      rotateZ,
      scale,
      skewX,
      skewY,
      opacity,
      customTransform,
      filterTransform
    ])

    // ============================================================================
    // MOTION VALUES AND SPRINGS
    // ============================================================================

    const motionTranslateX = useMotionValue(0)
    const motionTranslateY = useMotionValue(0)
    const motionRotateX = useMotionValue(0)
    const motionRotateY = useMotionValue(0)
    const motionScale = useMotionValue(1)
    const motionOpacity = useMotionValue(1)

    const springTranslateX = useSpring(motionTranslateX, springConfig)
    const springTranslateY = useSpring(motionTranslateY, springConfig)
    const springRotateX = useSpring(motionRotateX, springConfig)
    const springRotateY = useSpring(motionRotateY, springConfig)
    const springScale = useSpring(motionScale, springConfig)
    const springOpacity = useSpring(motionOpacity, springConfig)

    // ============================================================================
    // INTERSECTION OBSERVER
    // ============================================================================

    useEffect(() => {
      if (!animateWhileInView || !layerRef.current) return

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          setIsInView(entry.isIntersecting)
        },
        { threshold: 0.1 }
      )

      observerRef.current.observe(layerRef.current)

      return () => {
        observerRef.current?.disconnect()
      }
    }, [animateWhileInView])

    // ============================================================================
    // TRANSFORM UPDATES
    // ============================================================================

    useEffect(() => {
      const transform = calculateParallaxTransform()
      setCurrentTransform(transform)

      // Update motion values
      motionTranslateX.set(transform.translateX)
      motionTranslateY.set(transform.translateY)
      motionRotateX.set(transform.rotateX)
      motionRotateY.set(transform.rotateY)
      motionScale.set(transform.scale)
      motionOpacity.set(transform.opacity)
    }, [calculateParallaxTransform, motionTranslateX, motionTranslateY, motionRotateX, motionRotateY, motionScale, motionOpacity])

    // ============================================================================
    // DYNAMIC STYLES
    // ============================================================================

    const layerStyle = useMemo<CSSProperties>(() => {
      const baseStyle: CSSProperties = {
        ...style,
        position,
        inset,
        transformOrigin,
        willChange: optimize && !shouldReduceMotion ? willChange.join(', ') : 'auto'
      }

      // Set z-index based on depth
      if (zIndex !== undefined) {
        baseStyle.zIndex = zIndex
      } else if (depth !== undefined) {
        baseStyle.zIndex = Math.floor((1 - depth) * 1000)
      }

      // Apply visual effects
      const filters = []
      if (blur) filters.push(`blur(${blur}px)`)
      if (brightness) filters.push(`brightness(${brightness})`)
      if (contrast) filters.push(`contrast(${contrast})`)
      if (saturate) filters.push(`saturate(${saturate})`)
      if (hueRotate) filters.push(`hue-rotate(${hueRotate}deg)`)
      if (grayscale) filters.push(`grayscale(${grayscale})`)
      if (sepia) filters.push(`sepia(${sepia})`)

      if (filters.length > 0) {
        baseStyle.filter = filters.join(' ')
      }

      // Healthcare theme effects
      if (medicalTheme && !shouldReduceMotion) {
        baseStyle.mixBlendMode = isHovering ? 'screen' : 'normal'
        baseStyle.filter = `${baseStyle.filter || ''} ${isHovering ? 'brightness(1.1)' : 'brightness(1)'}`.trim()
      }

      return baseStyle
    }, [
      style,
      position,
      inset,
      transformOrigin,
      optimize,
      shouldReduceMotion,
      willChange,
      zIndex,
      depth,
      blur,
      brightness,
      contrast,
      saturate,
      hueRotate,
      grayscale,
      sepia,
      medicalTheme,
      isHovering
    ])

    // ============================================================================
    // MOTION CONFIGURATION
    // ============================================================================

    const motionConfig = useMemo(() => {
      if (disabled || shouldReduceMotion || !animate || (animateWhileInView && !isInView)) {
        return {
          initial: { opacity: 1, scale: 1 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0 }
        }
      }

      const config: any = {
        initial: initial || { opacity: 0, scale: 0.9 },
        animate: { opacity: springOpacity, scale: springScale },
        transition: transition || {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }

      if (variants) {
        config.variants = variants
      }

      return config
    }, [disabled, shouldReduceMotion, animate, animateWhileInView, isInView, initial, springOpacity, springScale, transition, variants])

    // ============================================================================
    // EVENT HANDLERS
    // ============================================================================

    const handleHoverStart = useCallback(() => {
      setIsHovering(true)
      onHoverStart?.()
    }, [onHoverStart])

    const handleHoverEnd = useCallback(() => {
      setIsHovering(false)
      onHoverEnd?.()
    }, [onHoverEnd])

    const handleTap = useCallback(() => {
      onTap?.()
    }, [onTap])

    const handleAnimationComplete = useCallback(() => {
      onAnimationComplete?.()
    }, [onAnimationComplete])

    // ============================================================================
    // RENDER
    // ============================================================================

    return (
      <AnimatePresence>
        <motion.div
          ref={mergedRef}
          className={`parallax-layer ${className}`}
          style={{
            ...layerStyle,
            translateX: springTranslateX,
            translateY: springTranslateY,
            rotateX: springRotateX,
            rotateY: springRotateY,
            scale: springScale,
            opacity: springOpacity
          }}
          onHoverStart={handleHoverStart}
          onHoverEnd={handleHoverEnd}
          onTap={handleTap}
          onAnimationComplete={handleAnimationComplete}
          {...motionConfig}
          {...rest}
        >
          {children}

          {/* Debug visualizations */}
          {debug && (
            <>
              <DepthIndicator depth={depth} visible={showDepth} />
              <BoundsVisualization visible={showBounds} />
            </>
          )}

          {/* Healthcare effect overlay */}
          {medicalTheme && medicalEffect && !shouldReduceMotion && (
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                background: medicalEffect === 'heartbeat'
                  ? 'radial-gradient(circle at center, rgba(239, 68, 68, 0.3) 0%, transparent 70%)'
                  : medicalEffect === 'breathing'
                  ? 'radial-gradient(circle at center, rgba(16, 185, 129, 0.3) 0%, transparent 60%)'
                  : medicalEffect === 'pulse'
                  ? 'radial-gradient(circle at center, rgba(139, 92, 246, 0.3) 0%, transparent 65%)'
                  : 'radial-gradient(circle at center, rgba(6, 182, 212, 0.3) 0%, transparent 70%)',
                animation: `medical-${medicalEffect} ${4 / (depth + 1)}s ease-in-out infinite`
              }}
            />
          )}
        </motion.div>
      </AnimatePresence>
    )
  }
)

ParallaxLayer.displayName = 'ParallaxLayer'

// ============================================================================
// SPECIALIZED LAYER VARIANTS
// ============================================================================

/**
 * Background parallax layer - deepest layer with subtle movement
 */
export const BackgroundParallaxLayer: React.FC<Omit<ParallaxLayerProps, 'depth' | 'intensity'>> = (props) => (
  <ParallaxLayer
    {...props}
    depth={0.9}
    intensity={0.3}
    opacity={0.6}
    blur={props.blur || 1}
    scale={1.05}
  />
)

/**
 * Midground parallax layer - medium depth with moderate movement
 */
export const MidgroundParallaxLayer: React.FC<Omit<ParallaxLayerProps, 'depth' | 'intensity'>> = (props) => (
  <ParallaxLayer
    {...props}
    depth={0.5}
    intensity={0.6}
    opacity={0.8}
    scale={1.02}
  />
)

/**
 * Foreground parallax layer - closest layer with strong movement
 */
export const ForegroundParallaxLayer: React.FC<Omit<ParallaxLayerProps, 'depth' | 'intensity'>> = (props) => (
  <ParallaxLayer
    {...props}
    depth={0.1}
    intensity={1.0}
    opacity={1}
    scale={1}
  />
)

/**
 * Medical-themed parallax layer with healthcare effects
 */
export const MedicalParallaxLayer: React.FC<Omit<ParallaxLayerProps, 'medicalTheme'>> = (props) => (
  <ParallaxLayer
    {...props}
    medicalTheme={true}
    medicalEffect="pulse"
    medicalColorMode="oxygen"
    mixBlendMode="screen"
  />
)

/**
 * Interactive parallax layer with enhanced hover effects
 */
export const InteractiveParallaxLayer: React.FC<ParallaxLayerProps> = (props) => (
  <ParallaxLayer
    {...props}
    intensity={1.2}
    scale={1.05}
    transition={{
      type: "spring",
      stiffness: 300,
      damping: 30
    }}
    whileHover={{
      scale: 1.02,
      rotateZ: 2
    }}
    whileTap={{
      scale: 0.98
    }}
  />
)

/**
 * Performance-optimized parallax layer for high-frame-rate applications
 */
export const OptimizedParallaxLayer: React.FC<ParallaxLayerProps> = (props) => (
  <ParallaxLayer
    {...props}
    optimize={true}
    willChange={['transform']}
    maxRotation={5}
    maxTranslation={15}
    intensity={0.5}
    blur={0}
  />
)

export default ParallaxLayer