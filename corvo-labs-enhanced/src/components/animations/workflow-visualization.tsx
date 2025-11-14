'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView, useMotionValue, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ArrowRight, CheckCircle, Circle, Zap, Database, Cloud, Shield } from 'lucide-react'

interface WorkflowStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  status: 'pending' | 'active' | 'completed'
  duration?: number
}

interface WorkflowVisualizationProps {
  steps: WorkflowStep[]
  className?: string
  autoPlay?: boolean
  loop?: boolean
  interactive?: boolean
}

export function WorkflowVisualization({
  steps,
  className,
  autoPlay = true,
  loop = true,
  interactive = true
}: WorkflowVisualizationProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [ref, inView] = useInView({ threshold: 0.3 })

  useEffect(() => {
    if (!inView || !isPlaying) return

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        const next = prev + 1
        if (next >= steps.length) {
          if (loop) {
            return 0
          } else {
            setIsPlaying(false)
            return prev
          }
        }
        return next
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [inView, isPlaying, steps.length, loop])

  const handleStepClick = (index: number) => {
    if (interactive) {
      setCurrentStep(index)
      setIsPlaying(false)
    }
  }

  return (
    <div ref={ref} className={cn("w-full", className)}>
      {/* Progress Bar */}
      <div className="relative mb-12">
        <div className="h-1 bg-primary-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-ai-blue to-ai-cyan rounded-full"
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between mt-4">
          {steps.map((step, index) => (
            <motion.button
              key={step.id}
              onClick={() => handleStepClick(index)}
              className={cn(
                "relative flex flex-col items-center",
                interactive && "cursor-pointer hover:scale-110 transition-transform"
              )}
              whileHover={interactive ? { scale: 1.1 } : {}}
              whileTap={interactive ? { scale: 0.95 } : {}}
            >
              <motion.div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                  index < currentStep
                    ? "bg-success border-success text-white"
                    : index === currentStep
                    ? "bg-ai-blue border-ai-blue text-white"
                    : "bg-white border-primary-300 text-primary-400"
                )}
                animate={{
                  scale: index === currentStep ? 1.2 : 1,
                  boxShadow: index === currentStep ? "0 0 20px rgba(59, 130, 246, 0.5)" : "none"
                }}
                transition={{ duration: 0.3 }}
              >
                {index < currentStep ? (
                  <CheckCircle className="w-6 h-6" />
                ) : index === currentStep ? (
                  step.icon
                ) : (
                  <Circle className="w-6 h-6" />
                )}
              </motion.div>

              <div className="mt-2 text-center">
                <div className={cn(
                  "text-sm font-medium",
                  index <= currentStep ? "text-primary-900" : "text-primary-400"
                )}>
                  {step.title}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Current Step Content */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-primary-100 min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center space-x-6"
          >
            <motion.div
              className="w-16 h-16 bg-ai-blue/10 text-ai-blue rounded-xl flex items-center justify-center flex-shrink-0"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              {steps[currentStep].icon}
            </motion.div>

            <div className="flex-1">
              <h3 className="text-2xl font-bold text-primary-900 mb-3">
                {steps[currentStep].title}
              </h3>
              <p className="text-lg text-primary-600 mb-4">
                {steps[currentStep].description}
              </p>

              {steps[currentStep].duration && (
                <div className="flex items-center space-x-2 text-sm text-primary-500">
                  <Zap className="w-4 h-4" />
                  <span>Typical duration: {steps[currentStep].duration}</span>
                </div>
              )}
            </div>

            {currentStep < steps.length - 1 && (
              <motion.div
                className="text-primary-400"
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ArrowRight className="w-8 h-8" />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      {interactive && (
        <div className="flex justify-center mt-8 space-x-4">
          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-6 py-2 bg-ai-blue text-white rounded-lg font-medium hover:bg-ai-cyan transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </motion.button>

          <motion.button
            onClick={() => {
              setCurrentStep(0)
              setIsPlaying(true)
            }}
            className="px-6 py-2 bg-primary-200 text-primary-700 rounded-lg font-medium hover:bg-primary-300 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Reset
          </motion.button>
        </div>
      )}
    </div>
  )
}

// Predefined workflow configurations
export const aiImplementationWorkflow: WorkflowStep[] = [
  {
    id: 'assessment',
    title: 'Assessment',
    description: 'We analyze your current workflows, identify bottlenecks, and map out optimization opportunities using our proprietary AI assessment framework.',
    icon: <Database className="w-8 h-8" />,
    status: 'pending',
    duration: '1-2 weeks'
  },
  {
    id: 'design',
    title: 'Solution Design',
    description: 'Our experts design a customized AI solution tailored to your specific healthcare needs, ensuring HIPAA compliance and seamless integration.',
    icon: <Cloud className="w-8 h-8" />,
    status: 'pending',
    duration: '2-3 weeks'
  },
  {
    id: 'implementation',
    title: 'Implementation',
    description: 'We deploy the AI solution with minimal disruption to your operations, providing comprehensive training and support throughout the process.',
    icon: <Zap className="w-8 h-8" />,
    status: 'pending',
    duration: '4-6 weeks'
  },
  {
    id: 'optimization',
    title: 'Optimization',
    description: 'Continuous monitoring and refinement of the AI solution to ensure maximum efficiency and ROI for your healthcare organization.',
    icon: <Shield className="w-8 h-8" />,
    status: 'pending',
    duration: 'Ongoing'
  }
]

interface ProcessFlowProps {
  items: Array<{
    title: string
    description: string
    metrics?: { label: string; value: string }[]
  }>
  className?: string
}

export function ProcessFlow({ items, className }: ProcessFlowProps) {
  const [ref, inView] = useInView({ threshold: 0.2 })

  return (
    <div ref={ref} className={cn("w-full", className)}>
      <div className="space-y-8">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className={cn(
              "flex items-center space-x-6",
              index % 2 === 0 ? "flex-row" : "flex-row-reverse space-x-reverse"
            )}
          >
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-primary-900 mb-2">
                {item.title}
              </h3>
              <p className="text-primary-600 mb-4">
                {item.description}
              </p>

              {item.metrics && (
                <div className="flex space-x-4">
                  {item.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="text-center">
                      <div className="text-2xl font-bold text-ai-blue">
                        {metric.value}
                      </div>
                      <div className="text-sm text-primary-500">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <motion.div
              className="w-12 h-12 bg-gradient-to-br from-ai-blue to-ai-cyan rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              {index + 1}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}