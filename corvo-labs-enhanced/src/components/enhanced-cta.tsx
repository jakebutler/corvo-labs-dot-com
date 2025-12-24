'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { ShimmerButton } from '@/components/magicui/shimmer-button'
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text'
import Link from 'next/link'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export function EnhancedCTA() {
  return (
    <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 2px, transparent 2px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>
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
              Ready to <AnimatedGradientText colorFrom="#ffaa40" colorTo="#9c40ff" className="text-3xl md:text-4xl">Transform</AnimatedGradientText> Your Workflow?
            </motion.h2>
            <motion.p variants={fadeIn} className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Let's discuss how tailored solutions can help your team achieve more with less effort.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <ShimmerButton className="px-8 py-3 text-lg inline-flex items-center justify-center">
                  <span className="text-white font-semibold">Schedule a Consultation</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </ShimmerButton>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}