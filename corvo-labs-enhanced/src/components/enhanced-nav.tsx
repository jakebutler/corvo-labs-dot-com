'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValueEvent } from 'framer-motion'
import { useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ShimmerButton } from '@/components/magicui/shimmer-button'
import { cn } from '@/lib/utils'
import { Menu, X, ChevronDown } from 'lucide-react'

interface NavItem {
  label: string
  href: string
  hasDropdown?: boolean
  dropdownItems?: Array<{
    label: string
    href: string
    description?: string
  }>
}

const navItems: NavItem[] = [
  {
    label: 'Services',
    href: '/services'
  },
  {
    label: 'Projects',
    href: '/projects'
  },
  {
    label: 'Blog',
    href: '/blog'
  },
  {
    label: 'About',
    href: '/about'
  },
  {
    label: 'Contact',
    href: '/contact'
  }
]

export function EnhancedNav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [currentNavHeight, setCurrentNavHeight] = useState(80)
  const dropdownTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)
  const { scrollY } = useScroll()

  // Transform navbar properties based on scroll
  const navBackground = useTransform(
    scrollY,
    [0, 50, 100],
    ['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.98)', 'rgba(255, 255, 255, 1)']
  )

  const navHeight = useTransform(scrollY, [0, 50], [80, 64])
  const logoScale = useTransform(scrollY, [0, 50], [1.1, 1])

  // Sync navHeight MotionValue to state for use in JSX
  useMotionValueEvent(navHeight, 'change', (latest) => {
    setCurrentNavHeight(latest)
  })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current)
      }
    }
  }, [])

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label)
  }

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    setActiveDropdown(label)
  }

  const handleMouseLeave = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  return (
    <>
      <motion.nav
        style={{
          backgroundColor: navBackground,
          height: navHeight,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(229, 231, 235, 0.8)'
        }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        )}
      >
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo */}
          <motion.div
            style={{ scale: logoScale }}
            className="flex items-center"
          >
            <Link href="/">
              <motion.img
                src="/images/corvo-labs-wide.svg"
                alt="Corvo Labs"
                className="h-8 w-auto cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div
                key={`${item.label}-${item.href}`}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                {item.hasDropdown ? (
                  <motion.button
                    onClick={() => handleDropdownToggle(item.label)}
                    className={cn(
                      "flex items-center space-x-1 text-gray-700 hover:text-accent",
                      "transition-colors duration-200 font-medium",
                      activeDropdown === item.label && "text-accent"
                    )}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span>{item.label}</span>
                    <motion.div
                      animate={{ rotate: activeDropdown === item.label ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </motion.button>
                ) : (
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center space-x-1 text-gray-700 hover:text-accent",
                        "transition-colors duration-200 font-medium"
                      )}
                    >
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                )}

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {activeDropdown === item.label && item.dropdownItems && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
                    >
                      <div className="p-2">
                        {item.dropdownItems.map((dropdownItem, index) => (
                          <motion.div
                            key={`${dropdownItem.label}-${dropdownItem.href}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="block"
                          >
                            <Link
                              href={dropdownItem.href}
                              className="block p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                            >
                              <div className="font-medium text-gray-900">
                                {dropdownItem.label}
                              </div>
                              {dropdownItem.description && (
                                <div className="text-sm text-gray-600 mt-1">
                                  {dropdownItem.description}
                                </div>
                              )}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link href="/contact">
              <ShimmerButton className="px-6 py-2 text-base">
                Contact Us
              </ShimmerButton>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-40 lg:hidden"
            style={{ marginTop: currentNavHeight }}
          >
            <div className="bg-white border-b border-gray-200 shadow-lg">
              <div className="container mx-auto px-4 py-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={`${item.label}-${item.href}`}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="py-3"
                  >
                    <div>
                      {item.hasDropdown ? (
                        <button
                          onClick={() => handleDropdownToggle(item.label)}
                          className="flex items-center justify-between w-full text-left text-gray-900 font-medium"
                        >
                          <span>{item.label}</span>
                          <motion.div
                            animate={{ rotate: activeDropdown === item.label ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </motion.div>
                        </button>
                      ) : (
                        <Link
                          href={item.href}
                          className="block text-left text-gray-900 font-medium"
                        >
                          {item.label}
                        </Link>
                      )}

                      {/* Mobile Dropdown */}
                      <AnimatePresence>
                        {activeDropdown === item.label && item.dropdownItems && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mt-2 pl-4 space-y-2"
                          >
                            {item.dropdownItems.map((dropdownItem, index) => (
                              <Link
                                key={`${dropdownItem.label}-${dropdownItem.href}`}
                                href={dropdownItem.href}
                                className="block py-2 text-gray-600 hover:text-accent transition-colors"
                              >
                                <div className="font-medium">{dropdownItem.label}</div>
                                {dropdownItem.description && (
                                  <div className="text-sm text-gray-500">
                                    {dropdownItem.description}
                                  </div>
                                )}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}

                <Link href="/contact" className="w-full mt-6">
                  <ShimmerButton className="w-full px-6 py-3 text-base">
                    Contact Us
                  </ShimmerButton>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content from hiding behind fixed nav */}
      <motion.div
        style={{ height: navHeight }}
        className="block"
      />
    </>
  )
}