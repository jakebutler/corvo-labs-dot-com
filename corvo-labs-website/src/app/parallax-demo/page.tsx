/**
 * Parallax Demo Page
 *
 * Demo page showcasing the advanced parallax system for Corvo Labs Website 2.0.
 * This page demonstrates all parallax features and healthcare-themed effects.
 */

import { Metadata } from 'next'
import { ParallaxShowcase } from '@/components/parallax'

export const metadata: Metadata = {
  title: 'Advanced Parallax System Demo | Corvo Labs',
  description: 'Experience sophisticated multi-layer parallax effects with healthcare-themed animations and performance optimization.',
  openGraph: {
    title: 'Advanced Parallax System Demo | Corvo Labs',
    description: 'Experience sophisticated multi-layer parallax effects with healthcare-themed animations and performance optimization.',
    type: 'website',
    url: '/parallax-demo'
  }
}

export default function ParallaxDemoPage() {
  return (
    <main className="min-h-screen">
      <ParallaxShowcase />
    </main>
  )
}