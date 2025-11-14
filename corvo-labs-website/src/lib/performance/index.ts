/**
 * Performance Monitoring System
 *
 * Comprehensive performance monitoring for Corvo Labs Website 2.0
 * Exports all performance monitoring components and utilities
 */

// Core monitoring system
export {
  PerformanceMonitor,
  initializePerformanceMonitoring,
  globalPerformanceMonitor,
  type PerformanceReport,
  type CoreWebVitals,
  type AnimationMetrics,
  type BundleMetrics,
  type DeviceInfo,
  type PerformanceThresholds,
  type PerformanceConfig
} from './performance-monitor'

// React hooks
export {
  usePerformanceMonitoring,
  useAnimationPerformance,
  useComponentPerformance,
  useBundlePerformance,
  useWebVitals,
  usePerformanceAlerts,
  usePerformanceHistory
} from '../../hooks/use-performance-monitoring'

// Configuration
export {
  PERFORMANCE_THRESHOLDS,
  BUNDLE_BUDGETS,
  DEVICE_OPTIMIZATIONS,
  NETWORK_PROFILES,
  ANIMATION_CONFIG,
  WEB_VITALS_TARGETS,
  HEALTHCARE_REQUIREMENTS,
  HEALTHCARE_MONITORING_CONFIG,
  getEnvironmentConfig,
  detectDeviceCapabilities,
  getDeviceProfile,
  getNetworkProfile,
  getOptimizationSettings,
  validatePerformanceBudget
} from './performance-config'

// Analytics
export {
  PerformanceAnalytics,
  AnalyticsIntegrations,
  initializePerformanceAnalytics,
  globalPerformanceAnalytics,
  type AnalyticsEvent,
  type AnalyticsReport,
  type UserExperienceMetrics,
  type HealthcareMetrics
} from './performance-analytics'

// Utilities for easy integration
export * from './performance-utils'

// Default exports
export { default as PerformanceMonitorClass } from './performance-monitor'
export { default as PerformanceAnalyticsClass } from './performance-analytics'