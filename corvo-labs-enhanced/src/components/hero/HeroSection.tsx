'use client'

import { motion } from 'framer-motion'
import { HeroBackground } from './HeroBackground'
import { HeroVisual } from './HeroVisual'
import { HeroContent } from './HeroContent'
import type { HeroSectionProps } from './Hero.types'

export function HeroSection({ className }: HeroSectionProps) {

  return (
    <section
      role="banner"
      aria-label="Corvo Labs hero section"
      className={`
        relative min-h-screen
        flex items-center justify-center
        bg-white
        ${className || ''}
      `}
    >
      {/* Background elements with parallax */}
      <HeroBackground className="absolute inset-0 z-0" />

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="flex flex-col items-center justify-center gap-12 md:gap-16"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                duration: 0.6,
                staggerChildren: 0.2
              }
            }
          }}
        >
          {/* Top section: Visual elements (crow + logo) - side by side */}
          <HeroVisual />

          {/* Bottom section: Content */}
          <motion.div className="flex justify-center w-full">
            <HeroContent className="w-full max-w-2xl" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade for smooth scroll */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  )
}