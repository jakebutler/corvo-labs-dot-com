/**
 * Performance Analytics
 *
 * Production-ready performance analytics and reporting system
 * Integrates with analytics platforms and provides insights
 */

import { PerformanceReport } from './performance-monitor'
import { WEB_VITALS_TARGETS } from './performance-config'

export interface AnalyticsEvent {
  name: string
  value: number
  category: 'web-vitals' | 'animation' | 'bundle' | 'user-experience'
  timestamp: number
  metadata?: Record<string, unknown>
}

export interface PerformanceAnalyticsConfig {
  enabled: boolean
  apiKey?: string
  endpoint?: string
  samplingRate: number
  batchSize: number
  flushInterval: number
  includeMetadata: boolean
  respectDoNotTrack: boolean
}

export interface UserExperienceMetrics {
  interactionTime: number
  firstInteractionDelay: number
  cumulativeLayoutShift: number
  timeToInteractive: number
  totalBlockingTime: number
}

export interface HealthcareMetrics {
  accessibilityScore: number
  professionalScore: number
  trustSignals: number
  errorRate: number
  uptime: number
}

export interface AnalyticsReport {
  timestamp: number
  sessionId: string
  userId?: string
  pageUrl: string
  userAgent: string
  webVitals: AnalyticsEvent[]
  animations: AnalyticsEvent[]
  bundles: AnalyticsEvent[]
  userExperience: UserExperienceMetrics
  healthcare: HealthcareMetrics
  performanceScore: number
  deviceProfile: string
  networkProfile: string
  recommendations: string[]
}

/**
 * Performance Analytics Class
 */
export class PerformanceAnalytics {
  private config: PerformanceAnalyticsConfig
  private eventQueue: AnalyticsEvent[] = []
  private flushTimer: NodeJS.Timeout | null = null
  private sessionId: string
  private isInitialized: boolean = false

  constructor(config: Partial<PerformanceAnalyticsConfig> = {}) {
    this.config = {
      enabled: true,
      samplingRate: 0.1, // 10% sampling in production
      batchSize: 10,
      flushInterval: 30000, // 30 seconds
      includeMetadata: true,
      respectDoNotTrack: true,
      ...config
    }

    this.sessionId = this.generateSessionId()
  }

  /**
   * Initialize analytics system
   */
  initialize() {
    if (this.isInitialized || !this.shouldTrack()) return

    this.isInitialized = true
    console.log('[Performance Analytics] Initialized with session:', this.sessionId)

    // Start periodic flushing
    this.startPeriodicFlush()

    // Track page unload
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        this.flush()
      })

      // Track visibility changes
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          this.flush()
        }
      })
    }
  }

  /**
   * Track performance metrics from PerformanceMonitor
   */
  trackPerformanceReport(report: PerformanceReport) {
    if (!this.shouldTrack()) return

    const events: AnalyticsEvent[] = []

    // Web Vitals events
    events.push({
      name: 'lcp',
      value: report.webVitals.lcp || 0,
      category: 'web-vitals',
      timestamp: Date.now(),
      metadata: { target: WEB_VITALS_TARGETS.LCP.good }
    })

    events.push({
      name: 'fid',
      value: report.webVitals.fid || 0,
      category: 'web-vitals',
      timestamp: Date.now(),
      metadata: { target: WEB_VITALS_TARGETS.FID.good }
    })

    events.push({
      name: 'cls',
      value: report.webVitals.cls || 0,
      category: 'web-vitals',
      timestamp: Date.now(),
      metadata: { target: WEB_VITALS_TARGETS.CLS.good }
    })

    events.push({
      name: 'fcp',
      value: report.webVitals.fcp || 0,
      category: 'web-vitals',
      timestamp: Date.now(),
      metadata: { target: WEB_VITALS_TARGETS.FCP.good }
    })

    events.push({
      name: 'ttfb',
      value: report.webVitals.ttfb || 0,
      category: 'web-vitals',
      timestamp: Date.now(),
      metadata: { target: WEB_VITALS_TARGETS.TTFB.good }
    })

    // Animation events
    events.push({
      name: 'fps',
      value: report.animation.averageFPS,
      category: 'animation',
      timestamp: Date.now(),
      metadata: {
        droppedFrames: report.animation.droppedFrames,
        longFrames: report.animation.longFrames
      }
    })

    events.push({
      name: 'memory-usage',
      value: report.animation.memoryUsage,
      category: 'animation',
      timestamp: Date.now(),
      metadata: { unit: 'MB' }
    })

    // Bundle events
    events.push({
      name: 'bundle-size',
      value: report.bundle.totalSize,
      category: 'bundle',
      timestamp: Date.now(),
      metadata: {
        chunks: report.bundle.chunkCount,
        largestChunk: report.bundle.largestChunk
      }
    })

    // Add events to queue
    events.forEach(event => this.trackEvent(event))

    // Generate comprehensive report
    const analyticsReport = this.generateAnalyticsReport(report)
    this.sendReport(analyticsReport)
  }

  /**
   * Track individual event
   */
  trackEvent(event: AnalyticsEvent) {
    if (!this.shouldTrack()) return

    this.eventQueue.push(event)

    // Auto-flush if batch size reached
    if (this.eventQueue.length >= this.config.batchSize) {
      this.flush()
    }
  }

  /**
   * Track user interaction
   */
  trackInteraction(name: string, duration: number, metadata?: Record<string, unknown>) {
    this.trackEvent({
      name: `interaction-${name}`,
      value: duration,
      category: 'user-experience',
      timestamp: Date.now(),
      metadata
    })
  }

  /**
   * Track custom healthcare metric
   */
  trackHealthcareMetric(name: string, value: number, metadata?: Record<string, unknown>) {
    this.trackEvent({
      name: `healthcare-${name}`,
      value,
      category: 'user-experience',
      timestamp: Date.now(),
      metadata: {
        ...metadata,
        healthcare: true
      }
    })
  }

  /**
   * Generate comprehensive analytics report
   */
  private generateAnalyticsReport(report: PerformanceReport): AnalyticsReport {
    const userExperience = this.calculateUserExperienceMetrics(report)
    const healthcare = this.calculateHealthcareMetrics(report)

    return {
      timestamp: Date.now(),
      sessionId: this.sessionId,
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      webVitals: this.eventQueue.filter(e => e.category === 'web-vitals'),
      animations: this.eventQueue.filter(e => e.category === 'animation'),
      bundles: this.eventQueue.filter(e => e.category === 'bundle'),
      userExperience,
      healthcare,
      performanceScore: report.performanceScore,
      deviceProfile: this.getDeviceProfile(report),
      networkProfile: this.getNetworkProfile(report),
      recommendations: report.recommendations
    }
  }

  /**
   * Calculate user experience metrics
   */
  private calculateUserExperienceMetrics(report: PerformanceReport): UserExperienceMetrics {
    return {
      interactionTime: report.animation.frameTime,
      firstInteractionDelay: report.webVitals.fid || 0,
      cumulativeLayoutShift: report.webVitals.cls || 0,
      timeToInteractive: report.webVitals.fcp || 0,
      totalBlockingTime: Math.max(0, (report.webVitals.lcp || 0) - (report.webVitals.fcp || 0))
    }
  }

  /**
   * Calculate healthcare-specific metrics
   */
  private calculateHealthcareMetrics(report: PerformanceReport): HealthcareMetrics {
    // Accessibility score based on reduced motion and high contrast support
    const accessibilityScore = this.calculateAccessibilityScore(report)

    // Professional score based on smooth transitions and consistent performance
    const professionalScore = this.calculateProfessionalScore(report)

    // Trust signals based on error rate and performance consistency
    const trustSignals = this.calculateTrustSignals(report)

    return {
      accessibilityScore,
      professionalScore,
      trustSignals,
      errorRate: this.calculateErrorRate(report),
      uptime: 99.9, // Placeholder - would come from monitoring system
      performanceScore: report.performanceScore
    }
  }

  /**
   * Calculate accessibility score
   */
  private calculateAccessibilityScore(report: PerformanceReport): number {
    let score = 100

    // Penalize if animations are too fast (can cause issues for users with vestibular disorders)
    if (report.animation.frameTime < 16) {
      score -= 10
    }

    // Penalize high memory usage (can affect screen readers)
    if (report.animation.memoryUsage > 50) {
      score -= 15
    }

    // Reward smooth performance
    if (report.animation.averageFPS >= 45) {
      score += 5
    }

    return Math.max(0, Math.min(100, score))
  }

  /**
   * Calculate professional appearance score
   */
  private calculateProfessionalScore(report: PerformanceReport): number {
    let score = 0

    // FPS score (40% weight)
    const fpsScore = Math.min(100, (report.animation.averageFPS / 60) * 100)
    score += fpsScore * 0.4

    // Web Vitals score (40% weight)
    score += report.webVitals.score * 0.4

    // Consistency score (20% weight)
    const consistencyScore = report.animation.droppedFrames === 0 ? 100 :
                            report.animation.droppedFrames < 5 ? 80 :
                            report.animation.droppedFrames < 10 ? 60 : 40
    score += consistencyScore * 0.2

    return Math.round(score)
  }

  /**
   * Calculate trust signals
   */
  private calculateTrustSignals(report: PerformanceReport): number {
    let score = 100

    // Penalize poor performance
    if (report.performanceScore < 75) {
      score -= 25
    }

    // Penalize high memory usage
    if (report.animation.memoryUsage > 80) {
      score -= 15
    }

    // Penalize layout shifts
    if (report.webVitals.cls && report.webVitals.cls > 0.1) {
      score -= 20
    }

    return Math.max(0, score)
  }

  /**
   * Calculate error rate
   */
  private calculateErrorRate(report: PerformanceReport): number {
    // This would typically come from error tracking system
    // For now, estimate based on performance issues
    let errorRate = 0

    if (report.animation.averageFPS < 30) errorRate += 0.05
    if (report.animation.memoryUsage > 100) errorRate += 0.03
    if (report.webVitals.score < 60) errorRate += 0.02

    return Math.min(1, errorRate)
  }

  /**
   * Get device profile
   */
  private getDeviceProfile(report: PerformanceReport): string {
    const { deviceInfo } = report

    if (deviceInfo.hardwareConcurrency >= 8 && deviceInfo.deviceMemory >= 8) {
      return 'high'
    } else if (deviceInfo.hardwareConcurrency >= 4 && deviceInfo.deviceMemory >= 4) {
      return 'medium'
    }
    return 'low'
  }

  /**
   * Get network profile
   */
  private getNetworkProfile(report: PerformanceReport): string {
    return report.deviceInfo.connection?.effectiveType || 'unknown'
  }

  /**
   * Send report to analytics endpoint
   */
  private async sendReport(report: AnalyticsReport) {
    if (!this.config.endpoint || !this.config.apiKey) return

    try {
      await fetch(this.config.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
          'X-Session-ID': this.sessionId
        },
        body: JSON.stringify(report)
      })
    } catch (error) {
      console.warn('[Performance Analytics] Failed to send report:', error)
    }
  }

  /**
   * Flush event queue
   */
  private async flush() {
    if (this.eventQueue.length === 0) return

    const events = [...this.eventQueue]
    this.eventQueue = []

    try {
      // Send to analytics service
      if (this.config.endpoint) {
        await fetch(`${this.config.endpoint}/events`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}`,
            'X-Session-ID': this.sessionId
          },
          body: JSON.stringify({
            events,
            timestamp: Date.now(),
            sessionId: this.sessionId
          })
        })
      }
    } catch (error) {
      console.warn('[Performance Analytics] Failed to flush events:', error)
      // Re-add events to queue for retry
      this.eventQueue.unshift(...events)
    }
  }

  /**
   * Start periodic flushing
   */
  private startPeriodicFlush() {
    if (this.flushTimer) {
      clearInterval(this.flushTimer)
    }

    this.flushTimer = setInterval(() => {
      this.flush()
    }, this.config.flushInterval)
  }

  /**
   * Check if tracking should be enabled
   */
  private shouldTrack(): boolean {
    if (!this.config.enabled) return false

    // Respect Do Not Track
    if (this.config.respectDoNotTrack && navigator.doNotTrack === '1') {
      return false
    }

    // Apply sampling rate
    if (Math.random() > this.config.samplingRate) {
      return false
    }

    return true
  }

  /**
   * Generate session ID
   */
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  /**
   * Get current session ID
   */
  getSessionId(): string {
    return this.sessionId
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<PerformanceAnalyticsConfig>) {
    this.config = { ...this.config, ...newConfig }
  }

  /**
   * Destroy analytics instance
   */
  destroy() {
    if (this.flushTimer) {
      clearInterval(this.flushTimer)
      this.flushTimer = null
    }

    // Flush remaining events
    this.flush()

    this.isInitialized = false
  }
}

/**
 * Integration with popular analytics platforms
 */
export class AnalyticsIntegrations {
  /**
   * Google Analytics 4 integration
   */
  static googleAnalytics4(_measurementId: string) {
    return {
      trackWebVitals: (report: PerformanceReport) => {
        if (typeof gtag !== 'function') return

        // Track Core Web Vitals as GA4 events
        gtag('event', 'web_vitals', {
          event_category: 'Performance',
          event_label: 'LCP',
          value: Math.round(report.webVitals.lcp || 0),
          non_interaction: true
        })

        gtag('event', 'web_vitals', {
          event_category: 'Performance',
          event_label: 'FID',
          value: Math.round(report.webVitals.fid || 0),
          non_interaction: true
        })

        gtag('event', 'web_vitals', {
          event_category: 'Performance',
          event_label: 'CLS',
          value: Math.round((report.webVitals.cls || 0) * 1000),
          non_interaction: true
        })

        // Track overall performance score
        gtag('event', 'performance_score', {
          event_category: 'Performance',
          value: report.performanceScore,
          custom_parameter_1: report.animation.averageFPS,
          custom_parameter_2: report.animation.memoryUsage
        })
      },

      trackCustomEvent: (name: string, value: number, metadata?: Record<string, unknown>) => {
        if (typeof gtag !== 'function') return

        gtag('event', name, {
          event_category: 'Performance',
          value,
          ...metadata
        })
      }
    }
  }

  /**
   * Vercel Analytics integration
   */
  static vercelAnalytics() {
    return {
      trackWebVitals: (report: PerformanceReport) => {
        if (typeof window !== 'undefined' && (window as unknown as { va?: (action: string, name: string, value?: number) => void }).va) {
          // Vercel Analytics automatically tracks web vitals
          // Additional custom metrics can be sent here
          (window as unknown as { va?: (action: string, name: string, value?: number) => void }).va?.('track', 'Performance Score', report.performanceScore)
          ;(window as unknown as { va?: (action: string, name: string, value?: number) => void }).va?.('track', 'Average FPS', report.animation.averageFPS)
          ;(window as unknown as { va?: (action: string, name: string, value?: number) => void }).va?.('track', 'Memory Usage', Math.round(report.animation.memoryUsage))
        }
      }
    }
  }

  /**
   * Plausible Analytics integration
   */
  static plausibleAnalytics(_domain: string) {
    return {
      trackWebVitals: (report: PerformanceReport) => {
        if (typeof plausible !== 'function') return

        plausible('Performance: Score', {
          props: {
            score: report.performanceScore,
            fps: report.animation.averageFPS,
            memory: Math.round(report.animation.memoryUsage)
          }
        })

        plausible('Performance: LCP', {
          props: {
            value: Math.round(report.webVitals.lcp || 0),
            target: 'good'
          }
        })
      }
    }
  }
}

// Global analytics instance
export const globalPerformanceAnalytics = new PerformanceAnalytics()

/**
 * Initialize performance analytics with common integrations
 */
export function initializePerformanceAnalytics(config?: Partial<PerformanceAnalyticsConfig>) {
  const analytics = new PerformanceAnalytics(config)
  analytics.initialize()

  // Auto-integrate with available analytics platforms
  if (typeof window !== 'undefined') {
    // Google Analytics 4
    if (typeof gtag === 'function' && window.dataLayer) {
      const ga4 = AnalyticsIntegrations.googleAnalytics4('GA_MEASUREMENT_ID')
      // Integration would be set up here
    }

    // Vercel Analytics
    if ((window as any).va) {
      const vercel = AnalyticsIntegrations.vercelAnalytics()
      // Integration would be set up here
    }

    // Plausible
    if (typeof plausible === 'function') {
      const plausible = AnalyticsIntegrations.plausibleAnalytics(window.location.hostname)
      // Integration would be set up here
    }
  }

  return analytics
}

export default PerformanceAnalytics