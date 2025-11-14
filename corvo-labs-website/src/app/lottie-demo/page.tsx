/**
 * Comprehensive Lottie animation demonstration page
 * Showcases healthcare-optimized animations with advanced controls and accessibility
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HealthcareLottiePlayer, HeartRateMonitor, BreathingExercise, EmergencyProcedure, MedicalEducation } from '@/components/lottie/healthcare-lottie-player';
import {
  HealthcareLottieConfig,
  HEALTHCARE_ANIMATIONS,
  HEALTHCARE_COLOR_SCHEMES
} from '@/lib/lottie/lottie-config';
import { cn } from '@/lib/utils';

// Sample animation data (in production, these would be actual Lottie JSON files)
const sampleAnimationData = {
  heartbeat: {
    // This would be the actual Lottie JSON data
    v: "5.5.7",
    meta: { g: "LottieFiles AE ", a: "", k: "", d: "", tc: "" },
    fr: 29.9700012207031,
    ip: 0,
    op: 60.0000244811628,
    w: 1920,
    h: 1080,
    nm: "Heartbeat",
    ddd: 0,
    assets: [],
    layers: [],
  },
  breathing: {
    v: "5.5.7",
    meta: { g: "LottieFiles AE ", a: "", k: "", d: "", tc: "" },
    fr: 30,
    ip: 0,
    op: 120,
    w: 800,
    h: 600,
    nm: "Breathing Exercise",
    ddd: 0,
    assets: [],
    layers: [],
  },
};

export default function LottieDemo() {
  const [selectedMode, setSelectedMode] = useState<'patient' | 'clinician' | 'emergency'>('patient');
  const [showMetrics, setShowMetrics] = useState(true);
  const [showTranscript, setShowTranscript] = useState(false);
  const [consentMode, setConsentMode] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Healthcare Lottie Animations</h1>
              <p className="text-sm text-gray-600">Medical-optimized animations with compliance tracking</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedMode('patient')}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  selectedMode === 'patient'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                )}
              >
                👤 Patient View
              </button>
              <button
                onClick={() => setSelectedMode('clinician')}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  selectedMode === 'clinician'
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                )}
              >
                👨‍⚕️ Clinician View
              </button>
              <button
                onClick={() => setSelectedMode('emergency')}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  selectedMode === 'emergency'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                )}
              >
                🚨 Emergency
              </button>
              <button
                onClick={() => setConsentMode(!consentMode)}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  consentMode
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                )}
              >
                {consentMode ? '🔒 Consent On' : '🔓 Consent Off'}
              </button>
              <button
                onClick={() => setShowMetrics(!showMetrics)}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  showMetrics
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                )}
              >
                {showMetrics ? '📊 Metrics' : 'Metrics'}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Clinical Animations */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Clinical Procedures</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Heart Rate Monitor */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Heart Rate Monitor</h3>
              <p className="text-gray-600">
                Real-time heart rate visualization with pulse detection
              </p>
              <HeartRateMonitor
                config={{
                  ...HEALTHCARE_ANIMATIONS.heartRate.config,
                  animationData: sampleAnimationData.heartbeat,
                  category: 'clinical',
                  patientDataMode: selectedMode === 'patient',
                  consentRequired: consentMode,
                  auditMode: true,
                }}
                patientMode={selectedMode === 'patient'}
                consentRequired={consentMode}
                auditMode={true}
                showMetrics={showMetrics}
                showTranscript={showTranscript}
                className="shadow-lg"
              />
            </div>

            {/* Breathing Exercise */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Breathing Exercise</h3>
              <p className="text-gray-600">
                Guided breathing animation for relaxation and stress reduction
              </p>
              <BreathingExercise
                config={{
                  ...HEALTHCARE_ANIMATIONS.breathing.config,
                  animationData: sampleAnimationData.breathing,
                  category: 'clinical',
                  patientDataMode: true,
                  autoPauseAfter: 60,
                }}
                patientMode={true}
                showMetrics={showMetrics}
                showTranscript={showTranscript}
                className="shadow-lg"
              />
            </div>
          </div>
        </motion.section>

        {/* Diagnostic Animations */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Diagnostic Tools</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'MRI Scanner',
                description: 'Medical imaging equipment operation',
                color: 'diagnostic-purple',
              },
              {
                name: 'Blood Analysis',
                description: 'Laboratory testing process',
                color: 'diagnostic-purple',
              },
              {
                name: 'X-Ray Procedure',
                description: 'Radiological imaging process',
                color: 'diagnostic-purple',
              },
            ].map((item, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
                <HealthcareLottiePlayer
                  config={{
                    src: `/animations/${item.name.toLowerCase().replace(/\s+/g, '-')}.json`,
                    category: 'diagnostic',
                    clinicianMode: selectedMode === 'clinician',
                    consentRequired: consentMode,
                    auditMode: true,
                    width: 300,
                    height: 200,
                  }}
                  clinicianMode={selectedMode === 'clinician'}
                  consentRequired={consentMode}
                  auditMode={true}
                  compact={true}
                  showMetrics={showMetrics}
                  className="shadow-lg"
                />
              </div>
            ))}
          </div>
        </motion.section>

        {/* Emergency Procedures */}
        {selectedMode === 'emergency' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-red-50 rounded-xl p-8 border-2 border-red-200"
          >
            <h2 className="text-3xl font-bold text-red-900 mb-8">Emergency Procedures</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-red-800">Emergency Response</h3>
                <p className="text-red-700">
                  Critical medical emergency response procedures for immediate care
                </p>
                <EmergencyProcedure
                  config={{
                    src: '/animations/emergency-response.json',
                    category: 'clinical',
                    sensitivity: 'high',
                    consentRequired: true,
                    auditMode: true,
                  }}
                  emergencyMode={true}
                  consentRequired={true}
                  auditMode={true}
                  showMetrics={showMetrics}
                  className="shadow-lg border-2 border-red-300"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-red-800">CPR Demonstration</h3>
                <p className="text-red-700">
                  Step-by-step cardiopulmonary resuscitation guide
                </p>
                <HealthcareLottiePlayer
                  config={{
                    src: '/animations/cpr-demo.json',
                    category: 'educational',
                    sensitivity: 'high',
                    consentRequired: true,
                  }}
                  emergencyMode={true}
                  consentRequired={true}
                  showTranscript={true}
                  showMetrics={showMetrics}
                  className="shadow-lg border-2 border-red-300"
                />
              </div>
            </div>
          </motion.section>
        )}

        {/* Educational Content */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Educational Content</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Human Anatomy</h3>
              <p className="text-gray-600">
                Interactive anatomical visualizations for medical education
              </p>
              <MedicalEducation
                config={{
                  src: '/animations/human-anatomy.json',
                  category: 'educational',
                  clinicianMode: true,
                  interactive: true,
                }}
                clinicianMode={true}
                showTranscript={true}
                showMetrics={showMetrics}
                className="shadow-lg"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Medication Guide</h3>
              <p className="text-gray-600">
                How medications work in the body - pharmacology education
              </p>
              <HealthcareLottiePlayer
                config={{
                  src: '/animations/medication-guide.json',
                  category: 'educational',
                  patientDataMode: false,
                }}
                showTranscript={true}
                showMetrics={showMetrics}
                className="shadow-lg"
              />
            </div>
          </div>
        </motion.section>

        {/* Administrative Workflows */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Administrative Workflows</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: 'Appointment Booking',
                description: 'Patient appointment scheduling system',
                icon: '📅',
              },
              {
                name: 'Insurance Processing',
                description: 'Health insurance claim workflow',
                icon: '📄',
              },
              {
                name: 'Patient Records',
                description: 'Electronic health record management',
                icon: '📋',
              },
              {
                name: 'Billing Process',
                description: 'Medical billing and payment workflow',
                icon: '💰',
              },
            ].map((workflow, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{workflow.icon}</span>
                  <h3 className="text-lg font-semibold text-gray-900">{workflow.name}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">{workflow.description}</p>
                <HealthcareLottiePlayer
                  config={{
                    src: `/animations/${workflow.name.toLowerCase().replace(/\s+/g, '-')}.json`,
                    category: 'administrative',
                    clinicianMode: selectedMode === 'clinician',
                    width: 280,
                    height: 160,
                  }}
                  clinicianMode={selectedMode === 'clinician'}
                  compact={true}
                  showControls={false}
                  showProgress={false}
                  className="shadow-md"
                />
              </div>
            ))}
          </div>
        </motion.section>

        {/* Features and Benefits */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white"
        >
          <h2 className="text-3xl font-bold mb-6">Healthcare Animation Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-2">♿</div>
              <h3 className="font-semibold mb-1">Full Accessibility</h3>
              <p className="text-sm opacity-90">Screen reader support, keyboard navigation, reduced motion</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🔒</div>
              <h3 className="font-semibold mb-1">HIPAA Compliant</h3>
              <p className="text-sm opacity-90">Patient data protection, audit trails, consent management</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">⚡</div>
              <h3 className="font-semibold mb-1">Performance Optimized</h3>
              <p className="text-sm opacity-90">Adaptive quality, device-specific rendering, memory management</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🎯</div>
              <h3 className="font-semibold mb-1">Healthcare Focused</h3>
              <p className="text-sm opacity-90">Medical accuracy, emergency protocols, educational standards</p>
            </div>
          </div>
        </motion.section>

        {/* Usage Statistics */}
        {showMetrics && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Animation Performance</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-gray-600">Average Load Time</div>
                <div className="text-xl font-bold text-gray-900">245ms</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-gray-600">Animation FPS</div>
                <div className="text-xl font-bold text-gray-900">60fps</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-gray-600">Memory Usage</div>
                <div className="text-xl font-bold text-gray-900">12.4MB</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-gray-600">Cache Hit Rate</div>
                <div className="text-xl font-bold text-gray-900">94%</div>
              </div>
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}