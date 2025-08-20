'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { submitComment, validateComment } from '@/lib/comments'
import type { CommentFormProps, CommentFormData } from '@/types/comments'

export function CommentForm({ postSlug, onSuccess, onError }: CommentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError
  } = useForm<CommentFormData>()

  const onSubmit = async (data: CommentFormData) => {
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    // Client-side validation
    const validationErrors = validateComment(data)
    if (validationErrors.length > 0) {
      validationErrors.forEach((error, index) => {
        if (error.includes('Email')) {
          setError('email', { message: error })
        } else if (error.includes('Comment')) {
          setError('content', { message: error })
        } else if (error.includes('Name')) {
          setError('name', { message: error })
        }
      })
      setIsSubmitting(false)
      return
    }

    try {
      const result = await submitComment({
        post_slug: postSlug,
        name: data.name,
        email: data.email,
        content: data.content
      })

      if (result.success) {
        setSubmitStatus({ 
          type: 'success', 
          message: result.message || 'Comment submitted successfully!' 
        })
        reset()
        onSuccess?.()
      } else {
        setSubmitStatus({ 
          type: 'error', 
          message: result.error || 'Failed to submit comment' 
        })
        onError?.(result.error || 'Failed to submit comment')
      }
    } catch (error) {
      const errorMessage = 'An unexpected error occurred'
      setSubmitStatus({ type: 'error', message: errorMessage })
      onError?.(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Leave a Comment</h3>
        
        {submitStatus.type && (
          <div className={`p-4 rounded-md mb-4 ${
            submitStatus.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {submitStatus.message}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Name (optional)</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your name"
              disabled={isSubmitting}
              {...register('name', {
                maxLength: {
                  value: 100,
                  message: 'Name must be less than 100 characters'
                }
              })}
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              disabled={isSubmitting}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email address'
                }
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Your email won't be published
            </p>
          </div>
        </div>

        <div>
          <Label htmlFor="content">Comment *</Label>
          <textarea
            id="content"
            rows={4}
            placeholder="Share your thoughts..."
            disabled={isSubmitting}
            className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            {...register('content', {
              required: 'Comment is required',
              minLength: {
                value: 3,
                message: 'Comment must be at least 3 characters long'
              },
              maxLength: {
                value: 2000,
                message: 'Comment must be less than 2000 characters'
              }
            })}
          />
          {errors.content && (
            <p className="text-sm text-red-600 mt-1">{errors.content.message}</p>
          )}
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full md:w-auto"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Comment'}
        </Button>
      </form>

      <div className="text-sm text-muted-foreground">
        <p>Comments are moderated and will appear after approval.</p>
      </div>
    </div>
  )
}
