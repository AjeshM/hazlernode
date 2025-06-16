import { useEffect, useMemo } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  BackgroundVariant,
  Edge,
  Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import WorkflowNode from '@/components/nodes/node';
import { AddTriggerNode } from '@/components/nodes/add-trigger-node';
import { useEditorStore } from '@/stores/workflow-editor';

export default function WorkflowEditor({
  hazlerWorkflow,
}: {
  hazlerWorkflow: HazlerWorkflow;
}) {
  // Registering custom node types
  const nodeTypes = useMemo(
    () => ({
      workflowNode: WorkflowNode,
      setTriggerButton: AddTriggerNode,
    }),
    [],
  );
  const editorStore = useEditorStore();

  /* const editorStore = useEditorStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    setNodes: state.setNodes,
    setEdges: state.setEdges,
  })); */

  useEffect(() => {
    const processedNodes = getProcessedNodes(hazlerWorkflow);
    editorStore.setNodes(processedNodes);
    editorStore.setEdges(getProcessedEdges(processedNodes));
  }, [hazlerWorkflow.nodes]);

  return (
    <ReactFlow
      className="h-full w-full"
      nodes={editorStore.nodes}
      edges={editorStore.edges}
      onNodesChange={editorStore.onNodesChange}
      onEdgesChange={editorStore.onEdgesChange}
      nodeTypes={nodeTypes}
    >
      <Controls position={'top-right'} />
      <Background
        className="bg-zinc-50"
        variant={BackgroundVariant.Dots}
        gap={12}
        size={1}
      />
    </ReactFlow>
  );
}
function getProcessedNodes(hazlerWorkflow: HazlerWorkflow): Array<Node> {
  const processedNodes: Array<Node> = [];

  let currentY = 100;
  const stepY = 120;
  const centerX = 300;

  for (const node of hazlerWorkflow.nodes || []) {
    processedNodes.push({
      id: String(node.name),
      position: { x: centerX, y: currentY },
      data: { ...node },
      type: 'workflowNode',
      draggable: false,
      focusable: true,
      // deletable: false, TODO: Enable when we are handling this!
    });

    // layout vertically
    currentY += stepY;
  }
  // To allow user to set a trigger if not already done
  if (!hazlerWorkflow.trigger_type) {
    processedNodes.push({
      id: 'set-trigger',
      position: { x: centerX, y: currentY },
      data: null,
      type: 'setTriggerButton',
      draggable: false,
      focusable: true,
    });
  }

  return processedNodes;
}

function getProcessedEdges(processedNodes: Array<Node>): Array<Edge> {
  const processedEdges: Array<Edge> = [];

  // connect 1 with 2, 2 with 3, 3 with 4, etc.
  for (let i = 0; i < processedNodes.length - 1; i++) {
    processedEdges.push({
      id: `${processedNodes[i].id}-${processedNodes[i + 1].id}`,
      source: processedNodes[i].id,
      target: processedNodes[i + 1].id,
      deletable: false,
    });
  }

  return processedEdges;
}
