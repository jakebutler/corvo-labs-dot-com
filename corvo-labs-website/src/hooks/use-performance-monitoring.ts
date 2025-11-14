/**
 * Performance Monitoring Hook
 *
 * React hooks for integrating performance monitoring into components
 * Provides real-time performance data and optimization capabilities
 */

import { useEffect, useState, useCallback, useRef, useMemo } from 'react'
import {
  PerformanceMonitor,
  PerformanceReport,
  PerformanceConfig,
  globalPerformanceMonitor
} from '@/lib/performance/performance-monitor'
import { useWindowSize } from 'react-use'

/**
 * Performance monitoring hook for components
 */
export function usePerformanceMonitoring(
  config?: Partial<PerformanceConfig>,
  customMonitor?: PerformanceMonitor
) {
  const [metrics, setMetrics] = useState<PerformanceReport | null>(null)
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [insights, setInsights] = useState<any>(null)
  const { width, height } = useWindowSize()

  const monitor = useRef(customMonitor || globalPerformanceMonitor)

  useEffect(() => {
    if (config) {
      monitor.current.updateConfig(config)
    }

    // Start monitoring
    monitor.current.startMonitoring()
    setIsMonitoring(true)

    // Subscribe to performance reports
    const unsubscribe = monitor.current.subscribe((report) => {
      setMetrics(report)
    })

    return () => {
      unsubscribe()
      if (!customMonitor) {
        // Only stop monitoring if it's the global instance
        monitor.current.stopMonitoring()
      }
      setIsMonitoring(false)
    }
  }, [config, customMonitor])

  // Update insights when metrics change
  useEffect(() => {
    if (metrics) {
      setInsights(monitor.current.getPerformanceInsights())
    }
  }, [metrics])

  // Get performance score with color coding
  const getPerformanceScore = useCallback(() => {
    if (!metrics) return { score: 0, color: 'text-gray-500', label: 'Unknown' }

    const score = metrics.performanceScore

    if (score >= 90) return { score, color: 'text-green-500', label: 'Excellent' }
    if (score >= 75) return { score, color: 'text-blue-500', label: 'Good' }
    if (score >= 60) return { score, color: 'text-yellow-500', label: 'Fair' }
    return { score, color: 'text-red-500', label: 'Poor' }
  }, [metrics])

  // Get animation quality based on performance
  const getAnimationQuality = useCallback(() => {
    if (!metrics) return 'high'

    const { animation } = metrics

    if (animation.averageFPS < 30 || animation.memoryUsage > 100) return 'low'
    if (animation.averageFPS < 45 || animation.memoryUsage > 50) return 'medium'
    return 'high'
  }, [metrics])

  // Check if should use reduced motion
  const shouldUseReducedMotion = useCallback(() => {
    if (!metrics) return false

    return (
      metrics.animation.averageFPS < 30 ||
      metrics.animation.memoryUsage > 80 ||
      getAnimationQuality() === 'low'
    )
  }, [metrics, getAnimationQuality])

  // Get viewport-based performance adjustments
  const getViewportOptimizations = useCallback(() => {
    const isMobile = width < 768
    const isTablet = width >= 768 && width < 1024
    const isHighDensity = window.devicePixelRatio > 1

    return {
      isMobile,
      isTablet,
      isHighDensity,
      recommendedQuality: isMobile ? 'medium' : 'high',
      maxConcurrentAnimations: isMobile ? 2 : isTablet ? 4 : 6,
      animationDuration: isMobile ? 0.3 : 0.5
    }
  }, [width, height])

  return {
    metrics,
    insights,
    isMonitoring,
    getPerformanceScore,
    getAnimationQuality,
    shouldUseReducedMotion,
    getViewportOptimizations,
    monitor: monitor.current
  }
}

/**
 * Animation performance hook for optimizing individual animations
 */
export function useAnimationPerformance(animationId?: string) {
  const [isOptimized, setIsOptimized] = useState(false)
  const [frameDrops, setFrameDrops] = useState(0)
  const { metrics, getAnimationQuality, shouldUseReducedMotion } = usePerformanceMonitoring()

  // Register animation
  useEffect(() => {
    if (animationId && metrics) {
      // Track animation performance
      const currentFrameDrops = metrics.animation.droppedFrames
      setFrameDrops(currentFrameDrops)

      // Optimize based on performance
      const quality = getAnimationQuality()
      setIsOptimized(quality === 'low' || shouldUseReducedMotion())
    }
  }, [animationId, metrics, getAnimationQuality, shouldUseReducedMotion])

  // Get animation props based on performance
  const getAnimationProps = useCallback(() => {
    const quality = getAnimationQuality()

    switch (quality) {
      case 'low':
        return {
          duration: 0.15,
          ease: 'linear' as const,
          disabled: true,
          skipEnter: true,
          skipExit: true
        }
      case 'medium':
        return {
          duration: 0.3,
          ease: 'easeOut' as const,
          disabled: false,
          skipEnter: false,
          skipExit: false
        }
      default:
        return {
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94] as const,
          disabled: false,
          skipEnter: false,
          skipExit: false
        }
    }
  }, [getAnimationQuality])

  return {
    isOptimized,
    frameDrops,
    getAnimationProps,
    quality: getAnimationQuality()
  }
}

/**
 * Component performance hook for tracking render performance
 */
export function useComponentPerformance(componentName: string) {
  const [renderCount, setRenderCount] = useState(0)
  const [renderTime, setRenderTime] = useState(0)
  const renderStartTime = useRef<number>(0)

  // Track renders
  useEffect(() => {
    renderStartTime.current = performance.now()
    setRenderCount(prev => prev + 1)

    return () => {
      const renderDuration = performance.now() - renderStartTime.current
      setRenderTime(prev => Math.max(prev, renderDuration))

      // Log slow renders in development
      if (process.env.NODE_ENV === 'development' && renderDuration > 16) {
        console.warn(
          `[Performance] Slow render detected in ${componentName}: ${renderDuration.toFixed(2)}ms`
        )
      }
    }
  })

  // Check if component needs optimization
  const needsOptimization = useMemo(() => {
    return renderCount > 100 || renderTime > 16
  }, [renderCount, renderTime])

  return {
    renderCount,
    renderTime,
    needsOptimization,
    averageRenderTime: renderTime / Math.max(renderCount, 1)
  }
}

/**
 * Bundle performance hook for monitoring JavaScript bundle sizes
 */
export function useBundlePerformance() {
  const [bundleMetrics, setBundleMetrics] = useState<any>(null)
  const { metrics } = usePerformanceMonitoring()

  useEffect(() => {
    if (metrics) {
      setBundleMetrics(metrics.bundle)
    }
  }, [metrics])

  // Get bundle analysis
  const getBundleAnalysis = useCallback(() => {
    if (!bundleMetrics) return null

    const totalSizeMB = bundleMetrics.totalSize / (1024 * 1024)
    const largestChunkKB = bundleMetrics.largestChunk / 1024

    return {
      totalSizeMB,
      largestChunkKB,
      chunkCount: bundleMetrics.chunkCount,
      assetCount: bundleMetrics.assetCount,
      isOptimal: totalSizeMB < 1 && largestChunkKB < 200,
      recommendations: []
    }
  }, [bundleMetrics])

  return {
    bundleMetrics,
    getBundleAnalysis
  }
}

/**
 * Web Vitals hook for Core Web Vitals monitoring
 */
export function useWebVitals() {
  const [webVitals, setWebVitals] = useState<any>(null)
  const { metrics } = usePerformanceMonitoring()

  useEffect(() => {
    if (metrics) {
      setWebVitals(metrics.webVitals)
    }
  }, [metrics])

  // Get Web Vitals scoring
  const getWebVitalsScore = useCallback(() => {
    if (!webVitals) return null

    const { lcp, fid, cls, fcp, ttfb, score } = webVitals

    return {
      lcp: {
        value: lcp,
        score: lcp ? (lcp < 2500 ? 90 : lcp < 4000 ? 70 : 40) : 0,
        status: lcp ? (lcp < 2500 ? 'good' : lcp < 4000 ? 'needs-improvement' : 'poor') : 'unknown'
      },
      fid: {
        value: fid,
        score: fid ? (fid < 100 ? 90 : fid < 300 ? 70 : 40) : 0,
        status: fid ? (fid < 100 ? 'good' : fid < 300 ? 'needs-improvement' : 'poor') : 'unknown'
      },
      cls: {
        value: cls,
        score: cls ? (cls < 0.1 ? 90 : cls < 0.25 ? 70 : 40) : 0,
        status: cls ? (cls < 0.1 ? 'good' : cls < 0.25 ? 'needs-improvement' : 'poor') : 'unknown'
      },
      fcp: {
        value: fcp,
        score: fcp ? (fcp < 1800 ? 90 : fcp < 3000 ? 70 : 40) : 0,
        status: fcp ? (fcp < 1800 ? 'good' : fcp < 3000 ? 'needs-improvement' : 'poor') : 'unknown'
      },
      ttfb: {
        value: ttfb,
        score: ttfb ? (ttfb < 800 ? 90 : ttfb < 1800 ? 70 : 40) : 0,
        status: ttfb ? (ttfb < 800 ? 'good' : ttfb < 1800 ? 'needs-improvement' : 'poor') : 'unknown'
      },
      overall: {
        score,
        status: score >= 90 ? 'good' : score >= 75 ? 'needs-improvement' : 'poor'
      }
    }
  }, [webVitals])

  return {
    webVitals,
    getWebVitalsScore
  }
}

/**
 * Performance alerts hook for real-time performance notifications
 */
export function usePerformanceAlerts() {
  const [alerts, setAlerts] = useState<any[]>([])
  const { metrics } = usePerformanceMonitoring()

  useEffect(() => {
    if (!metrics) return

    const newAlerts: any[] = []

    // FPS alerts
    if (metrics.animation.averageFPS < 30) {
      newAlerts.push({
        type: 'critical',
        message: `Low FPS detected: ${metrics.animation.averageFPS}`,
        category: 'performance'
      })
    } else if (metrics.animation.averageFPS < 45) {
      newAlerts.push({
        type: 'warning',
        message: `FPS below optimal: ${metrics.animation.averageFPS}`,
        category: 'performance'
      })
    }

    // Memory alerts
    if (metrics.animation.memoryUsage > 100) {
      newAlerts.push({
        type: 'critical',
        message: `High memory usage: ${metrics.animation.memoryUsage.toFixed(1)}MB`,
        category: 'memory'
      })
    } else if (metrics.animation.memoryUsage > 50) {
      newAlerts.push({
        type: 'warning',
        message: `Memory usage elevated: ${metrics.animation.memoryUsage.toFixed(1)}MB`,
        category: 'memory'
      })
    }

    // Web Vitals alerts
    if (metrics.webVitals.score < 60) {
      newAlerts.push({
        type: 'critical',
        message: `Poor Core Web Vitals score: ${metrics.webVitals.score}`,
        category: 'web-vitals'
      })
    } else if (metrics.webVitals.score < 75) {
      newAlerts.push({
        type: 'warning',
        message: `Web Vitals need improvement: ${metrics.webVitals.score}`,
        category: 'web-vitals'
      })
    }

    setAlerts(newAlerts)
  }, [metrics])

  const clearAlerts = useCallback(() => {
    setAlerts([])
  }, [])

  const hasCriticalAlerts = alerts.some(alert => alert.type === 'critical')
  const hasWarnings = alerts.some(alert => alert.type === 'warning')

  return {
    alerts,
    hasCriticalAlerts,
    hasWarnings,
    clearAlerts
  }
}

/**
 * Performance history hook for tracking performance trends
 */
export function usePerformanceHistory() {
  const [history, setHistory] = useState<PerformanceReport[]>([])
  const monitor = useRef(globalPerformanceMonitor)

  useEffect(() => {
    const updateHistory = () => {
      setHistory(monitor.current.getMetricsHistory())
    }

    // Initial load
    updateHistory()

    // Update periodically
    const interval = setInterval(updateHistory, 5000) // 5 seconds

    return () => clearInterval(interval)
  }, [])

  // Get performance trends
  const getTrends = useCallback(() => {
    if (history.length < 2) return null

    const recent = history.slice(-10)
    const first = recent[0]
    const last = recent[recent.length - 1]

    return {
      fps: {
        current: last.animation.averageFPS,
        trend: last.animation.averageFPS - first.animation.averageFPS,
        direction: last.animation.averageFPS > first.animation.averageFPS ? 'improving' : 'declining'
      },
      memory: {
        current: last.animation.memoryUsage,
        trend: last.animation.memoryUsage - first.animation.memoryUsage,
        direction: last.animation.memoryUsage < first.animation.memoryUsage ? 'improving' : 'declining'
      },
      webVitals: {
        current: last.webVitals.score,
        trend: last.webVitals.score - first.webVitals.score,
        direction: last.webVitals.score > first.webVitals.score ? 'improving' : 'declining'
      },
      overall: {
        current: last.performanceScore,
        trend: last.performanceScore - first.performanceScore,
        direction: last.performanceScore > first.performanceScore ? 'improving' : 'declining'
      }
    }
  }, [history])

  // Get performance averages
  const getAverages = useCallback(() => {
    if (history.length === 0) return null

    const totals = history.reduce(
      (acc, report) => ({
        fps: acc.fps + report.animation.averageFPS,
        memory: acc.memory + report.animation.memoryUsage,
        webVitals: acc.webVitals + report.webVitals.score,
        overall: acc.overall + report.performanceScore
      }),
      { fps: 0, memory: 0, webVitals: 0, overall: 0 }
    )

    const count = history.length

    return {
      fps: Math.round(totals.fps / count),
      memory: totals.memory / count,
      webVitals: Math.round(totals.webVitals / count),
      overall: Math.round(totals.overall / count)
    }
  }, [history])

  return {
    history,
    getTrends,
    getAverages
  }
}

export default usePerformanceMonitoring