'use client'

import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useTime } from 'framer-motion'
import { ArrowRight, Play, Sparkles, Zap, Shield, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FloatingElement {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

interface MetricCard {
  icon: React.ReactNode
  value: string
  label: string
  description: string
}

const metrics: MetricCard[] = [
  {
    icon: "/images/01.png",
    value: "94%",
    label: "Client ROI",
    description: "Average return on investment"
  },
  {
    icon: "/images/02.png",
    value: "60%",
    label: "Time Saved",
    description: "Workflow automation impact"
  },
  {
    icon: "/images/03.png",
    value: "100%",
    label: "HIPAA Compliant",
    description: "Healthcare security standards"
  }
]

export function EnhancedHero() {
  const { scrollY } = useScroll()
  const time = useTime()

  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([])
  const [imagesLoaded, setImagesLoaded] = useState<{ [key: string]: boolean }>({})

  // Track image loading
  const handleImageLoad = (imageName: string) => {
    setImagesLoaded(prev => ({ ...prev, [imageName]: true }))
    console.log(`${imageName} loaded successfully`)
  }

  const handleImageError = (imageName: string, error: any) => {
    console.error(`${imageName} failed to load:`, error)
    setImagesLoaded(prev => ({ ...prev, [imageName]: false }))
  }

  // Parallax effects
  const heroY = useTransform(scrollY, [0, 500], [0, 150])
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.8])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])

  // Floating animation values
  const floatY = useSpring(useTransform(time, t => Math.sin(t / 1000) * 10))
  const floatX = useSpring(useTransform(time, t => Math.cos(t / 1500) * 10))

  // Staggered animation delays
  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: i * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  }

  const metricVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.8 + i * 0.15,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  }

  useEffect(() => {
    // Generate random floating elements
    const elements: FloatingElement[] = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 40 + 20,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5
    }))
    setFloatingElements(elements)
  }, [])

  return (
    <motion.section
      style={{
        y: heroY,
        scale: heroScale,
        opacity: heroOpacity,
        transformOrigin: 'center center'
      }}
      className="enhanced-hero relative min-h-screen flex items-center justify-center overflow-hidden bg-white"
    >
      {/* Debug Panel - Development Only */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-4 right-4 z-50 bg-black/80 text-white p-4 rounded-lg text-xs font-mono">
          <div className="space-y-1">
            <div>Crow Image: {imagesLoaded['crow'] === true ? '✅ Loaded' : imagesLoaded['crow'] === false ? '❌ Failed' : '⏳ Loading...'}</div>
            <div>Logo Image: {imagesLoaded['logo'] === true ? '✅ Loaded' : imagesLoaded['logo'] === false ? '❌ Failed' : '⏳ Loading...'}</div>
          </div>
        </div>
      )}
      {/* Clean Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle Grid Pattern */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(229, 231, 235, 0.5)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between lg:space-x-16 space-y-12 lg:space-y-0">
            {/* Left: Crow Image */}
            <motion.div
              custom={0}
              variants={titleVariants}
              initial="hidden"
              animate="visible"
              className="hero-image flex-shrink-0 lg:w-1/2 flex justify-center lg:justify-start relative"
            >
              <motion.img
                src="/images/crow-hero-no-bg.png"
                alt="Corvo Labs Crow"
                className="h-48 md:h-64 lg:h-80 w-auto max-w-full object-contain z-20 relative block"
                style={{
                  filter: 'drop-shadow(0 20px 25px rgb(0 0 0 / 0.1))',
                  opacity: imagesLoaded['crow'] !== false ? 1 : 0,
                  transition: 'opacity 0.3s ease-in-out'
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                onError={(e) => handleImageError('crow', e)}
                onLoad={() => handleImageLoad('crow')}
              />
            </motion.div>

            {/* Right: Stacked Logo and Content */}
            <div className="lg:w-1/2 text-center lg:text-left space-y-4">
              {/* Stacked Logo */}
              <motion.div
                custom={1}
                variants={titleVariants}
                initial="hidden"
                animate="visible"
                className="hero-image flex justify-center lg:justify-start relative"
              >
                <motion.img
                  src="/images/corvo-labs-stacked.svg"
                  alt="Corvo Labs"
                  className="h-24 md:h-32 lg:h-40 w-auto max-w-full object-contain z-20 relative block"
                  style={{
                    filter: 'drop-shadow(0 10px 15px rgb(0 0 0 / 0.1))',
                    opacity: imagesLoaded['logo'] !== false ? 1 : 0,
                    transition: 'opacity 0.3s ease-in-out'
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  onError={(e) => handleImageError('logo', e)}
                  onLoad={() => handleImageLoad('logo')}
                />
              </motion.div>

              {/* Hero Description */}
              <motion.div
                custom={2}
                variants={titleVariants}
                initial="hidden"
                animate="visible"
                className="max-w-lg"
              >
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  Tailored solutions that solve real problems and deliver measurable results.
                  Empowering healthcare teams with responsible automation and intelligent workflows.
                </p>
              </motion.div>

              {/* Hero CTA Buttons */}
              <motion.div
                custom={3}
                variants={titleVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <motion.button
                  className="px-8 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent-600 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>

                <motion.button
                  className="px-8 py-3 bg-white text-gray-900 rounded-lg font-semibold border border-gray-200 hover:border-gray-300 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}