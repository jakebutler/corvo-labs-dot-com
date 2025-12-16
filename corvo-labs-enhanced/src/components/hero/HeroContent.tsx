'use client'

import { motion } from 'framer-motion'
import { heroVariants, staggerContainer } from './useHeroAnimations'

interface HeroContentProps {
  className?: string
}

export function HeroContent({ className }: HeroContentProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {/* Visually hidden h1 for SEO */}
      <h1 className="sr-only">
        Corvo Labs - Tailored AI Solutions for Healthcare
      </h1>

      {/* Hero description */}
      <motion.p
        className="
          text-base sm:text-lg lg:text-xl
          leading-relaxed
          text-gray-600
          max-w-md lg:max-w-lg
          mx-auto lg:mx-0
          text-center lg:text-left
        "
        variants={heroVariants.entrance}
      >
        Tailored solutions that solve real problems and deliver measurable results.
        Empowering healthcare teams with responsible automation and intelligent workflows.
      </motion.p>

      {/* Call-to-action buttons - matching the wireframes */}
      <motion.div
        className="
          flex flex-col sm:flex-row
          items-center justify-center lg:justify-start
          gap-3 md:gap-4
          mt-6 md:mt-8
        "
        variants={heroVariants.entrance}
        role="group"
        aria-label="Hero actions"
      >
        <motion.button
          className="
            inline-flex items-center justify-center
            px-6 py-3
            bg-accent-600 hover:bg-accent-700
            text-white font-medium
            rounded-lg
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2
            shadow-lg hover:shadow-xl
          "
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Schedule a call with Corvo Labs"
        >
          Schedule Call
        </motion.button>

        <motion.button
          className="
            inline-flex items-center justify-center
            px-6 py-3
            bg-white hover:bg-gray-50
            text-accent-600 font-medium
            border border-accent-200 hover:border-accent-300
            rounded-lg
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2
            shadow-sm hover:shadow-md
          "
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Learn more about Corvo Labs"
        >
          Learn More
        </motion.button>
      </motion.div>
    </motion.div>
  )
}