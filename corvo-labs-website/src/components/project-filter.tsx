'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, X } from 'lucide-react'
import { ProjectCategory, ProjectStatus } from '@/types/project'

interface FilterState {
	search: string
	category: ProjectCategory | 'all'
	status: ProjectStatus | 'all'
	technology: string | 'all'
}

interface ProjectFilterProps {
	categories: ProjectCategory[]
	technologies: string[]
	onFilterChange: (filters: FilterState) => void
	initialFilters?: Partial<FilterState>
}

export function ProjectFilter({ 
	categories, 
	technologies, 
	onFilterChange,
	initialFilters = {}
}: ProjectFilterProps) {
	const [filters, setFilters] = useState<FilterState>({
		search: '',
		category: 'all',
		status: 'all',
		technology: 'all',
		...initialFilters
	})

	const updateFilter = (key: keyof FilterState, value: string) => {
		const newFilters = { ...filters, [key]: value }
		setFilters(newFilters)
		onFilterChange(newFilters)
	}

	const clearFilters = () => {
		const clearedFilters: FilterState = {
			search: '',
			category: 'all',
			status: 'all',
			technology: 'all'
		}
		setFilters(clearedFilters)
		onFilterChange(clearedFilters)
	}

	const hasActiveFilters = filters.search || 
		filters.category !== 'all' || 
		filters.status !== 'all' || 
		filters.technology !== 'all'

	const statusOptions: { value: ProjectStatus | 'all'; label: string }[] = [
		{ value: 'all', label: 'All Status' },
		{ value: 'active', label: 'Active' },
		{ value: 'completed', label: 'Completed' },
		{ value: 'prototype', label: 'Prototype' },
		{ value: 'archived', label: 'Archived' }
	]

	return (
		<div className="space-y-4">
			{/* Search Bar */}
			<div className="relative">
				<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
				<Input
					placeholder={`Search projects, technologies, or categories...`}
					value={filters.search}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFilter('search', e.target.value)}
					className="pl-10"
				/>
			</div>

			{/* Filter Controls */}
			<div className="flex flex-wrap gap-4">
				{/* Category Filter */}
				<div className="min-w-[200px]">
					<Select 
						value={filters.category} 
						onValueChange={(value: string) => updateFilter('category', value)}
					>
						<SelectTrigger>
							<SelectValue placeholder="Select category" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Categories</SelectItem>
							{categories.map((category) => (
								<SelectItem key={category} value={category}>
									{category}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{/* Status Filter */}
				<div className="min-w-[150px]">
					<Select 
						value={filters.status} 
						onValueChange={(value: string) => updateFilter('status', value)}
					>
						<SelectTrigger>
							<SelectValue placeholder="Select status" />
						</SelectTrigger>
						<SelectContent>
							{statusOptions.map((option) => (
								<SelectItem key={option.value} value={option.value}>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{/* Technology Filter */}
				<div className="min-w-[180px]">
					<Select 
						value={filters.technology} 
						onValueChange={(value: string) => updateFilter('technology', value)}
					>
						<SelectTrigger>
							<SelectValue placeholder="Select technology" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Technologies</SelectItem>
							{technologies.map((tech) => (
								<SelectItem key={tech} value={tech}>
									{tech}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{/* Clear Filters Button */}
				{hasActiveFilters && (
					<Button 
						variant="outline" 
						size="sm"
						onClick={clearFilters}
						className="flex items-center gap-2"
					>
						<X className="h-4 w-4" />
						Clear Filters
					</Button>
				)}
			</div>

			{/* Active Filter Tags */}
			{hasActiveFilters && (
				<div className="flex flex-wrap gap-2">
					{filters.search && (
						<Badge variant="secondary" className="flex items-center gap-1">
							Search: &quot;{filters.search}&quot;
							<button
								onClick={() => updateFilter('search', '')}
								className="ml-1 hover:text-destructive"
							>
								<X className="h-3 w-3" />
							</button>
						</Badge>
					)}
					{filters.category !== 'all' && (
						<Badge variant="secondary" className="flex items-center gap-1">
							Category: {filters.category}
							<button
								onClick={() => updateFilter('category', 'all')}
								className="ml-1 hover:text-destructive"
							>
								<X className="h-3 w-3" />
							</button>
						</Badge>
					)}
					{filters.status !== 'all' && (
						<Badge variant="secondary" className="flex items-center gap-1">
							Status: {filters.status}
							<button
								onClick={() => updateFilter('status', 'all')}
								className="ml-1 hover:text-destructive"
							>
								<X className="h-3 w-3" />
							</button>
						</Badge>
					)}
					{filters.technology && (
						<Badge variant="secondary" className="flex items-center gap-1">
							Tech: {filters.technology}
							<button
								onClick={() => updateFilter('technology', '')}
								className="ml-1 hover:text-destructive"
							>
								<X className="h-3 w-3" />
							</button>
						</Badge>
					)}
				</div>
			)}
		</div>
	)
}
