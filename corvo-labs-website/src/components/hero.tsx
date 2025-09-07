import React from 'react'
import Image from 'next/image'

export function Hero() {
  return (
    <section 
      className="w-full pt-24 md:pt-32 pb-16 md:pb-20 bg-white"
      role="region"
      aria-label="Hero section"
    >
      <div className="container mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Brand Assets */}
          <div className="flex flex-col md:flex-row items-center justify-center mb-8 md:mb-12">
            <Image
              src="/images/crow-hero-no-bg.png"
              alt="Crow illustration"
              width={198}
              height={198}
              className="h-[120px] md:h-[198px] w-auto object-contain"
              priority
              sizes="(max-width: 768px) 120px, 198px"
            />
            <Image
              src="/images/corvo-labs-stacked.svg"
              alt="Corvo Labs logo"
              width={180}
              height={180}
              className="h-[108px] md:h-[180px] w-auto object-contain mt-4 md:mt-0 md:ml-6"
              priority
              sizes="(max-width: 768px) 108px, 180px"
            />
          </div>
          
          {/* Hero Content */}
          <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            Transforming complex challenges into elegant solutions
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            We specialize in AI projects and consulting across product
            management, healthcare, behavior change, UX design, and AI
            prototyping.
          </p>
        </div>
        </div>
      </div>
      
      <div 
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-100 to-transparent"
        data-testid="gradient-overlay"
      ></div>
    </section>
  )
}
