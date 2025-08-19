'use client'

import { useState, useEffect } from 'react'
import { Separator } from '@/components/ui/separator'
import { CommentList } from './comment-list'
import { CommentForm } from './comment-form'
import { getCommentsBySlug } from '@/lib/comments'
import type { CommentsSectionProps, Comment } from '@/types/comments'

export function CommentsSection({ postSlug, initialComments = [] }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  // Load comments on mount if no initial comments provided
  useEffect(() => {
    if (initialComments.length === 0) {
      loadComments()
    }
  }, [postSlug, initialComments.length])

  const loadComments = async () => {
    setIsLoading(true)
    setHasError(false)
    
    try {
      const result = await getCommentsBySlug(postSlug)
      if (result.error) {
        setHasError(true)
      } else {
        setComments(result.data || [])
      }
    } catch (error) {
      setHasError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCommentSubmitSuccess = () => {
    // Optionally reload comments after successful submission
    // For now, we'll just show a success message since comments need approval
    // You could implement optimistic updates or real-time subscriptions here
  }

  const handleCommentSubmitError = (error: string) => {
    // Error handling is done in the form component
    console.error('Comment submission error:', error)
  }

  if (hasError && comments.length === 0) {
    return (
      <section className="space-y-8">
        <Separator />
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            Unable to load comments at this time.
          </p>
          <button 
            onClick={loadComments}
            className="text-primary hover:underline"
          >
            Try again
          </button>
        </div>
        
        <Separator />
        
        <CommentForm 
          postSlug={postSlug}
          onSuccess={handleCommentSubmitSuccess}
          onError={handleCommentSubmitError}
        />
      </section>
    )
  }

  return (
    <section className="space-y-8">
      <Separator />
      
      {/* Comments Display */}
      <div>
        <CommentList 
          comments={comments} 
          isLoading={isLoading && comments.length === 0}
        />
      </div>
      
      <Separator />
      
      {/* Comment Form */}
      <CommentForm 
        postSlug={postSlug}
        onSuccess={handleCommentSubmitSuccess}
        onError={handleCommentSubmitError}
      />
    </section>
  )
}
