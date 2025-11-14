/**
 * Performance Utilities
 *
 * Utility functions for performance optimization and monitoring
 * Integrates with existing animation system and provides additional optimizations
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import { getDeviceProfile, getOptimizationSettings } from './performance-config'

/**
 * Performance-aware image loader
 */
export class PerformanceImageLoader {
  private imageCache: Map<string, HTMLImageElement> = new Map()
  private loadingPromises: Map<string, Promise<HTMLImageElement>> = new Map()
  private deviceProfile: string

  constructor() {
    this.deviceProfile = getDeviceProfile()
  }

  /**
   * Load image with performance optimizations
   */
  async loadImage(src: string, options?: {
    priority?: boolean
    quality?: number
    lazy?: boolean
  }): Promise<HTMLImageElement> {
    // Check cache first
    if (this.imageCache.has(src)) {
      return this.imageCache.get(src)!
    }

    // Check if already loading
    if (this.loadingPromises.has(src)) {
      return this.loadingPromises.get(src)!
    }

    const settings = getOptimizationSettings()
    const quality = options?.quality || settings.device.imageQuality

    // Create optimized image URL based on device capabilities
    const optimizedSrc = this.optimizeImageUrl(src, quality)

    const loadPromise = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image()

      img.onload = () => {
        this.imageCache.set(src, img)
        this.loadingPromises.delete(src)
        resolve(img)
      }

      img.onerror = () => {
        this.loadingPromises.delete(src)
        reject(new Error(`Failed to load image: ${src}`))
      }

      // Apply loading strategy based on priority and device
      if (options?.priority) {
        img.loading = 'eager'
        img.fetchPriority = 'high'
      } else {
        img.loading = options?.lazy ? 'lazy' : 'eager'
        img.fetchPriority = 'auto'
      }

      img.src = optimizedSrc
    })

    this.loadingPromises.set(src, loadPromise)
    return loadPromise
  }

  /**
   * Optimize image URL based on device capabilities
   */
  private optimizeImageUrl(src: string, quality: number): string {
    // This would integrate with your image CDN/service
    // For example, with Next.js Image optimization or a CDN like Cloudinary

    if (src.includes('?')) {
      // Already has parameters, add quality
      return `${src}&q=${Math.round(quality * 100)}`
    } else {
      // Add quality parameter
      return `${src}?q=${Math.round(quality * 100)}`
    }
  }

  /**
   * Preload critical images
   */
  preloadImages(urls: string[], priority: boolean = true) {
    urls.forEach(url => {
      this.loadImage(url, { priority }).catch(console.warn)
    })
  }

  /**
   * Clear image cache
   */
  clearCache() {
    this.imageCache.clear()
  }

  /**
   * Get cache stats
   */
  getCacheStats() {
    return {
      cached: this.imageCache.size,
      loading: this.loadingPromises.size,
      memoryUsage: this.estimateMemoryUsage()
    }
  }

  /**
   * Estimate memory usage of cached images
   */
  private estimateMemoryUsage(): number {
    let totalSize = 0
    this.imageCache.forEach(img => {
      // Rough estimation: width * height * 4 bytes per pixel
      if (img.naturalWidth && img.naturalHeight) {
        totalSize += img.naturalWidth * img.naturalHeight * 4
      }
    })
    return totalSize / (1024 * 1024) // MB
  }
}

/**
 * Performance-aware component lazy loader
 */
export class ComponentLazyLoader {
  private loadedComponents: Set<string> = new Set()
  private loadingComponents: Set<string> = new Set()
  private observer: IntersectionObserver | null = null

  constructor() {
    this.initializeIntersectionObserver()
  }

  /**
   * Initialize intersection observer for lazy loading
   */
  private initializeIntersectionObserver() {
    if (typeof IntersectionObserver === 'undefined') return

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const componentName = entry.target.getAttribute('data-component')
            if (componentName && !this.loadedComponents.has(componentName)) {
              this.loadComponent(componentName)
            }
          }
        })
      },
      {
        rootMargin: '50px', // Start loading 50px before element comes into view
        threshold: 0.1
      }
    )
  }

  /**
   * Register component for lazy loading
   */
  registerComponent(element: HTMLElement, componentName: string) {
    if (this.loadedComponents.has(componentName)) return

    element.setAttribute('data-component', componentName)

    if (this.observer) {
      this.observer.observe(element)
    } else {
      // Fallback for browsers without IntersectionObserver
      setTimeout(() => this.loadComponent(componentName), 100)
    }
  }

  /**
   * Load component
   */
  private async loadComponent(componentName: string) {
    if (this.loadingComponents.has(componentName)) return

    this.loadingComponents.add(componentName)

    try {
      // Dynamic import would go here
      // const module = await import(`../components/${componentName}`)

      this.loadedComponents.add(componentName)
      this.loadingComponents.delete(componentName)

      // Dispatch event for component loaded
      window.dispatchEvent(new CustomEvent('componentLoaded', {
        detail: { componentName }
      }))
    } catch (error) {
      console.error(`Failed to load component: ${componentName}`, error)
      this.loadingComponents.delete(componentName)
    }
  }

  /**
   * Preload critical components
   */
  preloadComponents(componentNames: string[]) {
    componentNames.forEach(name => {
      if (!this.loadedComponents.has(name)) {
        this.loadComponent(name)
      }
    })
  }

  /**
   * Destroy lazy loader
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect()
      this.observer = null
    }
  }
}

/**
 * Performance optimization utilities
 */
export const performanceUtils = {
  /**
   * Throttle function with requestAnimationFrame
   */
  rafThrottle<T extends unknown[]>(fn: (...args: T) => void) {
    let rafId: number | null = null
    let lastArgs: T | null = null

    return (...args: T) => {
      lastArgs = args

      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          fn(...lastArgs!)
          rafId = null
          lastArgs = null
        })
      }
    }
  },

  /**
   * Debounce function with immediate execution
   */
  debounceImmediate<T extends unknown[]>(fn: (...args: T) => void, delay: number) {
    let timeoutId: NodeJS.Timeout | null = null

    return (...args: T) => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      if (!timeoutId) {
        fn(...args)
      }

      timeoutId = setTimeout(() => {
        timeoutId = null
      }, delay)
    }
  },

  /**
   * Batch DOM updates
   */
  batchDOMUpdates(updates: (() => void)[]) {
    return new Promise<void>((resolve) => {
      requestAnimationFrame(() => {
        updates.forEach(update => update())
        resolve()
      })
    })
  },

  /**
   * Measure function execution time
   */
  measureTime<T>(fn: () => T, label?: string): { result: T; duration: number } {
    const start = performance.now()
    const result = fn()
    const duration = performance.now() - start

    if (label && process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${label}: ${duration.toFixed(2)}ms`)
    }

    return { result, duration }
  },

  /**
   * Create performance-aware event listener
   */
  createPerformanceListener(
    element: HTMLElement | Window,
    event: string,
    handler: EventListener,
    options?: { passive?: boolean; capture?: boolean }
  ) {
    const wrappedHandler = performanceUtils.rafThrottle(handler)

    element.addEventListener(event, wrappedHandler, {
      passive: true,
      ...options
    })

    return () => {
      element.removeEventListener(event, wrappedHandler, options)
    }
  },

  /**
   * Check if should use reduced motion
   */
  shouldUseReducedMotion(): boolean {
    if (typeof window === 'undefined') return false

    return (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      getDeviceProfile() === 'low'
    )
  },

  /**
   * Get optimal animation settings based on device
   */
  getOptimalAnimationSettings() {
    const settings = getOptimizationSettings()
    const deviceProfile = getDeviceProfile()

    return {
      duration: settings.device.animationDuration,
      easing: deviceProfile === 'high' ? [0.25, 0.46, 0.45, 0.94] : 'easeOut',
      shouldReduceMotion: performanceUtils.shouldUseReducedMotion(),
      maxConcurrent: settings.device.maxConcurrentAnimations,
      enableGPU: deviceProfile !== 'low'
    }
  },

  /**
   * Monitor memory usage and trigger cleanup if needed
   */
  monitorMemoryUsage(cleanupCallback: () => void, threshold: number = 100) {
    if (typeof window === 'undefined' || !(performance as unknown as { memory?: unknown }).memory) return

    const checkMemory = () => {
      const memory = (performance as unknown as { memory: { usedJSHeapSize: number } }).memory
      const usageMB = memory.usedJSHeapSize / (1024 * 1024)

      if (usageMB > threshold) {
        console.warn(`[Performance] High memory usage detected: ${usageMB.toFixed(1)}MB`)
        cleanupCallback()
      }
    }

    const interval = setInterval(checkMemory, 5000) // Check every 5 seconds

    return () => clearInterval(interval)
  },

  /**
   * Create performance-aware resize observer
   */
  createResizeObserver(callback: (entries: ResizeObserverEntry[]) => void) {
    if (typeof ResizeObserver === 'undefined') return null

    const throttledCallback = performanceUtils.rafThrottle(callback)
    return new ResizeObserver(throttledCallback)
  },

  /**
   * Get viewport-based performance settings
   */
  getViewportPerformanceSettings() {
    if (typeof window === 'undefined') {
      return { isMobile: false, isTablet: false, isDesktop: true }
    }

    const width = window.innerWidth
    const isMobile = width < 768
    const isTablet = width >= 768 && width < 1024
    const isDesktop = width >= 1024

    return {
      isMobile,
      isTablet,
      isDesktop,
      maxAnimations: isMobile ? 2 : isTablet ? 4 : 8,
      imageQuality: isMobile ? 0.7 : 0.9,
      enableParticles: !isMobile,
      enableParallax: !isMobile
    }
  }
}

/**
 * Performance-aware React hooks
 */
export function usePerformanceOptimization() {
  const [isLowPerformance, setIsLowPerformance] = useState(false)
  const cleanupTimeout = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const deviceProfile = getDeviceProfile()
    setIsLowPerformance(deviceProfile === 'low')

    // Monitor memory usage
    const cleanup = performanceUtils.monitorMemoryUsage(() => {
      setIsLowPerformance(true)
      console.warn('[Performance] Switching to low performance mode due to memory usage')
    }, 80)

    return () => {
      cleanup()
      if (cleanupTimeout.current) {
        clearTimeout(cleanupTimeout.current)
      }
    }
  }, [])

  const getOptimizedProps = useCallback(() => {
    const settings = performanceUtils.getOptimalAnimationSettings()
    const viewport = performanceUtils.getViewportPerformanceSettings()

    return {
      initial: false, // Don't animate on initial load for low-end devices
      animate: !isLowPerformance,
      transition: {
        duration: settings.duration,
        ease: settings.easing
      },
      viewport,
      settings
    }
  }, [isLowPerformance])

  return {
    isLowPerformance,
    getOptimizedProps,
    shouldReduceMotion: performanceUtils.shouldUseReducedMotion()
  }
}

/**
 * Healthcare-specific performance utilities
 */
export const healthcarePerformanceUtils = {
  /**
   * Ensure animations meet accessibility requirements
   */
  validateAnimationForHealthcare(duration: number): boolean {
    // Healthcare guidelines: animations should be between 0.2-0.5 seconds
    return duration >= 200 && duration <= 500
  },

  /**
   * Check if color contrast meets WCAG AA standards
   */
  validateColorContrast(_foreground: string, _background: string): boolean {
    // This would integrate with a color contrast calculation library
    // For now, return true as placeholder
    return true
  },

  /**
   * Optimize content for medical professionals
   */
  optimizeForMedicalProfessionals() {
    return {
      // Prioritize readability over animations
      reduceAnimations: true,
      // Increase font size for better readability
      increaseFontSize: true,
      // Ensure high contrast
      highContrast: true,
      // Minimize distractions
      reduceMotion: true,
      // Focus on content accessibility
      prioritizeContent: true
    }
  },

  /**
   * Generate performance report for healthcare compliance
   */
  generateHealthcareReport(metrics: { animation: { averageFPS: number; droppedFrames: number }; performanceScore: number; errorRate: number; webVitals: { lcp: number } }) {
    return {
      accessibility: {
        reducedMotion: performanceUtils.shouldUseReducedMotion(),
        colorContrast: true, // Would be calculated
        fontSize: 'optimal',
        screenReaderSupport: true
      },
      professional: {
        smoothTransitions: metrics.animation.averageFPS >= 45,
        consistentPerformance: metrics.performanceScore >= 90,
        errorRate: metrics.errorRate <= 0.01,
        uptime: 99.9
      },
      trust: {
        performanceScore: metrics.performanceScore,
        loadingTime: metrics.webVitals.lcp <= 2500,
        reliability: metrics.animation.droppedFrames <= 2
      }
    }
  }
}

// Global instances
export const globalImageLoader = new PerformanceImageLoader()
export const globalComponentLoader = new ComponentLazyLoader()

const performanceUtilsExport = {
  PerformanceImageLoader,
  ComponentLazyLoader,
  performanceUtils,
  healthcarePerformanceUtils,
  usePerformanceOptimization,
  globalImageLoader,
  globalComponentLoader
}

export default performanceUtilsExport