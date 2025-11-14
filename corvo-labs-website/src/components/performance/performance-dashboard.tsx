/**
 * Performance Dashboard Component
 *
 * Development-only performance monitoring dashboard
 * Provides real-time visualization of performance metrics
 * Professional healthcare aesthetics with clean, modern design
 */

'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Activity,
  AlertCircle,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  Monitor,
  Zap,
  Package,
  Eye,
  BarChart3,
  Settings,
  X,
  ChevronDown,
  ChevronUp,
  Clock,
  Cpu,
  Wifi,
  Smartphone
} from 'lucide-react'
import { usePerformanceMonitoring, useWebVitals, usePerformanceAlerts, usePerformanceHistory } from '@/hooks/use-performance-monitoring'

interface PerformanceDashboardProps {
  enabled?: boolean
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  compact?: boolean
}

export function PerformanceDashboard({
  enabled = true,
  position = 'top-right',
  compact = false
}: PerformanceDashboardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'web-vitals' | 'animations' | 'history'>('overview')

  const {
    metrics,
    insights,
    getPerformanceScore,
    getViewportOptimizations,
    monitor
  } = usePerformanceMonitoring({
    developmentMode: true,
    reportInterval: 2000 // Faster updates in development
  })

  const { getWebVitalsScore } = useWebVitals()
  const { alerts, hasCriticalAlerts, hasWarnings, clearAlerts } = usePerformanceAlerts()
  const { getTrends, getAverages } = usePerformanceHistory()

  // Don't render if not enabled or in production
  if (!enabled || process.env.NODE_ENV === 'production') {
    return null
  }

  const performanceScore = getPerformanceScore()
  const viewportOptimizations = getViewportOptimizations()
  const webVitalsScore = getWebVitalsScore()
  const trends = getTrends()
  const averages = getAverages()

  // Position classes
  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4'
  }

  // Format bytes to human readable
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // Format time
  const formatTime = (ms: number) => {
    if (ms < 1000) return `${ms.toFixed(0)}ms`
    return `${(ms / 1000).toFixed(2)}s`
  }

  // Get status color
  const getStatusColor = (score: number) => {
    if (score >= 90) return 'text-green-500'
    if (score >= 75) return 'text-blue-500'
    if (score >= 60) return 'text-yellow-500'
    return 'text-red-500'
  }

  // Get trend icon
  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <TrendingUp className="w-4 h-4 text-green-500" />
    if (trend < 0) return <TrendingDown className="w-4 h-4 text-red-500" />
    return <div className="w-4 h-4" />
  }

  // Compact view
  if (compact) {
    return (
      <div className={`fixed ${positionClasses[position]} z-50 bg-white/95 backdrop-blur-md border border-gray-200 rounded-lg shadow-lg p-3 min-w-[200px]`}>
        <div className="flex items-center justify-between space-x-3">
          <div className="flex items-center space-x-2">
            <Activity className={`w-4 h-4 ${performanceScore.color}`} />
            <span className={`text-sm font-medium ${performanceScore.color}`}>
              {performanceScore.score}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            {hasCriticalAlerts && (
              <XCircle className="w-4 h-4 text-red-500" />
            )}
            {hasWarnings && !hasCriticalAlerts && (
              <AlertCircle className="w-4 h-4 text-yellow-500" />
            )}
            {!hasCriticalAlerts && !hasWarnings && (
              <CheckCircle className="w-4 h-4 text-green-500" />
            )}
            <span className="text-xs text-gray-500">
              {metrics?.animation.averageFPS || 0} FPS
            </span>
          </div>
        </div>
      </div>
    )
  }

  // Expanded view
  return (
    <div className={`fixed ${positionClasses[position]} z-50 bg-white/95 backdrop-blur-md border border-gray-200 rounded-lg shadow-xl max-w-md`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <Monitor className="w-5 h-5 text-blue-600" />
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Performance Monitor</h3>
            <p className="text-xs text-gray-500">
              {performanceScore.label} • {performanceScore.score}/100
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {hasCriticalAlerts && (
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          )}
          {hasWarnings && !hasCriticalAlerts && (
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          <button
            onClick={() => monitor?.stopMonitoring()}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'web-vitals', label: 'Web Vitals', icon: Eye },
                { id: 'animations', label: 'Animations', icon: Zap },
                { id: 'history', label: 'History', icon: Clock }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as any)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 text-xs font-medium transition-colors ${
                    activeTab === id
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-4 max-h-96 overflow-y-auto">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  {/* Alerts */}
                  {alerts.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-900">Alerts</h4>
                      {alerts.map((alert, index) => (
                        <div
                          key={index}
                          className={`flex items-center space-x-2 p-2 rounded ${
                            alert.type === 'critical'
                              ? 'bg-red-50 text-red-700'
                              : 'bg-yellow-50 text-yellow-700'
                          }`}
                        >
                          {alert.type === 'critical' ? (
                            <XCircle className="w-4 h-4 flex-shrink-0" />
                          ) : (
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          )}
                          <span className="text-xs">{alert.message}</span>
                        </div>
                      ))}
                      {alerts.length > 0 && (
                        <button
                          onClick={clearAlerts}
                          className="text-xs text-blue-600 hover:text-blue-700"
                        >
                          Clear alerts
                        </button>
                      )}
                    </div>
                  )}

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 rounded p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        <span className="text-xs font-medium text-gray-600">FPS</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-lg font-bold text-gray-900">
                          {metrics?.animation.averageFPS || 0}
                        </span>
                        {trends && (
                          <div className="flex items-center space-x-1">
                            {getTrendIcon(trends.fps.trend)}
                            <span className="text-xs text-gray-500">
                              {Math.abs(trends.fps.trend).toFixed(0)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <Cpu className="w-4 h-4 text-blue-500" />
                        <span className="text-xs font-medium text-gray-600">Memory</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-lg font-bold text-gray-900">
                          {metrics?.animation.memoryUsage.toFixed(1) || 0}MB
                        </span>
                        {trends && (
                          <div className="flex items-center space-x-1">
                            {getTrendIcon(trends.memory.trend)}
                            <span className="text-xs text-gray-500">
                              {Math.abs(trends.memory.trend).toFixed(1)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Device Info */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-900">Device Profile</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center space-x-1">
                        <Smartphone className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-600">
                          {viewportOptimizations.isMobile ? 'Mobile' :
                           viewportOptimizations.isTablet ? 'Tablet' : 'Desktop'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Wifi className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-600">
                          {metrics?.deviceInfo.connection?.effectiveType || 'Unknown'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Web Vitals Tab */}
              {activeTab === 'web-vitals' && webVitalsScore && (
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-gray-900">Core Web Vitals</h4>

                  {Object.entries(webVitalsScore).map(([key, metric]: [string, any]) => {
                    if (key === 'overall') return null

                    return (
                      <div key={key} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-600 uppercase">
                            {key}
                          </span>
                          <span className={`text-xs font-medium ${
                            metric.status === 'good' ? 'text-green-600' :
                            metric.status === 'needs-improvement' ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            {metric.status}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${
                                metric.status === 'good' ? 'bg-green-500' :
                                metric.status === 'needs-improvement' ? 'bg-yellow-500' :
                                'bg-red-500'
                              }`}
                              style={{ width: `${metric.score}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-600 min-w-[60px] text-right">
                            {metric.value ? formatTime(metric.value) : 'N/A'}
                          </span>
                        </div>
                      </div>
                    )
                  })}

                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-900">Overall Score</span>
                      <span className={`text-sm font-bold ${getStatusColor(webVitalsScore.overall.score)}`}>
                        {webVitalsScore.overall.score}/100
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Animations Tab */}
              {activeTab === 'animations' && metrics && (
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-gray-900">Animation Performance</h4>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 rounded p-3">
                      <div className="text-xs text-gray-600 mb-1">Current FPS</div>
                      <div className="text-xl font-bold text-gray-900">
                        {metrics.animation.currentFPS}
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded p-3">
                      <div className="text-xs text-gray-600 mb-1">Avg Frame Time</div>
                      <div className="text-xl font-bold text-gray-900">
                        {metrics.animation.frameTime.toFixed(1)}ms
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded p-3">
                      <div className="text-xs text-gray-600 mb-1">Dropped Frames</div>
                      <div className="text-xl font-bold text-gray-900">
                        {metrics.animation.droppedFrames}
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded p-3">
                      <div className="text-xs text-gray-600 mb-1">Long Frames</div>
                      <div className="text-xl font-bold text-gray-900">
                        {metrics.animation.longFrames}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h5 className="text-xs font-semibold text-gray-700">Performance Recommendations</h5>
                    {metrics.recommendations.map((rec, index) => (
                      <div key={index} className="text-xs text-gray-600 bg-blue-50 border border-blue-200 rounded p-2">
                        • {rec}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* History Tab */}
              {activeTab === 'history' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-gray-900">Performance History</h4>

                  {averages && (
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-50 rounded p-3">
                        <div className="text-xs text-gray-600 mb-1">Avg FPS</div>
                        <div className="text-lg font-bold text-gray-900">
                          {averages.fps}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded p-3">
                        <div className="text-xs text-gray-600 mb-1">Avg Memory</div>
                        <div className="text-lg font-bold text-gray-900">
                          {averages.memory.toFixed(1)}MB
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded p-3">
                        <div className="text-xs text-gray-600 mb-1">Avg Web Vitals</div>
                        <div className="text-lg font-bold text-gray-900">
                          {averages.webVitals}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded p-3">
                        <div className="text-xs text-gray-600 mb-1">Avg Overall</div>
                        <div className="text-lg font-bold text-gray-900">
                          {averages.overall}
                        </div>
                      </div>
                    </div>
                  )}

                  {trends && (
                    <div className="space-y-2">
                      <h5 className="text-xs font-semibold text-gray-700">Performance Trends</h5>
                      <div className="space-y-1">
                        {[
                          { label: 'FPS', data: trends.fps },
                          { label: 'Memory', data: trends.memory },
                          { label: 'Web Vitals', data: trends.webVitals },
                          { label: 'Overall', data: trends.overall }
                        ].map(({ label, data }) => (
                          <div key={label} className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">{label}</span>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-gray-900">{data.current}</span>
                              {getTrendIcon(data.trend)}
                              <span className={`text-${
                                data.direction === 'improving' ? 'green' : 'red'
                              }-500`}>
                                {data.direction}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PerformanceDashboard