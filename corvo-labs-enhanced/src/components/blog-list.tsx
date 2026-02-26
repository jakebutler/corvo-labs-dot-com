'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Clock, BookOpen, Lightbulb, TrendingUp, Award } from 'lucide-react'
import { EnhancedCTA } from '@/components/enhanced-cta'
import { ShimmerButton } from '@/components/magicui/shimmer-button'
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text'
import Link from 'next/link'
import type { BlogPost } from '@/lib/blog'

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

interface BlogListProps {
    posts: BlogPost[]
}

export function BlogList({ posts }: BlogListProps) {
    const filteredPosts = posts

    return (
        <>
            <section className="py-16 md:py-20 bg-white">
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
                            Healthcare <AnimatedGradientText colorFrom="#FF6B47" colorTo="#9c40ff" className="text-5xl md:text-6xl xl:text-7xl">AI Insights</AnimatedGradientText>
                        </motion.h1>
                        <motion.p
                            variants={fadeIn}
                            className="text-body text-xl md:text-2xl text-gray-600 leading-relaxed"
                        >
                            Expert insights on implementing AI in healthcare workflows, industry trends, and best practices from our team of healthcare AI specialists.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            <section className="pt-4 pb-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="max-w-6xl mx-auto"
                    >

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPosts.map((post) => {
                                const displayTitle = post.subtitle ? `${post.title}: ${post.subtitle}` : post.title

                                return (
                                <Link key={post.slug} href={`/blog/${post.slug}`}>
                                    <motion.article
                                        variants={fadeIn}
                                        className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col"
                                    >
                                        <div className="aspect-w-16 aspect-h-9 bg-gray-200 h-40 relative overflow-hidden">
                                            {/* Placeholder for image if not present, or Next.js Image */}
                                            {post.coverImage ? (
                                                <img src={post.coverImage} alt={post.coverImageAlt || displayTitle} className="object-cover w-full h-full" />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-accent/20 to-purple-500/20" />
                                            )}
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col">
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
                                            <h3 className="text-lg font-bold text-black mb-2 line-clamp-2">{displayTitle}</h3>
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {post.tags.slice(0, 2).map((tag, idx) => (
                                                    <span key={idx} className="px-2 py-1 bg-white rounded-full text-xs text-gray-700">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="flex items-center justify-between mt-auto">
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-6 h-6 bg-gray-300 rounded-full overflow-hidden">
                                                        {/* Placeholder avatar */}
                                                        <div className="w-full h-full bg-accent/20" />
                                                    </div>
                                                    <span className="text-xs text-gray-700">{post.author}</span>
                                                </div>
                                                <span
                                                    className="text-accent font-semibold text-sm hover:text-accent-600 inline-flex items-center"
                                                >
                                                    Read
                                                    <ArrowRight className="ml-1 h-3 w-3" />
                                                </span>
                                            </div>
                                        </div>
                                    </motion.article>
                                </Link>
                                )
                            })}
                        </div>

                        {filteredPosts.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-600">No articles found matching your criteria.</p>
                            </div>
                        )}

                        {filteredPosts.length > 6 && (
                            <motion.div
                                variants={fadeIn}
                                className="text-center mt-12"
                            >
                                <ShimmerButton className="px-8 py-3 rounded-lg font-semibold">
                                    <span className="text-white font-semibold">Load More Articles</span>
                                </ShimmerButton>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </section>

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

            <EnhancedCTA />
        </>
    )
}
