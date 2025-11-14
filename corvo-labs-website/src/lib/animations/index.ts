/**
 * Animation Infrastructure - Main Export
 *
 * Comprehensive animation system for Corvo Labs Website 2.0
 * Healthcare AI consulting optimized animations with performance and accessibility focus.
 */

// Core Animation Primitives
export {
  // Enhanced animation variants and constants
  ANIMATION_VARIANTS,
  HOVER_VARIANTS,
  EASING,
  DURATIONS,

  // Performance monitoring
  AnimationPerformanceMonitor,
  performanceMonitor,

  // Core components
  ScrollReveal,
  Card3D,
  ScrollTriggeredAnimation,
  MouseParallax,
  GestureAnimation,
  TextRevealAdvanced,
  MorphingBlob,
  SmartAnimationContainer,
  PageTransitionAdvanced,

  // Hooks and utilities
  useParallax,
  useIntersectionAnimation,
  useReducedMotionAnimations,
  useResponsiveAnimation,
  animationUtils
} from '../../components/animations/animation-primitives'

// Performance Utilities
export {
  // Performance monitoring classes
  AdvancedPerformanceMonitor,
  FrameRateLimiter,
  AnimationQueue,
  AnimationMemoryTracker,

  // Global instances
  globalPerformanceMonitor,
  globalAnimationQueue,
  globalMemoryTracker,

  // Utility functions
  performanceUtils,

  // Types
  PerformanceMetrics,
  PerformanceThresholds,
  PerformanceConfig,
  DEFAULT_PERFORMANCE_CONFIG
} from './performance-utils'

// Animation Hooks
export {
  // Core hooks
  useScrollAnimation,
  useParallax as useAdvancedParallax,
  useStagger,
  useGestures,
  useIntersectionTriggers,
  useAnimationState,
  useViewportAnimation,
  useAnimationSequence,
  useHealthcareAnimationTiming,
  useAnimationComposition,

  // Types
  ScrollAnimationOptions,
  ParallaxOptions,
  StaggerOptions,
  GestureOptions
} from './animation-hooks'

// Accessibility Utilities
export {
  // Accessibility detection and management
  AccessibilityDetector,
  ScreenReaderAnnouncer,
  FocusManager,

  // Global instances
  globalAccessibilityDetector,
  globalScreenReaderAnnouncer,
  globalFocusManager,

  // Hooks
  useAnimationAccessibility,
  useKeyboardNavigation,

  // Utility functions
  accessibilityUtils,
  colorContrastUtils,

  // Types
  AccessibilityPreferences,
  AnimationAccessibilityConfig,
  DEFAULT_ACCESSIBILITY_CONFIG
} from './accessibility-utils'

// Configuration System
export {
  // Configuration classes
  AnimationConfigManager,

  // Global instance
  globalAnimationConfig,

  // Configuration presets
  HEALTHCARE_ANIMATION_TIMING,
  ANIMATION_DISTANCES,
  HEALTHCARE_COLORS,
  RESPONSIVE_CONFIG,
  PERFORMANCE_TIERS,
  ANIMATION_VARIANTS_CONFIG,
  STAGGER_CONFIG,
  PAGE_TRANSITIONS,

  // Utility functions
  configUtils,

  // Types
  AnimationConfig,
  DEFAULT_ANIMATION_CONFIG
} from './animation-config'

// Advanced Medical Animations
export {
  HeartbeatAnimation,
  DNAHelix,
  MedicalScanner,
  NeuralNetwork,
  MedicalDataVisualization,
  MedicalPulseWave
} from '../../components/animations/advanced/medical-animations'

// Interactive 3D Components
export {
  Interactive3DCard,
  FlippingCard3D,
  Carousel3D,
  ParallaxContainer3D,
  MorphingShape3D,
  GestureControlled3D
} from '../../components/animations/advanced/interactive-3d'

// Legacy compatibility exports
export { default as ScrollRevealLegacy } from '../../components/animations/animation-primitives'