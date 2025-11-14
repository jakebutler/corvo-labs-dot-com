'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CheckIcon, CopyIcon } from 'lucide-react'

interface CodeBlockProps {
	children: React.ReactNode
	language?: string
	showLineNumbers?: boolean
	className?: string
}

export function CodeBlock({
	children,
	language = 'text',
	showLineNumbers = true,
	className = ''
}: CodeBlockProps) {
	const [copied, setCopied] = useState(false)

	const handleCopy = async () => {
		const textContent = typeof children === 'string' ? children : ''
		try {
			await navigator.clipboard.writeText(textContent)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch (err) {
			console.error('Failed to copy text: ', err)
		}
	}

	return (
		<div className={`relative rounded-lg overflow-hidden ${className}`}>
			{/* Header with language and copy button */}
			<div className="flex items-center justify-between bg-muted px-4 py-2 border-b">
				<span className="text-xs font-mono text-muted-foreground uppercase">
					{language}
				</span>
				<Button
					variant="ghost"
					size="sm"
					onClick={handleCopy}
					className="h-8 px-2 text-xs"
				>
					{copied ? (
						<CheckIcon className="w-3 h-3" />
					) : (
						<CopyIcon className="w-3 h-3" />
					)}
				</Button>
			</div>

			{/* Code content */}
			<div className="relative bg-muted/30 overflow-x-auto">
				<pre className="text-sm p-4 overflow-x-auto">
					<code className={`language-${language}`}>
						{children}
					</code>
				</pre>
			</div>
		</div>
	)
}