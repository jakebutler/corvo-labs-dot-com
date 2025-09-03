import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Header } from '../header'

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) {
    return <a href={href} {...props}>{children}</a>
  }
})

// Mock window.scrollY
Object.defineProperty(window, 'scrollY', {
  writable: true,
  value: 0,
})

describe('Header Component', () => {
  beforeEach(() => {
    window.scrollY = 0
  })

  it('renders logo and navigation links', () => {
    render(<Header />)
    
    // Check for logo image
    expect(screen.getByAltText('Corvo Labs')).toBeInTheDocument()
    
    // Check for navigation links
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Services')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Blog')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('shows mobile menu button on mobile screens', () => {
    render(<Header />)
    
    // Mobile menu button should be present but hidden on desktop
    const menuButton = screen.getByRole('button')
    expect(menuButton).toBeInTheDocument()
  })

  it('toggles mobile menu when button is clicked', () => {
    render(<Header />)
    
    const menuButton = screen.getByRole('button')
    
    // Initially mobile menu should not be visible
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument()
    
    // Click to open menu
    fireEvent.click(menuButton)
    expect(screen.getByTestId('mobile-menu')).toBeInTheDocument()
    
    // Click to close menu
    fireEvent.click(menuButton)
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument()
  })

  it('closes mobile menu when navigation link is clicked', () => {
    render(<Header />)
    
    const menuButton = screen.getByRole('button')
    fireEvent.click(menuButton) // Open menu
    
    const mobileAboutLink = screen.getAllByText('About')[1] // Second instance is in mobile menu
    fireEvent.click(mobileAboutLink)
    
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument()
  })

  it('applies scroll-based styling when scrolled', async () => {
    render(<Header />)
    
    const header = screen.getByRole('banner')
    
    // Initially should be transparent
    expect(header).toHaveClass('bg-transparent')
    
    // Simulate scroll
    window.scrollY = 50
    fireEvent.scroll(window)
    
    await waitFor(() => {
      expect(header).toHaveClass('bg-white/90', 'backdrop-blur-sm', 'shadow-sm')
    })
  })

  it('has proper accessibility attributes', () => {
    render(<Header />)
    
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
    
    const menuButton = screen.getByRole('button')
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    
    fireEvent.click(menuButton)
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')
  })

  it('navigation links have correct href attributes', () => {
    render(<Header />)
    
    expect(screen.getByText('About').closest('a')).toHaveAttribute('href', '#about')
    expect(screen.getByText('Services').closest('a')).toHaveAttribute('href', '#services')
    expect(screen.getByText('Projects').closest('a')).toHaveAttribute('href', '#projects')
    expect(screen.getByText('Blog').closest('a')).toHaveAttribute('href', '/blog')
    expect(screen.getByText('Contact').closest('a')).toHaveAttribute('href', '#contact')
  })
})
