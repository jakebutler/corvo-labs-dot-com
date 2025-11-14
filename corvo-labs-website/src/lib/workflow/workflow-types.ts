/**
 * Workflow visualization types and interfaces
 * Healthcare-optimized workflow definitions and data structures
 */

export interface WorkflowNode {
  id: string;
  type: 'start' | 'process' | 'decision' | 'data' | 'end' | 'subprocess';
  label: string;
  description?: string;
  position: { x: number; y: number };
  size?: { width: number; height: number };

  // Visual properties
  color?: string;
  icon?: string;
  status?: 'pending' | 'active' | 'completed' | 'error' | 'warning';

  // Healthcare-specific
  category?: 'clinical' | 'administrative' | 'technical' | 'communication';
  priority?: 'low' | 'medium' | 'high' | 'critical';
  estimatedDuration?: number; // in minutes

  // Data
  data?: Record<string, any>;
  metadata?: Record<string, any>;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  type?: 'default' | 'conditional' | 'dataflow' | 'feedback';

  // Visual properties
  color?: string;
  style?: 'solid' | 'dashed' | 'dotted';
  animated?: boolean;

  // Conditional logic
  condition?: string;
  probability?: number; // for decision branches

  // Healthcare-specific
  requiresValidation?: boolean;
  validationCriteria?: string[];
}

export interface WorkflowDefinition {
  id: string;
  name: string;
  description: string;
  version: string;
  category: 'ai-implementation' | 'clinical-workflow' | 'data-analysis' | 'project-management';

  // Structure
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];

  // Configuration
  layout: 'hierarchical' | 'force-directed' | 'circular' | 'grid';
  direction: 'TB' | 'BT' | 'LR' | 'RL'; // Top-Bottom, Bottom-Top, Left-Right, Right-Left

  // Healthcare settings
  healthcareMode?: boolean;
  complianceLevel?: 'basic' | 'standard' | 'enhanced';
  auditTrail?: boolean;

  // Metadata
  createdAt: string;
  updatedAt: string;
  author: string;
  tags: string[];
}

export interface WorkflowState {
  // Current state
  currentNodeId?: string;
  completedNodes: Set<string>;
  activeNodes: Set<string>;
  errorNodes: Set<string>;

  // Progress tracking
  progress: number; // 0-100
  startTime?: number;
  estimatedCompletion?: number;

  // Data flow
  nodeData: Map<string, any>;
  edgeData: Map<string, any>;

  // Healthcare metrics
  patientOutcomes?: Record<string, any>;
  qualityMetrics?: {
    accuracy: number;
    efficiency: number;
    safety: number;
    satisfaction: number;
  };
}

export interface WorkflowAction {
  type: 'start' | 'pause' | 'resume' | 'stop' | 'reset' | 'navigate' | 'complete';
  nodeId?: string;
  data?: any;
  timestamp: number;
}

export interface WorkflowEvent {
  type: 'node-enter' | 'node-exit' | 'edge-traverse' | 'error' | 'warning' | 'completion';
  nodeId?: string;
  edgeId?: string;
  data?: any;
  timestamp: number;
}

// Healthcare-specific workflow templates
export const HEALTHCARE_WORKFLOW_TEMPLATES: Partial<WorkflowDefinition>[] = [
  {
    name: 'AI Implementation Assessment',
    description: 'Comprehensive workflow for assessing AI implementation readiness in healthcare organizations',
    category: 'ai-implementation',
    healthcareMode: true,
    complianceLevel: 'enhanced',
    tags: ['ai', 'assessment', 'healthcare', 'implementation'],
  },
  {
    name: 'Patient Data Processing Pipeline',
    description: 'Secure workflow for processing and analyzing patient healthcare data',
    category: 'data-analysis',
    healthcareMode: true,
    auditTrail: true,
    tags: ['patient-data', 'hipaa', 'processing', 'analysis'],
  },
  {
    name: 'Clinical Decision Support',
    description: 'AI-powered clinical decision support workflow for healthcare providers',
    category: 'clinical-workflow',
    healthcareMode: true,
    complianceLevel: 'enhanced',
    tags: ['clinical', 'decision-support', 'ai', 'healthcare'],
  },
];

// Node type configurations
export const NODE_TYPE_CONFIG = {
  start: {
    defaultSize: { width: 120, height: 60 },
    defaultColor: '#10B981', // Green
    icon: '▶️',
  },
  process: {
    defaultSize: { width: 140, height: 80 },
    defaultColor: '#3B82F6', // Blue
    icon: '⚙️',
  },
  decision: {
    defaultSize: { width: 120, height: 120 },
    defaultColor: '#F59E0B', // Amber
    icon: '❓',
  },
  data: {
    defaultSize: { width: 130, height: 70 },
    defaultColor: '#8B5CF6', // Purple
    icon: '📊',
  },
  end: {
    defaultSize: { width: 120, height: 60 },
    defaultColor: '#EF4444', // Red
    icon: '🏁',
  },
  subprocess: {
    defaultSize: { width: 160, height: 80 },
    defaultColor: '#06B6D4', // Cyan
    icon: '📋',
  },
};

// Healthcare category colors
export const HEALTHCARE_CATEGORY_COLORS = {
  clinical: '#3B82F6',    // Blue
  administrative: '#10B981', // Green
  technical: '#8B5CF6',   // Purple
  communication: '#F59E0B', // Amber
};

// Status colors
export const STATUS_COLORS = {
  pending: '#9CA3AF',     // Gray
  active: '#3B82F6',      // Blue
  completed: '#10B981',   // Green
  error: '#EF4444',       // Red
  warning: '#F59E0B',     // Amber
};

// Priority levels
export const PRIORITY_LEVELS = {
  low: { value: 1, color: '#10B981', label: 'Low' },
  medium: { value: 2, color: '#F59E0B', label: 'Medium' },
  high: { value: 3, color: '#EF4444', label: 'High' },
  critical: { value: 4, color: '#991B1B', label: 'Critical' },
};

// Compliance level definitions
export const COMPLIANCE_LEVELS = {
  basic: {
    requirements: ['data-privacy', 'accessibility'],
    auditFrequency: 'quarterly',
    documentationLevel: 'standard',
  },
  standard: {
    requirements: ['hipaa', 'data-privacy', 'accessibility', 'security'],
    auditFrequency: 'monthly',
    documentationLevel: 'detailed',
  },
  enhanced: {
    requirements: ['hipaa', 'gdpr', 'data-privacy', 'accessibility', 'security', 'audit-trail'],
    auditFrequency: 'weekly',
    documentationLevel: 'comprehensive',
  },
};