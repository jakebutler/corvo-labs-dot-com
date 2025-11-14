/**
 * Hero Demo Page
 *
 * Demo page showcasing the advanced hero section in action.
 * This page demonstrates the full capabilities of the hero system.
 */

import { Metadata } from 'next'
import AdvancedHeroSection from '@/components/hero/advanced-hero-section'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Advanced Hero Demo | Corvo Labs',
  description: 'Demonstration of the advanced hero section with 3D transforms, interactive elements, and professional healthcare AI consulting aesthetics.',
  openGraph: {
    title: 'Advanced Hero Demo | Corvo Labs',
    description: 'Sophisticated hero section with 3D transforms and interactive elements',
    type: 'website',
  },
}

export default function HeroDemoPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Advanced Hero Section */}
      <AdvancedHeroSection />

      {/* Demo content below hero */}
      <section id="main-content" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tight">
              Advanced Hero Section Features
            </h2>

            <p className="text-lg text-muted-foreground">
              This demonstration showcases the sophisticated hero section with 3D transforms,
              mouse tracking, floating geometric shapes, and professional healthcare aesthetics.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <div className="p-6 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-3">🎨 Visual Effects</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• 3D transform effects with perspective animations</li>
                  <li>• Mouse-tracking parallax effects</li>
                  <li>• Floating AI-inspired geometric shapes</li>
                  <li>• Gradient mesh with grid patterns</li>
                  <li>• Pulse wave animations</li>
                </ul>
              </div>

              <div className="p-6 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-3">🎯 Interactive Elements</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Real-time mouse tracking</li>
                  <li>• Animated stats counters</li>
                  <li>• Interactive CTA buttons with 3D effects</li>
                  <li>• Hover states with transforms</li>
                  <li>• Text reveal animations</li>
                </ul>
              </div>

              <div className="p-6 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-3">⚡ Performance</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• 60 FPS optimization</li>
                  <li>• Hardware-accelerated animations</li>
                  <li>• Reduced motion support</li>
                  <li>• Mobile-optimized interactions</li>
                  <li>• Performance monitoring</li>
                </ul>
              </div>

              <div className="p-6 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-3">🏥 Healthcare Aesthetics</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Professional medical color scheme</li>
                  <li>• DNA helix and neural network shapes</li>
                  <li>• Trustworthy design elements</li>
                  <li>• WCAG AA accessibility compliance</li>
                  <li>• Healthcare-appropriate animations</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 space-y-4">
              <h3 className="text-2xl font-semibold">Technical Specifications</h3>

              <div className="bg-muted/50 rounded-lg p-6 text-left">
                <h4 className="font-semibold mb-3">Core Technologies:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <strong>Framework:</strong> Next.js 15
                  </div>
                  <div>
                    <strong>Animation:</strong> Framer Motion
                  </div>
                  <div>
                    <strong>Styling:</strong> Tailwind CSS
                  </div>
                  <div>
                    <strong>TypeScript:</strong> Full type safety
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-6 text-left">
                <h4 className="font-semibold mb-3">Performance Targets:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <strong>FPS:</strong> 60+ (desktop)
                  </div>
                  <div>
                    <strong>FPS:</strong> 30+ (mobile)
                  </div>
                  <div>
                    <strong>Load Time:</strong> &lt; 2s
                  </div>
                  <div>
                    <strong>Core Web Vitals:</strong> &gt; 90
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 space-y-4">
              <h3 className="text-2xl font-semibold">Navigation</h3>
              <p className="text-muted-foreground">
                Explore more of the Corvo Labs website to see how the hero section integrates with the rest of the application.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="/">Back to Home</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/projects">View Projects</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/about">About Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}