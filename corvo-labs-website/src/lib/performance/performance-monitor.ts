/**
 * Comprehensive Performance Monitoring System
 *
 * Advanced performance monitoring for Corvo Labs Website 2.0
 * Tracks animation performance, Core Web Vitals, memory usage, and more
 * Optimized for healthcare AI consulting website requirements
 */

import { getCLS, getFID, getFCP, getLCP, getTTFB, Metric } from 'web-vitals'

// Performance monitoring types
export interface CoreWebVitals {
  lcp: number | null      // Largest Contentful Paint
  fid: number | null      // First Input Delay
  cls: number | null      // Cumulative Layout Shift
  fcp: number | null      // First Contentful Paint
  ttfb: number | null     // Time to First Byte
  score: number           // Overall performance score (0-100)
}

export interface AnimationMetrics {
  currentFPS: number
  averageFPS: number
  droppedFrames: number
  longFrames: number
  frameTime: number
  animationCount: number
  memoryUsage: number
}

export interface BundleMetrics {
  totalSize: number
  gzippedSize: number
  chunkCount: number
  largestChunk: number
  assetCount: number
}

export interface PerformanceReport {
  timestamp: number
  webVitals: CoreWebVitals
  animation: AnimationMetrics
  bundle: BundleMetrics
  deviceInfo: DeviceInfo
  performanceScore: number
  recommendations: string[]
}

export interface DeviceInfo {
  userAgent: string
  platform: string
  hardwareConcurrency: number
  deviceMemory: number
  connection: {
    effectiveType: string
    downlink: number
    rtt: number
  } | null
  viewport: {
    width: number
    height: number
    devicePixelRatio: number
  }
}

export interface PerformanceThresholds {
  targetFPS: number
  minimumFPS: number
  criticalFPS: number
  maxMemoryMB: number
  maxLongFrames: number
  targetLCPScore: number
  targetFIDScore: number
  targetCLSScore: number
}

export interface PerformanceConfig {
  enabled: boolean
  developmentMode: boolean
  samplingRate: number
  reportInterval: number
  maxHistoryEntries: number
  thresholds: PerformanceThresholds
  enableAutoOptimization: boolean
  enableReporting: boolean
}

// Default configuration optimized for healthcare professional audience
export const DEFAULT_PERFORMANCE_CONFIG: PerformanceConfig = {
  enabled: true,
  developmentMode: process.env.NODE_ENV === 'development',
  samplingRate: 1.0, // 100% sampling in development, adjust for production
  reportInterval: 30000, // 30 seconds
  maxHistoryEntries: 100,
  thresholds: {
    targetFPS: 60,
    minimumFPS: 30,
    criticalFPS: 20,
    maxMemoryMB: 100,
    maxLongFrames: 5,
    targetLCPScore: 90,
    targetFIDScore: 90,
    targetCLSScore: 90
  },
  enableAutoOptimization: true,
  enableReporting: true
}

/**
 * Comprehensive Performance Monitor
 */
export class PerformanceMonitor {
  private config: PerformanceConfig
  private isMonitoring: boolean = false
  private metricsHistory: PerformanceReport[] = []
  private animationMetrics: AnimationMetrics
  private webVitals: CoreWebVitals
  private bundleMetrics: BundleMetrics
  private deviceInfo: DeviceInfo
  private frameTimeHistory: number[] = []
  private lastFrameTime: number = 0
  private frameCount: number = 0
  private animationFrameId: number | null = null
  private reportIntervalId: NodeJS.Timeout | null = null
  private subscribers: Set<(report: PerformanceReport) => void> = new Set()
  private performanceObservers: PerformanceObserver[] = []

  constructor(config: Partial<PerformanceConfig> = {}) {
    this.config = { ...DEFAULT_PERFORMANCE_CONFIG, ...config }

    this.animationMetrics = this.initializeAnimationMetrics()
    this.webVitals = this.initializeWebVitals()
    this.bundleMetrics = this.initializeBundleMetrics()
    this.deviceInfo = this.initializeDeviceInfo()
  }

  /**
   * Start performance monitoring
   */
  startMonitoring() {
    if (this.isMonitoring || !this.config.enabled) return

    this.isMonitoring = true
    console.log('[Performance Monitor] Starting comprehensive performance monitoring')

    // Initialize Core Web Vitals monitoring
    this.initializeWebVitalsMonitoring()

    // Initialize animation performance monitoring
    this.initializeAnimationMonitoring()

    // Initialize resource monitoring
    this.initializeResourceMonitoring()

    // Start periodic reporting
    this.startPeriodicReporting()

    // Initialize bundle size monitoring
    this.initializeBundleMonitoring()
  }

  /**
   * Stop performance monitoring
   */
  stopMonitoring() {
    if (!this.isMonitoring) return

    this.isMonitoring = false
    console.log('[Performance Monitor] Stopping performance monitoring')

    // Stop animation frame monitoring
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId)
      this.animationFrameId = null
    }

    // Stop periodic reporting
    if (this.reportIntervalId) {
      clearInterval(this.reportIntervalId)
      this.reportIntervalId = null
    }

    // Disconnect performance observers
    this.performanceObservers.forEach(observer => observer.disconnect())
    this.performanceObservers = []
  }

  /**
   * Initialize animation metrics
   */
  private initializeAnimationMetrics(): AnimationMetrics {
    return {
      currentFPS: 0,
      averageFPS: 60,
      droppedFrames: 0,
      longFrames: 0,
      frameTime: 0,
      animationCount: 0,
      memoryUsage: 0
    }
  }

  /**
   * Initialize Web Vitals
   */
  private initializeWebVitals(): CoreWebVitals {
    return {
      lcp: null,
      fid: null,
      cls: null,
      fcp: null,
      ttfb: null,
      score: 0
    }
  }

  /**
   * Initialize bundle metrics
   */
  private initializeBundleMetrics(): BundleMetrics {
    return {
      totalSize: 0,
      gzippedSize: 0,
      chunkCount: 0,
      largestChunk: 0,
      assetCount: 0
    }
  }

  /**
   * Initialize device information
   */
  private initializeDeviceInfo(): DeviceInfo {
    const navigator = window.navigator as Navigator & {
      hardwareConcurrency?: number;
      deviceMemory?: number;
      connection?: {
        effectiveType: string;
        downlink: number;
        rtt: number;
      };
    }
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection

    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      hardwareConcurrency: navigator.hardwareConcurrency || 4,
      deviceMemory: navigator.deviceMemory || 4,
      connection: connection ? {
        effectiveType: connection.effectiveType || 'unknown',
        downlink: connection.downlink || 0,
        rtt: connection.rtt || 0
      } : null,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio || 1
      }
    }
  }

  /**
   * Initialize Core Web Vitals monitoring
   */
  private initializeWebVitalsMonitoring() {
    const processMetric = (metric: Metric) => {
      switch (metric.name) {
        case 'LCP':
          this.webVitals.lcp = metric.value
          break
        case 'FID':
          this.webVitals.fid = metric.value
          break
        case 'CLS':
          this.webVitals.cls = metric.value
          break
        case 'FCP':
          this.webVitals.fcp = metric.value
          break
        case 'TTFB':
          this.webVitals.ttfb = metric.value
          break
      }

      this.calculateWebVitalsScore()
    }

    // Get all Core Web Vitals
    getCLS(processMetric)
    getFID(processMetric)
    getFCP(processMetric)
    getLCP(processMetric)
    getTTFB(processMetric)
  }

  /**
   * Initialize animation performance monitoring
   */
  private initializeAnimationMonitoring() {
    this.lastFrameTime = performance.now()
    this.frameCount = 0
    this.frameTimeHistory = []

    this.measureAnimationPerformance()
  }

  /**
   * Measure animation performance using requestAnimationFrame
   */
  private measureAnimationPerformance = () => {
    if (!this.isMonitoring) return

    const currentTime = performance.now()
    const frameTime = currentTime - this.lastFrameTime

    this.frameCount++
    this.frameTimeHistory.push(frameTime)

    // Calculate current FPS
    this.animationMetrics.currentFPS = Math.round(1000 / frameTime)

    // Track dropped frames (>16.67ms for 60fps)
    if (frameTime > 16.67) {
      this.animationMetrics.droppedFrames++
    }

    // Track long frames (>33.33ms for 30fps)
    if (frameTime > 33.33) {
      this.animationMetrics.longFrames++
    }

    // Keep history within limits
    if (this.frameTimeHistory.length > 60) {
      this.frameTimeHistory.shift()
    }

    // Calculate average FPS
    if (this.frameTimeHistory.length > 0) {
      const averageFrameTime = this.frameTimeHistory.reduce((a, b) => a + b, 0) / this.frameTimeHistory.length
      this.animationMetrics.averageFPS = Math.round(1000 / averageFrameTime)
      this.animationMetrics.frameTime = averageFrameTime
    }

    // Update memory usage
    const memory = (performance as unknown as { memory?: { usedJSHeapSize: number } })?.memory
    if (memory) {
      this.animationMetrics.memoryUsage = memory.usedJSHeapSize / (1024 * 1024) // MB
    }

    this.lastFrameTime = currentTime
    this.animationFrameId = requestAnimationFrame(this.measureAnimationPerformance)
  }

  /**
   * Initialize resource monitoring
   */
  private initializeResourceMonitoring() {
    if ('PerformanceObserver' in window) {
      // Monitor resource loading
      const resourceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        this.processResourceEntries(entries)
      })

      resourceObserver.observe({ entryTypes: ['resource'] })
      this.performanceObservers.push(resourceObserver)

      // Monitor navigation timing
      const navigationObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        this.processNavigationEntries(entries)
      })

      navigationObserver.observe({ entryTypes: ['navigation'] })
      this.performanceObservers.push(navigationObserver)
    }
  }

  /**
   * Process resource entries for bundle analysis
   */
  private processResourceEntries(entries: PerformanceEntry[]) {
    let totalSize = 0
    let chunkCount = 0
    let largestChunk = 0
    let assetCount = 0

    entries.forEach((entry) => {
      const resource = entry as PerformanceResourceTiming

      if (resource.name.includes('.js') || resource.name.includes('.css')) {
        const size = this.estimateResourceSize(resource)
        totalSize += size
        chunkCount++
        largestChunk = Math.max(largestChunk, size)
      }

      assetCount++
    })

    this.bundleMetrics.totalSize = totalSize
    this.bundleMetrics.chunkCount = chunkCount
    this.bundleMetrics.largestChunk = largestChunk
    this.bundleMetrics.assetCount = assetCount
  }

  /**
   * Process navigation entries
   */
  private processNavigationEntries(entries: PerformanceEntry[]) {
    entries.forEach((entry) => {
      const navigation = entry as PerformanceNavigationTiming

      // Update TTFB if not already set by web-vitals
      if (!this.webVitals.ttfb) {
        this.webVitals.ttfb = navigation.responseStart - navigation.requestStart
      }
    })
  }

  /**
   * Estimate resource size from performance timing
   */
  private estimateResourceSize(resource: PerformanceResourceTiming): number {
    // This is an estimation - actual size might not be available due to CORS
    if (resource.transferSize > 0) {
      return resource.transferSize
    }

    // Fallback estimation based on response time and content type
    const isJS = resource.name.includes('.js')
    const isCSS = resource.name.includes('.css')

    if (isJS || isCSS) {
      return Math.max(1000, resource.duration * 10) // Rough estimation
    }

    return 0
  }

  /**
   * Initialize bundle monitoring
   */
  private initializeBundleMonitoring() {
    // Monitor for dynamic imports and chunk loading
    if ('PerformanceObserver' in window) {
      const measureObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          if (entry.name.includes('chunk') || entry.name.includes('dynamic')) {
            console.log('[Performance Monitor] Dynamic chunk loaded:', entry.name, entry.duration)
          }
        })
      })

      measureObserver.observe({ entryTypes: ['measure'] })
      this.performanceObservers.push(measureObserver)
    }
  }

  /**
   * Calculate Web Vitals score
   */
  private calculateWebVitalsScore() {
    let score = 0
    let count = 0

    if (this.webVitals.lcp !== null) {
      // LCP scoring: <2.5s = 90-100, 2.5s-4s = 50-90, >4s = 0-50
      const lcpScore = this.webVitals.lcp < 2500 ? 90 + (10 * (2500 - this.webVitals.lcp) / 2500) :
                       this.webVitals.lcp < 4000 ? 90 - (40 * (this.webVitals.lcp - 2500) / 1500) :
                       Math.max(0, 50 - (50 * (this.webVitals.lcp - 4000) / 1000))
      score += lcpScore
      count++
    }

    if (this.webVitals.fid !== null) {
      // FID scoring: <100ms = 90-100, 100-300ms = 50-90, >300ms = 0-50
      const fidScore = this.webVitals.fid < 100 ? 90 + (10 * (100 - this.webVitals.fid) / 100) :
                       this.webVitals.fid < 300 ? 90 - (40 * (this.webVitals.fid - 100) / 200) :
                       Math.max(0, 50 - (50 * (this.webVitals.fid - 300) / 200))
      score += fidScore
      count++
    }

    if (this.webVitals.cls !== null) {
      // CLS scoring: <0.1 = 90-100, 0.1-0.25 = 50-90, >0.25 = 0-50
      const clsScore = this.webVitals.cls < 0.1 ? 90 + (10 * (0.1 - this.webVitals.cls) / 0.1) :
                       this.webVitals.cls < 0.25 ? 90 - (40 * (this.webVitals.cls - 0.1) / 0.15) :
                       Math.max(0, 50 - (50 * (this.webVitals.cls - 0.25) / 0.25))
      score += clsScore
      count++
    }

    this.webVitals.score = count > 0 ? Math.round(score / count) : 0
  }

  /**
   * Start periodic reporting
   */
  private startPeriodicReporting() {
    if (this.reportIntervalId) {
      clearInterval(this.reportIntervalId)
    }

    this.reportIntervalId = setInterval(() => {
      this.generateReport()
    }, this.config.reportInterval)
  }

  /**
   * Generate comprehensive performance report
   */
  private generateReport(): PerformanceReport {
    const report: PerformanceReport = {
      timestamp: Date.now(),
      webVitals: { ...this.webVitals },
      animation: { ...this.animationMetrics },
      bundle: { ...this.bundleMetrics },
      deviceInfo: { ...this.deviceInfo },
      performanceScore: this.calculateOverallScore(),
      recommendations: this.generateRecommendations()
    }

    // Store in history
    this.metricsHistory.push(report)
    if (this.metricsHistory.length > this.config.maxHistoryEntries) {
      this.metricsHistory.shift()
    }

    // Notify subscribers
    this.subscribers.forEach(callback => callback(report))

    // Log in development mode
    if (this.config.developmentMode) {
      console.log('[Performance Monitor] Report generated:', report)
    }

    return report
  }

  /**
   * Calculate overall performance score
   */
  private calculateOverallScore(): number {
    const weights = {
      webVitals: 0.4,
      animation: 0.4,
      bundle: 0.2
    }

    const webVitalsScore = this.webVitals.score
    const animationScore = this.calculateAnimationScore()
    const bundleScore = this.calculateBundleScore()

    return Math.round(
      webVitalsScore * weights.webVitals +
      animationScore * weights.animation +
      bundleScore * weights.bundle
    )
  }

  /**
   * Calculate animation performance score
   */
  private calculateAnimationScore(): number {
    const { thresholds } = this.config

    let score = 0

    // FPS score (40% weight)
    const fpsScore = this.animationMetrics.averageFPS >= thresholds.targetFPS ? 100 :
                     this.animationMetrics.averageFPS >= thresholds.minimumFPS ? 70 :
                     this.animationMetrics.averageFPS >= thresholds.criticalFPS ? 40 : 0
    score += fpsScore * 0.4

    // Memory usage score (30% weight)
    const memoryScore = this.animationMetrics.memoryUsage <= thresholds.maxMemoryMB ? 100 :
                       this.animationMetrics.memoryUsage <= thresholds.maxMemoryMB * 1.5 ? 70 : 40
    score += memoryScore * 0.3

    // Frame drops score (30% weight)
    const frameDropScore = this.animationMetrics.droppedFrames === 0 ? 100 :
                          this.animationMetrics.droppedFrames <= thresholds.maxLongFrames ? 70 : 40
    score += frameDropScore * 0.3

    return Math.round(score)
  }

  /**
   * Calculate bundle performance score
   */
  private calculateBundleScore(): number {
    let score = 100

    // Penalize large bundles
    if (this.bundleMetrics.totalSize > 1024 * 1024) { // >1MB
      score -= 30
    } else if (this.bundleMetrics.totalSize > 512 * 1024) { // >512KB
      score -= 15
    }

    // Penalize too many chunks
    if (this.bundleMetrics.chunkCount > 50) {
      score -= 20
    } else if (this.bundleMetrics.chunkCount > 30) {
      score -= 10
    }

    return Math.max(0, score)
  }

  /**
   * Generate performance recommendations
   */
  private generateRecommendations(): string[] {
    const recommendations: string[] = []
    const { thresholds } = this.config

    // Web Vitals recommendations
    if (this.webVitals.lcp !== null && this.webVitals.lcp > 2500) {
      recommendations.push('Optimize Largest Contentful Paint by lazy loading images and optimizing critical resources')
    }

    if (this.webVitals.fid !== null && this.webVitals.fid > 100) {
      recommendations.push('Reduce First Input Delay by minimizing JavaScript execution time and breaking up long tasks')
    }

    if (this.webVitals.cls !== null && this.webVitals.cls > 0.1) {
      recommendations.push('Reduce Cumulative Layout Shift by ensuring proper image dimensions and avoiding dynamic content insertion')
    }

    // Animation performance recommendations
    if (this.animationMetrics.averageFPS < thresholds.targetFPS) {
      recommendations.push('Consider reducing animation complexity or using CSS transforms for better performance')
    }

    if (this.animationMetrics.memoryUsage > thresholds.maxMemoryMB) {
      recommendations.push('Memory usage is high. Consider implementing memory cleanup for animations and components')
    }

    if (this.animationMetrics.droppedFrames > thresholds.maxLongFrames) {
      recommendations.push('Multiple frame drops detected. Consider reducing concurrent animations or implementing frame rate limiting')
    }

    // Bundle size recommendations
    if (this.bundleMetrics.totalSize > 512 * 1024) {
      recommendations.push('Bundle size is large. Consider code splitting and tree shaking to reduce initial payload')
    }

    if (this.bundleMetrics.largestChunk > 200 * 1024) {
      recommendations.push('Large chunks detected. Consider further code splitting to improve loading performance')
    }

    // Device-specific recommendations
    if (this.deviceInfo.hardwareConcurrency <= 2) {
      recommendations.push('Low-end device detected. Consider enabling reduced animations automatically')
    }

    if (this.deviceInfo.connection?.effectiveType === 'slow-2g' || this.deviceInfo.connection?.effectiveType === '2g') {
      recommendations.push('Slow connection detected. Prioritize critical resources and implement aggressive lazy loading')
    }

    return recommendations
  }

  /**
   * Subscribe to performance reports
   */
  subscribe(callback: (report: PerformanceReport) => void) {
    this.subscribers.add(callback)
    return () => this.subscribers.delete(callback)
  }

  /**
   * Get current performance metrics
   */
  getCurrentMetrics(): PerformanceReport | null {
    if (!this.isMonitoring) return null
    return this.generateReport()
  }

  /**
   * Get metrics history
   */
  getMetricsHistory(): PerformanceReport[] {
    return [...this.metricsHistory]
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<PerformanceConfig>) {
    this.config = { ...this.config, ...newConfig }

    // Restart monitoring if currently active
    if (this.isMonitoring) {
      this.stopMonitoring()
      this.startMonitoring()
    }
  }

  /**
   * Get performance insights
   */
  getPerformanceInsights() {
    const current = this.getCurrentMetrics()
    if (!current) return null

    const history = this.getMetricsHistory()
    const recent = history.slice(-10) // Last 10 reports

    return {
      current,
      trends: {
        fps: recent.map(r => r.animation.averageFPS),
        memory: recent.map(r => r.animation.memoryUsage),
        webVitalsScore: recent.map(r => r.webVitals.score),
        overallScore: recent.map(r => r.performanceScore)
      },
      deviceProfile: this.getDeviceProfile(),
      recommendations: current.recommendations
    }
  }

  /**
   * Get device performance profile
   */
  private getDeviceProfile(): 'high' | 'medium' | 'low' {
    const { deviceInfo } = this

    let score = 0

    // CPU score
    if (deviceInfo.hardwareConcurrency >= 8) score += 3
    else if (deviceInfo.hardwareConcurrency >= 4) score += 2
    else score += 1

    // Memory score
    if (deviceInfo.deviceMemory >= 8) score += 3
    else if (deviceInfo.deviceMemory >= 4) score += 2
    else score += 1

    // Connection score
    if (deviceInfo.connection) {
      if (deviceInfo.connection.effectiveType === '4g') score += 3
      else if (deviceInfo.connection.effectiveType === '3g') score += 2
      else score += 1
    }

    if (score >= 7) return 'high'
    if (score >= 5) return 'medium'
    return 'low'
  }

  /**
   * Clear metrics history
   */
  clearHistory() {
    this.metricsHistory = []
  }
}

// Global performance monitor instance
export const globalPerformanceMonitor = new PerformanceMonitor()

/**
 * Initialize performance monitoring for the application
 */
export function initializePerformanceMonitoring(config?: Partial<PerformanceConfig>) {
  const monitor = new PerformanceMonitor(config)

  if (typeof window !== 'undefined') {
    // Start monitoring after page load
    if (document.readyState === 'complete') {
      monitor.startMonitoring()
    } else {
      window.addEventListener('load', () => {
        monitor.startMonitoring()
      })
    }
  }

  return monitor
}

export default PerformanceMonitor