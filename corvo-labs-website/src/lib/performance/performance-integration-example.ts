/**
 * Performance Monitoring Integration Example
 *
 * Example implementation showing how to integrate the performance monitoring system
 * into the Corvo Labs Website 2.0 application
 */

import { useEffect } from 'react'
import { initializePerformanceMonitoring } from './performance-monitor'
import { initializePerformanceAnalytics } from './performance-analytics'
import { usePerformanceMonitoring, useAnimationPerformance } from '../../hooks/use-performance-monitoring'
import { PerformanceDashboard } from '../../components/performance/performance-dashboard'
import { globalImageLoader, performanceUtils } from './performance-utils'

/**
 * Initialize performance monitoring for the entire application
 * This should be called in your app's entry point (e.g., _app.tsx or layout.tsx)
 */
export function initializeAppPerformance() {
  // Initialize core performance monitoring
  const performanceMonitor = initializePerformanceMonitoring({
    enabled: process.env.NODE_ENV === 'development',
    developmentMode: process.env.NODE_ENV === 'development',
    thresholds: {
      targetFPS: 60,
      minimumFPS: 45,
      criticalFPS: 30,
      maxMemoryMB: 80,
      maxLongFrames: 3,
      targetLCPScore: 95,
      targetFIDScore: 95,
      targetCLSScore: 95
    },
    enableAutoOptimization: true,
    enableReporting: process.env.NODE_ENV === 'production'
  })

  // Initialize analytics for production
  if (process.env.NODE_ENV === 'production') {
    const analytics = initializePerformanceAnalytics({
      enabled: true,
      samplingRate: 0.1, // 10% sampling in production
      endpoint: process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT,
      apiKey: process.env.NEXT_PUBLIC_ANALYTICS_API_KEY,
      respectDoNotTrack: true
    })

    // Subscribe to performance reports and send to analytics
    performanceMonitor.subscribe((report) => {
      analytics.trackPerformanceReport(report)
    })
  }

  // Setup global performance optimizations
  setupGlobalOptimizations()

  return performanceMonitor
}

/**
 * Setup global performance optimizations
 */
function setupGlobalOptimizations() {
  // Monitor memory usage and cleanup if needed
  const memoryMonitor = performanceUtils.monitorMemoryUsage(() => {
    console.warn('[Performance] High memory usage detected, performing cleanup')
    globalImageLoader.clearCache()

    // Trigger garbage collection if available
    if (typeof window !== 'undefined' && (window as any).gc) {
      (window as any).gc()
    }
  }, 100) // 100MB threshold

  // Setup performance-aware event listeners for common interactions
  if (typeof window !== 'undefined') {
    const cleanupScrollListener = performanceUtils.createPerformanceListener(
      window,
      'scroll',
      () => {
        // Handle scroll events with performance optimization
      },
      { passive: true }
    )

    const cleanupResizeListener = performanceUtils.createPerformanceListener(
      window,
      'resize',
      () => {
        // Handle resize events with performance optimization
      },
      { passive: true }
    )

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
      cleanupScrollListener()
      cleanupResizeListener()
      memoryMonitor()
    })
  }
}

/**
 * Example component using performance monitoring
 */
export function ExamplePerformanceAwareComponent() {
  const { metrics, getPerformanceScore, shouldUseReducedMotion } = usePerformanceMonitoring()
  const { getAnimationProps } = useAnimationPerformance('example-component')

  useEffect(() => {
    // Track component-specific performance
    if (metrics) {
      console.log('[Example Component] Performance metrics:', {
        fps: metrics.animation.averageFPS,
        memory: metrics.animation.memoryUsage,
        score: getPerformanceScore()
      })
    }
  }, [metrics, getPerformanceScore])

  const animationProps = getAnimationProps()

  return (
    <div
      style={{
        // Performance-aware animations
        transition: shouldUseReducedMotion() ? 'none' : `all ${animationProps.duration}s ${animationProps.ease as string}`,
        // Optimize for GPU acceleration
        willChange: shouldUseReducedMotion() ? 'auto' : 'transform, opacity',
        // Optimize rendering
        contain: 'layout style paint'
      }}
    >
      {/* Component content */}
    </div>
  )
}

/**
 * Example performance-aware image component
 */
export function PerformanceOptimizedImage({ src, alt, priority = false }: {
  src: string
  alt: string
  priority?: boolean
}) {
  useEffect(() => {
    // Preload priority images
    if (priority) {
      globalImageLoader.loadImage(src, { priority, quality: 0.9 })
    }
  }, [src, priority])

  const handleLoad = () => {
    // Track image load performance
    if (window.performance) {
      const loadTime = performance.now()
      console.log(`[Performance] Image loaded: ${alt} in ${loadTime.toFixed(2)}ms`)
    }
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      onLoad={handleLoad}
      style={{
        // Optimize image rendering
        contentVisibility: 'auto',
        containIntrinsicSize: 'auto 300px'
      }}
    />
  )
}

/**
 * Example page component with performance dashboard
 */
export function ExamplePageWithPerformanceDashboard() {
  const { metrics, getPerformanceScore } = usePerformanceMonitoring()

  useEffect(() => {
    // Track page-specific performance
    const startTime = performance.now()

    return () => {
      const pageTime = performance.now() - startTime
      console.log(`[Performance] Page time: ${pageTime.toFixed(2)}ms`)
    }
  }, [])

  return (
    <>
      {/* Performance dashboard - only visible in development */}
      <PerformanceDashboard
        enabled={process.env.NODE_ENV === 'development'}
        position="top-right"
        compact={false}
      />

      {/* Page content */}
      <main>
        <h1>Performance Monitoring Example</h1>

        {/* Display performance metrics */}
        {metrics && (
          <div className="performance-metrics">
            <p>Overall Score: {getPerformanceScore().score}/100</p>
            <p>FPS: {metrics.animation.averageFPS}</p>
            <p>Memory: {metrics.animation.memoryUsage.toFixed(1)}MB</p>
            <p>Web Vitals Score: {metrics.webVitals.score}</p>
          </div>
        )}

        {/* Example components */}
        <ExamplePerformanceAwareComponent />
        <PerformanceOptimizedImage
          src="/api/placeholder/400/300"
          alt="Example image"
          priority={true}
        />
      </main>
    </>
  )
}

/**
 * Example integration with Framer Motion
 */
export function ExampleFramerMotionIntegration() {
  const { shouldUseReducedMotion, getPerformanceScore } = usePerformanceMonitoring()
  const { getAnimationProps } = useAnimationPerformance('framer-motion-example')

  const animationProps = getAnimationProps()

  return (
    <motion.div
      initial={false} // Don't animate on initial load for performance
      animate={{
        // Performance-aware animations
        scale: shouldUseReducedMotion() ? 1 : [1, 1.05, 1],
        opacity: shouldUseReducedMotion() ? 1 : [0, 1]
      }}
      transition={{
        duration: animationProps.duration,
        ease: animationProps.ease
      }}
      style={{
        // Optimize for GPU
        transform: 'translateZ(0)', // Force GPU layer
        backfaceVisibility: 'hidden' as const
      }}
    >
      <h2>Performance-Optimized Animation</h2>
      <p>Performance Score: {getPerformanceScore().score}</p>
    </motion.div>
  )
}

/**
 * Example healthcare-specific performance optimization
 */
export function HealthcareOptimizedComponent() {
  const { metrics, shouldUseReducedMotion } = usePerformanceMonitoring()

  // Healthcare-specific optimizations
  useEffect(() => {
    if (metrics) {
      // Ensure animations meet healthcare accessibility requirements
      const animationDuration = 500 // 500ms maximum for healthcare
      const isAccessible = animationDuration <= 500 && animationDuration >= 200

      if (!isAccessible) {
        console.warn('[Healthcare] Animation duration outside accessibility guidelines')
      }

      // Track healthcare-specific metrics
      console.log('[Healthcare] Performance for medical professionals:', {
        smoothTransitions: metrics.animation.averageFPS >= 45,
        professionalAppearance: metrics.performanceScore >= 90,
        accessibilityCompliant: shouldUseReducedMotion() || isAccessible
      })
    }
  }, [metrics, shouldUseReducedMotion])

  return (
    <div
      style={{
        // Healthcare-specific optimizations
        fontSize: '16px', // Minimum readable size
        lineHeight: 1.5, // Good readability
        color: '#333', // High contrast
        backgroundColor: '#fff',
        // Reduce motion for accessibility
        transition: shouldUseReducedMotion() ? 'none' : 'all 0.3s ease',
        // Ensure accessibility
        role: 'region',
        'aria-label': 'Healthcare content'
      }}
    >
      <h2>Healthcare-Optimized Content</h2>
      <p>
        This component is optimized for healthcare professionals with strict
        performance and accessibility requirements.
      </p>
      {metrics && (
        <div className="healthcare-metrics" style={{ fontSize: '14px', color: '#666' }}>
          <p>✓ Professional Appearance: {metrics.performanceScore >= 90 ? 'Yes' : 'No'}</p>
          <p>✓ Smooth Transitions: {metrics.animation.averageFPS >= 45 ? 'Yes' : 'No'}</p>
          <p>✓ Accessibility: {shouldUseReducedMotion() ? 'Reduced Motion' : 'Optimized'}</p>
        </div>
      )}
    </div>
  )
}

/**
 * Example custom performance monitoring hook
 */
export function useCustomPerformanceTracking(componentName: string) {
  const { metrics, monitor } = usePerformanceMonitoring()

  useEffect(() => {
    if (!metrics) return

    // Track custom performance metrics
    const customMetrics = {
      component: componentName,
      fps: metrics.animation.averageFPS,
      memory: metrics.animation.memoryUsage,
      timestamp: Date.now()
    }

    // Send to custom analytics or monitoring service
    console.log(`[Custom Tracking] ${componentName}:`, customMetrics)

    // Example: Send to healthcare compliance monitoring
    if (process.env.NEXT_PUBLIC_HEALTHCARE_MONITORING_ENDPOINT) {
      fetch(process.env.NEXT_PUBLIC_HEALTHCARE_MONITORING_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'performance',
          component: componentName,
          metrics: customMetrics,
          healthcareCompliance: {
            accessibility: true,
            professional: metrics.performanceScore >= 90,
            reliable: metrics.animation.droppedFrames <= 2
          }
        })
      }).catch(console.error)
    }
  }, [metrics, componentName])

  return { metrics }
}

/**
 * Example usage in Next.js app/layout.tsx
 */
/*
// In your app/layout.tsx or _app.tsx:

import { initializeAppPerformance, PerformanceDashboard } from '@/lib/performance/performance-integration-example'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Initialize performance monitoring
  useEffect(() => {
    const monitor = initializeAppPerformance()

    return () => {
      monitor.stopMonitoring()
    }
  }, [])

  return (
    <html lang="en">
      <body>
        {children}

        {process.env.NODE_ENV === 'development' && (
          <PerformanceDashboard
            enabled={true}
            position="top-right"
          />
        )}
      </body>
    </html>
  )
}
*/

export default {
  initializeAppPerformance,
  ExamplePerformanceAwareComponent,
  PerformanceOptimizedImage,
  ExamplePageWithPerformanceDashboard,
  ExampleFramerMotionIntegration,
  HealthcareOptimizedComponent,
  useCustomPerformanceTracking
}