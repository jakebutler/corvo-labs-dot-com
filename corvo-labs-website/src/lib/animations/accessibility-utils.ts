/**
 * Animation Accessibility Utilities
 *
 * Comprehensive accessibility support for animations, respecting user preferences
 * and providing inclusive experiences for all users of the healthcare AI consulting website.
 */

import { useEffect, useState, useCallback } from 'react'

// Accessibility interfaces
export interface AccessibilityPreferences {
  prefersReducedMotion: boolean
  prefersHighContrast: boolean
  prefersDarkMode: boolean
  prefersReducedTransparency: boolean
  prefersLessData: boolean
  prefersLessAnimation: boolean
}

export interface AnimationAccessibilityConfig {
  respectReducedMotion: boolean
  respectHighContrast: boolean
  respectDataSaver: boolean
  fallbackDuration: number
  enableScreenReaderAnnouncements: boolean
  customEasing?: string
}

// Default accessibility configuration
export const DEFAULT_ACCESSIBILITY_CONFIG: AnimationAccessibilityConfig = {
  respectReducedMotion: true,
  respectHighContrast: true,
  respectDataSaver: true,
  fallbackDuration: 0.15,
  enableScreenReaderAnnouncements: true
}

/**
 * Accessibility preferences detector
 */
export class AccessibilityDetector {
  private mediaQueries: Map<string, MediaQueryList> = new Map()
  private listeners: Set<(preferences: AccessibilityPreferences) => void> = new Set()

  constructor() {
    this.setupMediaQueries()
  }

  private setupMediaQueries() {
    const queries = {
      prefersReducedMotion: '(prefers-reduced-motion: reduce)',
      prefersHighContrast: '(prefers-contrast: high)',
      prefersDarkMode: '(prefers-color-scheme: dark)',
      prefersReducedTransparency: '(prefers-reduced-transparency: reduce)',
      prefersLessData: '(prefers-reduced-data: reduce)'
    }

    Object.entries(queries).forEach(([key, query]) => {
      if (typeof window !== 'undefined' && window.matchMedia) {
        const mq = window.matchMedia(query)
        this.mediaQueries.set(key, mq)

        // Add change listener
        mq.addEventListener('change', () => this.notifyListeners())
      }
    })
  }

  private notifyListeners() {
    const preferences = this.getPreferences()
    this.listeners.forEach(listener => listener(preferences))
  }

  getPreferences(): AccessibilityPreferences {
    const preferences: Partial<AccessibilityPreferences> = {}

    this.mediaQueries.forEach((mq, key) => {
      preferences[key as keyof AccessibilityPreferences] = mq.matches
    })

    // Detect less animation preference through multiple indicators
    preferences.prefersLessAnimation =
      preferences.prefersReducedMotion ||
      preferences.prefersLessData ||
      this.detectLowEndDevice()

    return preferences as AccessibilityPreferences
  }

  private detectLowEndDevice(): boolean {
    if (typeof navigator === 'undefined') return false

    const navigator = window.navigator as any
    const hardwareConcurrency = navigator.hardwareConcurrency || 4
    const deviceMemory = navigator.deviceMemory || 4
    const connection = (navigator as any).connection

    // Consider it low-end if:
    // - Less than 4 CPU cores
    // - Less than 4GB RAM
    // - Slow network connection
    return (
      hardwareConcurrency < 4 ||
      deviceMemory < 4 ||
      (connection && (connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g'))
    )
  }

  subscribe(listener: (preferences: AccessibilityPreferences) => void) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  destroy() {
    this.mediaQueries.forEach((mq) => {
      mq.removeEventListener('change', () => this.notifyListeners())
    })
    this.listeners.clear()
  }
}

// Global accessibility detector
export const globalAccessibilityDetector = new AccessibilityDetector()

/**
 * Hook for managing animation accessibility
 */
export function useAnimationAccessibility(config: Partial<AnimationAccessibilityConfig> = {}) {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>({
    prefersReducedMotion: false,
    prefersHighContrast: false,
    prefersDarkMode: false,
    prefersReducedTransparency: false,
    prefersLessData: false,
    prefersLessAnimation: false
  })

  const fullConfig = { ...DEFAULT_ACCESSIBILITY_CONFIG, ...config }

  useEffect(() => {
    // Get initial preferences
    setPreferences(globalAccessibilityDetector.getPreferences())

    // Subscribe to changes
    const unsubscribe = globalAccessibilityDetector.subscribe(setPreferences)

    return unsubscribe
  }, [])

  const shouldReduceAnimation = useCallback(() => {
    if (!fullConfig.respectReducedMotion) return false
    return preferences.prefersReducedMotion || preferences.prefersLessAnimation
  }, [preferences, fullConfig.respectReducedMotion])

  const getAccessibleAnimationProps = useCallback(() => {
    if (shouldReduceAnimation()) {
      return {
        initial: false,
        animate: true,
        transition: { duration: fullConfig.fallbackDuration, ease: 'linear' },
        whileHover: undefined,
        whileTap: undefined,
        variants: undefined
      }
    }

    // High contrast adjustments
    if (fullConfig.respectHighContrast && preferences.prefersHighContrast) {
      return {
        transition: { duration: fullConfig.fallbackDuration * 2, ease: 'linear' },
        // Remove complex animations that might interfere with high contrast mode
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 }
      }
    }

    return {}
  }, [shouldReduceAnimation, preferences, fullConfig])

  const getAccessibleDuration = useCallback((originalDuration: number) => {
    if (shouldReduceAnimation()) {
      return fullConfig.fallbackDuration
    }
    if (preferences.prefersHighContrast) {
      return originalDuration * 0.8 // Slightly faster for better usability
    }
    return originalDuration
  }, [shouldReduceAnimation, preferences, fullConfig])

  const getAccessibleEasing = useCallback((originalEasing: string | number[]) => {
    if (shouldReduceAnimation()) {
      return fullConfig.customEasing || 'linear'
    }
    if (preferences.prefersHighContrast) {
      return 'easeOut' // Simple, predictable easing
    }
    return originalEasing
  }, [shouldReduceAnimation, preferences, fullConfig])

  return {
    preferences,
    shouldReduceAnimation: shouldReduceAnimation(),
    getAccessibleAnimationProps,
    getAccessibleDuration,
    getAccessibleEasing,
    config: fullConfig
  }
}

/**
 * Screen reader announcement utilities
 */
export class ScreenReaderAnnouncer {
  private announcementElement: HTMLDivElement | null = null

  constructor() {
    this.createAnnouncementElement()
  }

  private createAnnouncementElement() {
    if (typeof document === 'undefined') return

    this.announcementElement = document.createElement('div')
    this.announcementElement.setAttribute('aria-live', 'polite')
    this.announcementElement.setAttribute('aria-atomic', 'true')
    this.announcementElement.style.position = 'absolute'
    this.announcementElement.style.left = '-10000px'
    this.announcementElement.style.width = '1px'
    this.announcementElement.style.height = '1px'
    this.announcementElement.style.overflow = 'hidden'
    document.body.appendChild(this.announcementElement)
  }

  announce(message: string, priority: 'polite' | 'assertive' = 'polite') {
    if (!this.announcementElement) return

    // Update aria-live if needed
    if (this.announcementElement.getAttribute('aria-live') !== priority) {
      this.announcementElement.setAttribute('aria-live', priority)
    }

    // Clear previous content and announce new message
    this.announcementElement.textContent = ''
    setTimeout(() => {
      if (this.announcementElement) {
        this.announcementElement.textContent = message
      }
    }, 100)
  }

  announceAnimationStart(animationName: string, elementDescription?: string) {
    const message = elementDescription
      ? `${elementDescription} animation started: ${animationName}`
      : `Animation started: ${animationName}`
    this.announce(message, 'polite')
  }

  announceAnimationEnd(animationName: string, elementDescription?: string) {
    const message = elementDescription
      ? `${elementDescription} animation completed: ${animationName}`
      : `Animation completed: ${animationName}`
    this.announce(message, 'polite')
  }

  announcePageTransition(fromPage: string, toPage: string) {
    this.announce(`Navigated from ${fromPage} to ${toPage}`, 'assertive')
  }

  destroy() {
    if (this.announcementElement && this.announcementElement.parentNode) {
      this.announcementElement.parentNode.removeChild(this.announcementElement)
    }
  }
}

// Global screen reader announcer
export const globalScreenReaderAnnouncer = new ScreenReaderAnnouncer()

/**
 * Focus management for animated elements
 */
export class FocusManager {
  private focusHistory: HTMLElement[] = []
  private originalFocus: HTMLElement | null = null

  saveFocus() {
    this.originalFocus = document.activeElement as HTMLElement
  }

  restoreFocus() {
    if (this.originalFocus && typeof this.originalFocus.focus === 'function') {
      this.originalFocus.focus()
    }
  }

  trapFocus(container: HTMLElement) {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>

    if (focusableElements.length === 0) return

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
    }

    container.addEventListener('keydown', handleTabKey)
    firstElement.focus()

    return () => {
      container.removeEventListener('keydown', handleTabKey)
    }
  }

  skipToContent(targetId: string) {
    const target = document.getElementById(targetId)
    if (target) {
      target.focus()
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

// Global focus manager
export const globalFocusManager = new FocusManager()

/**
 * Color contrast utilities for animations
 */
export const colorContrastUtils = {
  /**
   * Calculate relative luminance of a color
   */
  getRelativeLuminance(hex: string): number {
    const rgb = this.hexToRgb(hex)
    if (!rgb) return 0

    const { r, g, b } = rgb
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
  },

  /**
   * Calculate contrast ratio between two colors
   */
  getContrastRatio(color1: string, color2: string): number {
    const lum1 = this.getRelativeLuminance(color1)
    const lum2 = this.getRelativeLuminance(color2)
    const brightest = Math.max(lum1, lum2)
    const darkest = Math.min(lum1, lum2)
    return (brightest + 0.05) / (darkest + 0.05)
  },

  /**
   * Check if contrast ratio meets WCAG standards
   */
  meetsWCAG(color1: string, color2: string, level: 'AA' | 'AAA' = 'AA', size: 'normal' | 'large' = 'normal'): boolean {
    const ratio = this.getContrastRatio(color1, color2)

    if (level === 'AAA') {
      return size === 'large' ? ratio >= 4.5 : ratio >= 7
    } else {
      return size === 'large' ? ratio >= 3 : ratio >= 4.5
    }
  },

  /**
   * Convert hex color to RGB
   */
  hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  },

  /**
   * Get high contrast version of a color
   */
  getHighContrastColor(backgroundColor: string): string {
    const luminance = this.getRelativeLuminance(backgroundColor)
    return luminance > 0.5 ? '#000000' : '#FFFFFF'
  }
}

/**
 * Animation accessibility helper functions
 */
export const accessibilityUtils = {
  /**
   * Check if user prefers reduced motion
   */
  prefersReducedMotion(): boolean {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  },

  /**
   * Check if user prefers high contrast
   */
  prefersHighContrast(): boolean {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-contrast: high)').matches
  },

  /**
   * Check if user has data saver enabled
   */
  prefersDataSaver(): boolean {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-data: reduce)').matches
  },

  /**
   * Get safe animation duration based on user preferences
   */
  getSafeDuration(baseDuration: number): number {
    if (this.prefersReducedMotion()) return 0
    if (this.prefersDataSaver()) return Math.min(baseDuration, 0.3)
    return baseDuration
  },

  /**
   * Get safe animation easing based on user preferences
   */
  getSafeEasing(baseEasing: string): string {
    if (this.prefersReducedMotion()) return 'linear'
    if (this.prefersHighContrast()) return 'easeOut'
    return baseEasing
  },

  /**
   * Create accessible animation variants
   */
  createAccessibleVariants(originalVariants: any, respectReducedMotion: boolean = true) {
    if (respectReducedMotion && this.prefersReducedMotion()) {
      return {
        initial: {},
        animate: {},
        exit: {}
      }
    }

    return originalVariants
  },

  /**
   * Add ARIA attributes to animated elements
   */
  getAccessibilityAttributes(
    isAnimated: boolean,
    animationDescription?: string,
    isLiveRegion: boolean = false
  ) {
    const attributes: Record<string, string> = {}

    if (isAnimated && animationDescription) {
      attributes['aria-label'] = animationDescription
    }

    if (isLiveRegion) {
      attributes['aria-live'] = 'polite'
      attributes['aria-atomic'] = 'true'
    }

    // Mark as decorative if animation is purely visual
    if (isAnimated && !animationDescription) {
      attributes['aria-hidden'] = 'true'
    }

    return attributes
  },

  /**
   * Announce animation state changes to screen readers
   */
  announceAnimationState(
    animationName: string,
    state: 'started' | 'completed' | 'paused',
    elementDescription?: string
  ) {
    const stateText = state === 'started' ? 'started' : state === 'completed' ? 'completed' : 'paused'
    const message = elementDescription
      ? `${elementDescription} animation ${stateText}: ${animationName}`
      : `Animation ${stateText}: ${animationName}`

    globalScreenReaderAnnouncer.announce(message)
  }
}

/**
 * Hook for managing keyboard navigation in animated components
 */
export function useKeyboardNavigation(
  items: string[],
  onSelect?: (item: string, index: number) => void,
  options: {
    orientation?: 'horizontal' | 'vertical'
    loop?: boolean
    activateOnFocus?: boolean
  } = {}
) {
  const [focusedIndex, setFocusedIndex] = useState(0)
  const {
    orientation = 'horizontal',
    loop = true,
    activateOnFocus = false
  } = options

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const isVertical = orientation === 'vertical'
    const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight'
    const prevKey = isVertical ? 'ArrowUp' : 'ArrowLeft'

    switch (e.key) {
      case nextKey:
        e.preventDefault()
        setFocusedIndex(prev => {
          const next = prev + 1
          return next >= items.length ? (loop ? 0 : prev) : next
        })
        break

      case prevKey:
        e.preventDefault()
        setFocusedIndex(prev => {
          const next = prev - 1
          return next < 0 ? (loop ? items.length - 1 : prev) : next
        })
        break

      case 'Home':
        e.preventDefault()
        setFocusedIndex(0)
        break

      case 'End':
        e.preventDefault()
        setFocusedIndex(items.length - 1)
        break

      case 'Enter':
      case ' ':
        e.preventDefault()
        if (onSelect) {
          onSelect(items[focusedIndex], focusedIndex)
        }
        break
    }
  }, [items, focusedIndex, loop, orientation, onSelect])

  useEffect(() => {
    if (activateOnFocus && onSelect) {
      onSelect(items[focusedIndex], focusedIndex)
    }
  }, [focusedIndex, items, onSelect, activateOnFocus])

  return {
    focusedIndex,
    focusedItem: items[focusedIndex],
    handleKeyDown,
    setFocusedIndex
  }
}