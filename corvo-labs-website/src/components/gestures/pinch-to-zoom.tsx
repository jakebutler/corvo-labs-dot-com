/**
 * Healthcare-optimized pinch-to-zoom component
 * Provides smooth zoom interactions with accessibility support
 */

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGestureState } from '@/hooks/gestures/use-gesture-state';
import { getAdaptiveConfig } from '@/lib/gestures/gesture-config';
import { cn } from '@/lib/utils';

interface PinchToZoomProps {
  children: React.ReactNode;
  className?: string;

  // Zoom configuration
  minScale?: number;
  maxScale?: number;
  initialScale?: number;

  // Callbacks
  onZoomStart?: (scale: number) => void;
  onZoomChange?: (scale: number) => void;
  onZoomEnd?: (scale: number) => void;

  // Healthcare settings
  healthcareMode?: boolean;
  reducedMotion?: boolean;
  highContrast?: boolean;

  // Visual feedback
  showZoomControls?: boolean;
  showZoomIndicator?: boolean;

  // Animation settings
  animationDuration?: number;
  enableInertia?: boolean;
}

export const PinchToZoom: React.FC<PinchToZoomProps> = ({
  children,
  className,
  minScale = 0.5,
  maxScale = 3.0,
  initialScale = 1.0,
  onZoomStart,
  onZoomChange,
  onZoomEnd,
  healthcareMode = false,
  reducedMotion = false,
  highContrast = false,
  showZoomControls = true,
  showZoomIndicator = true,
  animationDuration = 0.25,
  enableInertia = true,
}) => {
  const [scale, setScale] = useState(initialScale);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScaleRef = useRef(initialScale);

  const config = getAdaptiveConfig();

  // Gesture state management
  const gestureState = useGestureState({
    onPinchStart: (data) => {
      setIsZooming(true);
      lastScaleRef.current = scale;
      onZoomStart?.(scale);
    },
    onPinchMove: (data) => {
      if (reducedMotion) return;

      const newScale = Math.max(
        minScale,
        Math.min(maxScale, scale * data.scale)
      );

      setScale(newScale);
      onZoomChange?.(newScale);

      // Update position to center on pinch center
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        setPosition({
          x: centerX - (centerX * newScale) / scale,
          y: centerY - (centerY * newScale) / scale,
        });
      }
    },
    onPinchEnd: (data) => {
      setIsZooming(false);
      onZoomEnd?.(scale);

      // Haptic feedback for healthcare devices
      if (healthcareMode && 'vibrate' in navigator && !config.healthcare.reducedMotion) {
        navigator.vibrate(15);
      }
    },
    onDoubleTap: (point) => {
      // Double tap to reset zoom
      if (!reducedMotion) {
        setScale(initialScale);
        setPosition({ x: 0, y: 0 });
        onZoomEnd?.(initialScale);
      }
    },
  });

  // Zoom control functions
  const zoomIn = useCallback(() => {
    const newScale = Math.min(maxScale, scale + 0.25);
    setScale(newScale);
    onZoomChange?.(newScale);
  }, [scale, maxScale, onZoomChange]);

  const zoomOut = useCallback(() => {
    const newScale = Math.max(minScale, scale - 0.25);
    setScale(newScale);
    onZoomChange?.(newScale);
  }, [scale, minScale, onZoomChange]);

  const resetZoom = useCallback(() => {
    setScale(initialScale);
    setPosition({ x: 0, y: 0 });
    onZoomEnd?.(initialScale);
  }, [initialScale, onZoomEnd]);

  // Keyboard accessibility
  React.useEffect(() => {
    if (!healthcareMode) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case '+':
        case '=':
          event.preventDefault();
          zoomIn();
          break;
        case '-':
        case '_':
          event.preventDefault();
          zoomOut();
          break;
        case '0':
          event.preventDefault();
          resetZoom();
          break;
        case 'Escape':
          event.preventDefault();
          resetZoom();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [healthcareMode, zoomIn, zoomOut, resetZoom]);

  // Show controls on hover or focus
  const handleMouseEnter = () => setShowControls(true);
  const handleMouseLeave = () => setShowControls(false);
  const handleFocus = () => setShowControls(true);
  const handleBlur = () => setShowControls(false);

  // Zoom indicator variants
  const zoomIndicatorVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: 'easeOut' }
    },
    exit: {
      opacity: 0,
      y: 10,
      transition: { duration: 0.2, ease: 'easeIn' }
    },
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden rounded-lg',
        healthcareMode && 'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={healthcareMode ? 0 : -1}
      role={healthcareMode ? 'application' : undefined}
      aria-label={healthcareMode ? 'Zoomable content. Use + and - keys to zoom.' : undefined}
    >
      {/* Zoom controls */}
      <AnimatePresence>
        {showZoomControls && showControls && (
          <motion.div
            className="absolute top-4 right-4 z-50 flex flex-col gap-2"
            variants={zoomIndicatorVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div
              className={cn(
                'bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border',
                highContrast ? 'border-gray-800' : 'border-gray-200'
              )}
            >
              <button
                onClick={zoomIn}
                disabled={scale >= maxScale}
                className={cn(
                  'p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
                  healthcareMode && 'focus:ring-2 focus:ring-blue-500 focus:ring-inset'
                )}
                aria-label="Zoom in"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </button>

              <div className="border-t border-gray-200" />

              <button
                onClick={zoomOut}
                disabled={scale <= minScale}
                className={cn(
                  'p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
                  healthcareMode && 'focus:ring-2 focus:ring-blue-500 focus:ring-inset'
                )}
                aria-label="Zoom out"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </button>

              <div className="border-t border-gray-200" />

              <button
                onClick={resetZoom}
                disabled={scale === initialScale}
                className={cn(
                  'p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
                  healthcareMode && 'focus:ring-2 focus:ring-blue-500 focus:ring-inset'
                )}
                aria-label="Reset zoom"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Zoom indicator */}
      <AnimatePresence>
        {showZoomIndicator && isZooming && (
          <motion.div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50"
            variants={zoomIndicatorVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div
              className={cn(
                'bg-black/75 text-white px-3 py-2 rounded-full text-sm font-medium backdrop-blur-sm',
                highContrast && 'bg-gray-900 text-white border border-gray-600'
              )}
            >
              {Math.round(scale * 100)}%
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content container */}
      <motion.div
        className="w-full h-full"
        animate={{
          scale,
          x: position.x,
          y: position.y,
        }}
        transition={{
          type: reducedMotion ? 'tween' : 'spring',
          stiffness: enableInertia ? 300 : 600,
          damping: enableInertia ? 30 : 25,
          duration: reducedMotion ? 0 : animationDuration,
        }}
        style={{
          transformOrigin: 'center',
        }}
        {...gestureState.handlers}
      >
        {children}
      </motion.div>

      {/* Healthcare mode overlay */}
      {healthcareMode && scale > 1.1 && (
        <div className="absolute top-4 left-4 z-40">
          <div className="bg-blue-500/20 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-xs text-blue-600 font-medium">
              Zoom: {Math.round(scale * 100)}%
            </span>
          </div>
        </div>
      )}

      {/* Accessibility instructions */}
      {healthcareMode && (
        <div className="sr-only">
          Pinch to zoom or use + and - keys. Double tap to reset. Press Escape to exit zoom.
        </div>
      )}
    </div>
  );
};