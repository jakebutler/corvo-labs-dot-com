# Project Data Structure - Corvo Labs

## Overview
Projects use a hybrid JSON + MDX system for maximum flexibility:
- **JSON metadata** for structured data (filtering, sorting, display)
- **MDX content** for rich project descriptions, case studies, and code examples

## File Structure
```
src/content/projects/
├── projects.json          # All project metadata
├── project-slug-1.mdx     # Rich content for project 1
├── project-slug-2.mdx     # Rich content for project 2
└── images/
    ├── project-1-hero.jpg
    ├── project-1-screenshot.png
    └── project-2-demo.gif
```

## JSON Metadata Structure

### Complete Project Object
```json
{
  "id": "unique-project-id",
  "slug": "url-friendly-project-name",
  "title": "Project Display Name",
  "subtitle": "Brief one-line description",
  "description": "Detailed 2-3 sentence overview for cards and SEO",
  "status": "active" | "completed" | "archived" | "prototype",
  "categories": ["AI Tools", "Healthcare", "UX Design", "Product Management", "Behavior Change"],
  "technologies": ["Next.js", "TypeScript", "OpenAI", "Python", "React", "TailwindCSS"],
  "startDate": "2024-01-15",
  "endDate": "2024-06-30",
  "featured": true,
  "priority": 1,
  "image": "/images/projects/project-hero.jpg",
  "screenshots": [
    "/images/projects/screenshot-1.png",
    "/images/projects/screenshot-2.png"
  ],
  "links": {
    "github": "https://github.com/username/repo",
    "demo": "https://demo.example.com",
    "website": "https://project.example.com",
    "case_study": "https://medium.com/@author/case-study"
  },
  "metrics": {
    "users": "1,200+",
    "impact": "30% improvement in user engagement",
    "timeline": "6 months"
  },
  "team": ["Solo Project"] | ["Jake Butler", "Collaborator Name"],
  "client": "Internal" | "Client Name",
  "tags": ["MVP", "Research", "Production", "Open Source"]
}
```

### Required Fields
- `id`, `slug`, `title`, `description`, `status`, `categories`, `technologies`, `startDate`, `featured`, `image`

### Optional Fields
- `subtitle`, `endDate`, `priority`, `screenshots`, `links`, `metrics`, `team`, `client`, `tags`

## Status Options
- **active**: Currently working on
- **completed**: Finished and deployed
- **archived**: No longer maintained
- **prototype**: Proof of concept or early stage

## Category Options
- **AI Tools**: AI-powered applications and utilities
- **Healthcare**: Health and medical technology projects
- **UX Design**: User experience and interface design work
- **Product Management**: Product strategy and management projects
- **Behavior Change**: Psychology and behavior modification apps

## Technology Tags
Common technologies to choose from:
- **Frontend**: React, Next.js, TypeScript, TailwindCSS, Svelte
- **Backend**: Node.js, Python, FastAPI, Supabase, Firebase
- **AI/ML**: OpenAI, Anthropic, TensorFlow, PyTorch, Langchain
- **Mobile**: React Native, Flutter, Swift, Kotlin
- **Design**: Figma, Adobe XD, Sketch, Principle
- **Data**: PostgreSQL, MongoDB, Redis, Analytics

## MDX Content Structure

### Frontmatter (Optional - metadata is in JSON)
```yaml
---
title: "Project Title"
description: "SEO description override"
---
```

### Content Sections
```markdown
# Project Overview
Brief introduction and context.

## Problem Statement
What problem does this solve?

## Solution Approach
How did you approach solving it?

## Key Features
- Feature 1: Description
- Feature 2: Description
- Feature 3: Description

## Technical Implementation
### Architecture
Describe the system architecture.

### Code Examples
```typescript
// Example code snippets
const example = () => {
  return 'Hello World'
}
```

## Results & Impact
Quantifiable outcomes and user feedback.

## Lessons Learned
Key takeaways and insights.

## Future Roadmap
What's next for this project?
```

## Example Project Entry

### projects.json
```json
{
  "ai-writing-assistant": {
    "id": "ai-writing-assistant",
    "slug": "ai-writing-assistant",
    "title": "AI Writing Assistant",
    "subtitle": "Intelligent content creation tool",
    "description": "A Next.js application that helps users create high-quality content using OpenAI's GPT models with custom prompts and templates.",
    "status": "completed",
    "categories": ["AI Tools", "Product Management"],
    "technologies": ["Next.js", "TypeScript", "OpenAI", "TailwindCSS", "Supabase"],
    "startDate": "2024-01-15",
    "endDate": "2024-03-30",
    "featured": true,
    "priority": 1,
    "image": "/images/projects/ai-writing-hero.jpg",
    "screenshots": [
      "/images/projects/ai-writing-dashboard.png",
      "/images/projects/ai-writing-editor.png"
    ],
    "links": {
      "github": "https://github.com/username/ai-writing-assistant",
      "demo": "https://ai-writing-demo.vercel.app"
    },
    "metrics": {
      "users": "500+",
      "impact": "50% faster content creation",
      "timeline": "3 months"
    },
    "team": ["Solo Project"],
    "client": "Internal",
    "tags": ["MVP", "Production", "Open Source"]
  }
}
```

### ai-writing-assistant.mdx
```markdown
# AI Writing Assistant

An intelligent content creation platform that leverages OpenAI's GPT models to help users create high-quality content with custom prompts and templates.

## Problem Statement

Content creators spend hours crafting blog posts, marketing copy, and documentation. The process is time-consuming and often results in inconsistent quality across different pieces.

## Solution Approach

Built a Next.js application with a clean, intuitive interface that provides:
- Pre-built content templates
- Custom prompt engineering
- Real-time AI-powered suggestions
- Content optimization recommendations

## Key Features

- **Template Library**: 20+ pre-built templates for different content types
- **Custom Prompts**: Users can create and save their own prompt templates
- **Real-time Preview**: Live preview of generated content with editing capabilities
- **Export Options**: Multiple format exports (Markdown, HTML, PDF)
- **Usage Analytics**: Track content performance and optimization suggestions

## Technical Implementation

### Architecture
- **Frontend**: Next.js 14 with App Router and TypeScript
- **Styling**: TailwindCSS with custom design system
- **AI Integration**: OpenAI GPT-4 API with custom prompt engineering
- **Database**: Supabase for user data and template storage
- **Authentication**: Supabase Auth with social login options

### Code Example
```typescript
const generateContent = async (prompt: string, template: Template) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: template.systemPrompt },
      { role: 'user', content: prompt }
    ],
    max_tokens: 1500,
    temperature: 0.7
  })
  
  return response.choices[0].message.content
}
```

## Results & Impact

- **500+ active users** within first month of launch
- **50% reduction** in content creation time reported by users
- **4.8/5 average rating** from user feedback
- **Open sourced** with 100+ GitHub stars

## Lessons Learned

- Prompt engineering is crucial for consistent AI output quality
- User feedback loops significantly improve template effectiveness
- Simple, clean UI drives higher user adoption than feature-heavy interfaces

## Future Roadmap

- Integration with popular CMS platforms (WordPress, Notion)
- Advanced analytics and A/B testing for content performance
- Team collaboration features and shared template libraries
```

## Getting Started

1. Create your project entries in `projects.json`
2. Write detailed MDX content files for each project
3. Add project images to `src/content/projects/images/`
4. Test the content structure with the development server

This structure provides maximum flexibility while maintaining consistency across all project presentations.
