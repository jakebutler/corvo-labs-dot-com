import { render, screen } from '@testing-library/react'
import { Hero } from '../hero'

describe('Hero Component', () => {
  it('renders hero images correctly', () => {
    render(<Hero />)
    
    // Check for crow illustration
    const crowImage = screen.getByAltText('Crow illustration')
    expect(crowImage).toBeInTheDocument()
    expect(crowImage).toHaveAttribute('src', expect.stringContaining('crow-hero-no-bg.png'))
    
    // Check for Corvo Labs logo
    const logoImage = screen.getByAltText('Corvo Labs logo')
    expect(logoImage).toBeInTheDocument()
    expect(logoImage).toHaveAttribute('src', expect.stringContaining('Corvo_Labs_stacked.svg'))
  })

  it('renders main heading and description', () => {
    render(<Hero />)
    
    const heading = screen.getByText('Transforming complex challenges into elegant solutions')
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveClass('text-4xl', 'md:text-6xl', 'font-bold')
    
    const description = screen.getByText(/We specialize in AI projects and consulting/)
    expect(description).toBeInTheDocument()
  })

  it('renders CTA buttons with correct links', () => {
    render(<Hero />)
    
    const getInTouchButton = screen.getByText('Get in touch')
    expect(getInTouchButton).toBeInTheDocument()
    expect(getInTouchButton.closest('a')).toHaveAttribute('href', '#contact')
    expect(getInTouchButton).toHaveClass('bg-gray-900', 'text-white')
    
    const servicesButton = screen.getByText('Our services')
    expect(servicesButton).toBeInTheDocument()
    expect(servicesButton.closest('a')).toHaveAttribute('href', '#services')
    expect(servicesButton).toHaveClass('border', 'border-gray-900', 'text-gray-900')
  })

  it('has proper responsive layout classes', () => {
    render(<Hero />)
    
    const section = screen.getByRole('region')
    expect(section).toHaveClass('min-h-screen', 'pt-24')
    
    const container = section.querySelector('.container')
    expect(container).toHaveClass('mx-auto', 'px-6')
  })

  it('includes gradient overlay at bottom', () => {
    render(<Hero />)
    
    const gradientOverlay = screen.getByTestId('gradient-overlay')
    expect(gradientOverlay).toHaveClass('absolute', 'bottom-0', 'bg-gradient-to-t', 'from-gray-100')
  })

  it('has proper image dimensions and layout', () => {
    render(<Hero />)
    
    const imageContainer = screen.getByTestId('hero-images')
    expect(imageContainer).toHaveClass('max-w-[660px]', 'h-[220px]')
    
    const crowImage = screen.getByAltText('Crow illustration')
    expect(crowImage).toHaveClass('h-[198px]')
    
    const logoImage = screen.getByAltText('Corvo Labs logo')
    expect(logoImage).toHaveClass('h-[180px]', 'ml-6')
  })
})
