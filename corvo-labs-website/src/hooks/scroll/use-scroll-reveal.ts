/**
 * Advanced scroll-reveal hook with healthcare optimizations
 * Supports batch processing, performance monitoring, and accessibility
 */

'use client';

import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { useReducedMotion } from 'framer-motion';
import { ScrollRevealConfig, getAdaptiveScrollConfig, SCROLL_VARIANTS } from '@/lib/scroll-reveal/scroll-config';

export interface ScrollRevealOptions {
  variant?: keyof typeof SCROLL_VARIANTS;
  delay?: number;
  duration?: number;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  staggerDelay?: number;
  batchIndex?: number;
  config?: Partial<ScrollRevealConfig>;
  onViewportEnter?: () => void;
  onViewportLeave?: () => void;
}

export interface ScrollRevealReturn {
  ref: (node?: Element | null) => void;
  inView: boolean;
  isVisible: boolean;
  hasRevealed: boolean;
  variants: any;
  transition: any;
  shouldAnimate: boolean;
  performanceMetrics: {
    revealTime: number;
    animationDuration: number;
    fps: number;
  };
}

export function useScrollReveal(options: ScrollRevealOptions = {}): ScrollRevealReturn {
  const {
    variant = 'fadeInUp',
    delay = 0,
    duration,
    threshold,
    rootMargin,
    triggerOnce = true,
    staggerDelay = 0,
    batchIndex = 0,
    config: customConfig,
    onViewportEnter,
    onViewportLeave,
  } = options;

  // System preferences
  const shouldReduceMotion = useReducedMotion();

  // Configuration
  const config = useMemo(() => {
    const adaptiveConfig = getAdaptiveScrollConfig();
    return { ...adaptiveConfig, ...customConfig };
  }, [customConfig]);

  // State management
  const [hasRevealed, setHasRevealed] = useState(false);
  const [revealStartTime, setRevealStartTime] = useState<number>(0);
  const [performanceMetrics, setPerformanceMetrics] = useState({
    revealTime: 0,
    animationDuration: 0,
    fps: 60,
  });

  // Refs for performance tracking
  const frameCountRef = useRef(0);
  const animationFrameRef = useRef<number>();

  // Intersection Observer
  const { ref, inView } = useInView({
    threshold: threshold ?? config.threshold,
    rootMargin: rootMargin ?? config.rootMargin,
    triggerOnce: triggerOnce ?? config.triggerOnce,
  });

  // Calculate total delay including stagger
  const totalDelay = useMemo(() => {
    return delay + (staggerDelay * batchIndex);
  }, [delay, staggerDelay, batchIndex]);

  // Determine if animation should run
  const shouldAnimate = useMemo(() => {
    return !config.reducedMotion || !shouldReduceMotion;
  }, [config.reducedMotion, shouldReduceMotion]);

  // Get animation variants
  const variants = useMemo(() => {
    if (!shouldAnimate) {
      return {
        hidden: {},
        visible: {},
      };
    }

    const baseVariants = SCROLL_VARIANTS[variant];
    if (!baseVariants) return SCROLL_VARIANTS.fadeInUp;

    // Apply healthcare modifications
    if (config.highContrast) {
      return {
        hidden: {
          ...baseVariants.hidden,
          filter: 'none',
          transform: 'none',
        },
        visible: {
          ...baseVariants.visible,
          filter: 'none',
        },
      };
    }

    return baseVariants;
  }, [variant, shouldAnimate, config.highContrast]);

  // Animation transition configuration
  const transition = useMemo(() => {
    if (!shouldAnimate) {
      return { duration: 0 };
    }

    return {
      duration: duration ?? config.duration,
      delay: totalDelay,
      ease: config.easing,
      type: 'tween' as const,
    };
  }, [shouldAnimate, duration, totalDelay, config.duration, config.easing]);

  // Performance monitoring
  const startPerformanceTracking = useCallback(() => {
    setRevealStartTime(performance.now());
    frameCountRef.current = 0;

    const trackFrames = () => {
      frameCountRef.current++;
      animationFrameRef.current = requestAnimationFrame(trackFrames);
    };

    trackFrames();

    // Stop tracking after animation completes
    const trackingDuration = (duration ?? config.duration + totalDelay) * 1000;
    setTimeout(() => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      const endTime = performance.now();
      const revealTime = endTime - revealStartTime;
      const animationDuration = trackingDuration;
      const fps = frameCountRef.current / (trackingDuration / 1000);

      setPerformanceMetrics({
        revealTime,
        animationDuration,
        fps,
      });
    }, trackingDuration);
  }, [duration, config.duration, totalDelay, revealStartTime]);

  // Handle viewport changes
  useEffect(() => {
    if (inView && !hasRevealed) {
      setHasRevealed(true);
      startPerformanceTracking();
      onViewportEnter?.();
    } else if (!inView && hasRevealed && !triggerOnce) {
      onViewportLeave?.();
    }
  }, [inView, hasRevealed, triggerOnce, onViewportEnter, onViewportLeave, startPerformanceTracking]);

  // Determine visibility state
  const isVisible = useMemo(() => {
    if (triggerOnce && hasRevealed) return true;
    return inView;
  }, [inView, hasRevealed, triggerOnce]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return {
    ref,
    inView,
    isVisible,
    hasRevealed,
    variants,
    transition,
    shouldAnimate,
    performanceMetrics,
  };
}

// Batch scroll reveal for multiple elements
export function useBatchScrollReveal(count: number, options: ScrollRevealOptions = {}) {
  const {
    staggerDelay = 0.1,
    batchSize = 6,
    ...baseOptions
  } = options;

  const reveals = Array.from({ length: count }, (_, index) => {
    const batchIndex = Math.floor(index / batchSize);
    return useScrollReveal({
      ...baseOptions,
      staggerDelay,
      batchIndex,
    });
  });

  return reveals;
}

// Progressive reveal for sequential content
export function useProgressiveReveal(options: ScrollRevealOptions = {}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const baseReveal = useScrollReveal(options);

  const revealNext = useCallback(() => {
    setCurrentIndex(prev => prev + 1);
  }, []);

  const reset = useCallback(() => {
    setCurrentIndex(0);
  }, []);

  return {
    ...baseReveal,
    currentIndex,
    revealNext,
    reset,
    isRevealed: (index: number) => index <= currentIndex,
  };
}