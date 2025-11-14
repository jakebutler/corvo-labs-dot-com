/**
 * Reading progress and blog navigation types
 * Healthcare-optimized reading experience definitions
 */

export interface ReadingProgressConfig {
  // Progress tracking
  showProgressBar?: boolean;
  showPercentage?: boolean;
  showReadingTime?: boolean;
  showEstimatedTime?: boolean;

  // Visual settings
  position?: 'top' | 'bottom' | 'floating';
  style?: 'bar' | 'circular' | 'dots' | 'minimal';
  color?: string;
  height?: number;
  borderRadius?: number;

  // Reading behavior
  autoHide?: boolean;
  hideDelay?: number;
  scrollThreshold?: number;
  updateFrequency?: number;

  // Healthcare settings
  medicalMode?: boolean;
  accessibilityMode?: boolean;
  reducedMotion?: boolean;
  largeTargets?: boolean;
}

export interface ReadingSection {
  id: string;
  title: string;
  level: number; // 1-6 for h1-h6
  content?: string;
  wordCount?: number;
  estimatedReadingTime?: number;
  yPosition?: number;
  isActive?: boolean;
  isCompleted?: boolean;
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
  children?: TableOfContentsItem[];
  progress?: number;
  isActive?: boolean;
}

export interface ReadingStats {
  // Basic metrics
  totalWords: number;
  wordsRead: number;
  percentageComplete: number;
  scrollProgress: number;

  // Timing
  startTime: number;
  currentTime: number;
  readingTime: number;
  estimatedTotalTime: number;
  estimatedRemainingTime: number;

  // Reading behavior
  readingSpeed: number; // words per minute
  averageScrollSpeed: number;
  pauseCount: number;
  totalPauses: number;

  // Healthcare metrics
  comprehensionScore?: number;
  focusScore?: number;
  accessibilityFeatures: string[];
}

export interface NavigationConfig {
  // Table of contents
  showTableOfContents?: boolean;
  tocPosition?: 'sidebar' | 'top' | 'floating';
  tocCollapsible?: boolean;
  tocMaxDepth?: number;

  // Quick navigation
  showQuickNav?: boolean;
  showBreadcrumbs?: boolean;
  showRelatedPosts?: boolean;
  showShareButtons?: boolean;

  // Keyboard navigation
  enableKeyboardShortcuts?: boolean;
  enableScrollToTop?: boolean;
  enableScrollToSection?: boolean;

  // Healthcare settings
  medicalNavigation?: boolean;
  emergencyQuickExit?: boolean;
  readingAssistance?: boolean;
}

export interface BlogNavigationState {
  // Current position
  currentSection: string | null;
  currentProgress: number;
  isVisible: boolean;

  // Table of contents
  tocOpen: boolean;
  activeSection: string | null;

  // Navigation
  previousPost?: {
    title: string;
    slug: string;
  };
  nextPost?: {
    title: string;
    slug: string;
  };

  // UI state
  isScrolling: boolean;
  scrollDirection: 'up' | 'down' | null;
  lastScrollY: number;
}

export interface ReadingProgressHookReturn {
  // Progress data
  stats: ReadingStats;
  sections: ReadingSection[];
  tocItems: TableOfContentsItem[];

  // Navigation state
  navigation: BlogNavigationState;

  // Control functions
  scrollToSection: (sectionId: string) => void;
  scrollToTop: () => void;
  toggleToc: () => void;
  markSectionComplete: (sectionId: string) => void;

  // Reading assistance
  pauseReading: () => void;
  resumeReading: () => void;
  adjustReadingSpeed: (speed: number) => void;
  enableReadingMode: (mode: 'normal' | 'focus' | 'accessibility') => void;

  // Healthcare features
  getMedicalContext: () => any;
  generateReadingReport: () => any;
  checkAccessibility: () => boolean;
}

// Default configurations
export const DEFAULT_READING_CONFIG: ReadingProgressConfig = {
  showProgressBar: true,
  showPercentage: true,
  showReadingTime: true,
  showEstimatedTime: true,
  position: 'top',
  style: 'bar',
  color: '#3B82F6',
  height: 4,
  borderRadius: 2,
  autoHide: false,
  hideDelay: 3000,
  scrollThreshold: 0.1,
  updateFrequency: 100,
  medicalMode: false,
  accessibilityMode: true,
  reducedMotion: false,
  largeTargets: false,
};

export const HEALTHCARE_READING_CONFIG: ReadingProgressConfig = {
  ...DEFAULT_READING_CONFIG,
  medicalMode: true,
  accessibilityMode: true,
  largeTargets: true,
  showReadingTime: true,
  showEstimatedTime: true,
  position: 'top',
  height: 6,
  color: '#2563EB',
  autoHide: false,
  updateFrequency: 200,
};

export const DEFAULT_NAVIGATION_CONFIG: NavigationConfig = {
  showTableOfContents: true,
  tocPosition: 'sidebar',
  tocCollapsible: true,
  tocMaxDepth: 3,
  showQuickNav: true,
  showBreadcrumbs: false,
  showRelatedPosts: true,
  showShareButtons: true,
  enableKeyboardShortcuts: true,
  enableScrollToTop: true,
  enableScrollToSection: true,
  medicalNavigation: false,
  emergencyQuickExit: false,
  readingAssistance: false,
};

export const HEALTHCARE_NAVIGATION_CONFIG: NavigationConfig = {
  ...DEFAULT_NAVIGATION_CONFIG,
  medicalNavigation: true,
  emergencyQuickExit: true,
  readingAssistance: true,
  showBreadcrumbs: true,
  enableKeyboardShortcuts: true,
  tocMaxDepth: 2,
};

// Reading speed calculations
export const READING_SPEEDS = {
  average: 200, // words per minute
  slow: 150,
  fast: 300,
  technical: 150, // slower for technical content
  medical: 180, // medical content
  accessibility: 120, // for accessibility mode
};

// Content complexity levels
export const CONTENT_COMPLEXITY = {
  basic: {
    readingSpeedMultiplier: 1.2,
    comprehensionBonus: 0.1,
    focusPenalty: 0.05,
  },
  intermediate: {
    readingSpeedMultiplier: 1.0,
    comprehensionBonus: 0,
    focusPenalty: 0.1,
  },
  advanced: {
    readingSpeedMultiplier: 0.8,
    comprehensionBonus: -0.1,
    focusPenalty: 0.15,
  },
  medical: {
    readingSpeedMultiplier: 0.7,
    comprehensionBonus: 0.05,
    focusPenalty: 0.1,
  },
};

// Healthcare-specific reading modes
export const HEALTHCARE_READING_MODES = {
  normal: {
    readingSpeed: READING_SPEEDS.medical,
    focusInterval: 25,
    pauseFrequency: 0,
    assistanceLevel: 'minimal',
  },
  focus: {
    readingSpeed: READING_SPEEDS.slow,
    focusInterval: 50,
    pauseFrequency: 3,
    assistanceLevel: 'moderate',
  },
  accessibility: {
    readingSpeed: READING_SPEEDS.accessibility,
    focusInterval: 100,
    pauseFrequency: 5,
    assistanceLevel: 'maximum',
  },
  emergency: {
    readingSpeed: READING_SPEEDS.fast,
    focusInterval: 10,
    pauseFrequency: 0,
    assistanceLevel: 'minimal',
  },
};

// Keyboard shortcuts
export const KEYBOARD_SHORTCUTS = {
  scrollToTop: 'Home',
  scrollToBottom: 'End',
  nextSection: 'ArrowDown',
  previousSection: 'ArrowUp',
  toggleToc: 't',
  pauseReading: 'p',
  adjustSpeedUp: '+',
  adjustSpeedDown: '-',
  emergencyExit: 'Escape',
  showHelp: '?',
};

// Accessibility features
export const ACCESSIBILITY_FEATURES = [
  'screenReaderSupport',
  'keyboardNavigation',
  'highContrastMode',
  'reducedMotion',
  'largeText',
  'focusIndicators',
  'readingAssistance',
  'pauseControls',
  'audioDescriptions',
  'captions',
  'alternativeText',
];

// Emergency exit options
export const EMERGENCY_EXIT_OPTIONS = {
  quickExit: {
    label: 'Quick Exit',
    action: 'redirect',
    target: '/emergency-help',
    hotkey: 'Escape',
  },
  medicalHelp: {
    label: 'Medical Help',
    action: 'popup',
    content: 'medical-assistance',
    hotkey: 'Ctrl+Shift+H',
  },
  crisisSupport: {
    label: 'Crisis Support',
    action: 'redirect',
    target: 'tel:988',
    hotkey: 'Ctrl+Shift+C',
  },
};

// Reading assessment metrics
export interface ReadingAssessment {
  comprehensionLevel: number; // 0-100
  focusScore: number; // 0-100
  engagementScore: number; // 0-100
  accessibilityScore: number; // 0-100
  recommendations: string[];
  medicalRelevance?: number; // 0-100 for medical content
}