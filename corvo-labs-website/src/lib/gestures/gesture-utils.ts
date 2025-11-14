/**
 * Utility functions for advanced gesture detection and processing
 */

import { GestureConfig } from './gesture-config';

export interface Point {
  x: number;
  y: number;
  timestamp: number;
}

export interface TouchPoint extends Point {
  id: number;
  force?: number;
}

export interface Velocity {
  x: number;
  y: number;
  magnitude: number;
  angle: number;
}

export interface SwipeDirection {
  horizontal: 'left' | 'right' | null;
  vertical: 'up' | 'down' | null;
  primary: 'left' | 'right' | 'up' | 'down' | null;
}

export interface PinchData {
  scale: number;
  center: Point;
  distance: number;
  velocity: number;
}

// Distance calculation
export const getDistance = (p1: Point, p2: Point): number => {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
};

// Angle calculation (in degrees)
export const getAngle = (p1: Point, p2: Point): number => {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.atan2(dy, dx) * (180 / Math.PI);
};

// Normalize angle to 0-360
export const normalizeAngle = (angle: number): number => {
  return ((angle % 360) + 360) % 360;
};

// Calculate velocity from two points
export const getVelocity = (p1: Point, p2: Point): Velocity => {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const dt = p2.timestamp - p1.timestamp;

  if (dt === 0) {
    return { x: 0, y: 0, magnitude: 0, angle: 0 };
  }

  const vx = dx / dt;
  const vy = dy / dt;
  const magnitude = Math.sqrt(vx * vx + vy * vy);
  const angle = Math.atan2(vy, vx) * (180 / Math.PI);

  return { x: vx, y: vy, magnitude, angle };
};

// Determine swipe direction from velocity vector
export const getSwipeDirection = (velocity: Velocity, config: GestureConfig['swipe']): SwipeDirection => {
  const { magnitude, angle } = velocity;
  const normalizedAngle = normalizeAngle(angle);

  const horizontal: 'left' | 'right' | null =
    magnitude > config.velocityThreshold
      ? (normalizedAngle > 90 && normalizedAngle < 270 ? 'left' : 'right')
      : null;

  const vertical: 'up' | 'down' | null =
    magnitude > config.velocityThreshold
      ? (normalizedAngle > 0 && normalizedAngle < 180 ? 'down' : 'up')
      : null;

  // Determine primary direction based on larger component
  let primary: 'left' | 'right' | 'up' | 'down' | null = null;
  if (horizontal && vertical) {
    const absVx = Math.abs(velocity.x);
    const absVy = Math.abs(velocity.y);

    if (absVx > absVy * 1.5) {
      primary = horizontal;
    } else if (absVy > absVx * 1.5) {
      primary = vertical;
    }
  } else if (horizontal) {
    primary = horizontal;
  } else if (vertical) {
    primary = vertical;
  }

  return { horizontal, vertical, primary };
};

// Calculate pinch data from multiple touch points
export const getPinchData = (touches: TouchPoint[], lastDistance?: number): PinchData => {
  if (touches.length < 2) {
    return { scale: 1, center: touches[0], distance: 0, velocity: 0 };
  }

  const [touch1, touch2] = touches;
  const center = {
    x: (touch1.x + touch2.x) / 2,
    y: (touch1.y + touch2.y) / 2,
    timestamp: Math.max(touch1.timestamp, touch2.timestamp),
  };

  const distance = getDistance(touch1, touch2);
  const scale = lastDistance ? distance / lastDistance : 1;
  const velocity = lastDistance ? Math.abs(scale - 1) * 1000 : 0;

  return { scale, center, distance, velocity };
};

// Momentum calculation for drag gestures
export const calculateMomentum = (
  velocity: Velocity,
  config: GestureConfig['drag']
): { x: number; y: number; duration: number } => {
  if (!config.momentum || velocity.magnitude < config.velocityThreshold) {
    return { x: 0, y: 0, duration: 0 };
  }

  // Calculate momentum distance
  const friction = config.friction;
  const duration = Math.log(0.01) / Math.log(friction); // Time to reach 1% of initial velocity
  const distanceX = (velocity.x * friction) / (1 - friction);
  const distanceY = (velocity.y * friction) / (1 - friction);

  return {
    x: distanceX,
    y: distanceY,
    duration: Math.min(duration, 1000), // Cap at 1 second
  };
};

// Check if gesture is within acceptable bounds
export const isGestureValid = (
  startPoint: Point,
  endPoint: Point,
  config: GestureConfig['tap' | 'longPress']
): boolean => {
  const displacement = getDistance(startPoint, endPoint);
  const duration = endPoint.timestamp - startPoint.timestamp;

  return displacement <= config.maxDisplacement && duration <= (config as any).maxDuration;
};

// Healthcare-specific gesture validation
export const validateHealthcareGesture = (
  gesture: any,
  config: GestureConfig
): boolean => {
  // Add healthcare-specific validation logic
  if (config.healthcare.reducedMotion) {
    // Reduce sensitivity for motion-sensitive users
    return false;
  }

  if (config.healthcare.largerTargets) {
    // More tolerant gesture recognition for accessibility
    return true;
  }

  return true;
};

// Adaptive gesture sensitivity based on user behavior
export class GestureAdaptation {
  private gestureHistory: Array<{ type: string; success: boolean; timestamp: number }> = [];
  private maxHistorySize = 50;

  recordGesture(type: string, success: boolean): void {
    this.gestureHistory.push({ type, success, timestamp: Date.now() });

    // Keep only recent history
    if (this.gestureHistory.length > this.maxHistorySize) {
      this.gestureHistory.shift();
    }
  }

  getSuccessRate(type: string, timeWindow = 10000): number {
    const now = Date.now();
    const recentGestures = this.gestureHistory.filter(
      g => g.type === type && (now - g.timestamp) < timeWindow
    );

    if (recentGestures.length === 0) return 0.5; // Default success rate

    const successes = recentGestures.filter(g => g.success).length;
    return successes / recentGestures.length;
  }

  shouldAdjustSensitivity(type: string): { increase: boolean; decrease: boolean } {
    const successRate = this.getSuccessRate(type);

    return {
      increase: successRate < 0.3, // Low success rate, increase sensitivity
      decrease: successRate > 0.9, // High success rate, decrease sensitivity
    };
  }
}

// Performance monitoring for gestures
export class GesturePerformance {
  private frameCount = 0;
  private startTime = performance.now();
  private lastFrameTime = performance.now();

  startFrame(): void {
    this.lastFrameTime = performance.now();
  }

  endFrame(): void {
    this.frameCount++;
    const now = performance.now();
    const frameDuration = now - this.lastFrameTime;

    // Log slow frames
    if (frameDuration > 16.67) { // 60fps threshold
      console.warn(`Slow gesture frame: ${frameDuration.toFixed(2)}ms`);
    }
  }

  getMetrics(): { fps: number; averageFrameTime: number } {
    const now = performance.now();
    const totalDuration = now - this.startTime;
    const fps = (this.frameCount / totalDuration) * 1000;
    const averageFrameTime = totalDuration / this.frameCount;

    return { fps, averageFrameTime };
  }
}