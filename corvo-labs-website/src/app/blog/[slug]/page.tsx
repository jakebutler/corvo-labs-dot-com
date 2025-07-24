import { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { NewsletterCta } from '@/components/newsletter-cta'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from '@/lib/blog'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

interface BlogPostPageProps {
	params: Promise<{
		slug: string
	}>
}

export async function generateStaticParams() {
	const posts = getAllPosts()
	return posts.map(post => ({
		slug: post.slug,
	}))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
	const { slug } = await params
	const post = getPostBySlug(slug)
	
	if (!post) {
		return {
			title: 'Post Not Found - Corvo Labs',
		}
	}

	return {
		title: `${post.title} - Corvo Labs Blog`,
		description: post.excerpt,
	}
}

const mdxOptions = {
	mdxOptions: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [rehypeHighlight],
	},
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const { slug } = await params
	const post = getPostBySlug(slug)

	if (!post) {
		notFound()
	}

	return (
		<div className="min-h-screen py-12">
			<article className="container mx-auto max-w-4xl px-4">
				{/* Header */}
				<header className="mb-8">
					<div className="mb-4">
						<Link 
							href="/blog" 
							className="text-sm text-muted-foreground hover:text-primary transition-colors"
						>
							← Back to Blog
						</Link>
					</div>
					<h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
						{post.title}
					</h1>
					<div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
						<time>
							{new Date(post.date).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						</time>
						<span>•</span>
						<span>{post.readTime} min read</span>
						<span>•</span>
						<span>By {post.author}</span>
					</div>
					<div className="flex flex-wrap gap-2 mb-8">
						{post.tags.map(tag => (
							<Badge key={tag} variant="secondary">
								{tag}
							</Badge>
						))}
					</div>
					<Separator />
				</header>

				{/* Content */}
				<div className="prose prose-lg max-w-none mb-12">
					<MDXRemote source={post.content} options={mdxOptions} />
				</div>

				<Separator className="mb-8" />

				{/* Footer */}
				<footer className="space-y-8">
					<div className="text-center">
						<h3 className="text-xl font-semibold mb-4">
							Enjoyed this article?
						</h3>
						<p className="text-muted-foreground mb-6">
							Stay updated with our latest insights on AI, product strategy, and healthcare innovation.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button asChild>
								<Link href="/subscribe">Subscribe to Newsletter</Link>
							</Button>
							<Button asChild variant="outline">
								<Link href="/blog">Read More Articles</Link>
							</Button>
						</div>
					</div>
				</footer>

				{/* Newsletter CTA */}
				<div className="mt-12">
					<NewsletterCta
						source={`blog-post-${post.slug}`}
						title="Enjoyed this article?"
						description="Get more insights like this delivered to your inbox. Join other professionals staying ahead in AI, product management, and innovation."
						compact={false}
					/>
				</div>
			</article>
		</div>
	)
}
