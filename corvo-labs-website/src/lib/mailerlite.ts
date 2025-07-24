import { MailerLiteSubscriber, MailerLiteResponse, MailerLiteGroup, SubscriptionResult, MailerLiteSubscriberListResponse, MailerLiteGroupListResponse } from '@/types/newsletter'

const MAILERLITE_API_URL = process.env.MAILERLITE_API_URL || 'https://connect.mailerlite.com/api'
const MAILERLITE_API_TOKEN = process.env.MAILERLITE_API_TOKEN

// MailerLite API data type guard and interface (file scope)
export interface MailerLiteData {
  id?: string;
  email?: string;
  status?: string;
}
export const isMailerLiteData = (d: unknown): d is MailerLiteData =>
  !!d && typeof d === 'object' && (
    'id' in d || 'email' in d || 'status' in d
  );

if (!MAILERLITE_API_TOKEN) {
	console.warn('MAILERLITE_API_TOKEN is not set. Newsletter functionality will be disabled.')
}

// Rate limiting - MailerLite allows 120 requests per minute
class RateLimiter {
	private requests: number[] = []
	private readonly maxRequests = 120
	private readonly windowMs = 60 * 1000 // 1 minute

	canMakeRequest(): boolean {
		const now = Date.now()
		// Remove requests older than the window
		this.requests = this.requests.filter(time => now - time < this.windowMs)
		
		if (this.requests.length >= this.maxRequests) {
			return false
		}
		
		this.requests.push(now)
		return true
	}

	getWaitTime(): number {
		if (this.requests.length === 0) return 0
		const oldestRequest = Math.min(...this.requests)
		const waitTime = this.windowMs - (Date.now() - oldestRequest)
		return Math.max(0, waitTime)
	}
}

const rateLimiter = new RateLimiter()

async function makeRequest<T = unknown>(endpoint: string, options: RequestInit = {}): Promise<MailerLiteResponse<T>> {
	console.log('=== MailerLite API Debug ===')
	console.log('API Token exists:', !!MAILERLITE_API_TOKEN)
	console.log('API Token length:', MAILERLITE_API_TOKEN?.length || 0)
	console.log('API URL:', MAILERLITE_API_URL)
	console.log('Endpoint:', endpoint)
	console.log('Request options:', JSON.stringify(options, null, 2))
	
	if (!MAILERLITE_API_TOKEN) {
		console.error('MailerLite API token is not configured')
		throw new Error('MailerLite API token is not configured')
	}

	if (!rateLimiter.canMakeRequest()) {
		console.error('Rate limit exceeded')
		throw new Error('Rate limit exceeded. Please try again later.')
	}

	const url = `${MAILERLITE_API_URL}${endpoint}`
	console.log('Full URL:', url)
	
	const requestConfig = {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${MAILERLITE_API_TOKEN}`,
			'Accept': 'application/json',
		},
		...options,
	}
	console.log('Request config (headers only):', JSON.stringify(requestConfig.headers, null, 2))
	
	const response = await fetch(url, requestConfig)

	console.log('Response status:', response.status)
	console.log('Response statusText:', response.statusText)
	console.log('Response headers:', Object.fromEntries(response.headers.entries()))
	
	const data = await response.json()
	console.log('Response data:', JSON.stringify(data, null, 2))

	if (!response.ok) {
		console.error('MailerLite API Error - Status:', response.status)
		console.error('MailerLite API Error - Data:', data)
		return {
			errors: data.errors || [{ field: 'general', message: data.message || 'Unknown error' }],
			message: data.message || `HTTP ${response.status}: ${response.statusText}`
		}
	}

	console.log('MailerLite API Success:', data)
	return { data }
}

export async function subscribeToNewsletter(subscriber: MailerLiteSubscriber): Promise<SubscriptionResult> {
	try {
		const response = await makeRequest('/subscribers', {
			method: 'POST',
			body: JSON.stringify(subscriber),
		})

		if (response.errors) {
			// MailerLite returns errors as an object, not an array
			type MailerLiteErrorObj = { message: string };
			const errorMessages = Object.values(response.errors).flat().map((err: string | MailerLiteErrorObj) => typeof err === 'string' ? err : err.message);
			return {
				success: false,
				message: response.message || 'Subscription failed',
				errors: errorMessages
			}
		}

		const data: MailerLiteData = isMailerLiteData(response.data) ? response.data : {};
		return {
			success: true,
			message: 'Successfully subscribed to newsletter',
			subscriber: {
				id: typeof data.id === 'string' ? data.id : '',
				email: typeof data.email === 'string' ? data.email : subscriber.email,
				status: typeof data.status === 'string' ? data.status : 'active'
			}
		}
	} catch (error) {
		console.error('Newsletter subscription error:', error)
		return {
			success: false,
			message: error instanceof Error ? error.message : 'An unexpected error occurred',
			errors: [error instanceof Error ? error.message : 'Unknown error']
		}
	}
}

export async function updateSubscriber(subscriberId: string, updates: Partial<MailerLiteSubscriber>): Promise<SubscriptionResult> {
	try {
		const response = await makeRequest(`/subscribers/${subscriberId}`, {
			method: 'PUT',
			body: JSON.stringify(updates),
		})

		if (response.errors) {
			return {
				success: false,
				message: 'Update failed',
				errors: response.errors.map((error: string | { message: string }) => typeof error === 'string' ? error : error.message)
			}
		}

		const data: MailerLiteData = isMailerLiteData(response.data) ? response.data : {};
		return {
			success: true,
			message: 'Subscriber updated successfully',
			subscriber: {
				id: typeof data.id === 'string' ? data.id : subscriberId,
				email: typeof data.email === 'string' ? data.email : '',
				status: typeof data.status === 'string' ? data.status : 'active'
			}
		}
	} catch (error) {
		console.error('Subscriber update error:', error)
		return {
			success: false,
			message: error instanceof Error ? error.message : 'An unexpected error occurred',
			errors: [error instanceof Error ? error.message : 'Unknown error']
		}
	}
}

export async function unsubscribeFromNewsletter(email: string): Promise<SubscriptionResult> {
	try {
		// First, find the subscriber by email
		const response = await makeRequest<MailerLiteSubscriberListResponse>(`/subscribers?filter[email]=${encodeURIComponent(email)}`)
		
		if (response.errors || !response.data?.data?.length) {
			return {
				success: false,
				message: 'Subscriber not found',
				errors: ['Email address not found in our system']
			}
		}

		const subscriberId = response.data.data[0]?.id

		// Update subscriber status to unsubscribed
		const unsubscribeResponse = await makeRequest(`/subscribers/${subscriberId}`, {
			method: 'PUT',
			body: JSON.stringify({ status: 'unsubscribed' }),
		})

		if (unsubscribeResponse.errors) {
			return {
				success: false,
				message: 'Unsubscribe failed',
				errors: unsubscribeResponse.errors.map((error: string | { message: string }) => typeof error === 'string' ? error : error.message)
			}
		}

		const data: MailerLiteData = isMailerLiteData(unsubscribeResponse.data) ? unsubscribeResponse.data : {};
		return {
			success: true,
			message: 'Successfully unsubscribed from newsletter',
			subscriber: {
				id: typeof data.id === 'string' ? data.id : '',
				email: typeof data.email === 'string' ? data.email : '',
				status: typeof data.status === 'string' ? data.status : 'unsubscribed'
			}
		}
	} catch (error) {
		console.error('Unsubscribe error:', error)
		return {
			success: false,
			message: error instanceof Error ? error.message : 'An unexpected error occurred',
			errors: [error instanceof Error ? error.message : 'Unknown error']
		}
	}
}

export async function getGroups(): Promise<MailerLiteGroup[]> {
	try {
		const response = await makeRequest<MailerLiteGroupListResponse>('/groups')
		
		if (response.errors || !response.data?.data) {
			console.error('Failed to fetch groups:', response.errors)
			return []
		}

		return response.data.data
	} catch (error) {
		console.error('Error fetching groups:', error)
		return []
	}
}

export async function getSubscriberByEmail(email: string): Promise<MailerLiteSubscriber | null> {
	try {
		const response = await makeRequest<MailerLiteSubscriberListResponse>(`/subscribers?filter[email]=${encodeURIComponent(email)}`)
		
		if (response.errors || !response.data?.data?.length) {
			return null
		}

		return response.data.data[0]
	} catch (error) {
		console.error('Error fetching subscriber:', error)
		return null
	}
}

// Utility function to validate email format
export function isValidEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return emailRegex.test(email)
}

// Utility function to sanitize input
export function sanitizeInput(input: string): string {
	return input.trim().replace(/[<>]/g, '')
}
