'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Clock, Shield, Zap, Users, Target, Award, BarChart3, Cpu, FileText } from 'lucide-react'
import { EnhancedCTA } from '@/components/enhanced-cta'
import { cn } from '@/lib/utils'
import { BlurFade } from '@/components/magicui/blur-fade'
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text'
import { ShimmerButton } from '@/components/magicui/shimmer-button'
import { BentoCard, BentoGrid } from '@/components/ui/bento-grid'
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

interface Service {
  icon: string
  title: string
  description: string
  features: string[]
  process: string[]
  duration: string
  deliverables: string[]
}

const services: Service[] = [
  {
    icon: "/images/ai-strategy-roadmap-no-bg.png",
    title: "Product Strategy & Development",
    description: "We don't just plan; we build. From embedded roadmap development to forward-deployed engineering, we partner with you to ship high-impact AI products.",
    features: [
      "AI Product Roadmap & Architecture",
      "MVP Design & Prototyping",
      "Embedded Team Integration",
      "Go-to-Market Strategy",
      "Risk assessment and mitigation strategies"
    ],
    process: ["Discovery", "Analysis", "Strategy", "Roadmap"],
    duration: "4-6 weeks",
    deliverables: ["AI Product Roadmap", "MVP Designs", "Architecture Doc", "GTM Strategy"]
  },
  {
    icon: "/images/healthcare-workflow-automation-no-bg.png",
    title: "Healthcare Workflow Automation",
    description: "Production-ready automation systems designed for scale. We architect reusable workflows that streamline clinical and administrative operations.",
    features: [
      "End-to-End Workflow Architecture",
      "Production-Ready Automation Scripts",
      "Scalable Logic Reusability",
      "Performance Analytics Dashboards",
      "Integration with existing healthcare systems"
    ],
    process: ["Mapping", "Design", "Prototyping", "Validation"],
    duration: "8-12 weeks",
    deliverables: ["Workflow Architecture", "Automation Scripts", "Analytics Dashboards", "Documentation"]
  },
  {
    icon: "/images/implementation-technical-support-no-bg.png",
    title: "Design & Technical Implementation",
    description: "A complete fusion of product design and engineering. We handle everything from UI/UX to backend deployment, ensuring your solution is as beautiful as it is functional.",
    features: [
      "Full-Stack Development",
      "UI/UX Design Systems",
      "System Integration",
      "Ongoing Engineering Support",
      "Performance monitoring and optimization"
    ],
    process: ["Development", "Deployment", "Training", "Support"],
    duration: "8-24+ weeks",
    deliverables: ["Full-Stack Application", "Design System", "Integration Code", "Support Plan"]
  }
]

const features = [
  {
    Icon: Users,
    name: "Clinical Workflows",
    description: "Patient triage, decision support, and care coordination.",
    href: "/contact",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute top-10 left-10 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-full h-full bg-accent/5 rounded-lg transform rotate-3" />
      </div>
    ),
  },
  {
    Icon: FileText,
    name: "Administrative Processes",
    description: "Revenue cycle, claims processing, and scheduling.",
    href: "/contact",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute top-10 left-10 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-full h-full bg-accent/5 rounded-lg transform -rotate-3" />
      </div>
    ),
  },
  {
    Icon: BarChart3,
    name: "Patient Engagement",
    description: "Intelligent communication and remote monitoring.",
    href: "/contact",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute top-10 left-10 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-full h-full bg-accent/5 rounded-lg transform rotate-2" />
      </div>
    ),
  },
  {
    Icon: Zap,
    name: "Data Analytics",
    description: "Population health insights and operational intelligence.",
    href: "/contact",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute top-10 left-10 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-full h-full bg-accent/5 rounded-lg transform -rotate-2" />
      </div>
    ),
  },
  {
    Icon: Shield,
    name: "Compliance & Security",
    description: "HIPAA-compliant infrastructure, SOC2 readiness, and Joint Commission AI guidelines. Security isn't a feature—it's our foundation.",
    href: "/contact",
    cta: "View Security Standards",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute top-10 left-10 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-full h-full bg-accent/5 rounded-lg transform rotate-1" />
      </div>
    ),
  },
]



export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[70vh] flex items-center justify-center bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1
              variants={fadeIn}
              className="text-display text-5xl md:text-6xl xl:text-7xl text-gray-900 mb-6"
              style={{
                fontFamily: 'var(--font-cabinet-grotesk)',
                fontWeight: 900,
                lineHeight: 0.85,
                letterSpacing: '-0.02em'
              }}
            >
              Healthcare Technology Solutions
            </motion.h1>
            <motion.p
              variants={fadeIn}
              className="text-body text-xl md:text-2xl text-gray-600 leading-relaxed mb-8"
            >
              From strategy to implementation, we deliver comprehensive technology solutions that transform
              healthcare workflows while maintaining HIPAA compliance and delivering measurable ROI.
            </motion.p>
            <motion.div
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/contact">
                <ShimmerButton className="px-8 py-3 text-lg inline-flex items-center justify-center">
                  <span className="text-white font-semibold">Schedule Technology Assessment</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </ShimmerButton>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <BlurFade delay={0} className="text-center mb-16">
              <h2 className="text-display text-4xl md:text-5xl xl:text-6xl text-gray-900 mb-6">
                Comprehensive AI Consulting for <AnimatedGradientText colorFrom="#FF6B47" colorTo="#9c40ff" className="text-4xl md:text-5xl xl:text-6xl">Healthcare</AnimatedGradientText>
              </h2>
              <p className="text-body text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Our three-pillar approach ensures successful AI adoption from initial strategy through ongoing optimization.
              </p>
            </BlurFade>

            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <BlurFade key={index} delay={index * 150}>
                  <div className="group text-center relative overflow-hidden p-8 bg-white border border-gray-200 rounded-xl hover:bg-accent-50 hover:border-accent-200 transition-all duration-300">
                    <div className="mb-6 flex justify-center">
                      <img
                        src={service.icon}
                        alt={service.title}
                        className="h-32 w-32 object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-black mb-4 group-hover:text-accent-600 transition-colors duration-300">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                    <div className="flex items-center justify-center text-accent font-semibold mb-6">
                      <Clock className="h-4 w-4 mr-2" />
                      {service.duration}
                    </div>

                    <div className="text-left space-y-4">
                      <div>
                        <h4 className="text-lg font-semibold text-black mb-3">Key Features</h4>
                        <div className="space-y-2">
                          {service.features.slice(0, 3).map((feature, idx) => (
                            <div key={idx} className="flex items-start space-x-2">
                              <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-black mb-2">Process</h4>
                        <div className="flex flex-wrap gap-1 justify-center">
                          {service.process.map((step, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700">
                              {step}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-black mb-2">Deliverables</h4>
                        <div className="space-y-1">
                          {service.deliverables.slice(0, 2).map((deliverable, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                              <span className="text-xs text-gray-700">{deliverable}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Deep Healthcare Expertise (Bento Grid) */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={fadeIn} className="text-center mb-16">
              <h2 className="text-display text-4xl md:text-5xl xl:text-6xl text-gray-900 mb-6">
                Deep <AnimatedGradientText colorFrom="#FF6B47" colorTo="#9c40ff" className="text-4xl md:text-5xl xl:text-6xl">Healthcare Expertise</AnimatedGradientText>
              </h2>
              <p className="text-body text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Where clinical insight meets enterprise security. We combine deep domain knowledge with rigorous compliance standards.
              </p>
            </motion.div>

            <BentoGrid className="lg:grid-rows-2">
              {features.map((feature) => (
                <BentoCard key={feature.name} {...feature} />
              ))}
            </BentoGrid>
          </motion.div>
        </div>
      </section>

      {/* Engagement Model */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeIn}>
              <h2 className="text-display text-4xl md:text-5xl xl:text-6xl text-gray-900 mb-6">
                Our Engagement Model
              </h2>
              <p className="text-body text-xl text-gray-600 mb-12 leading-relaxed">
                Transparent pricing and clear project timelines ensure successful outcomes.
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white rounded-xl p-8 md:p-12 shadow-sm">
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-black mb-2">Discovery Phase</h3>
                  <p className="text-gray-600">Free initial consultation and needs assessment</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-black mb-2">Implementation</h3>
                  <p className="text-gray-600">Fixed-price project with clear deliverables</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-black mb-2">Ongoing Support</h3>
                  <p className="text-gray-600">Monthly retainers available for optimization</p>
                </div>
              </div>

              <div className="border-t pt-8">
                <p className="text-gray-600 mb-4">
                  Most projects range from <span className="font-bold text-black">$50,000 - $200,000</span> depending on scope and complexity.
                </p>
                <p className="text-sm text-gray-500">
                  Custom pricing available for enterprise clients and multi-facility implementations.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <EnhancedCTA />
    </>
  )
}