'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, CheckCircle, ArrowRight, Sparkles } from 'lucide-react'

// Trust Building Section
export function TrustSection() {
  const stats = [
    { value: '95%', label: 'Client Satisfaction', delay: 0.2 },
    { value: '50+', label: 'AI Projects Delivered', delay: 0.4 },
    { value: '3x', label: 'Average ROI Increase', delay: 0.6 },
    { value: '24/7', label: 'Support Availability', delay: 0.8 }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Trusted by <span className="text-gradient">Industry Leaders</span>
          </h2>
          <p className="text-xl text-gray-600">
            Our track record speaks for itself
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: stat.delay }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-black text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Interactive Services Section
export function InteractiveServices() {
  const [activeService, setActiveService] = useState(0)

  const services = [
    {
      title: 'AI Strategy & Consulting',
      description: 'Transform your business with cutting-edge AI solutions tailored to your unique challenges.',
      icon: '🤖',
      color: 'from-indigo-500 to-purple-600',
      features: ['Custom AI Roadmap', 'Technical Feasibility Analysis', 'Implementation Planning']
    },
    {
      title: 'Healthcare Innovation',
      description: 'Revolutionize patient care and medical workflows with AI-powered solutions.',
      icon: '🏥',
      color: 'from-blue-500 to-cyan-600',
      features: ['Medical AI Integration', 'Patient Experience Design', 'Regulatory Compliance']
    },
    {
      title: 'UX & Product Design',
      description: 'Create intuitive, delightful experiences that users love and drive business results.',
      icon: '🎨',
      color: 'from-purple-500 to-pink-600',
      features: ['User Research & Testing', 'Design Systems', 'Prototyping & Iteration']
    },
    {
      title: 'Rapid Prototyping',
      description: 'Turn ideas into working prototypes in days, not months. Test and validate quickly.',
      icon: '⚡',
      color: 'from-orange-500 to-red-600',
      features: ['MVP Development', 'Proof of Concepts', 'Agile Development']
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How We <span className="text-gradient">Transform</span> Your Business
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            End-to-end solutions from strategy to implementation
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Service Tabs */}
          <div className="space-y-4">
            {services.map((service, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveService(index)}
                className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                  activeService === index
                    ? 'bg-white shadow-xl border-2 border-indigo-500'
                    : 'bg-white/50 border-2 border-transparent hover:bg-white hover:shadow-lg'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center text-2xl`}>
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {service.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${
                    activeService === index ? 'rotate-90 text-indigo-500' : 'text-gray-400'
                  }`} />
                </div>
              </motion.button>
            ))}
          </div>

          {/* Service Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${services[activeService].color} flex items-center justify-center text-3xl mb-6`}>
                {services[activeService].icon}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {services[activeService].title}
              </h3>

              <p className="text-gray-600 mb-6">
                {services[activeService].description}
              </p>

              <div className="space-y-3 mb-8">
                {services[activeService].features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 bg-gradient-to-r ${services[activeService].color} text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300`}
              >
                Explore {services[activeService].title}
                <ArrowRight className="inline-block w-5 h-5 ml-2" />
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

// High-Conversion CTA Section
export function HighConversionCTA() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-700 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-white/10 backdrop-blur-sm"></div>
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-purple-400/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>

          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join 50+ companies that have revolutionized their operations with our AI solutions.
          </p>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:border-white/40 transition-colors"
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:shadow-xl transition-all duration-300"
                >
                  Get Started Free
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto"
              >
                <div className="text-white text-lg font-semibold">
                  🎉 Welcome aboard! Check your email for next steps.
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-white/80 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Free consultation</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}