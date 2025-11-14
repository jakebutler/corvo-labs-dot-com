import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CodeBlock } from '@/components/ui/code-block'
import { Callout } from '@/components/ui/callout'
import { Tweet } from '@/components/ui/tweet-embed'
import { YouTubeEmbed } from '@/components/ui/youtube-embed'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { OptimizedBlogImage, ImageCredit } from '@/lib/image-optimization'
import { ExternalLinkIcon, InfoIcon, AlertTriangleIcon, CheckCircleIcon, LightbulbIcon } from 'lucide-react'

// Base MDX components with enhanced styling
export const mdxComponents = {
	// Headings with anchor links
	h1: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
		<h1 className="text-3xl md:text-4xl font-bold mt-8 mb-4 first:mt-0 scroll-mt-24" {...props}>
			{children}
		</h1>
	),

	h2: ({ children, id, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
		<h2 className="text-2xl md:text-3xl font-semibold mt-12 mb-6 scroll-mt-24 border-b pb-2" {...props}>
			{id && (
				<a
					href={`#${id}`}
					className="group relative -ml-6 inline-block"
					aria-label="Link to section"
				>
					<span className="absolute -left-6 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
						#
					</span>
				</a>
			)}
			{children}
		</h2>
	),

	h3: ({ children, id, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
		<h3 className="text-xl md:text-2xl font-semibold mt-8 mb-4 scroll-mt-24" {...props}>
			{id && (
				<a
					href={`#${id}`}
					className="group relative -ml-6 inline-block"
					aria-label="Link to section"
				>
					<span className="absolute -left-6 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
						#
					</span>
				</a>
			)}
			{children}
		</h3>
	),

	h4: ({ children, id, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
		<h4 className="text-lg md:text-xl font-semibold mt-6 mb-3 scroll-mt-24" {...props}>
			{id && (
				<a
					href={`#${id}`}
					className="group relative -ml-6 inline-block"
					aria-label="Link to section"
				>
					<span className="absolute -left-6 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
						#
					</span>
				</a>
			)}
			{children}
		</h4>
	),

	// Text elements
	p: ({ children, ...props }: React.HTMLProps<HTMLParagraphElement>) => (
		<p className="text-base leading-relaxed mb-6 text-foreground/90" {...props}>
			{children}
		</p>
	),

	// Lists
	ul: ({ children, ...props }: React.HTMLProps<HTMLUListElement>) => (
		<ul className="list-disc list-inside mb-6 space-y-2 text-foreground/90" {...props}>
			{children}
		</ul>
	),

	ol: ({ children, ...props }: React.HTMLProps<HTMLOListElement>) => (
		<ol className="list-decimal list-inside mb-6 space-y-2 text-foreground/90" {...props}>
			{children}
		</ol>
	),

	li: ({ children, ...props }: React.HTMLProps<HTMLLIElement>) => (
		<li className="leading-relaxed" {...props}>
			{children}
		</li>
	),

	// Links
	a: ({ href, children, ...props }: React.HTMLProps<HTMLAnchorElement>) => {
		const isExternal = href?.startsWith('http')
		const isInternal = href?.startsWith('/')

		if (isExternal) {
			return (
				<a
					href={href}
					target="_blank"
					rel="noopener noreferrer"
					className="text-primary hover:text-primary/80 underline underline-offset-4 inline-flex items-center gap-1 transition-colors"
					{...props}
				>
					{children}
					<ExternalLinkIcon className="w-3 h-3" />
				</a>
			)
		}

		if (isInternal) {
			return (
				<Link
					href={href}
					className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
					{...props}
				>
					{children}
				</Link>
			)
		}

		return (
			<a
				href={href}
				className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
				{...props}
			>
				{children}
			</a>
		)
	},

	// Blockquote
	blockquote: ({ children, ...props }: React.HTMLProps<HTMLQuoteElement>) => (
		<blockquote className="border-l-4 border-primary/20 bg-primary/5 pl-6 py-4 my-6 italic text-foreground/80 rounded-r-lg" {...props}>
			{children}
		</blockquote>
	),

	// Code blocks
	pre: ({ children, className, ...props }: React.HTMLProps<HTMLPreElement>) => {
		const match = /language-(\w+)/.exec(className || '')
		const language = match ? match[1] : ''

		return (
			<div className="relative my-6 rounded-lg overflow-hidden">
				<CodeBlock
					language={language}
					showLineNumbers={true}
					{...props}
				>
					{children}
				</CodeBlock>
			</div>
		)
	},

	// Inline code
	code: ({ children, className, ...props }: React.HTMLProps<HTMLElement>) => {
		const match = /language-(\w+)/.exec(className || '')

		if (match) {
			// This is a code block, let the pre component handle it
			return <code className={className} {...props}>{children}</code>
		}

		return (
			<code className="bg-muted px-2 py-1 rounded-md text-sm font-mono text-foreground/90" {...props}>
				{children}
			</code>
		)
	},

	// Images with optimization
	img: ({ src, alt, width, height, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
		if (!src) return null

		// If it's an external image, use regular img tag with optimization
		if (src.startsWith('http')) {
			return (
				<div className="my-6">
					<OptimizedBlogImage
						src={src}
						alt={alt || ''}
						width={width ? Number(width) : undefined}
						height={height ? Number(height) : undefined}
						context="blogPost"
						className="w-full h-auto rounded-lg shadow-sm"
					/>
				</div>
			)
		}

		// Local images
		return (
			<div className="my-6">
				<Image
					src={src}
					alt={alt || ''}
					width={width ? Number(width) : 800}
					height={height ? Number(height) : 400}
					className="w-full h-auto rounded-lg shadow-sm"
					sizes="(min-width: 1024px) 800px, 100vw"
				/>
			</div>
		)
	},

	// Tables
	table: ({ children, ...props }: React.HTMLProps<HTMLTableElement>) => (
		<div className="my-6 overflow-x-auto">
			<table className="w-full border-collapse border border-border rounded-lg" {...props}>
				{children}
			</table>
		</div>
	),

	thead: ({ children, ...props }: React.HTMLProps<HTMLTableSectionElement>) => (
		<thead className="bg-muted/50" {...props}>
			{children}
		</thead>
	),

	tbody: ({ children, ...props }: React.HTMLProps<HTMLTableSectionElement>) => (
		<tbody {...props}>
			{children}
		</tbody>
	),

	tr: ({ children, ...props }: React.HTMLProps<HTMLTableRowElement>) => (
		<tr className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors" {...props}>
			{children}
		</tr>
	),

	th: ({ children, ...props }: React.HTMLProps<HTMLTableCellElement>) => (
		<th className="border-r border-border last:border-r-0 px-4 py-3 text-left font-semibold text-sm" {...props}>
			{children}
		</th>
	),

	td: ({ children, ...props }: React.HTMLProps<HTMLTableCellElement>) => (
		<td className="border-r border-border last:border-r-0 px-4 py-3 text-sm" {...props}>
			{children}
		</td>
	),

	// Horizontal rule
	hr: ({ ...props }) => (
		<Separator className="my-8" {...props} />
	),

	// Strong/bold text
	strong: ({ children, ...props }: React.HTMLProps<HTMLElement>) => (
		<strong className="font-semibold text-foreground" {...props}>
			{children}
		</strong>
	),

	// Emphasis/italic text
	em: ({ children, ...props }: React.HTMLProps<HTMLElement>) => (
		<em className="italic" {...props}>
			{children}
		</em>
	),

	// Custom components for MDX
	// Callouts
	Note: ({ children, title = "Note" }: { children: React.ReactNode; title?: string }) => (
		<Callout type="note" title={title}>
			{children}
		</Callout>
	),

	Warning: ({ children, title = "Warning" }: { children: React.ReactNode; title?: string }) => (
		<Callout type="warning" title={title}>
			{children}
		</Callout>
	),

	Info: ({ children, title = "Info" }: { children: React.ReactNode; title?: string }) => (
		<Callout type="info" title={title}>
			{children}
		</Callout>
	),

	Tip: ({ children, title = "Tip" }: { children: React.ReactNode; title?: string }) => (
		<Callout type="tip" title={title}>
			{children}
		</Callout>
	),

	// Embeds
	Tweet: ({ id }: { id: string }) => <Tweet id={id} />,

	YouTube: ({ id, title }: { id: string; title?: string }) => (
		<YouTubeEmbed id={id} title={title} />
	),

	// Tabs
	Tabs: ({ children, ...props }: React.ComponentProps<typeof Tabs>) => (
		<Tabs className="my-6" {...props}>
			{children}
		</Tabs>
	),

	TabsContent: TabsContent,
	TabsList: TabsList,
	TabsTrigger: TabsTrigger,

	// Cards
	Card: ({ children, ...props }: React.ComponentProps<typeof Card>) => (
		<Card className="my-6" {...props}>
			{children}
		</Card>
	),

	CardHeader: CardHeader,
	CardContent: CardContent,
	CardDescription: CardDescription,
	CardTitle: CardTitle,

	// Alerts
	Alert: ({ children, ...props }: React.ComponentProps<typeof Alert>) => (
		<Alert className="my-6" {...props}>
			{children}
		</Alert>
	),

	// Badges
	Badge: ({ children, ...props }: React.ComponentProps<typeof Badge>) => (
		<Badge variant="secondary" className="mx-1" {...props}>
			{children}
		</Badge>
	),

	// Buttons (for interactive content)
	Button: ({ children, ...props }: React.ComponentProps<typeof Button>) => (
		<Button className="my-2" {...props}>
			{children}
		</Button>
	),

	// Specialized components for healthcare/AI content
	Step: ({ children, number }: { children: React.ReactNode; number: number }) => (
		<div className="flex items-start gap-4 my-6">
			<div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
				{number}
			</div>
			<div className="flex-1">
				{children}
			</div>
		</div>
	),

	Highlight: ({ children, color = "yellow" }: { children: React.ReactNode; color?: string }) => {
		const colorClasses = {
			yellow: "bg-yellow-200 dark:bg-yellow-800",
			blue: "bg-blue-200 dark:bg-blue-800",
			green: "bg-green-200 dark:bg-green-800",
			red: "bg-red-200 dark:bg-red-800",
			purple: "bg-purple-200 dark:bg-purple-800"
		}

		return (
			<span className={`px-1 py-0.5 rounded ${colorClasses[color as keyof typeof colorClasses] || colorClasses.yellow}`}>
				{children}
			</span>
		)
	},

	Definition: ({ term, children }: { term: string; children: React.ReactNode }) => (
		<div className="my-4 p-4 bg-muted/50 rounded-lg border-l-4 border-primary">
			<dt className="font-semibold text-sm text-primary mb-2">{term}</dt>
			<dd className="text-sm">{children}</dd>
		</div>
	),

	// Component for showing key takeaways
	KeyTakeaway: ({ children }: { children: React.ReactNode }) => (
		<div className="my-6 p-4 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg">
			<div className="flex items-center gap-2 mb-2">
				<LightbulbIcon className="w-5 h-5 text-primary" />
				<strong className="text-primary">Key Takeaway</strong>
			</div>
			<div className="text-sm">{children}</div>
		</div>
	),

	// Component for expert insights
	ExpertInsight: ({ children, author }: { children: React.ReactNode; author?: string }) => (
		<div className="my-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
			<div className="flex items-center gap-2 mb-3">
				<InfoIcon className="w-5 h-5 text-blue-600" />
				<strong className="text-blue-900 dark:text-blue-100">Expert Insight</strong>
			</div>
			<div className="text-blue-900 dark:text-blue-100">{children}</div>
			{author && (
				<div className="text-sm text-blue-700 dark:text-blue-300 mt-3 italic">
					— {author}
				</div>
			)}
		</div>
	)
}

export default mdxComponents