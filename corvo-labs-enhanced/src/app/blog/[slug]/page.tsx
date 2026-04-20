import React from 'react'
import { getBlogPost, getBlogPosts } from '@/lib/blog'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react'
import { EnhancedCTA } from '@/components/enhanced-cta'
import remarkGfm from 'remark-gfm'

// Define components mapping for MDX
const components = {
    h1: (props: any) => (
        <h1 {...props} className="text-4xl font-bold mt-12 mb-6 text-gray-900 font-display" />
    ),
    h2: (props: any) => (
        <h2 {...props} className="text-3xl font-bold mt-12 mb-6 text-gray-900 font-display" />
    ),
    h3: (props: any) => (
        <h3 {...props} className="text-2xl font-bold mt-8 mb-4 text-gray-900 font-display" />
    ),
    ul: (props: any) => (
        <ul {...props} className="list-disc pl-6 mb-6 text-gray-700 space-y-2" />
    ),
    ol: (props: any) => (
        <ol {...props} className="list-decimal pl-6 mb-6 text-gray-700 space-y-2" />
    ),
    li: (props: any) => (
        <li {...props} className="text-lg leading-relaxed" />
    ),
    blockquote: (props: any) => (
        <blockquote {...props} className="border-l-4 border-accent pl-6 italic text-xl text-gray-600 my-8 py-2 bg-gray-50 pr-4 rounded-r-lg" />
    ),
    a: (props: any) => (
        <a {...props} className="text-accent hover:text-accent-700 underline underline-offset-2 decoration-2 decoration-accent/30 hover:decoration-accent transition-colors font-medium" />
    ),
    code: (props: any) => (
        <code {...props} className="bg-gray-100 text-accent font-mono px-1.5 py-0.5 rounded text-sm" />
    ),
    table: (props: any) => (
        <div className="my-8 overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table {...props} className="min-w-full border-collapse text-left text-base text-gray-700 !my-0 m-0" />
        </div>
    ),
    thead: (props: any) => (
        <thead {...props} className="bg-gray-50" />
    ),
    tbody: (props: any) => (
        <tbody {...props} className="divide-y divide-gray-100" />
    ),
    tr: (props: any) => (
        <tr {...props} className="border-b border-gray-100 last:border-b-0" />
    ),
    th: (props: any) => (
        <th {...props} className="px-4 py-3 text-sm font-semibold uppercase tracking-wide text-gray-700" />
    ),
    td: (props: any) => (
        <td {...props} className="px-4 py-3 align-top text-base text-gray-700" />
    ),
    BlogImage: function BlogImage(props: any) {
        const { src, alt, className, ...rest } = props
        return (
            <figure className="my-10 relative group">
                <div className={`relative bg-white rounded-xl p-3 shadow-soft-lg border border-gray-100 transition-all duration-500 group-hover:shadow-soft-xl group-hover:-translate-y-1 ${className || ''}`}>
                    <img
                        src={src}
                        alt={alt}
                        className="w-full h-auto rounded-lg"
                        {...rest}
                    />
                </div>
                {alt && (
                    <figcaption className="text-center text-sm text-gray-400 mt-3 italic font-sans tracking-wide">
                        {alt}
                    </figcaption>
                )}
            </figure>
        )
    },
    // Render plain markdown ![alt](src) images with the same card styling as
    // <BlogImage /> so posts authored in either style look consistent. This
    // lets Resonate-generated posts (which only use `![alt](url)`) pick up the
    // standard image treatment without any MDX authoring changes.
    img: function BlogImageMd(props: any) {
        const { src, alt, ...rest } = props
        return (
            <figure className="my-10 relative group">
                <div className="relative bg-white rounded-xl p-3 shadow-soft-lg border border-gray-100 transition-all duration-500 group-hover:shadow-soft-xl group-hover:-translate-y-1">
                    <img
                        src={src}
                        alt={alt}
                        className="w-full h-auto rounded-lg"
                        {...rest}
                    />
                </div>
                {alt && (
                    <figcaption className="text-center text-sm text-gray-400 mt-3 italic font-sans tracking-wide">
                        {alt}
                    </figcaption>
                )}
            </figure>
        )
    },
    // Markdown wraps images in <p> by default. Our `img` / `BlogImage`
    // renderers emit a <figure>, which is invalid inside a <p>. Unwrap any
    // paragraph whose only child is one of our image renderers.
    p: (props: any) => {
        const { children, ...rest } = props
        const childArray = React.Children.toArray(children)
        const onlyChild = childArray.length === 1 ? childArray[0] : null
        const onlyChildType: any =
            onlyChild && typeof onlyChild === 'object' && 'type' in (onlyChild as any)
                ? (onlyChild as any).type
                : null
        const typeName =
            typeof onlyChildType === 'function'
                ? onlyChildType.displayName || onlyChildType.name
                : null
        const isBlockImage = typeName === 'BlogImage' || typeName === 'BlogImageMd'
        if (isBlockImage) {
            return <>{children}</>
        }
        return <p {...rest} className="mb-6 text-lg text-gray-700 leading-relaxed">{children}</p>
    },
    // Superscript for reference numbers
    sup: (props: any) => (
        <sup {...props} className="text-accent font-medium not-italic" />
    ),

    // Custom components can be added here
}

interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    const posts = getBlogPosts()
    return posts.map((post) => ({
        slug: post.slug,
    }))
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params
    const post = getBlogPost(slug)

    if (!post) {
        return {
            title: 'Post Not Found',
        }
    }

    const fullTitle = post.subtitle ? `${post.title}: ${post.subtitle}` : post.title
    const socialImages = post.coverImage
        ? [{ url: post.coverImage, alt: post.coverImageAlt || fullTitle }]
        : []

    return {
        title: `${fullTitle} | Corvo Labs Blog`,
        description: post.excerpt,
        openGraph: {
            title: fullTitle,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.date,
            authors: [post.author],
            tags: post.tags,
            images: socialImages,
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description: post.excerpt,
            images: socialImages,
        },
    }
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params
    const post = getBlogPost(slug)

    if (!post) {
        notFound()
    }

    return (
        <>
            <article className="min-h-screen bg-white pb-20 pt-0">
                {/* Navigation */}
                <div className="container mx-auto px-4 mb-12">
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-gray-500 hover:text-accent transition-colors group"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
                        Back to Blog
                    </Link>
                </div>

                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        {/* Header */}
                        <header className="mb-12 text-center">
                            <div className="flex flex-wrap justify-center gap-2 mb-6">
                                {post.tags.slice(0, 3).map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 bg-accent/5 text-accent rounded-full text-sm font-medium"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {post.coverImage && (
                                <figure className="mb-10 mx-auto w-2/5">
                                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-soft-lg">
                                        <img
                                            src={post.coverImage}
                                            alt={post.coverImageAlt || post.title}
                                            className="w-full h-auto"
                                        />
                                    </div>
                                </figure>
                            )}

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-8 leading-tight">
                                {post.title}
                            </h1>
                            {post.subtitle && (
                                <p className="text-2xl md:text-3xl text-gray-700 font-display font-semibold mb-8 leading-tight">
                                    {post.subtitle}
                                </p>
                            )}

                            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-500 text-sm md:text-base border-t border-b border-gray-100 py-6">
                                <div className="flex items-center">
                                    <User className="h-4 w-4 mr-2" />
                                    <span className="font-medium text-gray-900">{post.author}</span>
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    <span>{post.date}</span>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-2" />
                                    <span>{post.readTime}</span>
                                </div>
                            </div>
                        </header>

                        {/* Content */}
                        <div className="prose prose-lg prose-gray max-w-none">
                            <MDXRemote
                                source={post.content}
                                components={components}
                                options={{
                                    mdxOptions: {
                                        remarkPlugins: [remarkGfm],
                                    },
                                }}
                            />
                        </div>

                        {/* Share / Footer */}
                        <div className="mt-16 pt-8 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                                <div className="text-gray-600 font-medium">
                                    Share this article
                                </div>
                                <div className="flex gap-4">
                                    {/* Social share buttons could go here */}
                                    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-accent">
                                        <Share2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            <EnhancedCTA />
        </>
    )
}
