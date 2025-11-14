/**
 * Advanced reading progress hook with healthcare optimizations
 * Supports reading assistance, accessibility features, and medical content tracking
 */

'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  ReadingProgressConfig,
  ReadingStats,
  ReadingSection,
  TableOfContentsItem,
  BlogNavigationState,
  ReadingProgressHookReturn,
  DEFAULT_READING_CONFIG,
  HEALTHCARE_READING_CONFIG,
  READING_SPEEDS,
  CONTENT_COMPLEXITY,
  HEALTHCARE_READING_MODES,
  KEYBOARD_SHORTCUTS,
  ACCESSIBILITY_FEATURES,
  ReadingAssessment
} from '@/lib/reading-progress/reading-progress-types';

export interface UseReadingProgressOptions {
  config?: ReadingProgressConfig;
  contentRef?: React.RefObject<HTMLElement>;
  sections?: ReadingSection[];
  wordCount?: number;
  estimatedReadingTime?: number;
  medicalMode?: boolean;
}

export function useReadingProgress(options: UseReadingProgressOptions = {}): ReadingProgressHookReturn {
  const {
    config: userConfig = {},
    contentRef,
    sections: initialSections = [],
    wordCount: initialWordCount = 0,
    estimatedReadingTime: initialEstimatedTime = 0,
    medicalMode = false,
  } = options;

  // Merge configurations
  const config = useMemo(() => ({
    ...DEFAULT_READING_CONFIG,
    ...(medicalMode ? HEALTHCARE_READING_CONFIG : {}),
    ...userConfig,
  }), [userConfig, medicalMode]);

  // State management
  const [stats, setStats] = useState<ReadingStats>({
    totalWords: initialWordCount,
    wordsRead: 0,
    percentageComplete: 0,
    scrollProgress: 0,
    startTime: 0,
    currentTime: 0,
    readingTime: 0,
    estimatedTotalTime: initialEstimatedTime,
    estimatedRemainingTime: initialEstimatedTime,
    readingSpeed: READING_SPEEDS.average,
    averageScrollSpeed: 0,
    pauseCount: 0,
    totalPauses: 0,
    accessibilityFeatures: ACCESSIBILITY_FEATURES.filter(f =>
      config.accessibilityMode || f === 'keyboardNavigation'
    ),
  });

  const [sections, setSections] = useState<ReadingSection[]>(initialSections);
  const [navigation, setNavigation] = useState<BlogNavigationState>({
    currentSection: null,
    currentProgress: 0,
    isVisible: false,
    tocOpen: false,
    activeSection: null,
    isScrolling: false,
    scrollDirection: null,
    lastScrollY: 0,
  });

  // Refs
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const readingModeRef = useRef<'normal' | 'focus' | 'accessibility'>('normal');
  const isPausedRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const readingStartTimeRef = useRef<number>(0);
  const totalPauseTimeRef = useRef<number>(0);

  // Calculate reading statistics
  const updateReadingStats = useCallback((scrollProgress: number, currentSection?: ReadingSection) => {
    const currentTime = Date.now();
    const totalElapsed = stats.startTime ? currentTime - stats.startTime - totalPauseTimeRef.current : 0;

    // Calculate words read based on scroll progress
    const wordsRead = Math.round(stats.totalWords * scrollProgress);
    const readingSpeed = totalElapsed > 0 ? (wordsRead / totalElapsed) * 60000 : READING_SPEEDS.average; // words per minute

    // Calculate estimated remaining time
    const remainingWords = stats.totalWords - wordsRead;
    const estimatedRemainingTime = readingSpeed > 0 ? (remainingWords / readingSpeed) * 60000 : 0;

    setStats(prev => ({
      ...prev,
      wordsRead,
      percentageComplete: scrollProgress * 100,
      scrollProgress,
      currentTime,
      readingTime: totalElapsed,
      readingSpeed: Math.round(readingSpeed),
      estimatedRemainingTime: Math.round(estimatedRemainingTime),
      averageScrollSpeed: Math.abs(currentTime - prev.currentTime),
    }));

    // Update current section
    if (currentSection) {
      setNavigation(prev => ({
        ...prev,
        currentSection: currentSection.id,
        currentProgress: scrollProgress * 100,
      }));
    }
  }, [stats.totalWords, stats.startTime]);

  // Handle scroll events
  const handleScroll = useCallback(() => {
    if (!contentRef?.current) return;

    const element = contentRef.current;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight - element.clientHeight;
    const scrollProgress = Math.min(scrollTop / Math.max(scrollHeight, 1), 1);

    // Determine scroll direction
    const scrollDirection = scrollTop > lastScrollYRef.current ? 'down' : 'up';
    lastScrollYRef.current = scrollTop;

    // Find current section
    const currentSection = sections.find(section =>
      section.yPosition && scrollTop >= section.yPosition - 100
    ) || sections[sections.length - 1];

    // Update reading stats
    updateReadingStats(scrollProgress, currentSection);

    // Update navigation state
    setNavigation(prev => ({
      ...prev,
      isScrolling: true,
      scrollDirection,
      currentSection: currentSection?.id || null,
    }));

    // Clear scroll timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Set scroll timeout to detect when scrolling stops
    scrollTimeoutRef.current = setTimeout(() => {
      setNavigation(prev => ({
        ...prev,
        isScrolling: false,
        scrollDirection: null,
      }));
    }, 150);
  }, [contentRef, sections, updateReadingStats]);

  // Handle visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page hidden - pause reading
        pauseReading();
      } else {
        // Page visible - resume reading
        resumeReading();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!config.enableKeyboardShortcuts) return;

      const { key, ctrlKey, shiftKey } = event;

      // Prevent default for our shortcuts
      if (Object.values(KEYBOARD_SHORTCUTS).includes(key) ||
          (ctrlKey && shiftKey && key === 'H') ||
          (ctrlKey && shiftKey && key === 'C')) {
        event.preventDefault();
      }

      switch (key) {
        case KEYBOARD_SHORTCUTS.scrollToTop:
          scrollToTop();
          break;
        case KEYBOARD_SHORTCUTS.scrollToBottom:
          scrollToBottom();
          break;
        case KEYBOARD_SHORTCUTS.nextSection:
          navigateToNextSection();
          break;
        case KEYBOARD_SHORTCUTS.previousSection:
          navigateToPreviousSection();
          break;
        case KEYBOARD_SHORTCUTS.toggleToc:
          toggleToc();
          break;
        case KEYBOARD_SHORTCUTS.pauseReading:
          isPausedRef.current ? resumeReading() : pauseReading();
          break;
        case KEYBOARD_SHORTCUTS.adjustSpeedUp:
          adjustReadingSpeed(Math.min(stats.readingSpeed + 20, 500));
          break;
        case KEYBOARD_SHORTCUTS.adjustSpeedDown:
          adjustReadingSpeed(Math.max(stats.readingSpeed - 20, 50));
          break;
        case KEYBOARD_SHORTCUTS.emergencyExit:
          if (config.medicalMode) {
            handleEmergencyExit();
          }
          break;
        case KEYBOARD_SHORTCUTS.showHelp:
          showHelpModal();
          break;
      }

      // Healthcare emergency shortcuts
      if (config.medicalMode && ctrlKey && shiftKey) {
        if (key === 'H') {
          showMedicalAssistance();
        } else if (key === 'C') {
          showCrisisSupport();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [config.enableKeyboardShortcuts, config.medicalMode, stats.readingSpeed]);

  // Control functions
  const scrollToSection = useCallback((sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (section && contentRef?.current && section.yPosition !== undefined) {
      contentRef.current.scrollTo({
        top: section.yPosition - 100,
        behavior: 'smooth',
      });
    }
  }, [sections, contentRef]);

  const scrollToTop = useCallback(() => {
    if (contentRef?.current) {
      contentRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [contentRef]);

  const scrollToBottom = useCallback(() => {
    if (contentRef?.current) {
      contentRef.current.scrollTo({
        top: contentRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [contentRef]);

  const toggleToc = useCallback(() => {
    setNavigation(prev => ({ ...prev, tocOpen: !prev.tocOpen }));
  }, []);

  const navigateToNextSection = useCallback(() => {
    const currentIndex = sections.findIndex(s => s.id === navigation.currentSection);
    if (currentIndex < sections.length - 1) {
      scrollToSection(sections[currentIndex + 1].id);
    }
  }, [sections, navigation.currentSection, scrollToSection]);

  const navigateToPreviousSection = useCallback(() => {
    const currentIndex = sections.findIndex(s => s.id === navigation.currentSection);
    if (currentIndex > 0) {
      scrollToSection(sections[currentIndex - 1].id);
    }
  }, [sections, navigation.currentSection, scrollToSection]);

  const scrollToBottom = useCallback(() => {
    if (contentRef?.current) {
      contentRef.current.scrollTo({
        top: contentRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [contentRef]);

  // Reading assistance functions
  const pauseReading = useCallback(() => {
    if (!isPausedRef.current) {
      isPausedRef.current = true;
      totalPauseTimeRef.current += Date.now() - readingStartTimeRef.current;
      setStats(prev => ({
        ...prev,
        totalPauses: prev.totalPauses + 1,
        pauseCount: prev.pauseCount + 1,
      }));
    }
  }, []);

  const resumeReading = useCallback(() => {
    if (isPausedRef.current) {
      isPausedRef.current = false;
      readingStartTimeRef.current = Date.now();
      setStats(prev => ({
        ...prev,
        pauseCount: Math.max(0, prev.pauseCount - 1),
      }));
    }
  }, []);

  const adjustReadingSpeed = useCallback((speed: number) => {
    setStats(prev => ({ ...prev, readingSpeed: speed }));
  }, []);

  const enableReadingMode = useCallback((mode: 'normal' | 'focus' | 'accessibility') => {
    readingModeRef.current = mode;
    const modeConfig = HEALTHCARE_READING_MODES[mode];

    adjustReadingSpeed(modeConfig.readingSpeed);

    // Additional mode-specific settings
    if (mode === 'focus') {
      // Enable focus assistance
      document.body.style.lineHeight = '1.8';
    } else if (mode === 'accessibility') {
      // Enable maximum accessibility
      document.body.style.fontSize = '18px';
      document.body.style.lineHeight = '2';
    } else {
      // Reset to normal
      document.body.style.lineHeight = '';
      document.body.style.fontSize = '';
    }
  }, []);

  // Healthcare features
  const getMedicalContext = useCallback(() => {
    if (!config.medicalMode) return null;

    return {
      readingMode: readingModeRef.current,
      isPaused: isPausedRef.current,
      readingSpeed: stats.readingSpeed,
      comprehensionComplexity: sections.length > 5 ? 'high' : sections.length > 2 ? 'medium' : 'low',
      medicalRelevance: sections.some(s => s.title.toLowerCase().includes('medical') ||
                                             s.title.toLowerCase().includes('health') ||
                                             s.title.toLowerCase().includes('patient')),
      accessibilityScore: calculateAccessibilityScore(),
      recommendations: generateReadingRecommendations(),
    };
  }, [config.medicalMode, readingModeRef.current, isPausedRef.current, stats.readingSpeed, sections]);

  const generateReadingReport = useCallback(() => {
    return {
      timestamp: Date.now(),
      articleStats: stats,
      readingBehavior: {
        totalPauses: stats.totalPauses,
        averagePauseDuration: totalPauseTimeRef.current / Math.max(stats.totalPauses, 1),
        readingSpeedVariation: calculateSpeedVariation(),
        scrollBehavior: navigation.scrollDirection,
      },
      accessibility: {
        features: stats.accessibilityFeatures,
        score: calculateAccessibilityScore(),
        mode: readingModeRef.current,
        recommendations: generateAccessibilityRecommendations(),
      },
      healthcare: config.medicalMode ? getMedicalContext() : null,
    };
  }, [stats, navigation, config.medicalMode, getMedicalContext]);

  const checkAccessibility = useCallback(() => {
    const score = calculateAccessibilityScore();
    return score >= 80; // 80% or higher is considered accessible
  }, []);

  // Helper functions
  const calculateAccessibilityScore = useCallback(() => {
    let score = 100;

    // Deduct points for missing features
    if (!config.showProgressBar) score -= 10;
    if (!config.showPercentage) score -= 5;
    if (!config.enableKeyboardShortcuts) score -= 15;
    if (!config.largeTargets && config.medicalMode) score -= 10;
    if (!config.accessibilityMode) score -= 20;

    return Math.max(0, score);
  }, [config]);

  const calculateSpeedVariation = useCallback(() => {
    // This would track reading speed over time
    // For now, return a placeholder
    return 0.1; // 10% variation
  }, []);

  const generateReadingRecommendations = useCallback(() => {
    const recommendations = [];

    if (stats.readingSpeed < READING_SPEEDS.slow) {
      recommendations.push('Consider reading in a quieter environment to improve focus');
    }

    if (stats.totalPauses > 5) {
      recommendations.push('Take shorter breaks to maintain reading flow');
    }

    if (config.medicalMode && stats.percentageComplete < 50) {
      recommendations.push('Focus on understanding the medical concepts before proceeding');
    }

    return recommendations;
  }, [stats.readingSpeed, stats.totalPauses, stats.percentageComplete, config.medicalMode]);

  const generateAccessibilityRecommendations = useCallback(() => {
    const recommendations = [];

    if (!config.showProgressBar) {
      recommendations.push('Enable progress bar for better orientation');
    }

    if (!config.showPercentage) {
      recommendations.push('Show percentage completion for progress tracking');
    }

    if (!config.largeTargets && config.medicalMode) {
      recommendations.push('Increase touch target sizes for medical professionals');
    }

    return recommendations;
  }, [config]);

  // Emergency functions
  const handleEmergencyExit = useCallback(() => {
    // Implement emergency exit logic
    window.location.href = '/emergency-help';
  }, []);

  const showMedicalAssistance = useCallback(() => {
    // Show medical assistance modal
    console.log('Medical assistance requested');
  }, []);

  const showCrisisSupport = useCallback(() => {
    // Show crisis support options
    window.location.href = 'tel:988';
  }, []);

  const showHelpModal = useCallback(() => {
    // Show help modal with keyboard shortcuts
    console.log('Help modal - Keyboard shortcuts:', KEYBOARD_SHORTCUTS);
  }, []);

  // Generate table of contents
  const tocItems = useMemo(() => {
    const buildTocTree = (items: ReadingSection[]): TableOfContentsItem[] => {
      return items
        .filter(item => item.level <= (config.tocMaxDepth || 3))
        .map(item => ({
          id: item.id,
          title: item.title,
          level: item.level,
          progress: item.isCompleted ? 100 : 0,
          isActive: navigation.activeSection === item.id,
        }));
    };

    return buildTocTree(sections);
  }, [sections, config.tocMaxDepth, navigation.activeSection]);

  // Mark section as complete
  const markSectionComplete = useCallback((sectionId: string) => {
    setSections(prev => prev.map(section =>
      section.id === sectionId
        ? { ...section, isCompleted: true }
        : section
    ));
  }, []);

  // Helper functions for navigation
  const navigateToNextSection = useCallback(() => {
    const currentIndex = sections.findIndex(s => s.id === navigation.currentSection);
    if (currentIndex < sections.length - 1) {
      scrollToSection(sections[currentIndex + 1].id);
    }
  }, [sections, navigation.currentSection, scrollToSection]);

  const navigateToPreviousSection = useCallback(() => {
    const currentIndex = sections.findIndex(s => s.id === navigation.currentSection);
    if (currentIndex > 0) {
      scrollToSection(sections[currentIndex - 1].id);
    }
  }, [sections, navigation.currentSection, scrollToSection]);

  // Auto-initialize reading timer
  useEffect(() => {
    if (stats.startTime === 0 && stats.wordsRead > 0) {
      setStats(prev => ({ ...prev, startTime: Date.now() }));
      readingStartTimeRef.current = Date.now();
    }
  }, [stats.startTime, stats.wordsRead]);

  return {
    stats,
    sections,
    tocItems,
    navigation,
    scrollToSection,
    scrollToTop,
    toggleToc,
    markSectionComplete,
    pauseReading,
    resumeReading,
    adjustReadingSpeed,
    enableReadingMode,
    getMedicalContext,
    generateReadingReport,
    checkAccessibility,
  };
}