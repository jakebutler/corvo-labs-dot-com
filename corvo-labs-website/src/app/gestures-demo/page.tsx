/**
 * Comprehensive gesture demonstration page
 * Showcases all mobile gesture support features with healthcare optimizations
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SwipeContainer } from '@/components/gestures/swipe-container';
import { PinchToZoom } from '@/components/gestures/pinch-to-zoom';
import { DragHandler } from '@/components/gestures/drag-handler';
import { cn } from '@/lib/utils';

export default function GesturesDemo() {
  const [swipeCount, setSwipeCount] = useState({ left: 0, right: 0, up: 0, down: 0 });
  const [zoomLevel, setZoomLevel] = useState(100);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

  const handleSwipe = (direction: 'left' | 'right' | 'up' | 'down') => {
    setSwipeCount(prev => ({ ...prev, [direction]: prev[direction] + 1 }));
  };

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
              <h1 className="text-2xl font-bold text-gray-900">Gesture Support Demo</h1>
              <p className="text-sm text-gray-600">Healthcare-optimized mobile interactions</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">
                <span className="font-medium">Zoom:</span> {zoomLevel}%
              </div>
              <div className="text-sm text-gray-500">
                <span className="font-medium">Position:</span> ({dragPosition.x}, {dragPosition.y})
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Swipe Gestures Section */}
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Swipe Gestures</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Swipe Container */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">Card Navigation</h3>
              <SwipeContainer
                onSwipeLeft={() => handleSwipe('left')}
                onSwipeRight={() => handleSwipe('right')}
                onSwipeUp={() => handleSwipe('up')}
                onSwipeDown={() => handleSwipe('down')}
                healthcareMode={true}
                showFeedback={true}
                feedbackColor="#3B82F6"
                className="h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"
              >
                <div className="h-full flex items-center justify-center text-white">
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="text-4xl mb-4"
                    >
                      👈👉👆👇
                    </motion.div>
                    <p className="text-lg font-medium">Swipe in any direction</p>
                    <p className="text-sm opacity-80">Healthcare mode enabled</p>
                  </div>
                </div>
              </SwipeContainer>
            </div>

            {/* Swipe Statistics */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">Swipe Counter</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(swipeCount).map(([direction, count]) => (
                  <motion.div
                    key={direction}
                    whileHover={{ scale: 1.05 }}
                    className={cn(
                      'p-4 rounded-lg text-center',
                      direction === 'left' && 'bg-red-50 border border-red-200',
                      direction === 'right' && 'bg-green-50 border border-green-200',
                      direction === 'up' && 'bg-blue-50 border border-blue-200',
                      direction === 'down' && 'bg-yellow-50 border border-yellow-200'
                    )}
                  >
                    <div className="text-2xl font-bold text-gray-900">{count}</div>
                    <div className="text-sm text-gray-600 capitalize">{direction}</div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Total swipes:</strong> {Object.values(swipeCount).reduce((a, b) => a + b, 0)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Use arrow keys for accessibility testing
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Pinch to Zoom Section */}
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Pinch to Zoom</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Zoomable Content */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">Medical Diagram</h3>
              <PinchToZoom
                minScale={0.5}
                maxScale={3.0}
                onZoomChange={(scale) => setZoomLevel(Math.round(scale * 100))}
                healthcareMode={true}
                showZoomControls={true}
                showZoomIndicator={true}
                className="h-80 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="h-full flex items-center justify-center p-8">
                  <div className="text-center">
                    {/* Medical diagram placeholder */}
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                      className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center"
                    >
                      <span className="text-white text-4xl">🏥</span>
                    </motion.div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Healthcare Workflow
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Pinch to zoom in on details
                    </p>
                    <div className="grid grid-cols-3 gap-2 text-xs text-gray-500">
                      <div className="p-2 bg-white rounded border">Analysis</div>
                      <div className="p-2 bg-white rounded border">Planning</div>
                      <div className="p-2 bg-white rounded border">Execution</div>
                    </div>
                  </div>
                </div>
              </PinchToZoom>
            </div>

            {/* Zoom Instructions */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">Zoom Controls</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">📱 Mobile</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Pinch two fingers to zoom</li>
                    <li>• Double tap to reset</li>
                    <li>• Drag to pan when zoomed</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">⌨️ Keyboard</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Press + to zoom in</li>
                    <li>• Press - to zoom out</li>
                    <li>• Press 0 to reset zoom</li>
                    <li>• Press Escape to exit</li>
                  </ul>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-2">♿ Healthcare Features</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Haptic feedback</li>
                    <li>• High contrast mode</li>
                    <li>• Larger touch targets</li>
                    <li>• Screen reader support</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Drag Handler Section */}
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Drag Interactions</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Draggable Elements */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">Workflow Cards</h3>
              <div className="relative h-80 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                <DragHandler
                  axis="both"
                  dragMomentum={true}
                  healthcareMode={true}
                  snapToGrid={false}
                  showDragHandle={true}
                  dragHandlePosition="top"
                  onDragEnd={(offset) => setDragPosition(offset)}
                  className="absolute top-4 left-4"
                >
                  <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-lg p-4 text-white shadow-lg cursor-move">
                    <h4 className="font-semibold mb-1">Patient Data</h4>
                    <p className="text-xs opacity-90">Drag to reorganize</p>
                  </div>
                </DragHandler>

                <DragHandler
                  axis="x"
                  dragMomentum={false}
                  healthcareMode={true}
                  snapToGrid={true}
                  gridSize={20}
                  showDragHandle={true}
                  dragHandlePosition="left"
                  className="absolute top-20 left-8"
                >
                  <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg p-4 text-white shadow-lg">
                    <h4 className="font-semibold mb-1">Analysis</h4>
                    <p className="text-xs opacity-90">Horizontal only</p>
                  </div>
                </DragHandler>

                <DragHandler
                  axis="y"
                  dragMomentum={true}
                  healthcareMode={true}
                  dragElastic={0.3}
                  className="absolute bottom-4 right-4"
                >
                  <div className="bg-gradient-to-br from-green-400 to-teal-500 rounded-lg p-4 text-white shadow-lg">
                    <h4 className="font-semibold mb-1">Treatment Plan</h4>
                    <p className="text-xs opacity-90">Vertical only</p>
                  </div>
                </DragHandler>
              </div>
            </div>

            {/* Drag Instructions */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">Drag Features</h3>
              <div className="space-y-4">
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-medium text-orange-900 mb-2">🎯 Precision Dragging</h4>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• Smooth momentum physics</li>
                    <li>• Configurable constraints</li>
                    <li>• Snap-to-grid option</li>
                    <li>• Velocity-based feedback</li>
                  </ul>
                </div>
                <div className="p-4 bg-indigo-50 rounded-lg">
                  <h4 className="font-medium text-indigo-900 mb-2">🎮 Control Options</h4>
                  <ul className="text-sm text-indigo-700 space-y-1">
                    <li>• X, Y, or both axes</li>
                    <li>• Adjustable elasticity</li>
                    <li>• Custom boundaries</li>
                    <li>• Visual drag handles</li>
                  </ul>
                </div>
                <div className="p-4 bg-pink-50 rounded-lg">
                  <h4 className="font-medium text-pink-900 mb-2">⚡ Performance</h4>
                  <ul className="text-sm text-pink-700 space-y-1">
                    <li>• 60fps optimization</li>
                    <li>• Touch-friendly</li>
                    <li>• Reduced motion support</li>
                    <li>• Healthcare haptics</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Healthcare Features Summary */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white"
        >
          <h2 className="text-xl font-semibold mb-4">Healthcare-Optimized Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">♿</div>
              <h3 className="font-semibold mb-1">Accessibility</h3>
              <p className="text-sm opacity-90">
                WCAG AA compliance, screen reader support, keyboard navigation
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">👆</div>
              <h3 className="font-semibold mb-1">Touch Targets</h3>
              <p className="text-sm opacity-90">
                Larger touch areas, gesture recognition, haptic feedback
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold mb-1">Performance</h3>
              <p className="text-sm opacity-90">
                60fps animations, reduced motion, gesture optimization
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🏥</div>
              <h3 className="font-semibold mb-1">Healthcare UX</h3>
              <p className="text-sm opacity-90">
                Professional design, clear feedback, error prevention
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}