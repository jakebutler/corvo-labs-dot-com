/**
 * Enhanced gesture state management hook
 * Handles complex gesture states with healthcare-specific optimizations
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { Point, TouchPoint, Velocity, SwipeDirection, PinchData } from '@/lib/gestures/gesture-utils';
import { GestureConfig, getAdaptiveConfig } from '@/lib/gestures/gesture-config';

export interface GestureState {
  // Touch state
  isActive: boolean;
  touches: TouchPoint[];
  startPoint: Point | null;
  currentPoint: Point | null;
  lastPoint: Point | null;

  // Gesture recognition
  isSwipe: boolean;
  isPinch: boolean;
  isDrag: boolean;
  isTap: boolean;
  isLongPress: boolean;

  // Gesture data
  velocity: Velocity;
  swipeDirection: SwipeDirection;
  pinchData: PinchData;
  dragOffset: { x: number; y: number };
  scale: number;

  // Healthcare state
  accessibilityMode: boolean;
  reducedMotion: boolean;
}

export interface GestureCallbacks {
  onTouchStart?: (touches: TouchPoint[]) => void;
  onTouchMove?: (touches: TouchPoint[]) => void;
  onTouchEnd?: (touches: TouchPoint[]) => void;

  onSwipeStart?: (direction: SwipeDirection) => void;
  onSwipeEnd?: (direction: SwipeDirection, velocity: Velocity) => void;

  onPinchStart?: (data: PinchData) => void;
  onPinchMove?: (data: PinchData) => void;
  onPinchEnd?: (data: PinchData) => void;

  onDragStart?: (offset: { x: number; y: number }) => void;
  onDragMove?: (offset: { x: number; y: number }) => void;
  onDragEnd?: (offset: { x: number; y: number }, velocity: Velocity) => void;

  onTap?: (point: Point) => void;
  onDoubleTap?: (point: Point) => void;
  onLongPress?: (point: Point) => void;

  // Healthcare callbacks
  onAccessibilityRequest?: () => void;
}

export const useGestureState = (callbacks: GestureCallbacks = {}) => {
  const config = getAdaptiveConfig();
  const gestureTimeoutRef = useRef<NodeJS.Timeout>();
  const longPressTimeoutRef = useRef<NodeJS.Timeout>();
  const lastTapRef = useRef<Point | null>(null);
  const gestureStartRef = useRef<number>(0);

  const [state, setState] = useState<GestureState>({
    // Touch state
    isActive: false,
    touches: [],
    startPoint: null,
    currentPoint: null,
    lastPoint: null,

    // Gesture recognition
    isSwipe: false,
    isPinch: false,
    isDrag: false,
    isTap: false,
    isLongPress: false,

    // Gesture data
    velocity: { x: 0, y: 0, magnitude: 0, angle: 0 },
    swipeDirection: { horizontal: null, vertical: null, primary: null },
    pinchData: { scale: 1, center: { x: 0, y: 0, timestamp: 0 }, distance: 0, velocity: 0 },
    dragOffset: { x: 0, y: 0 },
    scale: 1,

    // Healthcare state
    accessibilityMode: config.healthcare.highContrast,
    reducedMotion: config.healthcare.reducedMotion,
  });

  const updateState = useCallback((updates: Partial<GestureState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const resetState = useCallback(() => {
    updateState({
      isActive: false,
      touches: [],
      startPoint: null,
      currentPoint: null,
      lastPoint: null,
      isSwipe: false,
      isPinch: false,
      isDrag: false,
      isTap: false,
      isLongPress: false,
      velocity: { x: 0, y: 0, magnitude: 0, angle: 0 },
      swipeDirection: { horizontal: null, vertical: null, primary: null },
      pinchData: { scale: 1, center: { x: 0, y: 0, timestamp: 0 }, distance: 0, velocity: 0 },
      dragOffset: { x: 0, y: 0 },
      scale: 1,
    });

    // Clear timeouts
    if (gestureTimeoutRef.current) {
      clearTimeout(gestureTimeoutRef.current);
    }
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
    }
  }, [updateState]);

  const handleTouchStart = useCallback((nativeEvent: TouchEvent) => {
    const touches = Array.from(nativeEvent.touches).map(touch => ({
      x: touch.clientX,
      y: touch.clientY,
      timestamp: Date.now(),
      id: touch.identifier,
      force: touch.force,
    }));

    const currentPoint = touches[0];
    gestureStartRef.current = Date.now();

    updateState({
      isActive: true,
      touches,
      startPoint: currentPoint,
      currentPoint,
      lastPoint: currentPoint,
    });

    // Set long press timer
    if (touches.length === 1 && !config.healthcare.reducedMotion) {
      longPressTimeoutRef.current = setTimeout(() => {
        if (state.isActive && currentPoint) {
          updateState({ isLongPress: true });
          callbacks.onLongPress?.(currentPoint);
        }
      }, config.longPress.duration);
    }

    callbacks.onTouchStart?.(touches);

    // Detect pinch start
    if (touches.length === 2) {
      updateState({ isPinch: true });
      const pinchData = { scale: 1, center: touches[0], distance: 0, velocity: 0 };
      callbacks.onPinchStart?.(pinchData);
    }
  }, [updateState, callbacks, config]);

  const handleTouchMove = useCallback((nativeEvent: TouchEvent) => {
    if (!state.isActive) return;

    const touches = Array.from(nativeEvent.touches).map(touch => ({
      x: touch.clientX,
      y: touch.clientY,
      timestamp: Date.now(),
      id: touch.identifier,
      force: touch.force,
    }));

    const currentPoint = touches[0];
    const lastPoint = state.lastPoint || currentPoint;

    // Calculate velocity
    const velocity = {
      x: (currentPoint.x - lastPoint.x) / (currentPoint.timestamp - lastPoint.timestamp),
      y: (currentPoint.y - lastPoint.y) / (currentPoint.timestamp - lastPoint.timestamp),
      magnitude: 0,
      angle: 0,
    };
    velocity.magnitude = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
    velocity.angle = Math.atan2(velocity.y, velocity.x) * (180 / Math.PI);

    // Calculate drag offset
    const dragOffset = state.startPoint ? {
      x: currentPoint.x - state.startPoint.x,
      y: currentPoint.y - state.startPoint.y,
    } : { x: 0, y: 0 };

    // Clear long press if moved too much
    if (longPressTimeoutRef.current) {
      const displacement = Math.sqrt(dragOffset.x * dragOffset.x + dragOffset.y * dragOffset.y);
      if (displacement > config.longPress.maxDisplacement) {
        clearTimeout(longPressTimeoutRef.current);
        updateState({ isLongPress: false });
      }
    }

    // Update gesture states
    const newState: Partial<GestureState> = {
      touches,
      currentPoint,
      lastPoint,
      velocity,
      dragOffset,
    };

    // Detect swipe
    if (velocity.magnitude > config.swipe.velocityThreshold) {
      const angle = Math.atan2(velocity.y, velocity.x) * (180 / Math.PI);
      const normalizedAngle = ((angle % 360) + 360) % 360;

      let horizontal: 'left' | 'right' | null = null;
      let vertical: 'up' | 'down' | null = null;

      if (Math.abs(velocity.x) > Math.abs(velocity.y)) {
        horizontal = velocity.x > 0 ? 'right' : 'left';
      } else {
        vertical = velocity.y > 0 ? 'down' : 'up';
      }

      newState.isSwipe = true;
      newState.swipeDirection = { horizontal, vertical, primary: horizontal || vertical };
    }

    // Detect drag
    const displacement = Math.sqrt(dragOffset.x * dragOffset.x + dragOffset.y * dragOffset.y);
    if (displacement > config.tap.maxDisplacement) {
      newState.isDrag = true;
      newState.isTap = false;
    }

    // Handle pinch
    if (touches.length === 2 && state.isPinch) {
      const distance = Math.sqrt(
        Math.pow(touches[1].x - touches[0].x, 2) +
        Math.pow(touches[1].y - touches[0].y, 2)
      );

      const center = {
        x: (touches[0].x + touches[1].x) / 2,
        y: (touches[0].y + touches[1].y) / 2,
        timestamp: Date.now(),
      };

      const scale = state.pinchData.distance ? distance / state.pinchData.distance : 1;
      const pinchVelocity = Math.abs(scale - 1) * 1000;

      newState.pinchData = { scale, center, distance, velocity: pinchVelocity };
      newState.scale = Math.max(config.pinch.minScale, Math.min(config.pinch.maxScale, state.scale * scale));

      callbacks.onPinchMove?.(newState.pinchData);
    }

    updateState(newState);

    // Trigger callbacks
    if (newState.isDrag) {
      callbacks.onDragMove?.(dragOffset);
    }

    callbacks.onTouchMove?.(touches);
  }, [state, updateState, callbacks, config]);

  const handleTouchEnd = useCallback((nativeEvent: TouchEvent) => {
    if (!state.isActive) return;

    const touches = Array.from(nativeEvent.touches).map(touch => ({
      x: touch.clientX,
      y: touch.clientY,
      timestamp: Date.now(),
      id: touch.identifier,
      force: touch.force,
    }));

    // Clear long press timer
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
    }

    // Handle tap detection
    if (state.currentPoint && !state.isSwipe && !state.isDrag && !state.isPinch && !state.isLongPress) {
      const gestureDuration = Date.now() - gestureStartRef.current;

      if (gestureDuration < config.tap.maxDuration) {
        // Check for double tap
        if (lastTapRef.current) {
          const timeSinceLastTap = state.currentPoint.timestamp - lastTapRef.current.timestamp;
          const distance = Math.sqrt(
            Math.pow(state.currentPoint.x - lastTapRef.current.x, 2) +
            Math.pow(state.currentPoint.y - lastTapRef.current.y, 2)
          );

          if (timeSinceLastTap < config.tap.doubleTapDelay && distance < config.tap.maxDisplacement * 2) {
            callbacks.onDoubleTap?.(state.currentPoint);
            lastTapRef.current = null;
          } else {
            callbacks.onTap?.(state.currentPoint);
            lastTapRef.current = state.currentPoint;
          }
        } else {
          callbacks.onTap?.(state.currentPoint);
          lastTapRef.current = state.currentPoint;
        }
      }
    }

    // Trigger gesture end callbacks
    if (state.isSwipe) {
      callbacks.onSwipeEnd?.(state.swipeDirection, state.velocity);
    }

    if (state.isDrag) {
      callbacks.onDragEnd?.(state.dragOffset, state.velocity);
    }

    if (state.isPinch && touches.length < 2) {
      callbacks.onPinchEnd?.(state.pinchData);
    }

    callbacks.onTouchEnd?.(touches);

    // Reset state after a short delay
    gestureTimeoutRef.current = setTimeout(() => {
      resetState();
    }, 50);
  }, [state, callbacks, config, resetState]);

  // Accessibility support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && state.isActive) {
        resetState();
        callbacks.onAccessibilityRequest?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.isActive, resetState, callbacks]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (gestureTimeoutRef.current) {
        clearTimeout(gestureTimeoutRef.current);
      }
      if (longPressTimeoutRef.current) {
        clearTimeout(longPressTimeoutRef.current);
      }
    };
  }, []);

  return {
    ...state,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
    reset: resetState,
  };
};