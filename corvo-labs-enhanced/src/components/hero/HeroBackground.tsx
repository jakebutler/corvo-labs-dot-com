'use client'

interface HeroBackgroundProps {
  className?: string
}

export function HeroBackground({ className }: HeroBackgroundProps) {
  return (
    <div
      className={className}
      aria-hidden="true"
    >
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, #1E3A5F 1px, transparent 1px),
              linear-gradient(to bottom, #1E3A5F 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/20" />

      {/* Subtle radial gradient for depth */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
    </div>
  )
}