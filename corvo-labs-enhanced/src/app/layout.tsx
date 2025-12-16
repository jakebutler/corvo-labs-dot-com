import './globals.css'
import { cn } from '@/lib/utils'
import type { Metadata, Viewport } from 'next'
import { EnhancedNav } from '@/components/enhanced-nav'
import { EnhancedFooter } from '@/components/enhanced-footer'

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Corvo Labs - AI Consulting & Healthcare Technology Solutions',
  description: 'Transform your workflows with responsible AI. Corvo Labs delivers sophisticated AI solutions for healthcare and SMB teams with measurable results.',
  keywords: ['AI consulting', 'workflow automation', 'healthcare AI', 'SMB AI solutions'],
  openGraph: {
    title: 'Corvo Labs - AI Consulting & Healthcare Technology',
    description: 'Transform your workflows with responsible AI. Corvo Labs delivers sophisticated AI solutions for healthcare and SMB teams.',
    type: 'website',
    locale: 'en_US',
    url: 'https://corvolabs.com',
    siteName: 'Corvo Labs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Corvo Labs - AI Consulting & Healthcare Technology Solutions',
    description: 'Transform your workflows with responsible AI. Corvo Labs delivers sophisticated AI solutions for healthcare and SMB teams.',
    creator: '@corvolabs',
    images: ['/images/og-image.jpg'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-white text-gray-900 antialiased")}>
        <EnhancedNav />
        {children}
        <EnhancedFooter />
      </body>
    </html>
  )
}