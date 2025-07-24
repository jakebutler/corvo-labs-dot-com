import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function HeroSection() {
	return (
		<section className="py-20 px-4">
			<div className="container mx-auto max-w-4xl text-center">
				<h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
					Consulting & Experiments in{' '}
					<span className="text-primary">Product, Healthcare, UX Design, and AI</span>
				</h1>
				<p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
					Corvo Labs specializes in AI projects and consulting across product management, 
					healthcare, behavior change, UX design, and AI prototyping. We transform complex 
					challenges into elegant, user-centered solutions.
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Button asChild size="lg">
						<Link href="/projects">View Our Work</Link>
					</Button>
					<Button asChild variant="outline" size="lg">
						<Link href="/about">Learn About Us</Link>
					</Button>
				</div>
			</div>
		</section>
	)
}
