"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface StripedPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number
  height?: number
  x?: number
  y?: number
  className?: string
  direction?: "left" | "right"
}

export function StripedPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  className,
  direction = "left",
  ...props
}: StripedPatternProps) {
  const id = React.useId()
  const patternId = `striped-pattern-${id}`

  return (
    <svg
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      {...props}
    >
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternTransform={`rotate(${direction === "right" ? 45 : -45})`}
        >
          <line
            x1={x === -1 ? 0 : x}
            y1={y === -1 ? 0 : y}
            x2={x === -1 ? width : x + width}
            y2={y === -1 ? height : y + height}
            stroke="currentColor"
            strokeWidth="1"
            className="text-gray-300 dark:text-gray-800"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  )
}


