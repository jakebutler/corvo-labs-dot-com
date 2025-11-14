/**
 * Enhanced gesture configuration for mobile interactions
 * Healthcare-optimized gesture thresholds and timings
 */

export interface GestureConfig {
  // Swipe gestures
  swipe: {
    velocityThreshold: number;
    displacementThreshold: number;
    directionLockThreshold: number;
    maxDuration: number;
  };

  // Pinch to zoom
  pinch: {
    scaleThreshold: number;
    maxScale: number;
    minScale: number;
    friction: number;
  };

  // Drag gestures
  drag: {
    momentum: boolean;
    friction: number;
    velocityThreshold: number;
    axisLockThreshold: number;
  };

  // Tap gestures
  tap: {
    maxDuration: number;
    maxDisplacement: number;
    doubleTapDelay: number;
  };

  // Long press
  longPress: {
    duration: number;
    maxDisplacement: number;
  };

  // Healthcare-specific settings
  healthcare: {
    reducedMotion: boolean;
    highContrast: boolean;
    largerTargets: boolean;
  };
}

export const defaultGestureConfig: GestureConfig = {
  swipe: {
    velocityThreshold: 0.5, // pixels per millisecond
    displacementThreshold: 50, // minimum pixels
    directionLockThreshold: 30, // angle threshold for direction lock
    maxDuration: 500, // maximum gesture duration in ms
  },

  pinch: {
    scaleThreshold: 0.1, // minimum scale change to register
    maxScale: 3.0, // maximum zoom level
    minScale: 0.5, // minimum zoom level
    friction: 0.92, // deceleration factor
  },

  drag: {
    momentum: true, // enable momentum scrolling
    friction: 0.95, // deceleration factor
    velocityThreshold: 0.1, // minimum velocity for momentum
    axisLockThreshold: 15, // angle threshold for axis lock
  },

  tap: {
    maxDuration: 200, // maximum tap duration
    maxDisplacement: 10, // maximum movement during tap
    doubleTapDelay: 300, // delay between double taps
  },

  longPress: {
    duration: 500, // minimum press duration
    maxDisplacement: 15, // maximum movement during long press
  },

  healthcare: {
    reducedMotion: false, // respects user's motion preferences
    highContrast: false, // respects accessibility settings
    largerTargets: true, // larger touch targets for healthcare professionals
  },
};

export const healthcareGestureConfig: GestureConfig = {
  ...defaultGestureConfig,
  swipe: {
    ...defaultGestureConfig.swipe,
    displacementThreshold: 40, // Lower threshold for easier swiping
    maxDuration: 600, // Longer duration for accessibility
  },

  pinch: {
    ...defaultGestureConfig.pinch,
    scaleThreshold: 0.15, // More responsive scaling
    friction: 0.9, // Gentler deceleration
  },

  tap: {
    ...defaultGestureConfig.tap,
    maxDisplacement: 15, // More tolerant tap area
    maxDuration: 300, // Longer tap duration
  },

  healthcare: {
    reducedMotion: false,
    highContrast: false,
    largerTargets: true,
  },
};

// Adaptive configuration based on device capabilities
export const getAdaptiveConfig = (): GestureConfig => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const isTouchDevice = 'ontouchstart' in window;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let config = isMobile ? healthcareGestureConfig : defaultGestureConfig;

  // Respect accessibility preferences
  if (prefersReducedMotion) {
    config = {
      ...config,
      healthcare: {
        ...config.healthcare,
        reducedMotion: true,
      },
    };
  }

  // Adjust for touch devices
  if (isTouchDevice) {
    config = {
      ...config,
      tap: {
        ...config.tap,
        maxDisplacement: config.tap.maxDisplacement * 1.2,
      },
    };
  }

  return config;
};