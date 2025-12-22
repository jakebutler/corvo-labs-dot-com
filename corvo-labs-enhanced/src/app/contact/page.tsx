'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, Phone, MapPin, Clock, Shield, Send, CheckCircle, AlertCircle, User, Building, Briefcase, Calendar, MessageSquare } from 'lucide-react'
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

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    content: "info@corvolabs.com",
    description: "Send us an inquiry and we'll respond within 24 hours"
  },
  {
    icon: Phone,
    title: "Phone",
    content: "510-703-5290",
    description: "Monday - Friday, 9AM - 6PM EST"
  },
  {
    icon: MapPin,
    title: "Office",
    content: "San Francisco, CA",
    description: "Serving healthcare organizations nationwide"
  }
]

const officeHours = [
  { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM EST" },
  { day: "Saturday", hours: "10:00 AM - 2:00 PM EST" },
  { day: "Sunday", hours: "Closed" },
  { day: "Emergency Support", hours: "24/7 for existing clients" }
]

export default function ContactPage() {
  const [formStep, setFormStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    fullName: '',
    email: '',
    organization: '',
    jobTitle: '',
    phone: '',

    // Step 2: Project Details
    areaOfInterest: '',
    timeline: '',
    projectDescription: '',
    hearAboutUs: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState<string | null>(null)

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
      if (!formData.email.trim()) newErrors.email = 'Email is required'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Valid email is required'
      if (!formData.organization.trim()) newErrors.organization = 'Organization is required'
      if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job title is required'
    }

    if (step === 2) {
      if (!formData.areaOfInterest) newErrors.areaOfInterest = 'Area of interest is required'
      if (!formData.timeline) newErrors.timeline = 'Timeline is required'
      if (!formData.projectDescription.trim()) newErrors.projectDescription = 'Project description is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = () => {
    if (validateStep(formStep)) {
      setFormStep(formStep + 1)
    }
  }

  const handlePrevStep = () => {
    setFormStep(formStep - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Only allow submission if we're on step 2
    if (formStep !== 2) {
      return
    }

    if (!validateStep(formStep)) return

    setIsSubmitting(true)

    try {
      // Send email notification
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('API Error:', errorData)
        throw new Error(errorData.error || `Failed to send email: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()
      console.log('Email sent successfully:', result)
      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting form:', error)
      // Show error to user
      setSubmitError(error instanceof Error ? error.message : 'Failed to send email. Please try again or contact us directly at info@corvolabs.com')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  if (isSubmitted) {
    return (
      <section className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* Animated Checkmark */}
            <div className="mb-8">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.1
                }}
                className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="h-12 w-12 text-accent" strokeWidth={2.5} />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-display text-4xl md:text-5xl xl:text-6xl text-gray-900 mb-4"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 900,
                  lineHeight: 0.85,
                  letterSpacing: '-0.02em'
                }}
              >
                Thank You!
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-body text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed"
              >
                Your consultation request has been submitted successfully. Someone from our team will get back to you within 24 hours.
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.a
                href="/projects"
                className="btn-organic px-8 py-3 text-lg inline-flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Corvo Labs Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </motion.a>
              
              <motion.a
                href="/"
                className="px-8 py-3 text-lg inline-flex items-center justify-center border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Back to Home
                <ArrowRight className="ml-2 h-4 w-4" />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center justify-center bg-white">
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
              Start Your AI Journey
            </motion.h1>
            <motion.p
              variants={fadeIn}
              className="text-body text-xl md:text-2xl text-gray-600 leading-relaxed mb-8"
            >
              Schedule a free consultation with our healthcare AI experts. Let's discuss how we can transform your workflows with responsible AI solutions.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Information */}
              <motion.div variants={fadeIn} className="lg:col-span-1">
                <h2 className="text-heading text-2xl font-bold text-gray-900 mb-8">Get in Touch</h2>

                <div className="space-y-6 mb-8">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon
                    return (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-black">{info.title}</h3>
                          <p className="text-accent font-medium">{info.content}</p>
                          <p className="text-gray-600 text-sm">{info.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-bold text-black mb-4 flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-accent" />
                    Office Hours
                  </h3>
                  <div className="space-y-2">
                    {officeHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600">{schedule.day}</span>
                        <span className="text-black font-medium">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 p-4 bg-accent/10 rounded-lg">
                  <p className="text-sm text-accent font-medium text-center">
                    24/7 emergency support available for existing clients
                  </p>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div variants={fadeIn} className="lg:col-span-2">
                <div className="bg-white rounded-xl p-8 md:p-12 shadow-sm">
                  {/* Progress Indicator */}
                  <div className="mb-8">
                    <div className="flex items-center justify-center gap-8 mb-4">
                      {[
                        { step: 1, label: 'Basic Information' },
                        { step: 2, label: 'Project Details' }
                      ].map(({ step, label }) => (
                        <div key={step} className="flex flex-col items-center">
                          <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors flex-shrink-0 mb-2",
                            formStep >= step ? "bg-accent text-white" : "bg-gray-200 text-gray-600"
                          )}>
                            {step}
                          </div>
                          <span className={cn(
                            "text-sm text-center",
                            formStep >= step ? "text-accent font-medium" : "text-gray-600"
                          )}>
                            {label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} onKeyDown={(e) => {
                    // Prevent Enter key from EVER submitting the form
                    // Form can only be submitted via explicit "Submit Request" button click
                    if (e.key === 'Enter') {
                      e.preventDefault()
                    }
                  }}>
                    {/* Step 1: Basic Information */}
                    {formStep === 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Full Name *
                            </label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                              <input
                                type="text"
                                value={formData.fullName}
                                onChange={(e) => handleInputChange('fullName', e.target.value)}
                                className={cn(
                                  "w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50",
                                  errors.fullName && "border-red-500"
                                )}
                                placeholder="John Doe"
                              />
                            </div>
                            {errors.fullName && (
                              <p className="text-red-500 text-sm mt-1 flex items-center">
                                <AlertCircle className="h-4 w-4 mr-1" />
                                {errors.fullName}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Work Email *
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                              <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                className={cn(
                                  "w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50",
                                  errors.email && "border-red-500"
                                )}
                                placeholder="john@hospital.com"
                              />
                            </div>
                            {errors.email && (
                              <p className="text-red-500 text-sm mt-1 flex items-center">
                                <AlertCircle className="h-4 w-4 mr-1" />
                                {errors.email}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Organization *
                            </label>
                            <div className="relative">
                              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                              <input
                                type="text"
                                value={formData.organization}
                                onChange={(e) => handleInputChange('organization', e.target.value)}
                                className={cn(
                                  "w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50",
                                  errors.organization && "border-red-500"
                                )}
                                placeholder="General Hospital"
                              />
                            </div>
                            {errors.organization && (
                              <p className="text-red-500 text-sm mt-1 flex items-center">
                                <AlertCircle className="h-4 w-4 mr-1" />
                                {errors.organization}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Job Title *
                            </label>
                            <div className="relative">
                              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                              <input
                                type="text"
                                value={formData.jobTitle}
                                onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                                className={cn(
                                  "w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50",
                                  errors.jobTitle && "border-red-500"
                                )}
                                placeholder="CTO, Medical Director, etc."
                              />
                            </div>
                            {errors.jobTitle && (
                              <p className="text-red-500 text-sm mt-1 flex items-center">
                                <AlertCircle className="h-4 w-4 mr-1" />
                                {errors.jobTitle}
                              </p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Project Details */}
                    {formStep === 2 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Area of Interest *
                          </label>
                          <select
                            value={formData.areaOfInterest}
                            onChange={(e) => handleInputChange('areaOfInterest', e.target.value)}
                            className={cn(
                              "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50",
                              errors.areaOfInterest && "border-red-500"
                            )}
                          >
                            <option value="">Select an option</option>
                            <option value="strategy">AI Strategy Assessment</option>
                            <option value="automation">Workflow Automation</option>
                            <option value="implementation">Implementation Project</option>
                            <option value="consulting">General Consulting</option>
                            <option value="other">Other</option>
                          </select>
                          {errors.areaOfInterest && (
                            <p className="text-red-500 text-sm mt-1 flex items-center">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {errors.areaOfInterest}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Project Timeline *
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <select
                              value={formData.timeline}
                              onChange={(e) => handleInputChange('timeline', e.target.value)}
                              className={cn(
                                "w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50",
                                errors.timeline && "border-red-500"
                              )}
                            >
                              <option value="">Select timeline</option>
                              <option value="immediate">Immediate (0-3 months)</option>
                              <option value="short-term">Short-term (3-6 months)</option>
                              <option value="planning">Planning stage (6+ months)</option>
                              <option value="exploring">Just exploring options</option>
                            </select>
                          </div>
                          {errors.timeline && (
                            <p className="text-red-500 text-sm mt-1 flex items-center">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {errors.timeline}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Project Description *
                          </label>
                          <div className="relative">
                            <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <textarea
                              value={formData.projectDescription}
                              onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                              className={cn(
                                "w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 h-32 resize-none",
                                errors.projectDescription && "border-red-500"
                              )}
                              placeholder="Please describe your project, current challenges, and what you hope to achieve with AI..."
                            />
                          </div>
                          {errors.projectDescription && (
                            <p className="text-red-500 text-sm mt-1 flex items-center">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {errors.projectDescription}
                            </p>
                          )}
                          <p className="text-gray-500 text-sm mt-1">
                            {formData.projectDescription.length}/500 characters
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            How did you hear about us?
                          </label>
                          <select
                            value={formData.hearAboutUs}
                            onChange={(e) => handleInputChange('hearAboutUs', e.target.value)}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                          >
                            <option value="">Select an option</option>
                            <option value="referral">Referral</option>
                            <option value="search">Search Engine</option>
                            <option value="linkedin">LinkedIn</option>
                            <option value="conference">Conference/Event</option>
                            <option value="blog">Blog/Article</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </motion.div>
                    )}



                    {/* Error Message */}
                    {submitError && (
                      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-red-800 font-semibold mb-1">Submission Error</h4>
                            <p className="text-red-700 text-sm">{submitError}</p>
                            <p className="text-red-600 text-xs mt-2">
                              You can also contact us directly at{' '}
                              <a href="mailto:info@corvolabs.com" className="underline font-medium">
                                info@corvolabs.com
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Form Actions */}
                    <div className="flex justify-between mt-8">
                      <div>
                        {formStep > 1 && (
                          <motion.button
                            type="button"
                            onClick={handlePrevStep}
                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Previous
                          </motion.button>
                        )}
                      </div>

                      <div className="flex space-x-4">
                        {formStep < 2 ? (
                          <motion.button
                            type="button"
                            onClick={handleNextStep}
                            className="px-8 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent-600 transition-colors duration-200 inline-flex items-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Next
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </motion.button>
                        ) : (
                          <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-8 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent-600 transition-colors duration-200 inline-flex items-center disabled:opacity-50"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {isSubmitting ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Submitting...
                              </>
                            ) : (
                              <>
                                Submit Request
                                <Send className="ml-2 h-4 w-4" />
                              </>
                            )}
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </form>


                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <EnhancedCTA />
    </>
  )
}