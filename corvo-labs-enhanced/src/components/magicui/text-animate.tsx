"use client"

import { ElementType, memo } from "react"
import { AnimatePresence, motion, MotionProps, Variants } from "framer-motion"
import { cn } from "@/lib/utils"

type AnimationType = "text" | "word" | "character" | "line"
type AnimationVariant =
  | "fadeIn"
  | "blurIn"
  | "blurInUp"
  | "blurInDown"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "scaleUp"
  | "scaleDown"

interface TextAnimateProps extends MotionProps {
  children: string
  className?: string
  delay?: number
  duration?: number
  as?: ElementType
  startOnView?: boolean
  once?: boolean
  by?: AnimationType
  animation?: AnimationVariant
}

const defaultItemAnimationVariants: Record<AnimationVariant, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  blurIn: {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
  blurInUp: {
    hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
    visible: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
  blurInDown: {
    hidden: { opacity: 0, filter: "blur(10px)", y: -20 },
    visible: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  },
  scaleDown: {
    hidden: { opacity: 0, scale: 1.5 },
    visible: { opacity: 1, scale: 1 },
  },
}

const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const defaultItemVariants: Variants = defaultItemAnimationVariants.fadeIn

export const TextAnimate = memo(function TextAnimate({
  children,
  className,
  delay = 0,
  duration = 0.3,
  as: Component = "p",
  startOnView = true,
  once = false,
  by = "word",
  animation = "fadeIn",
  ...props
}: TextAnimateProps) {
  const MotionComponent = motion.create(Component, {
    forwardMotionProps: true,
  })

  let segments: string[] = []
  switch (by) {
    case "word":
      segments = children.split(/(\s+)/)
      break
    case "character":
      segments = children.split("")
      break
    case "line":
      segments = children.split("\n")
      break
    case "text":
    default:
      segments = [children]
      break
  }

  const itemVariants = animation
    ? defaultItemAnimationVariants[animation]
    : defaultItemVariants

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: duration / segments.length,
      },
    },
  }

  return (
    <MotionComponent
      variants={containerVariants}
      initial="hidden"
      whileInView={startOnView ? "show" : undefined}
      animate={startOnView ? undefined : "show"}
      viewport={{ once }}
      className={cn("whitespace-pre-wrap", className)}
      {...props}
    >
      {segments.map((segment, i) => (
        <motion.span
          key={`${by}-${segment}-${i}`}
          variants={itemVariants}
          className={cn(
            by === "line" ? "block" : "inline-block whitespace-pre",
            segment === " " && "w-1"
          )}
        >
          {segment}
        </motion.span>
      ))}
    </MotionComponent>
  )
})


