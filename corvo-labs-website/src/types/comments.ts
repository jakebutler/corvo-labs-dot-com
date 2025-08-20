// Comment data types
export interface Comment {
  id: string
  post_slug: string
  name: string | null
  email: string
  content: string
  created_at: string
  is_approved: boolean
  user_agent: string | null
  ip_address: string | null
}

// Form data for submitting new comments
export interface CommentFormData {
  name?: string
  email: string
  content: string
}

// Comment submission payload (includes metadata)
export interface CommentSubmission extends CommentFormData {
  post_slug: string
  user_agent?: string | null
  ip_address?: string | null
}

// Comment display props
export interface CommentItemProps {
  comment: Comment
}

export interface CommentListProps {
  comments: Comment[]
  isLoading?: boolean
}

// Comment form props
export interface CommentFormProps {
  postSlug: string
  onSuccess?: () => void
  onError?: (error: string) => void
}

// Comments section props
export interface CommentsSectionProps {
  postSlug: string
  initialComments?: Comment[]
}

// API response types
export interface CommentsResponse {
  data: Comment[] | null
  error: string | null
}

export interface CommentSubmissionResponse {
  success: boolean
  error?: string
  message?: string
}
