import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, ExternalLink, Github, Calendar, Users, Clock } from 'lucide-react'
import { getProject, getAllProjects } from '@/lib/projects'
import { Project } from '@/types/project'

interface ProjectPageProps {
	params: Promise<{
		slug: string
	}>
}

export async function generateStaticParams() {
	const projects = getAllProjects()
	return projects.map((project) => ({
		slug: project.slug,
	}))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
	const { slug } = await params
	const project = await getProject(slug)
	
	if (!project) {
		return {
			title: 'Project Not Found | Corvo Labs',
		}
	}

	return {
		title: `${project.title} | Corvo Labs`,
		description: project.description,
		openGraph: {
			title: `${project.title} | Corvo Labs`,
			description: project.description,
			type: 'article',
			images: [
				{
					url: project.image,
					width: 1200,
					height: 630,
					alt: project.title,
				},
			],
		},
	}
}

import { ComingSoonPlaceholder } from '@/components/coming-soon-placeholder'

function ProjectHeader({ project }: { project: Project }) {
	const getStatusColor = (status: string) => {
		switch (status) {
			case 'active':
				return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
			case 'completed':
				return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
			case 'prototype':
				return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
			case 'archived':
				return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
			default:
				return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
		}
	}



	return (
		<div className="space-y-6">
			{/* Hero Image or Placeholder */}
			{project.image ? (
				<div className="relative aspect-video w-full overflow-hidden rounded-lg">
					<Image
						src={project.image}
						alt={project.title}
						fill
						className="object-cover"
						priority
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
					/>
					<div className="absolute top-4 left-4 flex gap-2">
						<Badge className={getStatusColor(project.status)}>
							{project.status}
						</Badge>
						{project.featured && (
							<Badge variant="secondary">Featured</Badge>
						)}
					</div>
				</div>
			) : (
				<div className="relative aspect-video w-full overflow-hidden rounded-lg">
					<ComingSoonPlaceholder />
					<div className="absolute top-4 left-4 flex gap-2">
						<Badge className={getStatusColor(project.status)}>
							{project.status}
						</Badge>
						{project.featured && (
							<Badge variant="secondary">Featured</Badge>
						)}
					</div>
				</div>
			)}

			{/* Project Title and Subtitle */}
			<div>
				<h1 className="text-4xl font-bold mb-2">{project.title}</h1>
				{project.subtitle && (
					<p className="text-xl text-muted-foreground mb-4">{project.subtitle}</p>
				)}
				<p className="text-lg text-muted-foreground">{project.description}</p>
			</div>

			{/* Categories and Technologies */}
			<div className="space-y-4">
				<div>
					<h3 className="text-sm font-medium mb-2">Categories</h3>
					<div className="flex flex-wrap gap-2">
						{project.categories?.map((category) => (
							<Badge key={category} variant="outline">
								{category}
							</Badge>
						)) || []}
					</div>
				</div>
				
				<div>
					<h3 className="text-sm font-medium mb-2">Technologies</h3>
					<div className="flex flex-wrap gap-2">
						{project.technologies?.map((tech) => (
							<Badge key={tech} variant="secondary">
								{tech}
							</Badge>
						)) || []}
					</div>
				</div>
			</div>

			{/* Project Links */}
			{project.links && Object.keys(project.links).length > 0 && (
				<div className="flex flex-wrap gap-3">
					{project.links.demo && (
						<Button asChild>
							<a 
								href={project.links.demo} 
								target="_blank" 
								rel="noopener noreferrer"
								className="flex items-center gap-2"
							>
								<ExternalLink className="h-4 w-4" />
								View Demo
							</a>
						</Button>
					)}
					{project.links.github && (
						<Button asChild variant="outline">
							<a 
								href={project.links.github} 
								target="_blank" 
								rel="noopener noreferrer"
								className="flex items-center gap-2"
							>
								<Github className="h-4 w-4" />
								View Code
							</a>
						</Button>
					)}
					{project.links.website && (
						<Button asChild variant="outline">
							<a 
								href={project.links.website} 
								target="_blank" 
								rel="noopener noreferrer"
								className="flex items-center gap-2"
							>
								<ExternalLink className="h-4 w-4" />
								Visit Website
							</a>
						</Button>
					)}
					{project.links.case_study && (
						<Button asChild variant="outline">
							<a 
								href={project.links.case_study} 
								target="_blank" 
								rel="noopener noreferrer"
								className="flex items-center gap-2"
							>
								<ExternalLink className="h-4 w-4" />
								Case Study
							</a>
						</Button>
					)}
				</div>
			)}
		</div>
	)
}

function ProjectSidebar({ project }: { project: Project }) {
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short'
		})
	}

	return (
		<div className="space-y-6">
			{/* Project Details */}
			<div className="bg-muted/50 rounded-lg p-6 space-y-4">
				<h3 className="font-semibold">Project Details</h3>
				
				<div className="space-y-3 text-sm">
					<div className="flex items-center gap-2">
						<Calendar className="h-4 w-4 text-muted-foreground" />
						<span className="text-muted-foreground">Timeline:</span>
						<span>
							{formatDate(project.startDate)}
							{project.endDate && ` - ${formatDate(project.endDate)}`}
						</span>
					</div>
					
					{project.team && project.team.length > 0 && (
						<div className="flex items-center gap-2">
							<Users className="h-4 w-4 text-muted-foreground" />
							<span className="text-muted-foreground">Team:</span>
							<span>{project.team?.join(', ')}</span>
						</div>
					)}
					
					{project.readingTime && (
						<div className="flex items-center gap-2">
							<Clock className="h-4 w-4 text-muted-foreground" />
							<span className="text-muted-foreground">Read time:</span>
							<span>{project.readingTime} min</span>
						</div>
					)}
					
					{project.client && (
						<div>
							<span className="text-muted-foreground">Client:</span>
							<span className="ml-2">{project.client}</span>
						</div>
					)}
				</div>
			</div>

			{/* Project Metrics */}
			{project.metrics && (
				<div className="bg-muted/50 rounded-lg p-6 space-y-4">
					<h3 className="font-semibold">Impact & Results</h3>
					<div className="space-y-3 text-sm">
						{project.metrics.users && (
							<div>
								<span className="text-muted-foreground">Users:</span>
								<span className="ml-2 font-medium">{project.metrics.users}</span>
							</div>
						)}
						{project.metrics.impact && (
							<div>
								<span className="text-muted-foreground">Impact:</span>
								<span className="ml-2 font-medium">{project.metrics.impact}</span>
							</div>
						)}
						{project.metrics.timeline && (
							<div>
								<span className="text-muted-foreground">Duration:</span>
								<span className="ml-2 font-medium">{project.metrics.timeline}</span>
							</div>
						)}
					</div>
				</div>
			)}

			{/* Tags */}
			{project.tags && project.tags.length > 0 && (
				<div className="bg-muted/50 rounded-lg p-6 space-y-4">
					<h3 className="font-semibold">Tags</h3>
					<div className="flex flex-wrap gap-2">
						{project.tags?.map((tag) => (
							<Badge key={tag} variant="outline" className="text-xs">
								{tag}
							</Badge>
						)) || []}
					</div>
				</div>
			)}
		</div>
	)
}

export default async function ProjectPage({ params }: ProjectPageProps) {
	const { slug } = await params
	const project = await getProject(slug)

	if (!project) {
		notFound()
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-6xl mx-auto">
				{/* Back Navigation */}
				<div className="mb-8">
					<Button asChild variant="ghost" className="mb-4">
						<Link href="/projects" className="flex items-center gap-2">
							<ArrowLeft className="h-4 w-4" />
							Back to Projects
						</Link>
					</Button>
				</div>

				{/* Main Content */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Project Content */}
					<div className="lg:col-span-2 space-y-8">
						<ProjectHeader project={project} />
						
						{project.content && (
							<>
								<Separator />
								<div className="prose prose-gray dark:prose-invert max-w-none">
									<MDXRemote 
										source={JSON.parse(project.content)}
										options={{
											mdxOptions: {
												remarkPlugins: [],
												rehypePlugins: []
											}
										}}
									/>
								</div>
							</>
						)}
					</div>

					{/* Sidebar */}
					<div className="lg:col-span-1">
						<div className="sticky top-8">
							<ProjectSidebar project={project} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
