"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { cn } from "@/lib/utils"

interface BlurFadeProps {
  children: React.ReactNode
  className?: string
  delay?: number
  inView?: boolean
  variant?: {
    hidden: { opacity: number; y: number; filter: string }
    visible: { opacity: number; y: number; filter: string }
  }
}

export function BlurFade({
  children,
  className,
  delay = 0,
  inView = true,
  variant,
}: BlurFadeProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "0px" })

  const defaultVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  }

  const variants = variant || defaultVariants

  // Convert delay from ms to seconds if it's a large number
  const delayInSeconds = delay > 10 ? delay / 1000 : delay

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={!inView || isInView ? "visible" : "hidden"}
      whileInView={inView ? "visible" : undefined}
      viewport={{ once: true, margin: "0px" }}
      variants={variants}
      transition={{ duration: 0.5, delay: delayInSeconds, ease: "easeOut" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

