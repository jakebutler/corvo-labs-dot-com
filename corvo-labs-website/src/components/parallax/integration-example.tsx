/**
 * Integration Example
 *
 * Example showing how to integrate the parallax system into existing components.
 * This demonstrates how to enhance the current hero section with parallax effects.
 */

'use client'

import React from 'react'
import { ParallaxContainer, ParallaxLayer } from '@/components/parallax'

// ============================================================================
// EXAMPLE: Enhanced Hero Section
// ============================================================================

interface HeroSectionProps {
  title: string
  subtitle: string
  ctaText?: string
  backgroundImage?: string
}

export const EnhancedHeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  ctaText = "Get Started",
  backgroundImage
}) => {
  return (
    <ParallaxContainer
      className="relative h-screen overflow-hidden"
      intensity={0.025}
      layerCount={4}
      performanceMode="high"
      respectReducedMotion={true}
    >
      {/* Background Layer */}
      <ParallaxLayer
        depth={0.9}
        className="absolute inset-0"
        opacity={0.4}
      >
        {backgroundImage ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700" />
        )}
        <div className="absolute inset-0 bg-black/20" />
      </ParallaxLayer>

      {/* Floating Elements Layer */}
      <ParallaxLayer
        depth={0.6}
        className="absolute inset-0"
        opacity={0.6}
      >
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full backdrop-blur-sm" />
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full backdrop-blur-sm" />
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-blue-400/20 rounded-full" />
        <div className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-purple-400/20 rounded-full" />
      </ParallaxLayer>

      {/* Content Layer */}
      <ParallaxLayer
        depth={0.3}
        className="absolute inset-0 flex items-center justify-center"
        opacity={0.9}
      >
        <div className="text-center max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>
          <button className="px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105">
            {ctaText}
          </button>
        </div>
      </ParallaxLayer>

      {/* Overlay Effects */}
      <ParallaxLayer
        depth={0.1}
        className="absolute inset-0 pointer-events-none"
        opacity={0.3}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </ParallaxLayer>
    </ParallaxContainer>
  )
}

// ============================================================================
// EXAMPLE: Service Cards with Parallax
// ============================================================================

interface ServiceCard {
  id: number
  title: string
  description: string
  icon: string
  color: string
}

interface ParallaxServiceCardsProps {
  services: ServiceCard[]
}

export const ParallaxServiceCards: React.FC<ParallaxServiceCardsProps> = ({ services }) => {
  return (
    <ParallaxContainer
      className="relative py-20 bg-gray-50"
      intensity={0.015}
      layerCount={3}
    >
      {/* Background Pattern */}
      <ParallaxLayer
        depth={0.8}
        className="absolute inset-0"
        opacity={0.1}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100" />
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </ParallaxLayer>

      {/* Cards Container */}
      <ParallaxLayer
        depth={0.4}
        className="relative container mx-auto px-6"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Healthcare AI consulting solutions with cutting-edge technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ParallaxLayer
              key={service.id}
              depth={0.1 + (index % 3) * 0.05}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className={`w-16 h-16 bg-${service.color}-100 rounded-lg flex items-center justify-center text-2xl mb-4`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <button className={`text-${service.color}-600 font-medium hover:text-${service.color}-700`}>
                Learn More →
              </button>
            </ParallaxLayer>
          ))}
        </div>
      </ParallaxLayer>
    </ParallaxContainer>
  )
}

// ============================================================================
// EXAMPLE: Medical-Themed Section
// ============================================================================

export const MedicalParallaxSection: React.FC = () => {
  return (
    <ParallaxContainer
      className="relative py-20 bg-gradient-to-br from-green-50 to-blue-50"
      medicalTheme={true}
      medicalEffect="pulse"
      colorMode="oxygen"
      intensity={0.02}
      layerCount={4}
    >
      {/* Medical Background */}
      <ParallaxLayer
        depth={0.9}
        className="absolute inset-0"
        opacity={0.2}
      >
        <div className="absolute top-20 left-20 w-64 h-64 bg-green-400/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-400/30 rounded-full blur-3xl" />
      </ParallaxLayer>

      {/* Content */}
      <ParallaxLayer
        depth={0.4}
        className="relative container mx-auto px-6"
      >
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Healthcare AI Excellence
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Combining medical expertise with artificial intelligence to transform healthcare delivery
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-gray-600">Accuracy Rate</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Monitoring</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">50%</div>
              <div className="text-gray-600">Cost Reduction</div>
            </div>
          </div>
        </div>
      </ParallaxLayer>
    </ParallaxContainer>
  )
}

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

export const ParallaxUsageExamples: React.FC = () => {
  const sampleServices: ServiceCard[] = [
    {
      id: 1,
      title: "AI Diagnostics",
      description: "Advanced machine learning for accurate medical diagnostics",
      icon: "🔬",
      color: "blue"
    },
    {
      id: 2,
      title: "Patient Monitoring",
      description: "Real-time health monitoring with predictive analytics",
      icon: "📊",
      color: "green"
    },
    {
      id: 3,
      title: "Drug Discovery",
      description: "AI-accelerated pharmaceutical research and development",
      icon: "💊",
      color: "purple"
    }
  ]

  return (
    <div className="space-y-0">
      <EnhancedHeroSection
        title="Corvo Labs Healthcare AI"
        subtitle="Transforming healthcare with artificial intelligence and machine learning solutions"
        ctaText="Explore Solutions"
      />

      <ParallaxServiceCards services={sampleServices} />

      <MedicalParallaxSection />
    </div>
  )
}

export default ParallaxUsageExamples