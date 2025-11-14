/**
 * Animation Infrastructure Showcase
 *
 * Comprehensive demonstration of all animation capabilities for the
 * Corvo Labs healthcare AI consulting website.
 */

"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  // Core primitives
  ScrollReveal,
  TextRevealAdvanced,
  SmartAnimationContainer,
  PageTransitionAdvanced,

  // Medical animations
  HeartbeatAnimation,
  DNAHelix,
  MedicalScanner,
  NeuralNetwork,
  MedicalDataVisualization,
  MedicalPulseWave,

  // 3D interactions
  Interactive3DCard,
  FlippingCard3D,
  Carousel3D,

  // Hooks and utilities
  useScrollAnimation,
  useStagger,
  useViewportAnimation,
  useAnimationAccessibility,

  // Configuration
  HEALTHCARE_COLORS,
  HEALTHCARE_ANIMATION_TIMING,
  ANIMATION_VARIANTS_CONFIG
} from '../../../lib/animations'

export function AnimationShowcase() {
  const [selectedDemo, setSelectedDemo] = useState('overview')
  const { shouldReduceAnimation } = useAnimationAccessibility()
  const { animationConfig, isMobile } = useViewportAnimation()

  const demoCategories = [
    { id: 'overview', name: 'Overview', icon: '🎯' },
    { id: 'medical', name: 'Medical Animations', icon: '🏥' },
    { id: '3d', name: '3D Interactions', icon: '🎮' },
    { id: 'performance', name: 'Performance', icon: '⚡' },
    { id: 'accessibility', name: 'Accessibility', icon: '♿' }
  ]

  const medicalData = [85, 92, 78, 95, 88, 91]
  const medicalLabels = ['Heart Rate', 'BP', 'Oxygen', 'Temp', 'Glucose', 'Stress']

  const carouselItems = [
    <div key="1" className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 rounded-xl text-white">
      <h3 className="text-xl font-bold mb-2">AI Diagnostics</h3>
      <p>Advanced machine learning for medical diagnosis</p>
    </div>,
    <div key="2" className="bg-gradient-to-br from-green-500 to-teal-600 p-8 rounded-xl text-white">
      <h3 className="text-xl font-bold mb-2">Patient Monitoring</h3>
      <p>Real-time health tracking and alert systems</p>
    </div>,
    <div key="3" className="bg-gradient-to-br from-orange-500 to-red-600 p-8 rounded-xl text-white">
      <h3 className="text-xl font-bold mb-2">Drug Discovery</h3>
      <p>Accelerated pharmaceutical research with AI</p>
    </div>,
    <div key="4" className="bg-gradient-to-br from-purple-500 to-pink-600 p-8 rounded-xl text-white">
      <h3 className="text-xl font-bold mb-2">Personalized Medicine</h3>
      <p>Tailored treatments based on genetic profiles</p>
    </div>
  ]

  return (
    <PageTransitionAdvanced>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Animation Infrastructure Showcase
                </h1>
                <p className="text-gray-600 mt-1">
                  Healthcare AI Consulting - Professional Animation System
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-500">
                  {shouldReduceAnimation() ? '🅰️ Reduced Motion' : '🎬 Full Animations'}
                </div>
                <div className="text-sm text-gray-500">
                  📱 {isMobile ? 'Mobile' : 'Desktop'} Mode
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Demo Categories */}
        <nav className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex space-x-2 overflow-x-auto">
              {demoCategories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedDemo(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedDemo === category.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </motion.button>
              ))}
            </div>
          </div>
        </nav>

        {/* Demo Content */}
        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Overview Demo */}
          {selectedDemo === 'overview' && (
            <div className="space-y-12">
              <ScrollReveal>
                <section className="text-center">
                  <TextRevealAdvanced
                    text="Professional Healthcare Animations"
                    className="text-4xl font-bold text-gray-900 mb-4"
                    animation="slideUp"
                  />
                  <TextRevealAdvanced
                    text="Sophisticated animation system optimized for healthcare AI consulting websites"
                    className="text-xl text-gray-600 max-w-3xl mx-auto"
                    variant="word"
                    delay={0.5}
                  />
                </section>
              </ScrollReveal>

              <div className="grid md:grid-cols-3 gap-8">
                <ScrollReveal delay={0.1}>
                  <Interactive3DCard className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="text-blue-500 text-4xl mb-4">⚡</div>
                    <h3 className="text-xl font-semibold mb-2">60fps Performance</h3>
                    <p className="text-gray-600">
                      Optimized animations with intelligent performance monitoring and adaptive quality
                    </p>
                  </Interactive3DCard>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <Interactive3DCard className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="text-green-500 text-4xl mb-4">♿</div>
                    <h3 className="text-xl font-semibold mb-2">Accessibility First</h3>
                    <p className="text-gray-600">
                      Full WCAG compliance with respect for reduced motion preferences
                    </p>
                  </Interactive3DCard>
                </ScrollReveal>

                <ScrollReveal delay={0.3}>
                  <Interactive3DCard className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="text-purple-500 text-4xl mb-4">🎨</div>
                    <h3 className="text-xl font-semibold mb-2">Healthcare Themed</h3>
                    <p className="text-gray-600">
                      Professional animations with medical precision and gentle care
                    </p>
                  </Interactive3DCard>
                </ScrollReveal>
              </div>
            </div>
          )}

          {/* Medical Animations Demo */}
          {selectedDemo === 'medical' && (
            <div className="space-y-12">
              <ScrollReveal>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Medical Animation Components
                </h2>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Heartbeat Animation */}
                <ScrollReveal>
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-lg font-semibold mb-4">Heartbeat Monitor</h3>
                    <div className="flex justify-center mb-4">
                      <HeartbeatAnimation size={80} active={true} showLabel={true} />
                    </div>
                    <p className="text-sm text-gray-600">
                      Realistic heartbeat animation with medical precision timing
                    </p>
                  </div>
                </ScrollReveal>

                {/* DNA Helix */}
                <ScrollReveal delay={0.1}>
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-lg font-semibold mb-4">DNA Helix</h3>
                    <div className="flex justify-center mb-4">
                      <DNAHelix size={100} animated={true} />
                    </div>
                    <p className="text-sm text-gray-600">
                      Animated DNA double helix representing genetic analysis
                    </p>
                  </div>
                </ScrollReveal>

                {/* Medical Scanner */}
                <ScrollReveal delay={0.2}>
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-lg font-semibold mb-4">Medical Scanner</h3>
                    <div className="flex justify-center mb-4">
                      <MedicalScanner width={250} height={120} active={true} />
                    </div>
                    <p className="text-sm text-gray-600">
                      Scanning animation for diagnostic procedures
                    </p>
                  </div>
                </ScrollReveal>

                {/* Neural Network */}
                <ScrollReveal delay={0.3}>
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-lg font-semibold mb-4">Neural Network</h3>
                    <div className="flex justify-center mb-4">
                      <NeuralNetwork size={150} animated={true} />
                    </div>
                    <p className="text-sm text-gray-600">
                      AI neural network visualization with animated connections
                    </p>
                  </div>
                </ScrollReveal>

                {/* Pulse Wave */}
                <ScrollReveal delay={0.4}>
                  <div className="bg-white p-6 rounded-xl shadow-lg lg:col-span-2">
                    <h3 className="text-lg font-semibold mb-4">ECG Pulse Wave</h3>
                    <div className="flex justify-center mb-4">
                      <MedicalPulseWave width={500} height={120} animated={true} />
                    </div>
                    <p className="text-sm text-gray-600">
                      Realistic ECG waveform animation for vital sign monitoring
                    </p>
                  </div>
                </ScrollReveal>
              </div>

              {/* Medical Data Visualization */}
              <ScrollReveal delay={0.5}>
                <MedicalDataVisualization
                  data={medicalData}
                  labels={medicalLabels}
                  title="Patient Vital Signs"
                  className="w-full"
                />
              </ScrollReveal>
            </div>
          )}

          {/* 3D Interactions Demo */}
          {selectedDemo === '3d' && (
            <div className="space-y-12">
              <ScrollReveal>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  3D Interactive Components
                </h2>
              </ScrollReveal>

              {/* 3D Carousel */}
              <ScrollReveal>
                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <h3 className="text-xl font-semibold mb-6 text-center">3D Solution Carousel</h3>
                  <Carousel3D
                    items={carouselItems}
                    itemWidth={280}
                    itemHeight={180}
                    autoRotate={true}
                    showControls={true}
                  />
                </div>
              </ScrollReveal>

              {/* 3D Cards Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                <ScrollReveal delay={0.1}>
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-lg font-semibold mb-4">3D Interactive Card</h3>
                    <Interactive3DCard
                      className="bg-gradient-to-br from-blue-100 to-purple-100 p-8 rounded-lg"
                      intensity={20}
                      glowEffect={true}
                    >
                      <div className="text-center">
                        <div className="text-4xl mb-4">🏥</div>
                        <h4 className="text-xl font-semibold mb-2">Healthcare AI</h4>
                        <p className="text-gray-600">
                          Move your mouse over this card to see the 3D effect
                        </p>
                      </div>
                    </Interactive3DCard>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-lg font-semibold mb-4">3D Flipping Card</h3>
                    <div className="flex justify-center">
                      <FlippingCard3D
                        width={300}
                        height={200}
                        frontContent={
                          <div className="bg-gradient-to-br from-green-400 to-blue-500 p-8 rounded-lg text-white text-center h-full flex flex-col justify-center">
                            <h4 className="text-xl font-semibold mb-2">Front Side</h4>
                            <p>Click to see the back</p>
                          </div>
                        }
                        backContent={
                          <div className="bg-gradient-to-br from-purple-400 to-pink-500 p-8 rounded-lg text-white text-center h-full flex flex-col justify-center">
                            <h4 className="text-xl font-semibold mb-2">Back Side</h4>
                            <p>Amazing 3D flip effect!</p>
                          </div>
                        }
                        autoFlip={false}
                      />
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          )}

          {/* Performance Demo */}
          {selectedDemo === 'performance' && (
            <div className="space-y-12">
              <ScrollReveal>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Performance Optimization
                </h2>
              </ScrollReveal>

              <SmartAnimationContainer>
                <div className="grid md:grid-cols-2 gap-8">
                  <ScrollReveal>
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                      <h3 className="text-lg font-semibold mb-4">Adaptive Quality</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Animation Quality:</span>
                          <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">
                            {animationConfig.intensity === 1 ? 'High' :
                             animationConfig.intensity === 0.75 ? 'Medium' : 'Low'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Device Type:</span>
                          <span className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {isMobile ? 'Mobile' : 'Desktop'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Reduced Motion:</span>
                          <span className="font-mono bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                            {shouldReduceAnimation() ? 'Enabled' : 'Disabled'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal delay={0.1}>
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                      <h3 className="text-lg font-semibold mb-4">Animation Timing</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Medical Precision:</span>
                          <span className="font-mono text-gray-600">0.4s</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Gentle Care:</span>
                          <span className="font-mono text-gray-600">0.8s</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Confident Display:</span>
                          <span className="font-mono text-gray-600">0.6s</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Standard Medical:</span>
                          <span className="font-mono text-gray-600">0.5s</span>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              </SmartAnimationContainer>

              <ScrollReveal delay={0.2}>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-lg font-semibold mb-4">Performance Features</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl mb-2">🎯</div>
                      <h4 className="font-semibold mb-1">60fps Target</h4>
                      <p className="text-sm text-gray-600">
                        Consistent frame rate monitoring
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl mb-2">📊</div>
                      <h4 className="font-semibold mb-1">Memory Tracking</h4>
                      <p className="text-sm text-gray-600">
                        Automatic cleanup and optimization
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl mb-2">🔄</div>
                      <h4 className="font-semibold mb-1">Smart Queuing</h4>
                      <p className="text-sm text-gray-600">
                        Batched animation processing
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          )}

          {/* Accessibility Demo */}
          {selectedDemo === 'accessibility' && (
            <div className="space-y-12">
              <ScrollReveal>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Accessibility Features
                </h2>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 gap-8">
                <ScrollReveal>
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-lg font-semibold mb-4">Motion Preferences</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span>Prefers Reduced Motion</span>
                        <span className={`px-2 py-1 rounded text-sm ${
                          shouldReduceAnimation()
                            ? 'bg-red-100 text-red-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {shouldReduceAnimation() ? 'Detected' : 'Not Detected'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span>High Contrast Mode</span>
                        <span className="px-2 py-1 rounded text-sm bg-blue-100 text-blue-800">
                          Supported
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span>Screen Reader Support</span>
                        <span className="px-2 py-1 rounded text-sm bg-green-100 text-green-800">
                          Enabled
                        </span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.1}>
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-lg font-semibold mb-4">Accessibility Features</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>WCAG 2.1 AA compliance</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Keyboard navigation support</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Screen reader announcements</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Focus management</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Color contrast optimization</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Reduced motion respect</span>
                      </li>
                    </ul>
                  </div>
                </ScrollReveal>
              </div>

              <ScrollReveal delay={0.2}>
                <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-3 text-blue-900">
                    💡 Pro Tip
                  </h3>
                  <p className="text-blue-800">
                    Try enabling "reduced motion" in your system preferences to see how the animations
                    automatically adapt for users who prefer less motion. This is essential for
                    accessibility and for users with vestibular disorders.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-gray-600">
                Corvo Labs Animation Infrastructure - Healthcare AI Consulting
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Built with performance, accessibility, and professional healthcare aesthetics in mind
              </p>
            </div>
          </div>
        </footer>
      </div>
    </PageTransitionAdvanced>
  )
}