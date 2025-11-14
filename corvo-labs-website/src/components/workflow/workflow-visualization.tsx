/**
 * Interactive workflow visualization component
 * Healthcare-optimized workflow diagram with real-time execution monitoring
 */

'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  WorkflowDefinition,
  WorkflowNode,
  WorkflowEdge,
  NODE_TYPE_CONFIG,
  HEALTHCARE_CATEGORY_COLORS,
  STATUS_COLORS,
  PRIORITY_LEVELS
} from '@/lib/workflow/workflow-types';
import { useWorkflowEngine, WorkflowEngineOptions } from '@/hooks/workflow/use-workflow-engine';
import { cn } from '@/lib/utils';

interface WorkflowVisualizationProps {
  workflow: WorkflowDefinition;
  className?: string;

  // Display options
  showLabels?: boolean;
  showProgress?: boolean;
  showControls?: boolean;
  showMetrics?: boolean;

  // Interaction options
  interactiveNodes?: boolean;
  enablePan?: boolean;
  enableZoom?: boolean;

  // Healthcare settings
  healthcareMode?: boolean;
  complianceMode?: boolean;
  auditMode?: boolean;

  // Engine options
  engineOptions?: WorkflowEngineOptions;

  // Events
  onNodeClick?: (node: WorkflowNode) => void;
  onEdgeClick?: (edge: WorkflowEdge) => void;
  onWorkflowComplete?: () => void;
}

export const WorkflowVisualization: React.FC<WorkflowVisualizationProps> = ({
  workflow,
  className,
  showLabels = true,
  showProgress = true,
  showControls = true,
  showMetrics = true,
  interactiveNodes = true,
  enablePan = false,
  enableZoom = false,
  healthcareMode = false,
  complianceMode = false,
  auditMode = false,
  engineOptions = {},
  onNodeClick,
  onEdgeClick,
  onWorkflowComplete,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  // Workflow engine
  const engine = useWorkflowEngine(workflow, {
    healthcareMode,
    enableAuditTrail: auditMode,
    enableValidation: healthcareMode,
    ...engineOptions,
  });

  // Calculate layout
  const layout = useMemo(() => {
    const nodeWidth = 140;
    const nodeHeight = 80;
    const horizontalSpacing = 200;
    const verticalSpacing = 120;

    // Simple hierarchical layout
    const levels = new Map<string, number>();
    const nodesInLevel = new Map<number, WorkflowNode[]>();

    // Find start node
    const startNode = workflow.nodes.find(n => n.type === 'start');
    if (!startNode) return { nodes: [], edges: [] };

    // Build levels using BFS
    const queue: { node: WorkflowNode; level: number }[] = [{ node: startNode, level: 0 }];
    const visited = new Set<string>();

    while (queue.length > 0) {
      const { node, level } = queue.shift()!;

      if (visited.has(node.id)) continue;
      visited.add(node.id);

      levels.set(node.id, level);

      if (!nodesInLevel.has(level)) {
        nodesInLevel.set(level, []);
      }
      nodesInLevel.get(level)!.push(node);

      // Find connected nodes
      const connectedEdges = workflow.edges.filter(e => e.source === node.id);
      for (const edge of connectedEdges) {
        const targetNode = workflow.nodes.find(n => n.id === edge.target);
        if (targetNode && !visited.has(targetNode.id)) {
          queue.push({ node: targetNode, level: level + 1 });
        }
      }
    }

    // Position nodes
    const positionedNodes = workflow.nodes.map(node => {
      const level = levels.get(node.id) || 0;
      const nodesInThisLevel = nodesInLevel.get(level) || [];
      const indexInLevel = nodesInThisLevel.indexOf(node);

      const x = level * horizontalSpacing + 100;
      const y = indexInLevel * verticalSpacing + 100 - (nodesInThisLevel.length * verticalSpacing) / 2;

      return {
        ...node,
        position: { x, y },
        size: node.size || NODE_TYPE_CONFIG[node.type].defaultSize,
      };
    });

    // Calculate edge paths
    const positionedEdges = workflow.edges.map(edge => {
      const sourceNode = positionedNodes.find(n => n.id === edge.source);
      const targetNode = positionedNodes.find(n => n.id === edge.target);

      if (!sourceNode || !targetNode) return edge;

      const sourceX = sourceNode.position.x + (sourceNode.size?.width || NODE_TYPE_CONFIG[sourceNode.type].defaultSize.width) / 2;
      const sourceY = sourceNode.position.y + (sourceNode.size?.height || NODE_TYPE_CONFIG[sourceNode.type].defaultSize.height) / 2;
      const targetX = targetNode.position.x + (targetNode.size?.width || NODE_TYPE_CONFIG[targetNode.type].defaultSize.width) / 2;
      const targetY = targetNode.position.y + (targetNode.size?.height || NODE_TYPE_CONFIG[targetNode.type].defaultSize.height) / 2;

      // Simple curved path
      const midX = (sourceX + targetX) / 2;
      const midY = (sourceY + targetY) / 2;
      const controlOffset = Math.abs(targetX - sourceX) * 0.2;

      const path = edge.type === 'conditional'
        ? `M ${sourceX} ${sourceY} Q ${midX} ${midY - controlOffset} ${targetX} ${targetY}`
        : `M ${sourceX} ${sourceY} Q ${midX} ${midY + controlOffset} ${targetX} ${targetY}`;

      return {
        ...edge,
        path,
        sourcePos: { x: sourceX, y: sourceY },
        targetPos: { x: targetX, y: targetY },
      };
    });

    return {
      nodes: positionedNodes,
      edges: positionedEdges,
    };
  }, [workflow.nodes, workflow.edges]);

  // Handle node click
  const handleNodeClick = useCallback((node: WorkflowNode) => {
    if (!interactiveNodes) return;

    setSelectedNode(node.id === selectedNode ? null : node.id);
    setSelectedEdge(null);
    onNodeClick?.(node);

    // Navigate to node if workflow is running
    if (engine.isRunning && !engine.state.completedNodes.has(node.id)) {
      engine.navigateToNode(node.id);
    }
  }, [interactiveNodes, selectedNode, onNodeClick, engine]);

  // Handle edge click
  const handleEdgeClick = useCallback((edge: WorkflowEdge) => {
    setSelectedEdge(edge.id === selectedEdge ? null : edge.id);
    setSelectedNode(null);
    onEdgeClick?.(edge);
  }, [selectedEdge, onEdgeClick]);

  // Get node status
  const getNodeStatus = useCallback((node: WorkflowNode) => {
    if (engine.state.errorNodes.has(node.id)) return 'error';
    if (engine.state.activeNodes.has(node.id)) return 'active';
    if (engine.state.completedNodes.has(node.id)) return 'completed';
    return 'pending';
  }, [engine.state.activeNodes, engine.state.completedNodes, engine.state.errorNodes]);

  // Get node color
  const getNodeColor = useCallback((node: WorkflowNode) => {
    const status = getNodeStatus(node);
    const statusColor = STATUS_COLORS[status as keyof typeof STATUS_COLORS];

    if (healthcareMode && node.category) {
      const categoryColor = HEALTHCARE_CATEGORY_COLORS[node.category as keyof typeof HEALTHCARE_CATEGORY_COLORS];
      return status === 'pending' ? categoryColor : statusColor;
    }

    return statusColor;
  }, [getNodeStatus, healthcareMode]);

  // SVG dimensions
  const svgWidth = Math.max(800, ...layout.nodes.map(n => n.position.x + (n.size?.width || 140))) + 100;
  const svgHeight = Math.max(600, ...layout.nodes.map(n => n.position.y + (n.size?.height || 80))) + 100;

  // Node component
  const NodeComponent = ({ node }: { node: WorkflowNode }) => {
    const status = getNodeStatus(node);
    const isSelected = selectedNode === node.id;
    const isCurrent = engine.currentNode?.id === node.id;
    const config = NODE_TYPE_CONFIG[node.type];

    return (
      <g
        transform={`translate(${node.position.x}, ${node.position.y})`}
        className={cn(
          'cursor-pointer transition-all duration-200',
          interactiveNodes && 'hover:opacity-80'
        )}
        onClick={() => handleNodeClick(node)}
      >
        {/* Node shadow */}
        <defs>
          <filter id={`shadow-${node.id}`}>
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2" />
          </filter>
        </defs>

        {/* Node shape based on type */}
        {node.type === 'decision' && (
          <>
            <rect
              x={-(node.size?.width || 120) / 2}
              y={-(node.size?.height || 120) / 2}
              width={node.size?.width || 120}
              height={node.size?.height || 120}
              rx="8"
              transform={`rotate(45 0 0)`}
              fill={getNodeColor(node)}
              stroke={isSelected ? '#1F2937' : '#E5E7EB'}
              strokeWidth={isSelected ? 3 : 2}
              filter={`url(#shadow-${node.id})`}
            />
            <text
              x="0"
              y="0"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-white text-xs font-medium pointer-events-none"
            >
              {node.icon || config.icon}
            </text>
          </>
        )}

        {node.type === 'data' && (
          <>
            <path
              d={`M ${-(node.size?.width || 130) / 2} ${-(node.size?.height || 70) / 2}
                  L ${(node.size?.width || 130) / 2} ${-(node.size?.height || 70) / 2}
                  L ${(node.size?.width || 130) / 2 - 20} ${(node.size?.height || 70) / 2}
                  L ${-(node.size?.width || 130) / 2 + 20} ${(node.size?.height || 70) / 2}
                  Z`}
              fill={getNodeColor(node)}
              stroke={isSelected ? '#1F2937' : '#E5E7EB'}
              strokeWidth={isSelected ? 3 : 2}
              filter={`url(#shadow-${node.id})`}
            />
            <text
              x="0"
              y="0"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-white text-xs font-medium pointer-events-none"
            >
              {node.icon || config.icon}
            </text>
          </>
        )}

        {(node.type === 'start' || node.type === 'end') && (
          <>
            <circle
              r={(node.size?.width || 120) / 2}
              fill={getNodeColor(node)}
              stroke={isSelected ? '#1F2937' : '#E5E7EB'}
              strokeWidth={isSelected ? 3 : 2}
              filter={`url(#shadow-${node.id})`}
            />
            <text
              x="0"
              y="0"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-white text-xs font-medium pointer-events-none"
            >
              {node.icon || config.icon}
            </text>
          </>
        )}

        {node.type === 'process' && node.type !== 'decision' && node.type !== 'data' && node.type !== 'start' && node.type !== 'end' && (
          <>
            <rect
              x={-(node.size?.width || 140) / 2}
              y={-(node.size?.height || 80) / 2}
              width={node.size?.width || 140}
              height={node.size?.height || 80}
              rx="8"
              fill={getNodeColor(node)}
              stroke={isSelected ? '#1F2937' : '#E5E7EB'}
              strokeWidth={isSelected ? 3 : 2}
              filter={`url(#shadow-${node.id})`}
            />
            <text
              x="0"
              y="0"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-white text-xs font-medium pointer-events-none"
            >
              {node.icon || config.icon}
            </text>
          </>
        )}

        {/* Status indicator */}
        {isCurrent && (
          <motion.circle
            r="4"
            fill="#10B981"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        )}

        {/* Error indicator */}
        {status === 'error' && (
          <circle
            r="4"
            cx={(node.size?.width || 140) / 2 - 10}
            cy={-(node.size?.height || 80) / 2 + 10}
            fill="#EF4444"
          />
        )}

        {/* Healthcare priority indicator */}
        {healthcareMode && node.priority && node.priority !== 'low' && (
          <rect
            x={-(node.size?.width || 140) / 2}
            y={-(node.size?.height || 80) / 2}
            width="4"
            height={node.size?.height || 80}
            fill={PRIORITY_LEVELS[node.priority].color}
          />
        )}

        {/* Label */}
        {showLabels && (
          <text
            x="0"
            y={(node.size?.height || 80) / 2 + 20}
            textAnchor="middle"
            className="fill-gray-700 text-xs font-medium pointer-events-none"
          >
            {node.label}
          </text>
        )}
      </g>
    );
  };

  // Edge component
  const EdgeComponent = ({ edge }: { edge: WorkflowEdge & { path?: string; sourcePos?: any; targetPos?: any } }) => {
    const isSelected = selectedEdge === edge.id;
    const isTraversed = engine.executionHistory.some(e => e.edgeId === edge.id);

    return (
      <g
        className={cn(
          'cursor-pointer transition-all duration-200',
          interactiveNodes && 'hover:opacity-80'
        )}
        onClick={() => handleEdgeClick(edge)}
      >
        <path
          d={edge.path || ''}
          fill="none"
          stroke={isSelected ? '#1F2937' : isTraversed ? '#10B981' : '#9CA3AF'}
          strokeWidth={isSelected ? 3 : 2}
          strokeDasharray={edge.style === 'dashed' ? '5,5' : edge.style === 'dotted' ? '2,2' : undefined}
          markerEnd="url(#arrowhead)"
        />

        {/* Arrow marker */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3, 0 6"
              fill={isSelected ? '#1F2937' : isTraversed ? '#10B981' : '#9CA3AF'}
            />
          </marker>
        </defs>

        {/* Edge label */}
        {edge.label && showLabels && edge.sourcePos && edge.targetPos && (
          <text
            x={(edge.sourcePos.x + edge.targetPos.x) / 2}
            y={(edge.sourcePos.y + edge.targetPos.y) / 2 - 10}
            textAnchor="middle"
            className="fill-gray-600 text-xs pointer-events-none"
          >
            {edge.label}
          </text>
        )}

        {/* Healthcare validation indicator */}
        {healthcareMode && edge.requiresValidation && (
          <circle
            cx={(edge.sourcePos!.x + edge.targetPos!.x) / 2}
            cy={(edge.sourcePos!.y + edge.targetPos!.y) / 2}
            r="8"
            fill="#F59E0B"
            className="fill-white stroke-orange-500"
            strokeWidth="2"
          >
            <title>Requires validation</title>
          </circle>
        )}
      </g>
    );
  };

  return (
    <div className={cn('relative bg-white rounded-lg shadow-lg overflow-hidden', className)}>
      {/* Header */}
      {(showProgress || showControls) && (
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{workflow.name}</h2>
              {showProgress && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium text-gray-900">
                      {Math.round(engine.state.progress)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className={cn(
                        'h-2 rounded-full',
                        engine.hasErrors ? 'bg-red-500' : 'bg-blue-500'
                      )}
                      initial={{ width: 0 }}
                      animate={{ width: `${engine.state.progress}%` }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              )}
            </div>

            {showControls && (
              <div className="flex items-center gap-2">
                {!engine.isRunning && (
                  <button
                    onClick={engine.start}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Start
                  </button>
                )}
                {engine.isRunning && !engine.isPaused && (
                  <button
                    onClick={engine.pause}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    Pause
                  </button>
                )}
                {engine.isPaused && (
                  <button
                    onClick={engine.resume}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Resume
                  </button>
                )}
                <button
                  onClick={engine.reset}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Reset
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SVG Canvas */}
      <div className="overflow-auto" style={{ maxHeight: '600px' }}>
        <svg
          ref={svgRef}
          width={svgWidth}
          height={svgHeight}
          className="bg-white"
          style={{ minHeight: '600px' }}
        >
          {/* Grid pattern for healthcare mode */}
          {healthcareMode && (
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E5E7EB" strokeWidth="1"/>
              </pattern>
            </defs>
          )}
          {healthcareMode && (
            <rect width={svgWidth} height={svgHeight} fill="url(#grid)" />
          )}

          {/* Render edges first (behind nodes) */}
          {layout.edges.map(edge => (
            <EdgeComponent key={edge.id} edge={edge} />
          ))}

          {/* Render nodes */}
          {layout.nodes.map(node => (
            <NodeComponent key={node.id} node={node} />
          ))}
        </svg>
      </div>

      {/* Healthcare compliance panel */}
      {healthcareMode && complianceMode && (
        <div className="p-4 border-t border-gray-200 bg-blue-50">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">Compliance Status</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-blue-700">Level:</span>
              <span className="ml-2 font-medium text-blue-900">
                {workflow.complianceLevel || 'standard'}
              </span>
            </div>
            <div>
              <span className="text-blue-700">Completed:</span>
              <span className="ml-2 font-medium text-blue-900">
                {engine.state.completedNodes.size}/{workflow.nodes.length}
              </span>
            </div>
            <div>
              <span className="text-blue-700">Errors:</span>
              <span className="ml-2 font-medium text-red-900">
                {engine.state.errorNodes.size}
              </span>
            </div>
            <div>
              <span className="text-blue-700">Audit Trail:</span>
              <span className="ml-2 font-medium text-green-900">
                {enableAuditTrail ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Metrics panel */}
      {showMetrics && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Execution Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-gray-600">Runtime:</span>
              <span className="ml-2 font-medium text-gray-900">
                {engine.state.startTime
                  ? `${Math.round((Date.now() - engine.state.startTime) / 1000)}s`
                  : 'N/A'}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Events:</span>
              <span className="ml-2 font-medium text-gray-900">
                {engine.executionHistory.length}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Current Step:</span>
              <span className="ml-2 font-medium text-gray-900">
                {engine.currentNode?.label || 'None'}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Status:</span>
              <span className={cn(
                'ml-2 font-medium',
                engine.isCompleted ? 'text-green-900' :
                engine.hasErrors ? 'text-red-900' :
                engine.isRunning ? 'text-blue-900' :
                'text-gray-900'
              )}>
                {engine.isCompleted ? 'Completed' :
                 engine.hasErrors ? 'Error' :
                 engine.isRunning ? 'Running' :
                 'Ready'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Selected node details */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs border border-gray-200"
          >
            <h4 className="font-semibold text-gray-900 mb-2">
              {layout.nodes.find(n => n.id === selectedNode)?.label}
            </h4>
            <div className="space-y-1 text-xs text-gray-600">
              <p>Type: {layout.nodes.find(n => n.id === selectedNode)?.type}</p>
              <p>Status: {getNodeStatus(layout.nodes.find(n => n.id === selectedNode)!)}</p>
              {healthcareMode && (
                <p>Priority: {layout.nodes.find(n => n.id === selectedNode)?.priority || 'medium'}</p>
              )}
              {layout.nodes.find(n => n.id === selectedNode)?.description && (
                <p>{layout.nodes.find(n => n.id === selectedNode)?.description}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};