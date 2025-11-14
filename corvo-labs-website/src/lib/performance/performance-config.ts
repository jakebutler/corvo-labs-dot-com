/**
 * Performance Configuration
 *
 * Centralized configuration for performance monitoring system
 * Includes performance budgets, thresholds, and optimization settings
 */

import { PerformanceConfig, PerformanceThresholds } from './performance-monitor'

/**
 * Performance thresholds for different environments
 */
export const PERFORMANCE_THRESHOLDS: Record<'development' | 'staging' | 'production', PerformanceThresholds> = {
  development: {
    targetFPS: 60,
    minimumFPS: 30,
    criticalFPS: 20,
    maxMemoryMB: 150, // More lenient in development
    maxLongFrames: 10,
    targetLCPScore: 85,
    targetFIDScore: 85,
    targetCLSScore: 85
  },
  staging: {
    targetFPS: 60,
    minimumFPS: 45,
    criticalFPS: 30,
    maxMemoryMB: 100,
    maxLongFrames: 5,
    targetLCPScore: 90,
    targetFIDScore: 90,
    targetCLSScore: 90
  },
  production: {
    targetFPS: 60,
    minimumFPS: 45,
    criticalFPS: 30,
    maxMemoryMB: 80, // Stricter in production
    maxLongFrames: 3,
    targetLCPScore: 95,
    targetFIDScore: 95,
    targetCLSScore: 95
  }
}

/**
 * Performance budgets for bundle analysis
 */
export const BUNDLE_BUDGETS = {
  // JavaScript budgets
  js: {
    critical: 200 * 1024,      // 200KB for critical JS
    initial: 400 * 1024,       // 400KB for initial JS
    total: 1024 * 1024         // 1MB total JS
  },

  // CSS budgets
  css: {
    critical: 50 * 1024,       // 50KB for critical CSS
    total: 100 * 1024          // 100KB total CSS
  },

  // Image budgets
  images: {
    hero: 500 * 1024,          // 500KB for hero images
    content: 200 * 1024,       // 200KB for content images
    total: 2 * 1024 * 1024     // 2MB total images
  },

  // Font budgets
  fonts: {
    total: 250 * 1024          // 250KB total fonts
  }
}

/**
 * Performance optimization settings for different device types
 */
export const DEVICE_OPTIMIZATIONS = {
  // High-end devices (desktop with good hardware)
  high: {
    animationQuality: 'high',
    maxConcurrentAnimations: 8,
    animationDuration: 0.5,
    enableParallax: true,
    enableParticles: true,
    imageQuality: 1.0,
    videoQuality: '1080p',
    enableWebGL: true
  },

  // Medium devices (laptops, tablets)
  medium: {
    animationQuality: 'medium',
    maxConcurrentAnimations: 4,
    animationDuration: 0.3,
    enableParallax: true,
    enableParticles: false,
    imageQuality: 0.8,
    videoQuality: '720p',
    enableWebGL: false
  },

  // Low-end devices (mobile, old hardware)
  low: {
    animationQuality: 'low',
    maxConcurrentAnimations: 2,
    animationDuration: 0.15,
    enableParallax: false,
    enableParticles: false,
    imageQuality: 0.6,
    videoQuality: '480p',
    enableWebGL: false
  }
}

/**
 * Network-aware performance settings
 */
export const NETWORK_PROFILES = {
  'slow-2g': {
    enableAnimations: false,
    imageQuality: 0.3,
    videoEnabled: false,
    lazyLoadDistance: 800,
    preloadCritical: true,
    maxConcurrentRequests: 2
  },
  '2g': {
    enableAnimations: false,
    imageQuality: 0.5,
    videoEnabled: false,
    lazyLoadDistance: 600,
    preloadCritical: true,
    maxConcurrentRequests: 4
  },
  '3g': {
    enableAnimations: true,
    imageQuality: 0.7,
    videoEnabled: true,
    lazyLoadDistance: 400,
    preloadCritical: true,
    maxConcurrentRequests: 6
  },
  '4g': {
    enableAnimations: true,
    imageQuality: 1.0,
    videoEnabled: true,
    lazyLoadDistance: 200,
    preloadCritical: true,
    maxConcurrentRequests: 8
  }
}

/**
 * Animation performance settings
 */
export const ANIMATION_CONFIG = {
  // Frame rate targets
  targetFrameRate: 60,
  minimumFrameRate: 30,

  // Quality settings
  quality: {
    high: {
      duration: 0.5,
      easing: [0.25, 0.46, 0.45, 0.94],
      precision: 1,
      enableSubpixel: true
    },
    medium: {
      duration: 0.3,
      easing: 'easeOut',
      precision: 0.8,
      enableSubpixel: false
    },
    low: {
      duration: 0.15,
      easing: 'linear',
      precision: 0.5,
      enableSubpixel: false
    }
  },

  // Performance optimization
  optimization: {
    enableWillChange: true,
    enableGPUAcceleration: true,
    enableContain: true,
    batchAnimations: true,
    debounceResize: true,
    throttleScroll: true
  }
}

/**
 * Core Web Vitals targets and scoring
 */
export const WEB_VITALS_TARGETS = {
  LCP: {
    good: 2500,      // 2.5s
    needsImprovement: 4000,  // 4s
    poor: Infinity
  },
  FID: {
    good: 100,       // 100ms
    needsImprovement: 300,   // 300ms
    poor: Infinity
  },
  CLS: {
    good: 0.1,       // 0.1
    needsImprovement: 0.25,  // 0.25
    poor: Infinity
  },
  FCP: {
    good: 1800,      // 1.8s
    needsImprovement: 3000,  // 3s
    poor: Infinity
  },
  TTFB: {
    good: 800,       // 800ms
    needsImprovement: 1800,  // 1.8s
    poor: Infinity
  }
}

/**
 * Healthcare-specific performance requirements
 */
export const HEALTHCARE_REQUIREMENTS = {
  // Accessibility requirements
  accessibility: {
    maxAnimationDuration: 0.5,
    reducedMotionSupport: true,
    highContrastSupport: true,
    screenReaderOptimized: true
  },

  // Professional appearance requirements
  professional: {
    minimumFPS: 45,
    maxJankThreshold: 5,
    smoothTransitions: true,
    consistentPerformance: true
  },

  // Trust and reliability
  reliability: {
    uptimeTarget: 99.9,
    errorRateThreshold: 0.01,
    performanceConsistency: 0.95,
    loadTimeTarget: 3000  // 3s
  }
}

/**
 * Environment-specific configuration
 */
export function getEnvironmentConfig(): PerformanceConfig {
  const environment = (process.env.NODE_ENV as 'development' | 'staging' | 'production') || 'development'
  const isDevelopment = environment === 'development'

  return {
    enabled: true,
    developmentMode: isDevelopment,
    samplingRate: isDevelopment ? 1.0 : 0.1, // 10% sampling in production
    reportInterval: isDevelopment ? 5000 : 30000, // 5s in dev, 30s in prod
    maxHistoryEntries: isDevelopment ? 50 : 100,
    thresholds: PERFORMANCE_THRESHOLDS[environment],
    enableAutoOptimization: true,
    enableReporting: !isDevelopment
  }
}

/**
 * Device capability detection
 */
export function detectDeviceCapabilities() {
  const navigator = window.navigator as Navigator & {
      hardwareConcurrency?: number;
      deviceMemory?: number;
      connection?: {
        effectiveType: string;
        downlink: number;
        rtt: number;
      };
      mozConnection?: {
        effectiveType: string;
        downlink: number;
        rtt: number;
      };
      webkitConnection?: {
        effectiveType: string;
        downlink: number;
        rtt: number;
      };
    }
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection

  return {
    // Hardware capabilities
    cpuCores: navigator.hardwareConcurrency || 4,
    memory: navigator.deviceMemory || 4,
    pixelRatio: window.devicePixelRatio || 1,

    // Network capabilities
    connectionType: connection?.effectiveType || 'unknown',
    downlink: connection?.downlink || 0,
    rtt: connection?.rtt || 0,

    // Display capabilities
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    colorDepth: window.screen.colorDepth,

    // Feature detection
    supportsWebGL: !!document.createElement('canvas').getContext('webgl'),
    supportsWebP: document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0,
    supportsAVIF: document.createElement('canvas').toDataURL('image/avif').indexOf('data:image/avif') === 0,
    supportsIntersectionObserver: 'IntersectionObserver' in window,
    supportsResizeObserver: 'ResizeObserver' in window,
    supportsRequestIdleCallback: 'requestIdleCallback' in window
  }
}

/**
 * Get device performance profile
 */
export function getDeviceProfile(): 'high' | 'medium' | 'low' {
  const capabilities = detectDeviceCapabilities()

  let score = 0

  // CPU scoring
  if (capabilities.cpuCores >= 8) score += 3
  else if (capabilities.cpuCores >= 4) score += 2
  else score += 1

  // Memory scoring
  if (capabilities.memory >= 8) score += 3
  else if (capabilities.memory >= 4) score += 2
  else score += 1

  // Network scoring
  if (capabilities.connectionType === '4g') score += 3
  else if (capabilities.connectionType === '3g') score += 2
  else score += 1

  // Screen size scoring (larger screens typically indicate more powerful devices)
  if (capabilities.screenWidth >= 1920) score += 2
  else if (capabilities.screenWidth >= 1280) score += 1

  // Feature support scoring
  if (capabilities.supportsWebGL) score += 1
  if (capabilities.supportsWebP) score += 1

  if (score >= 9) return 'high'
  if (score >= 6) return 'medium'
  return 'low'
}

/**
 * Get network profile for optimizations
 */
export function getNetworkProfile() {
  const capabilities = detectDeviceCapabilities()
  return NETWORK_PROFILES[capabilities.connectionType as keyof typeof NETWORK_PROFILES] || NETWORK_PROFILES['4g']
}

/**
 * Get optimization settings based on device and network
 */
export function getOptimizationSettings() {
  const deviceProfile = getDeviceProfile()
  const networkProfile = getNetworkProfile()
  const deviceCapabilities = detectDeviceCapabilities()

  return {
    device: DEVICE_OPTIMIZATIONS[deviceProfile],
    network: networkProfile,
    capabilities: deviceCapabilities,
    healthcare: HEALTHCARE_REQUIREMENTS
  }
}

/**
 * Performance budget validation
 */
export function validatePerformanceBudget(metrics: { bundle?: { totalSize: number; chunkCount: number }; animation?: { averageFPS: number; memoryUsage: number } }) {
  const violations: string[] = []

  // Check bundle sizes
  if (metrics.bundle?.totalSize > BUNDLE_BUDGETS.js.total) {
    violations.push(`JavaScript bundle exceeds budget: ${formatBytes(metrics.bundle.totalSize)} > ${formatBytes(BUNDLE_BUDGETS.js.total)}`)
  }

  if (metrics.bundle?.chunkCount > 50) {
    violations.push(`Too many chunks: ${metrics.bundle.chunkCount} > 50`)
  }

  // Check performance thresholds
  if (metrics.animation?.averageFPS < PERFORMANCE_THRESHOLDS.production.minimumFPS) {
    violations.push(`FPS below threshold: ${metrics.animation.averageFPS} < ${PERFORMANCE_THRESHOLDS.production.minimumFPS}`)
  }

  if (metrics.animation?.memoryUsage > PERFORMANCE_THRESHOLDS.production.maxMemoryMB) {
    violations.push(`Memory usage exceeds threshold: ${metrics.animation.memoryUsage}MB > ${PERFORMANCE_THRESHOLDS.production.maxMemoryMB}MB`)
  }

  return {
    passed: violations.length === 0,
    violations
  }
}

/**
 * Format bytes to human readable format
 */
function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Healthcare-specific performance monitoring configuration
 */
export const HEALTHCARE_MONITORING_CONFIG = {
  // Critical user interactions to monitor
  criticalInteractions: [
    'hero-animation-complete',
    'navigation-menu-open',
    'contact-form-submit',
    'project-card-hover',
    'newsletter-subscribe'
  ],

  // Healthcare compliance requirements
  compliance: {
    dataPrivacy: true,
    accessibilityAA: true,
    performanceLogging: true,
    errorTracking: true
  },

  // Professional appearance metrics
  professionalMetrics: {
    smoothTransitions: true,
    consistentTiming: true,
    responsiveDesign: true,
    crossBrowserCompatibility: true
  }
}

const performanceConfig = {
  PERFORMANCE_THRESHOLDS,
  BUNDLE_BUDGETS,
  DEVICE_OPTIMIZATIONS,
  NETWORK_PROFILES,
  ANIMATION_CONFIG,
  WEB_VITALS_TARGETS,
  HEALTHCARE_REQUIREMENTS,
  getEnvironmentConfig,
  detectDeviceCapabilities,
  getDeviceProfile,
  getNetworkProfile,
  getOptimizationSettings,
  validatePerformanceBudget,
  HEALTHCARE_MONITORING_CONFIG
}

export default performanceConfig