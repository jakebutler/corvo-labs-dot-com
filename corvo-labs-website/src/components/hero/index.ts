/**
 * Hero Components Index
 *
 * Centralized exports for all hero section components and utilities.
 * Provides a clean import interface for the advanced hero system.
 */

// Main hero component
export { AdvancedHeroSection as default } from './advanced-hero-section'
export { AdvancedHeroSection } from './advanced-hero-section'

// Animation components
export {
  FloatingShapes,
  GradientMesh,
  PulseWaves
} from './hero-animations'

// Interactive elements
export {
  StatCounter,
  InteractiveCTA,
  FeatureCard,
  TextReveal
} from './interactive-elements'

// Types and interfaces
export type {
  MousePosition,
  InteractionSettings
} from '@/hooks/use-hero-interactions'

// Hook exports
export { useHeroInteractions } from '@/hooks/use-hero-interactions'