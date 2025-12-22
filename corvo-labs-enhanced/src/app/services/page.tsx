'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Clock, Shield, Zap, Users, Target, Award, BarChart3, Cpu, FileText } from 'lucide-react'
import { EnhancedCTA } from '@/components/enhanced-cta'
import { cn } from '@/lib/utils'

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
    title: "AI Strategy & Roadmap Development",
    description: "Comprehensive assessment and strategic planning for AI implementation in healthcare settings.",
    features: [
      "Current workflow analysis and gap identification",
      "AI readiness assessment and feasibility studies",
      "ROI analysis and business case development",
      "Technology roadmap and implementation timeline",
      "Risk assessment and mitigation strategies"
    ],
    process: ["Discovery", "Analysis", "Strategy", "Roadmap"],
    duration: "4-6 weeks",
    deliverables: ["AI Strategy Document", "Implementation Roadmap", "ROI Analysis", "Risk Assessment"]
  },
  {
    icon: "/images/healthcare-workflow-automation-no-bg.png",
    title: "Healthcare Workflow Automation",
    description: "Design and implementation of AI-powered workflows that enhance efficiency and patient care.",
    features: [
      "Clinical workflow optimization",
      "Administrative process automation",
      "Patient engagement solutions",
      "Data analytics and reporting",
      "Integration with existing healthcare systems"
    ],
    process: ["Mapping", "Design", "Prototyping", "Validation"],
    duration: "8-12 weeks",
    deliverables: ["Workflow Designs", "Automated Solutions", "Integration Plans", "Performance Metrics"]
  },
  {
    icon: "/images/implementation-technical-support-no-bg.png",
    title: "Implementation & Technical Support",
    description: "End-to-end implementation with ongoing support and optimization for maximum impact.",
    features: [
      "Technical implementation and deployment",
      "Staff training and change management",
      "HIPAA compliance and security setup",
      "Performance monitoring and optimization",
      "Ongoing maintenance and support"
    ],
    process: ["Development", "Deployment", "Training", "Support"],
    duration: "12-16 weeks",
    deliverables: ["Deployed Solutions", "Training Programs", "Documentation", "Support Plans"]
  }
]

interface Specialization {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  examples: string[]
}

const specializations: Specialization[] = [
  {
    icon: Users,
    title: "Clinical Workflows",
    description: "Technology solutions for patient care, clinical decision support, and medical workflow optimization.",
    examples: ["Patient triage automation", "Clinical decision support", "Treatment planning assistance"]
  },
  {
    icon: FileText,
    title: "Administrative Processes",
    description: "Streamlining healthcare operations through intelligent automation of administrative tasks.",
    examples: ["Medical coding automation", "Insurance claims processing", "Appointment scheduling"]
  },
  {
    icon: BarChart3,
    title: "Patient Engagement",
    description: "Enhancing patient experience and outcomes through AI-powered communication and monitoring.",
    examples: ["Patient communication bots", "Remote monitoring systems", "Personalized care plans"]
  },
  {
    icon: Zap,
    title: "Data Analytics",
    description: "Transforming healthcare data into actionable insights for improved decision-making.",
    examples: ["Predictive analytics", "Population health analysis", "Operational intelligence"]
  }
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
                fontFamily: 'var(--font-serif)',
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
              <motion.button
                className="btn-organic px-8 py-3 text-lg inline-flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Technology Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </motion.button>
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
            <motion.div variants={fadeIn} className="text-center mb-16">
              <h2 className="text-display text-4xl md:text-5xl xl:text-6xl text-gray-900 mb-6">
                Comprehensive AI Consulting for Healthcare
              </h2>
              <p className="text-body text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Our three-pillar approach ensures successful AI adoption from initial strategy through ongoing optimization.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="bg-white rounded-xl p-8 shadow-sm text-center"
                >
                  <div className="mb-6 flex justify-center">
                    <img
                      src={service.icon}
                      alt={service.title}
                      className="h-32 w-32 object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-4">{service.title}</h3>
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
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Healthcare Specializations */}
      <section className="py-20 bg-white">
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
                Healthcare Specializations
              </h2>
              <p className="text-body text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Industry-specific technology solutions designed to address the unique challenges of healthcare environments.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {specializations.map((spec, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="p-8 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <spec.icon className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-black mb-3">{spec.title}</h3>
                      <p className="text-gray-600 mb-4">{spec.description}</p>
                      <div className="space-y-2">
                        {spec.examples.map((example, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                            <span className="text-sm text-gray-700">{example}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Compliance & Security */}
      <section className="py-20 bg-accent text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto text-center"
          >
            <motion.div variants={fadeIn}>
              <Shield className="h-16 w-16 mx-auto mb-6" />
              <h2 className="text-display text-4xl md:text-5xl xl:text-6xl mb-6">
                Healthcare Compliance & Security
              </h2>
              <p className="text-body text-xl opacity-90 max-w-3xl mx-auto mb-12 leading-relaxed">
                Every solution we deliver meets the highest standards of healthcare security and regulatory compliance.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  title: "CHAI Guidelines",
                  description: (
                    <>
                      We follow{" "}
                      <a
                        href="https://digitalassets.jointcommission.org/api/public/content/dcfcf4f1a0cc45cdb526b3cb034c68c2"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:opacity-80 transition-opacity"
                      >
                        Responsible Use of AI in Healthcare
                      </a>
                      {" "}guidelines established by the Joint Commission and the Coalition for Health AI.
                    </>
                  )
                },
                {
                  title: "Data Security",
                  description: "Enterprise-grade security with encryption, access controls, and audit trails."
                }
              ].map((compliance, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{compliance.title}</h3>
                  <p className="opacity-90">{compliance.description}</p>
                </motion.div>
              ))}
            </div>
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