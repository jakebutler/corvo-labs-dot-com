"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrollReveal } from '@/components/animations/animation-primitives'

interface Project {
  title: string
  description: string
  image: string
  tags: string[]
  stats?: {
    metric: string
    value: string
  }
  link?: string
}

interface ProjectCardEnhancedProps {
  project: Project
  className?: string
  featured?: boolean
}

export function ProjectCardEnhanced({
  project,
  className = '',
  featured = false
}: ProjectCardEnhancedProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  // Animation variants for different elements
  const cardVariants = {
    initial: {
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      z: 0
    },
    hover: {
      scale: 1.02,
      rotateX: -5,
      rotateY: 5,
      z: 50
    }
  }

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    hover: { opacity: 1, y: 0 }
  }

  const tagVariants = {
    initial: { scale: 0.8, opacity: 0 },
    hover: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.3
      }
    })
  }

  return (
    <ScrollReveal
      className={`relative group ${featured ? 'md:col-span-2' : ''}`}
      variant="scaleIn"
    >
      <motion.div
        className={`relative h-full min-h-[400px] glass-card overflow-hidden cursor-pointer ${className}`}
        variants={cardVariants}
        initial="initial"
        whileHover="hover"
        transition={{
          duration: 0.4,
          ease: "easeOut"
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        }}
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            {/* Loading Placeholder */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
            )}

            {/* Project Image */}
            <motion.div
              className="relative w-full h-full"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className={`object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onLoad={() => setImageLoaded(true)}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
            </motion.div>

            {/* Animated Background Pattern */}
            <motion.div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%),
                  linear-gradient(-45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)
                `,
                backgroundSize: '20px 20px'
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%']
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 p-6 h-full flex flex-col justify-between">
          {/* Top Content */}
          <div>
            {/* Tags */}
            <motion.div
              className="flex flex-wrap gap-2 mb-4"
              variants={contentVariants}
              initial="initial"
              animate={isHovered ? "hover" : "initial"}
            >
              {project.tags.map((tag, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={tagVariants}
                  className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/30"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>

            {/* Title */}
            <motion.h3
              className="text-xl md:text-2xl font-bold text-white mb-3"
              variants={contentVariants}
              initial="initial"
              animate={isHovered ? "hover" : "initial"}
              transition={{ delay: 0.1 }}
            >
              {project.title}
            </motion.h3>

            {/* Description */}
            <motion.p
              className="text-white/90 text-sm md:text-base leading-relaxed mb-4"
              variants={contentVariants}
              initial="initial"
              animate={isHovered ? "hover" : "initial"}
              transition={{ delay: 0.2 }}
            >
              {project.description}
            </motion.p>
          </div>

          {/* Stats Section */}
          {project.stats && (
            <motion.div
              className="grid grid-cols-2 gap-4 mb-4"
              variants={contentVariants}
              initial="initial"
              animate={isHovered ? "hover" : "initial"}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20">
                <div className="text-2xl font-bold text-white">
                  {project.stats.value}
                </div>
                <div className="text-xs text-white/70 uppercase tracking-wide">
                  {project.stats.metric}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20">
                <div className="text-lg font-semibold text-white mb-1">
                  Results
                </div>
                <div className="text-xs text-white/70">
                  Learn more →
                </div>
              </div>
            </motion.div>
          )}

          {/* Call to Action */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="flex items-center justify-between"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <motion.button
                  className="px-4 py-2 bg-white text-gray-900 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    // Handle project view
                    if (project.link) {
                      window.open(project.link, '_blank')
                    }
                  }}
                >
                  View Project
                </motion.button>

                <motion.div
                  className="flex gap-2"
                  initial={{ gap: 0 }}
                  animate={{ gap: 8 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.button
                    className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
                    whileHover={{ scale: 1.1, rotate: 15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      // Handle share functionality
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032-4.026A9.001 9.001 0 0112 3c-4.474 0-8.268 3.12-9.032 7.326m0 0A9.001 9.001 0 0012 21c4.474 0 8.268-3.12 9.032-7.326" />
                    </svg>
                  </motion.button>

                  <motion.button
                    className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
                    whileHover={{ scale: 1.1, rotate: -15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      // Handle bookmark functionality
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Hover Effect Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-blue-600/20 via-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ mixBlendMode: 'screen' }}
        />

        {/* Featured Badge */}
        {featured && (
          <motion.div
            className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.5,
              duration: 0.5,
              type: "spring",
              stiffness: 200
            }}
          >
            Featured
          </motion.div>
        )}
      </motion.div>
    </ScrollReveal>
  )
}

// Enhanced Project Grid Component
interface ProjectGridEnhancedProps {
  projects: Project[]
  className?: string
  featured?: boolean
}

export function ProjectGridEnhanced({
  projects,
  className = '',
  featured = false
}: ProjectGridEnhancedProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {projects.map((project, index) => (
        <ProjectCardEnhanced
          key={index}
          project={project}
          featured={featured && index === 0}
        />
      ))}
    </div>
  )
}