import { Metadata } from 'next'
import { ProjectGrid } from '@/components/project-grid'
import { getAllProjects, getAllCategories, getAllTechnologies } from '@/lib/projects'

export const metadata: Metadata = {
	title: 'Projects | Corvo Labs',
	description: 'Explore AI projects and consulting work in product management, healthcare, behavior change, UX design, and AI prototyping.',
	openGraph: {
		title: 'Projects | Corvo Labs',
		description: 'Explore AI projects and consulting work in product management, healthcare, behavior change, UX design, and AI prototyping.',
		type: 'website',
	},
}

export default function ProjectsPage() {
	const projects = getAllProjects()
	const categories = getAllCategories()
	const technologies = getAllTechnologies()

	return (
		<div className="container mx-auto px-4 py-12">
			<div className="max-w-6xl mx-auto">
				{/* Page Header */}
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold mb-4">Projects</h1>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
						Explore my work in AI tools, healthcare technology, UX design, product management, 
						and behavior change applications. Each project represents a unique challenge solved 
						through innovative technology and user-centered design.
					</p>
				</div>

				{/* Project Stats */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
					<div className="text-center p-4 bg-muted/50 rounded-lg">
						<div className="text-2xl font-bold text-primary">
							{projects.length}
						</div>
						<div className="text-sm text-muted-foreground">Total Projects</div>
					</div>
					<div className="text-center p-4 bg-muted/50 rounded-lg">
						<div className="text-2xl font-bold text-primary">
							{projects.filter(p => p.status === 'active').length}
						</div>
						<div className="text-sm text-muted-foreground">Active</div>
					</div>
					<div className="text-center p-4 bg-muted/50 rounded-lg">
						<div className="text-2xl font-bold text-primary">
							{projects.filter(p => p.status === 'completed').length}
						</div>
						<div className="text-sm text-muted-foreground">Completed</div>
					</div>
					<div className="text-center p-4 bg-muted/50 rounded-lg">
						<div className="text-2xl font-bold text-primary">
							{categories.length}
						</div>
						<div className="text-sm text-muted-foreground">Categories</div>
					</div>
				</div>

				{/* Projects Grid with Filters */}
				<ProjectGrid
					projects={projects}
					categories={categories}
					technologies={technologies}
					showFilters={true}
				/>
			</div>
		</div>
	)
}
