import { NextRequest, NextResponse } from 'next/server'

// Validate API token exists
if (!process.env.MAILERLITE_API_TOKEN) {
  console.error('MAILERLITE_API_TOKEN environment variable is not set!')
}

const MAILERLITE_API_URL = process.env.MAILERLITE_API_URL || 'https://connect.mailerlite.com/api'

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  try {
    // Check if API token is configured
    if (!process.env.MAILERLITE_API_TOKEN) {
      console.error('MAILERLITE_API_TOKEN is missing')
      return NextResponse.json(
        { 
          error: 'Newsletter service not configured. Please contact support.',
          details: process.env.NODE_ENV === 'development' ? 'MAILERLITE_API_TOKEN environment variable is not set' : undefined
        },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { email, source = 'blog' } = body

    // Validate email is provided
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const trimmedEmail = email.trim().toLowerCase()
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return NextResponse.json(
        { error: 'Invalid email address format' },
        { status: 400 }
      )
    }

    // Prepare MailerLite API request
    const mailerlitePayload: {
      email: string
      fields?: Record<string, string>
      groups?: string[]
    } = {
      email: trimmedEmail,
      fields: {
        source: source
      }
    }

    // Add groups if configured (optional)
    if (process.env.MAILERLITE_GROUP_IDS) {
      try {
        const groupIds = JSON.parse(process.env.MAILERLITE_GROUP_IDS)
        if (Array.isArray(groupIds) && groupIds.length > 0) {
          mailerlitePayload.groups = groupIds
        }
      } catch (e) {
        console.warn('Invalid MAILERLITE_GROUP_IDS format, skipping groups')
      }
    }

    // Make request to MailerLite API
    const response = await fetch(`${MAILERLITE_API_URL}/subscribers`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MAILERLITE_API_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(mailerlitePayload)
    })

    const responseData = await response.json().catch(() => ({}))

    // Handle different response statuses
    if (response.status === 201) {
      // New subscriber created
      return NextResponse.json(
        { 
          success: true, 
          message: 'Successfully subscribed to newsletter',
          data: responseData
        },
        { status: 201 }
      )
    }

    if (response.status === 200) {
      // Existing subscriber updated
      return NextResponse.json(
        { 
          success: true, 
          message: 'Subscription updated successfully',
          data: responseData
        },
        { status: 200 }
      )
    }

    if (response.status === 401) {
      // Authentication failed
      console.error('MailerLite API authentication failed')
      return NextResponse.json(
        { 
          error: 'Newsletter service authentication failed',
          details: process.env.NODE_ENV === 'development' ? 'Invalid API token' : undefined
        },
        { status: 500 }
      )
    }

    if (response.status === 422) {
      // Validation error from MailerLite
      const errorMessage = responseData.message || responseData.error || 'Invalid subscription data'
      return NextResponse.json(
        { error: errorMessage },
        { status: 422 }
      )
    }

    if (response.status === 429) {
      // Rate limit exceeded
      console.error('MailerLite API rate limit exceeded')
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a moment.' },
        { status: 429 }
      )
    }

    // Handle other error statuses
    console.error('MailerLite API error:', response.status, responseData)
    return NextResponse.json(
      { 
        error: 'Failed to subscribe to newsletter',
        details: process.env.NODE_ENV === 'development' ? responseData : undefined
      },
      { status: response.status >= 500 ? 500 : response.status }
    )

  } catch (error) {
    console.error('Error processing newsletter subscription:', error)
    return NextResponse.json(
      { 
        error: 'Failed to process subscription request',
        details: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined
      },
      { status: 500 }
    )
  }
}




