Perfect — here’s your full Product Requirements Document (PRD) for the Corvo Labs website based on your answers and goals:

⸻

🧠 Corvo Labs Website — PRD

✅ Overview

Corvo Labs is a personal company brand representing AI projects and consulting work in product management, healthcare, behavior change, UX design, and AI prototyping. The company website will present static content, a markdown blog, a portfolio of projects, and a newsletter opt-in by topic.

⸻

🎯 Goals & Success Criteria

Goal	Success Criteria
Establish an online presence	Homepage clearly communicates Corvo Labs’ mission and expertise
Showcase projects and apps	Visitors can browse, filter, and learn about active and past projects
Publish content easily	Owner can add blog posts by creating markdown files
Capture email subscriptions	Users can subscribe to newsletter by topic with full data ownership
Future extensibility	Easy to add subdomains (e.g. apps.corvolabs.com) later


⸻

🔧 Tech Stack

Layer	Technology	Notes
Framework	Next.js	Supports static, SSR, and hybrid apps
Blog	MDX or Markdown with next-mdx-remote	Simple, file-based blog publishing
Newsletter	MailerLite	RESTful API, groups/tags support, comprehensive analytics
CMS	TinaCMS (Git-based)	Content is managed via TinaCMS for blog and projects (MDX + JSON), with visual editing and Git versioning.
Hosting	Vercel	GitHub integration, fast CDN, automatic builds
DNS	Hostinger	Use to point corvolabs.com to Vercel
Repo	GitHub (Private)	You’ll own and control the site code


⸻

📄 Sitemap & Pages

URL	Purpose
/	Homepage — overview of Corvo Labs, featured projects, call to action
/about	Founder bio, areas of expertise, philosophy
/projects	List of current and past apps or consulting projects
/projects/[slug]	Individual project detail pages
/blog	Blog homepage (auto-generated from Markdown posts)
/blog/[slug]	Individual blog post page
/subscribe	Newsletter form with topic opt-ins
/404	Custom error page


⸻

📨 Newsletter Logic
	•	Service: MailerLite
	•	Implementation:
	•	Custom signup form using MailerLite API (https://connect.mailerlite.com/api/subscribers)
	•	Use groups to organize subscribers by topics of interest (e.g. "AI tools", "UX", "Healthcare")
	•	POST subscriber data with email, fields (name, interests), and groups array
	•	API Authentication: Bearer token in Authorization header
	•	Rate limit: 120 requests per minute
	•	Ownership:
	•	Full API access to subscriber data
	•	Comprehensive analytics and segmentation
	•	Easy migration with complete data export capabilities

⸻

🗂 Content Management

Content Type	Location	Update Workflow
Blog Posts	/content/blog/*.mdx	Add/edit Markdown files visually via TinaCMS sidebar; changes committed to Git
Projects	/content/projects/*.json (metadata) and *.mdx (content)	Add/edit project metadata (JSON) and project content (MDX) via TinaCMS visual editor; changes committed to Git
Newsletter Form	/components/SubscribeForm.tsx	Custom React form with MailerLite API integration

TinaCMS Approach:
- Editors use an in-app sidebar to visually edit content (blog, projects, pages)
- All changes are versioned in Git (PR or direct commit)
- Supports custom fields, WYSIWYG, and live preview
- No separate backend required; content stays in repo
- Non-technical users can update content without code changes

Benefits:
- Visual editing for all major content
- Git-based workflow for safety and auditability
- Extensible for future needs (custom fields, roles, etc.)

⸻

🎨 Design Notes
	•	Use uploaded SVG logo and namemark
	•	Light dark-mode toggle support (optional)
	•	Clean, minimal layout with TailwindCSS
	•	Projects and blog should have tag filters (e.g. “AI”, “Healthcare”, “UX”, etc.)

⸻

📡 Hosting & Deployment

DNS (on Hostinger)
	•	Point corvolabs.com to Vercel’s nameservers
	•	Add www.corvolabs.com → root redirect

Vercel Setup
	•	Connect GitHub repo (private)
	•	Environment variables (if needed later)
	•	Auto-deploy on main branch push

⸻

🗺 Roadmap

Milestone	Tasks
MVP Website	✅ Set up Next.js project✅ Add TailwindCSS✅ Implement /, /about, /projects, /blog routing✅ Add Buttondown newsletter form✅ Add SVG logo✅ Deploy to Vercel✅ Connect domain via Hostinger
Phase 2	⬜ Add dark mode⬜ Add filterable tags for projects⬜ Add project detail pages⬜ SEO + OG tags⬜ Set up analytics (e.g. Plausible or PostHog)
Phase 3	✅ TinaCMS fully integrated for visual, Git-based content management (blog and projects)⬜ Add landing pages for apps⬜ Add /apps.corvolabs.com subdomain


⸻

✅ Next Steps
	1.	Initialize Next.js + TailwindCSS project
	2.	Add routes and layout (Home, About, Blog, Projects)
	3.	Set up blog with next-mdx-remote or contentlayer
	4.	Integrate MailerLite newsletter API
	5.	Add logo and basic branding
	6.	Deploy to Vercel and point Hostinger DNS

⸻