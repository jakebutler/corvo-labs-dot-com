/**
 * Healthcare-optimized Lottie animation player component
 * Provides medical content controls, accessibility features, and compliance tracking
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import Lottie from 'lottie-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLottieAnimation } from '@/hooks/lottie/use-lottie-animation';
import {
  HealthcareLottieConfig,
  HEALTHCARE_COLOR_SCHEMES,
  HEALTHCARE_ANIMATIONS,
  LOTTIE_CATEGORIES
} from '@/lib/lottie/lottie-config';
import { cn } from '@/lib/utils';

interface HealthcareLottiePlayerProps {
  config: HealthcareLottieConfig;
  className?: string;

  // Display options
  showControls?: boolean;
  showProgress?: boolean;
  showMetrics?: boolean;
  compact?: boolean;

  // Healthcare settings
  patientMode?: boolean;
  clinicianMode?: boolean;
  emergencyMode?: boolean;

  // Compliance
  auditMode?: boolean;
  consentRequired?: boolean;
  dataPrivacyMode?: boolean;

  // Events
  onPlay?: () => void;
  onPause?: () => void;
  onComplete?: () => void;
  onConsentChange?: (consented: boolean) => void;
}

export const HealthcareLottiePlayer: React.FC<HealthcareLottiePlayerProps> = ({
  config,
  className,
  showControls = true,
  showProgress = true,
  showMetrics = false,
  compact = false,
  patientMode = false,
  clinicianMode = false,
  emergencyMode = false,
  auditMode = false,
  consentRequired = false,
  dataPrivacyMode = false,
  onPlay,
  onPause,
  onComplete,
  onConsentChange,
}) => {
  const [consent, setConsent] = useState(!consentRequired);
  const [showTranscript, setShowTranscript] = useState(false);
  const [volume, setVolume] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [showSettings, setShowSettings] = useState(false);

  // Lottie animation hook
  const lottie = useLottieAnimation({
    ...config,
    medicalTheme: true,
    complianceMode: auditMode,
    patientDataMode: patientMode,
    reducedMotion: patientMode,
    accessibilityMode: true,
    autoplay: consent && !patientMode,
  });

  // Ref for animation container
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle play/pause
  const handlePlay = () => {
    lottie.play();
    onPlay?.();
  };

  const handlePause = () => {
    lottie.pause();
    onPause?.();
  };

  const handleToggle = () => {
    if (lottie.isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  // Handle consent
  const handleConsent = (granted: boolean) => {
    setConsent(granted);
    onConsentChange?.(granted);

    if (granted && !patientMode) {
      setTimeout(() => {
        handlePlay();
      }, 100);
    }
  };

  // Generate ARIA labels
  const ariaLabel = lottie.generateComplianceInfo()?.animationName || 'Medical Animation';

  // Get healthcare color scheme
  const colorScheme = config.category
    ? HEALTHCARE_COLOR_SCHEMES[LOTTIE_CATEGORIES[config.category as keyof typeof LOTTIE_CATEGORIES].colorScheme as keyof typeof HEALTHCARE_COLOR_SCHEMES]
    : HEALTHCARE_COLOR_SCHEMES['medical-blue'];

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative bg-white rounded-lg shadow-lg overflow-hidden',
        emergencyMode && 'ring-2 ring-red-500',
        patientMode && 'ring-2 ring-blue-500',
        clinicianMode && 'ring-2 ring-purple-500',
        compact && 'shadow-md',
        className
      )}
      role={patientMode ? 'img' : 'application'}
      aria-label={ariaLabel}
      aria-describedby={showTranscript ? 'animation-transcript' : undefined}
    >
      {/* Consent overlay */}
      <AnimatePresence>
        {consentRequired && !consent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Medical Content Consent
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                This animation contains medical information. By proceeding, you consent to viewing this educational content.
              </p>
              {dataPrivacyMode && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-700">
                    <strong>Privacy Notice:</strong> No personal data is collected or stored during this animation.
                  </p>
                </div>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => handleConsent(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Decline
                </button>
                <button
                  onClick={() => handleConsent(true)}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Consent
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="relative">
        {/* Animation */}
        <div className={cn(
          'relative',
          emergencyMode && 'bg-red-50',
          patientMode && 'bg-blue-50',
          clinicianMode && 'bg-purple-50'
        )}>
          {consent && (
            <Lottie
              animationData={config.animationData}
              src={config.src}
              loop={config.loop}
              autoplay={false}
              direction={direction}
              speed={speed}
              renderer={config.renderer}
              style={{
                width: config.width || '100%',
                height: config.height || 'auto',
                maxHeight: compact ? '200px' : '400px',
              }}
              lottieRef={lottie => {
                // Animation ref is handled by the hook
              }}
            />
          )}

          {/* Loading indicator */}
          {!lottie.isLoaded && consent && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                <p className="text-sm text-gray-600">Loading animation...</p>
              </div>
            </div>
          )}
        </div>

        {/* Emergency overlay */}
        {emergencyMode && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Emergency Information
          </div>
        )}

        {/* Patient mode indicator */}
        {patientMode && (
          <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Patient View
          </div>
        )}

        {/* Clinician mode indicator */}
        {clinicianMode && (
          <div className="absolute top-2 right-2 bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Clinician View
          </div>
        )}
      </div>

      {/* Controls */}
      {showControls && !compact && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            {/* Play/Pause button */}
            <button
              onClick={handleToggle}
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center transition-colors',
                lottie.isPlaying
                  ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              )}
              aria-label={lottie.isPlaying ? 'Pause animation' : 'Play animation'}
            >
              {lottie.isPlaying ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Progress bar */}
            {showProgress && (
              <div className="flex-1 mx-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="h-2 rounded-full bg-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${(lottie.currentFrame / Math.max(lottie.totalFrames, 1)) * 100}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">
                    {lottie.currentFrame} / {lottie.totalFrames}
                  </span>
                  <span className="text-xs text-gray-500">
                    {Math.round(lottie.duration)}s
                  </span>
                </div>
              </div>
            )}

            {/* Speed control */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSpeed(Math.max(0.25, speed - 0.25))}
                className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm"
                aria-label="Decrease speed"
              >
                -
              </button>
              <span className="text-sm font-medium text-gray-700 min-w-[3rem] text-center">
                {speed}x
              </span>
              <button
                onClick={() => setSpeed(Math.min(2, speed + 0.25))}
                className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm"
                aria-label="Increase speed"
              >
                +
              </button>
            </div>

            {/* Settings button */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center ml-2"
              aria-label="Settings"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97 0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.08-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1 0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z" />
              </svg>
            </button>
          </div>

          {/* Settings panel */}
          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-4 bg-gray-50 rounded-lg"
              >
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <label className="font-medium text-gray-700">Loop</label>
                    <button
                      onClick={() => lottie.setLoop(!lottie.loop)}
                      className={cn(
                        'ml-2 px-2 py-1 rounded text-xs',
                        lottie.loop ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'
                      )}
                    >
                      {lottie.loop ? 'On' : 'Off'}
                    </button>
                  </div>
                  <div>
                    <label className="font-medium text-gray-700">Transcript</label>
                    <button
                      onClick={() => setShowTranscript(!showTranscript)}
                      className={cn(
                        'ml-2 px-2 py-1 rounded text-xs',
                        showTranscript ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'
                      )}
                    >
                      {showTranscript ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Transcript for accessibility */}
      <AnimatePresence>
        {showTranscript && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-200 p-4"
          >
            <div id="animation-transcript" className="text-sm text-gray-600">
              <h4 className="font-medium text-gray-900 mb-2">Animation Transcript</h4>
              <p>
                This animation demonstrates {config.category || 'medical procedures'}.
                {config.description && ` ${config.description}`}
              </p>
              <p className="mt-2">
                Current status: {lottie.isPlaying ? 'Playing' : lottie.isPaused ? 'Paused' : lottie.isComplete ? 'Completed' : 'Ready'}.
                Progress: {Math.round((lottie.currentFrame / Math.max(lottie.totalFrames, 1)) * 100)}%
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Metrics panel */}
      {showMetrics && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Performance Metrics</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-gray-600">Load Time:</span>
              <span className="ml-2 font-medium text-gray-900">
                {lottie.getPerformanceMetrics().loadTime.toFixed(0)}ms
              </span>
            </div>
            <div>
              <span className="text-gray-600">FPS:</span>
              <span className="ml-2 font-medium text-gray-900">
                {lottie.getPerformanceMetrics().fps.toFixed(1)}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Memory:</span>
              <span className="ml-2 font-medium text-gray-900">
                {(lottie.getPerformanceMetrics().memoryUsage / 1024 / 1024).toFixed(1)}MB
              </span>
            </div>
            <div>
              <span className="text-gray-600">Cache:</span>
              <span className="ml-2 font-medium text-gray-900">
                {lottie.getPerformanceMetrics().cacheSize} items
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Accessibility screen reader announcements */}
      <div className="sr-hidden" aria-live="polite" aria-atomic="true">
        {lottie.isPlaying && `Animation playing at ${Math.round((lottie.currentFrame / Math.max(lottie.totalFrames, 1)) * 100)}%`}
        {lottie.isPaused && 'Animation paused'}
        {lottie.isComplete && 'Animation completed'}
      </div>
    </div>
  );
};

// Preset healthcare animation players
export const HeartRateMonitor: React.FC<Partial<HealthcareLottiePlayerProps>> = (props) => (
  <HealthcareLottiePlayer
    config={{
      ...HEALTHCARE_ANIMATIONS.heartRate.config,
      patientDataMode: false,
      ...props.config,
    }}
    {...props}
  />
);

export const BreathingExercise: React.FC<Partial<HealthcareLottiePlayerProps>> = (props) => (
  <HealthcareLottiePlayer
    config={{
      ...HEALTHCARE_ANIMATIONS.breathing.config,
      patientMode: true,
      ...props.config,
    }}
    {...props}
  />
);

export const EmergencyProcedure: React.FC<Partial<HealthcareLottiePlayerProps>> = (props) => (
  <HealthcareLottiePlayer
    config={{
      ...HEALTHCARE_ANIMATIONS.emergency.config,
      consentRequired: true,
      auditMode: true,
      ...props.config,
    }}
    emergencyMode={true}
    consentRequired={true}
    auditMode={true}
    {...props}
  />
);

export const MedicalEducation: React.FC<Partial<HealthcareLottiePlayerProps>> = (props) => (
  <HealthcareLottiePlayer
    config={{
      ...HEALTHCARE_ANIMATIONS.anatomy.config,
      clinicianMode: true,
      ...props.config,
    }}
    clinicianMode={true}
    showTranscript={true}
    {...props}
  />
);