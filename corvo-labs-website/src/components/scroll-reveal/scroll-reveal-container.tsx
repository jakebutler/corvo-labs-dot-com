/**
 * Advanced scroll-reveal container component
 * Healthcare-optimized with performance monitoring and accessibility
 */

'use client';

import React, { forwardRef, Children, cloneElement, isValidElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal, ScrollRevealOptions } from '@/hooks/scroll/use-scroll-reveal';
import { cn } from '@/lib/utils';

interface ScrollRevealContainerProps {
  children: React.ReactNode;
  className?: string;

  // Animation configuration
  variant?: 'fadeIn' | 'fadeInUp' | 'fadeInDown' | 'slideInLeft' | 'slideInRight' | 'scaleIn' | 'rotateIn' | 'perspectiveIn' | 'blurIn' | 'medicalPulse' | 'diagnosticReveal';
  delay?: number;
  duration?: number;
  staggerDelay?: number;
  batchSize?: number;

  // Visibility settings
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;

  // Healthcare settings
  healthcareMode?: boolean;
  reducedMotion?: boolean;
  highContrast?: boolean;

  // Performance
  performanceMode?: 'high' | 'medium' | 'low';

  // Events
  onViewportEnter?: () => void;
  onViewportLeave?: () => void;
  onRevealComplete?: (metrics: any) => void;

  // Advanced options
  customVariants?: any;
  customTransition?: any;
  debug?: boolean;
}

export const ScrollRevealContainer = forwardRef<HTMLDivElement, ScrollRevealContainerProps>(
  ({
    children,
    className,
    variant = 'fadeInUp',
    delay = 0,
    duration,
    staggerDelay = 0.1,
    batchSize = 6,
    threshold,
    rootMargin,
    triggerOnce = true,
    healthcareMode = false,
    reducedMotion,
    highContrast,
    performanceMode,
    onViewportEnter,
    onViewportLeave,
    onRevealComplete,
    customVariants,
    customTransition,
    debug = false,
  }, ref) => {
    // Enhanced configuration for healthcare mode
    const config: ScrollRevealOptions = {
      variant,
      delay,
      duration,
      threshold,
      rootMargin,
      triggerOnce,
      staggerDelay,
      config: {
        reducedMotion: reducedMotion ?? false,
        highContrast: highContrast ?? false,
        performanceMode: performanceMode ?? (healthcareMode ? 'medium' : 'high'),
      },
      onViewportEnter,
      onViewportLeave,
    };

    const {
      ref: scrollRef,
      inView,
      isVisible,
      hasRevealed,
      variants,
      transition,
      shouldAnimate,
      performanceMetrics,
    } = useScrollReveal(config);

    // Merge refs
    const mergedRef = (node: HTMLDivElement) => {
      scrollRef(node);
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    // Notify on reveal complete
    React.useEffect(() => {
      if (hasRevealed && onRevealComplete) {
        onRevealComplete(performanceMetrics);
      }
    }, [hasRevealed, onRevealComplete, performanceMetrics]);

    // Handle children with stagger animation
    const renderChildren = () => {
      if (!staggerDelay || staggerDelay <= 0) {
        return children;
      }

      return Children.map(children, (child, index) => {
        if (!isValidElement(child)) {
          return child;
        }

        return cloneElement(child, {
          ...child.props,
          'data-stagger-index': index,
          style: {
            ...child.props.style,
            '--stagger-delay': `${index * staggerDelay}s`,
          } as React.CSSProperties,
        });
      });
    };

    // Animation configuration
    const animationProps = shouldAnimate ? {
      initial: "hidden",
      animate: isVisible ? "visible" : "hidden",
      variants: customVariants || variants,
      transition: customTransition || transition,
    } : {};

    // Debug overlay
    const DebugOverlay = () => {
      if (!debug) return null;

      return (
        <div className="absolute top-2 right-2 bg-black/80 text-white text-xs p-2 rounded font-mono z-50">
          <div>In View: {inView ? 'Yes' : 'No'}</div>
          <div>Visible: {isVisible ? 'Yes' : 'No'}</div>
          <div>Revealed: {hasRevealed ? 'Yes' : 'No'}</div>
          <div>FPS: {performanceMetrics.fps.toFixed(1)}</div>
          <div>Reveal Time: {performanceMetrics.revealTime.toFixed(1)}ms</div>
        </div>
      );
    };

    // Healthcare mode indicator
    const HealthcareIndicator = () => {
      if (!healthcareMode || !hasRevealed) return null;

      return (
        <div className="absolute top-2 left-2 bg-blue-500/20 backdrop-blur-sm rounded-full px-2 py-1">
          <span className="text-xs text-blue-600 font-medium">Healthcare Mode</span>
        </div>
      );
    };

    return (
      <motion.div
        ref={mergedRef}
        className={cn(
          'relative',
          healthcareMode && 'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          className
        )}
        {...animationProps}
        tabIndex={healthcareMode ? 0 : -1}
        role={healthcareMode ? 'region' : undefined}
        aria-label={healthcareMode ? 'Scroll-revealed content' : undefined}
      >
        {renderChildren()}

        <DebugOverlay />
        <HealthcareIndicator />

        {/* Healthcare accessibility announcements */}
        {healthcareMode && hasRevealed && (
          <div className="sr-only" role="status" aria-live="polite">
            Content revealed: {variant} animation completed
          </div>
        )}
      </motion.div>
    );
  }
);

ScrollRevealContainer.displayName = 'ScrollRevealContainer';

// Specialized healthcare components
export const PatientInfoReveal: React.FC<Omit<ScrollRevealContainerProps, 'variant'>> = (props) => (
  <ScrollRevealContainer variant="fadeInUp" {...props} healthcareMode />
);

export const MedicalDataReveal: React.FC<Omit<ScrollRevealContainerProps, 'variant'>> = (props) => (
  <ScrollRevealContainer variant="scaleIn" {...props} healthcareMode />
);

export const DiagnosticReveal: React.FC<Omit<ScrollRevealContainerProps, 'variant'>> = (props) => (
  <ScrollRevealContainer variant="diagnosticReveal" {...props} healthcareMode />
);

export const TreatmentPlanReveal: React.FC<Omit<ScrollRevealContainerProps, 'variant'>> = (props) => (
  <ScrollRevealContainer variant="medicalPulse" {...props} healthcareMode />
);

export const EmergencyAlertReveal: React.FC<Omit<ScrollRevealContainerProps, 'variant'>> = (props) => (
  <ScrollRevealContainer
    variant="scaleIn"
    delay={0}
    duration={0.3}
    {...props}
    healthcareMode
    className={cn('border-2 border-red-500 bg-red-50', props.className)}
  />
);