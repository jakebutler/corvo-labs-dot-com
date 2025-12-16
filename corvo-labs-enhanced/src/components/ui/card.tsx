'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'glass' | 'elevated' | 'flat'
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg'
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: React.ReactNode
  description: React.ReactNode
  className?: string
}

interface ServiceCardProps {
  title: React.ReactNode
  description: React.ReactNode
  image?: string
  features?: string[]
  className?: string
}

export function Card({
  children,
  className,
  variant = 'default',
  hover = true,
  padding = 'md'
}: CardProps) {
  const variantClasses = {
    default: "bg-white rounded-xl shadow-sm border border-gray-200",
    glass: "glass-card rounded-xl",
    elevated: "bg-white rounded-xl shadow-lg border border-gray-200",
    flat: "bg-white rounded-lg"
  }

  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8"
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <motion.div
      variants={fadeIn}
      className={cn(
        variantClasses[variant],
        paddingClasses[padding],
        hover && "transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        className
      )}
      whileHover={hover ? { y: -4, scale: 1.02 } : {}}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

export function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <Card variant="glass" className={cn("text-center", className)}>
      <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-accent-100 to-accent-50 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-heading text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-body text-gray-600 leading-relaxed">{description}</p>
    </Card>
  )
}

export function ServiceCard({ title, description, image, features, className }: ServiceCardProps) {
  return (
    <Card className={cn("h-full", className)}>
      {image && (
        <div className="mb-6 flex justify-center">
          <img
            src={image}
            alt={typeof title === 'string' ? title : ''}
            className="h-32 w-32 object-contain"
          />
        </div>
      )}
      <h3 className="text-heading text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-body text-gray-600 leading-relaxed mb-6">{description}</p>
      {features && features.length > 0 && (
        <div className="space-y-2">
          {features.slice(0, 3).map((feature, index) => (
            <div key={index} className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}

interface StatCardProps {
  number: string | number
  label: string
  className?: string
}

export function StatCard({ number, label, className }: StatCardProps) {
  const fadeIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, delay: 0.2 }
    }
  }

  return (
    <motion.div
      variants={fadeIn}
      className={cn("text-center", className)}
    >
      <div className="text-display text-4xl md:text-5xl font-bold mb-2 text-gray-900">{number}</div>
      <div className="text-body text-sm md:text-base text-gray-600">{label}</div>
    </motion.div>
  )
}

interface TestimonialCardProps {
  quote: string
  author: string
  role?: string
  className?: string
}

export function TestimonialCard({ quote, author, role, className }: TestimonialCardProps) {
  return (
    <Card variant="glass" className={cn("relative", className)}>
      <div className="absolute top-4 left-4 text-6xl text-accent-200 opacity-50">"</div>
      <blockquote className="text-body text-gray-700 italic leading-relaxed mb-6 pl-8">
        {quote}
      </blockquote>
      <div className="text-right">
        <div className="text-heading font-semibold text-gray-900">{author}</div>
        {role && <div className="text-sm text-gray-600">{role}</div>}
      </div>
    </Card>
  )
}