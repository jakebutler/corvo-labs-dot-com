import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata = {
	title: 'About - Corvo Labs',
	description: 'Learn about the founder and philosophy behind Corvo Labs\' approach to AI projects and consulting.'
}

const timeline = [
	{
		title: 'Corvo Labs Founder',
		description: 'Leading AI projects and consulting across healthcare, product management, and UX design initiatives.'
	},
	{
		title: 'Head of Product - Form Health',
		description: 'Drove product strategy and user experience for internal (provider, operations, and revenue cycle teams) and external (patients) users at nationwide telehealth medical weight loss practice.'
	},
	{
		title: 'Product Lead, Director of Strategy - Recover, Rally Health/Optum Health',
		description: 'Co-led product of Rally Recover, Optum Health\'s expansion into the value-based care orthopedic surgery market.'
	},
	{
		title: 'Product Lead - Walkadoo, MeYou Health',
		description: '0-10 physical activity intervention product, sold to employer wellness programs. Validated program efficacy with a randomized controlled trial (RCT).'
	},
	{
		title: 'Founding Product Lead - Life360',
		description: 'First product hire, part of founding team. Developed initial PMF and product processes.'
	}
]

const philosophyPoints = [
	{
		title: 'Human-Centered AI',
		description: 'Technology should amplify human capabilities, not replace human judgment. We design AI systems that always have humans in the loop.'
	},
	{
		title: 'Evidence-Based Design',
		description: 'Every design decision is grounded in user research, behavioral psychology, and measurable outcomes. We validate assumptions through testing and iteration.'
	},
	{
		title: 'Ethical Innovation',
		description: 'We prioritize transparency, fairness, and privacy in all our AI implementations. Technology should benefit society while respecting individual rights.'
	},
	{
		title: 'Iterative Excellence',
		description: 'Great products emerge through continuous refinement. We embrace rapid prototyping, user feedback, and data-driven improvements.'
	}
]

export default function AboutPage() {
	return (
		<div className="min-h-screen py-12">
			{/* Hero Section */}
			<section className="py-12 px-4">
				<div className="container mx-auto max-w-4xl text-center">
					<h1 className="text-4xl md:text-5xl font-bold mb-6">
						About Corvo Labs
					</h1>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
						We bridge the gap between cutting-edge AI technology and real-world human needs, 
						creating solutions that are both innovative and deeply practical.
					</p>
				</div>
			</section>

			{/* Founder Section */}
			<section className="py-12 px-4 bg-muted/50">
				<div className="container mx-auto max-w-6xl">
					<div className="grid md:grid-cols-2 gap-12 items-center">
						<div>
							<h2 className="text-3xl font-bold mb-6">Meet the Founder</h2>
							<p className="text-lg text-muted-foreground mb-6 leading-relaxed">
								With over a decade of experience spanning AI development, product management, 
								and healthcare innovation, I founded Corvo Labs to tackle complex challenges 
								at the intersection of technology and human behavior.
							</p>
							<p className="text-lg text-muted-foreground mb-6 leading-relaxed">
								My background combines deep expertise in product development, user experience + behavior change design 
								and AI with domain expertise in healthcare. This unique 
								perspective enables me to create AI solutions that are not just technically 
								sound, but genuinely useful, adopted by real users, and safe to use in regulated industries.
							</p>
							<div className="flex flex-wrap gap-2 mb-6">
								<Badge variant="secondary">AI product development & prototyping</Badge>
								<Badge variant="secondary">Product Strategy</Badge>
								<Badge variant="secondary">Healthcare Tech</Badge>
								<Badge variant="secondary">UX Research</Badge>
								<Badge variant="secondary">Behavioral Design</Badge>
							</div>
							<Button asChild>
								<Link href="/projects">View My Work</Link>
							</Button>
						</div>
						<div className="space-y-4">
							{timeline.map((item, index) => (
								<Card key={index}>
									<CardHeader className="pb-3">
										<CardTitle className="text-lg">{item.title}</CardTitle>
									</CardHeader>
									<CardContent>
										<CardDescription className="text-base">
											{item.description}
										</CardDescription>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Philosophy Section */}
			<section className="py-12 px-4">
				<div className="container mx-auto max-w-6xl">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							Our Philosophy
						</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							The principles that guide our approach to AI development and consulting
						</p>
					</div>
					<div className="grid md:grid-cols-2 gap-6">
						{philosophyPoints.map((point, index) => (
							<Card key={index} className="h-full">
								<CardHeader>
									<CardTitle className="text-xl">{point.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<CardDescription className="text-base leading-relaxed">
										{point.description}
									</CardDescription>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Approach Section */}
			<section className="py-12 px-4 bg-muted/50">
				<div className="container mx-auto max-w-4xl">
					<div className="text-center mb-8">
						<h2 className="text-3xl font-bold mb-4">How We Work</h2>
						<p className="text-lg text-muted-foreground">
							Our collaborative approach ensures solutions that truly fit your needs
						</p>
					</div>
					<div className="grid md:grid-cols-3 gap-8">
						<div className="text-center">
							<div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl mx-auto mb-4">
								1
							</div>
							<h3 className="text-xl font-semibold mb-2">Discover</h3>
							<p className="text-muted-foreground">
								We start by deeply understanding your challenges, users, and business context through research and stakeholder interviews.
							</p>
						</div>
						<div className="text-center">
							<div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl mx-auto mb-4">
								2
							</div>
							<h3 className="text-xl font-semibold mb-2">Design</h3>
							<p className="text-muted-foreground">
								We prototype and test solutions iteratively, ensuring they meet real user needs before full development.
							</p>
						</div>
						<div className="text-center">
							<div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl mx-auto mb-4">
								3
							</div>
							<h3 className="text-xl font-semibold mb-2">Deliver</h3>
							<p className="text-muted-foreground">
								We build robust, scalable solutions with comprehensive documentation and ongoing support for successful adoption.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-12 px-4">
				<div className="container mx-auto max-w-4xl text-center">
					<h2 className="text-3xl font-bold mb-4">Ready to Collaborate?</h2>
					<p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
						Whether you&apos;re looking to explore AI opportunities, improve user experience, 
						or develop innovative healthcare solutions, let&apos;s discuss how we can work together.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button asChild size="lg">
							<Link href="/projects">See Our Work</Link>
						</Button>
						<Button asChild variant="outline" size="lg">
							<Link href="/subscribe">Stay Connected</Link>
						</Button>
					</div>
				</div>
			</section>
		</div>
	)
}
