import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { Project, ProjectMetadata, ProjectCategory, ProjectStatus } from '@/types/project'

const projectsDirectory = path.join(process.cwd(), 'src/content/projects')
// const projectsJsonPath = path.join(projectsDirectory, 'projects.json')

// Calculate reading time (similar to blog utility)
function calculateReadingTime(content: string): number {
	const wordsPerMinute = 200
	const words = content.trim().split(/\s+/).length
	return Math.ceil(words / wordsPerMinute)
}

// Load all project metadata from JSON
export function getAllProjectsMetadata(): ProjectMetadata[] {
  try {
    if (!fs.existsSync(projectsDirectory)) {
      return []
    }
    const files = fs.readdirSync(projectsDirectory)
      .filter(file => file.endsWith('.json') && file !== 'projects.json')
    const metadata: ProjectMetadata[] = []
    for (const file of files) {
      try {
        const filePath = path.join(projectsDirectory, file)
        const jsonContent = fs.readFileSync(filePath, 'utf8')
        const data = JSON.parse(jsonContent)
        metadata.push(data as ProjectMetadata)
      } catch (err) {
        console.warn(`[Project Loader] Skipping malformed project file: ${file}`, err)
      }
    }
    return metadata
  } catch (error) {
    console.error('Error loading projects metadata:', error)
    return []
  }
}

// Get project metadata by slug
export function getProjectMetadata(slug: string): ProjectMetadata | null {
	const allProjects = getAllProjectsMetadata()
	return allProjects.find(project => project.slug === slug) || null
}

// Get project with full content
export async function getProject(slug: string): Promise<Project | null> {
	try {
		const metadata = getProjectMetadata(slug)
		if (!metadata) return null

		const mdxPath = path.join(projectsDirectory, `${slug}.mdx`)
		
		if (!fs.existsSync(mdxPath)) {
			// Return project with metadata only if no MDX file exists
			return {
				...metadata,
				readingTime: 1
			}
		}

		const fileContents = fs.readFileSync(mdxPath, 'utf8')
		const { content } = matter(fileContents)
		
		const mdxSource = await serialize(content, {
			mdxOptions: {
				remarkPlugins: [remarkGfm],
				rehypePlugins: [rehypeHighlight]
			}
		})

		return {
			...metadata,
			content: JSON.stringify(mdxSource),
			readingTime: calculateReadingTime(content)
		}
	} catch (error) {
		console.error(`Error loading project ${slug}:`, error)
		return null
	}
}

// Get all projects with basic metadata (for listing pages)
export function getAllProjects(): Project[] {
	const metadata = getAllProjectsMetadata()
	return metadata.map(project => ({
		...project,
		readingTime: 5 // Default reading time for projects without content
	}))
}

// Get featured projects
export function getFeaturedProjects(): Project[] {
	return getAllProjects()
		.filter(project => project.featured)
		.sort((a, b) => (a.priority || 999) - (b.priority || 999))
}

// Filter projects by category
export function getProjectsByCategory(category: ProjectCategory): Project[] {
	return getAllProjects().filter(project => 
		project.categories.includes(category)
	)
}

// Filter projects by status
export function getProjectsByStatus(status: ProjectStatus): Project[] {
	return getAllProjects().filter(project => project.status === status)
}

// Filter projects by technology
export function getProjectsByTechnology(technology: string): Project[] {
	return getAllProjects().filter(project =>
		project.technologies.some(tech => 
			tech.toLowerCase().includes(technology.toLowerCase())
		)
	)
}

// Get all unique categories
export function getAllCategories(): ProjectCategory[] {
	const projects = getAllProjects()
	const categories = new Set<ProjectCategory>()
	
	projects.forEach(project => {
		project.categories?.forEach(category => categories.add(category))
	})
	
	return Array.from(categories).sort()
}

// Get all unique technologies
export function getAllTechnologies(): string[] {
	const projects = getAllProjects()
	const technologies = new Set<string>()
	
	projects.forEach(project => {
		project.technologies?.forEach(tech => technologies.add(tech))
	})
	
	return Array.from(technologies).sort()
}

// Search projects by title, description, or technologies
export function searchProjects(query: string): Project[] {
	const searchTerm = query.toLowerCase()
	return getAllProjects().filter(project =>
		project.title.toLowerCase().includes(searchTerm) ||
		project.description.toLowerCase().includes(searchTerm) ||
		project.technologies.some(tech => 
			tech.toLowerCase().includes(searchTerm)
		) ||
		project.categories.some(category =>
			category.toLowerCase().includes(searchTerm)
		)
	)
}
