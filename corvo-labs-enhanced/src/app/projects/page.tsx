'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Filter, Users, Target, Award, Heart, BarChart3, Zap, Calendar, MapPin } from 'lucide-react'
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

const categories = [
  { id: 'all', label: 'All Projects', icon: Target },
  { id: 'clinical', label: 'Clinical Applications', icon: Heart },
  { id: 'administrative', label: 'Administrative Automation', icon: BarChart3 },
  { id: 'patient', label: 'Patient Engagement', icon: Users },
  { id: 'analytics', label: 'Data Analytics', icon: Zap }
]

const projects = [
  {
    id: 1,
    title: "Emergency Department Triage Automation",
    category: "clinical",
    client: "Regional Medical Center",
    location: "California",
    duration: "12 weeks",
    challenge: "Emergency department was experiencing 45-minute average wait times with inefficient patient triage leading to delayed care and patient dissatisfaction.",
    solution: "Implemented AI-powered triage system that automatically prioritizes patients based on symptoms, vital signs, and urgency indicators. The system integrates with existing EMR and provides real-time decision support to clinical staff.",
    process: [
      "Analyzed 6 months of ED patient flow data",
      "Designed machine learning model for triage prediction",
      "Integrated with existing Epic EMR system",
      "Trained clinical staff on new workflows",
      "Implemented real-time monitoring dashboard"
    ],
    results: [
      "Reduced average wait time by 62%",
      "Improved patient satisfaction scores from 3.2 to 4.7/5",
      "Decreased time-to-treatment for critical cases by 40%",
      "Handled 2.3x more patients with same staffing levels"
    ],
    technologies: ["Machine Learning", "EMR Integration", "Real-time Analytics", "Mobile Interface"],
    image: "/images/ed-triage.jpg"
  },
  {
    id: 2,
    title: "Medical Coding Automation Platform",
    category: "administrative",
    client: "Multi-Specialty Clinic",
    location: "Texas",
    duration: "16 weeks",
    challenge: "Manual medical coding process was causing billing delays, coding errors, and revenue loss due to undercoding and claim rejections.",
    solution: "Developed AI-powered medical coding platform that automatically analyzes clinical documentation and suggests appropriate billing codes. System includes real-time validation and compliance checking.",
    process: [
      "Audited 2 years of coding data for patterns",
      "Built NLP model for clinical document analysis",
      "Created coding validation engine",
      "Integrated with practice management systems",
      "Implemented continuous learning feedback loop"
    ],
    results: [
      "95% coding accuracy rate",
      "Reduced coding time from 15 to 3 minutes per chart",
      "Increased revenue by 18% through improved coding",
      "Decreased claim rejection rate by 73%"
    ],
    technologies: ["Natural Language Processing", "Rule Engine", "Practice Management Integration", "Compliance Validation"],
    image: "/images/medical-coding.jpg"
  },
  {
    id: 3,
    title: "Patient Engagement Chatbot",
    category: "patient",
    client: "Children's Hospital",
    location: "New York",
    duration: "10 weeks",
    challenge: "High call volume to appointment line and inconsistent patient communication leading to missed appointments and poor patient experience.",
    solution: "Implemented intelligent chatbot for appointment scheduling, medication reminders, and patient education. The system handles 80% of routine patient inquiries and integrates with hospital scheduling systems.",
    process: [
      "Analyzed patient communication patterns",
      "Designed conversational AI flows",
      "Integrated with hospital scheduling system",
      "Created multilingual support (English/Spanish)",
      "Implemented escalation to human agents"
    ],
    results: [
      "Handled 45,000 patient interactions per month",
      "Reduced call center volume by 60%",
      "Improved appointment show rates by 28%",
      "Patient satisfaction score of 4.6/5"
    ],
    technologies: ["Conversational AI", "Scheduling Integration", "Multi-language Support", "Sentiment Analysis"],
    image: "/images/patient-chatbot.jpg"
  },
  {
    id: 4,
    title: "Predictive Analytics for Readmission Risk",
    category: "analytics",
    client: "Large Hospital Network",
    location: "Illinois",
    duration: "14 weeks",
    challenge: "High 30-day readmission rates and inability to identify high-risk patients before discharge.",
    solution: "Built predictive analytics platform that analyzes patient data to identify readmission risk factors and recommends intervention strategies. System provides real-time risk scores and actionable insights to care teams.",
    process: [
      "Analyzed 3 years of patient outcome data",
      "Developed predictive machine learning models",
      "Created risk stratification algorithms",
      "Built clinician dashboard with interventions",
      "Integrated with discharge planning workflows"
    ],
    results: [
      "Predictive accuracy of 89%",
      "Reduced 30-day readmissions by 31%",
      "Identified 2x more high-risk patients",
      "Improved care coordination efficiency"
    ],
    technologies: ["Predictive Analytics", "Machine Learning", "Risk Stratification", "Clinical Dashboard"],
    image: "/images/readmission-analytics.jpg"
  },
  {
    id: 5,
    title: "Clinical Trial Matching System",
    category: "clinical",
    client: "Cancer Research Center",
    location: "Massachusetts",
    duration: "18 weeks",
    challenge: "Manual process for matching patients to clinical trials was inefficient and missed eligible patients, slowing research enrollment.",
    solution: "Created AI-powered clinical trial matching system that automatically screens patient records against trial criteria and alerts physicians to eligible patients.",
    process: [
      "Analyzed clinical trial protocols and criteria",
      "Built patient-trial matching algorithms",
      "Integrated with electronic health records",
      "Created physician alert system",
      "Implemented enrollment tracking"
    ],
    results: [
      "Increased trial enrollment by 156%",
      "Reduced screening time from hours to minutes",
      "Identified 3x more eligible patients",
      "Accelerated research study timelines"
    ],
    technologies: ["Pattern Matching", "Clinical Integration", "Alert Systems", "Compliance Tracking"],
    image: "/images/clinical-trials.jpg"
  },
  {
    id: 6,
    title: "Surgical Scheduling Optimization",
    category: "administrative",
    client: "Orthopedic Surgery Center",
    location: "Florida",
    duration: "12 weeks",
    challenge: "Inefficient surgical scheduling leading to underutilized OR time, patient delays, and staff overtime costs.",
    solution: "Implemented AI-driven surgical scheduling optimization that considers case complexity, resource requirements, and staff availability to maximize OR efficiency.",
    process: [
      "Analyzed 2 years of surgical scheduling data",
      "Built optimization algorithms for OR utilization",
      "Integrated with hospital information systems",
      "Created real-time scheduling dashboard",
      "Implemented predictive case duration modeling"
    ],
    results: [
      "Increased OR utilization by 27%",
      "Reduced average turnover time by 35%",
      "Decreased staff overtime costs by $180K annually",
      "Improved on-time start rate to 94%"
    ],
    technologies: ["Optimization Algorithms", "Predictive Modeling", "Real-time Analytics", "Resource Management"],
    image: "/images/surgical-scheduling.jpg"
  }
]

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedProject, setExpandedProject] = useState<number | null>(null)

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory)

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
              className="text-5xl md:text-7xl font-bold text-black mb-6 tracking-tighter"
            >
              Healthcare AI Success Stories
            </motion.h1>
            <motion.p
              variants={fadeIn}
              className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8"
            >
              Explore our portfolio of successful AI implementations across healthcare workflows.
              See real results and measurable outcomes from our consulting projects.
            </motion.p>
            <motion.div
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                className="px-8 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent-600 transition-colors duration-200 inline-flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Discuss Your Use Case
                <ArrowRight className="ml-2 h-4 w-4" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Project Stats */}
      <section className="py-16 bg-accent text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { number: "50+", label: "Healthcare AI Projects" },
                { number: "200%", label: "Average ROI" },
                { number: "95%", label: "Client Satisfaction" },
                { number: "24/7", label: "Support Coverage" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                  <div className="text-sm md:text-base opacity-90">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center mb-6">
              <Filter className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-gray-700 font-medium">Filter by Category:</span>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <motion.button
                    key={category.id}
                    variants={fadeIn}
                    onClick={() => setSelectedCategory(category.id)}
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2 rounded-full transition-colors",
                      selectedCategory === category.id
                        ? "bg-accent text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100 border"
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{category.label}</span>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <div className="space-y-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={fadeIn}
                  className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-8 md:p-12">
                    <div className="flex flex-col md:flex-row md:items-start md:space-x-8">
                      {/* Project Header */}
                      <div className="md:w-1/3 mb-6 md:mb-0">
                        <div className="flex items-center space-x-2 text-accent font-semibold mb-2">
                          <MapPin className="h-4 w-4" />
                          <span>{project.location}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-black mb-3">{project.title}</h3>
                        <p className="text-lg text-gray-700 font-medium mb-4">{project.client}</p>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span className="text-sm">{project.duration}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 3).map((tech, idx) => (
                            <span key={idx} className="px-3 py-1 bg-white rounded-full text-xs text-gray-700">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Project Details */}
                      <div className="md:w-2/3">
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold text-black mb-2">Challenge</h4>
                          <p className="text-gray-600">{project.challenge}</p>
                        </div>

                        <div className="mb-6">
                          <h4 className="text-lg font-semibold text-black mb-2">Solution</h4>
                          <p className="text-gray-600">{project.solution}</p>
                        </div>

                        <div className="mb-6">
                          <h4 className="text-lg font-semibold text-black mb-3">Key Results</h4>
                          <div className="grid md:grid-cols-2 gap-3">
                            {project.results.slice(0, expandedProject === project.id ? undefined : 2).map((result, idx) => (
                              <div key={idx} className="flex items-start space-x-2">
                                <Award className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700">{result}</span>
                              </div>
                            ))}
                          </div>
                          {project.results.length > 2 && (
                            <button
                              onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                              className="text-accent font-semibold text-sm mt-3 hover:text-accent-600"
                            >
                              {expandedProject === project.id ? 'Show Less' : `Show ${project.results.length - 2} More Results`}
                            </button>
                          )}
                        </div>

                        {expandedProject === project.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border-t pt-6"
                          >
                            <h4 className="text-lg font-semibold text-black mb-3">Implementation Process</h4>
                            <ol className="space-y-2">
                              {project.process.map((step, idx) => (
                                <li key={idx} className="flex items-start space-x-3">
                                  <span className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                                    {idx + 1}
                                  </span>
                                  <span className="text-gray-700">{step}</span>
                                </li>
                              ))}
                            </ol>

                            <div className="mt-6">
                              <h4 className="text-lg font-semibold text-black mb-3">Technologies Used</h4>
                              <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, idx) => (
                                  <span key={idx} className="px-3 py-1 bg-gray-200 rounded-full text-sm text-gray-700">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">No projects found in this category.</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <EnhancedCTA />
    </>
  )
}