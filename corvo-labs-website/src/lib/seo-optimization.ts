import { BlogPost } from './blog-enhanced'

// Generate sitemap for blog content
export function generateBlogSitemap(posts: BlogPost[]): string {
	const baseUrl = 'https://corvols.com'

	const sitemapEntries = posts.map(post => {
		const lastmod = post.modifiedDate || post.date
		const priority = post.featured ? '1.0' : post.priority ? (post.priority / 10).toString() : '0.7'
		const changefreq = post.featured ? 'weekly' : 'monthly'

		return `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
	}).join('\n')

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>`
}

// Generate robots.txt content
export function generateRobotsTxt(): string {
	return `User-agent: *
Allow: /
Allow: /blog/
Allow: /api/

# Block common bot paths
Disallow: /api/admin/
Disallow: /admin/
Disallow: /_next/
Disallow: /static/
Disallow: /*.json$

# Sitemap location
Sitemap: https://corvols.com/sitemap.xml
Sitemap: https://corvols.com/blog-sitemap.xml

# Crawl delay for politeness
Crawl-delay: 1`
}

// Generate meta tags for blog posts
export function generateMetaTags(post: BlogPost) {
	const title = post.seo?.metaTitle || post.title
	const description = post.seo?.metaDescription || post.excerpt
	const keywords = post.tags.join(', ')
	const author = typeof post.author === 'string' ? post.author : post.author.name
	const canonical = post.seo?.canonical || `https://corvols.com/blog/${post.slug}`

	const metaTags = {
		title: `${title} - Corvo Labs Blog`,
		description,
		keywords,
		authors: [author],
		canonical,
		openGraph: {
			title,
			description,
			type: 'article',
			publishedTime: post.date,
			modifiedTime: post.modifiedDate || post.date,
			authors: [author],
			url: canonical,
			siteName: 'Corvo Labs',
			images: post.coverImage ? [
				{
					url: post.coverImage,
					width: 1200,
					height: 630,
					alt: post.coverImageAlt || `${post.title} cover image`,
					type: 'image/jpeg'
				}
			] : [],
			tags: post.tags
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: post.coverImage ? [post.coverImage] : [],
			creator: '@corvols', // Replace with actual Twitter handle
			site: '@corvols'
		},
		robots: {
			index: !post.seo?.noindex,
			follow: true,
			googleBot: {
				index: !post.seo?.noindex,
				follow: true,
				'max-video-preview': -1,
				'max-image-preview': 'large',
				'max-snippet': -1
			}
		},
		verification: {
			google: process.env.GOOGLE_SITE_VERIFICATION,
			yandex: process.env.YANDEX_VERIFICATION,
			yahoo: process.env.YAHOO_VERIFICATION
		},
		alternate: {
			canonical: canonical
		},
		other: {
			'article:author': author,
			'article:section': post.category || 'AI & Technology',
			'article:published_time': new Date(post.date).toISOString(),
			'article:modified_time': new Date(post.modifiedDate || post.date).toISOString(),
			'og:locale': 'en_US',
			'og:site_name': 'Corvo Labs',
			'twitter:domain': 'corvols.com'
		}
	}

	// Add tag-specific meta tags
	post.tags.forEach(tag => {
		metaTags.other[`article:tag`] = tag
	})

	return metaTags
}

// Generate structured data for SEO
export function generateStructuredData(post: BlogPost) {
	const authorName = typeof post.author === 'string' ? post.author : post.author.name
	const authorUrl = typeof post.author === 'string' ? undefined : post.author.website

	const baseStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: post.title,
		description: post.excerpt,
		image: post.coverImage ? [
			{
				'@type': 'ImageObject',
				url: post.coverImage,
				width: 1200,
				height: 630,
				caption: post.coverImageCaption || `${post.title} cover image`
			}
		] : [],
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
			url: 'https://corvols.com',
			logo: {
				'@type': 'ImageObject',
				url: 'https://corvols.com/logo.png',
				width: 512,
				height: 512
			}
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `https://corvols.com/blog/${post.slug}`
		},
		wordCount: post.wordCount,
		keywords: post.tags.join(', '),
		inLanguage: 'en-US',
		isPartOf: {
			'@type': 'Blog',
			name: 'Corvo Labs Blog',
			url: 'https://corvols.com/blog'
		}
	}

	// Add breadcrumbs if category exists
	if (post.category) {
		return {
			...baseStructuredData,
			about: {
				'@type': 'Thing',
				name: post.category
			}
		}
	}

	return baseStructuredData
}

// Generate breadcrumb structured data
export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
	const breadcrumbItems = items.map((item, index) => ({
		'@type': 'ListItem',
		position: index + 1,
		name: item.name,
		item: item.url
	}))

	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: breadcrumbItems
	}
}

// Generate FAQ structured data for blog posts with FAQs
export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
	const faqItems = faqs.map(faq => ({
		'@type': 'Question',
		name: faq.question,
		acceptedAnswer: {
			'@type': 'Answer',
			text: faq.answer
		}
	}))

	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqItems
	}
}

// Generate organization structured data
export function generateOrganizationStructuredData() {
	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'Corvo Labs',
		url: 'https://corvols.com',
		logo: {
			'@type': 'ImageObject',
			url: 'https://corvols.com/logo.png',
			width: 512,
			height: 512
		},
		description: 'AI consulting and healthcare technology experts',
		foundingDate: '2023',
		contactPoint: {
			'@type': 'ContactPoint',
			contactType: 'customer service',
			email: 'contact@corvols.com',
			url: 'https://corvols.com/contact'
		},
		sameAs: [
			'https://twitter.com/corvols',
			'https://linkedin.com/company/corvols',
			'https://github.com/corvols'
		]
	}
}

// Generate website structured data
export function generateWebsiteStructuredData() {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'Corvo Labs',
		url: 'https://corvols.com',
		description: 'AI consulting and healthcare technology solutions',
		potentialAction: {
			'@type': 'SearchAction',
			target: 'https://corvols.com/search?q={search_term_string}',
			'query-input': 'required name=search_term_string'
		},
		publisher: {
			'@type': 'Organization',
			name: 'Corvo Labs',
			url: 'https://corvols.com'
		}
	}
}

// Internal linking suggestions
export function generateInternalLinkingSuggestions(
	currentPost: BlogPost,
	allPosts: BlogPost[],
	maxSuggestions: number = 5
) {
	const suggestions = []
	const currentTags = new Set(currentPost.tags.map(tag => tag.toLowerCase()))
	const currentCategory = currentPost.category?.toLowerCase()

	for (const post of allPosts) {
		if (post.slug === currentPost.slug) continue

		let score = 0

		// High score for same category
		if (currentCategory && post.category?.toLowerCase() === currentCategory) {
			score += 10
		}

		// Score for shared tags
		const sharedTags = post.tags.filter(tag => currentTags.has(tag.toLowerCase()))
		score += sharedTags.length * 3

		// Bonus for featured posts
		if (post.featured) {
			score += 2
		}

		// Score for recent posts
		const daysSincePublished = (Date.now() - new Date(post.date).getTime()) / (1000 * 60 * 60 * 24)
		if (daysSincePublished < 30) {
			score += 1
		}

		if (score > 0) {
			suggestions.push({
				post,
				score,
				reason: score >= 10 ? 'Same category' : sharedTags.length > 0 ? `Shared tags: ${sharedTags.join(', ')}` : 'Related content'
			})
		}
	}

	return suggestions
		.sort((a, b) => b.score - a.score)
		.slice(0, maxSuggestions)
		.map(suggestion => suggestion.post)
}

// Generate reading time estimates with different reading speeds
export function generateReadingTimeEstimates(wordCount: number) {
	const slowReader = Math.ceil(wordCount / 150) // 150 WPM
	averageReader = Math.ceil(wordCount / 200) // 200 WPM
	fastReader = Math.ceil(wordCount / 300) // 300 WPM

	return {
		slow: `${slowReader} min read (slow)`,
		average: `${averageReader} min read (average)`,
		fast: `${fastReader} min read (fast)`,
		primary: `${averageReader} min read`
	}
}

// Generate social sharing URLs
export function generateSocialSharingUrls(
	post: BlogPost,
	baseUrl: string = 'https://corvols.com'
) {
	const url = `${baseUrl}/blog/${post.slug}`
	const encodedUrl = encodeURIComponent(url)
	const encodedTitle = encodeURIComponent(post.title)
	const encodedDescription = encodeURIComponent(post.excerpt)

	return {
		twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&via=corvols`,
		linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
		facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
		email: `mailto:?subject=${encodeURIComponent(`Check out this article: ${post.title}`)}&body=${encodeURIComponent(`I thought you might find this article interesting:\n\n${post.title}\n${post.excerpt}\n\nRead more: ${url}`)}`,
		whatsapp: `https://wa.me/?text=${encodeURIComponent(`${post.title} - ${url}`)}`,
		telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`
	}
}

// SEO optimization checklist
export const SEO_CHECKLIST = {
	title: {
		length: { min: 30, max: 60, optimal: 50 },
		includesKeywords: true,
		unique: true,
		clickbaitFree: true
	},
	description: {
		length: { min: 120, max: 160, optimal: 140 },
		includesKeywords: true,
		actionable: true,
		unique: true
	},
	headings: {
		h1Present: true,
		h1Unique: true,
		properHierarchy: true,
		keywordInHeadings: true
	},
	content: {
		wordCount: { min: 1000, optimal: 2000 },
		keywordDensity: { min: 0.5, max: 2.5 },
		internalLinks: { min: 3 },
		externalLinks: { min: 1 },
		readability: 'Good'
	},
	images: {
		altTextPresent: true,
		optimizedSize: true,
		properFormat: true,
		descriptiveNames: true
	},
	technical: {
		metaTagsComplete: true,
		structuredData: true,
		canonicalUrl: true,
		responsiveDesign: true,
		pageSpeed: 'Good'
	}
} as const

// Validate post against SEO checklist
export function validatePostSEO(post: BlogPost, content: string) {
	const issues = []
	const warnings = []

	// Title validation
	if (post.title.length < 30) {
		warnings.push('Title is too short (under 30 characters)')
	}
	if (post.title.length > 60) {
		warnings.push('Title is too long (over 60 characters)')
	}

	// Description validation
	if (post.excerpt.length < 120) {
		warnings.push('Meta description is too short (under 120 characters)')
	}
	if (post.excerpt.length > 160) {
		warnings.push('Meta description is too long (over 160 characters)')
	}

	// Content validation
	if (content.length < 1000) {
		warnings.push('Content is quite short (under 1000 words)')
	}

	// Image validation
	if (!post.coverImage) {
		issues.push('No cover image specified')
	}

	// Internal linking (would need to check content for internal links)
	const internalLinkRegex = /href="\/blog\/[^"]+"/g
	const internalLinks = content.match(internalLinkRegex) || []
	if (internalLinks.length < 2) {
		warnings.push('Consider adding more internal links to related content')
	}

	return {
		score: Math.max(0, 100 - (issues.length * 20) - (warnings.length * 5)),
		issues,
		warnings,
		recommendations: [
			'Add more internal links to related blog posts',
			'Include a table of contents for longer articles',
			'Add social sharing buttons',
			'Include author bio and credentials',
			'Add a comments section for engagement'
		]
	}
}