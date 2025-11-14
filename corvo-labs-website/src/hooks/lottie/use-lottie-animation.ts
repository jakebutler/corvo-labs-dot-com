/**
 * Advanced Lottie animation hook with healthcare optimizations
 * Supports adaptive performance, accessibility, and medical content requirements
 */

'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import Lottie from 'lottie-react';
import {
  LottieAnimationConfig,
  HealthcareLottieConfig,
  LOTTIE_PERFORMANCE_CONFIG,
  LOTTIE_ACCESSIBILITY,
  lottieCache
} from '@/lib/lottie/lottie-config';

export interface LottieHookReturn {
  // Animation state
  isLoaded: boolean;
  isPlaying: boolean;
  isPaused: boolean;
  isComplete: boolean;
  currentFrame: number;
  totalFrames: number;
  duration: number;

  // Controls
  play: () => void;
  pause: () => void;
  stop: () => void;
  restart: () => void;
  goToFrame: (frame: number) => void;
  goToTime: (time: number) => void;

  // Settings
  setSpeed: (speed: number) => void;
  setDirection: (direction: number) => void;
  setLoop: (loop: boolean) => void;

  // Healthcare-specific
  pauseForMedical: (duration?: number) => void;
  getComplianceInfo: () => any;
  generateAuditReport: () => any;

  // Performance
  getPerformanceMetrics: () => any;
  optimizeForDevice: () => void;
}

export function useLottieAnimation(config: HealthcareLottieConfig): LottieHookReturn {
  const animationRef = useRef<any>(null);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);
  const performanceMetricsRef = useRef({
    loadTime: 0,
    frameCount: 0,
    droppedFrames: 0,
    startTime: 0,
  });

  // State
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [totalFrames, setTotalFrames] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeedState] = useState(config.speed || 1);
  const [direction, setDirectionState] = useState(config.direction || 1);

  // Adapt config for healthcare and accessibility
  const adaptedConfig = useMemo(() => {
    const baseConfig = { ...config };

    // Apply accessibility settings
    if (LOTTIE_ACCESSIBILITY.shouldReduceMotion() || baseConfig.reducedMotion) {
      baseConfig.speed = Math.min(baseConfig.speed || 1, 0.5);
      baseConfig.useSubframes = false;
      baseConfig.renderer = 'svg'; // Simplified rendering
    }

    if (LOTTIE_ACCESSIBILITY.shouldUseHighContrast() || baseConfig.highContrast) {
      baseConfig.colorOverrides = {
        ...baseConfig.colorOverrides,
        ...HEALTHCARE_COLOR_SCHEMES['medical-blue'],
      };
    }

    // Apply healthcare-specific settings
    if (baseConfig.medicalTheme || baseConfig.patientDataMode) {
      baseConfig.speed = Math.min(baseConfig.speed || 1, 0.8);
      baseConfig.autoPauseAfter = baseConfig.autoPauseAfter || 30;
    }

    // Apply performance optimizations
    const renderer = LOTTIE_PERFORMANCE_CONFIG.getRenderer();
    const quality = LOTTIE_PERFORMANCE_CONFIG.getQuality();

    return {
      ...baseConfig,
      renderer,
      useSubframes: quality.useSubframes && (baseConfig.useSubframes !== false),
      loop: baseConfig.loop !== false,
      autoplay: baseConfig.autoplay !== false,
    };
  }, [config]);

  // Initialize animation
  const handleAnimationLoaded = useCallback(() => {
    const loadTime = performance.now() - performanceMetricsRef.current.startTime;
    performanceMetricsRef.current.loadTime = loadTime;

    setIsLoaded(true);
    setIsPlaying(adaptedConfig.autoplay || false);

    if (animationRef.current) {
      setTotalFrames(animationRef.current.totalFrames);
      setDuration(animationRef.current.totalFrames / (animationRef.current.frameRate || 30));
    }

    // Cache animation data
    if (adaptedConfig.animationData) {
      lottieCache.set(adaptedConfig.src || 'default', adaptedConfig.animationData);
    }

    // Set up auto-pause for medical content
    if (adaptedConfig.autoPauseAfter) {
      const timeout = setTimeout(() => {
        pause();
      }, adaptedConfig.autoPauseAfter * 1000);
      timeoutRefs.current.push(timeout);
    }
  }, [adaptedConfig]);

  // Frame tracking
  const handleEnterFrame = useCallback((frame: { frame: number }) => {
    setCurrentFrame(frame.frame);
    performanceMetricsRef.current.frameCount++;

    // Auto-pause for medical content after duration limit
    if (adaptedConfig.maxLoopDuration && frame.frame >= totalFrames) {
      const timeout = setTimeout(() => {
        pause();
      }, adaptedConfig.maxLoopDuration * 1000);
      timeoutRefs.current.push(timeout);
    }
  }, [adaptedConfig.maxLoopDuration, totalFrames]);

  // Animation completion
  const handleComplete = useCallback(() => {
    setIsComplete(true);
    setIsPlaying(false);

    // Generate audit report for healthcare content
    if (adaptedConfig.complianceMode || adaptedConfig.patientDataMode) {
      generateAuditReport();
    }
  }, [adaptedConfig.complianceMode, adaptedConfig.patientDataMode]);

  // Control functions
  const play = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.play();
      setIsPlaying(true);
      setIsPaused(false);
      setIsComplete(false);
    }
  }, []);

  const pause = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.pause();
      setIsPlaying(false);
      setIsPaused(true);
    }
  }, []);

  const stop = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.stop();
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentFrame(0);
    }
  }, []);

  const restart = useCallback(() => {
    stop();
    setTimeout(play, 50);
  }, [stop, play]);

  const goToFrame = useCallback((frame: number) => {
    if (animationRef.current) {
      animationRef.current.goToAndStop(frame, true);
      setCurrentFrame(frame);
    }
  }, []);

  const goToTime = useCallback((time: number) => {
    if (animationRef.current && totalFrames > 0) {
      const frame = Math.floor((time / duration) * totalFrames);
      goToFrame(frame);
    }
  }, [totalFrames, duration, goToFrame]);

  // Settings functions
  const setSpeed = useCallback((newSpeed: number) => {
    if (animationRef.current) {
      animationRef.current.setSpeed(newSpeed);
      setSpeedState(newSpeed);
    }
  }, []);

  const setDirection = useCallback((newDirection: number) => {
    if (animationRef.current) {
      animationRef.current.setDirection(newDirection);
      setDirectionState(newDirection);
    }
  }, []);

  const setLoop = useCallback((loop: boolean) => {
    if (animationRef.current) {
      animationRef.current.loop = loop;
    }
  }, []);

  // Healthcare-specific functions
  const pauseForMedical = useCallback((pauseDuration = 5000) => {
    pause();
    const timeout = setTimeout(() => {
      play();
    }, pauseDuration);
    timeoutRefs.current.push(timeout);
  }, [pause, play]);

  const getComplianceInfo = useCallback(() => {
    if (!adaptedConfig.complianceMode) return null;

    return {
      animationName: adaptedConfig.src || 'unknown',
      category: adaptedConfig.category || 'general',
      sensitivity: adaptedConfig.sensitivity || 'low',
      patientDataMode: adaptedConfig.patientDataMode || false,
      duration: duration,
      frames: totalFrames,
      complianceChecks: {
        reducedMotion: LOTTIE_ACCESSIBILITY.shouldReduceMotion(),
        highContrast: LOTTIE_ACCESSIBILITY.shouldUseHighContrast(),
        medicalTheme: adaptedConfig.medicalTheme || false,
        autoPauseEnabled: !!adaptedConfig.autoPauseAfter,
      },
      lastPlayed: Date.now(),
    };
  }, [adaptedConfig, duration, totalFrames]);

  const generateAuditReport = useCallback(() => {
    return {
      timestamp: Date.now(),
      animationId: adaptedConfig.src || 'unknown',
      config: adaptedConfig,
      performance: performanceMetricsRef.current,
      compliance: getComplianceInfo(),
      state: {
        isLoaded,
        isPlaying,
        isPaused,
        isComplete,
        currentFrame,
        totalFrames,
      },
    };
  }, [adaptedConfig, getComplianceInfo, isLoaded, isPlaying, isPaused, isComplete, currentFrame, totalFrames]);

  // Performance functions
  const getPerformanceMetrics = useCallback(() => {
    return {
      ...performanceMetricsRef.current,
      fps: performanceMetricsRef.current.frameCount / (duration || 1),
      cacheSize: lottieCache.size(),
      memoryUsage: (performance as any).memory?.usedJSHeapSize || 0,
    };
  }, [duration]);

  const optimizeForDevice = useCallback(() => {
    const quality = LOTTIE_PERFORMANCE_CONFIG.getQuality();

    if (quality.reduceComplexity && animationRef.current) {
      // Reduce animation complexity
      animationRef.current.renderer.resize(adaptedConfig.width || 300, adaptedConfig.height || 300);
    }

    // Adjust settings for low-end devices
    if (quality.useSubframes === false) {
      setSpeed(0.8);
    }
  }, [adaptedConfig.width, adaptedConfig.height]);

  // Cleanup
  useEffect(() => {
    performanceMetricsRef.current.startTime = performance.now();

    return () => {
      // Clear all timeouts
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
      timeoutRefs.current = [];
    };
  }, []);

  // Accessibility announcements
  useEffect(() => {
    if (!adaptedConfig.accessibilityMode) return;

    const announceStatus = (status: 'started' | 'completed' | 'paused') => {
      const announcement = LOTTIE_ACCESSIBILITY.generateAnnouncement(
        { name: adaptedConfig.src || 'Animation' },
        status
      );

      // Create or update aria-live region
      let liveRegion = document.getElementById('lottie-announcements');
      if (!liveRegion) {
        liveRegion = document.createElement('div');
        liveRegion.id = 'lottie-announcements';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        document.body.appendChild(liveRegion);
      }

      liveRegion.textContent = announcement;
    };

    if (isPlaying && !isPaused) {
      announceStatus('started');
    } else if (isComplete) {
      announceStatus('completed');
    } else if (isPaused && isLoaded) {
      announceStatus('paused');
    }
  }, [isPlaying, isPaused, isComplete, isLoaded, adaptedConfig]);

  return {
    isLoaded,
    isPlaying,
    isPaused,
    isComplete,
    currentFrame,
    totalFrames,
    duration,
    play,
    pause,
    stop,
    restart,
    goToFrame,
    goToTime,
    setSpeed,
    setDirection,
    setLoop,
    pauseForMedical,
    getComplianceInfo,
    generateAuditReport,
    getPerformanceMetrics,
    optimizeForDevice,
  };
}