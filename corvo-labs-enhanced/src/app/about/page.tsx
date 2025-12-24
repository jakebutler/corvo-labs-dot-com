'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Users, Target, Award, Heart, Lightbulb, Shield, Clock, CheckCircle } from 'lucide-react'
import { EnhancedCTA } from '@/components/enhanced-cta'
import { cn } from '@/lib/utils'
import { BlurFade } from '@/components/magicui/blur-fade'
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text'
import { TextAnimate } from '@/components/magicui/text-animate'
import { ShimmerButton } from '@/components/magicui/shimmer-button'
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

const timelineEvents = [
  {
    year: '2024',
    title: 'Corvo Labs Founded',
    description: 'Established to bridge the gap between AI innovation and healthcare implementation needs.',
    icon: 'bullseye'
  },
  {
    year: '2023-2024',
    title: 'Healthcare AI Research',
    description: 'Extensive research into healthcare workflow challenges and AI solution requirements.',
    icon: 'bullseye'
  },
  {
    year: '2020-2023',
    title: 'Healthcare Product Leadership',
    description: 'Led healthcare technology product teams through digital transformation initiatives.',
    icon: 'bullseye'
  },
  {
    year: '2015-2020',
    title: 'Enterprise AI Implementation',
    description: 'Deployed AI solutions across multiple industries with focus on workflow optimization.',
    icon: 'bullseye'
  }
]

export default function AboutPage() {
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
              Healthcare Technology Experts Delivering Measurable Results
            </motion.h1>
            <motion.p
              variants={fadeIn}
              className="text-body text-xl md:text-2xl text-gray-600 leading-relaxed mb-8"
            >
              Led by veteran healthcare product leaders, Corvo Labs combines deep healthcare experience with
              advanced automation technology to deliver responsible workflow solutions.
            </motion.p>
            <motion.div
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/contact">
                <ShimmerButton className="px-8 py-3 text-lg inline-flex items-center justify-center">
                  <span className="text-white font-semibold">Schedule Intro Call</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </ShimmerButton>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
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
                Our Mission: <AnimatedGradientText colorFrom="#FF6B47" colorTo="#9c40ff" className="text-4xl md:text-5xl xl:text-6xl">Responsible AI</AnimatedGradientText> for Healthcare
              </h2>
              <p className="text-body text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Empowering healthcare teams with responsible AI automation that enhances patient care,
                improves operational efficiency, and maintains the highest standards of data security and regulatory compliance.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              <motion.div variants={fadeIn} className="text-center">
                <div className="flex items-center justify-center mx-auto mb-6">
                  <img
                    src="/images/mission-no-bg.png"
                    alt="Mission icon"
                    className="h-40 w-40 object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To make advanced technology accessible and effective for healthcare organizations of all sizes while maintaining
                  HIPAA compliance and patient data security.
                </p>
              </motion.div>

              <motion.div variants={fadeIn} className="text-center">
                <div className="flex items-center justify-center mx-auto mb-6">
                  <img
                    src="/images/vision-no-bg.png"
                    alt="Vision icon"
                    className="h-40 w-40 object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  A future where every healthcare decision is augmented by intelligent AI systems,
                  leading to better patient outcomes, more efficient care delivery, and reduced healthcare costs.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Healthcare Domain Expertise */}
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
                Healthcare <AnimatedGradientText colorFrom="#FF6B47" colorTo="#9c40ff" className="text-4xl md:text-5xl xl:text-6xl">Domain Expertise</AnimatedGradientText>
              </h2>
              <p className="text-body text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We understand healthcare because we've lived it. Our team brings extensive experience
                in healthcare operations, regulatory compliance, and clinical workflows.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "/images/regulatory-compliance-no-bg.png",
                  title: "Regulatory Compliance",
                  description: "Deep expertise in HIPAA, FDA regulations, and healthcare data privacy requirements."
                },
                {
                  icon: "/images/healthcare-workflow-automation-no-bg.png",
                  title: "Clinical Workflows",
                  description: "Understanding of patient care processes, clinical decision-making, and medical workflows."
                },
                {
                  icon: "/images/healthcare-operations-no-bg.png",
                  title: "Healthcare Operations",
                  description: "Experience with hospital administration, healthcare IT systems, and operational efficiency."
                }
              ].map((expertise, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="text-center p-8 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="w-80 h-80 flex items-center justify-center mx-auto mb-6">
                    <img
                      src={expertise.icon}
                      alt={`${expertise.title} icon`}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-3">{expertise.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{expertise.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leadership Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeIn} className="text-center mb-16">
              <h2 className="text-display text-4xl md:text-5xl xl:text-6xl text-gray-900 mb-6">
                Proven <AnimatedGradientText colorFrom="#FF6B47" colorTo="#9c40ff" className="text-4xl md:text-5xl xl:text-6xl">Healthcare Technology</AnimatedGradientText> Experience
              </h2>
              <p className="text-body text-xl text-gray-600 leading-relaxed">
                Our leadership team brings decades of combined experience in healthcare technology and workflow innovation.
              </p>
            </motion.div>

            <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
              {timelineEvents.map((event, index) => (
                <BlurFade key={index} delay={index * 0.1}>
                  <li className="relative ml-10 py-4">
                    <div className="absolute -left-16 top-2 flex items-center justify-center bg-white rounded-full">
                      <span className="relative flex shrink-0 overflow-hidden rounded-full border size-12 m-auto">
                        <img
                          className="aspect-square h-full w-full object-contain"
                          alt={event.title}
                          src="/images/bullseye-no-bg.png"
                        />
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col justify-start gap-1">
                      <h3 className="text-sm md:text-base font-semibold text-accent mb-1">{event.year}</h3>
                      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 leading-none">{event.title}</h2>
                      <p className="text-gray-600 leading-relaxed">{event.description}</p>
                    </div>
                  </li>
                </BlurFade>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>




      {/* CTA Section */}
      <EnhancedCTA />
    </>
  )
}