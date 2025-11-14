"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ScrollReveal,
  AnimatedCounter,
  ProgressIndicator,
  InteractiveHover
} from '@/components/animations/animation-primitives'

// Service data structure
interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  outcome: string
  stats?: {
    metric: string
    value: number
    suffix: string
  }
  color: string
  gradient: string
}

const services: Service[] = [
  {
    id: 'strategy',
    title: 'AI Strategy & Consulting',
    description: 'Strategic guidance for AI adoption, roadmap development, and change management.',
    icon: '🧭',
    features: [
      'AI Readiness Assessment',
      'Technology Stack Planning',
      'ROI Analysis & Business Case',
      'Change Management Strategy'
    ],
    outcome: 'Clear AI roadmap with measurable business outcomes',
    stats: { metric: 'Strategy Success', value: 95, suffix: '%' },
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-600'
  },
  {
    id: 'workflow',
    title: 'Workflow Automation',
    description: 'Design and implementation of AI-powered workflows that transform business processes.',
    icon: '⚙️',
    features: [
      'Process Mapping & Analysis',
      'AI Integration Design',
      'Automation Implementation',
      'Performance Monitoring'
    ],
    outcome: '30-70% reduction in manual processing time',
    stats: { metric: 'Time Saved', value: 50, suffix: '%' },
    color: 'purple',
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    id: 'implementation',
    title: 'AI Implementation',
    description: 'End-to-end implementation from prototype to production-ready AI solutions.',
    icon: '🚀',
    features: [
      'Proof of Concept Development',
      'Model Training & Validation',
      'System Integration',
      'Deployment & Monitoring'
    ],
    outcome: 'Production-ready AI solutions in 12-16 weeks',
    stats: { metric: 'Projects Delivered', value: 50, suffix: '+' },
    color: 'green',
    gradient: 'from-green-500 to-teal-600'
  }
]

export function ServicesEnhanced() {
  const [activeService, setActiveService] = useState<string | null>(null)
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const serviceVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1
    }
  }

  const detailVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      y: -20
    },
    visible: {
      opacity: 1,
      height: 'auto',
      y: 0
    }
  }

  return (
    <section id="services" className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
            Our Services
          </div>

          <h2 className="text-fluid-large font-display font-bold mb-6 text-gray-900">
            Comprehensive AI Solutions for
            <span className="text-gradient-ai"> Modern Business</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            From strategy to implementation, we provide end-to-end AI consulting services
            that transform complex challenges into competitive advantages.
          </p>
        </ScrollReveal>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="relative"
              variants={serviceVariants}
              layoutId={`service-${service.id}`}
              transition={{
                duration: 0.6,
                ease: "easeOut"
              }}
            >
              <InteractiveHover
                className="h-full"
                disabled={false}
              >
                <motion.div
                  className={`glass-card p-8 h-full cursor-pointer border-2 border-transparent hover:border-${service.color}-200 transition-all duration-300`}
                  whileHover={{
                    y: -8,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
                  }}
                  onClick={() => setActiveService(activeService === service.id ? null : service.id)}
                >
                  {/* Service Icon */}
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg`}
                    whileHover={{
                      scale: 1.1,
                      rotate: [0, -5, 5, 0]
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {service.icon}
                  </motion.div>

                  {/* Service Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>

                  {/* Service Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Key Features */}
                  <div className="space-y-3 mb-6">
                    {service.features.slice(0, 3).map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        className="flex items-center space-x-3"
                        onHoverStart={() => setHoveredFeature(featureIndex)}
                        onHoverEnd={() => setHoveredFeature(null)}
                      >
                        <motion.div
                          className={`w-2 h-2 bg-${service.color}-500 rounded-full flex-shrink-0`}
                          animate={{
                            scale: hoveredFeature === featureIndex ? 1.5 : 1
                          }}
                          transition={{ duration: 0.2 }}
                        />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Stats */}
                  {service.stats && (
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div>
                        <div className={`text-2xl font-bold text-${service.color}-600`}>
                          <AnimatedCounter
                            value={service.stats.value}
                            duration={2}
                            suffix={service.stats.suffix}
                          />
                        </div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide">
                          {service.stats.metric}
                        </div>
                      </div>

                      <motion.div
                        className={`w-10 h-10 bg-${service.color}-100 rounded-full flex items-center justify-center text-${service.color}-600`}
                        animate={{
                          rotate: activeService === service.id ? 180 : 0
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              </InteractiveHover>
            </motion.div>
          ))}
        </motion.div>

        {/* Expanded Service Details */}
        <AnimatePresence>
          {activeService && (
            <motion.div
              className="mb-16"
              layoutId={`service-details-${activeService}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {services.filter(service => service.id === activeService).map(service => (
                <motion.div
                  key={service.id}
                  className="glass-card p-8 md:p-12"
                  variants={detailVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{
                    duration: 0.4,
                    ease: "easeOut"
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Detailed Features */}
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-6">
                        Complete Service Details
                      </h4>
                      <div className="space-y-4">
                        {service.features.map((feature, index) => (
                          <motion.div
                            key={index}
                            className="flex items-start space-x-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className={`w-6 h-6 bg-gradient-to-br ${service.gradient} rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5`}>
                              {index + 1}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 mb-1">{feature}</div>
                              <div className="text-sm text-gray-600">
                                Detailed explanation of this service component and how it benefits your organization.
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Expected Outcomes */}
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-6">
                        Expected Outcomes
                      </h4>
                      <div className={`p-6 bg-gradient-to-br ${service.gradient} rounded-2xl text-white mb-6`}>
                        <div className="text-2xl font-bold mb-2">
                          {service.outcome}
                        </div>
                      </div>

                      {/* Progress Indicators */}
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Implementation Progress</span>
                            <span className="font-medium text-gray-900">85%</span>
                          </div>
                          <ProgressIndicator value={85} max={100} color={`var(--accent-${service.color}-blue)`} />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Client Satisfaction</span>
                            <span className="font-medium text-gray-900">92%</span>
                          </div>
                          <ProgressIndicator value={92} max={100} color={`var(--accent-${service.color}-blue)`} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Section */}
                  <motion.div
                    className="mt-8 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.button
                      className={`px-8 py-4 bg-gradient-to-r ${service.gradient} text-white rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                      }}
                    >
                      Discuss {service.title}
                    </motion.button>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Process Timeline */}
        <ScrollReveal className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Our Proven Process
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A structured approach to ensure successful AI implementation and measurable business outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', description: 'Assess needs and opportunities' },
              { step: '02', title: 'Strategy', description: 'Develop AI roadmap and plan' },
              { step: '03', title: 'Implementation', description: 'Build and deploy solutions' },
              { step: '04', title: 'Optimization', description: 'Monitor and improve performance' }
            ].map((phase, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-center">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {phase.step}
                  </motion.div>
                  <h4 className="font-bold text-gray-900 mb-2">{phase.title}</h4>
                  <p className="text-sm text-gray-600">{phase.description}</p>
                </div>

                {/* Connection Line */}
                {index < 3 && (
                  <motion.div
                    className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-purple-200"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                    style={{ originX: 0 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}