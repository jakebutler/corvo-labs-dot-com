# Corvo Labs Website

A sophisticated healthcare AI consulting website built with Next.js 15, TypeScript, and TailwindCSS, featuring enhanced animations, modern UI/UX, and optimized performance.

## Tech Stack

- **Framework**: Next.js 15.5.9 (App Router)
- **Runtime**: Bun (fastest JavaScript package manager)
- **Language**: TypeScript 5.x
- **Styling**: TailwindCSS 3.4.18
- **Animations**: Framer Motion 12.23.24 + MagicUI
- **Icons**: Lucide React
- **Content**: MDX-based blog with next-mdx-remote
- **Analytics**: PostHog
- **Email**: Resend

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed on your system

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd corvo-labs-enhanced

# Install dependencies (Bun is ~10x faster than npm)
bun install

# Start development server
bun dev
```

The site will be available at [http://localhost:3000](http://localhost:3000).

### Available Commands

| Command | Description |
|---------|-------------|
| `bun dev` | Start development server |
| `bun build` | Build for production |
| `bun start` | Start production server |
| `bun lint` | Run ESLint |
| `bun type-check` | Run TypeScript type checking |

## Project Structure

```
corvo-labs-enhanced/
├── content/
│   └── blog/                  # MDX blog posts
├── public/
│   └── images/                # Optimized image assets
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── about/            # About page with timeline
│   │   ├── blog/             # Blog listing and posts
│   │   ├── contact/          # Contact form
│   │   ├── projects/         # Case studies showcase
│   │   ├── services/         # Services page
│   │   ├── layout.tsx        # Root layout with navigation
│   │   └── page.tsx          # Homepage
│   ├── components/
│   │   ├── hero/             # Hero section components
│   │   ├── magicui/          # MagicUI enhanced components
│   │   └── ui/               # Reusable UI components
│   └── lib/                  # Utility functions
├── content/blog/              # MDX blog posts
├── tailwind.config.js         # Tailwind configuration
└── bun.lockb                  # Bun lockfile
```

## Features

- **Modern Animations**: Framer Motion + MagicUI (animated gradients, shimmer buttons, border beams)
- **Blog System**: MDX-powered blog with syntax highlighting
- **Case Studies**: Project showcase with filtering by category
- **Contact Form**: Integrated with Resend for email delivery
- **Analytics**: PostHog integration for user insights
- **SEO Optimized**: Sitemap, metadata, and performance best practices

## Deployment

The application is optimized for deployment on [Vercel](https://vercel.com):

```bash
bun build
bun start
```

### Environment Variables

Create a `.env.local` file:

```bash
# Resend API key for contact form
RESEND_API_KEY=re_...

# PostHog analytics
NEXT_PUBLIC_POSTHOG_KEY=phc_...

# Presentation access password (server-side verification)
GROWTH_VANGUARD_INTRO_PASSWORD=...
```

## Version History

- **2.0.0** (February 2025): Major refresh with MagicUI, blog system, and Bun migration
- **1.x**: Initial Corvo Labs website

---

**Built with Next.js, TailwindCSS, and Bun**
