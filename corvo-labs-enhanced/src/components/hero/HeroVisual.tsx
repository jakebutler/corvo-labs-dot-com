'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { OptimizedHeroImage } from './OptimizedHeroImage'
import type { HeroVisualProps } from './Hero.types'

export function HeroVisual({ className }: HeroVisualProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`relative flex w-full flex-col items-center justify-center gap-12 lg:flex-row lg:items-center lg:gap-16 ${className ?? ''}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1.2,
        ease: [0.34, 1.56, 0.64, 1],
        delay: 0.3
      }}
    >
      {/* Sophisticated Crow Hero */}
      <motion.figure
        className="relative z-20 flex-shrink-0 group"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        animate={{
          rotate: isHovered ? [0, -5, 5, 0] : 0,
        }}
        transition={{
          duration: 0.6,
          ease: [0.34, 1.56, 0.64, 1]
        }}
      >
        {/* Glowing background on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-accent-400/20 to-accent-600/20 rounded-full blur-2xl scale-125"
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1.2 : 1,
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Floating orb element */}
        <motion.div
          className="absolute -top-4 -right-4 w-8 h-8 bg-accent-500 rounded-full"
          animate={{
            y: [0, -10, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <OptimizedHeroImage
          src="/images/crow-hero-no-bg.png"
          alt="Corvo Labs crow illustration"
          priority
          width={420}
          height={420}
          className="h-auto w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[420px] xl:max-w-[480px] relative z-10 filter drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 280px, (max-width: 1024px) 360px, 480px"
        />
      </motion.figure>

      {/* Sophisticated Stacked Logo */}
      <motion.figure
        className="relative z-10 flex-shrink-0"
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        {/* Subtle background glow */}
        <motion.div
          className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-3xl -mx-8 -my-8"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />

        <motion.img
          src="/images/corvo-labs-stacked.svg"
          alt="Corvo Labs stacked logo"
          className="h-auto w-full max-w-[180px] sm:max-w-[220px] md:max-w-[260px] lg:max-w-[300px] xl:max-w-[340px] object-contain relative z-10"
          loading="eager"
          animate={{
            filter: isHovered
              ? 'drop-shadow(0 10px 30px rgba(255, 107, 71, 0.3))'
              : 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.1))',
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.figure>

      {/* Decorative floating elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent-400 rounded-full"
        animate={{
          x: [0, 20, 0],
          y: [0, -15, 0],
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-accent-500/60 rounded-full"
        animate={{
          x: [0, -15, 0],
          y: [0, 10, 0],
          opacity: [0.2, 0.8, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      />
    </motion.div>
  )
}