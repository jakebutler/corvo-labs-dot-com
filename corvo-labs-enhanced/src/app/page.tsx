import { EnhancedHero } from '@/components/enhanced-hero'

export default function Home() {
  return (
    <main>
      <EnhancedHero />

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              We combine advanced automation technology with deep healthcare experience to deliver solutions that transform workflows and improve outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-24 h-24 rounded-lg flex items-center justify-center mb-6">
                <img src="/images/01-no-bg.png" alt="Healthcare Experience" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Healthcare Experience</h3>
              <p className="text-gray-600">
                Solutions designed specifically for healthcare workflows and compliance requirements, built on real-world experience.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-24 h-24 rounded-lg flex items-center justify-center mb-6">
                <img src="/images/02-no-bg.png" alt="Proven Results" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Proven Results</h3>
              <p className="text-gray-600">
                We know time is money. We'll save you both with measurable improvements in efficiency and patient outcomes.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-24 h-24 rounded-lg flex items-center justify-center mb-6">
                <img src="/images/03-no-bg.png" alt="Responsible AI" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Responsible AI</h3>
              <p className="text-gray-600">
                Ethical AI implementation that prioritizes patient safety and data privacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-gray-900 mb-4">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's discuss how our solutions can help your healthcare organization achieve measurable results.
          </p>
          <button className="px-8 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent-600 transition-colors">
            Get Started Today
          </button>
        </div>
      </section>
    </main>
  )
}