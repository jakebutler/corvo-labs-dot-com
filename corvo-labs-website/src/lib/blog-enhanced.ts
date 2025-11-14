import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export interface Author {
	name: string
	avatar?: string
	bio?: string
	twitter?: string
	linkedin?: string
	website?: string
}

export interface SEOFields {
	metaTitle?: string
	metaDescription?: string
	ogImage?: string
	canonical?: string
	noindex?: boolean
	featured?: boolean
	priority?: number
}

export interface BlogPost {
	slug: string
	title: string
	date: string
	excerpt: string
	content: string
	tags: string[]
	category?: string
	author: Author | string
	readTime: number
	coverImage?: string
	coverImageAlt?: string
	coverImageCaption?: string
	published?: boolean
	modifiedDate?: string
	featured?: boolean
	priority?: number
	seo?: SEOFields
	tableOfContents?: TOCItem[]
	wordCount?: number
}

export interface BlogPostMeta {
	slug: string
	title: string
	date: string
	excerpt: string
	tags: string[]
	category?: string
	author: Author | string
	readTime: number
	coverImage?: string
	coverImageAlt?: string
	published?: boolean
	modifiedDate?: string
	featured?: boolean
	priority?: number
	seo?: SEOFields
	wordCount?: number
}

export interface TOCItem {
	id: string
	title: string
	level: number
	children?: TOCItem[]
}

export interface BlogSearchResult {
	post: BlogPostMeta
	score: number
	matches: {
		title?: boolean
		content?: boolean
		tags?: boolean[]
	}
}

// Default author info
const DEFAULT_AUTHOR: Author = {
	name: 'Corvo Labs',
	bio: 'AI consulting and healthcare technology experts',
	website: 'https://corvols.com'
}

// Enhanced reading time calculation with more accurate metrics
function calculateReadingTime(content: string): { minutes: number; words: number; text: string } {
	const wordsPerMinute = 200
	const words = content.trim().split(/\s+/).length
	const minutes = Math.ceil(words / wordsPerMinute)

	return {
		minutes,
		words,
		text: `${minutes} min read`
	}
}

// Generate table of contents from markdown content
function generateTableOfContents(content: string): TOCItem[] {
	const headingRegex = /^(#{1,6})\s+(.+)$/gm
	const toc: TOCItem[] = []
	const stack: TOCItem[] = []

	let match
	while ((match = headingRegex.exec(content)) !== null) {
		const level = match[1].length
		const title = match[2].trim()
		const id = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')

		const item: TOCItem = {
			id,
			title,
			level,
			children: []
		}

		// Find parent in stack
		while (stack.length > 0 && stack[stack.length - 1].level >= level) {
			stack.pop()
		}

		if (stack.length === 0) {
			toc.push(item)
		} else {
			const parent = stack[stack.length - 1]
			parent.children = parent.children || []
			parent.children.push(item)
		}

		stack.push(item)
	}

	return toc
}

// Enhanced blog post processing
function processBlogPostData(data: any, content: string, slug: string): { meta: BlogPostMeta; full: BlogPost } {
	const readingStats = calculateReadingTime(content)
	const tableOfContents = generateTableOfContents(content)
	const published = data.published === undefined ? true : Boolean(data.published)

	// Handle author field - can be string or Author object
	const author = data.author || DEFAULT_AUTHOR
	if (typeof author === 'string') {
		data.author = { name: author }
	}

	const basePost = {
		slug,
		title: data.title || 'Untitled',
		date: data.date || new Date().toISOString(),
		excerpt: data.excerpt || '',
		tags: data.tags || [],
		category: data.category || undefined,
		author: data.author,
		readTime: readingStats.minutes,
		coverImage: data.coverImage || undefined,
		coverImageAlt: data.coverImageAlt || `${data.title || 'Blog post'} cover image`,
		coverImageCaption: data.coverImageCaption || undefined,
		published,
		modifiedDate: data.modifiedDate || undefined,
		featured: data.featured || false,
		priority: data.priority || 0,
		seo: {
			metaTitle: data.metaTitle,
			metaDescription: data.metaDescription,
			ogImage: data.ogImage,
			canonical: data.canonical,
			noindex: data.noindex || false,
			featured: data.featured || false,
			priority: data.priority || 0
		},
		wordCount: readingStats.words
	}

	const meta: BlogPostMeta = {
		...basePost,
		author: basePost.author
	}

	const full: BlogPost = {
		...basePost,
		content,
		tableOfContents,
		author: basePost.author
	}

	return { meta, full }
}

export function getAllPosts(options: {
	featured?: boolean
	category?: string
	tag?: string
	limit?: number
	sort?: 'date' | 'priority'
} = {}): BlogPostMeta[] {
	try {
		if (!fs.existsSync(postsDirectory)) {
			return []
		}

		const fileNames = fs.readdirSync(postsDirectory)
		let allPostsData = fileNames
			.filter(fileName => fileName.endsWith('.mdx'))
			.map(fileName => {
				const slug = fileName.replace(/\.mdx$/, '')
				const fullPath = path.join(postsDirectory, fileName)
				const fileContents = fs.readFileSync(fullPath, 'utf8')
				const { data, content } = matter(fileContents)

				const { meta } = processBlogPostData(data, content, slug)
				return meta
			})
			// Hide unpublished posts from listings
			.filter(post => post.published && !post.seo?.noindex)

		// Apply filters
		if (options.featured) {
			allPostsData = allPostsData.filter(post => post.featured)
		}

		if (options.category) {
			allPostsData = allPostsData.filter(post =>
				post.category?.toLowerCase() === options.category?.toLowerCase()
			)
		}

		if (options.tag) {
			allPostsData = allPostsData.filter(post =>
				post.tags.some(tag => tag.toLowerCase() === options.tag?.toLowerCase())
			)
		}

		// Sort posts
		const sortField = options.sort || 'date'
		allPostsData.sort((a, b) => {
			if (sortField === 'priority') {
				return (b.priority || 0) - (a.priority || 0)
			}
			return a.date < b.date ? 1 : -1
		})

		// Apply limit
		if (options.limit) {
			allPostsData = allPostsData.slice(0, options.limit)
		}

		return allPostsData
	} catch (error) {
		console.error('Error reading blog posts:', error)
		return []
	}
}

export function getPostBySlug(slug: string): BlogPost | null {
	try {
		const fullPath = path.join(postsDirectory, `${slug}.mdx`)

		if (!fs.existsSync(fullPath)) {
			return null
		}

		const fileContents = fs.readFileSync(fullPath, 'utf8')
		const { data, content } = matter(fileContents)

		const { full } = processBlogPostData(data, content, slug)
		return full
	} catch (error) {
		console.error(`Error reading blog post ${slug}:`, error)
		return null
	}
}

export function getPostsByTag(tag: string): BlogPostMeta[] {
	return getAllPosts({ tag })
}

export function getPostsByCategory(category: string): BlogPostMeta[] {
	return getAllPosts({ category })
}

export function getFeaturedPosts(limit: number = 3): BlogPostMeta[] {
	return getAllPosts({ featured: true, limit })
}

export function getAllTags(): string[] {
	const allPosts = getAllPosts()
	const tags = new Set<string>()

	allPosts.forEach(post => {
		post.tags.forEach(tag => tags.add(tag))
	})

	return Array.from(tags).sort()
}

export function getAllCategories(): string[] {
	const allPosts = getAllPosts()
	const categories = new Set<string>()

	allPosts.forEach(post => {
		if (post.category) {
			categories.add(post.category)
		}
	})

	return Array.from(categories).sort()
}

// Search functionality
export function searchPosts(query: string): BlogSearchResult[] {
	const allPosts = getAllPosts()
	const results: BlogSearchResult[] = []

	const normalizedQuery = query.toLowerCase().trim()

	if (!normalizedQuery) return results

	allPosts.forEach(post => {
		let score = 0
		const matches: BlogSearchResult['matches'] = {}

		// Title matches (highest weight)
		if (post.title.toLowerCase().includes(normalizedQuery)) {
			score += 10
			matches.title = true
		}

		// Tag matches (medium weight)
		const matchingTags = post.tags.filter(tag =>
			tag.toLowerCase().includes(normalizedQuery)
		)
		if (matchingTags.length > 0) {
			score += matchingTags.length * 5
			matches.tags = matchingTags
		}

		// Excerpt matches (medium weight)
		if (post.excerpt.toLowerCase().includes(normalizedQuery)) {
			score += 3
		}

		// Category matches (medium weight)
		if (post.category?.toLowerCase().includes(normalizedQuery)) {
			score += 4
		}

		// Author matches (low weight)
		const authorName = typeof post.author === 'string'
			? post.author.toLowerCase()
			: post.author.name.toLowerCase()
		if (authorName.includes(normalizedQuery)) {
			score += 2
		}

		if (score > 0) {
			results.push({ post, score, matches })
		}
	})

	// Sort by relevance score
	return results.sort((a, b) => b.score - a.score)
}

// Related posts based on tags and category
export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPostMeta[] {
	const currentPost = getPostBySlug(currentSlug)
	if (!currentPost) return []

	const allPosts = getAllPosts()

	// Calculate similarity scores
	const scoredPosts = allPosts
		.filter(post => post.slug !== currentSlug)
		.map(post => {
			let score = 0

			// Same category (highest weight)
			if (currentPost.category && post.category === currentPost.category) {
				score += 10
			}

			// Shared tags
			const sharedTags = currentPost.tags.filter(tag =>
				post.tags.includes(tag)
			)
			score += sharedTags.length * 3

			// Same author
			const currentAuthorName = typeof currentPost.author === 'string'
				? currentPost.author
				: currentPost.author.name
			const postAuthorName = typeof post.author === 'string'
				? post.author
				: post.author.name
			if (currentAuthorName === postAuthorName) {
				score += 2
			}

			return { post, score }
		})
		.filter(item => item.score > 0)
		.sort((a, b) => b.score - a.score)
		.slice(0, limit)
		.map(item => item.post)

	return scoredPosts
}

// Pagination helpers
export function getPaginatedPosts(page: number = 1, limit: number = 9): {
	posts: BlogPostMeta[]
	totalPages: number
	currentPage: number
	totalPosts: number
} {
	const allPosts = getAllPosts()
	const totalPosts = allPosts.length
	const totalPages = Math.ceil(totalPosts / limit)
	const currentPage = Math.min(Math.max(1, page), totalPages)

	const startIndex = (currentPage - 1) * limit
	const endIndex = startIndex + limit
	const posts = allPosts.slice(startIndex, endIndex)

	return {
		posts,
		totalPages,
		currentPage,
		totalPosts
	}
}

// Popular posts (based on featured flag and priority)
export function getPopularPosts(limit: number = 5): BlogPostMeta[] {
	return getAllPosts({
		sort: 'priority',
		limit: limit * 2 // Get more to filter
	})
	.filter(post => post.featured || post.priority > 0)
	.slice(0, limit)
}

// Generate structured data for SEO
export function generateBlogStructuredData(post: BlogPost) {
	const authorName = typeof post.author === 'string' ? post.author : post.author.name
	const authorUrl = typeof post.author === 'string' ? undefined : post.author.website

	return {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: post.title,
		description: post.excerpt,
		image: post.coverImage,
		datePublished: post.date,
		dateModified: post.modifiedDate || post.date,
		author: {
			'@type': 'Person',
			name: authorName,
			url: authorUrl
		},
		publisher: {
			'@type': 'Organization',
			name: 'Corvo Labs',
			url: 'https://corvols.com'
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `https://corvols.com/blog/${post.slug}`
		},
		wordCount: post.wordCount,
		keywords: post.tags.join(', ')
	}
}