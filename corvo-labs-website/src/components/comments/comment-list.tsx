import { CommentItem } from './comment-item'
import type { CommentListProps } from '@/types/comments'

export function CommentList({ comments, isLoading = false }: CommentListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {/* Loading skeleton */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="border-b border-border pb-4 animate-pulse">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-4 bg-muted rounded w-24"></div>
              <div className="h-3 bg-muted rounded w-32"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!comments || comments.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No comments yet. Be the first to share your thoughts!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          {comments.length === 1 
            ? '1 Comment' 
            : `${comments.length} Comments`
          }
        </h3>
      </div>
      
      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  )
}
