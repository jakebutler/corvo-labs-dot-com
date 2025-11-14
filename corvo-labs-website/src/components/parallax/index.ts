/**
 * Parallax System Exports
 *
 * Central export point for all parallax components, hooks, and utilities.
 * Provides easy access to the complete parallax system.
 */

// ============================================================================
// CORE COMPONENTS
// ============================================================================

export {
  ParallaxContainer,
  MedicalParallaxContainer,
  OptimizedParallaxContainer,
  MobileParallaxContainer,
  SimpleParallaxContainer
} from './parallax-container'

export {
  ParallaxLayer,
  BackgroundParallaxLayer,
  MidgroundParallaxLayer,
  ForegroundParallaxLayer,
  MedicalParallaxLayer,
  InteractiveParallaxLayer,
  OptimizedParallaxLayer
} from './parallax-layer'

export {
  ParallaxShowcase
} from './parallax-showcase'

// ============================================================================
// PROVIDER AND CONTEXT
// ============================================================================

export {
  ParallaxProvider,
  useParallaxContext,
  ParallaxConsumer
} from '@/lib/parallax/parallax-provider'

// ============================================================================
// HOOKS
// ============================================================================

export {
  useParallax,
  useSimpleParallax,
  useLayeredParallax,
  useMedicalParallax,
  useOptimizedParallax
} from '@/hooks/use-parallax'

// ============================================================================
// UTILITIES AND TYPES
// ============================================================================

export {
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
} from '@/lib/parallax/parallax-utils'

// ============================================================================
// TYPES
// ============================================================================

export type {
  ParallaxConfig,
  MousePosition,
  ViewportDimensions,
  ParallaxTransform,
  ParallaxLayer,
  PerformanceMetrics
} from '@/lib/parallax/parallax-utils'

export type {
  ParallaxContextType
} from '@/lib/parallax/parallax-provider'

export type {
  UseParallaxOptions
} from '@/hooks/use-parallax'

// ============================================================================
// COMPONENT PROP TYPES
// ============================================================================

export type {
  ParallaxContainerProps,
  ParallaxLayerProps
} from './parallax-container'