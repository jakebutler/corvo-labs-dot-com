"use client"

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

export function NavigationEnhanced() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  // Navigation items
  const navItems = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/about', label: 'About', icon: '👤' },
    { href: '/services', label: 'Services', icon: '⚙️' },
    { href: '/projects', label: 'Projects', icon: '💼' },
    { href: '/blog', label: 'Blog', icon: '📝' },
    { href: '/contact', label: 'Contact', icon: '📧' }
  ]

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle mobile menu close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  // Mobile menu animation variants
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%"
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const mobileItemVariants = {
    closed: {
      opacity: 0,
      x: 50
    },
    open: {
      opacity: 1,
      x: 0
    }
  }

  return (
    <>
      {/* Navigation Bar */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-lg shadow-lg border-b border-gray-200/50'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/" className="flex items-center space-x-3">
                <Image
                  src="/images/corvo-labs-stacked.svg"
                  alt="Corvo Labs"
                  width={40}
                  height={40}
                  className="h-10 w-auto"
                />
                <span className={`text-xl font-bold ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                } transition-colors duration-300`}>
                  Corvo Labs
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={`relative group px-4 py-2 rounded-lg transition-all duration-300 ${
                      pathname === item.href
                        ? 'text-blue-600 bg-blue-50'
                        : isScrolled
                        ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                        : 'text-white hover:text-blue-200 hover:bg-white/10'
                    }`}
                  >
                    <span className="flex items-center space-x-2">
                      <span className="text-lg">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </span>

                    {/* Animated Underline */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Active Indicator */}
                    {pathname === item.href && (
                      <motion.div
                        className="absolute inset-0 bg-blue-500/10 rounded-lg -z-10"
                        layoutId="activeTab"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30
                        }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              className="hidden md:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isScrolled
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-white text-blue-600 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Get Started
              </motion.button>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <motion.div
                className="w-6 h-6 relative"
                animate={isMobileMenuOpen ? "open" : "closed"}
              >
                <motion.span
                  className={`absolute top-0 left-0 w-6 h-0.5 ${isScrolled ? 'bg-gray-700' : 'bg-white'} transition-colors duration-300`}
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 8 }
                  }}
                />
                <motion.span
                  className={`absolute top-2 left-0 w-6 h-0.5 ${isScrolled ? 'bg-gray-700' : 'bg-white'} transition-colors duration-300`}
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                  }}
                />
                <motion.span
                  className={`absolute top-4 left-0 w-6 h-0.5 ${isScrolled ? 'bg-gray-700' : 'bg-white'} transition-colors duration-300`}
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -8 }
                  }}
                />
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 origin-left"
          style={{
            scaleX: typeof window !== 'undefined'
              ? window.scrollY / (document.body.scrollHeight - window.innerHeight)
              : 0
          }}
        />
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              ref={mobileMenuRef}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white shadow-2xl z-50 md:hidden overflow-y-auto"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{
                duration: 0.4,
                ease: "easeOut"
              }}
            >
              <div className="p-6">
                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <Image
                      src="/images/corvo-labs-stacked.svg"
                      alt="Corvo Labs"
                      width={32}
                      height={32}
                      className="h-8 w-auto"
                    />
                    <span className="text-lg font-bold text-gray-900">Corvo Labs</span>
                  </div>

                  <motion.button
                    className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                {/* Mobile Navigation Items */}
                <div className="space-y-2">
                  {navItems.map((item) => (
                    <motion.div
                      key={item.href}
                      variants={mobileItemVariants}
                      transition={{
                        duration: 0.3,
                        ease: "easeOut"
                      }}
                    >
                      <Link
                        href={item.href}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                          pathname === item.href
                            ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="text-xl">{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile CTA */}
                <motion.div
                  className="mt-8"
                  variants={mobileItemVariants}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                >
                  <motion.button
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    Get Started
                  </motion.button>
                </motion.div>

                {/* Mobile Contact Info */}
                <motion.div
                  className="mt-8 p-4 bg-gray-50 rounded-lg"
                  variants={mobileItemVariants}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                >
                  <div className="text-sm text-gray-600">
                    <div className="mb-2">
                      <span className="font-medium">Email:</span> hello@corvolabs.com
                    </div>
                    <div>
                      <span className="font-medium">Hours:</span> Mon-Fri 9AM-6PM EST
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

// Navigation Breadcrumb Component
interface NavigationBreadcrumbProps {
  items: { label: string; href?: string }[]
  className?: string
}

export function NavigationBreadcrumb({
  items,
  className = ''
}: NavigationBreadcrumbProps) {
  return (
    <motion.nav
      className={`flex items-center space-x-2 text-sm text-gray-600 ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <motion.svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </motion.svg>
          )}

          {item.href ? (
            <motion.a
              href={item.href}
              className="hover:text-blue-600 transition-colors duration-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 2 }}
            >
              {item.label}
            </motion.a>
          ) : (
            <motion.span
              className="text-gray-900 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {item.label}
            </motion.span>
          )}
        </React.Fragment>
      ))}
    </motion.nav>
  )
}