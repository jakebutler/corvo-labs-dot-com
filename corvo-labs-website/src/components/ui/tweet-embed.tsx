'use client'

import { useState } from 'react'

interface TweetProps {
	id: string
	className?: string
}

export function Tweet({ id, className = '' }: TweetProps) {
	const [isLoading, setIsLoading] = useState(true)
	const [hasError, setHasError] = useState(false)

	// Twitter embed URL
	const embedUrl = `https://platform.twitter.com/embed/Tweet.html?id=${id}`

	const handleLoad = () => {
		setIsLoading(false)
	}

	const handleError = () => {
		setHasError(true)
		setIsLoading(false)
	}

	if (hasError) {
		return (
			<div className={`border rounded-lg p-4 bg-muted/50 ${className}`}>
				<p className="text-sm text-muted-foreground">
					Tweet could not be loaded.{' '}
					<a
						href={`https://twitter.com/i/web/status/${id}`}
						target="_blank"
						rel="noopener noreferrer"
						className="text-primary hover:underline"
					>
						View on Twitter
					</a>
				</p>
			</div>
		)
	}

	return (
		<div className={`my-6 ${className}`}>
			{isLoading && (
				<div className="border rounded-lg p-8 bg-muted/50 animate-pulse">
					<div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
					<div className="h-3 bg-muted rounded w-full mb-2"></div>
					<div className="h-3 bg-muted rounded w-5/6"></div>
				</div>
			)}
			<iframe
				src={embedUrl}
				onLoad={handleLoad}
				onError={handleError}
				className={`w-full border-0 rounded-lg ${isLoading ? 'hidden' : 'block'}`}
				height="500"
				sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox"
			/>
		</div>
	)
}