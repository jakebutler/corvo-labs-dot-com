/**
 * Hero Animation Components
 *
 * Sophisticated 3D animation components for the advanced hero section with
 * floating geometric shapes, particle effects, and medical-inspired visual elements.
 */

import React, { useMemo, useRef, useEffect } from 'react'
import { motion, useAnimation, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

// Floating geometric shapes for AI/healthcare theme
interface GeometricShape {
  id: string
  type: 'hexagon' | 'circle' | 'triangle' | 'square' | 'dna-helix' | 'neural-network'
  size: number
  color: string
  position: { x: number; y: number }
  animationDuration: number
  animationDelay: number
  opacity: number
}

export interface FloatingShapesProps {
  count?: number
  className?: string
  colors?: string[]
}

export function FloatingShapes({
  count = 12,
  className = '',
  colors = [
    'rgba(59, 130, 246, 0.1)', // blue
    'rgba(147, 51, 234, 0.1)', // purple
    'rgba(236, 72, 153, 0.1)', // pink
    'rgba(34, 197, 94, 0.1)',  // green
    'rgba(251, 146, 60, 0.1)', // orange
  ]
}: FloatingShapesProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const shapes = useMemo(() => {
    const shapeTypes: GeometricShape['type'][] = [
      'hexagon', 'circle', 'triangle', 'square', 'dna-helix', 'neural-network'
    ]

    return Array.from({ length: count }, (_, i) => ({
      id: `shape-${i}`,
      type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
      size: Math.random() * 40 + 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      position: {
        x: Math.random() * 100,
        y: Math.random() * 100
      },
      animationDuration: Math.random() * 20 + 10,
      animationDelay: Math.random() * 5,
      opacity: Math.random() * 0.3 + 0.1
    }))
  }, [count, colors])

  const renderShape = (shape: GeometricShape) => {
    const baseProps = {
      key: shape.id,
      className: 'absolute',
      style: {
        left: `${shape.position.x}%`,
        top: `${shape.position.y}%`,
        width: `${shape.size}px`,
        height: `${shape.size}px`,
        opacity: shape.opacity,
        fill: shape.color,
        stroke: shape.color.replace('0.1', '0.3'),
        strokeWidth: '1'
      }
    }

    switch (shape.type) {
      case 'circle':
        return (
          <motion.svg
            {...baseProps}
            viewBox="0 0 100 100"
            initial={{ scale: 0, rotate: 0 }}
            animate={inView ? {
              scale: [1, 1.2, 1],
              rotate: [0, 360],
              y: [0, -20, 0]
            } : {}}
            transition={{
              duration: shape.animationDuration,
              delay: shape.animationDelay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <circle cx="50" cy="50" r="40" />
          </motion.svg>
        )

      case 'hexagon':
        return (
          <motion.svg
            {...baseProps}
            viewBox="0 0 100 100"
            initial={{ scale: 0, rotate: 0 }}
            animate={inView ? {
              scale: [1, 1.1, 1],
              rotate: [0, -360],
              x: [0, 15, 0]
            } : {}}
            transition={{
              duration: shape.animationDuration,
              delay: shape.animationDelay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" />
          </motion.svg>
        )

      case 'triangle':
        return (
          <motion.svg
            {...baseProps}
            viewBox="0 0 100 100"
            initial={{ scale: 0, rotate: 0 }}
            animate={inView ? {
              scale: [1, 1.15, 1],
              rotate: [0, 180],
              y: [0, 15, 0]
            } : {}}
            transition={{
              duration: shape.animationDuration,
              delay: shape.animationDelay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <polygon points="50,10 80,80 20,80" />
          </motion.svg>
        )

      case 'square':
        return (
          <motion.svg
            {...baseProps}
            viewBox="0 0 100 100"
            initial={{ scale: 0, rotate: 0 }}
            animate={inView ? {
              scale: [1, 1.2, 1],
              rotate: [0, 90],
              x: [0, -10, 0]
            } : {}}
            transition={{
              duration: shape.animationDuration,
              delay: shape.animationDelay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <rect x="20" y="20" width="60" height="60" rx="8" />
          </motion.svg>
        )

      case 'dna-helix':
        return (
          <motion.svg
            {...baseProps}
            viewBox="0 0 100 100"
            initial={{ scale: 0, rotate: 0 }}
            animate={inView ? {
              scale: [1, 1.1, 1],
              rotate: [0, 360],
              y: [0, -25, 0]
            } : {}}
            transition={{
              duration: shape.animationDuration * 1.5,
              delay: shape.animationDelay,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <path
              d="M30 20 Q50 40 70 20 T30 20"
              fill="none"
              stroke={shape.color.replace('0.1', '0.5')}
              strokeWidth="2"
            />
            <path
              d="M30 80 Q50 60 70 80 T30 80"
              fill="none"
              stroke={shape.color.replace('0.1', '0.5')}
              strokeWidth="2"
            />
            <circle cx="30" cy="20" r="3" fill={shape.color.replace('0.1', '0.7')} />
            <circle cx="70" cy="20" r="3" fill={shape.color.replace('0.1', '0.7')} />
            <circle cx="30" cy="80" r="3" fill={shape.color.replace('0.1', '0.7')} />
            <circle cx="70" cy="80" r="3" fill={shape.color.replace('0.1', '0.7')} />
          </motion.svg>
        )

      case 'neural-network':
        return (
          <motion.svg
            {...baseProps}
            viewBox="0 0 100 100"
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? {
              scale: [1, 1.05, 1],
              opacity: [shape.opacity, shape.opacity * 1.2, shape.opacity]
            } : {}}
            transition={{
              duration: shape.animationDuration,
              delay: shape.animationDelay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Neural nodes */}
            <circle cx="30" cy="30" r="4" fill={shape.color.replace('0.1', '0.6')} />
            <circle cx="70" cy="30" r="4" fill={shape.color.replace('0.1', '0.6')} />
            <circle cx="30" cy="70" r="4" fill={shape.color.replace('0.1', '0.6')} />
            <circle cx="70" cy="70" r="4" fill={shape.color.replace('0.1', '0.6')} />
            <circle cx="50" cy="50" r="5" fill={shape.color.replace('0.1', '0.8')} />

            {/* Connections */}
            <line x1="30" y1="30" x2="50" y2="50" stroke={shape.color.replace('0.1', '0.3')} strokeWidth="1" />
            <line x1="70" y1="30" x2="50" y2="50" stroke={shape.color.replace('0.1', '0.3')} strokeWidth="1" />
            <line x1="30" y1="70" x2="50" y2="50" stroke={shape.color.replace('0.1', '0.3')} strokeWidth="1" />
            <line x1="70" y1="70" x2="50" y2="50" stroke={shape.color.replace('0.1', '0.3')} strokeWidth="1" />
            <line x1="30" y1="30" x2="70" y2="70" stroke={shape.color.replace('0.1', '0.2')} strokeWidth="0.5" />
            <line x1="70" y1="30" x2="30" y2="70" stroke={shape.color.replace('0.1', '0.2')} strokeWidth="0.5" />
          </motion.svg>
        )

      default:
        return null
    }
  }

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {shapes.map(shape => renderShape(shape))}
    </div>
  )
}

// Gradient mesh background component
export function GradientMesh({ className = '' }: { className?: string }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <motion.div
      ref={ref}
      className={`absolute inset-0 opacity-20 ${className}`}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 0.2 } : { opacity: 0 }}
      transition={{ duration: 2 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950" />
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </motion.div>
  )
}

// Pulse wave animation for background
export function PulseWaves({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{
            scale: [0, 2, 3],
            opacity: [0.8, 0.4, 0]
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeOut"
          }}
        >
          <div
            className="rounded-full border border-blue-200 dark:border-blue-800"
            style={{
              width: '300px',
              height: '300px'
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}