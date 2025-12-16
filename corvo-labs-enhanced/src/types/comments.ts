/**
 * Comment type representing a comment from the database
 */
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

/**
 * Comment submission data from the frontend
 */
export interface CommentSubmission {
  post_slug: string
  name?: string | null
  email: string
  content: string
}

/**
 * Response type for fetching comments
 */
export interface CommentsResponse {
  data: Comment[] | null
  error: string | null
}

/**
 * Response type for submitting a comment
 */
export interface CommentSubmissionResponse {
  success: boolean
  message?: string
  error?: string
}
