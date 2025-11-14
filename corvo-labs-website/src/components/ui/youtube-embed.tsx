'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PlayIcon } from 'lucide-react'

interface YouTubeEmbedProps {
	id: string
	title?: string
	className?: string
}

export function YouTubeEmbed({ id, title = 'YouTube video', className = '' }: YouTubeEmbedProps) {
	const [isPlaying, setIsPlaying] = useState(false)

	const thumbnailUrl = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
	const embedUrl = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`

	const handlePlay = () => {
		setIsPlaying(true)
	}

	if (isPlaying) {
		return (
			<div className={`relative w-full my-6 rounded-lg overflow-hidden ${className}`}>
				<iframe
					src={embedUrl}
					title={title}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
					className="w-full aspect-video border-0"
				/>
			</div>
		)
	}

	return (
		<div className={`relative w-full my-6 rounded-lg overflow-hidden group cursor-pointer ${className}`}>
			<div className="relative aspect-video">
				<img
					src={thumbnailUrl}
					alt={title}
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
					<Button
						size="lg"
						onClick={handlePlay}
						className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 text-white p-0"
					>
						<PlayIcon className="w-6 h-6 ml-1" />
					</Button>
				</div>
				<div className="absolute bottom-4 right-4 bg-black/80 text-white text-xs px-2 py-1 rounded">
					YouTube
				</div>
			</div>
		</div>
	)
}