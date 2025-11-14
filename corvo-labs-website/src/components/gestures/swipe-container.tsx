/**
 * Enhanced swipe container component with healthcare-optimized interactions
 * Provides comprehensive swipe gesture support with visual feedback
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeGestures } from '@/hooks/gestures/use-swipe-gestures';
import { cn } from '@/lib/utils';

interface SwipeContainerProps {
  children: React.ReactNode;
  className?: string;

  // Swipe configuration
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;

  // Visual feedback
  showFeedback?: boolean;
  feedbackColor?: string;

  // Healthcare settings
  healthcareMode?: boolean;
  reducedMotion?: boolean;

  // Container dimensions
  threshold?: number;
  damping?: number;

  // Animation settings
  animationDuration?: number;
  bounceStiffness?: number;
}

export const SwipeContainer: React.FC<SwipeContainerProps> = ({
  children,
  className,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  showFeedback = true,
  feedbackColor = '#3B82F6',
  healthcareMode = false,
  reducedMotion = false,
  threshold = 50,
  damping = 25,
  animationDuration = 0.3,
  bounceStiffness = 400,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showSwipeIndicator, setShowSwipeIndicator] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | 'up' | 'down' | null>(null);

  // Enhanced swipe gesture handling
  const swipeState = useSwipeGestures(
    {
      onSwipeLeft: (velocity) => {
        onSwipeLeft?.();
        triggerSwipeAnimation('left', velocity);
      },
      onSwipeRight: (velocity) => {
        onSwipeRight?.();
        triggerSwipeAnimation('right', velocity);
      },
      onSwipeUp: (velocity) => {
        onSwipeUp?.();
        triggerSwipeAnimation('up', velocity);
      },
      onSwipeDown: (velocity) => {
        onSwipeDown?.();
        triggerSwipeAnimation('down', velocity);
      },
    },
    {
      directions: {
        left: !!onSwipeLeft,
        right: !!onSwipeRight,
        up: !!onSwipeUp,
        down: !!onSwipeDown,
      },
      hapticFeedback: healthcareMode,
      reducedMotion,
      visualFeedback: showFeedback,
      debounceMs: 200,
    }
  );

  // Trigger swipe animation feedback
  const triggerSwipeAnimation = (direction: 'left' | 'right' | 'up' | 'down', velocity: any) => {
    setSwipeDirection(direction);
    setShowSwipeIndicator(true);

    // Auto-hide indicator after animation
    setTimeout(() => {
      setShowSwipeIndicator(false);
    }, animationDuration * 1000);
  };

  // Handle drag constraints
  const handleDrag = useCallback((event: any, info: any) => {
    if (reducedMotion) return;

    setDragOffset({ x: info.offset.x, y: info.offset.y });
    setIsDragging(true);

    // Determine swipe direction based on drag
    const { x, y } = info.offset;
    if (Math.abs(x) > Math.abs(y)) {
      setSwipeDirection(x > 0 ? 'right' : 'left');
    } else {
      setSwipeDirection(y > 0 ? 'down' : 'up');
    }
  }, [reducedMotion]);

  const handleDragEnd = useCallback((event: any, info: any) => {
    if (reducedMotion) return;

    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });

    // Check if drag meets threshold for swipe
    const { x, y } = info.offset;
    const { vx, vy } = info.velocity;

    if (Math.abs(x) > threshold || Math.abs(vx) > 500) {
      if (x > 0 && onSwipeRight) onSwipeRight();
      else if (x < 0 && onSwipeLeft) onSwipeLeft();
    }

    if (Math.abs(y) > threshold || Math.abs(vy) > 500) {
      if (y > 0 && onSwipeDown) onSwipeDown();
      else if (y < 0 && onSwipeUp) onSwipeUp();
    }
  }, [threshold, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, reducedMotion]);

  // Healthcare-specific keyboard navigation
  useEffect(() => {
    if (!healthcareMode) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          onSwipeLeft?.();
          triggerSwipeAnimation('left', { magnitude: 1 });
          break;
        case 'ArrowRight':
          onSwipeRight?.();
          triggerSwipeAnimation('right', { magnitude: 1 });
          break;
        case 'ArrowUp':
          onSwipeUp?.();
          triggerSwipeAnimation('up', { magnitude: 1 });
          break;
        case 'ArrowDown':
          onSwipeDown?.();
          triggerSwipeAnimation('down', { magnitude: 1 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [healthcareMode, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown]);

  // Swipe indicator animations
  const swipeIndicatorVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2, ease: 'easeOut' }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2, ease: 'easeIn' }
    },
  };

  const getSwipeIndicatorPosition = () => {
    switch (swipeDirection) {
      case 'left':
        return { left: '10%', top: '50%', transform: 'translate(-50%, -50%)' };
      case 'right':
        return { right: '10%', top: '50%', transform: 'translate(50%, -50%)' };
      case 'up':
        return { left: '50%', top: '10%', transform: 'translate(-50%, -50%)' };
      case 'down':
        return { left: '50%', bottom: '10%', transform: 'translate(-50%, 50%)' };
      default:
        return { left: '50%', top: '50%', transform: 'translate(-50%, -50%)' };
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden touch-pan-y',
        healthcareMode && 'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        className
      )}
      {...swipeState.handlers}
      tabIndex={healthcareMode ? 0 : -1}
      role={healthcareMode ? 'button' : undefined}
      aria-label={healthcareMode ? 'Swipe container with arrow key navigation' : undefined}
    >
      {/* Main content with drag support */}
      <motion.div
        drag={!reducedMotion}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.1}
        dragMomentum={false}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        transition={{
          type: 'spring',
          stiffness: bounceStiffness,
          damping,
          duration: reducedMotion ? 0 : animationDuration,
        }}
        className="h-full"
        whileTap={reducedMotion ? {} : { scale: healthcareMode ? 1.02 : 1.01 }}
        style={{
          cursor: reducedMotion ? 'default' : isDragging ? 'grabbing' : 'grab',
        }}
      >
        {children}
      </motion.div>

      {/* Visual swipe feedback */}
      <AnimatePresence>
        {showFeedback && showSwipeIndicator && swipeDirection && (
          <motion.div
            className="absolute z-50 pointer-events-none"
            style={getSwipeIndicatorPosition()}
            variants={swipeIndicatorVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div
              className="rounded-full p-2 backdrop-blur-sm border border-white/20"
              style={{
                backgroundColor: feedbackColor + '20',
                borderColor: feedbackColor + '40',
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke={feedbackColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn(
                  'transition-transform',
                  swipeDirection === 'left' && 'rotate-180',
                  swipeDirection === 'up' && '-rotate-90',
                  swipeDirection === 'down' && 'rotate-90'
                )}
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Healthcare mode indicator */}
      {healthcareMode && (
        <div className="absolute top-2 right-2 z-40">
          <div className="bg-blue-500/20 backdrop-blur-sm rounded-full px-2 py-1">
            <span className="text-xs text-blue-600 font-medium">Gesture Mode</span>
          </div>
        </div>
      )}

      {/* Accessibility hints */}
      {healthcareMode && (
        <div className="sr-only">
          Swipe container with enhanced gesture support. Use arrow keys for navigation or swipe gestures on touch devices.
        </div>
      )}
    </div>
  );
};