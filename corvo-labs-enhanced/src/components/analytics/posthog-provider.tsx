'use client'

import { PostHogProvider as PHProvider } from 'posthog-js/react'
import posthog from 'posthog-js'

if (typeof window !== 'undefined') {
  posthog.init('phc_bTZNezcN16QNtZcwVvyH1NDaj19Sm9y0u4lhVB56hmw', {
    api_host: 'https://us.i.posthog.com',
    person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
    capture_pageview: false // Disable automatic pageview capture, we'll manually capture
  })
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return <PHProvider client={posthog}>{children}</PHProvider>
}