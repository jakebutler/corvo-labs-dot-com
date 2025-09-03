'use client'

import React, { useState } from 'react'
import { Mail } from 'lucide-react'

interface NewsletterFormProps {
  title?: string
  description?: string
}

export function NewsletterForm({ 
  title = "Stay Ahead of the Curve",
  description = "Get exclusive insights on AI innovation, product strategy, and emerging technologies. Join industry professionals who trust our expertise."
}: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [interests, setInterests] = useState({
    aiTools: false,
    healthcare: false,
    uxDesign: false,
    productManagement: false,
    behaviorChange: false,
    generalUpdates: true
  })

  const handleInterestChange = (interest: keyof typeof interests) => {
    setInterests(prev => ({
      ...prev,
      [interest]: !prev[interest]
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement newsletter subscription logic
    console.log('Newsletter subscription:', { email, name, interests })
  }

  return (
    <div id="newsletter" className="bg-white p-8 rounded-none border border-gray-200">
      <div className="flex items-center mb-4">
        <Mail className="mr-3 text-gray-600" size={24} />
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      
      <p className="text-gray-600 mb-6">{description}</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Name (Optional)
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            What topics interest you?
          </label>
          <div className="space-y-2">
            <label className="flex items-start">
              <input
                type="checkbox"
                checked={interests.aiTools}
                onChange={() => handleInterestChange('aiTools')}
                className="mt-1 mr-3 h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded-none"
              />
              <div>
                <div className="font-medium">AI Tools & Technology</div>
                <div className="text-sm text-gray-600">Latest AI projects, tools, and technology insights</div>
              </div>
            </label>
            
            <label className="flex items-start">
              <input
                type="checkbox"
                checked={interests.healthcare}
                onChange={() => handleInterestChange('healthcare')}
                className="mt-1 mr-3 h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded-none"
              />
              <div>
                <div className="font-medium">Healthcare Innovation</div>
                <div className="text-sm text-gray-600">Healthcare technology and digital health solutions</div>
              </div>
            </label>
            
            <label className="flex items-start">
              <input
                type="checkbox"
                checked={interests.uxDesign}
                onChange={() => handleInterestChange('uxDesign')}
                className="mt-1 mr-3 h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded-none"
              />
              <div>
                <div className="font-medium">UX & Design</div>
                <div className="text-sm text-gray-600">User experience design process and insights</div>
              </div>
            </label>
            
            <label className="flex items-start">
              <input
                type="checkbox"
                checked={interests.productManagement}
                onChange={() => handleInterestChange('productManagement')}
                className="mt-1 mr-3 h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded-none"
              />
              <div>
                <div className="font-medium">Product Management</div>
                <div className="text-sm text-gray-600">Product strategy, frameworks, and best practices</div>
              </div>
            </label>
            
            <label className="flex items-start">
              <input
                type="checkbox"
                checked={interests.behaviorChange}
                onChange={() => handleInterestChange('behaviorChange')}
                className="mt-1 mr-3 h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded-none"
              />
              <div>
                <div className="font-medium">Behavior Change</div>
                <div className="text-sm text-gray-600">Psychology and behavior modification techniques</div>
              </div>
            </label>
            
            <label className="flex items-start">
              <input
                type="checkbox"
                checked={interests.generalUpdates}
                onChange={() => handleInterestChange('generalUpdates')}
                className="mt-1 mr-3 h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded-none"
              />
              <div>
                <div className="font-medium">General Updates</div>
                <div className="text-sm text-gray-600">All newsletter content and project updates</div>
              </div>
            </label>
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full px-6 py-3 bg-gray-600 text-white font-medium hover:bg-gray-700 transition-colors rounded-none"
        >
          <Mail className="inline mr-2" size={16} />
          Subscribe to Newsletter
        </button>
        
        <p className="text-xs text-gray-500 text-center">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </form>
    </div>
  )
}
