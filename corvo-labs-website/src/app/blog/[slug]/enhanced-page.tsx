import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ReadingProgress, FloatingReadingProgress } from '@/components/blog/reading-progress'
import { TableOfContents, CollapsibleTableOfContents } from '@/components/blog/table-of-contents'
import { SocialShare, FloatingSocialShare } from '@/components/blog/social-share'
import { BlogPostNewsletter } from '@/components/blog/newsletter-subscribe'
import { CommentsSection } from '@/components/comments/comments-section'
import { getPostBySlug, getAllPosts, getRelatedPosts, generateBlogStructuredData } from '@/lib/blog-enhanced'
import { getCommentsBySlug } from '@/lib/comments'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { CalendarIcon, ClockIcon, UserIcon, ArrowLeftIcon, EditIcon } from 'lucide-react'

interface BlogPostPageProps {
	params: Promise<{
		slug: string
	}>
}

const mdxOptions = {
	mdxOptions: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [rehypeHighlight],
	},
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

	const metaTitle = post.seo?.metaTitle || post.title
	const metaDescription = post.seo?.metaDescription || post.excerpt
	const ogImage = post.seo?.ogImage || post.coverImage
	const canonical = post.seo?.canonical || `https://corvols.com/blog/${post.slug}`

	return {
		title: `${metaTitle} - Corvo Labs Blog`,
		description: metaDescription,
		openGraph: {
			title: metaTitle,
			description: metaDescription,
			type: 'article',
			publishedTime: post.date,
			modifiedTime: post.modifiedDate || post.date,
			authors: [typeof post.author === 'string' ? post.author : post.author.name],
			images: ogImage ? [
				{
					url: ogImage,
					width: 1200,
					height: 630,
					alt: post.coverImageAlt || `${post.title} cover image`,
				}
			] : [],
		},
		twitter: {
			card: 'summary_large_image',
			title: metaTitle,
			description: metaDescription,
			images: ogImage ? [ogImage] : [],
		},
		alternates: {
			canonical: canonical,
		},
		robots: {
			index: !post.seo?.noindex,
			follow: true,
		},
	}
}

// Custom MDX components for enhanced blog experience
const mdxComponents = {
	// Add custom components here if needed
	h1: (props: any) => <h1 className="text-3xl font-bold mt-8 mb-4 first:mt-0" {...props} />,
	h2: (props: any) => <h2 className="text-2xl font-semibold mt-8 mb-4 scroll-mt-24" {...props} />,
	h3: (props: any) => <h3 className="text-xl font-semibold mt-6 mb-3 scroll-mt-24" {...props} />,
	p: (props: any) => <p className="text-base leading-relaxed mb-4" {...props} />,
	ul: (props: any) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
	ol: (props: any) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
	li: (props: any) => <li className="text-base" {...props} />,
	blockquote: (props: any) => (
		<blockquote className="border-l-4 border-primary pl-4 my-6 italic text-muted-foreground" {...props} />
	),
	pre: (props: any) => (
		<pre className="bg-muted p-4 rounded-lg overflow-x-auto my-6" {...props} />
	),
	code: (props: any) => (
		<code className="bg-muted px-1 py-0.5 rounded text-sm font-mono" {...props} />
	),
	a: (props: any) => (
		<a className="text-primary hover:underline underline-offset-4" {...props} />
	),
	img: (props: any) => (
		<img className="rounded-lg my-6 w-full" {...props} />
	),
}

export default async function EnhancedBlogPostPage({ params }: BlogPostPageProps) {
	const { slug } = await params
	const post = getPostBySlug(slug)

	if (!post) {
		notFound()
	}

	// Fetch initial comments for SSR
	const commentsResponse = await getCommentsBySlug(slug)
	const initialComments = commentsResponse.data || []

	// Get related posts
	const relatedPosts = getRelatedPosts(slug, 3)

	// Generate structured data for SEO
	const structuredData = generateBlogStructuredData(post)

	const authorName = typeof post.author === 'string' ? post.author : post.author.name
	const authorBio = typeof post.author === 'string' ? undefined : post.author.bio
	const authorAvatar = typeof post.author === 'string' ? undefined : post.author.avatar

	return (
		<>
			{/* Structured data */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData),
				}}
			/>

			{/* Reading Progress Bar */}
			<ReadingProgress />

			{/* Floating elements for mobile */}
			<FloatingReadingProgress />
			<FloatingSocialShare
				url={`/blog/${post.slug}`}
				title={post.title}
				excerpt={post.excerpt}
				tags={post.tags}
			/>

			<div className="min-h-screen py-12">
				<article className="container mx-auto max-w-4xl px-4">
					{/* Header */}
					<header className="mb-8">
						{/* Breadcrumb */}
						<div className="mb-6">
							<Link
								href="/blog"
								className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
							>
								<ArrowLeftIcon className="w-4 h-4" />
								Back to Blog
							</Link>
						</div>

						{/* Cover Image */}
						{post.coverImage && (
							<div className="relative w-full h-56 md:h-64 lg:h-72 mb-8 rounded-xl overflow-hidden bg-muted shadow-lg">
								<Image
									src={post.coverImage}
									alt={post.coverImageAlt || `${post.title} cover`}
									fill
									className="object-cover"
									sizes="(min-width: 1024px) 1024px, 100vw"
									priority
								/>
								{post.coverImageCaption && (
									<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
										<p className="text-white text-sm text-center">
											{post.coverImageCaption}
										</p>
									</div>
								)}
							</div>
						)}

						{/* Title and Meta */}
						<div className="text-center mb-8">
							{post.category && (
								<Badge variant="secondary" className="mb-4">
									{post.category}
								</Badge>
							)}

							<h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
								{post.title}
							</h1>

							<p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto">
								{post.excerpt}
							</p>

							{/* Post Meta */}
							<div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground mb-6">
								<div className="flex items-center gap-2">
									{authorAvatar ? (
										<Image
											src={authorAvatar}
											alt={authorName}
											width={24}
											height={24}
											className="rounded-full"
										/>
									) : (
										<UserIcon className="w-4 h-4" />
									)}
									<span>By {authorName}</span>
								</div>

								<div className="flex items-center gap-2">
									<CalendarIcon className="w-4 h-4" />
									<time>
										{new Date(post.date).toLocaleDateString('en-US', {
											year: 'numeric',
											month: 'long',
											day: 'numeric'
										})}
									</time>
								</div>

								<div className="flex items-center gap-2">
									<ClockIcon className="w-4 h-4" />
									<span>{post.readTime} min read</span>
								</div>

								{post.wordCount && (
									<div className="flex items-center gap-2">
										<span>{post.wordCount} words</span>
									</div>
								)}
							</div>

							{/* Tags */}
							<div className="flex flex-wrap justify-center gap-2 mb-8">
								{post.tags.map(tag => (
									<Badge key={tag} variant="outline">
										{tag}
									</Badge>
								))}
							</div>

							{authorBio && (
								<div className="text-center text-sm text-muted-foreground mb-6 max-w-2xl mx-auto">
									<p>{authorBio}</p>
								</div>
							)}
						</div>

						<Separator />
					</header>

					{/* Main Content Layout */}
					<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
						{/* Table of Contents - Desktop */}
						<div className="hidden lg:block lg:col-span-1">
							<TableOfContents
								items={post.tableOfContents || []}
								showProgress={true}
							/>
						</div>

						{/* Article Content */}
						<div className="lg:col-span-3">
							{/* Mobile TOC */}
							<div className="mb-6 lg:hidden">
								<CollapsibleTableOfContents items={post.tableOfContents || []} />
							</div>

							{/* Content */}
							<div className="prose prose-lg max-w-none mb-12">
								<MDXRemote
									source={post.content}
									options={mdxOptions}
									components={mdxComponents}
								/>
							</div>

							{/* Post Footer */}
							<Separator className="mb-8" />

							<footer className="space-y-8">
								{/* Share Section */}
								<div>
									<h3 className="text-lg font-semibold mb-4">Share this article</h3>
									<SocialShare
										url={`/blog/${post.slug}`}
										title={post.title}
										excerpt={post.excerpt}
										tags={post.tags}
										showLabels={true}
									/>
								</div>

								{/* Modified Date */}
								{post.modifiedDate && post.modifiedDate !== post.date && (
									<div className="flex items-center gap-2 text-sm text-muted-foreground">
										<EditIcon className="w-4 h-4" />
										<span>
											Last updated: {new Date(post.modifiedDate).toLocaleDateString('en-US', {
												year: 'numeric',
												month: 'long',
												day: 'numeric'
											})}
										</span>
									</div>
								)}

								{/* Newsletter Signup */}
								<BlogPostNewsletter />

								{/* Related Posts */}
								{relatedPosts.length > 0 && (
									<div>
										<h3 className="text-lg font-semibold mb-4">Related Articles</h3>
										<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
											{relatedPosts.map(relatedPost => (
												<Card key={relatedPost.slug} className="hover:shadow-lg transition-shadow">
													<CardHeader className="pb-2">
														{relatedPost.coverImage && (
															<div className="relative w-full h-32 mb-3 rounded-md overflow-hidden bg-muted">
																<Image
																	src={relatedPost.coverImage}
																	alt={`${relatedPost.title} cover`}
																	fill
																	className="object-cover"
																	sizes="(min-width: 768px) 300px, 100vw"
																/>
															</div>
														)}
														<CardTitle className="text-lg line-clamp-2">
															{relatedPost.title}
														</CardTitle>
													</CardHeader>
													<CardContent className="pt-0">
														<CardDescription className="line-clamp-2 mb-3">
															{relatedPost.excerpt}
														</CardDescription>
														<div className="flex items-center justify-between">
															<span className="text-xs text-muted-foreground">
																{relatedPost.readTime} min read
															</span>
															<Button asChild variant="outline" size="sm">
																<Link href={`/blog/${relatedPost.slug}`}>Read</Link>
															</Button>
														</div>
													</CardContent>
												</Card>
											))}
										</div>
									</div>
								)}
							</footer>
						</div>
					</div>

					{/* Comments Section */}
					<Separator className="my-12" />
					<CommentsSection
						slug={slug}
						initialComments={initialComments}
						title="Discussion"
						description="Share your thoughts and insights on this article."
					/>
				</article>
			</div>
		</>
	)
}