'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { OptimizedImageProps } from './Hero.types'

export function OptimizedHeroImage({
  src,
  alt,
  priority = false,
  className,
  sizes,
  quality = 85,
  width,
  height
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted before rendering to prevent hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
  }

  // Don't render until mounted to prevent SSR/client mismatch
  if (!mounted) {
    return (
      <div className={cn('relative', className)}>
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
      </div>
    )
  }

  if (hasError) {
    return (
      <div className={cn(
        'flex items-center justify-center bg-gray-100 rounded-lg',
        className
      )}>
        <div className="text-center p-4">
          <div className="text-gray-400 text-sm">Image unavailable</div>
        </div>
      </div>
    )
  }

  // Check if the image is an SVG
  const isSvg = src.endsWith('.svg')

  // Generate a proper blur data URL (simplified version)
  const blurDataURL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+Cjwvc3ZnPgo="

  return (
    <div className={cn('relative', className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
      )}

      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes || "(max-width: 768px) 80vw, (max-width: 1024px) 40vw, 30vw"}
        quality={quality}
        // Don't use blur placeholder for SVGs as it may cause issues
        placeholder={isSvg ? 'empty' : 'blur'}
        blurDataURL={isSvg ? undefined : blurDataURL}
        onLoad={handleLoad}
        onError={handleError}
        // Add unoptimized for SVGs to prevent Next.js from trying to optimize them
        unoptimized={isSvg}
        className={cn(
          'relative z-10 transition-opacity duration-300 ease-out w-full h-auto',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
      />
    </div>
  )
}