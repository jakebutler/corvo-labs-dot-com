import React from 'react'
import { Mail, MapPin } from 'lucide-react'
import { NewsletterForm } from './newsletter-form'

interface ContactData {
  title: string
  subtitle: string
  email: string
  phone: string
  location: string
}

interface ContactProps {
  data?: ContactData
}

export function Contact({ data }: ContactProps) {
  // Default content - will be replaced by TinaCMS data
  const defaultData: ContactData = {
    title: "Get in Touch",
    subtitle: "Ready to transform your challenges into elegant solutions? Contact us to discuss how Corvo Labs can help your organization leverage AI for meaningful impact.",
    email: "info@corvolabs.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA"
  }

  const contactData = data || defaultData

  return (
    <section id="contact" className="w-full py-12 md:py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tighter">
                {contactData.title}
              </h2>
              <p className="text-gray-300 mb-8">
                {contactData.subtitle}
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="mr-4 text-gray-400" size={20} />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-300">{contactData.email}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="mr-4 text-gray-400" size={20} />
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-gray-300">{contactData.location}</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
