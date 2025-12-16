import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Database type definitions for comments
export interface Database {
  public: {
    Tables: {
      comments: {
        Row: {
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
        Insert: {
          id?: string
          post_slug: string
          name?: string | null
          email: string
          content: string
          created_at?: string
          is_approved?: boolean
          user_agent?: string | null
          ip_address?: string | null
        }
        Update: {
          id?: string
          post_slug?: string
          name?: string | null
          email?: string
          content?: string
          created_at?: string
          is_approved?: boolean
          user_agent?: string | null
          ip_address?: string | null
        }
      }
    }
  }
}

// Create typed client
export const typedSupabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})
