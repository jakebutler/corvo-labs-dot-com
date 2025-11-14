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
    content: "consulting@corvolabs.com",
    description: "Send us an inquiry and we'll respond within 24 hours"
  },
  {
    icon: Phone,
    title: "Phone",
    content: "1-800-CORVO-AI",
    description: "Monday - Friday, 9AM - 6PM EST"
  },
  {
    icon: MapPin,
    title: "Office",
    content: "Boston, MA",
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
    hearAboutUs: '',

    // Step 3: Additional Information
    budget: '',
    teamSize: '',
    currentChallenges: '',
    goals: '',
    additionalInfo: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

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
      else if (formData.projectDescription.length < 50) newErrors.projectDescription = 'Please provide more detail (at least 50 characters)'
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

    if (!validateStep(formStep)) return

    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
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
      <section className="min-h-screen flex items-center justify-center bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div variants={fadeIn} className="mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
                Thank You!
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Your consultation request has been submitted successfully. Our team will review your information and contact you within 24 hours to schedule your free AI assessment.
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-gray-50 rounded-xl p-8 mb-8">
              <h2 className="text-xl font-bold text-black mb-4">What Happens Next?</h2>
              <div className="space-y-4 text-left">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</div>
                  <div>
                    <h3 className="font-semibold text-black">Email Confirmation</h3>
                    <p className="text-gray-600">You'll receive a confirmation email with your request details</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</div>
                  <div>
                    <h3 className="font-semibold text-black">Expert Review</h3>
                    <p className="text-gray-600">Our healthcare AI specialists will review your requirements</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</div>
                  <div>
                    <h3 className="font-semibold text-black">Consultation Scheduling</h3>
                    <p className="text-gray-600">We'll contact you to schedule your free assessment call</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeIn}>
              <motion.button
                onClick={() => window.location.href = '/'}
                className="px-8 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent-600 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Return to Homepage
              </motion.button>
            </motion.div>
          </motion.div>
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
              className="text-5xl md:text-7xl font-bold text-black mb-6 tracking-tighter"
            >
              Start Your AI Journey
            </motion.h1>
            <motion.p
              variants={fadeIn}
              className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8"
            >
              Schedule a free consultation with our healthcare AI experts. Let's discuss how we can transform your workflows with responsible AI solutions.
            </motion.p>
            <motion.div
              variants={fadeIn}
              className="flex items-center justify-center space-x-2 text-accent"
            >
              <Shield className="h-5 w-5" />
              <span className="font-semibold">HIPAA Compliant • Confidential Consultation</span>
            </motion.div>
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
                <h2 className="text-2xl font-bold text-black mb-8">Get in Touch</h2>

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
                    <div className="flex items-center justify-between mb-4">
                      {[1, 2, 3].map((step) => (
                        <div key={step} className="flex items-center">
                          <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors",
                            formStep >= step ? "bg-accent text-white" : "bg-gray-200 text-gray-600"
                          )}>
                            {step}
                          </div>
                          {step < 3 && (
                            <div className={cn(
                              "w-full h-1 mx-2 transition-colors",
                              formStep > step ? "bg-accent" : "bg-gray-200"
                            )}></div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={formStep >= 1 ? "text-accent font-medium" : "text-gray-600"}>
                        Basic Information
                      </span>
                      <span className={formStep >= 2 ? "text-accent font-medium" : "text-gray-600"}>
                        Project Details
                      </span>
                      <span className={formStep >= 3 ? "text-accent font-medium" : "text-gray-600"}>
                        Additional Info
                      </span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
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

                    {/* Step 3: Additional Information */}
                    {formStep === 3 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Budget Range
                            </label>
                            <select
                              value={formData.budget}
                              onChange={(e) => handleInputChange('budget', e.target.value)}
                              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                            >
                              <option value="">Select budget range</option>
                              <option value="50k-100k">$50,000 - $100,000</option>
                              <option value="100k-200k">$100,000 - $200,000</option>
                              <option value="200k-500k">$200,000 - $500,000</option>
                              <option value="500k+">$500,000+</option>
                              <option value="flexible">Flexible</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Team Size
                            </label>
                            <select
                              value={formData.teamSize}
                              onChange={(e) => handleInputChange('teamSize', e.target.value)}
                              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                            >
                              <option value="">Select team size</option>
                              <option value="1-10">1-10 people</option>
                              <option value="11-50">11-50 people</option>
                              <option value="51-200">51-200 people</option>
                              <option value="201-1000">201-1000 people</option>
                              <option value="1000+">1000+ people</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Current Challenges
                          </label>
                          <textarea
                            value={formData.currentChallenges}
                            onChange={(e) => handleInputChange('currentChallenges', e.target.value)}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 h-24 resize-none"
                            placeholder="What specific challenges are you facing that you hope AI can help solve?"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Goals and Success Metrics
                          </label>
                          <textarea
                            value={formData.goals}
                            onChange={(e) => handleInputChange('goals', e.target.value)}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 h-24 resize-none"
                            placeholder="What does success look like for this project? How will you measure impact?"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Additional Information
                          </label>
                          <textarea
                            value={formData.additionalInfo}
                            onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 h-24 resize-none"
                            placeholder="Any other details you'd like to share..."
                          />
                        </div>
                      </motion.div>
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
                        {formStep < 3 ? (
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

                  {/* HIPAA Notice */}
                  <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start space-x-3">
                      <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-900">HIPAA Compliance Notice</h4>
                        <p className="text-blue-700 text-sm mt-1">
                          This consultation request form is HIPAA-compliant. Your information will be kept confidential and used only for the purpose of providing AI consulting services.
                        </p>
                      </div>
                    </div>
                  </div>
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