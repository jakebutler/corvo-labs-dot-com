import { NextRequest, NextResponse } from 'next/server'
import { subscribeToNewsletter, isValidEmail, sanitizeInput } from '@/lib/mailerlite'
import { NewsletterSubscription } from '@/types/newsletter'

export async function POST(request: NextRequest) {
	try {
		console.log('=== Newsletter Subscription Debug ===')
		console.log('MAILERLITE_API_TOKEN exists:', !!process.env.MAILERLITE_API_TOKEN)
		console.log('MAILERLITE_API_URL:', process.env.MAILERLITE_API_URL)
		
		const body: NewsletterSubscription = await request.json()
		console.log('Request body:', JSON.stringify(body, null, 2))

		// Validate required fields
		if (!body.email) {
			return NextResponse.json(
				{ success: false, message: 'Email is required' },
				{ status: 400 }
			)
		}

		// Validate email format
		if (!isValidEmail(body.email)) {
			return NextResponse.json(
				{ success: false, message: 'Please enter a valid email address' },
				{ status: 400 }
			)
		}

		// Sanitize inputs
		const email = sanitizeInput(body.email.toLowerCase())
		const name = body.name ? sanitizeInput(body.name) : undefined
		const source = sanitizeInput(body.source || 'website')
		const interests = body.interests?.map(interest => sanitizeInput(interest)) || []

		// Prepare subscriber data for MailerLite
		const subscriber = {
			email,
			fields: {
				name,
				interests: interests.join(', '),
				source,
				subscription_date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
				preferred_frequency: 'weekly' // Default frequency
			}
		}

		// Subscribe to MailerLite
		console.log('Subscriber data being sent to MailerLite:', JSON.stringify(subscriber, null, 2))
		const result = await subscribeToNewsletter(subscriber)
		console.log('MailerLite API result:', JSON.stringify(result, null, 2))

		if (!result.success) {
			return NextResponse.json(
				{ 
					success: false, 
					message: result.message,
					errors: result.errors 
				},
				{ status: 400 }
			)
		}

		// Success response
		return NextResponse.json({
			success: true,
			message: 'Successfully subscribed to newsletter! Please check your email to confirm your subscription.',
			subscriber: result.subscriber
		})

	} catch (error) {
		console.error('Newsletter subscription API error:', error)
		
		return NextResponse.json(
			{ 
				success: false, 
				message: 'An unexpected error occurred. Please try again later.' 
			},
			{ status: 500 }
		)
	}
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
	return new NextResponse(null, {
		status: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
		},
	})
}
