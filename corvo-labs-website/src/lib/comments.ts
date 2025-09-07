import { supabase } from './supabase'
import type { Comment, CommentSubmission, CommentsResponse, CommentSubmissionResponse } from '@/types/comments'

/**
 * Fetch all approved comments for a specific blog post
 */
export async function getCommentsBySlug(postSlug: string): Promise<CommentsResponse> {
  try {
    const { data, error } = await supabase
      .from('comments')
      .select('id, post_slug, name, content, created_at, email, is_approved')
      .eq('post_slug', postSlug)
      .eq('is_approved', true)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Error fetching comments:', error)
      return { data: null, error: 'Failed to load comments' }
    }

    // Transform the data to match our Comment interface
    const comments: Comment[] = (data || []).map(comment => ({
      ...comment,
      user_agent: null, // Don't expose metadata to frontend
      ip_address: null,
    }))

    return { data: comments, error: null }
  } catch (error) {
    console.error('Unexpected error fetching comments:', error)
    return { data: null, error: 'An unexpected error occurred' }
  }
}

/**
 * Get metadata from browser environment (client-side only)
 */
function getBrowserMetadata() {
  if (typeof window === 'undefined') {
    return { user_agent: null, ip_address: null }
  }

  return {
    user_agent: navigator.userAgent || null,
    ip_address: null, // We'll let Supabase handle IP detection server-side
  }
}

/**
 * Submit a new comment for approval
 */
export async function submitComment(submission: CommentSubmission): Promise<CommentSubmissionResponse> {
  try {
    // Add browser metadata if we're on the client side
    const metadata = await getBrowserMetadata()
    
    const commentData = {
      post_slug: submission.post_slug,
      name: submission.name?.trim() || null,
      email: submission.email.trim(),
      content: submission.content.trim(),
      user_agent: metadata.user_agent,
      ip_address: metadata.ip_address,
      is_approved: false, // All comments start unapproved
    }

    const { error } = await supabase
      .from('comments')
      .insert(commentData)
      .select('id')
      .single()

    if (error) {
      console.error('Error submitting comment:', error)
      
      // Handle specific error cases
      if (error.code === '23505') {
        return { 
          success: false, 
          error: 'Duplicate comment detected. Please wait before posting again.' 
        }
      }
      
      // Check for RLS policy errors
      if (error.code === '42501' || error.message?.includes('policy')) {
        return {
          success: false,
          error: 'Permission denied. Please check your database configuration.'
        }
      }
      
      return { 
        success: false, 
        error: 'Failed to submit comment. Please try again.' 
      }
    }
    return { 
      success: true, 
      message: 'Comment submitted successfully! It will appear after approval.' 
    }
  } catch (error) {
    console.error('Unexpected error submitting comment:', error)
    return { 
      success: false, 
      error: 'An unexpected error occurred. Please try again.' 
    }
  }
}

/**
 * Validate comment content
 */
export function validateComment(formData: Omit<CommentSubmission, 'post_slug'>): string[] {
  const errors: string[] = []

  // Email validation
  if (!formData.email.trim()) {
    errors.push('Email is required')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
    errors.push('Please enter a valid email address')
  }

  // Content validation
  if (!formData.content.trim()) {
    errors.push('Comment content is required')
  } else if (formData.content.trim().length < 3) {
    errors.push('Comment must be at least 3 characters long')
  } else if (formData.content.trim().length > 2000) {
    errors.push('Comment must be less than 2000 characters')
  }

  // Name validation (optional but has limits)
  if (formData.name && formData.name.trim().length > 100) {
    errors.push('Name must be less than 100 characters')
  }

  return errors
}

/**
 * Get comment count for a post (approved comments only)
 */
export async function getCommentCount(postSlug: string): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('comments')
      .select('*', { count: 'exact', head: true })
      .eq('post_slug', postSlug)
      .eq('is_approved', true)

    if (error) {
      console.error('Error fetching comment count:', error)
      return 0
    }

    return count || 0
  } catch (error) {
    console.error('Unexpected error fetching comment count:', error)
    return 0
  }
}
