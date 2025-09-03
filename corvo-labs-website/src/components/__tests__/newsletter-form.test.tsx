import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { NewsletterForm } from '../newsletter-form'

describe('NewsletterForm', () => {
  it('renders with default props', () => {
    render(<NewsletterForm />)
    
    expect(screen.getByText('Stay Ahead of the Curve')).toBeInTheDocument()
    expect(screen.getByText(/Get exclusive insights on AI innovation/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email Address/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Name \(Optional\)/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Subscribe to Newsletter/ })).toBeInTheDocument()
  })

  it('renders with custom title and description', () => {
    const customTitle = 'Custom Newsletter Title'
    const customDescription = 'Custom newsletter description'
    
    render(<NewsletterForm title={customTitle} description={customDescription} />)
    
    expect(screen.getByText(customTitle)).toBeInTheDocument()
    expect(screen.getByText(customDescription)).toBeInTheDocument()
  })

  it('handles email input changes', () => {
    render(<NewsletterForm />)
    
    const emailInput = screen.getByLabelText(/Email Address/) as HTMLInputElement
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    
    expect(emailInput.value).toBe('test@example.com')
  })

  it('handles name input changes', () => {
    render(<NewsletterForm />)
    
    const nameInput = screen.getByLabelText(/Name \(Optional\)/) as HTMLInputElement
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    
    expect(nameInput.value).toBe('John Doe')
  })

  it('handles interest checkbox changes', () => {
    render(<NewsletterForm />)
    
    const aiToolsCheckbox = screen.getByLabelText(/AI Tools & Technology/) as HTMLInputElement
    expect(aiToolsCheckbox.checked).toBe(false)
    
    fireEvent.click(aiToolsCheckbox)
    expect(aiToolsCheckbox.checked).toBe(true)
  })

  it('has General Updates checked by default', () => {
    render(<NewsletterForm />)
    
    const generalUpdatesCheckbox = screen.getByLabelText(/General Updates/) as HTMLInputElement
    expect(generalUpdatesCheckbox.checked).toBe(true)
  })

  it('prevents form submission without email', () => {
    render(<NewsletterForm />)
    
    const form = screen.getByRole('button', { name: /Subscribe to Newsletter/ }).closest('form')
    const submitSpy = jest.fn()
    
    if (form) {
      form.addEventListener('submit', submitSpy)
      fireEvent.submit(form)
    }
    
    // Form should not submit without email due to HTML5 validation
    const emailInput = screen.getByLabelText(/Email Address/) as HTMLInputElement
    expect(emailInput.validity.valid).toBe(false)
  })

  it('allows form submission with valid email', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
    
    render(<NewsletterForm />)
    
    const emailInput = screen.getByLabelText(/Email Address/)
    const submitButton = screen.getByRole('button', { name: /Subscribe to Newsletter/ })
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.click(submitButton)
    
    expect(consoleSpy).toHaveBeenCalledWith('Newsletter subscription:', expect.objectContaining({
      email: 'test@example.com'
    }))
    
    consoleSpy.mockRestore()
  })

  it('displays privacy notice', () => {
    render(<NewsletterForm />)
    
    expect(screen.getByText(/We respect your privacy. Unsubscribe at any time./)).toBeInTheDocument()
  })

  it('has correct form structure and accessibility', () => {
    render(<NewsletterForm />)
    
    // Check for proper form labels
    expect(screen.getByLabelText(/Email Address/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Name \(Optional\)/)).toBeInTheDocument()
    
    // Check for proper form structure
    const form = screen.getByRole('button', { name: /Subscribe to Newsletter/ }).closest('form')
    expect(form).toBeInTheDocument()
    
    // Check for required field
    const emailInput = screen.getByLabelText(/Email Address/) as HTMLInputElement
    expect(emailInput.required).toBe(true)
  })
})
