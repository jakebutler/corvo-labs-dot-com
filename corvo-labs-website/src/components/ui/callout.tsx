import React from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { InfoIcon, AlertTriangleIcon, CheckCircleIcon, LightbulbIcon } from 'lucide-react'

interface CalloutProps {
	type: 'note' | 'warning' | 'info' | 'tip'
	title: string
	children: React.ReactNode
	className?: string
}

const calloutConfig = {
	note: {
		icon: InfoIcon,
		variant: 'default' as const,
		className: 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20'
	},
	warning: {
		icon: AlertTriangleIcon,
		variant: 'destructive' as const,
		className: 'border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20'
	},
	info: {
		icon: InfoIcon,
		variant: 'default' as const,
		className: 'border-cyan-200 bg-cyan-50 dark:border-cyan-800 dark:bg-cyan-950/20'
	},
	tip: {
		icon: LightbulbIcon,
		variant: 'default' as const,
		className: 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20'
	}
}

export function Callout({ type, title, children, className = '' }: CalloutProps) {
	const config = calloutConfig[type]
	const Icon = config.icon

	return (
		<Alert variant={config.variant} className={`${config.className} ${className}`}>
			<Icon className="h-4 w-4" />
			<AlertTitle>{title}</AlertTitle>
			<AlertDescription className="text-sm">
				{children}
			</AlertDescription>
		</Alert>
	)
}