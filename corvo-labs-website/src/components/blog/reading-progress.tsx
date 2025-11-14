'use client'

import { useState, useEffect } from 'react'

interface ReadingProgressProps {
	className?: string
	height?: number
	bgColor?: string
	progressColor?: string
	showPercentage?: boolean
	position?: 'top' | 'bottom'
}

export function ReadingProgress({
	className = '',
	height = 3,
	bgColor = 'hsl(var(--muted))',
	progressColor = 'hsl(var(--primary))',
	showPercentage = false,
	position = 'top'
}: ReadingProgressProps) {
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		const updateProgress = () => {
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop
			const scrollHeight = document.documentElement.scrollHeight
			const clientHeight = document.documentElement.clientHeight

			const scrolled = scrollTop / (scrollHeight - clientHeight)
			const percentage = Math.min(scrolled * 100, 100)

			setProgress(percentage)
		}

		const throttledUpdate = () => {
			requestAnimationFrame(updateProgress)
		}

		window.addEventListener('scroll', throttledUpdate, { passive: true })
		window.addEventListener('resize', throttledUpdate, { passive: true })

		// Initial update
		updateProgress()

		return () => {
			window.removeEventListener('scroll', throttledUpdate)
			window.removeEventListener('resize', throttledUpdate)
		}
	}, [])

	const positionClasses = position === 'top'
		? 'top-0 left-0 right-0'
		: 'bottom-0 left-0 right-0'

	return (
		<div className={`fixed z-50 ${positionClasses} ${className}`}>
			<div
				className="w-full transition-all duration-150 ease-out"
				style={{ backgroundColor: bgColor, height: `${height}px` }}
			>
				<div
					className="h-full transition-all duration-150 ease-out origin-left"
					style={{
						width: `${progress}%`,
						backgroundColor: progressColor,
						height: `${height}px`
					}}
				/>
			</div>
			{showPercentage && (
				<div className="absolute top-2 right-4 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded">
					{Math.round(progress)}%
				</div>
			)}
		</div>
	)
}

// Floating reading progress indicator for mobile
export function FloatingReadingProgress({
	className = ''
}: {
	className?: string
}) {
	const [progress, setProgress] = useState(0)
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const updateProgress = () => {
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop
			const scrollHeight = document.documentElement.scrollHeight
			const clientHeight = document.documentElement.clientHeight

			const scrolled = scrollTop / (scrollHeight - clientHeight)
			const percentage = Math.min(scrolled * 100, 100)

			setProgress(percentage)

			// Show after scrolling past hero section
			setIsVisible(scrollTop > window.innerHeight * 0.5)
		}

		const throttledUpdate = () => {
			requestAnimationFrame(updateProgress)
		}

		window.addEventListener('scroll', throttledUpdate, { passive: true })
		window.addEventListener('resize', throttledUpdate, { passive: true })

		updateProgress()

		return () => {
			window.removeEventListener('scroll', throttledUpdate)
			window.removeEventListener('resize', throttledUpdate)
		}
	}, [])

	if (!isVisible) return null

	return (
		<div className={`fixed bottom-6 right-6 z-50 md:hidden ${className}`}>
			<div className="relative w-12 h-12 bg-background border border-border rounded-full shadow-lg backdrop-blur-sm">
				<svg
					className="absolute inset-0 w-full h-full -rotate-90"
					viewBox="0 0 36 36"
				>
					<path
						className="text-muted"
						stroke="currentColor"
						strokeWidth="2"
						fill="none"
						d="M18 2.0845
						a 15.9155 15.9155 0 0 1 0 31.831
						a 15.9155 15.9155 0 0 1 0 -31.831"
					/>
					<path
						className="text-primary transition-all duration-150 ease-out"
						stroke="currentColor"
						strokeWidth="2"
						strokeDasharray={`${progress}, 100`}
						fill="none"
						d="M18 2.0845
						a 15.9155 15.9155 0 0 1 0 31.831
						a 15.9155 15.9155 0 0 1 0 -31.831"
					/>
				</svg>
				<div className="absolute inset-0 flex items-center justify-center">
					<span className="text-xs font-medium">{Math.round(progress)}%</span>
				</div>
			</div>
		</div>
	)
}