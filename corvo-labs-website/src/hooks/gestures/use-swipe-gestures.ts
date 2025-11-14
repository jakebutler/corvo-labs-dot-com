/**
 * Advanced swipe gesture hook with healthcare-optimized interactions
 * Supports complex swipe patterns and accessibility features
 */

import { useCallback, useRef, useEffect } from 'react';
import { useGestureState, GestureCallbacks } from './use-gesture-state';
import { getAdaptiveConfig } from '@/lib/gestures/gesture-config';
import { SwipeDirection, Velocity } from '@/lib/gestures/gesture-utils';

export interface SwipeGestureConfig {
  // Enable/disable specific swipe directions
  directions: {
    left?: boolean;
    right?: boolean;
    up?: boolean;
    down?: boolean;
  };

  // Swipe thresholds
  minVelocity: number;
  minDistance: number;
  maxDuration: number;

  // Healthcare settings
  hapticFeedback: boolean;
  reducedMotion: boolean;
  visualFeedback: boolean;

  // Callback debounce
  debounceMs: number;
}

export interface SwipeGestureCallbacks {
  onSwipeLeft?: (velocity: Velocity) => void;
  onSwipeRight?: (velocity: Velocity) => void;
  onSwipeUp?: (velocity: Velocity) => void;
  onSwipeDown?: (velocity: Velocity) => void;

  onSwipeStart?: (direction: SwipeDirection) => void;
  onSwipeEnd?: (direction: SwipeDirection, velocity: Velocity) => void;

  // Healthcare callbacks
  onAccessibilitySwipe?: (direction: SwipeDirection) => void;
}

export const useSwipeGestures = (
  callbacks: SwipeGestureCallbacks = {},
  config: Partial<SwipeGestureConfig> = {}
) => {
  const defaultConfig: SwipeGestureConfig = {
    directions: { left: true, right: true, up: true, down: true },
    minVelocity: 0.5,
    minDistance: 50,
    maxDuration: 500,
    hapticFeedback: true,
    reducedMotion: false,
    visualFeedback: true,
    debounceMs: 100,
  };

  const swipeConfig = { ...defaultConfig, ...config };
  const gestureConfig = getAdaptiveConfig();
  const debounceRef = useRef<NodeJS.Timeout>();
  const lastSwipeRef = useRef<number>(0);

  // Haptic feedback for healthcare devices
  const triggerHaptic = useCallback(() => {
    if (swipeConfig.hapticFeedback && 'vibrate' in navigator && !gestureConfig.healthcare.reducedMotion) {
      navigator.vibrate(10); // Light vibration for feedback
    }
  }, [swipeConfig.hapticFeedback, gestureConfig.healthcare.reducedMotion]);

  // Check if swipe direction is enabled
  const isDirectionEnabled = useCallback((direction: SwipeDirection): boolean => {
    return Boolean(
      (direction.primary === 'left' && swipeConfig.directions.left) ||
      (direction.primary === 'right' && swipeConfig.directions.right) ||
      (direction.primary === 'up' && swipeConfig.directions.up) ||
      (direction.primary === 'down' && swipeConfig.directions.down)
    );
  }, [swipeConfig.directions]);

  // Validate swipe parameters
  const isValidSwipe = useCallback((direction: SwipeDirection, velocity: Velocity): boolean => {
    const isValidDirection = isDirectionEnabled(direction);
    const hasMinVelocity = velocity.magnitude >= swipeConfig.minVelocity;
    const hasMinDistance = Math.abs(velocity.x) * 100 >= swipeConfig.minDistance ||
                          Math.abs(velocity.y) * 100 >= swipeConfig.minDistance;
    const isWithinDuration = Date.now() - lastSwipeRef.current > swipeConfig.debounceMs;

    return isValidDirection && hasMinVelocity && hasMinDistance && isWithinDuration;
  }, [isDirectionEnabled, swipeConfig]);

  // Trigger swipe callbacks
  const triggerSwipeCallback = useCallback((direction: SwipeDirection, velocity: Velocity) => {
    if (!isValidSwipe(direction, velocity)) return;

    lastSwipeRef.current = Date.now();

    // Debounce rapid swipes
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      // Trigger specific direction callbacks
      switch (direction.primary) {
        case 'left':
          callbacks.onSwipeLeft?.(velocity);
          break;
        case 'right':
          callbacks.onSwipeRight?.(velocity);
          break;
        case 'up':
          callbacks.onSwipeUp?.(velocity);
          break;
        case 'down':
          callbacks.onSwipeDown?.(velocity);
          break;
      }

      // Trigger general callbacks
      callbacks.onSwipeEnd?.(direction, velocity);

      // Healthcare accessibility feedback
      if (gestureConfig.healthcare.highContrast) {
        callbacks.onAccessibilitySwipe?.(direction);
      }

      // Haptic feedback
      triggerHaptic();
    }, swipeConfig.debounceMs);
  }, [isValidSwipe, callbacks, swipeConfig, gestureConfig, triggerHaptic]);

  // Gesture state integration
  const gestureCallbacks: GestureCallbacks = {
    onSwipeStart: callbacks.onSwipeStart,
    onSwipeEnd: triggerSwipeCallback,
  };

  const gestureState = useGestureState(gestureCallbacks);

  // Enhanced swipe detection with healthcare patterns
  const detectSwipePattern = useCallback((touches: any[]) => {
    if (touches.length < 2 || !gestureState.isActive) return null;

    const [touch1, touch2] = touches;
    const dx = touch2.x - touch1.x;
    const dy = touch2.y - touch1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Detect circular swipe (healthcare gesture for menu)
    if (distance > 100 && gestureState.velocity.magnitude > 0.3) {
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      return { pattern: 'circular', angle, distance };
    }

    // Detect L-shaped swipe (healthcare gesture for quick actions)
    if (Math.abs(dx) > 80 && Math.abs(dy) > 80) {
      return { pattern: 'L-shape', dx, dy };
    }

    return null;
  }, [gestureState.isActive, gestureState.velocity]);

  // Accessibility enhancements
  useEffect(() => {
    const handleAccessibilitySwipe = (event: KeyboardEvent) => {
      if (!gestureConfig.healthcare.highContrast) return;

      let direction: SwipeDirection | null = null;

      switch (event.key) {
        case 'ArrowLeft':
          direction = { horizontal: 'left', vertical: null, primary: 'left' };
          break;
        case 'ArrowRight':
          direction = { horizontal: 'right', vertical: null, primary: 'right' };
          break;
        case 'ArrowUp':
          direction = { horizontal: null, vertical: 'up', primary: 'up' };
          break;
        case 'ArrowDown':
          direction = { horizontal: null, vertical: 'down', primary: 'down' };
          break;
      }

      if (direction && isDirectionEnabled(direction)) {
        const velocity = { x: 1, y: 0, magnitude: 1, angle: 0 };
        triggerSwipeCallback(direction, velocity);
      }
    };

    window.addEventListener('keydown', handleAccessibilitySwipe);
    return () => window.removeEventListener('keydown', handleAccessibilitySwipe);
  }, [isDirectionEnabled, triggerSwipeCallback, gestureConfig.healthcare.highContrast]);

  // Visual feedback for healthcare settings
  const getSwipeFeedback = useCallback(() => {
    if (!swipeConfig.visualFeedback || gestureConfig.healthcare.reducedMotion) {
      return null;
    }

    const { isSwipe, swipeDirection, velocity } = gestureState;

    if (!isSwipe || !swipeDirection.primary) return null;

    return {
      direction: swipeDirection.primary,
      velocity: velocity.magnitude,
      progress: Math.min(velocity.magnitude / swipeConfig.minVelocity, 1),
    };
  }, [gestureState, swipeConfig, gestureConfig.healthcare.reducedMotion]);

  // Healthcare gesture patterns
  const detectHealthcareGestures = useCallback(() => {
    if (!gestureState.isActive || gestureState.touches.length < 2) return null;

    const touches = gestureState.touches;
    const pattern = detectSwipePattern(touches);

    if (pattern) {
      switch (pattern.pattern) {
        case 'circular':
          return {
            type: 'healthcare-menu',
            action: 'toggle-menu',
            confidence: 0.8,
          };
        case 'L-shape':
          return {
            type: 'healthcare-action',
            action: 'quick-emergency',
            confidence: 0.7,
          };
      }
    }

    return null;
  }, [gestureState.isActive, gestureState.touches, detectSwipePattern]);

  return {
    ...gestureState,
    swipeFeedback: getSwipeFeedback(),
    healthcareGestures: detectHealthcareGestures(),
    isSwipeEnabled: isDirectionEnabled,
    config: swipeConfig,
    reset: gestureState.reset,
  };
};