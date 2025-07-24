import Image from 'next/image'
import { ComingSoonPlaceholder } from './coming-soon-placeholder'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { ExternalLink, Github, Calendar, Users } from 'lucide-react'
import { Project } from '@/types/project'

interface ProjectCardProps {
	project: Project
	showFullDescription?: boolean
}

export function ProjectCard({ project, showFullDescription = false }: ProjectCardProps) {
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

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short'
		})
	}

	return (
		<Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
			<CardHeader className="p-0">
				<div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
					{project.image ? (
						<Image
							src={project.image}
							alt={project.title}
							fill
							className="object-cover transition-transform hover:scale-105"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						/>
					) : (
						<ComingSoonPlaceholder />
					)}
					<div className="absolute top-4 left-4">
						<Badge className={getStatusColor(project.status)}>
							{project.status}
						</Badge>
					</div>
					{project.featured && (
						<div className="absolute top-4 right-4">
							<Badge variant="secondary">Featured</Badge>
						</div>
					)}
				</div>
			</CardHeader>

			<CardContent className="flex-1 p-6">
				<div className="space-y-4">
					<div>
						<h3 className="text-xl font-bold mb-2">
							<Link 
								href={`/projects/${project.slug}`}
								className="hover:text-primary transition-colors"
							>
								{project.title}
							</Link>
						</h3>
						{project.subtitle && (
							<p className="text-sm text-muted-foreground mb-2">
								{project.subtitle}
							</p>
						)}
						<p className="text-sm text-muted-foreground">
							{showFullDescription ? project.description : 
								`${project.description.substring(0, 120)}${project.description.length > 120 ? '...' : ''}`
							}
						</p>
					</div>

					<div className="flex flex-wrap gap-2">
						{project.categories.map((category) => (
							<Badge key={category} variant="outline" className="text-xs">
								{category}
							</Badge>
						))}
					</div>

					<div className="flex flex-wrap gap-1">
						{project.technologies.slice(0, 4).map((tech) => (
							<Badge key={tech} variant="secondary" className="text-xs">
								{tech}
							</Badge>
						))}
						{project.technologies.length > 4 && (
							<Badge variant="secondary" className="text-xs">
								+{project.technologies.length - 4} more
							</Badge>
						)}
					</div>

					<div className="flex items-center gap-4 text-xs text-muted-foreground">
						<div className="flex items-center gap-1">
							<Calendar className="h-3 w-3" />
							<span>
								{formatDate(project.startDate)}
								{project.endDate && ` - ${formatDate(project.endDate)}`}
							</span>
						</div>
						{project.team && project.team.length > 0 && (
							<div className="flex items-center gap-1">
								<Users className="h-3 w-3" />
								<span>{project.team.join(', ')}</span>
							</div>
						)}
					</div>

					{project.metrics && (
						<div className="grid grid-cols-1 gap-2 text-xs">
							{project.metrics.users && (
								<div>
									<span className="font-medium">Users: </span>
									<span className="text-muted-foreground">{project.metrics.users}</span>
								</div>
							)}
							{project.metrics.impact && (
								<div>
									<span className="font-medium">Impact: </span>
									<span className="text-muted-foreground">{project.metrics.impact}</span>
								</div>
							)}
						</div>
					)}
				</div>
			</CardContent>

			<CardFooter className="p-6 pt-0 flex gap-2">
				<Button asChild size="sm" className="flex-1">
					<Link href={`/projects/${project.slug}`}>
						View Details
					</Link>
				</Button>
				
				{project.links?.demo && (
					<Button asChild variant="outline" size="sm">
						<a 
							href={project.links.demo} 
							target="_blank" 
							rel="noopener noreferrer"
							className="flex items-center gap-1"
						>
							<ExternalLink className="h-3 w-3" />
							Demo
						</a>
					</Button>
				)}
				
				{project.links?.github && (
					<Button asChild variant="outline" size="sm">
						<a 
							href={project.links.github} 
							target="_blank" 
							rel="noopener noreferrer"
							className="flex items-center gap-1"
						>
							<Github className="h-3 w-3" />
							Code
						</a>
					</Button>
				)}
			</CardFooter>
		</Card>
	)
}
