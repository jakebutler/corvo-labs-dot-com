"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface NumberTickerProps {
  value: number
  direction?: "up" | "down"
  delay?: number
  className?: string
  decimalPlaces?: number
}

export function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
}: NumberTickerProps) {
  const [displayValue, setDisplayValue] = useState(value)
  const [isAnimating, setIsAnimating] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const startTime = Date.now()
    const duration = 2000
    const startValue = displayValue
    const endValue = value

    setIsAnimating(true)

    const animate = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = startValue + (endValue - startValue) * easeOutQuart

      setDisplayValue(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setIsAnimating(false)
      }
    }

    const timeout = setTimeout(() => {
      requestAnimationFrame(animate)
    }, delay)

    return () => {
      clearTimeout(timeout)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [value, delay])

  const formattedValue = decimalPlaces > 0
    ? displayValue.toFixed(decimalPlaces)
    : Math.floor(displayValue).toString()

  return (
    <span className={cn("tabular-nums", className)}>
      {formattedValue}
    </span>
  )
}


