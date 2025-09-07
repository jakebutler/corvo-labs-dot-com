# Corvo Labs

This repository contains the source code and applications for [Corvo Labs](https://corvolabs.com), specializing in AI projects and consulting across product management, healthcare, behavior change, UX design, and AI prototyping.

## 🏗️ Repository Structure

### `/corvo-labs-website`

The main Corvo Labs website ([corvolabs.com](https://corvolabs.com)) built with:
- **Next.js 15** with App Router and TypeScript
- **TailwindCSS 4** for styling
- **TinaCMS** for content management
- **shadcn/ui** component library
- **MailerLite** integration for newsletter subscriptions

**Key Features:**
- AI-focused project showcase with filtering
- Blog platform with MDX support
- Newsletter subscription system with topic-based preferences
- Responsive design with custom brand components
- Professional portfolio and consulting information

See the [website README](./corvo-labs-website/README.md) for detailed setup and development instructions.

## 🌐 Deployed Applications

Several applications and services are deployed as subdomains of corvolabs.com:

### Active Applications

- **[kinisi.corvolabs.com](https://kinisi.corvolabs.com)** - AI-powered personalized exercise program generator
  - Quick fitness survey and assessment
  - Custom workout plan generation
  - Calendar integration for seamless scheduling
  - Currently in beta access mode

- **Main Website: [corvolabs.com](https://corvolabs.com)** - Primary website and portfolio

### Future Subdomains

Additional applications and tools may be deployed to subdomains as they are developed and released.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jakebutler/corvo-labs-dot-com.git
   cd corvo-labs-dot-com
   ```

2. **Set up the main website:**
   ```bash
   cd corvo-labs-website
   npm install
   cp .env.local.example .env.local
   # Add your environment variables (MailerLite API token, etc.)
   npm run dev
   ```

3. **Visit the development server:**
   - Website: [http://localhost:3000](http://localhost:3000)
   - TinaCMS Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

## 📁 Directory Overview

```
corvo-labs-dot-com/
├── corvo-labs-website/     # Main website source code
│   ├── src/                # Application source
│   │   ├── app/           # Next.js App Router
│   │   ├── components/    # React components
│   │   ├── content/       # Project data and content
│   │   └── lib/          # Utilities and integrations
│   ├── content/blog/      # Blog posts (MDX)
│   ├── tina/             # CMS configuration
│   └── public/           # Static assets
└── README.md             # This file
```

## ✍️ Blog Authoring (TinaCMS + MDX)

Use TinaCMS to create and edit blog posts stored at `corvo-labs-website/content/blog/` as MDX files.

1) __Run locally__
   - `cd corvo-labs-website`
   - `npm install`
   - `npm run dev`
   - App: http://localhost:3000 • Tina Admin: http://localhost:3000/admin

2) __Create or edit a post (Tina Studio)__
   - Go to `Blog Posts` in Tina Admin (`/admin`).
   - Create a new post (file name = slug, e.g., `ai-at-corvo.mdx`).
   - Fields (from `tina/config.ts`):
     - `title` (required)
     - `date` (required)
     - `excerpt`, `author`, `tags[]` (optional)
     - `coverImage` (image picker; stored under `public/`)
     - `published` (toggle; set false to keep as draft)
     - `body` (rich text / MDX)

3) __Drafts vs Published__
   - The blog listing hides posts with `published: false`.
   - Omitted `published` defaults to `true` for backward compatibility.

4) __Manual editing (MDX)__
   - Add files under `corvo-labs-website/content/blog/your-slug.mdx`.
   - Frontmatter keys match the fields above (`title`, `date`, `excerpt`, `author`, `tags`, `coverImage`, `published`).
   - Content body is standard MDX.

5) __Preview & Publish__
   - Preview locally at `/blog/your-slug` while `npm run dev` is running.
   - Commit and push changes to `main` to deploy (Vercel recommended). Ensure `NEXT_PUBLIC_TINA_CLIENT_ID` and `TINA_TOKEN` are set in hosting env vars.

6) __Cover images__
   - Use Tina’s image picker to upload to `public/` and store a path like `/images/cover.jpg`.
   - Cover images render on the blog grid (`src/app/blog/page.tsx`) and on the detail page (`src/app/blog/[slug]/page.tsx`).

Troubleshooting:
- If `/admin` 404s in production, run `npx tinacms build` locally to generate `public/admin/` and commit it.
- If a post isn’t visible, confirm `published: true` and that it resides in `content/blog/`.
- Ensure MDX is valid; syntax errors can cause build failures.

## 🛠️ Technologies Used

- **Framework:** Next.js 15 with TypeScript
- **Styling:** TailwindCSS 4
- **Content Management:** TinaCMS
- **UI Components:** shadcn/ui
- **Newsletter:** MailerLite API
- **Deployment:** Vercel / Netlify
- **Version Control:** Git & GitHub

## 🎯 Areas of Expertise

Corvo Labs specializes in:

- **Product Management** - Strategic product development and market analysis
- **Healthcare Innovation** - Digital health solutions and clinical systems  
- **UX Design** - User-centered design and accessibility
- **Behavior Change** - Psychology-driven habit formation systems
- **AI** - Intelligent systems and prototype development

## 📋 Featured Projects

Current active projects include:
- **Cerebro** - Product Management thought leaders database
- **CalPal** - Chrome extension for nutrition calculations
- **Kinisi** - AI exercise program generator
- **Cerridwen** - AI ruleset generator for IDEs
- **AI Rules Database** - Comprehensive coding rulesets platform

See the [projects page](https://corvolabs.com/projects) for detailed information.

## 🤝 Contributing

This repository primarily contains proprietary code for Corvo Labs projects. For inquiries about collaboration or consulting:

- **Website:** [corvolabs.com](https://corvolabs.com)
- **Email:** Contact through the website
- **Newsletter:** [Subscribe](https://corvolabs.com/subscribe) for updates

## 📄 License

All rights reserved. This repository contains proprietary software and content owned by Corvo Labs.

## 🔗 Links

- **Main Website:** [corvolabs.com](https://corvolabs.com)
- **Kinisi App:** [kinisi.corvolabs.com](https://kinisi.corvolabs.com)
- **Blog:** [corvolabs.com/blog](https://corvolabs.com/blog)
- **Projects:** [corvolabs.com/projects](https://corvolabs.com/projects)

---

© 2025 Corvo Labs. All rights reserved.
