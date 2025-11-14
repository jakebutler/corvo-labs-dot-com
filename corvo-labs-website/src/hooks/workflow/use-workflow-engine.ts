/**
 * Advanced workflow engine hook
 * Healthcare-optimized workflow execution with state management and validation
 */

'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import {
  WorkflowDefinition,
  WorkflowState,
  WorkflowAction,
  WorkflowEvent,
  WorkflowNode,
  WorkflowEdge
} from '@/lib/workflow/workflow-types';

export interface WorkflowEngineOptions {
  autoExecute?: boolean;
  enableValidation?: boolean;
  enableAuditTrail?: boolean;
  maxExecutionTime?: number; // in milliseconds
  healthcareMode?: boolean;
}

export interface WorkflowEngineReturn {
  // State
  state: WorkflowState;
  isRunning: boolean;
  isPaused: boolean;
  isCompleted: boolean;
  hasErrors: boolean;

  // Current context
  currentNode: WorkflowNode | null;
  availableActions: string[];
  executionHistory: WorkflowEvent[];

  // Actions
  start: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  reset: () => void;
  navigateToNode: (nodeId: string) => void;
  completeNode: (nodeId: string, data?: any) => void;
  setNodeError: (nodeId: string, error: Error) => void;

  // Healthcare-specific
  validateCurrentStep: () => Promise<boolean>;
  getComplianceStatus: () => any;
  generateAuditReport: () => any;

  // Event handlers
  onNodeEnter: (callback: (node: WorkflowNode, data?: any) => void) => void;
  onNodeExit: (callback: (node: WorkflowNode, data?: any) => void) => void;
  onEdgeTraverse: (callback: (edge: WorkflowEdge, data?: any) => void) => void;
  onError: (callback: (error: Error, nodeId?: string) => void) => void;
  onCompletion: (callback: (finalState: WorkflowState) => void) => void;
}

export function useWorkflowEngine(
  workflow: WorkflowDefinition,
  options: WorkflowEngineOptions = {}
): WorkflowEngineReturn {
  const {
    autoExecute = false,
    enableValidation = true,
    enableAuditTrail = true,
    maxExecutionTime = 30 * 60 * 1000, // 30 minutes default
    healthcareMode = false,
  } = options;

  // State management
  const [state, setState] = useState<WorkflowState>({
    completedNodes: new Set(),
    activeNodes: new Set(),
    errorNodes: new Set(),
    progress: 0,
    nodeData: new Map(),
    edgeData: new Map(),
    qualityMetrics: {
      accuracy: 0,
      efficiency: 0,
      safety: 0,
      satisfaction: 0,
    },
  });

  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [executionHistory, setExecutionHistory] = useState<WorkflowEvent[]>([]);

  // Refs
  const executionStartTime = useRef<number>();
  const eventListeners = useRef<Map<string, Set<Function>>>(new Map());

  // Find nodes by type
  const getNodesByType = useCallback((type: WorkflowNode['type']) => {
    return workflow.nodes.filter(node => node.type === type);
  }, [workflow.nodes]);

  // Find start node
  const startNode = getNodesByType('start')[0] || null;

  // Find end nodes
  const endNodes = getNodesByType('end');

  // Current node
  const currentNode = state.currentNodeId
    ? workflow.nodes.find(node => node.id === state.currentNodeId) || null
    : null;

  // Calculate progress
  const calculateProgress = useCallback(() => {
    if (workflow.nodes.length === 0) return 0;
    return (state.completedNodes.size / workflow.nodes.length) * 100;
  }, [state.completedNodes.size, workflow.nodes.length]);

  // Update progress
  const updateProgress = useCallback(() => {
    const progress = calculateProgress();
    setState(prev => ({ ...prev, progress }));
  }, [calculateProgress]);

  // Add event to history
  const addEvent = useCallback((event: WorkflowEvent) => {
    setExecutionHistory(prev => [...prev, event]);

    // Trigger event listeners
    const listeners = eventListeners.current.get(event.type);
    if (listeners) {
      listeners.forEach(callback => {
        try {
          callback(event);
        } catch (error) {
          console.error('Event listener error:', error);
        }
      });
    }
  }, []);

  // Validate node transition
  const validateTransition = useCallback(async (fromNode: WorkflowNode, toNode: WorkflowNode, edge: WorkflowEdge): Promise<boolean> => {
    if (!enableValidation) return true;

    // Healthcare-specific validation
    if (healthcareMode && edge.requiresValidation) {
      if (!edge.validationCriteria || edge.validationCriteria.length === 0) {
        return true;
      }

      // Simulate validation logic (in real implementation, this would be more complex)
      const validationResults = await Promise.all(
        edge.validationCriteria.map(async (criterion) => {
          // Mock validation - replace with actual validation logic
          return Math.random() > 0.1; // 90% success rate for demo
        })
      );

      return validationResults.every(result => result);
    }

    return true;
  }, [enableValidation, healthcareMode]);

  // Navigate to node
  const navigateToNode = useCallback(async (nodeId: string) => {
    const targetNode = workflow.nodes.find(node => node.id === nodeId);
    if (!targetNode) {
      throw new Error(`Node ${nodeId} not found`);
    }

    // Exit current node if exists
    if (state.currentNodeId) {
      const currentNodeObj = workflow.nodes.find(node => node.id === state.currentNodeId);
      if (currentNodeObj) {
        addEvent({
          type: 'node-exit',
          nodeId: state.currentNodeId,
          timestamp: Date.now(),
        });
      }
    }

    // Find edge from current node to target
    let edge: WorkflowEdge | undefined;
    if (state.currentNodeId) {
      edge = workflow.edges.find(
        e => e.source === state.currentNodeId && e.target === nodeId
      );
    }

    // Validate transition if edge exists
    if (edge) {
      const isValid = await validateTransition(
        workflow.nodes.find(n => n.id === edge!.source)!,
        targetNode,
        edge
      );

      if (!isValid) {
        const error = new Error('Transition validation failed');
        setNodeError(edge.source, error);
        return false;
      }

      addEvent({
        type: 'edge-traverse',
        edgeId: edge.id,
        nodeId,
        timestamp: Date.now(),
      });
    }

    // Enter target node
    setState(prev => ({
      ...prev,
      currentNodeId: nodeId,
      activeNodes: new Set([...prev.activeNodes, nodeId]),
      errorNodes: new Set([...prev.errorNodes].filter(id => id !== nodeId)),
    }));

    addEvent({
      type: 'node-enter',
      nodeId,
      timestamp: Date.now(),
    });

    // Auto-execute process nodes
    if (targetNode.type === 'process' && autoExecute) {
      setTimeout(() => {
        completeNode(nodeId, { autoExecuted: true });
      }, 1000);
    }

    return true;
  }, [
    workflow.nodes,
    workflow.edges,
    state.currentNodeId,
    state.activeNodes,
    state.errorNodes,
    autoExecute,
    addEvent,
    validateTransition,
    setNodeError,
  ]);

  // Complete node
  const completeNode = useCallback((nodeId: string, data?: any) => {
    setState(prev => {
      const newCompletedNodes = new Set([...prev.completedNodes, nodeId]);
      const newActiveNodes = new Set([...prev.activeNodes].filter(id => id !== nodeId));
      const newNodeData = new Map(prev.nodeData);

      if (data) {
        newNodeData.set(nodeId, data);
      }

      return {
        ...prev,
        completedNodes: newCompletedNodes,
        activeNodes: newActiveNodes,
        nodeData: newNodeData,
      };
    });

    addEvent({
      type: 'node-exit',
      nodeId,
      data,
      timestamp: Date.now(),
    });

    updateProgress();

    // Check if workflow is completed
    const allEndNodesCompleted = endNodes.every(endNode =>
      state.completedNodes.has(endNode.id) || endNode.id === nodeId
    );

    if (allEndNodesCompleted) {
      setIsRunning(false);
      addEvent({
        type: 'completion',
        timestamp: Date.now(),
      });
    }
  }, [state.completedNodes, state.activeNodes, endNodes, addEvent, updateProgress]);

  // Set node error
  const setNodeError = useCallback((nodeId: string, error: Error) => {
    setState(prev => {
      const newErrorNodes = new Set([...prev.errorNodes, nodeId]);
      const newActiveNodes = new Set([...prev.activeNodes].filter(id => id !== nodeId));

      return {
        ...prev,
        errorNodes: newErrorNodes,
        activeNodes: newActiveNodes,
      };
    });

    addEvent({
      type: 'error',
      nodeId,
      data: { error: error.message },
      timestamp: Date.now(),
    });
  }, [addEvent]);

  // Start workflow
  const start = useCallback(() => {
    if (!startNode) {
      throw new Error('No start node found in workflow');
    }

    setIsRunning(true);
    setIsPaused(false);
    executionStartTime.current = Date.now();

    setState(prev => ({
      ...prev,
      startTime: Date.now(),
      estimatedCompletion: Date.now() + maxExecutionTime,
    }));

    navigateToNode(startNode.id);
  }, [startNode, navigateToNode, maxExecutionTime]);

  // Pause workflow
  const pause = useCallback(() => {
    setIsPaused(true);
  }, []);

  // Resume workflow
  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  // Stop workflow
  const stop = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);
    executionStartTime.current = undefined;
  }, []);

  // Reset workflow
  const reset = useCallback(() => {
    setState({
      completedNodes: new Set(),
      activeNodes: new Set(),
      errorNodes: new Set(),
      progress: 0,
      nodeData: new Map(),
      edgeData: new Map(),
      qualityMetrics: {
        accuracy: 0,
        efficiency: 0,
        safety: 0,
        satisfaction: 0,
      },
    });
    setIsRunning(false);
    setIsPaused(false);
    setExecutionHistory([]);
    executionStartTime.current = undefined;
  }, []);

  // Get available actions
  const availableActions = currentNode ? [
    'complete',
    ...(currentNode.type === 'decision' ? workflow.edges
      .filter(edge => edge.source === currentNode.id)
      .map(edge => edge.target) : []
    ),
    'pause',
    'stop',
  ] : ['start'];

  // Healthcare-specific methods
  const validateCurrentStep = useCallback(async (): Promise<boolean> => {
    if (!currentNode || !healthcareMode) return true;

    // Simulate step validation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Math.random() > 0.1); // 90% success rate
      }, 500);
    });
  }, [currentNode, healthcareMode]);

  const getComplianceStatus = useCallback(() => {
    if (!healthcareMode || !workflow.complianceLevel) return null;

    const completedCriticalNodes = workflow.nodes
      .filter(node => node.priority === 'critical')
      .filter(node => state.completedNodes.has(node.id));

    const totalCriticalNodes = workflow.nodes.filter(node => node.priority === 'critical').length;

    return {
      level: workflow.complianceLevel,
      criticalStepsCompleted: completedCriticalNodes.length,
      totalCriticalSteps: totalCriticalNodes,
      complianceScore: totalCriticalNodes > 0 ? (completedCriticalNodes.length / totalCriticalNodes) * 100 : 100,
      auditTrailEnabled: enableAuditTrail,
      lastValidated: Date.now(),
    };
  }, [healthcareMode, workflow.complianceLevel, workflow.nodes, state.completedNodes, enableAuditTrail]);

  const generateAuditReport = useCallback(() => {
    if (!enableAuditTrail) return null;

    return {
      workflowId: workflow.id,
      workflowName: workflow.name,
      executionTime: executionStartTime.current ? Date.now() - executionStartTime.current : 0,
      events: executionHistory,
      state,
      compliance: getComplianceStatus(),
      generatedAt: Date.now(),
    };
  }, [enableAuditTrail, workflow, executionHistory, state, getComplianceStatus]);

  // Event listener registration
  const onNodeEnter = useCallback((callback: (node: WorkflowNode, data?: any) => void) => {
    const listeners = eventListeners.current.get('node-enter') || new Set();
    listeners.add(callback);
    eventListeners.current.set('node-enter', listeners);
  }, []);

  const onNodeExit = useCallback((callback: (node: WorkflowNode, data?: any) => void) => {
    const listeners = eventListeners.current.get('node-exit') || new Set();
    listeners.add(callback);
    eventListeners.current.set('node-exit', listeners);
  }, []);

  const onEdgeTraverse = useCallback((callback: (edge: WorkflowEdge, data?: any) => void) => {
    const listeners = eventListeners.current.get('edge-traverse') || new Set();
    listeners.add(callback);
    eventListeners.current.set('edge-traverse', listeners);
  }, []);

  const onError = useCallback((callback: (error: Error, nodeId?: string) => void) => {
    const listeners = eventListeners.current.get('error') || new Set();
    listeners.add(callback);
    eventListeners.current.set('error', listeners);
  }, []);

  const onCompletion = useCallback((callback: (finalState: WorkflowState) => void) => {
    const listeners = eventListeners.current.get('completion') || new Set();
    listeners.add(callback);
    eventListeners.current.set('completion', listeners);
  }, []);

  // Check for completion
  const isCompleted = endNodes.length > 0 && endNodes.every(node =>
    state.completedNodes.has(node.id)
  );

  const hasErrors = state.errorNodes.size > 0;

  return {
    state,
    isRunning,
    isPaused,
    isCompleted,
    hasErrors,
    currentNode,
    availableActions,
    executionHistory,
    start,
    pause,
    resume,
    stop,
    reset,
    navigateToNode,
    completeNode,
    setNodeError,
    validateCurrentStep,
    getComplianceStatus,
    generateAuditReport,
    onNodeEnter,
    onNodeExit,
    onEdgeTraverse,
    onError,
    onCompletion,
  };
}