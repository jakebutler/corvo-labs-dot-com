import React from 'react'
import {
  Brain,
  LineChart,
  Heart,
  Lightbulb,
  Layers,
  Code,
} from 'lucide-react'

interface Service {
  icon: string
  title: string
  description: string
}

interface ServicesData {
  title: string
  subtitle: string
  services: Service[]
}

interface ServicesProps {
  data?: ServicesData
}

const iconMap = {
  brain: Brain,
  lineChart: LineChart,
  heart: Heart,
  lightbulb: Lightbulb,
  layers: Layers,
  code: Code,
}

export function Services({ data }: ServicesProps) {
  // Default content - will be replaced by TinaCMS data
  const defaultData: ServicesData = {
    title: "Our Services",
    subtitle: "We specialize in transforming complex challenges into elegant, user-centered solutions through our comprehensive range of AI services.",
    services: [
      {
        icon: "brain",
        title: "AI Strategy & Consulting",
        description: "We help organizations identify opportunities for AI implementation and develop roadmaps for success."
      },
      {
        icon: "lineChart",
        title: "Product Management",
        description: "From concept to launch, we guide AI products through development with a focus on business value and user needs."
      },
      {
        icon: "heart",
        title: "Healthcare AI",
        description: "Specialized solutions for healthcare providers, payers, and life sciences companies to improve outcomes and efficiency."
      },
      {
        icon: "lightbulb",
        title: "Behavior Change Design",
        description: "AI systems that understand and positively influence human behavior for health, wellness, and productivity."
      },
      {
        icon: "layers",
        title: "UX Design for AI",
        description: "Creating intuitive, transparent interfaces that make complex AI systems accessible and trustworthy."
      },
      {
        icon: "code",
        title: "AI Prototyping",
        description: "Rapid development of proof-of-concept AI solutions to validate ideas and demonstrate value."
      }
    ]
  }

  const servicesData = data || defaultData

  return (
    <section id="services" className="w-full py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tighter">
            {servicesData.title}
          </h2>
          <p className="text-lg text-gray-700">
            {servicesData.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Brain
            return (
              <div
                key={index}
                className="p-6 border border-gray-200 hover:border-gray-400 transition-colors group rounded-none"
              >
                <div className="mb-4 text-gray-800 group-hover:text-black transition-colors">
                  <IconComponent size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-700">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
