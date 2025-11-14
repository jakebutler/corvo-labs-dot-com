/**
 * Advanced Hero Section
 *
 * Sophisticated hero section with 3D transforms, interactive elements, and
 * professional healthcare AI consulting aesthetics. Features mouse tracking,
 * floating geometric shapes, animated counters, and smooth scroll-triggered animations.
 *
 * Key Features:
 * - 3D transform effects with perspective animations
 * - Mouse-tracking parallax effects
 * - Interactive elements with hover states
 * - Animated background with AI-inspired geometric shapes
 * - Text reveal animations with staggered word animation
 * - Interactive stats with animated counters
 * - 60fps performance optimization
 * - Mobile-first responsive design
 * - Accessibility compliance (WCAG AA)
 * - Professional healthcare aesthetics
 */

'use client';

import React, { useEffect, useState, useRef, useMemo } from 'react'
import { motion, useScroll, useTransform, useSpring, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { useHeroInteractions } from '@/hooks/use-hero-interactions'
import { globalPerformanceMonitor } from '@/lib/performance/performance-monitor'
import { HEALTHCARE_ANIMATION_TIMING } from '@/lib/animations/animation-config'

import { FloatingShapes, GradientMesh, PulseWaves } from './hero-animations'
import { InteractiveCTA, StatCounter, FeatureCard, TextReveal } from './interactive-elements'
import { cn } from '@/lib/utils'

// Hero content configuration
const HERO_CONTENT = {
  headline: "Practical AI Consulting for Healthcare & SMBs",
  subhead: "We help teams turn real problems into deployable AI workflows.",
  ctaPrimary: {
    text: "Explore Our Services",
    href: "/services"
  },
  ctaSecondary: {
    text: "View Our Work",
    href: "/projects"
  },
  stats: [
    {
      value: 95,
      suffix: "%",
      label: "Client Satisfaction",
      description: "Healthcare & SMB partners"
    },
    {
      value: 50,
      suffix: "+",
      label: "AI Solutions",
      description: "Successfully deployed"
    },
    {
      value: 15,
      suffix: "+",
      label: "Years Experience",
      description: "Healthcare & AI expertise"
    }
  ],
  features: [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "AI Strategy & Implementation",
      description: "Transform complex challenges into elegant, user-centered AI solutions"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Healthcare Expertise",
      description: "Deep understanding of healthcare workflows and patient-centered design"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Rapid Prototyping",
      description: "Fast iteration from concept to deployable AI workflows"
    }
  ]
}

// Main hero component
export function AdvancedHeroSection() {
  const [isClient, setIsClient] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const performanceRef = useRef<{ startTime: number; metrics: any }>({
    startTime: Date.now(),
    metrics: null
  })

  // Hero interaction hook for mouse tracking and 3D transforms
  const {
    mouseRef,
    containerRef: interactionRef,
    isHovering,
    performanceMetrics,
    rotateX,
    rotateY,
    translateX,
    translateY,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    getParallaxTransform
  } = useHeroInteractions({
    enableParallax: true,
    enable3D: true,
    enableMouseTracking: true,
    parallaxStrength: 0.03,
    rotationStrength: 0.002,
    smoothness: 0.85
  })

  // Scroll-based animations
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50])

  // Spring animations for smooth movement
  const springOpacity = useSpring(heroOpacity, { stiffness: 300, damping: 30 })
  const springScale = useSpring(heroScale, { stiffness: 300, damping: 30 })
  const springY = useSpring(heroY, { stiffness: 300, damping: 30 })

  // InView observer for content animations
  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '-50px 0px'
  })

  // Performance monitoring
  useEffect(() => {
    setIsClient(true)

    if (typeof window !== 'undefined') {
      // Start performance monitoring
      const monitor = globalPerformanceMonitor.startMonitoring('hero-section')

      performanceRef.current = {
        startTime: Date.now(),
        metrics: monitor
      }

      // Log performance metrics
      const logPerformance = () => {
        const loadTime = Date.now() - performanceRef.current.startTime
        console.log(`Hero Section loaded in ${loadTime}ms with ${performanceMetrics.fps} FPS`)

        if (monitor) {
          monitor.end()
        }
      }

      // Delay logging to allow animations to complete
      const timer = setTimeout(logPerformance, 3000)

      return () => {
        clearTimeout(timer)
        if (monitor) {
          monitor.end()
        }
      }
    }
  }, [performanceMetrics.fps])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: HEALTHCARE_ANIMATION_TIMING.confident.duration,
        ease: HEALTHCARE_ANIMATION_TIMING.confident.ease,
        staggerChildren: 0.2
      }
    }
  }

  const headlineVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
      filter: 'blur(10px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: HEALTHCARE_ANIMATION_TIMING.gentle.duration,
        ease: HEALTHCARE_ANIMATION_TIMING.gentle.ease
      }
    }
  }

  const subheadVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(8px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: HEALTHCARE_ANIMATION_TIMING.gentle.duration,
        ease: HEALTHCARE_ANIMATION_TIMING.gentle.ease,
        delay: 0.3
      }
    }
  }

  const ctaVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: HEALTHCARE_ANIMATION_TIMING.medical.duration,
        ease: HEALTHCARE_ANIMATION_TIMING.medical.ease,
        delay: 0.6
      }
    }
  }

  const statsVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: HEALTHCARE_ANIMATION_TIMING.precision.duration,
        ease: HEALTHCARE_ANIMATION_TIMING.precision.ease,
        delay: 0.9
      }
    }
  }

  // Don't render until client-side hydration
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
      style={{ perspective: '1000px' }}
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <GradientMesh className="opacity-30" />
        <FloatingShapes count={15} className="opacity-60" />
        <PulseWaves className="opacity-20" />
      </div>

      {/* Interactive overlay for mouse tracking */}
      <div
        ref={mouseRef}
        className="absolute inset-0 z-10"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />

      {/* Main content */}
      <motion.div
        ref={(node) => {
          containerRef.current = node
          interactionRef.current = node
          contentRef(node)
        }}
        className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl"
        style={{
          opacity: springOpacity.get(),
          scale: springScale.get(),
          y: springY.get(),
          transform: `rotateX(${rotateX.get()}deg) rotateY(${rotateY.get()}deg)`
        }}
        variants={containerVariants}
        initial="hidden"
        animate={contentInView ? 'visible' : 'hidden'}
      >
        <div className="text-center space-y-8 lg:space-y-12">
          {/* Headline with text reveal */}
          <motion.div
            className="space-y-4"
            variants={headlineVariants}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
              <span className="block text-foreground mb-2">
                <TextReveal
                  text="Practical AI Consulting"
                  staggerDelay={0.05}
                  animationDelay={0.2}
                />
              </span>
              <span className="block text-primary">
                <TextReveal
                  text="for Healthcare & SMBs"
                  staggerDelay={0.05}
                  animationDelay={0.4}
                />
              </span>
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.div
            variants={subheadVariants}
            className="max-w-3xl mx-auto"
          >
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
              <TextReveal
                text="We help teams turn real problems into deployable AI workflows."
                staggerDelay={0.03}
                animationDelay={0.6}
              />
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={ctaVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <InteractiveCTA
              href={HERO_CONTENT.ctaPrimary.href}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            >
              {HERO_CONTENT.ctaPrimary.text}
            </InteractiveCTA>
            <InteractiveCTA
              href={HERO_CONTENT.ctaSecondary.href}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              {HERO_CONTENT.ctaSecondary.text}
            </InteractiveCTA>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            variants={statsVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 lg:mt-20"
          >
            {HERO_CONTENT.stats.map((stat, index) => (
              <StatCounter
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                duration={2}
                label={stat.label}
                description={stat.description}
                className="backdrop-blur-md bg-card/40 border-border/30"
              />
            ))}
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            variants={statsVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 lg:mt-16"
          >
            {HERO_CONTENT.features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
                className="backdrop-blur-md bg-card/40 border-border/30"
              />
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Performance indicator (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute bottom-4 left-4 z-30 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm p-2 rounded">
          FPS: {performanceMetrics.fps} | {performanceMetrics.isOptimal ? '✓' : '⚠'}
        </div>
      )}

      {/* Accessibility: Skip to main content link */}
      <a
        href="#main-content"
        className="absolute top-4 left-4 z-30 sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md"
      >
        Skip to main content
      </a>
    </section>
  )
}

export default AdvancedHeroSection