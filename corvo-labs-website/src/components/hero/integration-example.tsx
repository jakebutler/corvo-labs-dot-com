/**
 * Integration Example
 *
 * Example showing how to integrate the Advanced Hero Section into the main page.
 * This demonstrates proper usage patterns and configuration options.
 */

import React from 'react'
import AdvancedHeroSection from './advanced-hero-section'
import { FeaturedProjects } from '@/components/featured-projects'
import { ExpertiseSection } from '@/components/expertise-section'
import { CTASection } from '@/components/cta-section'

/**
 * Example homepage with the advanced hero section integrated
 */
export default function HomePageWithAdvancedHero() {
  return (
    <main className="min-h-screen bg-background">
      {/* Advanced Hero Section */}
      <AdvancedHeroSection />

      {/* Rest of the page content */}
      <section id="main-content" className="py-20">
        <div className="container mx-auto px-4">
          {/* Your existing page sections */}
          <FeaturedProjects />
          <ExpertiseSection />
          <CTASection />
        </div>
      </section>
    </main>
  )
}

/**
 * Example with custom configuration
 */
export function CustomHeroExample() {
  return (
    <main>
      {/* Hero with default settings */}
      <AdvancedHeroSection />

      {/* You can also use individual components */}
      {/* <FloatingShapes count={8} /> */}
      {/* <StatCounter value={100} suffix="%" label="Success Rate" /> */}
      {/* <InteractiveCTA href="/contact">Get Started</InteractiveCTA> */}
    </main>
  )
}

/**
 * Example with performance monitoring
 */
export function HeroWithPerformanceMonitoring() {
  // You can add performance monitoring around the hero
  React.useEffect(() => {
    const startTime = performance.now()

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'measure') {
          console.log(`${entry.name}: ${entry.duration}ms`)
        }
      }
    })

    observer.observe({ entryTypes: ['measure'] })

    return () => {
      const loadTime = performance.now() - startTime
      performance.mark('hero-loaded')
      performance.measure('hero-load-time', 'navigationStart', 'hero-loaded')
      console.log(`Hero section loaded in ${loadTime}ms`)
    }
  }, [])

  return <AdvancedHeroSection />
}

/**
 * Example with A/B testing
 */
export function HeroABTestExample({ variant }: { variant: 'advanced' | 'simple' }) {
  if (variant === 'advanced') {
    return <AdvancedHeroSection />
  }

  // Fallback to simple hero for A/B testing
  return (
    <section className="py-20 px-4 text-center">
      <h1 className="text-4xl font-bold mb-6">Simple Hero</h1>
      <p className="text-xl text-muted-foreground mb-8">
        This is a simple hero section for A/B testing
      </p>
    </section>
  )
}