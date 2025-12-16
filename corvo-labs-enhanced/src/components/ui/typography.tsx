'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TypographyProps {
  children: React.ReactNode
  className?: string
  as?: keyof React.JSX.IntrinsicElements
}

interface HeadingProps extends TypographyProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  gradient?: boolean
}

interface TextProps extends TypographyProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
}

export function Heading({
  children,
  level,
  className,
  gradient = false,
  as,
  ...props
}: HeadingProps) {
  const baseClasses = "text-gray-900 mb-6"

  const sizeClasses = {
    1: "text-display text-4xl md:text-5xl xl:text-6xl lg:text-7xl 2xl:text-8xl",
    2: "text-display text-3xl md:text-4xl xl:text-5xl lg:text-6xl",
    3: "text-heading text-2xl md:text-3xl xl:text-4xl",
    4: "text-heading text-xl md:text-2xl xl:text-3xl",
    5: "text-heading text-lg md:text-xl xl:text-2xl",
    6: "text-heading text-base md:text-lg xl:text-xl"
  }

  const Tag = as || `h${level}`

  const gradientStyle = gradient ? {
    background: 'linear-gradient(135deg, rgb(255, 222, 65) 0%, rgb(255, 161, 55) 25%, rgb(255, 90, 60) 45%, rgb(245, 52, 100) 65%, rgb(183, 33, 134) 82%, rgb(81, 29, 142) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  } : {}

  const motionProps = {
    className: cn(
      baseClasses,
      sizeClasses[level],
      "font-bold",
      level <= 2 && "leading-tight tracking-tighter",
      level > 2 && "leading-snug",
      className
    ),
    style: gradientStyle,
    ...props
  }

  switch (Tag) {
    case 'h1':
      return <motion.h1 {...motionProps}>{children}</motion.h1>
    case 'h2':
      return <motion.h2 {...motionProps}>{children}</motion.h2>
    case 'h3':
      return <motion.h3 {...motionProps}>{children}</motion.h3>
    case 'h4':
      return <motion.h4 {...motionProps}>{children}</motion.h4>
    case 'h5':
      return <motion.h5 {...motionProps}>{children}</motion.h5>
    case 'h6':
      return <motion.h6 {...motionProps}>{children}</motion.h6>
    default:
      return <motion.div {...motionProps}>{children}</motion.div>
  }
}

export function Text({ children, className, size = 'md', weight = 'normal', as = 'p', ...props }: TextProps) {
  const baseClasses = "text-body text-gray-600 leading-relaxed"

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl"
  }

  const weightClasses = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold"
  }

  const motionProps = {
    className: cn(
      baseClasses,
      sizeClasses[size],
      weightClasses[weight],
      className
    ),
    ...props
  }

  switch (as) {
    case 'p':
      return <motion.p {...motionProps}>{children}</motion.p>
    case 'span':
      return <motion.span {...motionProps}>{children}</motion.span>
    case 'div':
      return <motion.div {...motionProps}>{children}</motion.div>
    case 'h1':
      return <motion.h1 {...motionProps}>{children}</motion.h1>
    case 'h2':
      return <motion.h2 {...motionProps}>{children}</motion.h2>
    case 'h3':
      return <motion.h3 {...motionProps}>{children}</motion.h3>
    case 'h4':
      return <motion.h4 {...motionProps}>{children}</motion.h4>
    case 'h5':
      return <motion.h5 {...motionProps}>{children}</motion.h5>
    case 'h6':
      return <motion.h6 {...motionProps}>{children}</motion.h6>
    default:
      return <motion.p {...motionProps}>{children}</motion.p>
  }
}

// Shortcut components
export function H1(props: Omit<HeadingProps, 'level' | 'as'>) {
  return <Heading {...props} level={1} />
}

export function H2(props: Omit<HeadingProps, 'level' | 'as'>) {
  return <Heading {...props} level={2} />
}

export function H3(props: Omit<HeadingProps, 'level' | 'as'>) {
  return <Heading {...props} level={3} />
}

export function H4(props: Omit<HeadingProps, 'level' | 'as'>) {
  return <Heading {...props} level={4} />
}

export function H5(props: Omit<HeadingProps, 'level' | 'as'>) {
  return <Heading {...props} level={5} />
}

export function H6(props: Omit<HeadingProps, 'level' | 'as'>) {
  return <Heading {...props} level={6} />
}

export function Paragraph(props: TextProps) {
  return <Text {...props} />
}

export function Subtitle({ children, className, ...props }: TypographyProps) {
  return (
    <motion.p
      className={cn(
        "text-elegant text-lg md:text-xl text-gray-600 italic leading-relaxed mb-8",
        className
      )}
      {...props}
    >
      {children}
    </motion.p>
  )
}