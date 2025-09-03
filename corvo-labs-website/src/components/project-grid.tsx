'use client'

import { useState, useMemo } from 'react'
import { ProjectCard } from '@/components/project-card'
import { ProjectFilter } from '@/components/project-filter'
import { Project, ProjectCategory, ProjectStatus } from '@/types/project'

interface FilterState {
	search: string
	category: ProjectCategory | 'all'
	status: ProjectStatus | 'all'
	technology: string
}

interface ProjectGridProps {
	projects: Project[]
	categories: ProjectCategory[]
	technologies: string[]
	showFilters?: boolean
	initialFilters?: Partial<FilterState>
}

export function ProjectGrid({ 
	projects, 
	categories, 
	technologies, 
	showFilters = true,
	initialFilters = {}
}: ProjectGridProps) {
	const [filters, setFilters] = useState<FilterState>({
		search: '',
		category: 'all',
		status: 'all',
		technology: '',
		...initialFilters
	})

	const filteredProjects = useMemo(() => {
		return projects.filter(project => {
			// Search filter
			if (filters.search) {
				const searchTerm = filters.search.toLowerCase()
				const matchesSearch = 
					project.title.toLowerCase().includes(searchTerm) ||
					project.description.toLowerCase().includes(searchTerm) ||
					project.technologies?.some(tech => 
						tech.toLowerCase().includes(searchTerm)
					) ||
					project.categories?.some(category =>
						category.toLowerCase().includes(searchTerm)
					)
				
				if (!matchesSearch) return false
			}

			// Category filter
			if (filters.category !== 'all') {
				if (!project.categories?.includes(filters.category)) return false
			}

			// Status filter
			if (filters.status !== 'all') {
				if (project.status !== filters.status) return false
			}

			// Technology filter
			if (filters.technology !== 'all') {
				const hasTechnology = project.technologies?.some(tech =>
					tech.toLowerCase().includes(filters.technology.toLowerCase())
				)
				if (!hasTechnology) return false
			}

			return true
		})
	}, [projects, filters])

	const sortedProjects = useMemo(() => {
		return filteredProjects.sort((a, b) => {
			// Featured projects first
			if (a.featured && !b.featured) return -1
			if (!a.featured && b.featured) return 1
			
			// Then by priority (lower number = higher priority)
			if (a.priority && b.priority) {
				return a.priority - b.priority
			}
			if (a.priority && !b.priority) return -1
			if (!a.priority && b.priority) return 1
			
			// Finally by start date (newest first)
			return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
		})
	}, [filteredProjects])

	return (
		<div className="space-y-8">
			{showFilters && (
				<ProjectFilter
					categories={categories}
					technologies={technologies}
					onFilterChange={setFilters}
					initialFilters={initialFilters}
				/>
			)}

			{/* Results Summary */}
			<div className="flex items-center justify-between">
				<p className="text-sm text-muted-foreground">
					Showing {sortedProjects.length} of {projects.length} projects
				</p>
				
				{sortedProjects.length > 0 && (
					<div className="text-sm text-muted-foreground">
						{sortedProjects.filter(p => p.featured).length > 0 && (
							<span>{sortedProjects.filter(p => p.featured).length} featured</span>
						)}
					</div>
				)}
			</div>

			{/* Project Grid */}
			{sortedProjects.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{sortedProjects.map((project) => (
						<ProjectCard key={project.id} project={project} />
					))}
				</div>
			) : (
				<div className="text-center py-12">
					<div className="max-w-md mx-auto">
						<h3 className="text-lg font-medium mb-2">No projects found</h3>
						<p className="text-muted-foreground mb-4">
							No projects match your current filters. Try adjusting your search criteria.
						</p>
						{(filters.search || filters.category !== 'all' || filters.status !== 'all' || filters.technology) && (
							<button
								onClick={() => setFilters({
									search: '',
									category: 'all',
									status: 'all',
									technology: ''
								})}
								className="text-primary hover:underline"
							>
								Clear all filters
							</button>
						)}
					</div>
				</div>
			)}
		</div>
	)
}
