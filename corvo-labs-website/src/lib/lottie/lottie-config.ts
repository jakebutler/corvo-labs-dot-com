/**
 * Lottie animation configuration and management
 * Healthcare-optimized animation settings and performance controls
 */

export interface LottieAnimationConfig {
  // Animation source
  src: string;
  animationData?: any;

  // Playback controls
  autoplay?: boolean;
  loop?: boolean;
  direction?: number;
  speed?: number;

  // Performance settings
  renderer?: 'svg' | 'canvas' | 'html';
  segments?: [number, number];
  useSubframes?: boolean;

  // Healthcare settings
  reducedMotion?: boolean;
  highContrast?: boolean;
  accessibilityMode?: boolean;

  // Sizing and positioning
  width?: number;
  height?: number;
  preserveAspectRatio?: string;
  className?: string;

  // Events
  onComplete?: () => void;
  onLoopComplete?: () => void;
  onEnterFrame?: (frame: number) => void;
  onLoadedImages?: () => void;
}

export interface HealthcareLottieConfig extends LottieAnimationConfig {
  // Healthcare-specific settings
  medicalTheme?: boolean;
  complianceMode?: boolean;
  patientDataMode?: boolean;

  // Content categorization
  category?: 'clinical' | 'diagnostic' | 'educational' | 'administrative';
  sensitivity?: 'low' | 'medium' | 'high';

  // Duration control for medical content
  maxLoopDuration?: number; // in seconds
  autoPauseAfter?: number; // in seconds

  // Visual adjustments
  colorOverrides?: Record<string, string>;
  reduceComplexity?: boolean;
}

// Default healthcare animation configurations
export const DEFAULT_LOTTIE_CONFIG: LottieAnimationConfig = {
  autoplay: true,
  loop: false,
  direction: 1,
  speed: 1,
  renderer: 'svg',
  useSubframes: false,
  reducedMotion: false,
  highContrast: false,
  accessibilityMode: true,
  preserveAspectRatio: 'xMidYMid meet',
};

export const HEALTHCARE_LOTTIE_CONFIG: HealthcareLottieConfig = {
  ...DEFAULT_LOTTIE_CONFIG,
  medicalTheme: true,
  complianceMode: true,
  patientDataMode: false,
  reducedMotion: false,
  maxLoopDuration: 10,
  autoPauseAfter: 30,
  reduceComplexity: false,
  accessibilityMode: true,
};

// Animation categories and their configurations
export const LOTTIE_CATEGORIES = {
  clinical: {
    speed: 0.8, // Slower for better comprehension
    loop: false,
    maxLoopDuration: 15,
    colorScheme: 'medical-blue',
  },
  diagnostic: {
    speed: 1,
    loop: true,
    maxLoopDuration: 20,
    colorScheme: 'diagnostic-purple',
  },
  educational: {
    speed: 1.2,
    loop: true,
    maxLoopDuration: 30,
    colorScheme: 'educational-green',
  },
  administrative: {
    speed: 1,
    loop: false,
    maxLoopDuration: 10,
    colorScheme: 'administrative-gray',
  },
};

// Healthcare color schemes for Lottie animations
export const HEALTHCARE_COLOR_SCHEMES = {
  'medical-blue': {
    primary: '#3B82F6',
    secondary: '#60A5FA',
    accent: '#93C5FD',
    background: '#EFF6FF',
    text: '#1E40AF',
  },
  'diagnostic-purple': {
    primary: '#8B5CF6',
    secondary: '#A78BFA',
    accent: '#C4B5FD',
    background: '#F5F3FF',
    text: '#5B21B6',
  },
  'educational-green': {
    primary: '#10B981',
    secondary: '#34D399',
    accent: '#6EE7B7',
    background: '#ECFDF5',
    text: '#064E3B',
  },
  'administrative-gray': {
    primary: '#6B7280',
    secondary: '#9CA3AF',
    accent: '#D1D5DB',
    background: '#F9FAFB',
    text: '#111827',
  },
  'emergency-red': {
    primary: '#EF4444',
    secondary: '#F87171',
    accent: '#FCA5A5',
    background: '#FEF2F2',
    text: '#991B1B',
  },
};

// Predefined healthcare animations
export const HEALTHCARE_ANIMATIONS = {
  // Clinical procedures
  heartRate: {
    name: 'Heart Rate Monitor',
    description: 'Animated ECG/heartbeat visualization',
    category: 'clinical',
    src: '/animations/heartbeat.json',
    config: {
      ...HEALTHCARE_LOTTIE_CONFIG,
      speed: 1,
      loop: true,
      category: 'clinical',
    },
  },
  breathing: {
    name: 'Breathing Exercise',
    description: 'Guided breathing animation for relaxation',
    category: 'clinical',
    src: '/animations/breathing.json',
    config: {
      ...HEALTHCARE_LOTTIE_CONFIG,
      speed: 0.6,
      loop: true,
      category: 'clinical',
      autoPauseAfter: 60,
    },
  },

  // Diagnostic tools
  mriScan: {
    name: 'MRI Scanner',
    description: 'Medical imaging equipment animation',
    category: 'diagnostic',
    src: '/animations/mri-scan.json',
    config: {
      ...HEALTHCARE_LOTTIE_CONFIG,
      speed: 0.8,
      loop: false,
      category: 'diagnostic',
    },
  },
  bloodTest: {
    name: 'Blood Analysis',
    description: 'Laboratory testing process animation',
    category: 'diagnostic',
    src: '/animations/blood-test.json',
    config: {
      ...HEALTHCARE_LOTTIE_CONFIG,
      speed: 1,
      loop: true,
      category: 'diagnostic',
    },
  },

  // Educational content
  anatomy: {
    name: 'Human Anatomy',
    description: 'Interactive anatomy visualization',
    category: 'educational',
    src: '/animations/anatomy.json',
    config: {
      ...HEALTHCARE_LOTTIE_CONFIG,
      speed: 0.5,
      loop: true,
      category: 'educational',
      interactive: true,
    },
  },
  medication: {
    name: 'Medication Guide',
    description: 'How medication works in the body',
    category: 'educational',
    src: '/animations/medication.json',
    config: {
      ...HEALTHCARE_LOTTIE_CONFIG,
      speed: 0.8,
      loop: true,
      category: 'educational',
    },
  },

  // Administrative processes
  appointment: {
    name: 'Appointment Booking',
    description: 'Medical appointment scheduling process',
    category: 'administrative',
    src: '/animations/appointment.json',
    config: {
      ...HEALTHCARE_LOTTIE_CONFIG,
      speed: 1.2,
      loop: false,
      category: 'administrative',
    },
  },
  insurance: {
    name: 'Insurance Processing',
    description: 'Health insurance claim workflow',
    category: 'administrative',
    src: '/animations/insurance.json',
    config: {
      ...HEALTHCARE_LOTTIE_CONFIG,
      speed: 1,
      loop: true,
      category: 'administrative',
    },
  },

  // Emergency procedures
  emergency: {
    name: 'Emergency Response',
    description: 'Emergency medical response procedure',
    category: 'clinical',
    src: '/animations/emergency.json',
    config: {
      ...HEALTHCARE_LOTTIE_CONFIG,
      speed: 1.5,
      loop: false,
      category: 'clinical',
      sensitivity: 'high',
      colorOverrides: HEALTHCARE_COLOR_SCHEMES['emergency-red'],
    },
  },
  cpr: {
    name: 'CPR Demonstration',
    description: 'Cardiopulmonary resuscitation steps',
    category: 'educational',
    src: '/animations/cpr.json',
    config: {
      ...HEALTHCARE_LOTTIE_CONFIG,
      speed: 0.7,
      loop: true,
      category: 'educational',
      sensitivity: 'high',
    },
  },
};

// Performance optimization settings
export const LOTTIE_PERFORMANCE_CONFIG = {
  // Renderer settings based on device capabilities
  getRenderer: (): 'svg' | 'canvas' | 'html' => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;

    if (isMobile || isLowEnd) {
      return 'canvas'; // Better performance on mobile/low-end devices
    }
    return 'svg'; // Better quality on desktop
  },

  // Adaptive quality settings
  getQuality: () => {
    const connection = (navigator as any).connection;
    const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');

    return {
      useSubframes: !isSlowConnection,
      reduceComplexity: isSlowConnection,
      maxAnimations: isSlowConnection ? 2 : 4,
    };
  },

  // Memory management
  getMemorySettings: () => {
    const memory = (performance as any).memory;
    const isLowMemory = memory && memory.jsHeapSizeLimit < 100 * 1024 * 1024; // Less than 100MB

    return {
      maxCacheSize: isLowMemory ? 5 : 10,
      cleanupInterval: isLowMemory ? 30000 : 60000, // 30s vs 60s
      preload: !isLowMemory,
    };
  },
};

// Accessibility utilities
export const LOTTIE_ACCESSIBILITY = {
  // Generate ARIA labels for animations
  generateAriaLabel: (animation: any, context?: string): string => {
    const baseLabel = animation.name || 'Animation';
    const contextLabel = context ? ` for ${context}` : '';
    const description = animation.description ? `: ${animation.description}` : '';

    return `${baseLabel}${contextLabel}${description}`;
  },

  // Generate screen reader announcements
  generateAnnouncement: (animation: any, status: 'started' | 'completed' | 'paused'): string => {
    const statusText = {
      started: 'has started',
      completed: 'has completed',
      paused: 'is paused',
    };

    return `${animation.name || 'Animation'} ${statusText[status]}`;
  },

  // Check if reduced motion is preferred
  shouldReduceMotion: (): boolean => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  // Check if high contrast is preferred
  shouldUseHighContrast: (): boolean => {
    return window.matchMedia('(prefers-contrast: high)').matches;
  },
};

// Cache management
export class LottieCache {
  private cache = new Map<string, any>();
  private maxSize = 10;
  private accessOrder: string[] = [];

  get(key: string): any | null {
    const item = this.cache.get(key);
    if (item) {
      // Move to end (most recently used)
      this.accessOrder = this.accessOrder.filter(k => k !== key);
      this.accessOrder.push(key);
      return item;
    }
    return null;
  }

  set(key: string, value: any): void {
    // Remove oldest if cache is full
    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
      const oldestKey = this.accessOrder.shift();
      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }

    this.cache.set(key, value);
    if (!this.accessOrder.includes(key)) {
      this.accessOrder.push(key);
    }
  }

  clear(): void {
    this.cache.clear();
    this.accessOrder = [];
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  size(): number {
    return this.cache.size;
  }
}

// Global cache instance
export const lottieCache = new LottieCache();