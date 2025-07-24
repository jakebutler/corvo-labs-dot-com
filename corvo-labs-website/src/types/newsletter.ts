export interface MailerLiteSubscriber {
	id?: string
	email: string
	fields?: Record<string, unknown>
	groups?: string[]
	status?: 'active' | 'unsubscribed' | 'unconfirmed' | 'bounced' | 'junk'
}

export interface MailerLiteGroup {
	id: string
	name: string
	active_count: number
	sent_count: number
	opens_count: number
	open_rate: {
		float: number
		string: string
	}
	clicks_count: number
	click_rate: {
		float: number
		string: string
	}
	created_at: string
}

export interface MailerLiteResponse<T = unknown> {
	data?: T
	errors?: {
		field: string
		message: string
	}[]
	message?: string
}

// Specific response types for different MailerLite API endpoints
export interface MailerLiteSubscriberListResponse {
	data: MailerLiteSubscriber[]
	meta?: {
		current_page: number
		from: number
		last_page: number
		per_page: number
		to: number
		total: number
	}
}

export interface MailerLiteGroupListResponse {
	data: MailerLiteGroup[]
	meta?: {
		current_page: number
		from: number
		last_page: number
		per_page: number
		to: number
		total: number
	}
}

export interface NewsletterSubscription {
	email: string
	name?: string
	interests: string[]
	source: string
}

export interface SubscriptionResult {
	success: boolean
	message: string
	subscriber?: {
		id: string
		email: string
		status: string
	}
	errors?: string[]
}

export type NewsletterTopic = 
	| 'ai-tools'
	| 'healthcare'
	| 'ux-design'
	| 'product-management'
	| 'behavior-change'
	| 'general'

export interface NewsletterTopicOption {
	id: NewsletterTopic
	label: string
	description: string
	groupId?: string
}
