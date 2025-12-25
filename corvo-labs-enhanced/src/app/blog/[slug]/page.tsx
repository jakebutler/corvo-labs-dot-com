import React from 'react'
import { getBlogPost, getBlogPosts } from '@/lib/blog'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react'
import { EnhancedCTA } from '@/components/enhanced-cta'

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
    p: (props: any) => (
        <p {...props} className="mb-6 text-lg text-gray-700 leading-relaxed" />
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

    return {
        title: `${post.title} | Corvo Labs Blog`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.date,
            authors: [post.author],
            tags: post.tags,
            images: post.coverImage ? [post.coverImage] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: post.coverImage ? [post.coverImage] : [],
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
            <article className="min-h-screen bg-white pb-20 pt-32">
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

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-8 leading-tight">
                                {post.title}
                            </h1>

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
                            <MDXRemote source={post.content} components={components} />
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
