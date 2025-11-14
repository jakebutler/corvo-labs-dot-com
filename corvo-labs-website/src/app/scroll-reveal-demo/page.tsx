/**
 * Comprehensive scroll-reveal demonstration page
 * Showcases all scroll-triggered animations with healthcare optimizations
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollRevealContainer, PatientInfoReveal, MedicalDataReveal, DiagnosticReveal, TreatmentPlanReveal, EmergencyAlertReveal } from '@/components/scroll-reveal/scroll-reveal-container';
import { SequentialReveal } from '@/components/scroll-reveal/sequential-reveal';
import { cn } from '@/lib/utils';

export default function ScrollRevealDemo() {
  const [healthcareMode, setHealthcareMode] = useState(true);
  const [debugMode, setDebugMode] = useState(false);

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
              <h1 className="text-2xl font-bold text-gray-900">Scroll-Reveal Animations</h1>
              <p className="text-sm text-gray-600">Healthcare-optimized scroll-triggered content reveals</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setHealthcareMode(!healthcareMode)}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium transition-colors',
                  healthcareMode
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                )}
              >
                {healthcareMode ? '🏥 Healthcare Mode' : 'Standard Mode'}
              </button>
              <button
                onClick={() => setDebugMode(!debugMode)}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium transition-colors',
                  debugMode
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                )}
              >
                {debugMode ? '🐛 Debug On' : '🐛 Debug Off'}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        {/* Basic Scroll Reveals */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Animation Variants</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ScrollRevealContainer
              variant="fadeInUp"
              debug={debugMode}
              healthcareMode={healthcareMode}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fade In Up</h3>
              <p className="text-gray-600">Content fades in while sliding upward from below the viewport.</p>
            </ScrollRevealContainer>

            <ScrollRevealContainer
              variant="slideInLeft"
              delay={0.1}
              debug={debugMode}
              healthcareMode={healthcareMode}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Slide In Left</h3>
              <p className="text-gray-600">Content slides in smoothly from the left side of the screen.</p>
            </ScrollRevealContainer>

            <ScrollRevealContainer
              variant="scaleIn"
              delay={0.2}
              debug={debugMode}
              healthcareMode={healthcareMode}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Scale In</h3>
              <p className="text-gray-600">Content scales up from a smaller size to full visibility.</p>
            </ScrollRevealContainer>

            <ScrollRevealContainer
              variant="perspectiveIn"
              delay={0.3}
              debug={debugMode}
              healthcareMode={healthcareMode}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Perspective In</h3>
              <p className="text-gray-600">3D perspective effect with rotation and depth.</p>
            </ScrollRevealContainer>

            <ScrollRevealContainer
              variant="blurIn"
              delay={0.4}
              debug={debugMode}
              healthcareMode={healthcareMode}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Blur In</h3>
              <p className="text-gray-600">Content transitions from blurred to focused state.</p>
            </ScrollRevealContainer>

            <ScrollRevealContainer
              variant="rotateIn"
              delay={0.5}
              debug={debugMode}
              healthcareMode={healthcareMode}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Rotate In</h3>
              <p className="text-gray-600">Content rotates into view with smooth animation.</p>
            </ScrollRevealContainer>
          </div>
        </motion.section>

        {/* Healthcare Components */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Healthcare Components</h2>

          <div className="space-y-8">
            <PatientInfoReveal
              delay={0.2}
              debug={debugMode}
              className="bg-blue-50 rounded-lg p-6 border border-blue-200"
            >
              <h3 className="text-2xl font-semibold text-blue-900 mb-4">👤 Patient Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-blue-700 font-medium">Name</p>
                  <p className="text-blue-900">John Doe</p>
                </div>
                <div>
                  <p className="text-sm text-blue-700 font-medium">Age</p>
                  <p className="text-blue-900">45 years</p>
                </div>
                <div>
                  <p className="text-sm text-blue-700 font-medium">Blood Type</p>
                  <p className="text-blue-900">O+</p>
                </div>
                <div>
                  <p className="text-sm text-blue-700 font-medium">Last Visit</p>
                  <p className="text-blue-900">2 days ago</p>
                </div>
              </div>
            </PatientInfoReveal>

            <MedicalDataReveal
              delay={0.4}
              debug={debugMode}
              className="bg-green-50 rounded-lg p-6 border border-green-200"
            >
              <h3 className="text-2xl font-semibold text-green-900 mb-4">📊 Medical Data</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white rounded">
                  <span className="text-green-700 font-medium">Heart Rate</span>
                  <span className="text-green-900 font-bold">72 bpm</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded">
                  <span className="text-green-700 font-medium">Blood Pressure</span>
                  <span className="text-green-900 font-bold">120/80 mmHg</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded">
                  <span className="text-green-700 font-medium">Temperature</span>
                  <span className="text-green-900 font-bold">98.6°F</span>
                </div>
              </div>
            </MedicalDataReveal>

            <DiagnosticReveal
              delay={0.6}
              debug={debugMode}
              className="bg-purple-50 rounded-lg p-6 border border-purple-200"
            >
              <h3 className="text-2xl font-semibold text-purple-900 mb-4">🔬 Diagnostic Results</h3>
              <div className="space-y-3">
                <div className="p-4 bg-white rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-2">Blood Work</h4>
                  <p className="text-sm text-purple-700">All values within normal range. No abnormalities detected.</p>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-2">X-Ray Results</h4>
                  <p className="text-sm text-purple-700">Clear lung fields, no signs of infection or abnormalities.</p>
                </div>
              </div>
            </DiagnosticReveal>

            <TreatmentPlanReveal
              delay={0.8}
              debug={debugMode}
              className="bg-orange-50 rounded-lg p-6 border border-orange-200"
            >
              <h3 className="text-2xl font-semibold text-orange-900 mb-4">📋 Treatment Plan</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-200 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs font-bold text-orange-700">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-orange-900">Medication</h4>
                    <p className="text-sm text-orange-700">Prescribed antibiotics for 7 days</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-200 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs font-bold text-orange-700">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-orange-900">Follow-up</h4>
                    <p className="text-sm text-orange-700">Schedule follow-up appointment in 2 weeks</p>
                  </div>
                </div>
              </div>
            </TreatmentPlanReveal>
          </div>
        </section>

        {/* Sequential Reveal */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Sequential Workflow</h2>

          <SequentialReveal
            variant="fadeInUp"
            staggerDelay={0.2}
            allowManualControl={true}
            showProgress={true}
            showNavigation={true}
            healthcareMode={healthcareMode}
            stepValidation={healthcareMode}
            requiredSteps={healthcareMode ? [0, 1, 2] : []}
            stepLabels={['Patient Check-in', 'Vital Signs', 'Examination', 'Diagnosis', 'Treatment']}
            onStepChange={(step) => console.log('Step changed:', step)}
            onSequenceComplete={() => console.log('Sequence completed')}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">🏥 Step 1: Patient Check-in</h3>
              <p className="text-gray-600">Verify patient identity, insurance information, and reason for visit. Update medical records and ensure all necessary forms are completed.</p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">❤️ Step 2: Vital Signs</h3>
              <p className="text-gray-600">Measure and record blood pressure, heart rate, temperature, respiratory rate, and oxygen saturation. Document any abnormalities or concerns.</p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">🔍 Step 3: Physical Examination</h3>
              <p className="text-gray-600">Conduct comprehensive physical examination based on patient complaints and medical history. Perform relevant tests and assessments.</p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">📈 Step 4: Diagnosis</h3>
              <p className="text-gray-600">Analyze all collected data, test results, and examination findings to determine accurate diagnosis. Consider differential diagnoses.</p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">💊 Step 5: Treatment Plan</h3>
              <p className="text-gray-600">Develop comprehensive treatment plan including medications, therapies, lifestyle recommendations, and follow-up care instructions.</p>
            </div>
          </SequentialReveal>
        </section>

        {/* Staggered Animation */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Staggered Content</h2>

          <ScrollRevealContainer
            variant="fadeInUp"
            staggerDelay={0.1}
            batchSize={3}
            debug={debugMode}
            healthcareMode={healthcareMode}
            className="space-y-4"
          >
            {Array.from({ length: 9 }, (_, index) => (
              <div
                key={index}
                className={cn(
                  'p-4 rounded-lg border',
                  healthcareMode
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-white border-gray-200'
                )}
              >
                <h4 className="font-semibold text-gray-900 mb-2">Content Block {index + 1}</h4>
                <p className="text-sm text-gray-600">
                  This is content block {index + 1} with staggered animation.
                  Each block appears with a calculated delay for smooth visual progression.
                </p>
              </div>
            ))}
          </ScrollRevealContainer>
        </section>

        {/* Performance Features */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-3xl font-bold mb-6">Performance & Accessibility</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-2">⚡</div>
              <h3 className="font-semibold mb-1">60 FPS</h3>
              <p className="text-sm opacity-90">Smooth animations with performance monitoring</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">♿</div>
              <h3 className="font-semibold mb-1">WCAG AA</h3>
              <p className="text-sm opacity-90">Full accessibility compliance</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">📱</div>
              <h3 className="font-semibold mb-1">Responsive</h3>
              <p className="text-sm opacity-90">Mobile-optimized animations</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🏥</div>
              <h3 className="font-semibold mb-1">Healthcare</h3>
              <p className="text-sm opacity-90">Medical workflow optimizations</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}