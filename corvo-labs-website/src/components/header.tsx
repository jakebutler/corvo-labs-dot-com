import Link from 'next/link'
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu'
import { CorvoNamemark } from '@/components/corvo-namemark'

export function Header() {
	return (
		<header className="border-b">
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					<Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
						<CorvoNamemark size={40} className="text-foreground" />
					</Link>
					<NavigationMenu>
						<NavigationMenuList className="flex space-x-6">
							<NavigationMenuItem>
								<Link href="/" className="hover:text-primary transition-colors">
									Home
								</Link>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<Link href="/about" className="hover:text-primary transition-colors">
									About
								</Link>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<Link href="/projects" className="hover:text-primary transition-colors">
									Projects
								</Link>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<Link href="/blog" className="hover:text-primary transition-colors">
									Blog
								</Link>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<Link href="/subscribe" className="hover:text-primary transition-colors">
									Subscribe
								</Link>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</div>
			</div>
		</header>
	)
}
