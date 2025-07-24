import { BrandHero } from '@/components/brand-hero'
import { HeroSection } from '@/components/hero-section'
import { ExpertiseSection } from '@/components/expertise-section'
import { FeaturedProjects } from '@/components/featured-projects'
import { CtaSection } from '@/components/cta-section'
import { NewsletterCta } from '@/components/newsletter-cta'

export default function Home() {
  return (
    <div className="min-h-screen">
      <BrandHero />
      <HeroSection />
      <ExpertiseSection />
      <FeaturedProjects />
      <CtaSection />
      <NewsletterCta
        source="homepage"
        title="Stay Ahead of the Curve"
        description="Get exclusive insights on AI innovation, product strategy, and emerging technologies. Join industry professionals who trust our expertise."
      />
    </div>
  )
}
