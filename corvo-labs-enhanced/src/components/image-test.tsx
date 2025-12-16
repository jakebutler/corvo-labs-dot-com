'use client'

import React, { useState } from 'react'

export function ImageTest() {
  const [imageStatus, setImageStatus] = useState<{ [key: string]: 'loading' | 'loaded' | 'error' }>({
    crow: 'loading',
    logo: 'loading'
  })

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-2xl font-bold mb-8">Image Display Test</h1>

      <div className="space-y-8">
        {/* Crow Image Test */}
        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Crow Image Test</h2>
          <div className="space-y-2">
            <p>Status: {imageStatus.crow}</p>
            <img
              src="/images/crow-hero-no-bg.png"
              alt="Crow Test"
              className="h-32 w-auto border border-gray-300"
              onLoad={() => setImageStatus(prev => ({ ...prev, crow: 'loaded' }))}
              onError={() => setImageStatus(prev => ({ ...prev, crow: 'error' }))}
              style={{ display: 'block', opacity: 1 }}
            />
          </div>
        </div>

        {/* Logo Image Test */}
        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Logo Image Test</h2>
          <div className="space-y-2">
            <p>Status: {imageStatus.logo}</p>
            <img
              src="/images/corvo-labs-stacked.svg"
              alt="Logo Test"
              className="h-32 w-auto border border-gray-300"
              onLoad={() => setImageStatus(prev => ({ ...prev, logo: 'loaded' }))}
              onError={() => setImageStatus(prev => ({ ...prev, logo: 'error' }))}
              style={{ display: 'block', opacity: 1 }}
            />
          </div>
        </div>

        {/* Debug Info */}
        <div className="border rounded-lg p-4 bg-gray-50">
          <h2 className="text-lg font-semibold mb-4">Debug Information</h2>
          <div className="space-y-2 font-mono text-sm">
            <p>Window location: {typeof window !== 'undefined' ? window.location.href : 'SSR'}</p>
            <p>User agent: {typeof navigator !== 'undefined' ? navigator.userAgent : 'SSR'}</p>
            <p>Image URLs:</p>
            <ul className="ml-4">
              <li>/images/crow-hero-no-bg.png</li>
              <li>/images/corvo-labs-stacked.svg</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}