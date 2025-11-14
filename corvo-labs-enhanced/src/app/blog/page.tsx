'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Clock, User, Search, Filter, Mail, BookOpen, TrendingUp, Lightbulb, Award, Star } from 'lucide-react'
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
  { id: 'all', label: 'All Posts', count: 24 },
  { id: 'strategy', label: 'AI Strategy', count: 8 },
  { id: 'implementation', label: 'Implementation', count: 6 },
  { id: 'innovation', label: 'Innovation', count: 5 },
  { id: 'workflows', label: 'Workflows', count: 5 }
]

const blogPosts = [
  {
    id: 1,
    title: "5 Critical Success Factors for Healthcare AI Implementation",
    excerpt: "Learn the essential elements that separate successful healthcare AI projects from failed implementations. Based on analysis of 50+ healthcare AI deployments.",
    author: "Dr. Sarah Chen",
    date: "November 10, 2025",
    readTime: "8 min read",
    category: "implementation",
    featured: true,
    image: "/images/ai-implementation.jpg",
    tags: ["AI Implementation", "Healthcare", "Success Factors"],
    views: 2450
  },
  {
    id: 2,
    title: "HIPAA Compliance in the Age of AI: What Healthcare Leaders Need to Know",
    excerpt: "Navigate the complex intersection of AI innovation and healthcare privacy regulations. Practical guidance for maintaining compliance while implementing AI solutions.",
    author: "Emily Johnson",
    date: "November 5, 2025",
    readTime: "12 min read",
    category: "strategy",
    featured: true,
    image: "/images/hipaa-compliance.jpg",
    tags: ["HIPAA", "Compliance", "Regulations"],
    views: 1890
  },
  {
    id: 3,
    title: "ROI Analysis: Calculating the Business Case for Healthcare AI",
    excerpt: "A comprehensive framework for measuring and communicating the financial impact of AI investments in healthcare organizations.",
    author: "Michael Rodriguez",
    date: "October 28, 2025",
    readTime: "10 min read",
    category: "strategy",
    featured: false,
    image: "/images/roi-analysis.jpg",
    tags: ["ROI", "Business Case", "Metrics"],
    views: 1560
  },
  {
    id: 4,
    title: "Emergency Department Triage: How AI Reduced Wait Times by 62%",
    excerpt: "Case study of a successful AI implementation in emergency department triage that dramatically improved patient flow and satisfaction scores.",
    author: "Dr. Sarah Chen",
    date: "October 20, 2025",
    readTime: "6 min read",
    category: "implementation",
    featured: false,
    image: "/images/ed-case-study.jpg",
    tags: ["Case Study", "Emergency Medicine", "Triage"],
    views: 2100
  },
  {
    id: 5,
    title: "The Future of Clinical Decision Support: AI-Enhanced Healthcare",
    excerpt: "Exploring emerging trends in AI-powered clinical decision support systems and their potential to transform medical practice.",
    author: "Emily Johnson",
    date: "October 15, 2025",
    readTime: "9 min read",
    category: "innovation",
    featured: false,
    image: "/images/clinical-support.jpg",
    tags: ["Clinical Decision Support", "Future Trends", "AI"],
    views: 1340
  },
  {
    id: 6,
    title: "Workflow Automation in Healthcare: Beyond the Basics",
    excerpt: "Advanced workflow automation strategies that go beyond simple task automation to transform entire healthcare processes.",
    author: "Michael Rodriguez",
    date: "October 8, 2025",
    readTime: "7 min read",
    category: "workflows",
    featured: false,
    image: "/images/workflow-automation.jpg",
    tags: ["Workflow Automation", "Process Optimization", "Healthcare"],
    views: 1670
  },
  {
    id: 7,
    title: "Change Management: Getting Healthcare Staff to Embrace AI",
    excerpt: "Strategies for overcoming resistance to AI adoption and building organizational buy-in for new technologies in healthcare settings.",
    author: "Emily Johnson",
    date: "September 30, 2025",
    readTime: "8 min read",
    category: "implementation",
    featured: false,
    image: "/images/change-management.jpg",
    tags: ["Change Management", "Staff Adoption", "Organizational Change"],
    views: 1450
  },
  {
    id: 8,
    title: "Selecting the Right AI Vendor for Your Healthcare Organization",
    excerpt: "A comprehensive guide to evaluating and selecting AI vendors that understand healthcare's unique challenges and requirements.",
    author: "Dr. Sarah Chen",
    date: "September 22, 2025",
    readTime: "11 min read",
    category: "strategy",
    featured: false,
    image: "/images/vendor-selection.jpg",
    tags: ["Vendor Selection", "Procurement", "Evaluation"],
    views: 1780
  }
]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredPosts = blogPosts.filter(post => post.featured)
  const recentPosts = blogPosts.filter(post => !post.featured).slice(0, 6)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setTimeout(() => setIsSubscribed(false), 3000)
      setEmail('')
    }
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
              Healthcare AI Insights
            </motion.h1>
            <motion.p
              variants={fadeIn}
              className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8"
            >
              Expert insights on implementing AI in healthcare workflows, industry trends, and best practices from our team of healthcare AI specialists.
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
                Subscribe to Newsletter
                <Mail className="ml-2 h-4 w-4" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-accent text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeIn}>
              <Mail className="h-16 w-16 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Get Weekly Healthcare AI Insights
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Join 5,000+ healthcare leaders receiving expert analysis, implementation guides, and industry trends every week.
              </p>
            </motion.div>

            <motion.form
              variants={fadeIn}
              onSubmit={handleSubscribe}
              className="max-w-md mx-auto"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
                  required
                />
                <motion.button
                  type="submit"
                  className="px-6 py-3 bg-white text-accent rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
              {isSubscribed && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 text-sm opacity-90"
                >
                  ✓ Successfully subscribed! Check your email for confirmation.
                </motion.div>
              )}
              <p className="text-sm opacity-75 mt-4">
                Unsubscribe anytime. We respect your privacy and will never share your email.
              </p>
            </motion.form>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      {selectedCategory === 'all' && searchTerm === '' && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="max-w-6xl mx-auto"
            >
              <motion.div variants={fadeIn} className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  Featured Articles
                </h2>
                <p className="text-xl text-gray-600">
                  Essential reading for healthcare leaders exploring AI adoption
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                {featuredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    variants={fadeIn}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-w-16 aspect-h-9 bg-gray-200 h-48"></div>
                    <div className="p-8">
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-accent" />
                          <span>Featured</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-black mb-3">{post.title}</h3>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                          <span className="text-sm text-gray-700">{post.author}</span>
                        </div>
                        <motion.button
                          className="text-accent font-semibold hover:text-accent-600 inline-flex items-center"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Read More
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Search and Filter */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-6">
              {/* Search */}
              <motion.div variants={fadeIn}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search articles..."
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>
              </motion.div>

              {/* Category Filter */}
              <motion.div variants={fadeIn}>
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-gray-500" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.label} ({category.count})
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={fadeIn} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                {selectedCategory === 'all' ? 'Recent Articles' : `${categories.find(c => c.id === selectedCategory)?.label}`}
              </h2>
              <p className="text-xl text-gray-600">
                {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  variants={fadeIn}
                  className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200 h-40"></div>
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-black mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 2).map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-white rounded-full text-xs text-gray-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                        <span className="text-xs text-gray-700">{post.author}</span>
                      </div>
                      <motion.button
                        className="text-accent font-semibold text-sm hover:text-accent-600 inline-flex items-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Read
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </motion.button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">No articles found matching your criteria.</p>
              </div>
            )}

            {/* Load More */}
            {filteredPosts.length > 6 && (
              <motion.div
                variants={fadeIn}
                className="text-center mt-12"
              >
                <motion.button
                  className="px-8 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent-600 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Load More Articles
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Content Pillars */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={fadeIn} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Content Pillars
              </h2>
              <p className="text-xl text-gray-600">
                Expert insights across key areas of healthcare AI
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: BookOpen,
                  title: "AI Strategy",
                  description: "Planning, assessment, and roadmap development for healthcare AI adoption",
                  topics: ["Strategic Planning", "ROI Analysis", "Vendor Selection"]
                },
                {
                  icon: Lightbulb,
                  title: "Implementation",
                  description: "Technical guidance, best practices, and lessons learned from real deployments",
                  topics: ["Best Practices", "Technical Guides", "Case Studies"]
                },
                {
                  icon: TrendingUp,
                  title: "Innovation",
                  description: "Industry trends, regulatory updates, and emerging technologies in healthcare",
                  topics: ["Industry Trends", "Regulations", "Future Tech"]
                },
                {
                  icon: Award,
                  title: "Workflows",
                  description: "Process improvement, efficiency gains, and practical applications in healthcare",
                  topics: ["Process Optimization", "Efficiency", "Practical Tips"]
                }
              ].map((pillar, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="text-center p-6 bg-white rounded-lg shadow-sm"
                >
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <pillar.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-black mb-2">{pillar.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{pillar.description}</p>
                  <div className="space-y-1">
                    {pillar.topics.map((topic, idx) => (
                      <div key={idx} className="text-xs text-gray-500">
                        • {topic}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <EnhancedCTA />
    </>
  )
}