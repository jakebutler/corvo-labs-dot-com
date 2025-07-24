import { NextRequest, NextResponse } from 'next/server'
import { unsubscribeFromNewsletter, isValidEmail, sanitizeInput } from '@/lib/mailerlite'

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()

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

		// Sanitize email
		const email = sanitizeInput(body.email.toLowerCase())

		// Unsubscribe from MailerLite
		const result = await unsubscribeFromNewsletter(email)

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
			message: 'Successfully unsubscribed from newsletter. We\'re sorry to see you go!'
		})

	} catch (error) {
		console.error('Newsletter unsubscribe API error:', error)
		
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
