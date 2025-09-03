import React from 'react'

interface AboutData {
  title: string
  description: string[]
  mission: string
  vision: string
  values: string
}

interface AboutProps {
  data?: AboutData
}

export function About({ data }: AboutProps) {
  // Default content - will be replaced by TinaCMS data
  const defaultData: AboutData = {
    title: "About Corvo Labs",
    description: [
      "At Corvo Labs, we believe in the power of artificial intelligence to transform businesses and improve lives. We're a team of experts dedicated to solving complex challenges through innovative AI solutions.",
      "Our approach combines deep technical expertise with a profound understanding of human behavior and design principles. This unique perspective allows us to create AI systems that are not only powerful but also intuitive and user-friendly.",
      "Founded by industry veterans with decades of combined experience, we've helped organizations across healthcare, technology, finance, and more to leverage AI for meaningful impact."
    ],
    mission: "To democratize AI by creating accessible, ethical, and impactful solutions that solve real-world problems.",
    vision: "A world where AI enhances human capabilities and improves quality of life across all sectors of society.",
    values: "Innovation, integrity, collaboration, and a relentless focus on creating user-centered experiences."
  }

  const aboutData = data || defaultData

  return (
    <section id="about" className="w-full py-24 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tighter">
            {aboutData.title}
          </h2>
          <div className="space-y-6 text-lg">
            {aboutData.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 shadow-sm rounded-none">
              <h3 className="text-xl font-bold mb-3">Our Mission</h3>
              <p className="text-gray-700">{aboutData.mission}</p>
            </div>
            <div className="bg-white p-6 shadow-sm rounded-none">
              <h3 className="text-xl font-bold mb-3">Our Vision</h3>
              <p className="text-gray-700">{aboutData.vision}</p>
            </div>
            <div className="bg-white p-6 shadow-sm rounded-none">
              <h3 className="text-xl font-bold mb-3">Our Values</h3>
              <p className="text-gray-700">{aboutData.values}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
