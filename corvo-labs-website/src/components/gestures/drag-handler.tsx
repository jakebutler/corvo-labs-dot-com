/**
 * Advanced drag handler component with healthcare-optimized interactions
 * Supports complex drag patterns, momentum, and accessibility features
 */

import React, { useState, useRef, useCallback } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { useGestureState } from '@/hooks/gestures/use-gesture-state';
import { getAdaptiveConfig } from '@/lib/gestures/gesture-config';
import { cn } from '@/lib/utils';

interface DragHandlerProps {
  children: React.ReactNode;
  className?: string;

  // Drag configuration
  axis?: 'x' | 'y' | 'both';
  bounds?: { top?: number; right?: number; bottom?: number; left?: number } | 'parent';
  dragMomentum?: boolean;
  dragElastic?: number;

  // Callbacks
  onDragStart?: (offset: { x: number; y: number }) => void;
  onDrag?: (offset: { x: number; y: number }, info: PanInfo) => void;
  onDragEnd?: (offset: { x: number; y: number }, info: PanInfo) => void;

  // Healthcare settings
  healthcareMode?: boolean;
  reducedMotion?: boolean;
  snapToGrid?: boolean;
  gridSize?: number;

  // Visual feedback
  showDragHandle?: boolean;
  dragHandlePosition?: 'top' | 'right' | 'bottom' | 'left';

  // Constraints
  maxVelocity?: number;
  dampingRatio?: number;
}

export const DragHandler: React.FC<DragHandlerProps> = ({
  children,
  className,
  axis = 'both',
  bounds,
  dragMomentum = true,
  dragElastic = 0.2,
  onDragStart,
  onDrag,
  onDragEnd,
  healthcareMode = false,
  reducedMotion = false,
  snapToGrid = false,
  gridSize = 20,
  showDragHandle = false,
  dragHandlePosition = 'top',
  maxVelocity = 500,
  dampingRatio = 0.25,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragHandleHovered, setIsDragHandleHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartTime = useRef<number>(0);

  const config = getAdaptiveConfig();

  // Snap to grid function
  const snapToGridFn = useCallback((value: number) => {
    if (!snapToGrid) return value;
    return Math.round(value / gridSize) * gridSize;
  }, [snapToGrid, gridSize]);

  // Gesture state integration
  const gestureState = useGestureState({
    onDragStart: (offset) => {
      setIsDragging(true);
      dragStartTime.current = Date.now();
      onDragStart?.(offset);

      // Haptic feedback for healthcare devices
      if (healthcareMode && 'vibrate' in navigator && !config.healthcare.reducedMotion) {
        navigator.vibrate(5);
      }
    },
    onDragMove: (offset) => {
      const snappedOffset = {
        x: snapToGridFn(offset.x),
        y: snapToGridFn(offset.y),
      };
      setDragOffset(snappedOffset);
      onDrag?.(snappedOffset, {} as PanInfo);
    },
    onDragEnd: (offset, velocity) => {
      setIsDragging(false);
      dragStartTime.current = 0;

      // Apply momentum if enabled and not reduced motion
      if (dragMomentum && !reducedMotion) {
        const momentumX = velocity.x * dampingRatio * 100;
        const momentumY = velocity.y * dampingRatio * 100;

        const finalOffset = {
          x: snapToGridFn(offset.x + momentumX),
          y: snapToGridFn(offset.y + momentumY),
        };

        setDragOffset(finalOffset);
        onDragEnd?.(finalOffset, { offset: finalOffset, velocity } as PanInfo);
      } else {
        const snappedOffset = {
          x: snapToGridFn(offset.x),
          y: snapToGridFn(offset.y),
        };
        setDragOffset(snappedOffset);
        onDragEnd?.(snappedOffset, { offset: snappedOffset, velocity } as PanInfo);
      }

      // End haptic feedback
      if (healthcareMode && 'vibrate' in navigator && !config.healthcare.reducedMotion) {
        navigator.vibrate(10);
      }
    },
  });

  // Framer Motion drag handlers
  const handleDragStart = useCallback(() => {
    setIsDragging(true);
    dragStartTime.current = Date.now();
  }, []);

  const handleDrag = useCallback((event: any, info: PanInfo) => {
    if (reducedMotion) return;

    const snappedOffset = {
      x: snapToGridFn(info.offset.x),
      y: snapToGridFn(info.offset.y),
    };

    setDragOffset(snappedOffset);
    onDrag?.(snappedOffset, info);

    // Constrain velocity for healthcare safety
    const clampedVelocity = {
      x: Math.max(-maxVelocity, Math.min(maxVelocity, info.velocity.x)),
      y: Math.max(-maxVelocity, Math.min(maxVelocity, info.velocity.y)),
    };
  }, [reducedMotion, snapToGridFn, onDrag, maxVelocity]);

  const handleDragEnd = useCallback((event: any, info: PanInfo) => {
    setIsDragging(false);
    dragStartTime.current = 0;

    const snappedOffset = {
      x: snapToGridFn(info.offset.x),
      y: snapToGridFn(info.offset.y),
    };

    setDragOffset(snappedOffset);
    onDragEnd?.(snappedOffset, info);
  }, [snapToGridFn, onDragEnd]);

  // Keyboard accessibility for healthcare mode
  React.useEffect(() => {
    if (!healthcareMode) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const step = gridSize;
      let newOffset = { ...dragOffset };

      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          newOffset.y = snapToGridFn(dragOffset.y - step);
          break;
        case 'ArrowDown':
          event.preventDefault();
          newOffset.y = snapToGridFn(dragOffset.y + step);
          break;
        case 'ArrowLeft':
          event.preventDefault();
          newOffset.x = snapToGridFn(dragOffset.x - step);
          break;
        case 'ArrowRight':
          event.preventDefault();
          newOffset.x = snapToGridFn(dragOffset.x + step);
          break;
        case 'Home':
          event.preventDefault();
          newOffset = { x: 0, y: 0 };
          break;
        default:
          return;
      }

      setDragOffset(newOffset);
      onDrag?.(newOffset, {} as PanInfo);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [healthcareMode, dragOffset, gridSize, snapToGridFn, onDrag]);

  // Get drag handle styles
  const getDragHandleStyles = () => {
    const baseStyles = 'absolute w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing transition-colors z-10';

    switch (dragHandlePosition) {
      case 'top':
        return `${baseStyles} top-2 left-1/2 transform -translate-x-1/2`;
      case 'right':
        return `${baseStyles} right-2 top-1/2 transform -translate-y-1/2`;
      case 'bottom':
        return `${baseStyles} bottom-2 left-1/2 transform -translate-x-1/2`;
      case 'left':
        return `${baseStyles} left-2 top-1/2 transform -translate-y-1/2`;
      default:
        return `${baseStyles} top-2 left-1/2 transform -translate-x-1/2`;
    }
  };

  // Drag constraints based on axis
  const dragConstraints = axis === 'both' ? bounds : axis === 'x' ? { left: 0, right: 0 } : { top: 0, bottom: 0 };

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative',
        healthcareMode && 'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        className
      )}
      tabIndex={healthcareMode ? 0 : -1}
      role={healthcareMode ? 'application' : undefined}
      aria-label={healthcareMode ? 'Draggable content. Use arrow keys to move.' : undefined}
    >
      {/* Drag handle */}
      {showDragHandle && (
        <div
          className={getDragHandleStyles()}
          onMouseEnter={() => setIsDragHandleHovered(true)}
          onMouseLeave={() => setIsDragHandleHovered(false)}
          aria-label="Drag handle"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              'transition-transform',
              isDragHandleHovered && 'scale-110'
            )}
          >
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="19" r="1" />
            <circle cx="5" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
          </svg>
        </div>
      )}

      {/* Draggable content */}
      <motion.div
        drag={!reducedMotion ? axis : false}
        dragConstraints={dragConstraints}
        dragElastic={dragElastic}
        dragMomentum={dragMomentum && !reducedMotion}
        dragTransition={{
          bounceStiffness: 600,
          bounceDamping: 20,
          power: 0.3,
          timeConstant: 200,
        }}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        animate={{
          x: dragOffset.x,
          y: dragOffset.y,
        }}
        transition={{
          type: reducedMotion ? 'tween' : 'spring',
          stiffness: 300,
          damping: 30,
          duration: reducedMotion ? 0 : 0.3,
        }}
        style={{
          cursor: reducedMotion ? 'default' : isDragging ? 'grabbing' : 'grab',
          touchAction: axis === 'x' ? 'pan-y' : axis === 'y' ? 'pan-x' : 'none',
        }}
        whileDrag={reducedMotion ? {} : {
          scale: 1.02,
          zIndex: 50,
          transition: { duration: 0.2 },
        }}
        {...gestureState.handlers}
      >
        {children}
      </motion.div>

      {/* Healthcare mode indicator */}
      {healthcareMode && isDragging && (
        <div className="absolute top-2 right-2 z-40">
          <div className="bg-blue-500/20 backdrop-blur-sm rounded-full px-2 py-1">
            <span className="text-xs text-blue-600 font-medium">
              Dragging
            </span>
          </div>
        </div>
      )}

      {/* Position indicator for healthcare mode */}
      {healthcareMode && (dragOffset.x !== 0 || dragOffset.y !== 0) && (
        <div className="absolute bottom-2 left-2 z-40">
          <div className="bg-black/75 text-white px-2 py-1 rounded text-xs font-mono backdrop-blur-sm">
            X: {dragOffset.x.toFixed(0)}, Y: {dragOffset.y.toFixed(0)}
          </div>
        </div>
      )}

      {/* Grid overlay for snap to grid */}
      {snapToGrid && healthcareMode && (
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, #ccc 1px, transparent 1px),
              linear-gradient(to bottom, #ccc 1px, transparent 1px)
            `,
            backgroundSize: `${gridSize}px ${gridSize}px`,
          }}
        />
      )}

      {/* Accessibility instructions */}
      {healthcareMode && (
        <div className="sr-only">
          Draggable content. Use arrow keys to move. Press Home to reset position.
          {snapToGrid && ` Snaps to ${gridSize}px grid.`}
        </div>
      )}
    </div>
  );
};