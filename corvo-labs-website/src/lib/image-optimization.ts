import Image from 'next/image'

export interface ImageOptimizationOptions {
	width?: number
	height?: number
	quality?: number
	priority?: boolean
	placeholder?: 'blur' | 'empty'
	blurDataURL?: string
	sizes?: string
	className?: string
	alt?: string
}

export interface CoverImageData {
	src: string
	alt: string
	width: number
	height: number
	blurDataURL?: string
	caption?: string
	credit?: string
	creditUrl?: string
}

// Default cover image dimensions for different contexts
export const IMAGE_DIMENSIONS = {
	blogCard: { width: 400, height: 240 },
	blogHero: { width: 1200, height: 630 },
	bogPost: { width: 1024, height: 576 },
	socialShare: { width: 1200, height: 630 },
	thumbnail: { width: 150, height: 150 }
} as const

// Generate responsive sizes string
export function generateSizesString(breakpoints: { [key: string]: number }, maxWidth: number): string {
	const sizes = Object.entries(breakpoints)
		.sort(([, a], [, b]) => b - a)
		.map(([breakpoint, width]) => `${breakpoint} ${Math.min(width, maxWidth)}px`)
		.push(`${maxWidth}px`)

	return sizes.join(', ')
}

// Common breakpoints
export const BREAKPOINTS = {
	xs: '320px',
	sm: '640px',
	md: '768px',
	lg: '1024px',
	xl: '1280px',
	'2xl': '1536px'
} as const

// Generate blur placeholder for better loading experience
export function generateBlurDataURL(src: string): string | undefined {
	// This would typically use a service like Plausible or Cloudinary to generate blur placeholders
	// For now, return a simple base64 encoded placeholder
	const placeholder = `
		<svg width="400" height="240" xmlns="http://www.w3.org/2000/svg">
			<rect width="100%" height="100%" fill="#f3f4f6"/>
			<rect x="50%" y="50%" width="40" height="40" fill="#d1d5db" transform="translate(-20, -20)"/>
		</svg>
	`
	return `data:image/svg+xml;base64,${Buffer.from(placeholder).toString('base64')}`
}

// Optimized image component for blog covers
export function OptimizedBlogImage({
	src,
	alt,
	width,
	height,
	priority = false,
	className = '',
	sizes,
	context = 'blogCard',
	blurDataURL,
	...props
}: ImageOptimizationOptions & {
	src: string
	alt: string
	width?: number
	height?: number
	context?: keyof typeof IMAGE_DIMENSIONS
}) {
	const dimensions = IMAGE_DIMENSIONS[context]
	const finalWidth = width || dimensions.width
	const finalHeight = height || dimensions.height
	const defaultSizes = sizes || generateSizesString(BREAKPOINTS, finalWidth)

	return (
		<Image
			src={src}
			alt={alt}
			width={finalWidth}
			height={finalHeight}
			priority={priority}
			quality={85}
			placeholder={blurDataURL ? 'blur' : 'empty'}
			blurDataURL={blurDataURL}
			sizes={defaultSizes}
			className={className}
			{...props}
		/>
	)
}

// Fallback image generator
export function generateFallbackImage(title: string, context: keyof typeof IMAGE_DIMENSIONS = 'blogCard'): {
	src: string
	blurDataURL: string
	width: number
	height: number
} {
	const dimensions = IMAGE_DIMENSIONS[context]
	const colors = [
		'from-blue-400 to-indigo-600',
		'from-purple-400 to-pink-600',
		'from-green-400 to-cyan-600',
		'from-orange-400 to-red-600',
		'from-teal-400 to-blue-600'
	]

	const selectedColor = colors[Math.abs(title.charCodeAt(0)) % colors.length]
	const initials = title
		.split(' ')
		.map(word => word.charAt(0).toUpperCase())
		.join('')
		.slice(0, 2)

	// Generate SVG placeholder
	const svgContent = `
		<svg width="${dimensions.width}" height="${dimensions.height}" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
					<stop offset="100%" style="stop-color:#6366f1;stop-opacity:1" />
				</linearGradient>
			</defs>
			<rect width="100%" height="100%" fill="url(#gradient)"/>
			<text x="50%" y="50%" font-family="Arial, sans-serif" font-size="48" font-weight="bold"
				  text-anchor="middle" dominant-baseline="middle" fill="white">
				${initials}
			</text>
		</svg>
	`

	const blurSvg = `
		<svg width="40" height="24" xmlns="http://www.w3.org/2000/svg">
			<rect width="100%" height="100%" fill="#e5e7eb"/>
		</svg>
	`

	return {
		src: `data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}`,
		blurDataURL: `data:image/svg+xml;base64,${Buffer.from(blurSvg).toString('base64')}`,
		width: dimensions.width,
		height: dimensions.height
	}
}

// Image credit component
export function ImageCredit({ credit, creditUrl }: { credit?: string; creditUrl?: string }) {
	if (!credit) return null

	return (
		<div className="text-xs text-muted-foreground mt-2 text-right">
			{creditUrl ? (
				<a
					href={creditUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="hover:text-primary transition-colors"
				>
					Photo: {credit}
				</a>
			) : (
				<span>Photo: {credit}</span>
			)}
		</div>
	)
}

// Lazy loading wrapper for better performance
export function LazyLoadImage({
	children,
	threshold = 0.1,
	rootMargin = '50px'
}: {
	children: React.ReactNode
	threshold?: number
	rootMargin?: string
}) {
	return (
		<div className="relative">
			{/* Placeholder */}
			<div className="absolute inset-0 bg-muted animate-pulse rounded-lg" />
			{/* Content will be loaded with Intersection Observer */}
			{children}
		</div>
	)
}

// Image optimization utilities for different use cases
export const ImageOptimization = {
	// Blog post cover image
	blogCover: (src: string, alt: string, options?: Partial<ImageOptimizationOptions>) => (
		<OptimizedBlogImage
			src={src}
			alt={alt}
			context="blogPost"
			priority={options?.priority || false}
			className={`w-full h-auto object-cover rounded-lg ${options?.className || ''}`}
			sizes="(min-width: 1024px) 1024px, 100vw"
			{...options}
		/>
	),

	// Blog card thumbnail
	blogCard: (src: string, alt: string, options?: Partial<ImageOptimizationOptions>) => (
		<OptimizedBlogImage
			src={src}
			alt={alt}
			context="blogCard"
			className={`w-full h-48 object-cover ${options?.className || ''}`}
			sizes="(min-width: 1024px) 400px, (min-width: 768px) 300px, 100vw"
			{...options}
		/>
	),

	// Social sharing image
	socialShare: (src: string, alt: string, options?: Partial<ImageOptimizationOptions>) => (
		<OptimizedBlogImage
			src={src}
			alt={alt}
			context="socialShare"
			priority={true}
			className={`w-full h-auto ${options?.className || ''}`}
			sizes="1200px"
			{...options}
		/>
	),

	// Thumbnail image
	thumbnail: (src: string, alt: string, options?: Partial<ImageOptimizationOptions>) => (
		<OptimizedBlogImage
			src={src}
			alt={alt}
			context="thumbnail"
			className={`w-12 h-12 object-cover rounded-full ${options?.className || ''}`}
			sizes="48px"
			{...options}
		/>
	)
}

// Image metadata generator for SEO
export function generateImageMetadata(
	src: string,
	alt: string,
	width: number,
	height: number,
	context: string = 'blog'
) {
	return {
		src,
		alt,
		width,
		height,
		type: 'image/webp', // Preferred format
		// You could add additional metadata here
		context,
		priority: context === 'socialShare' || context === 'blogPost'
	}
}

// Utility to validate and sanitize image URLs
export function validateImageUrl(url: string): boolean {
	try {
		const urlObj = new URL(url)
		return ['http:', 'https:'].includes(urlObj.protocol)
	} catch {
		return false
	}
}

// Utility to get image dimensions from URL (for external images)
export async function getImageDimensions(url: string): Promise<{ width: number; height: number }> {
	try {
		const response = await fetch(url, { method: 'HEAD' })
		const contentType = response.headers.get('content-type')

		if (!contentType?.startsWith('image/')) {
			throw new Error('Not an image')
		}

		// For now, return default dimensions
		// In a real implementation, you might use a service to get actual dimensions
		return { width: 1200, height: 630 }
	} catch {
		return { width: 400, height: 240 }
	}
}

// CDN and optimization service configuration
export const IMAGE_CONFIG = {
	// Configure your image optimization service here
	domain: process.env.NEXT_PUBLIC_IMAGE_DOMAIN || 'corvols.com',
	quality: 85,
	formats: ['webp', 'avif', 'jpg'],
	sizes: [320, 640, 768, 1024, 1280, 1536],
	devicePixelRatios: [1, 2, 3]
} as const