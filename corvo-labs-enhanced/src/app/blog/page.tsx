import React from 'react'
import { BlogList } from '@/components/blog-list'
import { getBlogPosts } from '@/lib/blog'

export const metadata = {
  title: 'Blog | Corvo Labs',
  description: 'Expert insights on implementing AI in healthcare workflows, industry trends, and best practices.',
}

export default function BlogPage() {
  const posts = getBlogPosts()

  // Filter out unpublished posts if not in development
  const publishedPosts = process.env.NODE_ENV === 'development'
    ? posts
    : posts.filter(post => post.published)

  return (
    <main>
      <BlogList posts={publishedPosts} />
    </main>
  )
}