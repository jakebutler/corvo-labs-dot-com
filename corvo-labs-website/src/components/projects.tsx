import React from 'react'
import Link from 'next/link'
import { getAllProjects } from '@/lib/projects'
import { Project } from '@/types/project'

interface ProjectsProps {
  data?: {
    title?: string
    subtitle?: string
  }
}

export function Projects({ data }: ProjectsProps) {
  // Get all projects and filter for specific ones in order
  const allProjects = getAllProjects()
  const projectSlugs = ['kinisi', 'calpal-nutrition-calculator', 'cerebro']
  
  const featuredProjects = projectSlugs
    .map(slug => allProjects.find(p => p.slug === slug))
    .filter((project): project is Project => project !== undefined)
  
  // Truncate description to approximately 100 characters
  const truncateDescription = (description: string, maxLength: number = 100) => {
    if (description.length <= maxLength) return description
    return description.slice(0, maxLength).trim() + '...'
  }

  const projectsData = {
    title: data?.title || "Featured Projects",
    subtitle: data?.subtitle || "We partner with forward-thinking organizations to create AI solutions that drive meaningful impact. Here are some of our recent projects.",
    projects: featuredProjects,
    ctaText: "See all projects"
  }

  return (
    <section id="projects" className="w-full py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tighter">
            {projectsData.title}
          </h2>
          <p className="text-lg text-gray-700">
            {projectsData.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.projects.map((project) => (
            <div
              key={project.slug}
              className="bg-white p-8 shadow-sm hover:shadow-md transition-shadow rounded-none"
            >
              <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
              <p className="text-gray-700 mb-6">{truncateDescription(project.description)}</p>
              <a
                href={`/projects/${project.slug}`}
                className="text-gray-900 font-medium hover:underline inline-flex items-center"
              >
                Learn more
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/projects"
            className="inline-block px-8 py-3 border-2 border-gray-900 text-gray-900 font-medium hover:bg-gray-900 hover:text-white transition-colors rounded-none"
          >
            See all projects
          </Link>
        </div>
      </div>
    </section>
  )
}
