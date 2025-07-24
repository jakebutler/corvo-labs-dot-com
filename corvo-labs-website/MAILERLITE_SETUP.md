# MailerLite Integration Setup

This document outlines the setup process for integrating MailerLite with the Corvo Labs website.

## Prerequisites

1. **MailerLite Account**: You need an active MailerLite account
2. **API Token**: Generate an API token from your MailerLite dashboard

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# MailerLite Configuration
MAILERLITE_API_TOKEN=your_mailerlite_api_token_here
MAILERLITE_API_URL=https://connect.mailerlite.com/api
```

**Replace `your_mailerlite_api_token_here` with your actual MailerLite API token.**

## Getting Your API Token

1. Log in to your MailerLite account
2. Go to **Integrations** → **Developer API**
3. Generate a new API token
4. Copy the token and add it to your `.env.local` file

## Newsletter Integration Features

The website now includes newsletter subscription forms on:

- **Homepage** - Main newsletter CTA
- **Blog listing page** - Stay updated with new articles
- **Individual blog posts** - Post-read engagement
- **Dedicated unsubscribe page** - `/unsubscribe`

## Optional: Create Groups

For better subscriber organization, consider creating these groups in MailerLite:

- **AI Tools** - For subscribers interested in AI content
- **Product Management** - For PM-focused content
- **Healthcare Innovation** - For healthcare-related updates
- **General Updates** - For all newsletter content

## Custom Fields (Optional)

You can add these custom fields in MailerLite for better subscriber data:

- `source` - Where the subscriber came from (homepage, blog, etc.)
- `interests` - Comma-separated list of interests
- `subscription_date` - When they subscribed
- `preferred_frequency` - How often they want updates

## Rate Limits

- MailerLite allows 120 requests per minute
- The integration includes automatic rate limiting
- Requests are queued if limits are exceeded

## Testing

1. Set up your environment variables
2. Run the development server: `npm run dev`
3. Navigate to any page with a newsletter signup
4. Test the subscription flow
5. Check your MailerLite dashboard for new subscribers

## API Endpoints

The integration includes these API routes:

- `POST /api/newsletter/subscribe` - Subscribe a user
- `POST /api/newsletter/unsubscribe` - Unsubscribe a user

## Security

- API tokens are stored server-side only
- All MailerLite interactions go through Next.js API routes
- Input validation and sanitization is implemented
- Rate limiting prevents abuse

## Troubleshooting

### Common Issues

1. **401 Unauthorized**: Check your API token
2. **422 Validation Error**: Check email format and required fields
3. **429 Rate Limited**: Wait and retry, or implement exponential backoff

### Debug Mode

Set `NODE_ENV=development` to see detailed error messages in the console.

## Project Data Management

Your projects are now set up with:

- **Cerebro** - Product Management thought leaders database
- **CalPal Nutrition Calculator** - Chrome extension for nutrition calculations
- **Kinisi** - AI Exercise Program Generator

All project files are located in `src/content/projects/` with:
- `projects.json` - Project metadata
- Individual `.mdx` files for detailed project content
