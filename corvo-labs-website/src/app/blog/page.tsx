import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { NewsletterCta } from '@/components/newsletter-cta'
import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts, getAllTags } from '@/lib/blog'

export const metadata = {
	title: 'Blog - Corvo Labs',
	description: 'Insights on AI, product management, healthcare innovation, UX design, and behavior change from the Corvo Labs team.'
}

export default function BlogPage() {
	const posts = getAllPosts()
	const tags = getAllTags()

	return (
		<div className="min-h-screen py-12">
			{/* Hero Section */}
			<section className="py-12 px-4">
				<div className="container mx-auto max-w-4xl text-center">
					<h1 className="text-4xl md:text-5xl font-bold mb-6">
						Insights & Ideas
					</h1>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
						Exploring the intersection of AI, product strategy, healthcare innovation, 
						and human-centered design through practical insights and real-world applications.
					</p>
				</div>
			</section>

			{/* Tags Filter */}
			{tags.length > 0 && (
				<section className="py-6 px-4 bg-muted/50">
					<div className="container mx-auto max-w-6xl">
						<h2 className="text-lg font-semibold mb-4">Topics</h2>
						<div className="flex flex-wrap gap-2">
							{tags.map(tag => (
								<Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-secondary/80">
									{tag}
								</Badge>
							))}
						</div>
					</div>
				</section>
			)}

			{/* Blog Posts */}
			<section className="py-12 px-4">
				<div className="container mx-auto max-w-6xl">
					{posts.length === 0 ? (
						<div className="text-center py-12">
							<h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
							<p className="text-muted-foreground mb-8">
								We&apos;re preparing insightful content about AI, product management, and healthcare innovation. 
								Stay tuned for our first posts!
							</p>
							<Button asChild>
								<Link href="/subscribe">Get Notified</Link>
							</Button>
						</div>
					) : (
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
							{posts.map(post => (
								<Card key={post.slug} className="h-full flex flex-col overflow-hidden">
									{/* Cover Image */}
									<div className="relative w-full h-40 md:h-44 lg:h-48 bg-muted">
										<Image
											src={post.coverImage || '/globe.svg'}
											alt={`${post.title} cover`}
											fill
											className="object-cover"
											sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
											priority={false}
										/>
									</div>
									<CardHeader>
										<div className="flex justify-between items-start mb-2">
											<time className="text-sm text-muted-foreground">
												{new Date(post.date).toLocaleDateString('en-US', {
													year: 'numeric',
													month: 'long',
													day: 'numeric'
												})}
											</time>
											<span className="text-sm text-muted-foreground">
												{post.readTime} min read
											</span>
										</div>
										<CardTitle className="text-xl line-clamp-2">
											{post.title}
										</CardTitle>
										<CardDescription className="text-base line-clamp-3 flex-1">
											{post.excerpt}
										</CardDescription>
									</CardHeader>
									<CardContent className="mt-auto">
										<div className="flex flex-wrap gap-2 mb-4">
											{post.tags.slice(0, 3).map(tag => (
												<Badge key={tag} variant="outline" className="text-xs">
													{tag}
												</Badge>
											))}
											{post.tags.length > 3 && (
												<Badge variant="outline" className="text-xs">
													+{post.tags.length - 3} more
												</Badge>
											)}
										</div>
										<Button asChild variant="outline" className="w-full">
											<Link href={`/blog/${post.slug}`}>Read More</Link>
										</Button>
									</CardContent>
								</Card>
							))}
						</div>
					)}
				</div>

				{/* Newsletter CTA */}
				<NewsletterCta
					source="blog"
					title="Stay in the Loop"
					description="Get notified when new articles are published. Join other readers staying ahead in AI, product management, and innovation."
				/>
			</section>
		</div>
	)
}
