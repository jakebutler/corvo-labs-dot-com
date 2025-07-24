import { CorvoIcon } from '@/components/corvo-icon'
import { CorvoNamemark } from '@/components/corvo-namemark'

export function BrandHero() {
	return (
		<section className="py-16 px-4">
			<div className="container mx-auto max-w-4xl text-center">
				<div className="flex items-center justify-center gap-6 mb-8">
					<CorvoIcon size={80} className="text-foreground" />
					<CorvoNamemark size={80} className="text-foreground" />
				</div>
			</div>
		</section>
	)
}
