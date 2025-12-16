# Blog Comments System Setup Guide

This guide walks you through setting up the blog comments system with Supabase backend and email notifications.

## 🚀 Quick Start

### 1. Environment Variables

Copy the environment template and fill in your Supabase credentials:

```bash
cp .env.local.example .env.local
```

Get your Supabase credentials from your [Supabase dashboard](https://supabase.com/dashboard):
- Go to Settings → API
- Copy the Project URL and anon/public key

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 2. Database Setup

The SQL schema has already been run in your Supabase database, which includes:
- ✅ Comments table with metadata fields
- ✅ Row Level Security (RLS) policies
- ✅ Basic logging setup for email notifications

### 3. Test the Implementation

1. Start your development server:
```bash
npm run dev
```

2. Navigate to any blog post
3. Scroll down to see the comments section
4. Try submitting a test comment

### 4. Moderate Comments

1. Go to your [Supabase dashboard](https://supabase.com/dashboard)
2. Navigate to Table Editor → comments
3. Find pending comments (`is_approved = false`)
4. Set `is_approved = true` to approve comments
5. Refresh your blog post to see approved comments

## 📧 Email Notifications (Optional)

The basic logging is set up, but for actual email notifications, you can implement one of these approaches:

### Option A: Supabase Edge Functions (Recommended)

1. **Install Supabase CLI:**
```bash
npm install -g supabase
```

2. **Create an Edge Function:**
```bash
supabase functions new notify-comment
```

3. **Add email service** (example with Resend):
```typescript
// supabase/functions/notify-comment/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  const { post_slug, name, email, content } = await req.json()
  
  // Send email using your preferred service (Resend, SendGrid, etc.)
  const emailResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'comments@yourdomain.com',
      to: 'your-email@yourdomain.com',
      subject: `New comment on "${post_slug}"`,
      html: `
        <h2>New comment awaiting approval</h2>
        <p><strong>Post:</strong> ${post_slug}</p>
        <p><strong>From:</strong> ${name || 'Anonymous'} (${email})</p>
        <p><strong>Comment:</strong></p>
        <p>${content}</p>
        <p><a href="https://supabase.com/dashboard/project/YOUR_PROJECT/editor">Moderate in Supabase</a></p>
      `
    })
  })
  
  return new Response(JSON.stringify({ success: true }))
})
```

4. **Deploy the function:**
```bash
supabase functions deploy notify-comment
```

5. **Update the database trigger** to call your Edge Function:
```sql
-- Replace the existing notify_new_comment function
CREATE OR REPLACE FUNCTION notify_new_comment()
RETURNS TRIGGER AS $$
BEGIN
  -- Call Edge Function for email notification
  PERFORM net.http_post(
    url := 'https://your-project-id.supabase.co/functions/v1/notify-comment',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || 'YOUR_SERVICE_ROLE_KEY'
    ),
    body := json_build_object(
      'post_slug', NEW.post_slug,
      'name', COALESCE(NEW.name, 'Anonymous'),
      'email', NEW.email,
      'content', NEW.content
    )::text
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### Option B: Webhook Integration

1. **Set up a webhook endpoint** in your Next.js API routes
2. **Configure Supabase webhook** to call your endpoint on new comments
3. **Process and send emails** from your webhook handler

### Option C: Periodic Email Digest

Create a cron job or scheduled function that:
1. Checks for new unapproved comments
2. Sends a daily/weekly digest email
3. Marks comments as "notified"

## 🔒 Security Features

### Row Level Security (RLS)
- ✅ Anyone can submit comments (but they need approval)
- ✅ Only approved comments are visible to the public
- ✅ Admin access for moderation via Supabase dashboard

### Spam Protection
- ✅ Manual moderation (all comments require approval)
- ✅ User agent and IP logging for moderation
- ✅ Client-side and server-side validation
- ✅ Rate limiting via Supabase's built-in protections

### Data Privacy
- ✅ Email addresses are not exposed to the public
- ✅ User metadata is only visible to admins
- ✅ Optional name field (can be anonymous)

## 🛠️ Advanced Configuration

### Custom Styling
The components use your existing Tailwind CSS classes and should match your site's design automatically. To customize:

1. Edit components in `src/components/comments/`
2. Modify the styles to match your brand
3. Add custom validation rules in `src/lib/comments.ts`

### Comment Features
Current features:
- ✅ Name (optional) and email (required)
- ✅ Multi-line comment content
- ✅ Manual approval workflow
- ✅ Comment count and timestamp
- ✅ Loading states and error handling

Potential enhancements:
- 🔄 Reply threading
- 🔄 Rich text editing
- 🔄 Comment reactions/likes
- 🔄 Real-time comment updates
- 🔄 Comment editing and deletion

### Performance
- ✅ Server-side rendering (SSR) for initial comments
- ✅ Client-side loading for dynamic updates
- ✅ Optimized queries with proper indexing
- ✅ Error boundaries and fallback states

## 🐛 Troubleshooting

### Comments not loading?
1. Check browser console for errors
2. Verify Supabase environment variables
3. Confirm RLS policies are active
4. Test database connection in Supabase dashboard

### Comments not submitting?
1. Check form validation errors
2. Verify Supabase anon key permissions
3. Check network tab for API errors
4. Test database insert permissions

### Email notifications not working?
1. Check Edge Function logs in Supabase
2. Verify webhook URLs and authentication
3. Test email service API keys
4. Check trigger function execution

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [React Hook Form](https://react-hook-form.com/)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

## 🆘 Support

If you encounter issues:
1. Check the browser console for errors
2. Review Supabase logs in the dashboard
3. Verify all environment variables are set correctly
4. Test with a fresh comment submission

The system is designed to be resilient - if comments fail to load, the form should still work, and vice versa.
