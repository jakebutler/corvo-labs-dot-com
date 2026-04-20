import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export type BlogPost = {
    slug: string
    title: string
    subtitle?: string
    date: string
    excerpt: string
    author: string
    coverImage?: string
    coverImageAlt?: string
    tags: string[]
    content: string
    published?: boolean
    featured?: boolean
    readTime?: string
    category?: string
}

export function getBlogPosts(): BlogPost[] {
    // Create directory if it doesn't exist
    if (!fs.existsSync(postsDirectory)) {
        return []
    }

    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames
        .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
        .map((fileName) => {
            const slug = fileName.replace(/\.mdx?$/, '')
            const fullPath = path.join(postsDirectory, fileName)
            const fileContents = fs.readFileSync(fullPath, 'utf8')
            const { data, content } = matter(fileContents)

            return {
                slug,
                content,
                title: data.title,
                subtitle: data.subtitle,
                date: data.date,
                excerpt: data.excerpt || data.description || '',
                author: data.author || 'Jake Butler',
                tags: data.tags || [],
                published: data.published !== false && data.status !== 'draft',
                featured: data.featured || false,
                readTime: data.readTime || '5 min read',
                category: data.category || 'strategy',
                ...data,
                coverImage: data.coverImage || data.heroImage,
                coverImageAlt: data.coverImageAlt || data.heroImageAlt,
            } as BlogPost
        })

    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}

export function getBlogPost(slug: string): BlogPost | null {
    try {
        const fullPathVal = path.join(postsDirectory, `${slug}.mdx`)
        const fullPathMd = path.join(postsDirectory, `${slug}.md`)

        let fullPath = fullPathVal
        if (fs.existsSync(fullPathMd)) {
            fullPath = fullPathMd
        } else if (!fs.existsSync(fullPathVal)) {
            return null
        }

        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        return {
            slug,
            content,
            title: data.title,
            subtitle: data.subtitle,
            date: data.date,
            excerpt: data.excerpt || data.description || '',
            author: data.author || 'Jake Butler',
            tags: data.tags || [],
            published: data.published !== false && data.status !== 'draft',
            featured: data.featured || false,
            readTime: data.readTime || '5 min read',
            category: data.category || 'strategy',
            ...data,
            coverImage: data.coverImage || data.heroImage,
            coverImageAlt: data.coverImageAlt || data.heroImageAlt,
        } as BlogPost
    } catch (e) {
        return null
    }
}
