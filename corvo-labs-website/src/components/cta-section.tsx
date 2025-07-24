import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

export function CtaSection() {
	return (
		<section className="py-20 px-4 bg-muted/50">
			<div className="container mx-auto max-w-4xl text-center">
				<h2 className="text-3xl font-bold mb-4">Ready to Transform Your Ideas?</h2>
				<p className="text-lg text-muted-foreground mb-6">
					Let&apos;s collaborate on your next breakthrough project. From concept to deployment, 
					I&apos;ll help you build solutions that make a real impact.
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
					<Button asChild size="lg">
						<Link href="/about">Get to Know Us</Link>
					</Button>
					<Button asChild variant="outline" size="lg">
						<Link href="/subscribe">Stay Updated</Link>
					</Button>
				</div>
				<Separator className="my-8" />
				<div className="grid md:grid-cols-3 gap-8 text-sm text-muted-foreground">
					<div>
						<h3 className="font-semibold text-foreground mb-2">Consulting</h3>
						<p>Strategic guidance for AI implementation and product development</p>
					</div>
					<div>
						<h3 className="font-semibold text-foreground mb-2">Prototyping</h3>
						<p>Rapid development of AI prototypes and proof-of-concepts</p>
					</div>
					<div>
						<h3 className="font-semibold text-foreground mb-2">Design</h3>
						<p>User-centered design for complex technical products</p>
					</div>
				</div>
			</div>
		</section>
	)
}
