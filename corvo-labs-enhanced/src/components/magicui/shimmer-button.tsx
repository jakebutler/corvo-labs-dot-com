"use client"

import React, { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string
  shimmerSize?: string
  borderRadius?: string
  shimmerDuration?: string
  background?: string
  className?: string
  children?: React.ReactNode
}

export function ShimmerButton({
  children,
  className,
  shimmerColor = "#9c40ff",
  shimmerSize = "0.05em",
  shimmerDuration = "3s",
  borderRadius = "100px",
  background = "#FF6B47",
  ...props
}: ShimmerButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const shimmerRef = useRef<HTMLDivElement>(null)

  // Darken the orange background on hover
  const hoverBackground = isHovered ? "#E55A3A" : background

  useEffect(() => {
    // Trigger initial shimmer once
    const timer = setTimeout(() => {
      if (shimmerRef.current) {
        shimmerRef.current.style.animation = `shimmer-once ${shimmerDuration} ease-in-out forwards`
      }
      setTimeout(() => {
        setHasAnimated(true)
      }, parseFloat(shimmerDuration) * 1000)
    }, 100)
    return () => clearTimeout(timer)
  }, [shimmerDuration])

  return (
    <button
      style={
        {
          "--shimmer-color": shimmerColor,
          "--shimmer-size": shimmerSize,
          "--shimmer-duration": shimmerDuration,
          "--border-radius": borderRadius,
          "--background": hoverBackground,
        } as React.CSSProperties
      }
      className={cn(
        "group relative z-10 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 text-white [background:var(--background)] [border-radius:var(--border-radius)] transition-all duration-300",
        "transform-gpu transition-transform duration-300 ease-in-out active:scale-95",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 -z-10 overflow-hidden [border-radius:var(--border-radius)]"
        )}
      >
        {/* Initial shimmer - runs once on mount */}
        {!hasAnimated && (
          <div
            ref={shimmerRef}
            className="absolute -inset-full rotate-12 bg-[linear-gradient(110deg,transparent_35%,var(--shimmer-color)_50%,transparent_65%,transparent_100%)]"
          />
        )}
        {/* Hover shimmer */}
        {isHovered && (
          <div
            className="absolute -inset-full rotate-12 animate-shimmer-once bg-[linear-gradient(110deg,transparent_35%,var(--shimmer-color)_50%,transparent_65%,transparent_100%)]"
            style={{
              animationDuration: shimmerDuration,
            }}
          />
        )}
      </div>
      {children}
    </button>
  )
}


