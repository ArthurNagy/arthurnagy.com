import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { headers } from 'next/headers'
import { rateLimit } from '@/utils/rateLimiter'

const resend = new Resend(process.env.RESEND_API_KEY || process.env.NEXT_PUBLIC_RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    // Get IP address for rate limiting
    const forwardedFor = (await headers()).get('x-forwarded-for')
    const ip = forwardedFor?.split(',')[0] || 'unknown'
    
    // Check rate limit
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { 
          error: 'Too many requests. Please try again later.' 
        },
        { 
          status: 429,
          headers: {
            'Retry-After': '60'
          }
        }
      )
    }

    const { name, email, message } = await request.json()

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Send email
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'arthur.93.nagy@gmail.com',
      subject: `New Contact Form Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
    })

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
} 