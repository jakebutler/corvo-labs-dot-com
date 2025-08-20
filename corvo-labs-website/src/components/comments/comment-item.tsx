import type { CommentItemProps } from '@/types/comments'

export function CommentItem({ comment }: CommentItemProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatContent = (content: string) => {
    // Simple line break handling - converts \n to <br>
    return content.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < content.split('\n').length - 1 && <br />}
      </span>
    ))
  }

  return (
    <div className="border-b border-border pb-4 last:border-b-0">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-medium text-foreground">
              {comment.name || 'Anonymous'}
            </h4>
            <span className="text-sm text-muted-foreground">
              {formatDate(comment.created_at)}
            </span>
          </div>
          
          <div className="text-foreground leading-relaxed whitespace-pre-wrap">
            {formatContent(comment.content)}
          </div>
        </div>
      </div>
    </div>
  )
}
