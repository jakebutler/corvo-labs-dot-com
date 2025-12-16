// Main hero component
export { HeroSection } from './HeroSection'

// Sub-components
export { HeroBackground } from './HeroBackground'
export { HeroContent } from './HeroContent'
export { HeroVisual } from './HeroVisual'
export { OptimizedHeroImage } from './OptimizedHeroImage'

// Hooks and utilities
export { useHeroAnimations, heroVariants, staggerContainer, hoverVariants } from './useHeroAnimations'

// Types
export type {
  OptimizedImageProps,
  HeroSectionProps,
  HeroVisualProps
} from './Hero.types'