export function Footer() {
	return (
		<footer className="border-t mt-auto">
			<div className="container mx-auto px-4 py-8">
				<div className="flex flex-col md:flex-row justify-between items-center">
					<div className="mb-4 md:mb-0">
						<p className="text-sm text-muted-foreground">
							© 2025 Corvo Labs. All rights reserved.
						</p>
					</div>
					<div className="flex space-x-6">
						<a 
							href="mailto:contact@corvolabs.com" 
							className="text-sm text-muted-foreground hover:text-primary transition-colors"
						>
							Contact
						</a>
						<a 
							href="/privacy" 
							className="text-sm text-muted-foreground hover:text-primary transition-colors"
						>
							Privacy
						</a>
						<a 
							href="/terms" 
							className="text-sm text-muted-foreground hover:text-primary transition-colors"
						>
							Terms
						</a>
					</div>
				</div>
			</div>
		</footer>
	)
}
