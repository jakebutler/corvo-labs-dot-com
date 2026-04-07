import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

function getResend(): Resend | null {
    const key = process.env.RESEND_API_KEY
    if (!key) {
        return null
    }
    return new Resend(key)
}

export async function POST(request: NextRequest) {
    try {
        const resend = getResend()
        if (!resend) {
            console.error('RESEND_API_KEY is missing')
            return NextResponse.json(
                { error: 'Email service not configured. Please set RESEND_API_KEY environment variable.' },
                { status: 500 }
            )
        }

        const formData = await request.json()

        // Format the email body
        const emailBody = `
New Website Inquiry from Corvo Labs Contact Form

BASIC INFORMATION:
-------------------
Full Name: ${formData.fullName}
Email: ${formData.email}
Organization: ${formData.organization}
Job Title: ${formData.jobTitle}
Phone: ${formData.phone || 'Not provided'}

PROJECT DETAILS:
----------------
Area of Interest: ${formData.areaOfInterest}
Timeline: ${formData.timeline}
How They Heard About Us: ${formData.hearAboutUs || 'Not provided'}

Project Description:
${formData.projectDescription}

-------------------
Submitted at: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} EST
    `.trim()

        // Determine environment and set appropriate email addresses
        // In development: send to your test email (butler.jake@gmail.com)
        // In production: send to production email (jake@corvolabs.com)
        const isProduction = process.env.NODE_ENV === 'production'
        const recipientEmail = isProduction 
            ? (process.env.RESEND_TO_EMAIL || 'jake@corvolabs.com')
            : 'butler.jake@gmail.com'
        
        // Use verified domain (corvolabs.com) for both dev and production
        // In development, Resend allows sending to your own email even with verified domain
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'Corvo Labs Website <help@corvolabs.com>'

        // Send email using Resend
        const { data, error } = await resend.emails.send({
            from: fromEmail,
            to: recipientEmail,
            subject: 'Corvo Labs website inquiry',
            text: emailBody,
        })

        if (error) {
            console.error('Resend error:', error)
            return NextResponse.json(
                { error: 'Failed to send email', details: error },
                { status: 500 }
            )
        }

        console.log('Email sent successfully:', data)
        return NextResponse.json({ success: true, emailId: data?.id }, { status: 200 })
    } catch (error) {
        console.error('Error processing contact form:', error)
        return NextResponse.json(
            { error: 'Failed to process contact form', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        )
    }
}
