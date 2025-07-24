'use client'

import { NewsletterSubscription } from '@/components/newsletter-subscription'

interface NewsletterCtaProps {
	title?: string
	description?: string
	source: string
	compact?: boolean
	className?: string
}

export function NewsletterCta({
	title = "Don't Miss Out",
	description = "Get the latest insights delivered directly to your inbox. Join other professionals staying ahead of the curve.",
	source,
	compact = false,
	className = ''
}: NewsletterCtaProps) {
	if (compact) {
		return (
			<div className={`bg-muted/50 rounded-lg p-6 ${className}`}>
				<NewsletterSubscription
					title={title}
					description={description}
					source={source}
					showTopics={false}
					compact={true}
				/>
			</div>
		)
	}

	return (
		<section className={`py-12 ${className}`}>
			<div className="container mx-auto max-w-2xl">
				<NewsletterSubscription
					title={title}
					description={description}
					source={source}
					showTopics={true}
					compact={false}
				/>
			</div>
		</section>
	)
}
