import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const expertiseAreas = [
	{
		title: 'Product Management',
		description: 'Strategic product development from concept to launch, focusing on user needs and market validation.',
		tags: ['Product Strategy', 'User Research', 'Market Analysis', 'Roadmapping']
	},
	{
		title: 'Healthcare Innovation',
		description: 'Transforming healthcare through technology, improving patient outcomes and clinical workflows.',
		tags: ['Digital Health', 'Clinical Systems', 'Patient Experience', 'Health Tech']
	},
	{
		title: 'UX Design',
		description: 'Creating intuitive, accessible user experiences that bridge complex technology with human needs.',
		tags: ['User Experience', 'Interface Design', 'Accessibility', 'Design Systems']
	},
	{
		title: 'Behavior Change',
		description: 'Designing systems and interventions that motivate positive behavior change and habit formation.',
		tags: ['Behavioral Psychology', 'Habit Design', 'Motivation Systems', 'User Engagement']
	},
	{
		title: 'AI & Machine Learning',
		description: 'Developing intelligent systems and AI prototypes that solve real-world problems with cutting-edge technology.',
		tags: ['Machine Learning', 'AI Prototyping', 'Data Science', 'Neural Networks']
	}
]

export function ExpertiseSection() {
	return (
		<section className="py-20 px-4 bg-muted/50">
			<div className="container mx-auto max-w-6xl">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Areas of Expertise
					</h2>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
						We bring deep expertise across multiple disciplines to deliver 
						comprehensive solutions that drive meaningful impact.
					</p>
				</div>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{expertiseAreas.map((area, index) => (
						<Card key={index} className="h-full">
							<CardHeader>
								<CardTitle className="text-xl">{area.title}</CardTitle>
								<CardDescription className="text-base">
									{area.description}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="flex flex-wrap gap-2">
									{area.tags.map((tag, tagIndex) => (
										<Badge key={tagIndex} variant="secondary">
											{tag}
										</Badge>
									))}
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	)
}
