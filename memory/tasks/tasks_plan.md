# Task Backlog and Project Progress Tracker - Corvo Labs Website

## Backlog:

### [Project Setup & Foundation]:
- [x] Initialize Next.js + TailwindCSS Project
    -- Context: Set up the foundational Next.js project with TypeScript, TailwindCSS, and proper project structure following custom rules
    -- Importance: High
    -- Dependencies: PRD completed, project rules established
    -- Technical Details: App Router, TypeScript strict mode, Shadcn UI integration, proper directory structure
    -- Status: COMPLETED - Full Next.js 15 project with TypeScript, TailwindCSS, and proper structure

- [x] Implement Core Layout and Navigation
    -- Context: Create the main layout component, header, footer, and navigation structure
    -- Importance: High  
    -- Dependencies: Next.js project initialized
    -- Technical Details: Server Components, responsive design, accessibility standards
    -- Status: COMPLETED - Header, footer, navigation with responsive design and dark/light mode

- [x] Set up Blog Infrastructure with MDX
    -- Context: Implement blog system using next-mdx-remote or contentlayer for markdown posts
    -- Importance: High
    -- Dependencies: Core layout completed
    -- Technical Details: Dynamic routing, metadata generation, syntax highlighting
    -- Status: COMPLETED - Full MDX blog system with dynamic routing and syntax highlighting

### [Content Pages Implementation]:
- [x] Homepage with Featured Projects
    -- Context: Create homepage showcasing Corvo Labs mission and featured projects
    -- Importance: High
    -- Dependencies: Core layout, project data structure
    -- Technical Details: Server Components, optimized images, responsive grid
    -- Status: COMPLETED - Homepage with hero section, featured projects, and newsletter signup

- [x] About Page
    -- Context: Founder bio, expertise areas, philosophy page
    -- Importance: Medium
    -- Dependencies: Core layout
    -- Technical Details: Static content, responsive typography
    -- Status: COMPLETED - About page with founder bio and expertise areas

- [x] Projects Listing and Detail Pages
    -- Context: Dynamic project showcase with filtering and individual project pages
    -- Importance: High
    -- Dependencies: Core layout, project data structure
    -- Technical Details: Dynamic routing, filtering logic, project metadata
    -- Status: COMPLETED - Full projects system with filtering, search, and individual project pages

### [Content Management System - TinaCMS]:
- [x] TinaCMS Implementation
    -- Context: TinaCMS is now fully integrated for visual, Git-based content management of blog posts (MDX) and projects (JSON metadata + MDX content)
    -- Importance: High
    -- Dependencies: Blog and projects file structure established
    -- Technical Details: TinaCMS setup complete; Next.js integration; content model mapping for blog and projects; GitHub auth; sidebar editing; custom fields for MDX and JSON; visual editing and Git commit workflow
    -- Status: COMPLETED - TinaCMS live; project metadata now managed as individual JSON files per project (not projects.json); editors can add/edit metadata and content visually; all changes versioned in Git

### [Deployment & Domain]:
- [ ] Deploy to Vercel and Configure Domain
    -- Context: Deploy site to Vercel and configure corvolabs.com domain via Hostinger
    -- Importance: High
    -- Dependencies: MVP features completed
    -- Technical Details: Vercel deployment, DNS configuration, SSL setup

## Current Status:
* Project foundation established with heavy-spec ruleset from rulebook-ai
* Product requirements document completed and stored in memory/docs/
* Custom development rules and best practices defined
* **MAJOR MILESTONE: Core website functionality COMPLETED**
* Next.js 15 project fully implemented with TypeScript and TailwindCSS
* Complete blog system with MDX support and syntax highlighting
* Full projects showcase system with filtering and individual project pages
* MailerLite newsletter integration with topic-based subscriptions
* Professional branding with SVG logo components (just completed migration from PNG)
* Responsive design with dark/light mode support
* All core pages implemented: Homepage, About, Blog, Projects, Subscribe/Unsubscribe

## Known Issues:
* Need to ensure all dependencies align with TypeScript strict mode requirements
* Must follow kebab-case naming conventions for files and directories per custom rules
* Need to implement proper error boundaries and accessibility standards from the start

## Dependencies Map:
* Project Setup → Core Layout → Content Pages
* Core Layout → Blog Infrastructure → Content Creation
* All MVP features → Deployment & Domain Configuration
