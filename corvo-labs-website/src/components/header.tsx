'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { MenuIcon, XIcon } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
      role="banner"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-gray-900">
            <img
              src="https://uploadthingy.s3.us-west-1.amazonaws.com/4oMYgWpvnHWdcmkjtzxCDc/corvo-labs-wide.svg"
              alt="Corvo Labs"
              className="h-8 w-auto"
            />
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/about"
              className="text-gray-800 hover:text-black transition-colors"
            >
              About
            </Link>
            <a
              href="#services"
              className="text-gray-800 hover:text-black transition-colors"
            >
              Services
            </a>
            <a
              href="#projects"
              className="text-gray-800 hover:text-black transition-colors"
            >
              Projects
            </a>
            <Link
              href="/blog"
              className="text-gray-800 hover:text-black transition-colors"
            >
              Blog
            </Link>
            <Link 
              href="#newsletter" 
              className="px-4 py-2 bg-gray-900 text-white rounded-none hover:bg-gray-800 transition-colors"
            >
              Subscribe
            </Link>
          </div>
          
          <button
            className="md:hidden text-gray-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div 
          className="md:hidden bg-white absolute top-full left-0 right-0 border-t border-gray-100 shadow-lg"
          data-testid="mobile-menu"
        >
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            <a
              href="#about"
              className="text-gray-800 hover:text-black transition-colors py-2"
              onClick={closeMenu}
            >
              About
            </a>
            <a
              href="#services"
              className="text-gray-800 hover:text-black transition-colors py-2"
              onClick={closeMenu}
            >
              Services
            </a>
            <a
              href="#projects"
              className="text-gray-800 hover:text-black transition-colors py-2"
              onClick={closeMenu}
            >
              Projects
            </a>
            <Link
              href="/blog"
              className="text-gray-800 hover:text-black transition-colors py-2"
              onClick={closeMenu}
            >
              Blog
            </Link>
            <a
              href="#contact"
              className="text-gray-800 hover:text-black transition-colors py-2"
              onClick={closeMenu}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
