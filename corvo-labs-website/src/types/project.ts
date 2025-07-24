export type ProjectStatus = 'active' | 'completed' | 'archived' | 'prototype'

export type ProjectCategory = 
	| 'AI Tools' 
	| 'Healthcare' 
	| 'UX Design' 
	| 'Product Management' 
	| 'Behavior Change'

export interface ProjectLinks {
	github?: string
	demo?: string
	website?: string
	case_study?: string
}

export interface ProjectMetrics {
	users?: string
	impact?: string
	timeline?: string
}

export interface ProjectMetadata {
	id: string
	slug: string
	title: string
	subtitle?: string
	description: string
	status: ProjectStatus
	categories: ProjectCategory[]
	technologies: string[]
	startDate: string
	endDate?: string
	featured: boolean
	priority?: number
	image: string
	screenshots?: string[]
	links?: ProjectLinks
	metrics?: ProjectMetrics
	team?: string[]
	client?: string
	tags?: string[]
}

export interface Project extends ProjectMetadata {
	content?: string
	readingTime?: number
}
