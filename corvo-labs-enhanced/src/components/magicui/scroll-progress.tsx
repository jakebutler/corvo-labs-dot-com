"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface ScrollProgressProps {
  className?: string
  color?: string
  height?: string
}

export function ScrollProgress({
  className,
  color = "#FF6B47",
  height = "2px",
}: ScrollProgressProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setProgress(scrollPercent)
    }

    window.addEventListener("scroll", updateProgress)
    updateProgress()

    return () => window.removeEventListener("scroll", updateProgress)
  }, [])

  return (
    <div
      className={cn("fixed top-0 left-0 right-0 z-50", className)}
      style={{ height }}
    >
      <div
        className="transition-all duration-150 ease-out"
        style={{
          width: `${progress}%`,
          height: "100%",
          backgroundColor: color,
        }}
      />
    </div>
  )
}


