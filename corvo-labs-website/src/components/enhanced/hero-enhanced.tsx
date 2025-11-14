"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  TextReveal,
  AnimatedCounter,
  FloatingElement,
  useParallax
} from '@/components/animations/animation-primitives'

export function HeroEnhanced() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded] = useState(false)
  const parallaxOffset = useParallax(0.3)

  // Hero words for animation
  const heroWords = ["Practical", "AI", "Consulting"]

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window

      setMousePosition({
        x: (clientX - innerWidth / 2) / innerWidth,
        y: (clientY - innerHeight / 2) / innerHeight
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [heroWords.length])

  // Hero animation variants
  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const floatingIcons = [
    { icon: "🤖", x: -20, y: -10, delay: 0 },
    { icon: "⚡", x: 20, y: -15, delay: 0.5 },
    { icon: "🧠", x: -15, y: 15, delay: 1 },
    { icon: "💡", x: 25, y: 10, delay: 1.5 },
    { icon: "🔬", x: -25, y: -20, delay: 2 },
    { icon: "🏥", x: 15, y: 20, delay: 2.5 }
  ]

  return (
    <section
      className="relative w-full min-h-screen pt-24 md:pt-32 pb-20 bg-gradient-to-br from-slate-50 to-white overflow-hidden"
      role="region"
      aria-label="Enhanced hero section"
    >
      {/* Background Animated Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Background Icons */}
        {floatingIcons.map((item, index) => (
          <FloatingElement
            key={index}
            duration={4 + index * 0.5}
            intensity={item.y}
            delay={item.delay}
            className="absolute text-4xl opacity-10"
            style={{
              left: `${50 + item.x}%`,
              top: `${30 + item.y}%`,
            }}
          >
            {item.icon}
          </FloatingElement>
        ))}

        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: mousePosition.x * 50,
            y: mousePosition.y * 50,
            scale: [1, 1.1, 1],
          }}
          transition={{
            x: { type: "spring", stiffness: 100, damping: 30 },
            y: { type: "spring", stiffness: 100, damping: 30 },
            scale: { duration: 4, repeat: Infinity }
          }}
        />

        <motion.div
          className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: mousePosition.x * -30,
            y: mousePosition.y * -30,
            scale: [1, 1.15, 1],
          }}
          transition={{
            x: { type: "spring", stiffness: 100, damping: 30 },
            y: { type: "spring", stiffness: 100, damping: 30 },
            scale: { duration: 5, repeat: Infinity }
          }}
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            ...parallaxOffset
          }}
        />
      </div>

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-50 origin-left"
           style={{ transform: `scaleX(${typeof window !== 'undefined' ? window.scrollY / (document.body.scrollHeight - window.innerHeight) : 0})` }} />

      {/* Main Hero Content */}
      <motion.div
        className="relative z-10 container mx-auto px-6"
        variants={heroVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        <div className="text-center max-w-6xl mx-auto">

          {/* Animated Brand Assets */}
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center mb-12 md:mb-16"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
              }
            }}
          >
            <motion.div
              whileHover={{
                scale: 1.05,
                rotate: [0, -5, 5, 0],
                transition: { duration: 0.5 }
              }}
              className="relative"
            >
              <Image
                src="/images/crow-hero-no-bg.png"
                alt="Crow illustration"
                width={198}
                height={198}
                className="h-[120px] md:h-[198px] w-auto object-contain drop-shadow-2xl"
                priority
                sizes="(max-width: 768px) 120px, 198px"
              />

              {/* Glow Effect on Hover */}
              <motion.div
                className="absolute inset-0 rounded-full opacity-0"
                whileHover={{
                  opacity: 0.3,
                  boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)"
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="md:ml-8 mt-6 md:mt-0"
            >
              <Image
                src="/images/corvo-labs-stacked.svg"
                alt="Corvo Labs logo"
                width={180}
                height={180}
                className="h-[108px] md:h-[180px] w-auto object-contain"
                priority
                sizes="(max-width: 768px) 108px, 180px"
              />
            </motion.div>
          </motion.div>

          {/* Animated Hero Heading */}
          <motion.div
            className="mb-8"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 0.4, ease: [0.25, 1, 0.5, 1] }
              }
            }}
          >
            <TextReveal
              text="Transforming complex challenges into elegant solutions"
              className="text-fluid-hero font-display font-bold mb-6"
              delay={500}
            />

            {/* Animated Subtitle */}
            <motion.p
              className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              We specialize in{" "}
              <motion.span
                className="text-gradient-ai font-semibold"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                AI projects
              </motion.span>
              {" "}and consulting across product management, healthcare, behavior change, UX design, and AI prototyping.
            </motion.p>
          </motion.div>

          {/* Interactive Stats Row */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 1.6
                }
              }
            }}
          >
            {[
              { value: 50, suffix: "+", label: "AI Solutions" },
              { value: 15, suffix: "+", label: "Healthcare Projects" },
              { value: 98, suffix: "%", label: "Client Satisfaction" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 glass-card hover-lift cursor-pointer"
                whileHover={{
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <div className="text-3xl md:text-4xl font-bold text-gradient-ai mb-2">
                  <AnimatedCounter value={stat.value} duration={2} suffix={stat.suffix} />
                </div>
                <div className="text-sm md:text-base text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 2.0 }
              }
            }}
          >
            <motion.button
              className="btn-ai-primary px-8 py-4 text-lg font-semibold"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                // Smooth scroll to services or contact section
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Explore Our Services
              <motion.span
                className="inline-block ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>

            <motion.button
              className="px-8 py-4 text-lg font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:border-blue-500 hover:text-blue-500 transition-all duration-300"
              whileHover={{
                scale: 1.05,
                borderColor: "var(--accent-ai-blue)",
                color: "var(--accent-ai-blue)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              View Our Work
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}
          >
            <motion.div
              className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1 h-3 bg-gray-400 rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Gradient Overlay */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      />
    </section>
  )
}