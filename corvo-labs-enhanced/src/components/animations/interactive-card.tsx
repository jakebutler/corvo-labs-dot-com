'use client'

import React, { useState, useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

interface InteractiveCardProps {
  children: React.ReactNode
  className?: string
  intensity?: number
  glare?: boolean
  float?: boolean
  scaleOnHover?: boolean
}

export function InteractiveCard({
  children,
  className,
  intensity = 0.15,
  glare = true,
  float = false,
  scaleOnHover = true
}: InteractiveCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [intensity, -intensity])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-intensity, intensity])

  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const centerX = rect.left + width / 2
    const centerY = rect.top + height / 2

    const x = (e.clientX - centerX) / width
    const y = (e.clientY - centerY) / height

    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative rounded-2xl bg-white shadow-lg border border-primary-100 overflow-hidden",
        "transition-all duration-300 ease-out",
        className
      )}
      style={{
        transformStyle: "preserve-3d",
        rotateX: springRotateX,
        rotateY: springRotateY,
        scale: scaleOnHover && isHovered ? 1.02 : 1
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={float ? { y: [0, -10, 0] } : {}}
      transition={float ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : {}}
    >
      {/* Glare effect */}
      {glare && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: isHovered
              ? "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)"
              : "transparent"
          }}
          style={{
            opacity: isHovered ? 0.7 : 0,
            mixBlendMode: "overlay"
          }}
        />
      )}

      {/* Shadow that responds to tilt */}
      <motion.div
        className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-4/5 h-8 bg-black/10 rounded-full blur-xl"
        style={{
          scale: scaleOnHover && isHovered ? 1.1 : 1,
          transform: `translateX(-50%) translateZ(-100px) rotateX(${-springRotateX.get() * 2}deg) rotateY(${-springRotateY.get() * 2}deg)`
        }}
      />

      {children}
    </motion.div>
  )
}

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  features?: string[]
  className?: string
}

export function ServiceCard({
  icon,
  title,
  description,
  features,
  className
}: ServiceCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className={cn("relative h-80", className)}>
      <InteractiveCard className="w-full h-full">
        <motion.div
          className="w-full h-full relative"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front */}
          <motion.div
            className="absolute inset-0 p-6 flex flex-col justify-between"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div>
              <div className="w-12 h-12 bg-ai-blue/10 text-ai-blue rounded-lg flex items-center justify-center mb-4">
                {icon}
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-3">{title}</h3>
              <p className="text-primary-600 mb-6">{description}</p>
            </div>

            {features && (
              <motion.button
                onClick={() => setIsFlipped(true)}
                className="text-ai-blue font-medium text-sm hover:text-ai-cyan transition-colors"
                whileHover={{ x: 5 }}
              >
                View Features →
              </motion.button>
            )}
          </motion.div>

          {/* Back */}
          {features && (
            <motion.div
              className="absolute inset-0 p-6 bg-gradient-to-br from-ai-blue to-ai-cyan text-white"
              style={{
                backfaceVisibility: "hidden",
                rotateY: 180
              }}
            >
              <h3 className="text-xl font-semibold mb-4">Key Features</h3>
              <ul className="space-y-2 mb-6">
                {features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.button
                onClick={() => setIsFlipped(false)}
                className="text-white/80 text-sm hover:text-white transition-colors"
                whileHover={{ x: -5 }}
              >
                ← Back to overview
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </InteractiveCard>
    </div>
  )
}