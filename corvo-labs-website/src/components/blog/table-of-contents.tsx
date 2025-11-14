'use client'

import { useState, useEffect } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TOCItem } from '@/lib/blog-enhanced'

interface TableOfContentsProps {
	items: TOCItem[]
	className?: string
	sticky?: boolean
	showProgress?: boolean
}

interface TOCItemProps {
	item: TOCItem
	level: number
	onItemClick?: (id: string) => void
	activeId?: string
}

function TOCItemComponent({ item, level, onItemClick, activeId }: TOCItemProps) {
	const [isActive, setIsActive] = useState(activeId === item.id)

	useEffect(() => {
		setIsActive(activeId === item.id)
	}, [activeId, item.id])

	const handleClick = () => {
		const element = document.getElementById(item.id)
		if (element) {
			element.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			})
		}
		onItemClick?.(item.id)
	}

	const indentClass = `pl-${Math.min(level * 4, 12)}`
	const isActiveClass = isActive
		? 'text-primary font-medium border-l-2 border-primary bg-primary/5'
		: 'text-muted-foreground hover:text-foreground hover:bg-muted/50'

	return (
		<div key={item.id}>
			<Button
				variant="ghost"
				className={`w-full justify-start text-left ${indentClass} ${isActiveClass} transition-all duration-200`}
				onClick={handleClick}
				size="sm"
			>
				<span className="truncate">{item.title}</span>
			</Button>
			{item.children && item.children.length > 0 && (
				<div className="ml-2">
					{item.children.map(child => (
						<TOCItemComponent
							key={child.id}
							item={child}
							level={level + 1}
							onItemClick={onItemClick}
							activeId={activeId}
						/>
					))}
				</div>
			)}
		</div>
	)
}

export function TableOfContents({
	items,
	className = '',
	sticky = true,
	showProgress = false
}: TableOfContentsProps) {
	const [activeId, setActiveId] = useState<string>('')
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		const observerOptions = {
			rootMargin: '-20% 0% -80% 0%',
			threshold: 0
		}

		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					setActiveId(entry.target.id)
				}
			})
		}, observerOptions)

		// Observe all heading elements
		items.forEach(item => {
			const element = document.getElementById(item.id)
			if (element) {
				observer.observe(element)
			}
			// Also observe children
			if (item.children) {
				item.children.forEach(child => {
					const childElement = document.getElementById(child.id)
					if (childElement) {
						observer.observe(childElement)
					}
				})
			}
		})

		return () => {
			observer.disconnect()
		}
	}, [items])

	useEffect(() => {
		if (!showProgress) return

		const updateProgress = () => {
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop
			const scrollHeight = document.documentElement.scrollHeight
			const clientHeight = document.documentElement.clientHeight

			const scrolled = scrollTop / (scrollHeight - clientHeight)
			const percentage = Math.min(scrolled * 100, 100)

			setProgress(percentage)
		}

		const throttledUpdate = () => {
			requestAnimationFrame(updateProgress)
		}

		window.addEventListener('scroll', throttledUpdate, { passive: true })
		updateProgress()

		return () => {
			window.removeEventListener('scroll', throttledUpdate)
		}
	}, [showProgress])

	const containerClasses = sticky
		? 'sticky top-24 h-fit max-h-[calc(100vh-8rem)]'
		: 'h-full'

	if (!items || items.length === 0) {
		return null
	}

	return (
		<div className={`${containerClasses} ${className}`}>
			<div className="bg-background border rounded-lg p-4">
				<div className="flex items-center justify-between mb-4">
					<h3 className="font-semibold text-sm">Contents</h3>
					{showProgress && (
						<Badge variant="secondary" className="text-xs">
							{Math.round(progress)}%
						</Badge>
					)}
				</div>

				<ScrollArea className="h-[300px] pr-2">
					<nav className="space-y-1">
						{items.map(item => (
							<TOCItemComponent
								key={item.id}
								item={item}
								level={0}
								onItemClick={setActiveId}
								activeId={activeId}
							/>
						))}
					</nav>
				</ScrollArea>

				{/* Quick navigation */}
				<div className="mt-4 pt-4 border-t">
					<Button
						variant="outline"
						size="sm"
						className="w-full"
						onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
					>
						Back to Top
					</Button>
				</div>
			</div>
		</div>
	)
}

// Collapsible TOC for mobile
export function CollapsibleTableOfContents({ items }: { items: TOCItem[] }) {
	const [isOpen, setIsOpen] = useState(false)
	const [activeId, setActiveId] = useState<string>('')

	useEffect(() => {
		const observerOptions = {
			rootMargin: '-20% 0% -80% 0%',
			threshold: 0
		}

		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					setActiveId(entry.target.id)
				}
			})
		}, observerOptions)

		items.forEach(item => {
			const element = document.getElementById(item.id)
			if (element) {
				observer.observe(element)
			}
			if (item.children) {
				item.children.forEach(child => {
					const childElement = document.getElementById(child.id)
					if (childElement) {
						observer.observe(childElement)
					}
				})
			}
		})

		return () => {
			observer.disconnect()
		}
	}, [items])

	if (!items || items.length === 0) {
		return null
	}

	const activeItem = items.find(item => item.id === activeId) ||
		items.find(item => item.children?.some(child => child.id === activeId))

	return (
		<div className="md:hidden">
			<Button
				variant="outline"
				className="w-full justify-between"
				onClick={() => setIsOpen(!isOpen)}
			>
				<span className="truncate">
					{activeItem ? activeItem.title : 'Table of Contents'}
				</span>
				<svg
					className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
				</svg>
			</Button>

			{isOpen && (
				<div className="mt-2 bg-background border rounded-lg p-3">
					<nav className="space-y-1">
						{items.map(item => (
							<TOCItemComponent
								key={item.id}
								item={item}
								level={0}
								onItemClick={() => setIsOpen(false)}
								activeId={activeId}
							/>
						))}
					</nav>
				</div>
			)}
		</div>
	)
}