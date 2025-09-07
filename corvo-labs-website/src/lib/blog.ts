import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
	slug: string
	title: string
	date: string
	excerpt: string
	content: string
	tags: string[]
	author: string
	readTime: number
	coverImage?: string
	published?: boolean
}

export interface BlogPostMeta {
	slug: string
	title: string
	date: string
	excerpt: string
	tags: string[]
	author: string
	readTime: number
	coverImage?: string
	published?: boolean
}

function calculateReadTime(content: string): number {
	const wordsPerMinute = 200
	const words = content.trim().split(/\s+/).length
	return Math.ceil(words / wordsPerMinute)
}

export function getAllPosts(): BlogPostMeta[] {
	try {
		if (!fs.existsSync(postsDirectory)) {
			return []
		}

		const fileNames = fs.readdirSync(postsDirectory)
		const allPostsData = fileNames
			.filter(fileName => fileName.endsWith('.mdx'))
			.map(fileName => {
				const slug = fileName.replace(/\.mdx$/, '')
				const fullPath = path.join(postsDirectory, fileName)
				const fileContents = fs.readFileSync(fullPath, 'utf8')
				const { data, content } = matter(fileContents)

				const published = data.published === undefined ? true : Boolean(data.published)

				return {
					slug,
					title: data.title || 'Untitled',
					date: data.date || new Date().toISOString(),
					excerpt: data.excerpt || '',
					tags: data.tags || [],
					author: data.author || 'Corvo Labs',
					readTime: calculateReadTime(content),
					coverImage: data.coverImage || undefined,
					published,
				} as BlogPostMeta
			})
			// Hide unpublished posts from listings
			.filter(post => post.published)

		return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
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

		const published = data.published === undefined ? true : Boolean(data.published)

		return {
			slug,
			title: data.title || 'Untitled',
			date: data.date || new Date().toISOString(),
			excerpt: data.excerpt || '',
			content,
			tags: data.tags || [],
			author: data.author || 'Corvo Labs',
			readTime: calculateReadTime(content),
			coverImage: data.coverImage || undefined,
			published,
		} as BlogPost
	} catch (error) {
		console.error(`Error reading blog post ${slug}:`, error)
		return null
	}
}

export function getPostsByTag(tag: string): BlogPostMeta[] {
	const allPosts = getAllPosts()
	return allPosts.filter(post => 
		post.tags.some(postTag => 
			postTag.toLowerCase() === tag.toLowerCase()
		)
	)
}

export function getAllTags(): string[] {
	const allPosts = getAllPosts()
	const tags = new Set<string>()
	
	allPosts.forEach(post => {
		post.tags.forEach(tag => tags.add(tag))
	})
	
	return Array.from(tags).sort()
}
