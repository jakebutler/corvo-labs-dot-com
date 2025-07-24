import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ExternalLink, Github } from 'lucide-react'
import { getFeaturedProjects } from '@/lib/projects'

export function FeaturedProjects() {
	const projects = getFeaturedProjects().slice(0, 3) // Show top 3 featured projects

	return (
		<section className="py-20 px-4">
			<div className="container mx-auto max-w-6xl">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Featured Projects
					</h2>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
						Explore some of our recent work that demonstrates our approach 
						to solving complex challenges with innovative solutions.
					</p>
				</div>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
					{projects.map((project) => {
						const getStatusVariant = (status: string) => {
							switch (status) {
								case 'active': return 'default'
								case 'completed': return 'secondary'
								case 'prototype': return 'outline'
								default: return 'outline'
							}
						}

						return (
							<Card key={project.id} className="h-full flex flex-col">
								<CardHeader>
									<div className="flex items-start justify-between">
										<div>
											<CardTitle className="text-xl mb-2">{project.title}</CardTitle>
											<Badge variant={getStatusVariant(project.status)}>
												{project.status}
											</Badge>
										</div>
									</div>
								</CardHeader>
								<CardContent className="flex-1">
									<CardDescription className="mb-4">
										{project.description}
									</CardDescription>
									<div className="flex flex-wrap gap-2">
										{project.technologies.slice(0, 3).map((tech) => (
											<Badge key={tech} variant="outline" className="text-xs">
												{tech}
											</Badge>
										))}
										{project.technologies.length > 3 && (
											<Badge variant="outline" className="text-xs">
												+{project.technologies.length - 3}
											</Badge>
										)}
									</div>
								</CardContent>
								<CardFooter className="flex gap-2">
									<Button asChild size="sm" className="flex-1">
										<Link href={`/projects/${project.slug}`}>Learn More</Link>
									</Button>
									{project.links?.demo && (
										<Button asChild variant="outline" size="sm">
											<a href={project.links.demo} target="_blank" rel="noopener noreferrer">
												<ExternalLink className="h-3 w-3" />
											</a>
										</Button>
									)}
									{project.links?.github && (
										<Button asChild variant="outline" size="sm">
											<a href={project.links.github} target="_blank" rel="noopener noreferrer">
												<Github className="h-3 w-3" />
											</a>
										</Button>
									)}
								</CardFooter>
							</Card>
						)
					})}
				</div>
				<div className="text-center">
					<Button asChild size="lg">
						<Link href="/projects">View All Projects</Link>
					</Button>
				</div>
			</div>
		</section>
	)
}
