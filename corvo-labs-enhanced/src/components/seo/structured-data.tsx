interface StructuredDataProps {
  type?: 'organization' | 'website' | 'webpage'
  data?: Record<string, any>
}

export function StructuredData({ type = 'organization', data }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseUrl = 'https://corvolabs.com'

    switch (type) {
      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Corvo Labs',
          description: 'Healthcare AI consulting company specializing in intelligent AI solutions and data-driven insights for healthcare organizations.',
          url: baseUrl,
          logo: `${baseUrl}/images/corvo-labs-wide.svg`,
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+1-555-HEALTHCARE',
            contactType: 'customer service',
            availableLanguage: ['English']
          },
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'US'
          },
          sameAs: [
            // Add social media URLs when available
          ],
          knowsAbout: [
            'Healthcare AI',
            'Artificial Intelligence',
            'Machine Learning',
            'Healthcare Consulting',
            'Clinical Decision Support',
            'Healthcare Automation',
            'Predictive Analytics',
            'HIPAA Compliance',
            'Healthcare Technology'
          ],
          services: [
            'AI Strategy & Consulting',
            'Regulatory Compliance & HIPAA',
            'Healthcare Operations Optimization',
            'Clinical Decision Support Systems',
            'Healthcare Workflow Automation',
            'Predictive Analytics & Forecasting'
          ]
        }

      case 'website':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Corvo Labs',
          description: 'Healthcare AI consulting company specializing in intelligent AI solutions and data-driven insights.',
          url: baseUrl,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${baseUrl}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string'
          }
        }

      case 'webpage':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: data?.title || 'Corvo Labs - Healthcare AI Solutions',
          description: data?.description || 'Empowering healthcare through intelligent AI solutions and data-driven insights.',
          url: data?.url || baseUrl,
          mainEntity: {
            '@type': 'Organization',
            name: 'Corvo Labs',
            url: baseUrl
          },
          ...data
        }

      default:
        return {}
    }
  }

  const structuredData = getStructuredData()

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  )
}