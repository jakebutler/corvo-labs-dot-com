'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export function EnhancedCTA() {
  return (
    <section className="py-20 text-white relative overflow-hidden">
      {/* Gradient Background */}
      <div
        className="absolute inset-0 opacity-100"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 222, 65, 1) 0%, rgba(255, 161, 55, 1) 25%, rgba(255, 90, 60, 1) 45%, rgba(245, 52, 100, 1) 65%, rgba(183, 33, 134, 1) 82%, rgba(81, 29, 142, 1) 100%)',
          filter: 'blur(0.5px)',
          maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.85) 15%, rgba(0, 0, 0, 0.95) 30%, rgba(0, 0, 0, 1) 45%, rgba(0, 0, 0, 1) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.85) 15%, rgba(0, 0, 0, 0.95) 30%, rgba(0, 0, 0, 1) 45%, rgba(0, 0, 0, 1) 100%)'
        }}
      />
      <div className="relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Workflow?
            </motion.h2>
            <motion.p variants={fadeIn} className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Let's discuss how tailored solutions can help your team achieve more with less effort.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule a Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}