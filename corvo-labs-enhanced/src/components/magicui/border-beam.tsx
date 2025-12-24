"use client"

import { cn } from "@/lib/utils"
import { CSSProperties } from "react"

interface BorderBeamProps {
  className?: string
  size?: number
  duration?: number
  borderWidth?: number
  anchor?: number
  colorFrom?: string
  colorTo?: string
  delay?: number
}

export function BorderBeam({
  className,
  size = 200,
  duration = 15,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      style={
        {
          "--size": size,
          "--duration": duration,
          "--anchor": anchor,
          "--border-width": borderWidth,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `-${delay}s`,
        } as CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]",
        // mask styles
        "[background:linear-gradient(transparent,transparent),linear-gradient(var(--color-from),var(--color-to))] [background-clip:padding-box,border-box] [background-origin:border-box] [mask:linear-gradient(#0000_0_0)_content-box,linear-gradient(#0000_0_0)] [mask-composite:xor] [mask-clip:padding-box,border-box]",
        // animation
        "animate-border-beam",
        className
      )}
    />
  )
}


