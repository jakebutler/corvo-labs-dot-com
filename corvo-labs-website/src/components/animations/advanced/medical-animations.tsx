/**
 * Medical-Themed Animation Components
 *
 * Specialized animation components designed for healthcare AI consulting website,
 * featuring medical metaphors, professional aesthetics, and accessibility compliance.
 */

"use client"

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence, useAnimation, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useScrollAnimation, useViewportAnimation, useAnimationState } from '../../../lib/animations/animation-hooks'
import { useAnimationAccessibility } from '../../../lib/animations/accessibility-utils'
import { globalAnimationConfig, HEALTHCARE_COLORS, HEALTHCARE_ANIMATION_TIMING } from '../../../lib/animations/animation-config'
import { globalPerformanceMonitor } from '../../../lib/animations/performance-utils'

// ============================================================================
// 1. HEARTBEAT ANIMATION COMPONENT
// ============================================================================

interface HeartbeatAnimationProps {
  size?: number
  color?: string
  duration?: number
  active?: boolean
  className?: string
  showLabel?: boolean
  label?: string
}

export function HeartbeatAnimation({
  size = 60,
  color = HEALTHCARE_COLORS.error.red,
  duration = 1.5,
  active = true,
  className = '',
  showLabel = false,
  label = 'Vital Signs'
}: HeartbeatAnimationProps) {
  const [isBeating, setIsBeating] = useState(active)
  const { shouldReduceAnimation, getAccessibleDuration } = useAnimationAccessibility()
  const animationState = useAnimationState('heartbeat')

  useEffect(() => {
    setIsBeating(active)
  }, [active])

  const accessibleDuration = getAccessibleDuration(duration)

  const heartbeatPath = "M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5 C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3 C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z"

  if (shouldReduceAnimation()) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={color}
        >
          <path d={heartbeatPath} />
        </svg>
        {showLabel && <span className="text-sm font-medium">{label}</span>}
      </div>
    )
  }

  return (
    <motion.div
      className={`flex items-center space-x-2 ${className}`}
      initial="resting"
      animate={isBeating ? "beating" : "resting"}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        variants={{
          resting: { scale: 1 },
          beating: {
            scale: [1, 1.2, 1, 1.2, 1],
            transition: {
              duration: accessibleDuration,
              ease: "easeInOut",
              repeat: isBeating ? Infinity : 0,
              repeatDelay: 2
            }
          }
        }}
      >
        <path d={heartbeatPath} />
      </motion.svg>
      {showLabel && (
        <motion.span
          className="text-sm font-medium"
          animate={{
            opacity: isBeating ? [1, 0.7, 1] : 1
          }}
          transition={{
            duration: accessibleDuration,
            repeat: isBeating ? Infinity : 0,
            repeatDelay: 2
          }}
        >
          {label}
        </motion.span>
      )}
    </motion.div>
  )
}

// ============================================================================
// 2. DNA HELIX ANIMATION COMPONENT
// ============================================================================

interface DNAHelixProps {
  size?: number
  color?: string
  duration?: number
  className?: string
  animated?: boolean
  label?: string
}

export function DNAHelix({
  size = 100,
  color = HEALTHCARE_COLORS.primary.blue,
  duration = 4,
  className = '',
  animated = true,
  label = 'AI Genome'
}: DNAHelixProps) {
  const { shouldReduceAnimation, getAccessibleDuration } = useAnimationAccessibility()
  const helixRef = useRef<SVGSVGElement>(null)
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    if (!animated || shouldReduceAnimation()) return

    const interval = setInterval(() => {
      setRotation(prev => (prev + 2) % 360)
    }, 50)

    return () => clearInterval(interval)
  }, [animated, shouldReduceAnimation])

  const generateHelixPath = useCallback((offset: number) => {
    const points = []
    for (let i = 0; i <= 20; i++) {
      const t = i / 20
      const x = 50 + Math.sin(t * Math.PI * 2 + offset) * 30
      const y = t * 100
      points.push(`${x},${y}`)
    }
    return `M ${points.join(' L ')}`
  }, [])

  if (shouldReduceAnimation()) {
    return (
      <div className={`flex flex-col items-center ${className}`}>
        <svg width={size} height={size} viewBox="0 0 100 100">
          <path d={generateHelixPath(0)} stroke={color} strokeWidth="2" fill="none" />
          <path d={generateHelixPath(Math.PI)} stroke={color} strokeWidth="2" fill="none" />
        </svg>
        {label && <span className="text-xs mt-2">{label}</span>}
      </div>
    )
  }

  return (
    <motion.div
      className={`flex flex-col items-center ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: getAccessibleDuration(0.6) }}
    >
      <svg
        ref={helixRef}
        width={size}
        height={size}
        viewBox="0 0 100 100"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <motion.path
          d={generateHelixPath(0)}
          stroke={color}
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: getAccessibleDuration(duration) }}
        />
        <motion.path
          d={generateHelixPath(Math.PI)}
          stroke={color}
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: getAccessibleDuration(duration), delay: 0.5 }}
        />

        {/* Base pairs */}
        {[0, 0.2, 0.4, 0.6, 0.8].map((t, i) => {
          const x1 = 50 + Math.sin(t * Math.PI * 2) * 30
          const y1 = t * 100
          const x2 = 50 + Math.sin(t * Math.PI * 2 + Math.PI) * 30
          const y2 = t * 100

          return (
            <motion.line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={color}
              strokeWidth="1"
              opacity={0.3}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            />
          )
        })}
      </svg>
      {label && (
        <motion.span
          className="text-xs mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: getAccessibleDuration(duration) }}
        >
          {label}
        </motion.span>
      )}
    </motion.div>
  )
}

// ============================================================================
// 3. MEDICAL SCANNER ANIMATION
// ============================================================================

interface MedicalScannerProps {
  width?: number
  height?: number
  scanDuration?: number
  active?: boolean
  className?: string
  onComplete?: () => void
}

export function MedicalScanner({
  width = 300,
  height = 200,
  scanDuration = 2,
  active = true,
  className = '',
  onComplete
}: MedicalScannerProps) {
  const [isScanning, setIsScanning] = useState(active)
  const [scanProgress, setScanProgress] = useState(0)
  const { shouldReduceAnimation, getAccessibleDuration } = useAnimationAccessibility()

  useEffect(() => {
    if (!active || shouldReduceAnimation()) {
      setScanProgress(0)
      return
    }

    setIsScanning(true)
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          setIsScanning(false)
          onComplete?.()
          return 0
        }
        return prev + 2
      })
    }, (getAccessibleDuration(scanDuration) * 1000) / 50)

    return () => clearInterval(interval)
  }, [active, scanDuration, onComplete, shouldReduceAnimation, getAccessibleDuration])

  if (shouldReduceAnimation()) {
    return (
      <div className={`border-2 border-blue-500 rounded-lg ${className}`} style={{ width, height }}>
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-blue-500 font-medium">Analysis Complete</span>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      className={`relative border-2 border-blue-500 rounded-lg overflow-hidden ${className}`}
      style={{ width, height }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Scan lines */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="scanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={HEALTHCARE_COLORS.primary.blue} stopOpacity="0" />
            <stop offset="50%" stopColor={HEALTHCARE_COLORS.primary.blue} stopOpacity="0.8" />
            <stop offset="100%" stopColor={HEALTHCARE_COLORS.primary.blue} stopOpacity="0" />
          </linearGradient>
        </defs>

        {isScanning && (
          <motion.rect
            x="0"
            y="0"
            width={width}
            height="20"
            fill="url(#scanGradient)"
            animate={{
              y: [0, height - 20]
            }}
            transition={{
              duration: getAccessibleDuration(scanDuration),
              repeat: Infinity,
              ease: "linear"
            }}
          />
        )}
      </svg>

      {/* Content area */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: isScanning ? 0.3 : 1 }}
          transition={{ duration: 0.5 }}
        >
          {isScanning ? (
            <div>
              <div className="text-blue-500 font-medium mb-2">Scanning...</div>
              <div className="w-48 bg-gray-200 rounded-full h-2 mx-auto">
                <motion.div
                  className="bg-blue-500 h-2 rounded-full"
                  animate={{ width: `${scanProgress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>
          ) : (
            <div className="text-green-500 font-medium">Analysis Complete</div>
          )}
        </motion.div>
      </div>

      {/* Corner indicators */}
      {[0, 1, 2, 3].map((corner) => {
        const isTop = corner < 2
        const isLeft = corner % 2 === 0

        return (
          <motion.div
            key={corner}
            className="absolute w-4 h-4 border-2 border-blue-500"
            style={{
              top: isTop ? 0 : 'auto',
              bottom: !isTop ? 0 : 'auto',
              left: isLeft ? 0 : 'auto',
              right: !isLeft ? 0 : 'auto',
              borderLeft: isLeft ? '2px solid' : 'none',
              borderRight: !isLeft ? '2px solid' : 'none',
              borderTop: isTop ? '2px solid' : 'none',
              borderBottom: !isTop ? '2px solid' : 'none'
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: corner * 0.1 }}
          />
        )
      })}
    </motion.div>
  )
}

// ============================================================================
// 4. NEURAL NETWORK ANIMATION
// ============================================================================

interface NeuralNetworkProps {
  nodeCount?: number
  size?: number
  color?: string
  animated?: boolean
  className?: string
}

interface Node {
  id: string
  x: number
  y: number
  layer: number
}

export function NeuralNetwork({
  nodeCount = 12,
  size = 400,
  color = HEALTHCARE_COLORS.accent.purple,
  animated = true,
  className = ''
}: NeuralNetworkProps) {
  const { shouldReduceAnimation, getAccessibleDuration } = useAnimationAccessibility()
  const [nodes, setNodes] = useState<Node[]>([])
  const [connections, setConnections] = useState<{ from: string; to: string }[]>([])

  useEffect(() => {
    // Generate nodes in layers
    const layers = [3, 4, 3, 2] // Input, hidden1, hidden2, output
    const newNodes: Node[] = []
    const newConnections: { from: string; to: string }[] = []

    layers.forEach((count, layerIndex) => {
      for (let i = 0; i < count; i++) {
        const node: Node = {
          id: `node-${layerIndex}-${i}`,
          x: (layerIndex + 1) * (size / (layers.length + 1)),
          y: ((i + 1) * size) / (count + 1),
          layer: layerIndex
        }
        newNodes.push(node)

        // Create connections to next layer
        if (layerIndex < layers.length - 1) {
          for (let j = 0; j < layers[layerIndex + 1]; j++) {
            newConnections.push({
              from: node.id,
              to: `node-${layerIndex + 1}-${j}`
            })
          }
        }
      }
    })

    setNodes(newNodes)
    setConnections(newConnections)
  }, [size])

  if (shouldReduceAnimation()) {
    return (
      <svg width={size} height={size} className={className}>
        {/* Connections */}
        {connections.map((conn, i) => {
          const fromNode = nodes.find(n => n.id === conn.from)
          const toNode = nodes.find(n => n.id === conn.to)
          if (!fromNode || !toNode) return null

          return (
            <line
              key={i}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke={color}
              strokeWidth="1"
              opacity="0.3"
            />
          )
        })}

        {/* Nodes */}
        {nodes.map(node => (
          <circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r="6"
            fill={color}
            opacity="0.8"
          />
        ))}
      </svg>
    )
  }

  return (
    <motion.svg
      width={size}
      height={size}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: getAccessibleDuration(0.6) }}
    >
      {/* Connections */}
      {connections.map((conn, i) => {
        const fromNode = nodes.find(n => n.id === conn.from)
        const toNode = nodes.find(n => n.id === conn.to)
        if (!fromNode || !toNode) return null

        return (
          <motion.line
            key={i}
            x1={fromNode.x}
            y1={fromNode.y}
            x2={toNode.x}
            y2={toNode.y}
            stroke={color}
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: animated ? [0, 1] : 1,
              opacity: [0, 0.3]
            }}
            transition={{
              duration: getAccessibleDuration(1),
              delay: i * 0.02
            }}
          />
        )
      })}

      {/* Nodes */}
      {nodes.map((node, i) => (
        <motion.g key={node.id}>
          <motion.circle
            cx={node.x}
            cy={node.y}
            r="6"
            fill={color}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: animated ? [0, 1.2, 1] : 1,
              opacity: 0.8
            }}
            transition={{
              duration: getAccessibleDuration(0.5),
              delay: i * 0.1
            }}
          />
          {animated && (
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="6"
              fill="none"
              stroke={color}
              strokeWidth="2"
              opacity="0.5"
              animate={{ r: [6, 12, 6] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          )}
        </motion.g>
      ))}
    </motion.svg>
  )
}

// ============================================================================
// 5. MEDICAL DATA VISUALIZATION
// ============================================================================

interface MedicalDataVisualizationProps {
  data: number[]
  labels?: string[]
  width?: number
  height?: number
  color?: string
  animated?: boolean
  className?: string
  title?: string
}

export function MedicalDataVisualization({
  data,
  labels,
  width = 400,
  height = 200,
  color = HEALTHCARE_COLORS.primary.blue,
  animated = true,
  className = '',
  title = 'Vital Metrics'
}: MedicalDataVisualizationProps) {
  const { shouldReduceAnimation, getAccessibleDuration } = useAnimationAccessibility()
  const { animationProps, inView } = useScrollAnimation({
    duration: getAccessibleDuration(0.8),
    delay: 0.2
  })

  const maxValue = Math.max(...data)
  const barWidth = width / data.length * 0.8
  const gap = width / data.length * 0.2

  return (
    <motion.div
      className={`bg-white p-6 rounded-lg shadow-lg ${className}`}
      {...animationProps}
    >
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
      )}

      <svg width={width} height={height} className="overflow-visible">
        {/* Y-axis */}
        <line
          x1="0"
          y1="0"
          x2="0"
          y2={height}
          stroke="#E5E7EB"
          strokeWidth="2"
        />

        {/* X-axis */}
        <line
          x1="0"
          y1={height}
          x2={width}
          y2={height}
          stroke="#E5E7EB"
          strokeWidth="2"
        />

        {/* Data bars */}
        {data.map((value, index) => {
          const barHeight = (value / maxValue) * (height - 20)
          const x = index * (barWidth + gap) + gap / 2
          const y = height - barHeight

          return (
            <g key={index}>
              <motion.rect
                x={x}
                y={shouldReduceAnimation() ? y : height}
                width={barWidth}
                height={shouldReduceAnimation() ? barHeight : 0}
                fill={color}
                rx="4"
                animate={
                  shouldReduceAnimation() || !animated
                    ? {}
                    : { y, height: barHeight }
                }
                transition={{
                  duration: getAccessibleDuration(0.6),
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
              />

              {/* Value label */}
              <motion.text
                x={x + barWidth / 2}
                y={y - 5}
                textAnchor="middle"
                fontSize="12"
                fill="#374151"
                initial={{ opacity: 0 }}
                animate={{ opacity: inView ? 1 : 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {value}
              </motion.text>

              {/* X-axis label */}
              {labels && labels[index] && (
                <text
                  x={x + barWidth / 2}
                  y={height + 15}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#6B7280"
                >
                  {labels[index]}
                </text>
              )}
            </g>
          )
        })}
      </svg>
    </motion.div>
  )
}

// ============================================================================
// 6. MEDICAL PULSE WAVE ANIMATION
// ============================================================================

interface MedicalPulseWaveProps {
  width?: number
  height?: number
  color?: string
  duration?: number
  animated?: boolean
  className?: string
}

export function MedicalPulseWave({
  width = 600,
  height = 150,
  color = HEALTHCARE_COLORS.error.red,
  duration = 3,
  animated = true,
  className = ''
}: MedicalPulseWaveProps) {
  const { shouldReduceAnimation, getAccessibleDuration } = useAnimationAccessibility()
  const pathRef = useRef<SVGPathElement>(null)

  const generatePulsePath = useCallback((offset: number) => {
    let path = `M 0 ${height / 2}`

    for (let x = 0; x <= width; x += 5) {
      const normalizedX = x / width
      const baseY = height / 2

      // Create ECG-like pattern
      let y = baseY
      const phase = (normalizedX * Math.PI * 4) + offset

      if (Math.sin(phase) > 0.8) {
        y = baseY - Math.sin(phase) * 30 // Peak
      } else if (Math.sin(phase) < -0.8) {
        y = baseY + Math.sin(phase) * 10 // Small dip
      }

      path += ` L ${x} ${y}`
    }

    return path
  }, [width, height])

  const [currentPath, setCurrentPath] = useState(generatePulsePath(0))

  useEffect(() => {
    if (!animated || shouldReduceAnimation()) return

    const interval = setInterval(() => {
      setCurrentPath(generatePulsePath(Date.now() / 1000))
    }, 50)

    return () => clearInterval(interval)
  }, [animated, shouldReduceAnimation, generatePulsePath])

  if (shouldReduceAnimation()) {
    return (
      <svg width={width} height={height} className={className}>
        <path
          d={generatePulsePath(0)}
          stroke={color}
          strokeWidth="2"
          fill="none"
        />
      </svg>
    )
  }

  return (
    <motion.svg
      width={width}
      height={height}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: getAccessibleDuration(0.5) }}
    >
      <defs>
        <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="50%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* Background pulse */}
      <path
        d={currentPath}
        stroke="url(#pulseGradient)"
        strokeWidth="4"
        fill="none"
        opacity="0.3"
      />

      {/* Main pulse line */}
      <motion.path
        d={currentPath}
        stroke={color}
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: getAccessibleDuration(duration),
          repeat: animated ? Infinity : 0,
          ease: "linear"
        }}
      />

      {/* Scanning dot */}
      {animated && (
        <motion.circle
          r="4"
          fill={color}
          animate={{
            cx: [0, width]
          }}
          transition={{
            duration: getAccessibleDuration(duration),
            repeat: Infinity,
            ease: "linear"
          }}
        />
      )}
    </motion.svg>
  )
}