/**
 * Advanced scroll-reveal configuration system
 * Healthcare-optimized animation settings and performance management
 */

export interface ScrollRevealConfig {
  // Animation timing
  duration: number;
  delay: number;
  staggerDelay: number;

  // Visibility thresholds
  threshold: number;
  rootMargin: string;
  triggerOnce: boolean;

  // Easing and spring physics
  easing: string | number[];
  stiffness: number;
  damping: number;
  mass: number;

  // Healthcare settings
  reducedMotion: boolean;
  highContrast: boolean;
  largerTargets: boolean;

  // Performance optimization
  performanceMode: 'high' | 'medium' | 'low';
  batchSize: number;
  debounceMs: number;

  // Visual effects
  blurAmount: number;
  scaleIntensity: number;
  rotationIntensity: number;
  translateIntensity: number;
}

export const defaultScrollConfig: ScrollRevealConfig = {
  duration: 0.6,
  delay: 0,
  staggerDelay: 0.1,
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
  triggerOnce: true,
  easing: [0.25, 0.46, 0.45, 0.94], // Medical easing
  stiffness: 300,
  damping: 30,
  mass: 1,
  reducedMotion: false,
  highContrast: false,
  largerTargets: false,
  performanceMode: 'high',
  batchSize: 6,
  debounceMs: 16,
  blurAmount: 0,
  scaleIntensity: 0.05,
  rotationIntensity: 2,
  translateIntensity: 30,
};

export const healthcareScrollConfig: ScrollRevealConfig = {
  ...defaultScrollConfig,
  duration: 0.8, // Slightly longer for clarity
  delay: 0.1, // Small delay for smooth reading
  staggerDelay: 0.15, // More spacing for medical content
  threshold: 0.15, // Earlier reveal for better UX
  easing: [0.23, 1, 0.32, 1], // Gentle easing
  largerTargets: true,
  performanceMode: 'medium', // Balanced for healthcare devices
  scaleIntensity: 0.03, // Subtle scaling
  rotationIntensity: 1, // Minimal rotation
};

// Adaptive configuration based on device and preferences
export const getAdaptiveScrollConfig = (): ScrollRevealConfig => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;

  let config = isMobile ? healthcareScrollConfig : defaultScrollConfig;

  // Respect accessibility preferences
  if (prefersReducedMotion) {
    config = {
      ...config,
      reducedMotion: true,
      duration: 0.2,
      scaleIntensity: 0,
      rotationIntensity: 0,
      blurAmount: 0,
    };
  }

  if (prefersHighContrast) {
    config = {
      ...config,
      highContrast: true,
      blurAmount: 0,
    };
  }

  // Adjust for mobile performance
  if (isMobile) {
    config = {
      ...config,
      performanceMode: 'medium',
      batchSize: 4,
      debounceMs: 32,
    };
  }

  return config;
};

// Predefined animation variants
export const SCROLL_VARIANTS = {
  // Fade animations
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },

  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },

  fadeInDown: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  },

  // Slide animations
  slideInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },

  slideInRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },

  // Scale animations
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },

  // Rotation animations
  rotateIn: {
    hidden: { opacity: 0, rotate: -5 },
    visible: { opacity: 1, rotate: 0 },
  },

  // Complex animations
  perspectiveIn: {
    hidden: {
      opacity: 0,
      rotateX: 15,
      y: 20,
      transformPerspective: 1000
    },
    visible: {
      opacity: 1,
      rotateX: 0,
      y: 0,
      transformPerspective: 1000
    },
  },

  blurIn: {
    hidden: { opacity: 0, filter: 'blur(10px)' },
    visible: { opacity: 1, filter: 'blur(0px)' },
  },

  // Healthcare-specific animations
  medicalPulse: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1],
      }
    },
  },

  diagnosticReveal: {
    hidden: {
      opacity: 0,
      clipPath: 'inset(0 100% 0 0)'
    },
    visible: {
      opacity: 1,
      clipPath: 'inset(0 0% 0 0)',
      transition: {
        duration: 1.0,
        ease: [0.87, 0, 0.13, 1],
      }
    },
  },
};

// Healthcare animation presets
export const HEALTHCARE_PRESETS = {
  patientInfo: {
    variant: 'fadeInUp' as keyof typeof SCROLL_VARIANTS,
    delay: 0.1,
    duration: 0.6,
    easing: [0.23, 1, 0.32, 1],
  },

  medicalData: {
    variant: 'scaleIn' as keyof typeof SCROLL_VARIANTS,
    delay: 0.2,
    duration: 0.5,
    easing: [0.25, 0.46, 0.45, 0.94],
  },

  diagnosticResults: {
    variant: 'diagnosticReveal' as keyof typeof SCROLL_VARIANTS,
    delay: 0.3,
    duration: 1.0,
    easing: [0.87, 0, 0.13, 1],
  },

  treatmentPlan: {
    variant: 'medicalPulse' as keyof typeof SCROLL_VARIANTS,
    delay: 0.4,
    duration: 0.8,
    easing: [0.23, 1, 0.32, 1],
  },

  emergencyAlert: {
    variant: 'scaleIn' as keyof typeof SCROLL_VARIANTS,
    delay: 0,
    duration: 0.3,
    easing: [0.68, -0.55, 0.265, 1.55],
  },
};