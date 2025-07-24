import { Metadata } from 'next'
import { NewsletterSubscription } from '@/components/newsletter-subscription'

export const metadata: Metadata = {
	title: 'Subscribe to Newsletter | Corvo Labs',
	description: 'Stay updated with the latest insights on AI, product management, and healthcare innovation from Corvo Labs.',
}

export default function SubscribePage() {
	return (
		<div className="container mx-auto px-4 py-12">
			<div className="max-w-2xl mx-auto">
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold mb-4">
						Stay Ahead of the Curve
					</h1>
					<p className="text-xl text-muted-foreground">
						Get exclusive insights on AI innovation, product strategy, and emerging technologies. 
						Join industry professionals who trust our expertise.
					</p>
				</div>

				<NewsletterSubscription
					title="Subscribe to Our Newsletter"
					description="Choose the topics that interest you most and get personalized content delivered to your inbox."
					source="subscribe-page"
					showTopics={true}
					compact={false}
				/>

				<div className="mt-8 text-center text-sm text-muted-foreground">
					<p>
						We respect your privacy. Unsubscribe at any time by visiting our{' '}
						<a href="/unsubscribe" className="underline hover:text-foreground">
							unsubscribe page
						</a>
						.
					</p>
				</div>
			</div>
		</div>
	)
}
