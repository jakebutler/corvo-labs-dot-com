'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Filter, Users, Target, Award, Heart, BarChart3, Zap, Calendar, MapPin } from 'lucide-react'
import { EnhancedCTA } from '@/components/enhanced-cta'
import { HeroBackground } from '@/components/hero/HeroBackground'
import { cn } from '@/lib/utils'
import { NumberTicker } from '@/components/magicui/number-ticker'
import { BlurFade } from '@/components/magicui/blur-fade'
import { ShimmerButton } from '@/components/magicui/shimmer-button'
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text'
import Link from 'next/link'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const categories = [
  { id: 'all', label: 'All Projects', icon: Target },
  { id: 'clinical', label: 'Clinical Applications', icon: Heart },
  { id: 'administrative', label: 'Administrative Automation', icon: BarChart3 },
  { id: 'patient', label: 'Patient Engagement', icon: Users },
  { id: 'analytics', label: 'Data Analytics', icon: Zap }
]

const projects = [
  {
    id: 1,
    title: "Kinisi",
    category: "patient",
    client: "Kinisi Health",
    location: "San Francisco, CA",
    duration: "12 weeks",
    challenge: "Generic fitness apps fail to safely accommodate users with medical conditions, injuries, or specific time constraints, leading to low adherence and increased risk of re-injury.",
    solution: "Built a clinical-grade AI training companion that conducts a dynamic medical intake to generate fully personalized safe workout plans, integrating directly with users' calendars for accountability.",
    process: [
      "Designed clinical safety conversational protocol",
      "Implemented Gemini 2.0-powered generation engine",
      "Integrated WorkOS for secure enterprise authentication",
      "Built real-time Google Calendar scheduling sync",
      "Engineered reactive mobile-first interface"
    ],
    results: [
      "Reduced program generation time to under 30 seconds",
      "100% compliance with user medical constraints",
      "Seamless integration with Google Calendar API",
      "Zero-latency interactive chat experience"
    ],
    technologies: [
      "Next.js App Router",
      "Gemini 2.0 Flash",
      "WorkOS AuthKit",
      "PostHog Analytics",
      "Google Calendar API"
    ],
    image: "/images/kinisi-dashboard.jpg"
  },
  {
    id: 2,
    title: "CalPal Nutrition Calculator",
    category: "clinical",
    client: "Corvo Labs Product",
    location: "United States",
    duration: "8 weeks",
    challenge: "Nutrition professionals were losing 15-20 minutes per day switching between browser tabs, re-entering patient data, and manually transferring calculation results back to their documentation. This workflow friction compounded across 15-20 client encounters daily, reducing productivity and increasing the risk of data entry errors during critical patient consultations.",
    solution: "Developed a Chrome extension that delivers instant, professional-grade nutrition calculations directly within the browser workflow. CalPal provides BMR, TDEE, and macro calculations using multiple IBW formulas (Hamwi, Devine, Adjusted) in a clean 800x600px popup interface. The extension eliminates tab-switching and context loss, allowing dietitians to access accurate calculations with one click while maintaining focus on their primary work.",
    process: [
      "Conducted user research with licensed Registered Dietitians to identify workflow pain points",
      "Designed dual-calculator interface (Protein Range and Macros) with real-time calculations",
      "Implemented clinically validated formulas (Harris-Benedict BMR, multiple IBW methods)",
      "Built Chrome extension with React and modern UI components for seamless integration",
      "Tested with practicing dietitians and refined interface based on clinical workflow feedback"
    ],
    results: [
      "Eliminates tab-switching and saves 15-20 minutes per day per practitioner",
      "Reduces calculation time from 2-3 minutes to 10-15 seconds per patient",
      "Eliminates manual data re-entry, reducing transcription error risk to zero",
      "Supports multiple IBW formulas with frame adjustments for clinical flexibility",
      "Zero setup time—calculations available immediately after installation"
    ],
    technologies: [
      "Chrome Extension (Manifest V3)",
      "React & TypeScript",
      "Real-time Calculation Engine",
      "Clinical Formula Library"
    ],
    image: "/images/calpal-nutrition-calculator.jpg"
  },
  {
    id: 3,
    title: "Corvo Airlock",
    category: "clinical",
    client: "Coming Soon",
    location: "Remote",
    duration: "TBD",
    challenge: "Project details coming soon. This innovative healthcare solution will address critical challenges in clinical workflow automation.",
    solution: "We're currently developing an exciting new platform that will transform how healthcare professionals manage their daily workflows. Full details and implementation specifics will be available very soon.",
    process: [
      "Project requirements gathering and stakeholder interviews",
      "Technical architecture design and planning",
      "User experience research and prototyping",
      "Development and implementation phases",
      "Testing and quality assurance processes"
    ],
    results: [
      "Anticipated to significantly improve workflow efficiency",
      "Expected to reduce administrative burden on clinical staff",
      "Projected to enhance patient care delivery",
      "More detailed metrics and outcomes coming soon",
      "Implementation results will be shared post-launch"
    ],
    technologies: [
      "Technology stack to be announced",
      "Modern web framework",
      "Cloud-native architecture",
      "Security-first design principles"
    ],
    image: "/images/corvo-airlock-coming-soon.jpg"
  },
  {
    id: 4,
    title: "Pithy Jaunt",
    category: "patient",
    client: "Coming Soon",
    location: "Remote",
    duration: "TBD",
    challenge: "Project details coming soon. This patient engagement solution will focus on improving health outcomes through innovative technology and user-centered design.",
    solution: "We're crafting a unique digital experience that will transform how patients interact with healthcare services. The complete solution overview and technical details will be revealed shortly.",
    process: [
      "User research and persona development",
      "Competitive analysis and market research",
      "Product strategy and roadmap planning",
      "Design thinking and rapid prototyping",
      "Agile development and iterative testing"
    ],
    results: [
      "Expected to improve patient engagement metrics",
      "Anticipated to enhance user satisfaction scores",
      "Projected to increase treatment adherence",
      "Detailed performance metrics pending",
      "Results will be measured against industry benchmarks"
    ],
    technologies: [
      "Technology stack to be determined",
      "Mobile-first responsive design",
      "API-first architecture",
      "Analytics and measurement tools"
    ],
    image: "/images/pithy-jaunt-coming-soon.jpg"
  },
  {
    id: 5,
    title: "Hot Sauce",
    category: "administrative",
    client: "Coming Soon",
    location: "Remote",
    duration: "TBD",
    challenge: "Project details coming soon. This administrative automation platform will streamline complex healthcare operations and improve organizational efficiency.",
    solution: "We're developing a comprehensive solution that will revolutionize administrative workflows in healthcare settings. Full project details and technical specifications will be available soon.",
    process: [
      "Stakeholder requirement gathering",
      "Business process mapping and optimization",
      "System architecture and integration planning",
      "Development and testing cycles",
      "Deployment and change management"
    ],
    results: [
      "Expected to reduce administrative overhead significantly",
      "Anticipated to improve operational efficiency",
      "Projected to enhance staff productivity",
      "ROI calculations and metrics pending",
      "Detailed impact assessment to follow"
    ],
    technologies: [
      "Enterprise-grade platform technologies",
      "Integration with existing healthcare systems",
      "Robust security and compliance features",
      "Scalable cloud infrastructure"
    ],
    image: "/images/hot-sauce-coming-soon.jpg"
  }
]

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedProject, setExpandedProject] = useState<number | null>(null)

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory)

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center">
        <HeroBackground className="absolute inset-0 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1
              variants={fadeIn}
              className="text-display text-5xl md:text-6xl xl:text-7xl mb-6 text-gray-900"
              style={{
                fontFamily: 'var(--font-cabinet-grotesk)',
                fontWeight: 900,
                lineHeight: 0.85,
                letterSpacing: '-0.02em'
              }}
            >
              Healthcare <AnimatedGradientText colorFrom="#FF6B47" colorTo="#9c40ff" className="text-5xl md:text-6xl xl:text-7xl">AI Success Stories</AnimatedGradientText>
            </motion.h1>
            <motion.p
              variants={fadeIn}
              className="text-body text-xl md:text-2xl text-gray-600 leading-relaxed mb-8"
            >
              Explore our portfolio of successful AI implementations across healthcare workflows.
              See real results and measurable outcomes from our consulting projects.
            </motion.p>
            <motion.div
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/contact">
                <ShimmerButton className="px-8 py-3 text-lg inline-flex items-center justify-center">
                  <span className="text-white font-semibold">Discuss Your Use Case</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </ShimmerButton>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Project Stats */}
      <section className="py-16 bg-accent text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {[
                { number: 200, suffix: "%", label: "Average ROI" },
                { number: 1000, suffix: "s", label: "Hours Saved" },
                { number: 24, suffix: "/7", label: "Support Coverage" }
              ].map((stat, index) => (
                <BlurFade key={index} delay={index * 100} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2">
                    <NumberTicker value={stat.number} />
                    {stat.suffix}
                  </div>
                  <div className="text-sm md:text-base opacity-90">{stat.label}</div>
                </BlurFade>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center mb-6">
              <Filter className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-gray-700 font-medium">Filter by Category:</span>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <motion.button
                    key={category.id}
                    variants={fadeIn}
                    onClick={() => setSelectedCategory(category.id)}
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200",
                      selectedCategory === category.id
                        ? "bg-accent text-white shadow-[0_0_20px_rgba(255,107,71,0.4)]"
                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 hover:border-accent/50"
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{category.label}</span>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 relative">
        <HeroBackground className="absolute inset-0 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <div className="space-y-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={fadeIn}
                  className="glass-card bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden hover:shadow-[0_0_40px_rgba(255,107,71,0.2)] transition-all duration-300 border border-gray-200/50"
                >
                  <div className="p-8 md:p-12">
                    <div className="flex flex-col md:flex-row md:items-start md:space-x-8">
                      {/* Project Header */}
                      <div className="md:w-1/3 mb-6 md:mb-0">
                        <div className="flex items-center space-x-2 text-accent font-semibold mb-3">
                          <MapPin className="h-4 w-4" />
                          <span>{project.location}</span>
                        </div>
                        <h3 className="text-heading text-2xl font-bold text-gray-900 mb-3">{project.title}</h3>
                        <p className="text-body text-lg text-gray-700 font-medium mb-4">{project.client}</p>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-gray-500">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span className="text-sm">{project.duration}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 3).map((tech, idx) => (
                            <span key={idx} className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs border border-accent/20">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Project Details */}
                      <div className="md:w-2/3">
                        <div className="mb-6">
                          <h4 className="text-heading text-lg font-semibold text-gray-900 mb-2">Challenge</h4>
                          <p className="text-body text-gray-600">{project.challenge}</p>
                        </div>

                        <div className="mb-6">
                          <h4 className="text-heading text-lg font-semibold text-gray-900 mb-2">Solution</h4>
                          <p className="text-body text-gray-600">{project.solution}</p>
                        </div>

                        <div className="mb-6">
                          <h4 className="text-heading text-lg font-semibold text-gray-900 mb-3">Key Results</h4>
                          <div className="grid md:grid-cols-2 gap-3">
                            {project.results.slice(0, expandedProject === project.id ? undefined : 2).map((result, idx) => (
                              <div key={idx} className="flex items-start space-x-2">
                                <Award className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700">{result}</span>
                              </div>
                            ))}
                          </div>
                          {project.results.length > 2 && (
                            <button
                              onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                              className="text-accent font-semibold text-sm mt-3 hover:text-accent-600 transition-colors"
                            >
                              {expandedProject === project.id ? 'Show Less' : `Show ${project.results.length - 2} More Results`}
                            </button>
                          )}
                        </div>

                        {expandedProject === project.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border-t border-gray-200 pt-6"
                          >
                            <h4 className="text-heading text-lg font-semibold text-gray-900 mb-3">Implementation Process</h4>
                            <ol className="space-y-2">
                              {project.process.map((step, idx) => (
                                <li key={idx} className="flex items-start space-x-3">
                                  <span className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                                    {idx + 1}
                                  </span>
                                  <span className="text-body text-gray-700">{step}</span>
                                </li>
                              ))}
                            </ol>

                            <div className="mt-6">
                              <h4 className="text-heading text-lg font-semibold text-gray-900 mb-3">Technologies Used</h4>
                              <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, idx) => (
                                  <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm border border-gray-200">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No projects found in this category.</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <EnhancedCTA />
    </>
  )
}