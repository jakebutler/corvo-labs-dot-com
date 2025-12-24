'use client'

import { motion } from 'framer-motion'
import { HeroVisual } from '@/components/hero/HeroVisual'
import { StripedPattern } from '@/components/magicui/striped-pattern'
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text'
import { ShimmerButton } from '@/components/magicui/shimmer-button'
import { BorderBeam } from '@/components/magicui/border-beam'
import { TextAnimate } from '@/components/magicui/text-animate'
import Link from 'next/link'

export default function Home() {

  return (
    <main className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Sophisticated Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* MagicUI Striped Pattern Background */}
        <StripedPattern 
          className="absolute inset-0 z-0 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)] opacity-30" 
        />

        {/* Asymmetrical Layout with Diagonal Flow */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[80vh]"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  duration: 1.2,
                  staggerChildren: 0.3,
                  ease: [0.34, 1.56, 0.64, 1]
                }
              }
            }}
          >
            {/* Left Column: Oversized Heading */}
            <motion.div
              className="lg:col-span-7 xl:col-span-6"
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }
                }
              }}
            >
              <div className="space-y-6 xl:space-y-8">
                {/* Elegant Pre-heading */}
                <motion.div
                  className="flex items-center space-x-3 text-elegant text-accent-600 text-lg font-medium"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <span className="w-2 h-2 bg-accent-600 rounded-full animate-pulse"></span>
                  <span>Intelligent Solutions for Modern Healthcare</span>
                </motion.div>

                {/* Hero Heading with Dramatic Typography */}
                <motion.h1
                  className="text-display text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl leading-none text-gray-900"
                  style={{
                    fontFamily: 'var(--font-cabinet-grotesk)',
                    fontWeight: 900,
                    lineHeight: 0.85,
                    letterSpacing: '-0.02em'
                  }}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, delay: 0.2 }
                    }
                  }}
                >
                  <span className="block">Where <AnimatedGradientText colorFrom="#FF6B47" colorTo="#9c40ff" className="text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl">Vision</AnimatedGradientText></span>
                  <span className="block"><AnimatedGradientText colorFrom="#FF6B47" colorTo="#9c40ff" className="text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl">Meets</AnimatedGradientText> Reality</span>
                  <TextAnimate
                    animation="blurInUp"
                    by="word"
                    className="block text-3xl md:text-4xl xl:text-5xl text-gray-600 mt-2 font-normal"
                    delay={0.4}
                  >
                    Transforming healthcare through responsible AI
                  </TextAnimate>
                </motion.h1>

                {/* Sophisticated Description */}
                <motion.p
                  className="text-body text-lg xl:text-xl text-gray-600 max-w-xl leading-relaxed"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { delay: 0.4 } }
                  }}
                >
                  We architect intelligent solutions that blend cutting-edge AI with deep healthcare expertise, creating measurable improvements in efficiency and patient outcomes.
                </motion.p>

                {/* Elegant CTA Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 pt-6 items-center"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { delay: 0.6 } }
                  }}
                >
                  <Link href="/contact">
                    <ShimmerButton className="shadow-2xl h-14 px-8">
                      <span className="text-white font-semibold">Transform Your Workflow</span>
                    </ShimmerButton>
                  </Link>
                  <Link href="/projects" className="relative h-14 px-8 flex items-center justify-center border-2 border-gray-300 text-gray-700 rounded-full font-semibold transition-all duration-400 hover:border-accent-600 hover:text-accent-600 hover:bg-accent-50 group overflow-hidden">
                    <span className="relative z-10">View Our Work</span>
                    <BorderBeam size={100} duration={12} colorFrom="#FF6B47" colorTo="#9c40ff" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column: Visual Elements */}
            <motion.div
              className="lg:col-span-5 xl:col-span-6 flex justify-center items-center"
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.8, delay: 0.3 }
                }
              }}
            >
              <div className="relative w-full max-w-lg xl:max-w-2xl floating">
                <HeroVisual />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Sophisticated Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent z-10" />
      </section>

      {/* Sophisticated Services Section */}
      <section className="py-24 xl:py-32 bg-gray-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-3">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(0, 0, 0, 0.2) 2px, transparent 2px)`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-display text-4xl md:text-5xl xl:text-6xl text-gray-900 mb-6">
              Our <AnimatedGradientText colorFrom="#FF6B47" colorTo="#9c40ff" className="text-4xl md:text-5xl xl:text-6xl">Expertise</AnimatedGradientText>
            </h2>
            <p className="text-body text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Three pillars that define our approach to transforming healthcare through intelligent automation
            </p>
          </motion.div>

          {/* Asymmetrical Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                title: "Healthcare Excellence",
                description: "Solutions designed specifically for healthcare workflows, built on decades of real-world clinical experience.",
                icon: "/images/01-no-bg.png",
                delay: 0
              },
              {
                title: "Measurable Results",
                description: "We save you time and money with quantifiable improvements in efficiency, accuracy, and patient outcomes.",
                icon: "/images/02-no-bg.png",
                delay: 0.15
              },
              {
                title: "Responsible AI",
                description: "Ethical AI implementation that prioritizes patient safety, data privacy, and regulatory compliance.",
                icon: "/images/03-no-bg.png",
                delay: 0.3
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: service.delay }}
              >
                <div className="group cursor-pointer p-8 lg:p-10 transition-all duration-300 bg-white border border-gray-200 rounded-xl hover:bg-accent-50 hover:border-accent-200">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:bg-gray-200">
                      <img src={service.icon} alt={service.title} className="w-12 h-12 object-contain" />
                    </div>
                  </div>

                  <h3 className="text-heading text-2xl font-bold text-gray-900 mb-4 group-hover:text-accent-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-body text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sophisticated CTA Section */}
      <section className="py-24 xl:py-32 bg-gray-900 text-white relative">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 2px, transparent 2px)`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-display text-4xl md:text-5xl xl:text-6xl text-white">
              Ready to <AnimatedGradientText colorFrom="#ffaa40" colorTo="#9c40ff" className="text-4xl md:text-5xl xl:text-6xl">Transform</AnimatedGradientText> Your Workflow?
            </h2>
            <p className="text-body text-xl text-gray-300 leading-relaxed">
              Let's architect the future of your healthcare organization together.
              Sophisticated AI solutions that deliver measurable results.
            </p>
            <Link href="/contact">
              <ShimmerButton className="mx-auto shadow-2xl text-lg px-10 py-5">
                <span className="text-white font-semibold">Begin Your Transformation</span>
              </ShimmerButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}