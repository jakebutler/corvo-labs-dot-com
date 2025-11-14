/**
 * Animation Configuration System
 *
 * Centralized configuration for all animations in the healthcare AI consulting website,
 * with performance optimization, accessibility support, and healthcare-specific theming.
 */

import { AnimationAccessibilityConfig } from './accessibility-utils'

// Animation timing presets for healthcare contexts
export const HEALTHCARE_ANIMATION_TIMING = {
  // Medical precision timing
  precision: {
    duration: 0.4,
    ease: [0.87, 0, 0.13, 1], // Sharp, accurate movements
    delay: 0
  },

  // Gentle, caring animations
  gentle: {
    duration: 0.8,
    ease: [0.23, 1, 0.32, 1], // Soft, reassuring
    delay: 0.1
  },

  // Confident, professional animations
  confident: {
    duration: 0.6,
    ease: [0.68, -0.55, 0.265, 1.55], // Bold, impressive
    delay: 0
  },

  // Standard medical animations
  medical: {
    duration: 0.5,
    ease: [0.25, 0.46, 0.45, 0.94], // Smooth, professional
    delay: 0
  },

  // Quick transitions
  quick: {
    duration: 0.2,
    ease: 'easeOut',
    delay: 0
  },

  // Slow, deliberate animations
  deliberate: {
    duration: 1.2,
    ease: [0.25, 0.46, 0.45, 0.94],
    delay: 0.2
  }
}

// Animation distance presets
export const ANIMATION_DISTANCES = {
  subtle: {
    x: 10,
    y: 10,
    scale: 0.05,
    rotate: 5
  },
  moderate: {
    x: 30,
    y: 30,
    scale: 0.1,
    rotate: 15
  },
  significant: {
    x: 60,
    y: 60,
    scale: 0.2,
    rotate: 30
  },
  dramatic: {
    x: 100,
    y: 100,
    scale: 0.3,
    rotate: 45
  }
}

// Healthcare color palette for animations
export const HEALTHCARE_COLORS = {
  primary: {
    blue: '#3B82F6',
    darkBlue: '#1E40AF',
    lightBlue: '#93C5FD'
  },
  accent: {
    purple: '#8B5CF6',
    pink: '#EC4899',
    teal: '#14B8A6'
  },
  success: {
    green: '#10B981',
    lightGreen: '#86EFAC'
  },
  warning: {
    yellow: '#F59E0B',
    orange: '#F97316'
  },
  error: {
    red: '#EF4444',
    lightRed: '#FCA5A5'
  },
  neutral: {
    gray: '#6B7280',
    lightGray: '#D1D5DB',
    darkGray: '#374151'
  }
}

// Responsive animation configurations
export const RESPONSIVE_CONFIG = {
  mobile: {
    maxDuration: 0.3,
    maxDelay: 0.2,
    reducedMotion: true,
    intensity: 0.5,
    parallaxSpeed: 0.2,
    staggerDelay: 0.05
  },
  tablet: {
    maxDuration: 0.5,
    maxDelay: 0.3,
    reducedMotion: false,
    intensity: 0.75,
    parallaxSpeed: 0.35,
    staggerDelay: 0.08
  },
  desktop: {
    maxDuration: 0.8,
    maxDelay: 0.5,
    reducedMotion: false,
    intensity: 1,
    parallaxSpeed: 0.5,
    staggerDelay: 0.1
  }
}

// Performance tier configurations
export const PERFORMANCE_TIERS = {
  low: {
    maxConcurrentAnimations: 2,
    animationTimeout: 2000,
    useReducedMotion: true,
    disableParallax: true,
    disable3D: true,
    maxDuration: 0.2
  },
  medium: {
    maxConcurrentAnimations: 4,
    animationTimeout: 3000,
    useReducedMotion: false,
    disableParallax: false,
    disable3D: false,
    maxDuration: 0.4
  },
  high: {
    maxConcurrentAnimations: 8,
    animationTimeout: 5000,
    useReducedMotion: false,
    disableParallax: false,
    disable3D: false,
    maxDuration: 0.8
  }
}

// Animation variant configurations
export const ANIMATION_VARIANTS_CONFIG = {
  // Entry animations
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    ...HEALTHCARE_ANIMATION_TIMING.medical
  },

  fadeInUp: {
    hidden: { opacity: 0, y: ANIMATION_DISTANCES.moderate.y },
    visible: { opacity: 1, y: 0 },
    ...HEALTHCARE_ANIMATION_TIMING.medical
  },

  fadeInDown: {
    hidden: { opacity: 0, y: -ANIMATION_DISTANCES.moderate.y },
    visible: { opacity: 1, y: 0 },
    ...HEALTHCARE_ANIMATION_TIMING.medical
  },

  fadeInLeft: {
    hidden: { opacity: 0, x: -ANIMATION_DISTANCES.moderate.x },
    visible: { opacity: 1, x: 0 },
    ...HEALTHCARE_ANIMATION_TIMING.medical
  },

  fadeInRight: {
    hidden: { opacity: 0, x: ANIMATION_DISTANCES.moderate.x },
    visible: { opacity: 1, x: 0 },
    ...HEALTHCARE_ANIMATION_TIMING.medical
  },

  // Scale animations
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    ...HEALTHCARE_ANIMATION_TIMING.confident
  },

  scaleOut: {
    hidden: { opacity: 1, scale: 1 },
    visible: { opacity: 0, scale: 0.9 },
    ...HEALTHCARE_ANIMATION_TIMING.quick
  },

  // Rotation animations
  rotateIn: {
    hidden: { opacity: 0, rotate: -15 },
    visible: { opacity: 1, rotate: 0 },
    ...HEALTHCARE_ANIMATION_TIMING.confident
  },

  // Slide animations
  slideInUp: {
    hidden: { y: '100%' },
    visible: { y: 0 },
    ...HEALTHCARE_ANIMATION_TIMING.medical
  },

  slideInDown: {
    hidden: { y: '-100%' },
    visible: { y: 0 },
    ...HEALTHCARE_ANIMATION_TIMING.medical
  },

  slideInLeft: {
    hidden: { x: '-100%' },
    visible: { x: 0 },
    ...HEALTHCARE_ANIMATION_TIMING.medical
  },

  slideInRight: {
    hidden: { x: '100%' },
    visible: { x: 0 },
    ...HEALTHCARE_ANIMATION_TIMING.medical
  },

  // 3D animations
  flipIn: {
    hidden: { opacity: 0, rotateY: -90, transformPerspective: 1000 },
    visible: { opacity: 1, rotateY: 0, transformPerspective: 1000 },
    ...HEALTHCARE_ANIMATION_TIMING.confident
  },

  flipOut: {
    hidden: { opacity: 1, rotateY: 0, transformPerspective: 1000 },
    visible: { opacity: 0, rotateY: 90, transformPerspective: 1000 },
    ...HEALTHCARE_ANIMATION_TIMING.quick
  },

  // Complex medical animations
  pulse: {
    initial: { scale: 1 },
    animate: { scale: [1, 1.05, 1] },
    transition: {
      duration: 2,
      ease: 'easeInOut',
      repeat: Infinity
    }
  },

  heartbeat: {
    initial: { scale: 1 },
    animate: { scale: [1, 1.1, 1, 1.1, 1] },
    transition: {
      duration: 1.5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatDelay: 2
    }
  },

  breathing: {
    initial: { scale: 1 },
    animate: { scale: [1, 1.03, 1] },
    transition: {
      duration: 4,
      ease: 'easeInOut',
      repeat: Infinity
    }
  },

  // Hover states
  hover: {
    lift: {
      hover: { y: -8, transition: HEALTHCARE_ANIMATION_TIMING.gentle },
      tap: { y: -4, transition: HEALTHCARE_ANIMATION_TIMING.quick }
    },
    glow: {
      hover: {
        boxShadow: `0 0 20px ${HEALTHCARE_COLORS.primary.blue}40`,
        transition: HEALTHCARE_ANIMATION_TIMING.gentle
      },
      tap: {
        boxShadow: `0 0 10px ${HEALTHCARE_COLORS.primary.blue}20`,
        transition: HEALTHCARE_ANIMATION_TIMING.quick
      }
    },
    scale: {
      hover: { scale: 1.05, transition: HEALTHCARE_ANIMATION_TIMING.gentle },
      tap: { scale: 0.95, transition: HEALTHCARE_ANIMATION_TIMING.quick }
    }
  }
}

// Stagger animation configurations
export const STAGGER_CONFIG = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },
  fast: {
    staggerChildren: 0.05,
    delayChildren: 0.1
  },
  normal: {
    staggerChildren: 0.1,
    delayChildren: 0.2
  },
  slow: {
    staggerChildren: 0.2,
    delayChildren: 0.3
  }
}

// Page transition configurations
export const PAGE_TRANSITIONS = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: HEALTHCARE_ANIMATION_TIMING.medical
  },
  slide: {
    initial: { x: 300, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 },
    transition: HEALTHCARE_ANIMATION_TIMING.confident
  },
  scale: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.05, opacity: 0 },
    transition: HEALTHCARE_ANIMATION_TIMING.gentle
  },
  flip: {
    initial: { rotateY: 90, opacity: 0 },
    animate: { rotateY: 0, opacity: 1 },
    exit: { rotateY: -90, opacity: 0 },
    transition: HEALTHCARE_ANIMATION_TIMING.confident
  }
}

// Main animation configuration interface
export interface AnimationConfig {
  // Timing and easing
  timing: keyof typeof HEALTHCARE_ANIMATION_TIMING
  distance: keyof typeof ANIMATION_DISTANCES

  // Performance settings
  performanceTier: keyof typeof PERFORMANCE_TIERS
  responsiveBreakpoint: keyof typeof RESPONSIVE_CONFIG

  // Accessibility
  accessibility: AnimationAccessibilityConfig

  // Features
  enable3D: boolean
  enableParallax: boolean
  enableGestures: boolean
  enableScrollTriggers: boolean

  // Healthcare-specific
  medicalTheme: boolean
  professionalAesthetic: boolean
}

// Default configuration
export const DEFAULT_ANIMATION_CONFIG: AnimationConfig = {
  timing: 'medical',
  distance: 'moderate',
  performanceTier: 'high',
  responsiveBreakpoint: 'desktop',
  accessibility: {
    respectReducedMotion: true,
    respectHighContrast: true,
    respectDataSaver: true,
    fallbackDuration: 0.15,
    enableScreenReaderAnnouncements: true
  },
  enable3D: true,
  enableParallax: true,
  enableGestures: true,
  enableScrollTriggers: true,
  medicalTheme: true,
  professionalAesthetic: true
}

/**
 * Animation configuration manager
 */
export class AnimationConfigManager {
  private config: AnimationConfig
  private listeners: Set<(config: AnimationConfig) => void> = new Set()

  constructor(initialConfig: Partial<AnimationConfig> = {}) {
    this.config = { ...DEFAULT_ANIMATION_CONFIG, ...initialConfig }
    this.detectEnvironment()
  }

  private detectEnvironment() {
    if (typeof window === 'undefined') return

    // Detect device performance
    const navigator = window.navigator as any
    const hardwareConcurrency = navigator.hardwareConcurrency || 4
    const deviceMemory = navigator.deviceMemory || 4

    if (hardwareConcurrency < 4 || deviceMemory < 4) {
      this.config.performanceTier = 'low'
      this.config.enable3D = false
      this.config.enableParallax = false
    }

    // Detect viewport size
    const width = window.innerWidth
    if (width < 768) {
      this.config.responsiveBreakpoint = 'mobile'
      this.config.enable3D = false
      this.config.enableParallax = false
    } else if (width < 1024) {
      this.config.responsiveBreakpoint = 'tablet'
    }

    // Detect motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.config.accessibility.respectReducedMotion = true
    }
  }

  updateConfig(newConfig: Partial<AnimationConfig>) {
    this.config = { ...this.config, ...newConfig }
    this.listeners.forEach(listener => listener(this.config))
  }

  getConfig(): AnimationConfig {
    return { ...this.config }
  }

  getTimingConfig() {
    return HEALTHCARE_ANIMATION_TIMING[this.config.timing]
  }

  getDistanceConfig() {
    return ANIMATION_DISTANCES[this.config.distance]
  }

  getPerformanceConfig() {
    return PERFORMANCE_TIERS[this.config.performanceTier]
  }

  getResponsiveConfig() {
    return RESPONSIVE_CONFIG[this.config.responsiveBreakpoint]
  }

  shouldEnableFeature(feature: '3D' | 'parallax' | 'gestures' | 'scrollTriggers'): boolean {
    switch (feature) {
      case '3D':
        return this.config.enable3D && this.getPerformanceConfig().disable3D === false
      case 'parallax':
        return this.config.enableParallax && this.getPerformanceConfig().disableParallax === false
      case 'gestures':
        return this.config.enableGestures
      case 'scrollTriggers':
        return this.config.enableScrollTriggers
      default:
        return false
    }
  }

  subscribe(listener: (config: AnimationConfig) => void) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  // Healthcare-specific configuration helpers
  getMedicalAnimationTiming(type: 'precision' | 'gentle' | 'confident' | 'medical') {
    return HEALTHCARE_ANIMATION_TIMING[type]
  }

  getHealthcareColorPalette() {
    return HEALTHCARE_COLORS
  }

  getAnimationVariant(variantName: keyof typeof ANIMATION_VARIANTS_CONFIG) {
    const variant = ANIMATION_VARIANTS_CONFIG[variantName]
    const responsiveConfig = this.getResponsiveConfig()

    // Apply responsive constraints
    if (variant.duration && variant.duration > responsiveConfig.maxDuration) {
      return {
        ...variant,
        duration: responsiveConfig.maxDuration
      }
    }

    return variant
  }
}

// Global configuration manager instance
export const globalAnimationConfig = new AnimationConfigManager()

/**
 * Utility functions for configuration management
 */
export const configUtils = {
  /**
   * Create responsive animation configuration
   */
  createResponsiveConfig(breakpoint: 'mobile' | 'tablet' | 'desktop') {
    const baseConfig = { ...DEFAULT_ANIMATION_CONFIG }
    const responsiveConfig = RESPONSIVE_CONFIG[breakpoint]

    return {
      ...baseConfig,
      responsiveBreakpoint: breakpoint,
      timing: breakpoint === 'mobile' ? 'quick' : breakpoint === 'tablet' ? 'medical' : 'gentle',
      distance: breakpoint === 'mobile' ? 'subtle' : breakpoint === 'tablet' ? 'moderate' : 'significant',
      enable3D: breakpoint !== 'mobile',
      enableParallax: breakpoint !== 'mobile'
    }
  },

  /**
   * Create performance-based configuration
   */
  createPerformanceConfig(tier: 'low' | 'medium' | 'high') {
    const baseConfig = { ...DEFAULT_ANIMATION_CONFIG }
    const performanceConfig = PERFORMANCE_TIERS[tier]

    return {
      ...baseConfig,
      performanceTier: tier,
      enable3D: !performanceConfig.disable3D,
      enableParallax: !performanceConfig.disableParallax,
      timing: tier === 'low' ? 'quick' : tier === 'medium' ? 'medical' : 'gentle'
    }
  },

  /**
   * Create accessibility-focused configuration
   */
  createAccessibilityConfig(respectMotion: boolean = true) {
    const baseConfig = { ...DEFAULT_ANIMATION_CONFIG }

    return {
      ...baseConfig,
      accessibility: {
        ...baseConfig.accessibility,
        respectReducedMotion: respectMotion
      },
      timing: respectMotion ? 'quick' : 'medical',
      enable3D: !respectMotion,
      enableParallax: !respectMotion
    }
  },

  /**
   * Merge configurations with proper precedence
   */
  mergeConfigs(...configs: Partial<AnimationConfig>[]): AnimationConfig {
    return configs.reduce((merged, config) => ({
      ...merged,
      ...config,
      accessibility: {
        ...merged.accessibility,
        ...config.accessibility
      }
    }), { ...DEFAULT_ANIMATION_CONFIG })
  }
}