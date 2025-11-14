import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { NewsletterCta } from '@/components/newsletter-cta'
import {
	getAllPosts,
	getAllTags,
	getAllCategories,
	getFeaturedPosts,
	getPaginatedPosts,
	searchPosts,
	BlogPostMeta
} from '@/lib/blog-enhanced'
import { SearchIcon, FilterIcon, TrendingUpIcon, CalendarIcon, ClockIcon, UserIcon } from 'lucide-react'
import { Suspense } from 'react'

export const metadata: Metadata = {
	title: 'Blog - Corvo Labs',
	description: 'Insights on AI, product management, healthcare innovation, UX design, and behavior change from the Corvo Labs team.',
}

// Blog post card component
function BlogPostCard({ post }: { post: BlogPostMeta }) {
	const authorName = typeof post.author === 'string' ? post.author : post.author.name

	return (
		<Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 group">
			{/* Cover Image */}
			<div className="relative w-full h-48 md:h-52 bg-muted overflow-hidden">
				{post.coverImage ? (
					<>
						<Image
							src={post.coverImage}
							alt={post.coverImageAlt || `${post.title} cover`}
							fill
							className="object-cover group-hover:scale-105 transition-transform duration-300"
							sizes="(min-width: 1024px) 400px, (min-width: 768px) 300px, 100vw"
							loading="lazy"
						/>
						{post.featured && (
							<div className="absolute top-4 left-4">
								<Badge className="bg-primary text-primary-foreground">
									Featured
								</Badge>
							</div>
						)}
					</>
				) : (
					<div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
						<div className="text-center p-4">
							<div className="w-12 h-12 bg-primary/20 rounded-full mx-auto mb-2 flex items-center justify-center">
								<span className="text-primary font-bold text-lg">
									{post.title.charAt(0)}
								</span>
							</div>
						</div>
					</div>
				)}
			</div>

			<CardHeader className="pb-3">
				{/* Category and Date */}
				<div className="flex items-center justify-between mb-2">
					{post.category && (
						<Badge variant="secondary" className="text-xs">
							{post.category}
						</Badge>
					)}
					<time className="text-xs text-muted-foreground">
						{new Date(post.date).toLocaleDateString('en-US', {
							month: 'short',
							day: 'numeric',
							year: 'numeric'
						})}
					</time>
				</div>

				{/* Title */}
				<CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">
					{post.title}
				</CardTitle>

				{/* Excerpt */}
				<CardDescription className="text-base line-clamp-3 mt-2">
					{post.excerpt}
				</CardDescription>
			</CardHeader>

			<CardContent className="mt-auto">
				{/* Meta information */}
				<div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
					<div className="flex items-center gap-1">
						<UserIcon className="w-3 h-3" />
						<span className="truncate">{authorName}</span>
					</div>
					<div className="flex items-center gap-1">
						<ClockIcon className="w-3 h-3" />
						<span>{post.readTime} min</span>
					</div>
				</div>

				{/* Tags */}
				<div className="flex flex-wrap gap-1 mb-4">
					{post.tags.slice(0, 2).map(tag => (
						<Badge key={tag} variant="outline" className="text-xs px-2 py-0.5">
							{tag}
						</Badge>
					))}
					{post.tags.length > 2 && (
						<Badge variant="outline" className="text-xs px-2 py-0.5">
							+{post.tags.length - 2}
						</Badge>
					)}
				</div>

				{/* Read More Button */}
				<Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
					<Link href={`/blog/${post.slug}`}>
						Read More
					</Link>
				</Button>
			</CardContent>
		</Card>
	)
}

// Search and Filter Component
function BlogSearchAndFilter({
	categories,
	tags,
	onSearch,
	onCategoryChange,
	onTagChange,
	onSortChange
}: {
	categories: string[]
	tags: string[]
	onSearch: (query: string) => void
	onCategoryChange: (category: string) => void
	onTagChange: (tag: string) => void
	onSortChange: (sort: string) => void
}) {
	return (
		<div className="bg-muted/30 rounded-lg p-6 space-y-4">
			{/* Search */}
			<div className="relative">
				<SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
				<Input
					type="search"
					placeholder="Search articles..."
					className="pl-10"
					onChange={(e) => onSearch(e.target.value)}
				/>
			</div>

			{/* Filters */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{/* Category Filter */}
				<Select onValueChange={onCategoryChange}>
					<SelectTrigger>
						<SelectValue placeholder="Category" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Categories</SelectItem>
						{categories.map(category => (
							<SelectItem key={category} value={category}>
								{category}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				{/* Tag Filter */}
				<Select onValueChange={onTagChange}>
					<SelectTrigger>
						<SelectValue placeholder="Tag" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Tags</SelectItem>
						{tags.slice(0, 10).map(tag => (
							<SelectItem key={tag} value={tag}>
								{tag}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				{/* Sort */}
				<Select onValueChange={onSortChange} defaultValue="date">
					<SelectTrigger>
						<SelectValue placeholder="Sort by" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="date">Latest First</SelectItem>
						<SelectItem value="priority">Featured First</SelectItem>
						<SelectItem value="oldest">Oldest First</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	)
}

// Featured Posts Section
function FeaturedPostsSection({ posts }: { posts: BlogPostMeta[] }) {
	if (posts.length === 0) return null

	return (
		<section className="py-8">
			<div className="flex items-center gap-2 mb-6">
				<TrendingUpIcon className="w-5 h-5 text-primary" />
				<h2 className="text-2xl font-bold">Featured Articles</h2>
			</div>
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				{posts.map(post => (
					<BlogPostCard key={post.slug} post={post} />
				))}
			</div>
		</section>
	)
}

// Blog Grid Component
function BlogGrid({ posts }: { posts: BlogPostMeta[] }) {
	if (posts.length === 0) {
		return (
			<div className="text-center py-12">
				<h3 className="text-xl font-semibold mb-4">No articles found</h3>
				<p className="text-muted-foreground mb-6">
					Try adjusting your search or filters to find what you're looking for.
				</p>
				<Button asChild>
					<Link href="/blog">View All Articles</Link>
				</Button>
			</div>
		)
	}

	return (
		<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
			{posts.map(post => (
				<BlogPostCard key={post.slug} post={post} />
			))}
		</div>
	)
}

// Pagination Component
function Pagination({
	currentPage,
	totalPages,
	totalPosts,
	onPageChange
}: {
	currentPage: number
	totalPages: number
	totalPosts: number
	onPageChange: (page: number) => void
}) {
	if (totalPages <= 1) return null

	const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
	const showPages = pages.filter(page =>
		page === 1 ||
		page === totalPages ||
		(page >= currentPage - 1 && page <= currentPage + 1)
	)

	return (
		<div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
			<div className="text-sm text-muted-foreground">
				Showing {Math.min((currentPage - 1) * 9 + 1, totalPosts)} to{' '}
				{Math.min(currentPage * 9, totalPosts)} of {totalPosts} articles
			</div>

			<div className="flex items-center gap-2">
				<Button
					variant="outline"
					size="sm"
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 1}
				>
					Previous
				</Button>

				<div className="flex items-center gap-1">
					{showPages.map((page, index) => {
						if (index > 0 && showPages[index - 1] !== page - 1) {
							return (
								<span key={`ellipsis-${page}`} className="px-2 text-muted-foreground">
									...
								</span>
							)
						}
						return (
							<Button
								key={page}
								variant={page === currentPage ? "default" : "outline"}
								size="sm"
								onClick={() => onPageChange(page)}
							>
								{page}
							</Button>
						)
					})}
				</div>

				<Button
					variant="outline"
					size="sm"
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
				>
					Next
				</Button>
			</div>
		</div>
	)
}

// Main Blog Page Component
export default async function EnhancedBlogPage({
	searchParams
}: {
	searchParams: Promise<{
		q?: string
		category?: string
		tag?: string
		sort?: string
		page?: string
	}>
}) {
	const params = await searchParams
	const currentPage = Number(params.page) || 1

	// Get initial data
	const featuredPosts = getFeaturedPosts(3)
	const allTags = getAllTags()
	const allCategories = getAllCategories()

	// Handle search and filtering
	let posts: BlogPostMeta[]

	if (params.q) {
		// Search functionality (client-side)
		posts = getAllPosts()
	} else {
		// Apply filters
		posts = getAllPosts({
			category: params.category !== 'all' ? params.category : undefined,
			tag: params.tag !== 'all' ? params.tag : undefined,
			sort: params.sort === 'priority' ? 'priority' : 'date'
		})
	}

	// Pagination
	const paginatedPosts = getPaginatedPosts(currentPage, 9)

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

			{/* Main Content */}
			<section className="py-12 px-4">
				<div className="container mx-auto max-w-6xl">
					{/* Featured Posts */}
					{!params.q && !params.category && !params.tag && currentPage === 1 && (
						<FeaturedPostsSection posts={featuredPosts} />
					)}

					{/* Search and Filters */}
					<Suspense fallback={<div>Loading filters...</div>}>
						<BlogSearchAndFilter
							categories={allCategories}
							tags={allTags}
							onSearch={() => {}} // Will be handled client-side
							onCategoryChange={() => {}} // Will be handled client-side
							onTagChange={() => {}} // Will be handled client-side
							onSortChange={() => {}} // Will be handled client-side
						/>
					</Suspense>

					{/* Blog Posts Grid */}
					<BlogGrid posts={paginatedPosts.posts} />

					{/* Pagination */}
					<Pagination
						currentPage={paginatedPosts.currentPage}
						totalPages={paginatedPosts.totalPages}
						totalPosts={paginatedPosts.totalPosts}
						onPageChange={() => {}} // Will be handled client-side
					/>

					{/* Newsletter CTA */}
					<NewsletterCta
						source="blog"
						title="Stay in the Loop"
						description="Get notified when new articles are published. Join other readers staying ahead in AI, product management, and innovation."
					/>
				</div>
			</section>
		</div>
	)
}