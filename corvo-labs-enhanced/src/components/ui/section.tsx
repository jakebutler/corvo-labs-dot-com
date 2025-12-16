'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'gray' | 'accent' | 'dark'
  container?: boolean
  spacing?: 'sm' | 'md' | 'lg' | 'xl'
  id?: string
}

export function Section({
  children,
  className,
  variant = 'default',
  container = true,
  spacing = 'lg',
  id
}: SectionProps) {
  const variantClasses = {
    default: "bg-white",
    gray: "bg-gray-50",
    accent: "bg-accent text-white",
    dark: "bg-gray-900 text-white"
  }

  const spacingClasses = {
    sm: "py-12",
    md: "py-16",
    lg: "py-20",
    xl: "py-24"
  }

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  return (
    <motion.section
      id={id}
      className={cn(
        variantClasses[variant],
        spacingClasses[spacing],
        "relative overflow-hidden",
        className
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      {container ? (
        <div className="container mx-auto px-4">{children}</div>
      ) : (
        children
      )}
    </motion.section>
  )
}

interface SectionHeaderProps {
  title: React.ReactNode
  subtitle?: React.ReactNode
  center?: boolean
  className?: string
}

export function SectionHeader({ title, subtitle, center = false, className }: SectionHeaderProps) {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <motion.div
      variants={fadeIn}
      className={cn(
        "mb-16",
        center && "text-center",
        className
      )}
    >
      {title}
      {subtitle && (
        <motion.div variants={fadeIn} className="mt-6">
          {subtitle}
        </motion.div>
      )}
    </motion.div>
  )
}