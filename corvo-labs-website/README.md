# Corvo Labs Website

This directory contains the main Corvo Labs website, built with [Next.js](https://nextjs.org), [TypeScript](https://www.typescriptlang.org/), and [TailwindCSS](https://tailwindcss.com/). It includes all source code, content, configuration, and documentation for the public-facing site, project showcase, blog, and newsletter system.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   # or
yarn install
   ```
2. Copy `.env.local.example` to `.env.local` and fill in required environment variables (see below).
3. Run the development server:
   ```bash
   npm run dev
   # or
yarn dev
   ```

The app will be available at [http://localhost:3000](http://localhost:3000).

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Directory Structure

```
src/
├── app/         # Next.js app directory (routing, pages)
├── components/  # Reusable React components
├── content/     # MDX/Markdown blog posts, project content
├── hooks/       # Custom React hooks
├── lib/         # Utility libraries (MailerLite, etc.)
├── types/       # TypeScript type definitions
public/          # Static assets (SVGs, images, favicon)
```

- `MAILERLITE_SETUP.md`: Docs for newsletter integration
- `PROJECT_DATA_STRUCTURE.md`: Docs for project showcase content system

## App Features
- Modern, responsive design with TailwindCSS
- Projects showcase system (filtering, MDX content)
- Blog with MDX/Markdown support
- MailerLite newsletter integration (API-based, not embedded)
- SEO, accessibility, and image optimization
- Professional SVG logo components

## Environment Variables
- `MAILERLITE_API_URL` (optional, defaults to MailerLite API base)
- `MAILERLITE_API_TOKEN` (required for newsletter)

Copy `.env.local.example` to `.env.local` and fill in your API token.

## Newsletter System
- Uses MailerLite API for subscriptions
- Custom React form, not embedded
- Subscribers can be grouped by topic
- Handles errors (validation, rate limits) and provides user feedback
- See `src/lib/mailerlite.ts` and `MAILERLITE_SETUP.md` for details

## Project Showcase System
- Projects defined in JSON for metadata, MDX for content
- Filtering by category, status, technology
- See `PROJECT_DATA_STRUCTURE.md` for adding projects

## Contribution Guidelines
- Use `npm run lint` and `npm run build` before PRs
- All TypeScript and ESLint errors must be resolved
- Document new components and utilities
- See root README for monorepo details

---

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
