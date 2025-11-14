/**
 * Parallax Showcase Component
 *
 * Comprehensive demo showcasing all parallax features and capabilities.
 * Demonstrates multi-layer parallax, healthcare themes, and performance optimization.
 */

'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

import { ParallaxProvider } from '@/lib/parallax/parallax-provider'
import { ParallaxContainer, MedicalParallaxContainer, OptimizedParallaxContainer } from './parallax-container'
import {
  ParallaxLayer,
  BackgroundParallaxLayer,
  MidgroundParallaxLayer,
  ForegroundParallaxLayer,
  MedicalParallaxLayer,
  InteractiveParallaxLayer
} from './parallax-layer'

// ============================================================================
// SHOWCASE CONFIGURATION
// ============================================================================

const showcaseSections = [
  {
    id: 'hero',
    title: 'Hero Parallax',
    description: 'Multi-layer parallax with healthcare theme',
    medical: true
  },
  {
    id: 'layers',
    title: 'Layer System',
    description: 'Background, midground, and foreground layers',
    medical: false
  },
  {
    id: 'interactive',
    title: 'Interactive Elements',
    description: 'Hover and tap interactions with parallax',
    medical: false
  },
  {
    id: 'performance',
    title: 'Performance Optimized',
    description: 'High-performance parallax with monitoring',
    medical: false
  },
  {
    id: 'medical',
    title: 'Medical Effects',
    description: 'Healthcare-themed animations and effects',
    medical: true
  }
]

// ============================================================================
// HERO PARALLAX SECTION
// ============================================================================

const HeroParallaxSection: React.FC = () => {
  return (
    <section className="relative h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
      <MedicalParallaxContainer
        className="absolute inset-0"
        medicalTheme={true}
        medicalEffect="pulse"
        layerCount={5}
        intensity={0.03}
        showPerformanceMonitor={true}
      >
        {/* Background Layer */}
        <BackgroundParallaxLayer className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl" />
        </BackgroundParallaxLayer>

        {/* Midground Layer */}
        <MidgroundParallaxLayer className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-white/10 backdrop-blur-sm rounded-2xl" />
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-white/10 backdrop-blur-sm rounded-2xl" />
        </MidgroundParallaxLayer>

        {/* Foreground Layer */}
        <ForegroundParallaxLayer className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center max-w-4xl mx-auto px-6"
          >
            <h1 className="text-6xl font-bold text-gray-900 mb-6">
              Advanced Parallax
              <span className="text-blue-600"> Effects</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Experience sophisticated multi-layer parallax with healthcare-themed animations
              and performance optimization for the Corvo Labs Website 2.0
            </p>
            <div className="flex gap-4 justify-center">
              <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Explore Features
              </button>
              <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Documentation
              </button>
            </div>
          </motion.div>
        </ForegroundParallaxLayer>
      </MedicalParallaxContainer>
    </section>
  )
}

// ============================================================================
// LAYER SYSTEM SECTION
// ============================================================================

const LayerSystemSection: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<number | null>(null)

  return (
    <section className="relative h-screen overflow-hidden bg-gray-50">
      <ParallaxContainer
        className="absolute inset-0"
        layerCount={4}
        intensity={0.025}
        showPerformanceMonitor={true}
      >
        {/* Layer 1 - Deep Background */}
        <ParallaxLayer
          depth={0.9}
          intensity={0.2}
          className="absolute inset-0"
          opacity={0.3}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100" />
          <div className="absolute top-10 left-10 w-32 h-32 bg-indigo-300/30 rounded-full" />
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-purple-300/30 rounded-full" />
        </ParallaxLayer>

        {/* Layer 2 - Background Elements */}
        <ParallaxLayer
          depth={0.6}
          intensity={0.5}
          className="absolute inset-0"
          opacity={0.6}
        >
          <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-blue-200/40 rounded-2xl backdrop-blur-sm" />
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-green-200/40 rounded-2xl backdrop-blur-sm" />
        </ParallaxLayer>

        {/* Layer 3 - Midground Content */}
        <ParallaxLayer
          depth={0.3}
          intensity={0.7}
          className="absolute inset-0 flex items-center justify-center"
          opacity={0.8}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Multi-Layer System</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto px-6">
              Each layer moves independently based on depth, creating a realistic 3D parallax effect.
              Move your mouse to see how different layers respond with varying intensity.
            </p>
          </motion.div>
        </ParallaxLayer>

        {/* Layer 4 - Interactive Elements */}
        <ParallaxLayer
          depth={0.1}
          intensity={1.0}
          className="absolute inset-0"
          opacity={1}
        >
          <div className="absolute top-10 right-10 flex gap-2">
            {[0, 1, 2, 3].map((layer) => (
              <button
                key={layer}
                onClick={() => setActiveLayer(activeLayer === layer ? null : layer)}
                className={`w-12 h-12 rounded-lg transition-all ${
                  activeLayer === layer
                    ? 'bg-blue-600 text-white scale-110'
                    : 'bg-white/80 hover:bg-white text-gray-700'
                }`}
              >
                L{layer + 1}
              </button>
            ))}
          </div>

          {activeLayer !== null && (
            <div className="absolute top-24 right-10 bg-white rounded-lg shadow-lg p-4 max-w-xs">
              <h3 className="font-semibold text-gray-900 mb-2">Layer {activeLayer + 1}</h3>
              <p className="text-sm text-gray-600">
                Depth: {(0.9 - activeLayer * 0.3).toFixed(1)}<br />
                Intensity: {(1.0 - activeLayer * 0.25).toFixed(2)}<br />
                Status: Active
              </p>
            </div>
          )}
        </ParallaxLayer>
      </ParallaxContainer>
    </section>
  )
}

// ============================================================================
// INTERACTIVE ELEMENTS SECTION
// ============================================================================

const InteractiveElementsSection: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const cards = [
    { id: 1, title: 'Responsive', icon: '📱', color: 'blue' },
    { id: 2, title: 'Performance', icon: '⚡', color: 'green' },
    { id: 3, title: 'Accessible', icon: '♿', color: 'purple' },
    { id: 4, title: 'Healthcare', icon: '🏥', color: 'red' }
  ]

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20">
      <ParallaxContainer
        className="absolute inset-0"
        layerCount={3}
        intensity={0.02}
      >
        {/* Background Layer */}
        <BackgroundParallaxLayer className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
        </BackgroundParallaxLayer>

        {/* Content Layer */}
        <ParallaxLayer
          depth={0.5}
          className="absolute inset-0 flex items-center justify-center py-20"
        >
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Interactive Parallax</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Hover over the cards below to see enhanced parallax effects with smooth transitions
                and responsive interactions.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cards.map((card, index) => (
                <InteractiveParallaxLayer
                  key={card.id}
                  depth={0.2 + index * 0.1}
                  className="relative bg-white rounded-xl shadow-lg p-6 cursor-pointer"
                  onHoverStart={() => setHoveredCard(card.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                >
                  <div className={`w-16 h-16 bg-${card.color}-100 rounded-full flex items-center justify-center text-2xl mb-4`}>
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-gray-600 text-sm">
                    {hoveredCard === card.id
                      ? `Enhanced parallax effect active for ${card.title.toLowerCase()} features`
                      : `Hover to see ${card.title.toLowerCase()} parallax effects`}
                  </p>
                </InteractiveParallaxLayer>
              ))}
            </div>
          </div>
        </ParallaxLayer>
      </ParallaxContainer>
    </section>
  )
}

// ============================================================================
// PERFORMANCE SECTION
// ============================================================================

const PerformanceSection: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-black text-white py-20">
      <OptimizedParallaxContainer
        className="absolute inset-0"
        layerCount={3}
        intensity={0.015}
        showPerformanceMonitor={true}
        performanceMode="high"
      >
        {/* Background Layer */}
        <BackgroundParallaxLayer className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900" />
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`
                }}
              />
            ))}
          </div>
        </BackgroundParallaxLayer>

        {/* Content Layer */}
        <ParallaxLayer
          depth={0.3}
          className="absolute inset-0 flex items-center justify-center py-20"
        >
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6">Performance Optimized</h2>
              <p className="text-xl text-gray-300 mb-8">
                High-performance parallax maintaining 60fps with intelligent optimization
                and device capability detection.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="font-semibold mb-2">60 FPS Target</h3>
                  <p className="text-sm text-gray-300">
                    Optimized rendering pipeline ensures smooth animations
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Device Adaptive</h3>
                  <p className="text-sm text-gray-300">
                    Automatically adjusts quality based on device capabilities
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Memory Efficient</h3>
                  <p className="text-sm text-gray-300">
                    Intelligent garbage collection and resource management
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </ParallaxLayer>
      </OptimizedParallaxContainer>
    </section>
  )
}

// ============================================================================
// MEDICAL EFFECTS SECTION
// ============================================================================

const MedicalEffectsSection: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-20">
      <MedicalParallaxContainer
        className="absolute inset-0"
        medicalTheme={true}
        medicalEffect="heartbeat"
        colorMode="oxygen"
        layerCount={4}
        intensity={0.025}
      >
        {/* Background Medical Layer */}
        <BackgroundParallaxLayer className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-green-100/30 to-blue-100/30" />
          <div className="absolute top-20 left-20 w-64 h-64 bg-green-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-56 h-56 bg-blue-400/20 rounded-full blur-3xl" />
        </BackgroundParallaxLayer>

        {/* Medical Animation Layer */}
        <MedicalParallaxLayer
          depth={0.6}
          medicalEffect="breathing"
          className="absolute inset-0"
          opacity={0.7}
        >
          <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-green-300/30 rounded-full backdrop-blur-sm" />
          <div className="absolute bottom-1/3 right-1/4 w-28 h-28 bg-blue-300/30 rounded-full backdrop-blur-sm" />
        </MedicalParallaxLayer>

        {/* Content Layer */}
        <ParallaxLayer
          depth={0.3}
          className="absolute inset-0 flex items-center justify-center py-20"
        >
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Healthcare-Themed Effects</h2>
              <p className="text-xl text-gray-600 mb-8">
                Medical-inspired parallax animations with heartbeat, breathing, and pulse effects
                designed specifically for healthcare AI consulting.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                {['heartbeat', 'breathing', 'pulse', 'wave'].map((effect) => (
                  <MedicalParallaxLayer
                    key={effect}
                    depth={0.1}
                    medicalEffect={effect as any}
                    className="w-24 h-24 bg-white rounded-lg shadow-md flex items-center justify-center text-sm font-medium text-gray-700"
                  >
                    {effect.charAt(0).toUpperCase() + effect.slice(1)}
                  </MedicalParallaxLayer>
                ))}
              </div>
            </motion.div>
          </div>
        </ParallaxLayer>
      </MedicalParallaxContainer>
    </section>
  )
}

// ============================================================================
// MAIN SHOWCASE COMPONENT
// ============================================================================

export const ParallaxShowcase: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0)

  const scrollToSection = (index: number) => {
    setCurrentSection(index)
    const element = document.getElementById(showcaseSections[index].id)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Parallax Showcase</h1>
            <div className="flex gap-2">
              {showcaseSections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(index)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentSection === index
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Content Sections */}
      <ParallaxProvider enabled={true}>
        <HeroParallaxSection />
        <LayerSystemSection />
        <InteractiveElementsSection />
        <PerformanceSection />
        <MedicalEffectsSection />
      </ParallaxProvider>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Parallax System Complete</h2>
          <p className="text-gray-400">
            Advanced multi-layer parallax effects for Corvo Labs Website 2.0
          </p>
        </div>
      </footer>
    </div>
  )
}

export default ParallaxShowcase