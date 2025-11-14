'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
	TwitterShareButton,
	LinkedinShareButton,
	FacebookShareButton,
	EmailShareButton,
	WhatsappShareButton,
	TelegramShareButton
} from 'react-share'
import {
	TwitterIcon,
	LinkedinIcon,
	FacebookIcon,
	EmailIcon,
	WhatsappIcon,
	TelegramIcon,
	Link2Icon,
	CheckIcon
} from 'lucide-react'

interface SocialShareProps {
	url: string
	title: string
	excerpt: string
	tags: string[]
	className?: string
	showCopy?: boolean
	showLabels?: boolean
	compact?: boolean
}

export function SocialShare({
	url,
	title,
	excerpt,
	tags,
	className = '',
	showCopy = true,
	showLabels = false,
	compact = false
}: SocialShareProps) {
	const [copied, setCopied] = useState(false)

	const shareUrl = typeof window !== 'undefined'
		? window.location.origin + url
		: url

	const handleCopyLink = async () => {
		try {
			await navigator.clipboard.writeText(shareUrl)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch (err) {
			console.error('Failed to copy link:', err)
		}
	}

	// Share text for different platforms
	const twitterText = `${title}${excerpt ? ` - ${excerpt}` : ''}`
	const linkedinTitle = title
	const linkedinSummary = excerpt
	const emailSubject = `Check out this article: ${title}`
	const emailBody = `I thought you might find this article interesting:\n\n${title}\n${excerpt}\n\nRead more: ${shareUrl}`

	const buttonSize = compact ? 'sm' : 'default'
	const iconSize = compact ? 'w-4 h-4' : 'w-5 h-5'
	const buttonClass = compact
		? 'p-2'
		: showLabels
			? 'px-3 py-2'
			: 'px-3 py-2'

	const shareButtons = [
		{
			name: 'Twitter',
			Button: TwitterShareButton,
			Icon: TwitterIcon,
			props: {
				url: shareUrl,
				title: twitterText,
				via: 'corvols', // Replace with actual Twitter handle
				hashtags: tags.slice(0, 3).map(tag => tag.replace(/\s+/g, ''))
			}
		},
		{
			name: 'LinkedIn',
			Button: LinkedinShareButton,
			Icon: LinkedinIcon,
			props: {
				url: shareUrl,
				title: linkedinTitle,
				summary: linkedinSummary,
				source: 'Corvo Labs Blog'
			}
		},
		{
			name: 'Facebook',
			Button: FacebookShareButton,
			Icon: FacebookIcon,
			props: {
				url: shareUrl,
				quote: excerpt
			}
		},
		{
			name: 'WhatsApp',
			Button: WhatsappShareButton,
			Icon: WhatsappIcon,
			props: {
				url: shareUrl,
				title: title,
				separator: ' - '
			}
		},
		{
			name: 'Telegram',
			Button: TelegramShareButton,
			Icon: TelegramIcon,
			props: {
				url: shareUrl,
				title: title
			}
		},
		{
			name: 'Email',
			Button: EmailShareButton,
			Icon: EmailIcon,
			props: {
				subject: emailSubject,
				body: emailBody
			}
		}
	]

	return (
		<div className={`space-y-4 ${className}`}>
			{/* Share text */}
			<div>
				<h3 className="font-medium text-sm mb-3">Share this article</h3>
				{!compact && (
					<p className="text-sm text-muted-foreground mb-4">
						If you found this article helpful, share it with your network.
					</p>
				)}
			</div>

			{/* Share buttons */}
			<div className={`flex flex-wrap gap-2 ${compact ? 'justify-center' : ''}`}>
				{shareButtons.map(({ name, Button, Icon, props }) => (
					<Button
						key={name}
						variant="outline"
						size={buttonSize}
						className={`${buttonClass} hover:bg-primary/10 hover:border-primary/20 transition-colors`}
						asChild
					>
						<Button {...props}>
							<Icon className={`${iconSize} ${showLabels ? 'mr-2' : ''}`} />
							{showLabels && <span>{name}</span>}
						</Button>
					</Button>
				))}

				{showCopy && (
					<Button
						variant="outline"
						size={buttonSize}
						className={`${buttonClass} hover:bg-primary/10 hover:border-primary/20 transition-colors`}
						onClick={handleCopyLink}
					>
						{copied ? (
							<CheckIcon className={`${iconSize} text-green-600`} />
						) : (
							<Link2Icon className={iconSize} />
						)}
						{showLabels && (
							<span className={copied ? 'text-green-600' : ''}>
								{copied ? 'Copied!' : 'Copy Link'}
							</span>
						)}
					</Button>
				)}
			</div>

			{/* Tags for additional sharing context */}
			{!compact && tags.length > 0 && (
				<div className="pt-2 border-t">
					<p className="text-xs text-muted-foreground mb-2">Tags:</p>
					<div className="flex flex-wrap gap-1">
						{tags.slice(0, 5).map(tag => (
							<Badge key={tag} variant="secondary" className="text-xs">
								{tag}
							</Badge>
						))}
						{tags.length > 5 && (
							<Badge variant="secondary" className="text-xs">
								+{tags.length - 5}
							</Badge>
						)}
					</div>
				</div>
			)}

			{/* Share statistics */}
			{!compact && (
				<div className="pt-2 border-t text-xs text-muted-foreground">
					<p>
						Help others discover this article by sharing it on your favorite platform.
					</p>
				</div>
			)}
		</div>
	)
}

// Floating share buttons for mobile
export function FloatingSocialShare({
	url,
	title,
	excerpt,
	tags
}: {
	url: string
	title: string
	excerpt: string
	tags: string[]
}) {
	const shareUrl = typeof window !== 'undefined'
		? window.location.origin + url
		: url

	const handleNativeShare = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title,
					text: excerpt,
					url: shareUrl
				})
			} catch (err) {
				console.error('Error sharing:', err)
			}
		}
	}

	// Only show on mobile and if native sharing is supported
	if (typeof window === 'undefined' || !navigator.share) {
		return null
	}

	return (
		<div className="fixed bottom-20 right-4 z-40 md:hidden">
			<Button
				size="lg"
				className="rounded-full w-14 h-14 shadow-lg"
				onClick={handleNativeShare}
			>
				<svg
					className="w-5 h-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
					/>
				</svg>
			</Button>
		</div>
	)
}

// Simple share buttons for minimal design
export function SimpleSocialShare({
	url,
	title,
	excerpt
}: {
	url: string
	title: string
	excerpt: string
}) {
	const [copied, setCopied] = useState(false)

	const shareUrl = typeof window !== 'undefined'
		? window.location.origin + url
		: url

	const handleCopyLink = async () => {
		try {
			await navigator.clipboard.writeText(shareUrl)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch (err) {
			console.error('Failed to copy link:', err)
		}
	}

	return (
		<div className="flex items-center gap-2">
			<span className="text-sm text-muted-foreground">Share:</span>
			<Button
				variant="ghost"
				size="sm"
				className="h-8 px-2 text-xs"
				onClick={() => {
					const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${title} - ${excerpt}`)}&url=${encodeURIComponent(shareUrl)}`
					window.open(twitterUrl, '_blank')
				}}
			>
				Twitter
			</Button>
			<Button
				variant="ghost"
				size="sm"
				className="h-8 px-2 text-xs"
				onClick={() => {
					const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
					window.open(linkedinUrl, '_blank')
				}}
			>
				LinkedIn
			</Button>
			<Button
				variant="ghost"
				size="sm"
				className="h-8 px-2 text-xs"
				onClick={handleCopyLink}
			>
				{copied ? (
					<span className="text-green-600">Copied!</span>
				) : (
					'Copy Link'
				)}
			</Button>
		</div>
	)
}