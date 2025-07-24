'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Mail, CheckCircle, AlertCircle } from 'lucide-react'
import { useNewsletter } from '@/hooks/use-newsletter'
import { NewsletterTopic, NewsletterTopicOption } from '@/types/newsletter'

interface NewsletterSubscriptionProps {
	title?: string
	description?: string
	source?: string
	showTopics?: boolean
	compact?: boolean
	className?: string
}

const topicOptions: NewsletterTopicOption[] = [
	{
		id: 'ai-tools',
		label: 'AI Tools & Technology',
		description: 'Latest AI projects, tools, and technology insights'
	},
	{
		id: 'healthcare',
		label: 'Healthcare Innovation',
		description: 'Healthcare technology and digital health solutions'
	},
	{
		id: 'ux-design',
		label: 'UX & Design',
		description: 'User experience design process and insights'
	},
	{
		id: 'product-management',
		label: 'Product Management',
		description: 'Product strategy, frameworks, and best practices'
	},
	{
		id: 'behavior-change',
		label: 'Behavior Change',
		description: 'Psychology and behavior modification techniques'
	},
	{
		id: 'general',
		label: 'General Updates',
		description: 'All newsletter content and project updates'
	}
]

export function NewsletterSubscription({
	title = 'Stay Updated',
	description = 'Get the latest insights on AI, product management, and innovation delivered to your inbox.',
	source = 'website',
	showTopics = true,
	compact = false,
	className = ''
}: NewsletterSubscriptionProps) {
	const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [selectedTopics, setSelectedTopics] = useState<NewsletterTopic[]>(['general'])
	const [isSuccess, setIsSuccess] = useState(false)
	const { subscribe, isLoading, error } = useNewsletter()

	const handleTopicChange = (topicId: NewsletterTopic, checked: boolean) => {
		if (checked) {
			setSelectedTopics(prev => [...prev, topicId])
		} else {
			setSelectedTopics(prev => prev.filter(id => id !== topicId))
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		
		if (!email.trim()) return

		const result = await subscribe({
			email: email.trim(),
			name: name.trim() || undefined,
			interests: selectedTopics,
			source
		})

		if (result.success) {
			setIsSuccess(true)
			setEmail('')
			setName('')
			setSelectedTopics(['general'])
		}
	}

	if (isSuccess) {
		return (
			<Card className={className}>
				<CardContent className="pt-6">
					<div className="text-center space-y-4">
						<CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
						<div>
							<h3 className="text-lg font-semibold text-green-700 dark:text-green-400">
								Successfully Subscribed!
							</h3>
							<p className="text-sm text-muted-foreground mt-2">
								Please check your email to confirm your subscription.
							</p>
						</div>
						<Button 
							variant="outline" 
							onClick={() => setIsSuccess(false)}
							size="sm"
						>
							Subscribe Another Email
						</Button>
					</div>
				</CardContent>
			</Card>
		)
	}

	if (compact) {
		return (
			<div className={`space-y-4 ${className}`}>
				<div className="text-center">
					<h3 className="text-lg font-semibold mb-2">{title}</h3>
					<p className="text-sm text-muted-foreground">{description}</p>
				</div>
				
				{error && (
					<Alert variant="destructive">
						<AlertCircle className="h-4 w-4" />
						<AlertDescription>{error}</AlertDescription>
					</Alert>
				)}

				<form onSubmit={handleSubmit} className="space-y-3">
					<div className="flex gap-2">
						<Input
							type="email"
							placeholder="Enter your email"
							value={email}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
							required
							disabled={isLoading}
							className="flex-1"
						/>
						<Button type="submit" disabled={isLoading || !email.trim()}>
							{isLoading ? (
								<Loader2 className="h-4 w-4 animate-spin" />
							) : (
								<Mail className="h-4 w-4" />
							)}
						</Button>
					</div>
				</form>
			</div>
		)
	}

	return (
		<Card className={className}>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Mail className="h-5 w-5" />
					{title}
				</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				{error && (
					<Alert variant="destructive">
						<AlertCircle className="h-4 w-4" />
						<AlertDescription>{error}</AlertDescription>
					</Alert>
				)}

				<form onSubmit={handleSubmit} className="space-y-4">
					{/* Email Input */}
					<div className="space-y-2">
						<Label htmlFor="email">Email Address *</Label>
						<Input
							id="email"
							type="email"
							placeholder="your.email@example.com"
							value={email}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
							required
							disabled={isLoading}
						/>
					</div>

					{/* Name Input */}
					<div className="space-y-2">
						<Label htmlFor="name">Name (Optional)</Label>
						<Input
							id="name"
							type="text"
							placeholder="Your name"
							value={name}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
							disabled={isLoading}
						/>
					</div>

					{/* Topic Selection */}
					{showTopics && (
						<div className="space-y-3">
							<Label>What topics interest you?</Label>
							<div className="grid grid-cols-1 gap-3">
								{topicOptions.map((topic) => (
									<div key={topic.id} className="flex items-start space-x-3">
										<Checkbox
											id={topic.id}
											checked={selectedTopics.includes(topic.id)}
											onCheckedChange={(checked) => 
												handleTopicChange(topic.id, checked as boolean)
											}
											disabled={isLoading}
										/>
										<div className="grid gap-1.5 leading-none">
											<Label 
												htmlFor={topic.id}
												className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
											>
												{topic.label}
											</Label>
											<p className="text-xs text-muted-foreground">
												{topic.description}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					{/* Submit Button */}
					<Button 
						type="submit" 
						className="w-full" 
						disabled={isLoading || !email.trim()}
					>
						{isLoading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Subscribing...
							</>
						) : (
							<>
								<Mail className="mr-2 h-4 w-4" />
								Subscribe to Newsletter
							</>
						)}
					</Button>
				</form>

				<p className="text-xs text-muted-foreground text-center">
					We respect your privacy. Unsubscribe at any time.
				</p>
			</CardContent>
		</Card>
	)
}
