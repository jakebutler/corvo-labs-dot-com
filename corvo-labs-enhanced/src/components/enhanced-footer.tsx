'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const footerLinks = {
  services: [
    { label: 'AI Strategy & Roadmap', href: '/services' },
    { label: 'Workflow Automation', href: '/services' },
    { label: 'Implementation Support', href: '/services' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Projects', href: '/projects' },
    { label: 'Blog', href: '/blog' },
  ],
  compliance: [
    { label: 'HIPAA Compliant', href: '/about' },
    { label: 'Security Standards', href: '/about' },
    { label: 'Healthcare Expertise', href: '/about' },
  ]
}

export function EnhancedFooter() {
  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255, 107, 71, 1) 2px, transparent 2px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Gradient Accent */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgb(255, 107, 71), transparent)'
        }}
      />

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-6xl mx-auto"
          >
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
              {/* Company Info */}
              <div className="lg:col-span-1">
                <motion.div variants={fadeIn} className="space-y-6">
                  <Link href="/" className="inline-block">
                    <img
                      src="/images/corvo-labs-stacked.svg"
                      alt="Corvo Labs"
                      className="h-12 w-auto opacity-90 hover:opacity-100 transition-opacity"
                    />
                  </Link>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    Transforming healthcare through responsible AI automation.
                    Delivering measurable results with deep healthcare expertise.
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <span>•</span>
                    <span>HIPAA Compliant</span>
                    <span>•</span>
                    <span>Healthcare Focused</span>
                  </div>
                </motion.div>
              </div>

              {/* Services Links */}
              <div>
                <motion.h3 variants={fadeIn} className="font-bold text-white mb-6 text-display">
                  Services
                </motion.h3>
                <motion.div variants={fadeIn} className="space-y-3">
                  {footerLinks.services.map((link) => (
                    <Link
                      key={`${link.label}-${link.href}`}
                      href={link.href}
                      className="block text-gray-300 hover:text-accent-400 transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              </div>

              {/* Company Links */}
              <div>
                <motion.h3 variants={fadeIn} className="font-bold text-white mb-6 text-display">
                  Company
                </motion.h3>
                <motion.div variants={fadeIn} className="space-y-3">
                  {footerLinks.company.map((link) => (
                    <Link
                      key={`${link.label}-${link.href}`}
                      href={link.href}
                      className="block text-gray-300 hover:text-accent-400 transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              </div>

              {/* Compliance & Trust */}
              <div>
                <motion.h3 variants={fadeIn} className="font-bold text-white mb-6 text-display">
                  Trust & Compliance
                </motion.h3>
                <motion.div variants={fadeIn} className="space-y-3">
                  {footerLinks.compliance.map((link) => (
                    <Link
                      key={`${link.label}-${link.href}`}
                      href={link.href}
                      className="block text-gray-300 hover:text-accent-400 transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-800 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <motion.div variants={fadeIn} className="text-gray-400 text-sm">
                  © 2024 Corvo Labs. All rights reserved.
                </motion.div>

                <motion.div variants={fadeIn} className="flex items-center space-x-6">
                  <span className="text-gray-400 text-sm">
                    Healthcare AI Experts
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-400 text-sm">Available 24/7</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}