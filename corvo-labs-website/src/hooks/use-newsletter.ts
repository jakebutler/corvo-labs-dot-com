'use client'

import { useState } from 'react'
import { NewsletterSubscription, SubscriptionResult } from '@/types/newsletter'

interface UseNewsletterReturn {
	subscribe: (data: NewsletterSubscription) => Promise<SubscriptionResult>
	unsubscribe: (email: string) => Promise<SubscriptionResult>
	isLoading: boolean
	error: string | null
}

export function useNewsletter(): UseNewsletterReturn {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const subscribe = async (data: NewsletterSubscription): Promise<SubscriptionResult> => {
		console.log('=== Client-side Newsletter Debug ===')
		console.log('Subscribing with data:', JSON.stringify(data, null, 2))
		
		setIsLoading(true)
		setError(null)

		try {
			console.log('Making API call to /api/newsletter/subscribe')
			const response = await fetch('/api/newsletter/subscribe', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})
			
			console.log('API Response status:', response.status)
			console.log('API Response ok:', response.ok)

			const result = await response.json()

			if (!result.success) {
				setError(result.message)
				return result
			}

			return result
		} catch (_err) {
			const errorMessage = 'Network error. Please check your connection and try again.'
			setError(errorMessage)
			return {
				success: false,
				message: errorMessage,
				errors: [errorMessage]
			}
		} finally {
			setIsLoading(false)
		}
	}

	const unsubscribe = async (email: string): Promise<SubscriptionResult> => {
		setIsLoading(true)
		setError(null)

		try {
			const response = await fetch('/api/newsletter/unsubscribe', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email }),
			})

			const result = await response.json()

			if (!result.success) {
				setError(result.message)
				return result
			}

			return result
		} catch (_err) {
			const errorMessage = 'Network error. Please check your connection and try again.'
			setError(errorMessage)
			return {
				success: false,
				message: errorMessage,
				errors: [errorMessage]
			}
		} finally {
			setIsLoading(false)
		}
	}

	return {
		subscribe,
		unsubscribe,
		isLoading,
		error
	}
}
