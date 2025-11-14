'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { MailIcon, CheckIcon, AlertCircleIcon, SparklesIcon } from 'lucide-react'

interface NewsletterSubscribeProps {
	source?: string
	title?: string
	description?: string
	className?: string
	compact?: boolean
	showTopics?: boolean
}

interface SubscriptionFormData {
	email: string
	topics: string[]
}

export function NewsletterSubscribe({
	source = 'blog',
	title = 'Stay in the Loop',
	description = 'Get notified when new articles are published. Join other readers staying ahead in AI, product management, and innovation.',
	className = '',
	compact = false,
	showTopics = false
}: NewsletterSubscribeProps) {
	const [formData, setFormData] = useState<SubscriptionFormData>({
		email: '',
		topics: []
	})
	const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
	const [message, setMessage] = useState('')

	const availableTopics = [
		'AI & Machine Learning',
		'Product Strategy',
		'Healthcare Innovation',
		'UX Design',
		'Behavior Change',
		'Workflow Automation',
		'Industry Insights'
	]

	const handleTopicToggle = (topic: string) => {
		setFormData(prev => ({
			...prev,
			topics: prev.topics.includes(topic)
				? prev.topics.filter(t => t !== topic)
				: [...prev.topics, topic]
		}))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!formData.email) {
			setStatus('error')
			setMessage('Please enter your email address')
			return
		}

		setStatus('loading')
		setMessage('')

		try {
			// Simulate API call - replace with actual newsletter service
			await new Promise(resolve => setTimeout(resolve, 1500))

			// Here you would integrate with your newsletter service
			// For example: ConvertKit, Mailchimp, Substack, etc.
			const response = await fetch('/api/newsletter/subscribe', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: formData.email,
					topics: formData.topics,
					source,
					tags: showTopics ? formData.topics : ['blog-subscriber']
				})
			})

			if (response.ok) {
				setStatus('success')
				setMessage('Welcome! Check your email to confirm your subscription.')
				setFormData({ email: '', topics: [] })
			} else {
				throw new Error('Subscription failed')
			}
		} catch (error) {
			setStatus('error')
			setMessage('Something went wrong. Please try again.')
		}
	}

	if (compact) {
		return (
			<div className={`bg-muted/50 rounded-lg p-4 ${className}`}>
				<form onSubmit={handleSubmit} className="space-y-3">
					<div className="flex items-center gap-2">
						<MailIcon className="w-4 h-4 text-primary" />
						<span className="font-medium text-sm">Get updates</span>
					</div>
					<div className="flex gap-2">
						<Input
							type="email"
							placeholder="Enter your email"
							value={formData.email}
							onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
							className="flex-1"
							required
						/>
						<Button type="submit" disabled={status === 'loading'}>
							{status === 'loading' ? '...' : 'Subscribe'}
						</Button>
					</div>
					{status === 'success' && (
						<div className="flex items-center gap-2 text-green-600 text-sm">
							<CheckIcon className="w-4 h-4" />
							{message}
						</div>
					)}
					{status === 'error' && (
						<div className="flex items-center gap-2 text-red-600 text-sm">
							<AlertCircleIcon className="w-4 h-4" />
							{message}
						</div>
					)}
				</form>
			</div>
		)
	}

	return (
		<Card className={`border-2 ${className}`}>
			<CardHeader className="text-center pb-4">
				<div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
					<SparklesIcon className="w-6 h-6 text-primary" />
				</div>
				<CardTitle className="text-xl">{title}</CardTitle>
				<CardDescription className="text-base">
					{description}
				</CardDescription>
			</CardHeader>

			<CardContent className="space-y-6">
				{/* Benefits */}
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
					<div className="flex items-center gap-2">
						<CheckIcon className="w-4 h-4 text-green-600 flex-shrink-0" />
						<span>Weekly insights</span>
					</div>
					<div className="flex items-center gap-2">
						<CheckIcon className="w-4 h-4 text-green-600 flex-shrink-0" />
						<span>AI implementation tips</span>
					</div>
					<div className="flex items-center gap-2">
						<CheckIcon className="w-4 h-4 text-green-600 flex-shrink-0" />
						<span>Industry case studies</span>
					</div>
					<div className="flex items-center gap-2">
						<CheckIcon className="w-4 h-4 text-green-600 flex-shrink-0" />
						<span>Exclusive content</span>
					</div>
				</div>

				<Separator />

				<form onSubmit={handleSubmit} className="space-y-4">
					{/* Topics selection */}
					{showTopics && (
						<div className="space-y-3">
							<label className="text-sm font-medium">Topics you're interested in:</label>
							<div className="flex flex-wrap gap-2">
								{availableTopics.map(topic => (
									<Badge
										key={topic}
										variant={formData.topics.includes(topic) ? "default" : "outline"}
										className="cursor-pointer hover:bg-primary/80 transition-colors"
										onClick={() => handleTopicToggle(topic)}
									>
										{topic}
									</Badge>
								))}
							</div>
						</div>
					)}

					{/* Email input */}
					<div className="space-y-2">
						<label htmlFor="email" className="text-sm font-medium">
							Email address
						</label>
						<Input
							id="email"
							type="email"
							placeholder="you@example.com"
							value={formData.email}
							onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
							required
							className="h-11"
						/>
					</div>

					{/* Submit button */}
					<Button
						type="submit"
						className="w-full h-11"
						disabled={status === 'loading'}
					>
						{status === 'loading' ? (
							<div className="flex items-center gap-2">
								<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
								Subscribing...
							</div>
						) : (
							'Subscribe to Newsletter'
						)}
					</Button>

					{/* Status messages */}
					{status === 'success' && (
						<div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800">
							<CheckIcon className="w-5 h-5" />
							<span className="text-sm">{message}</span>
						</div>
					)}

					{status === 'error' && (
						<div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800">
							<AlertCircleIcon className="w-5 h-5" />
							<span className="text-sm">{message}</span>
						</div>
					)}
				</form>

				{/* Privacy notice */}
				<div className="text-xs text-muted-foreground text-center pt-2">
					We respect your privacy. Unsubscribe at any time.
				</div>
			</CardContent>
		</Card>
	)
}

// Inline newsletter for blog post footer
export function BlogPostNewsletter({
	className = ''
}: {
	className?: string
}) {
	return (
		<div className={`bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-xl p-6 md:p-8 ${className}`}>
			<div className="max-w-2xl mx-auto text-center">
				<h3 className="text-xl md:text-2xl font-bold mb-4">
					Enjoyed this article?
				</h3>
				<p className="text-muted-foreground mb-6">
					Get more insights on AI, product strategy, and healthcare innovation delivered to your inbox.
				</p>
				<NewsletterSubscribe
					source="blog-post-footer"
					title=""
					description=""
					compact={true}
					className="bg-transparent border-0 p-0"
				/>
			</div>
		</div>
	)
}

// Newsletter sidebar widget
export function NewsletterSidebar({
	className = ''
}: {
	className?: string
}) {
	return (
		<div className={`sticky top-24 ${className}`}>
			<NewsletterSubscribe
				source="blog-sidebar"
				title="Newsletter"
				description="Get the latest posts and insights delivered to your inbox."
				compact={true}
				className="bg-background border"
			/>
		</div>
	)
}