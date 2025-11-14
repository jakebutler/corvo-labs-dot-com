/**
 * Animation Performance Utilities
 *
 * Performance monitoring and optimization utilities for maintaining 60fps animations
 * with intelligent adaptive quality based on device capabilities and performance metrics.
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import { useWindowSize } from 'react-use'

// Performance monitoring types
export interface PerformanceMetrics {
  fps: number
  frameTime: number
  memoryUsage: number
  droppedFrames: number
  averageFrameTime: number
  longFrames: number
}

export interface PerformanceThresholds {
  targetFPS: number
  minimumFPS: number
  criticalFPS: number
  maxMemoryMB: number
  maxLongFrames: number
}

export interface PerformanceConfig {
  enableMonitoring: boolean
  adaptiveQuality: boolean
  maxSamples: number
  sampleInterval: number
  thresholds: PerformanceThresholds
}

// Default configuration optimized for healthcare professional audience
export const DEFAULT_PERFORMANCE_CONFIG: PerformanceConfig = {
  enableMonitoring: true,
  adaptiveQuality: true,
  maxSamples: 60,
  sampleInterval: 1000, // 1 second
  thresholds: {
    targetFPS: 60,
    minimumFPS: 30,
    criticalFPS: 20,
    maxMemoryMB: 100,
    maxLongFrames: 5
  }
}

/**
 * Advanced Performance Monitor
 */
export class AdvancedPerformanceMonitor {
  private config: PerformanceConfig
  private frameTimeHistory: number[] = []
  private lastFrameTime: number = 0
  private frameCount: number = 0
  private droppedFrames: number = 0
  private longFrames: number = 0
  private rafId: number | null = null
  private isMonitoring: boolean = false
  private subscribers: Set<(metrics: PerformanceMetrics) => void> = new Set()
  private intervalId: NodeJS.Timeout | null = null

  constructor(config: Partial<PerformanceConfig> = {}) {
    this.config = { ...DEFAULT_PERFORMANCE_CONFIG, ...config }
  }

  startMonitoring() {
    if (this.isMonitoring || !this.config.enableMonitoring) return

    this.isMonitoring = true
    this.frameCount = 0
    this.frameTimeHistory = []
    this.droppedFrames = 0
    this.longFrames = 0

    // Start RAF monitoring
    this.lastFrameTime = performance.now()
    this.measureFrame()

    // Start periodic reporting
    if (this.config.maxSamples > 0) {
      this.intervalId = setInterval(() => {
        this.reportMetrics()
      }, this.config.sampleInterval)
    }
  }

  stopMonitoring() {
    this.isMonitoring = false
    if (this.rafId) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }

  private measureFrame = () => {
    if (!this.isMonitoring) return

    const currentTime = performance.now()
    const frameTime = currentTime - this.lastFrameTime

    this.frameCount++
    this.frameTimeHistory.push(frameTime)

    // Track dropped frames (>16.67ms for 60fps)
    if (frameTime > 16.67) {
      this.droppedFrames++
    }

    // Track long frames (>33.33ms for 30fps)
    if (frameTime > 33.33) {
      this.longFrames++
    }

    // Keep history within limits
    if (this.frameTimeHistory.length > this.config.maxSamples) {
      this.frameTimeHistory.shift()
    }

    this.lastFrameTime = currentTime
    this.rafId = requestAnimationFrame(this.measureFrame)
  }

  private reportMetrics() {
    if (this.frameTimeHistory.length === 0) return

    const averageFrameTime = this.frameTimeHistory.reduce((a, b) => a + b, 0) / this.frameTimeHistory.length
    const fps = Math.round(1000 / averageFrameTime)
    const memoryUsage = (performance as any).memory?.usedJSHeapSize || 0

    const metrics: PerformanceMetrics = {
      fps,
      frameTime: averageFrameTime,
      memoryUsage,
      droppedFrames: this.droppedFrames,
      averageFrameTime,
      longFrames: this.longFrames
    }

    this.subscribers.forEach(callback => callback(metrics))

    // Auto-adjust quality if enabled
    if (this.config.adaptiveQuality) {
      this.adjustQuality(metrics)
    }
  }

  private adjustQuality(metrics: PerformanceMetrics) {
    const { thresholds } = this.config

    if (metrics.fps < thresholds.criticalFPS) {
      // Critical performance - switch to low quality
      this.notifyQualityChange('low')
    } else if (metrics.fps < thresholds.minimumFPS) {
      // Below minimum - switch to medium quality
      this.notifyQualityChange('medium')
    } else if (metrics.fps >= thresholds.targetFPS && metrics.longFrames <= thresholds.maxLongFrames) {
      // Good performance - can use high quality
      this.notifyQualityChange('high')
    }
  }

  private notifyQualityChange(quality: 'low' | 'medium' | 'high') {
    // Dispatch custom event for quality changes
    window.dispatchEvent(new CustomEvent('animationQualityChange', {
      detail: { quality, metrics: this.getCurrentMetrics() }
    }))
  }

  getCurrentMetrics(): PerformanceMetrics | null {
    if (this.frameTimeHistory.length === 0) return null

    const averageFrameTime = this.frameTimeHistory.reduce((a, b) => a + b, 0) / this.frameTimeHistory.length
    const fps = Math.round(1000 / averageFrameTime)
    const memoryUsage = (performance as any).memory?.usedJSHeapSize || 0

    return {
      fps,
      frameTime: averageFrameTime,
      memoryUsage,
      droppedFrames: this.droppedFrames,
      averageFrameTime,
      longFrames: this.longFrames
    }
  }

  subscribe(callback: (metrics: PerformanceMetrics) => void) {
    this.subscribers.add(callback)
    return () => this.subscribers.delete(callback)
  }

  updateConfig(newConfig: Partial<PerformanceConfig>) {
    this.config = { ...this.config, ...newConfig }
  }
}

// Global performance monitor instance
export const globalPerformanceMonitor = new AdvancedPerformanceMonitor()

/**
 * Performance-aware animation hook
 */
export function usePerformanceAnimation() {
  const [quality, setQuality] = useState<'low' | 'medium' | 'high'>('high')
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const { width } = useWindowSize()

  useEffect(() => {
    // Start monitoring on mount
    globalPerformanceMonitor.startMonitoring()

    // Subscribe to quality changes
    const handleQualityChange = (event: CustomEvent) => {
      setQuality(event.detail.quality)
    }

    // Subscribe to metrics updates
    const unsubscribeMetrics = globalPerformanceMonitor.subscribe((newMetrics) => {
      setMetrics(newMetrics)
    })

    window.addEventListener('animationQualityChange', handleQualityChange as EventListener)

    return () => {
      globalPerformanceMonitor.stopMonitoring()
      window.removeEventListener('animationQualityChange', handleQualityChange as EventListener)
      unsubscribeMetrics()
    }
  }, [])

  // Responsive quality adjustments
  const getAdjustedQuality = useCallback(() => {
    if (width < 768) {
      // Mobile devices - prioritize performance
      return quality === 'high' ? 'medium' : quality
    }
    return quality
  }, [quality, width])

  // Performance-aware animation properties
  const getAnimationProps = useCallback(() => {
    const adjustedQuality = getAdjustedQuality()

    switch (adjustedQuality) {
      case 'low':
        return {
          duration: 0.15,
          ease: 'linear' as const,
          disabled: true
        }
      case 'medium':
        return {
          duration: 0.3,
          ease: 'easeOut' as const,
          disabled: false
        }
      default:
        return {
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94] as const,
          disabled: false
        }
    }
  }, [getAdjustedQuality])

  return {
    quality,
    metrics,
    getAnimationProps,
    getAdjustedQuality,
    shouldReduceMotion: quality === 'low'
  }
}

/**
 * Frame rate limiter utility
 */
export class FrameRateLimiter {
  private lastExecution: number = 0
  private interval: number
  private rafId: number | null = null

  constructor(fps: number = 60) {
    this.interval = 1000 / fps
  }

  throttle<T extends any[]>(callback: (...args: T) => void) {
    return (...args: T) => {
      const now = performance.now()

      if (now - this.lastExecution >= this.interval) {
        this.lastExecution = now
        callback(...args)
      } else if (!this.rafId) {
        this.rafId = requestAnimationFrame(() => {
          this.lastExecution = performance.now()
          callback(...args)
          this.rafId = null
        })
      }
    }
  }

  updateFPS(fps: number) {
    this.interval = 1000 / fps
  }

  cancel() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
  }
}

/**
 * Animation queue manager for batching animations
 */
export class AnimationQueue {
  private queue: Array<() => void> = []
  private isProcessing: boolean = false
  private batchSize: number
  private batchDelay: number

  constructor(batchSize: number = 5, batchDelay: number = 16) {
    this.batchSize = batchSize
    this.batchDelay = batchDelay
  }

  add(animation: () => void) {
    this.queue.push(animation)
    this.processQueue()
  }

  private processQueue = () => {
    if (this.isProcessing || this.queue.length === 0) return

    this.isProcessing = true
    const batch = this.queue.splice(0, this.batchSize)

    // Process batch in next frame
    requestAnimationFrame(() => {
      batch.forEach(animation => animation())

      setTimeout(() => {
        this.isProcessing = false
        this.processQueue()
      }, this.batchDelay)
    })
  }

  clear() {
    this.queue = []
  }

  getLength() {
    return this.queue.length
  }
}

// Global animation queue
export const globalAnimationQueue = new AnimationQueue()

/**
 * Memory usage tracker for animations
 */
export class AnimationMemoryTracker {
  private animations: Map<string, { size: number; createdAt: number }> = new Map()
  private maxMemoryMB: number

  constructor(maxMemoryMB: number = 50) {
    this.maxMemoryMB = maxMemoryMB * 1024 * 1024
  }

  register(id: string, estimatedSizeKB: number = 100) {
    this.animations.set(id, {
      size: estimatedSizeKB * 1024,
      createdAt: Date.now()
    })

    this.checkMemoryUsage()
  }

  unregister(id: string) {
    this.animations.delete(id)
  }

  private checkMemoryUsage() {
    const totalSize = Array.from(this.animations.values()).reduce((sum, anim) => sum + anim.size, 0)

    if (totalSize > this.maxMemoryMB) {
      // Clean up oldest animations
      const sorted = Array.from(this.animations.entries())
        .sort(([, a], [, b]) => a.createdAt - b.createdAt)

      const toRemove = Math.ceil(sorted.length * 0.3) // Remove 30% oldest

      for (let i = 0; i < toRemove; i++) {
        this.animations.delete(sorted[i][0])
      }

      console.warn(`Animation memory cleanup performed. Removed ${toRemove} animations.`)
    }
  }

  getStats() {
    const animations = Array.from(this.animations.values())
    const totalSize = animations.reduce((sum, anim) => sum + anim.size, 0)

    return {
      count: this.animations.size,
      totalSizeBytes: totalSize,
      totalSizeMB: totalSize / (1024 * 1024),
      averageSize: animations.length > 0 ? totalSize / animations.length : 0
    }
  }
}

// Global memory tracker
export const globalMemoryTracker = new AnimationMemoryTracker()

/**
 * Utility functions for performance optimization
 */
export const performanceUtils = {
  /**
   * Check if device should use reduced animations
   */
  shouldUseReducedAnimations(): boolean {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return true
    }

    // Check for low-end devices
    const navigator = window.navigator as any
    const hardwareConcurrency = navigator.hardwareConcurrency || 4
    const deviceMemory = navigator.deviceMemory || 4

    return hardwareConcurrency <= 2 || deviceMemory <= 2
  },

  /**
   * Get device performance tier
   */
  getDevicePerformanceTier(): 'low' | 'medium' | 'high' {
    const navigator = window.navigator as any
    const hardwareConcurrency = navigator.hardwareConcurrency || 4
    const deviceMemory = navigator.deviceMemory || 4

    if (hardwareConcurrency >= 8 && deviceMemory >= 8) {
      return 'high'
    } else if (hardwareConcurrency >= 4 && deviceMemory >= 4) {
      return 'medium'
    }
    return 'low'
  },

  /**
   * Throttle function for performance
   */
  throttle<T extends any[]>(func: (...args: T) => void, limit: number) {
    let inThrottle: boolean
    return function(this: any, ...args: T) {
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }
  },

  /**
   * Debounce function for performance
   */
  debounce<T extends any[]>(func: (...args: T) => void, delay: number) {
    let timeoutId: NodeJS.Timeout
    return function(this: any, ...args: T) {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func.apply(this, args), delay)
    }
  },

  /**
   * Request idle callback for non-critical animations
   */
  requestIdleCallback(callback: () => void, timeout?: number) {
    if ('requestIdleCallback' in window) {
      return (window as any).requestIdleCallback(callback, { timeout })
    } else {
      // Fallback for browsers without requestIdleCallback
      return setTimeout(callback, timeout || 1)
    }
  },

  /**
   * Cancel idle callback
   */
  cancelIdleCallback(handle: number) {
    if ('cancelIdleCallback' in window) {
      (window as any).cancelIdleCallback(handle)
    } else {
      clearTimeout(handle)
    }
  }
}