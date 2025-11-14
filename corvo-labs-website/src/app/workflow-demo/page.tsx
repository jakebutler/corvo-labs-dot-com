/**
 * Comprehensive workflow visualization demonstration
 * Showcases interactive healthcare workflow diagrams with real-time execution
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WorkflowVisualization } from '@/components/workflow/workflow-visualization';
import {
  WorkflowDefinition,
  HEALTHCARE_WORKFLOW_TEMPLATES
} from '@/lib/workflow/workflow-types';
import { cn } from '@/lib/utils';

// Sample healthcare workflow
const sampleHealthcareWorkflow: WorkflowDefinition = {
  id: 'ai-implementation-healthcare',
  name: 'AI Implementation Assessment Workflow',
  description: 'Comprehensive workflow for assessing and implementing AI solutions in healthcare organizations',
  version: '1.0',
  category: 'ai-implementation',
  healthcareMode: true,
  complianceLevel: 'enhanced',
  auditTrail: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  author: 'Corvo Labs',
  tags: ['ai', 'healthcare', 'implementation', 'assessment'],
  layout: 'hierarchical',
  direction: 'LR',
  nodes: [
    {
      id: 'start',
      type: 'start',
      label: 'Start Assessment',
      description: 'Begin the AI implementation assessment process',
      position: { x: 100, y: 200 },
      category: 'clinical',
      priority: 'high',
    },
    {
      id: 'data-collection',
      type: 'process',
      label: 'Data Collection',
      description: 'Gather organizational data, current workflows, and requirements',
      position: { x: 300, y: 200 },
      category: 'administrative',
      priority: 'high',
      estimatedDuration: 120,
    },
    {
      id: 'readiness-evaluation',
      type: 'decision',
      label: 'Readiness Evaluation',
      description: 'Evaluate organization readiness for AI implementation',
      position: { x: 500, y: 200 },
      category: 'technical',
      priority: 'critical',
    },
    {
      id: 'gap-analysis',
      type: 'process',
      label: 'Gap Analysis',
      description: 'Identify gaps between current state and AI requirements',
      position: { x: 700, y: 100 },
      category: 'technical',
      priority: 'high',
      estimatedDuration: 90,
    },
    {
      id: 'risk-assessment',
      type: 'process',
      label: 'Risk Assessment',
      description: 'Assess potential risks and mitigation strategies',
      position: { x: 700, y: 300 },
      category: 'clinical',
      priority: 'critical',
      estimatedDuration: 60,
    },
    {
      id: 'recommendation-engine',
      type: 'data',
      label: 'AI Recommendation Engine',
      description: 'Generate AI solution recommendations based on analysis',
      position: { x: 900, y: 200 },
      category: 'technical',
      priority: 'high',
    },
    {
      id: 'implementation-plan',
      type: 'process',
      label: 'Implementation Planning',
      description: 'Create detailed implementation roadmap',
      position: { x: 1100, y: 200 },
      category: 'administrative',
      priority: 'high',
      estimatedDuration: 180,
    },
    {
      id: 'validation-review',
      type: 'decision',
      label: 'Validation Review',
      description: 'Review and validate the implementation plan',
      position: { x: 1300, y: 200 },
      category: 'clinical',
      priority: 'critical',
    },
    {
      id: 'final-approval',
      type: 'process',
      label: 'Final Approval',
      description: 'Obtain final stakeholder approval',
      position: { x: 1500, y: 200 },
      category: 'administrative',
      priority: 'medium',
      estimatedDuration: 30,
    },
    {
      id: 'success-end',
      type: 'end',
      label: 'Implementation Ready',
      description: 'Workflow completed successfully',
      position: { x: 1700, y: 200 },
      category: 'clinical',
      priority: 'low',
    },
    {
      id: 'rework-end',
      type: 'end',
      label: 'Requires Rework',
      description: 'Workflow requires additional work',
      position: { x: 1300, y: 350 },
      category: 'administrative',
      priority: 'medium',
    },
  ],
  edges: [
    {
      id: 'start-data',
      source: 'start',
      target: 'data-collection',
      label: 'Initialize',
      type: 'default',
    },
    {
      id: 'data-readiness',
      source: 'data-collection',
      target: 'readiness-evaluation',
      label: 'Evaluate',
      type: 'default',
    },
    {
      id: 'readiness-gap',
      source: 'readiness-evaluation',
      target: 'gap-analysis',
      label: 'Ready',
      type: 'conditional',
      condition: 'readiness_score >= 7',
      requiresValidation: true,
    },
    {
      id: 'readiness-risk',
      source: 'readiness-evaluation',
      target: 'risk-assessment',
      label: 'Needs Analysis',
      type: 'conditional',
      condition: 'readiness_score < 7',
    },
    {
      id: 'gap-ai',
      source: 'gap-analysis',
      target: 'recommendation-engine',
      label: 'Analyze Gaps',
      type: 'dataflow',
    },
    {
      id: 'risk-ai',
      source: 'risk-assessment',
      target: 'recommendation-engine',
      label: 'Assess Risks',
      type: 'dataflow',
    },
    {
      id: 'ai-plan',
      source: 'recommendation-engine',
      target: 'implementation-plan',
      label: 'Generate Plan',
      type: 'default',
    },
    {
      id: 'plan-validation',
      source: 'implementation-plan',
      target: 'validation-review',
      label: 'Review',
      type: 'default',
      requiresValidation: true,
    },
    {
      id: 'validation-approval',
      source: 'validation-review',
      target: 'final-approval',
      label: 'Approved',
      type: 'conditional',
      condition: 'validation_passed',
      requiresValidation: true,
    },
    {
      id: 'validation-rework',
      source: 'validation-review',
      target: 'rework-end',
      label: 'Needs Changes',
      type: 'conditional',
      condition: '!validation_passed',
    },
    {
      id: 'approval-success',
      source: 'final-approval',
      target: 'success-end',
      label: 'Complete',
      type: 'default',
    },
    {
      id: 'rework-feedback',
      source: 'rework-end',
      target: 'data-collection',
      label: 'Restart',
      type: 'feedback',
      style: 'dashed',
    },
  ],
};

export default function WorkflowDemo() {
  const [selectedWorkflow, setSelectedWorkflow] = useState(sampleHealthcareWorkflow);
  const [healthcareMode, setHealthcareMode] = useState(true);
  const [complianceMode, setComplianceMode] = useState(true);
  const [auditMode, setAuditMode] = useState(true);
  const [showMetrics, setShowMetrics] = useState(true);

  // Demo workflows
  const demoWorkflows: WorkflowDefinition[] = [
    sampleHealthcareWorkflow,
    {
      ...sampleHealthcareWorkflow,
      id: 'simple-workflow',
      name: 'Simple Process Flow',
      category: 'project-management',
      healthcareMode: false,
      nodes: sampleHealthcareWorkflow.nodes.slice(0, 6),
      edges: sampleHealthcareWorkflow.edges.slice(0, 5),
    },
  ];

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
              <h1 className="text-2xl font-bold text-gray-900">Interactive Workflow Visualizations</h1>
              <p className="text-sm text-gray-600">Healthcare-optimized workflow diagrams with real-time execution</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setHealthcareMode(!healthcareMode)}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  healthcareMode
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                )}
              >
                {healthcareMode ? '🏥 Healthcare' : 'Standard'}
              </button>
              <button
                onClick={() => setComplianceMode(!complianceMode)}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  complianceMode
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                )}
              >
                {complianceMode ? '✅ Compliance' : 'Compliance'}
              </button>
              <button
                onClick={() => setAuditMode(!auditMode)}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  auditMode
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                )}
              >
                {auditMode ? '📋 Audit' : 'Audit'}
              </button>
              <button
                onClick={() => setShowMetrics(!showMetrics)}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  showMetrics
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                )}
              >
                {showMetrics ? '📊 Metrics' : 'Metrics'}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Workflow Selection */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Workflow</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {demoWorkflows.map((workflow) => (
              <button
                key={workflow.id}
                onClick={() => setSelectedWorkflow(workflow)}
                className={cn(
                  'p-4 rounded-lg border-2 transition-all text-left',
                  selectedWorkflow.id === workflow.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                )}
              >
                <h3 className="font-semibold text-gray-900 mb-1">{workflow.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{workflow.description}</p>
                <div className="flex items-center gap-2 text-xs">
                  <span className={cn(
                    'px-2 py-1 rounded',
                    workflow.category === 'ai-implementation' ? 'bg-blue-100 text-blue-700' :
                    workflow.category === 'clinical-workflow' ? 'bg-green-100 text-green-700' :
                    workflow.category === 'data-analysis' ? 'bg-purple-100 text-purple-700' :
                    'bg-gray-100 text-gray-700'
                  )}>
                    {workflow.category}
                  </span>
                  {workflow.healthcareMode && (
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded">
                      Healthcare
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </motion.section>

        {/* Main Workflow Visualization */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Workflow Execution</h2>
          <WorkflowVisualization
            workflow={selectedWorkflow}
            healthcareMode={healthcareMode}
            complianceMode={complianceMode}
            auditMode={auditMode}
            showLabels={true}
            showProgress={true}
            showControls={true}
            showMetrics={showMetrics}
            interactiveNodes={true}
            engineOptions={{
              autoExecute: false,
              enableValidation: healthcareMode,
              enableAuditTrail: auditMode,
              healthcareMode,
            }}
            onNodeClick={(node) => {
              console.log('Node clicked:', node);
            }}
            onEdgeClick={(edge) => {
              console.log('Edge clicked:', edge);
            }}
            onWorkflowComplete={() => {
              console.log('Workflow completed!');
            }}
          />
        </motion.section>

        {/* Feature Showcase */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white"
        >
          <h2 className="text-3xl font-bold mb-6">Advanced Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-2">🔄</div>
              <h3 className="font-semibold mb-1">Real-time Execution</h3>
              <p className="text-sm opacity-90">Live workflow state monitoring and control</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🏥</div>
              <h3 className="font-semibold mb-1">Healthcare Optimized</h3>
              <p className="text-sm opacity-90">HIPAA compliance and medical workflow support</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <h3 className="font-semibold mb-1">Performance Metrics</h3>
              <p className="text-sm opacity-90">Detailed execution analytics and reporting</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">✅</div>
              <h3 className="font-semibold mb-1">Step Validation</h3>
              <p className="text-sm opacity-90">Built-in validation and quality control</p>
            </div>
          </div>
        </motion.section>

        {/* Instructions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">How to Use</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Basic Controls</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Click <strong>Start</strong> to begin workflow execution</li>
                <li>• Click on nodes to navigate to specific steps</li>
                <li>• Use <strong>Pause/Resume</strong> to control execution</li>
                <li>• Click <strong>Reset</strong> to restart the workflow</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Healthcare Features</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Enable <strong>Healthcare Mode</strong> for medical workflows</li>
                <li>• <strong>Compliance Mode</strong> shows regulatory status</li>
                <li>• <strong>Audit Mode</strong> tracks all execution events</li>
                <li>• Priority indicators show critical steps</li>
              </ul>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}