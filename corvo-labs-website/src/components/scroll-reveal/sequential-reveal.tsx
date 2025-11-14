/**
 * Sequential scroll-reveal component for progressive content display
 * Healthcare-optimized for step-by-step information presentation
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal, ScrollRevealOptions } from '@/hooks/scroll/use-scroll-reveal';
import { cn } from '@/lib/utils';

interface SequentialRevealProps {
  children: React.ReactNode[];
  className?: string;

  // Animation settings
  variant?: 'fadeIn' | 'fadeInUp' | 'slideInLeft' | 'scaleIn';
  staggerDelay?: number;
  autoAdvance?: boolean;
  autoAdvanceDelay?: number;

  // Progress control
  allowManualControl?: boolean;
  showProgress?: boolean;
  showNavigation?: boolean;

  // Healthcare settings
  healthcareMode?: boolean;
  stepValidation?: boolean;
  requiredSteps?: number[];

  // Events
  onStepChange?: (stepIndex: number) => void;
  onSequenceComplete?: () => void;
  onStepValidation?: (stepIndex: number, isValid: boolean) => void;

  // Accessibility
  ariaLabel?: string;
  stepLabels?: string[];
}

export const SequentialReveal: React.FC<SequentialRevealProps> = ({
  children,
  className,
  variant = 'fadeInUp',
  staggerDelay = 0.3,
  autoAdvance = false,
  autoAdvanceDelay = 2000,
  allowManualControl = true,
  showProgress = true,
  showNavigation = false,
  healthcareMode = false,
  stepValidation = false,
  requiredSteps = [],
  onStepChange,
  onSequenceComplete,
  onStepValidation,
  ariaLabel = 'Sequential content reveal',
  stepLabels,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [validatedSteps, setValidatedSteps] = useState<Set<number>>(new Set());
  const [isComplete, setIsComplete] = useState(false);
  const autoAdvanceTimeoutRef = useRef<NodeJS.Timeout>();

  const totalSteps = React.Children.count(children);

  // Initialize scroll reveals for each step
  const scrollReveals = children.map((_, index) => {
    const config: ScrollRevealOptions = {
      variant,
      delay: index * staggerDelay,
      triggerOnce: true,
      threshold: 0.3,
      onViewportEnter: () => {
        if (index === currentStep && !isComplete) {
          handleStepReveal(index);
        }
      },
    };

    return useScrollReveal(config);
  });

  // Handle step reveal
  const handleStepReveal = (stepIndex: number) => {
    if (stepIndex > currentStep) {
      setCurrentStep(stepIndex);
      onStepChange?.(stepIndex);

      // Auto-advance logic
      if (autoAdvance && stepIndex < totalSteps - 1) {
        autoAdvanceTimeoutRef.current = setTimeout(() => {
          setCurrentStep(prev => prev + 1);
        }, autoAdvanceDelay);
      }

      // Check for sequence completion
      if (stepIndex === totalSteps - 1) {
        setIsComplete(true);
        onSequenceComplete?.();
      }
    }
  };

  // Manual navigation
  const goToStep = (stepIndex: number) => {
    if (!allowManualControl) return;

    // Clear any pending auto-advance
    if (autoAdvanceTimeoutRef.current) {
      clearTimeout(autoAdvanceTimeoutRef.current);
    }

    setCurrentStep(stepIndex);
    onStepChange?.(stepIndex);

    if (stepIndex === totalSteps - 1) {
      setIsComplete(true);
      onSequenceComplete?.();
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      goToStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      goToStep(currentStep - 1);
    }
  };

  // Step validation for healthcare workflows
  const validateStep = (stepIndex: number, isValid: boolean) => {
    if (!stepValidation) return;

    if (isValid) {
      setValidatedSteps(prev => new Set([...prev, stepIndex]));
    } else {
      setValidatedSteps(prev => {
        const newSet = new Set(prev);
        newSet.delete(stepIndex);
        return newSet;
      });
    }

    onStepValidation?.(stepIndex, isValid);
  };

  // Check if all required steps are validated
  const areRequiredStepsValid = () => {
    if (requiredSteps.length === 0) return true;
    return requiredSteps.every(step => validatedSteps.has(step));
  };

  // Cleanup auto-advance timeout
  useEffect(() => {
    return () => {
      if (autoAdvanceTimeoutRef.current) {
        clearTimeout(autoAdvanceTimeoutRef.current);
      }
    };
  }, []);

  // Progress calculation
  const progress = totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0;

  return (
    <div
      className={cn('relative', className)}
      role={healthcareMode ? 'region' : undefined}
      aria-label={ariaLabel}
      aria-live={healthcareMode ? 'polite' : undefined}
    >
      {/* Progress bar */}
      {showProgress && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep + 1} of {totalSteps}
            </span>
            {healthcareMode && stepValidation && (
              <span className={cn(
                'text-sm font-medium',
                areRequiredStepsValid() ? 'text-green-600' : 'text-orange-600'
              )}>
                {areRequiredStepsValid() ? 'All Steps Validated' : 'Validation Required'}
              </span>
            )}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className={cn(
                'h-2 rounded-full',
                healthcareMode
                  ? areRequiredStepsValid()
                    ? 'bg-green-500'
                    : 'bg-orange-500'
                  : 'bg-blue-500'
              )}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>
      )}

      {/* Step indicators */}
      {showProgress && totalSteps > 1 && (
        <div className="flex items-center justify-center space-x-2 mb-8">
          {Array.from({ length: totalSteps }, (_, index) => (
            <button
              key={index}
              onClick={() => goToStep(index)}
              disabled={!allowManualControl}
              className={cn(
                'w-3 h-3 rounded-full transition-all duration-200',
                index <= currentStep
                  ? healthcareMode
                    ? validatedSteps.has(index)
                      ? 'bg-green-500'
                      : 'bg-orange-500'
                    : 'bg-blue-500'
                  : 'bg-gray-300',
                allowManualControl && 'hover:scale-110 cursor-pointer',
                !allowManualControl && 'cursor-not-allowed opacity-60'
              )}
              aria-label={`Go to step ${index + 1}`}
              aria-current={index === currentStep ? 'step' : undefined}
            >
              {stepLabels && (
                <span className="sr-only">{stepLabels[index]}</span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Content steps */}
      <div className="space-y-6">
        {children.map((child, index) => {
          const reveal = scrollReveals[index];
          const isVisible = index <= currentStep;
          const isCurrentStep = index === currentStep;

          return (
            <AnimatePresence key={index}>
              {isVisible && (
                <motion.div
                  ref={reveal.ref}
                  initial="hidden"
                  animate={reveal.isVisible ? "visible" : "hidden"}
                  variants={reveal.variants}
                  transition={reveal.transition}
                  className={cn(
                    'relative',
                    healthcareMode && isCurrentStep && 'ring-2 ring-blue-500 ring-offset-2 rounded-lg p-4'
                  )}
                >
                  {/* Step validation controls */}
                  {healthcareMode && stepValidation && requiredSteps.includes(index) && (
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <button
                        onClick={() => validateStep(index, true)}
                        className={cn(
                          'px-2 py-1 text-xs rounded',
                          validatedSteps.has(index)
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        )}
                        aria-label={`Validate step ${index + 1}`}
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => validateStep(index, false)}
                        className={cn(
                          'px-2 py-1 text-xs rounded',
                          !validatedSteps.has(index)
                            ? 'bg-red-100 text-red-700'
                            : 'bg-gray-100 text-gray-700'
                        )}
                        aria-label={`Invalidate step ${index + 1}`}
                      >
                        ✗
                      </button>
                    </div>
                  )}

                  {/* Step number indicator */}
                  {showProgress && (
                    <div className="flex items-center mb-4">
                      <div className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                        healthcareMode
                          ? validatedSteps.has(index)
                            ? 'bg-green-100 text-green-700'
                            : isCurrentStep
                              ? 'bg-orange-100 text-orange-700'
                              : 'bg-gray-100 text-gray-700'
                          : index <= currentStep
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700'
                      )}>
                        {index + 1}
                      </div>
                      {stepLabels && (
                        <span className="ml-3 text-sm font-medium text-gray-700">
                          {stepLabels[index]}
                        </span>
                      )}
                    </div>
                  )}

                  {child}
                </motion.div>
              )}
            </AnimatePresence>
          );
        })}
      </div>

      {/* Navigation controls */}
      {showNavigation && allowManualControl && (
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={cn(
              'px-4 py-2 rounded-lg font-medium transition-colors',
              currentStep === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : healthcareMode
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
            )}
            aria-label="Previous step"
          >
            Previous
          </button>

          <div className="text-sm text-gray-600">
            {currentStep + 1} / {totalSteps}
          </div>

          <button
            onClick={nextStep}
            disabled={currentStep === totalSteps - 1}
            className={cn(
              'px-4 py-2 rounded-lg font-medium transition-colors',
              currentStep === totalSteps - 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : healthcareMode
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
            )}
            aria-label="Next step"
          >
            {currentStep === totalSteps - 1 ? 'Complete' : 'Next'}
          </button>
        </div>
      )}

      {/* Healthcare completion message */}
      {healthcareMode && isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            'mt-8 p-4 rounded-lg text-center',
            areRequiredStepsValid()
              ? 'bg-green-50 border border-green-200'
              : 'bg-orange-50 border border-orange-200'
          )}
        >
          <div className={cn(
            'text-lg font-medium',
            areRequiredStepsValid() ? 'text-green-800' : 'text-orange-800'
          )}>
            {areRequiredStepsValid() ? '✓ Process Complete' : '⚠ Action Required'}
          </div>
          <div className={cn(
            'text-sm mt-1',
            areRequiredStepsValid() ? 'text-green-600' : 'text-orange-600'
          )}>
            {areRequiredStepsValid()
              ? 'All steps have been successfully completed and validated.'
              : 'Some required steps need validation before completion.'}
          </div>
        </motion.div>
      )}

      {/* Accessibility announcements */}
      <div className="sr-hidden" aria-live="polite" aria-atomic="true">
        {currentStep > 0 && `Step ${currentStep + 1} of ${totalSteps} revealed`}
        {isComplete && 'All steps have been revealed'}
      </div>
    </div>
  );
};