import { useEffect, useMemo } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { NodeDetailsSheetProvider } from '@/components/nodes/details-sheet';
import WorkflowNode from '@/components/nodes/node';
import AddNewNode from '@/components/nodes/add-new-node';

export default function WorkflowEditor({
  hazlerNodes,
}: {
  hazlerNodes: Array<HazlerNode>;
}) {
  // Registering custom node types
  const nodeTypes = useMemo(
    () => ({
      workflowNode: WorkflowNode,
      addNewNode: AddNewNode,
    }),
    [],
  );
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const processedNodes = getProcessedNodes(hazlerNodes);
    setNodes(processedNodes);
    setEdges(getProcessedEdges(processedNodes));
  }, [hazlerNodes, setNodes, setEdges]);

  return (
    <NodeDetailsSheetProvider>
      <ReactFlow
        className="h-full w-full"
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
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
    </NodeDetailsSheetProvider>
  );
}
function getProcessedNodes(hazlerNodes: Array<HazlerNode>): Array<Node> {
  const processedNodes: Array<Node<HazlerNode | null>> = [];

  let currentY = 100;
  const stepY = 120;
  const centerX = 300;

  for (const node of hazlerNodes) {
    processedNodes.push({
      id: node.name,
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
  // To allow user to add new nodes
  processedNodes.push({
    id: 'add-new',
    position: { x: centerX, y: currentY },
    data: null,
    type: 'addNewNode',
    draggable: false,
    focusable: true,
  });

  return processedNodes;
}

function getProcessedEdges(
  processedNodes: Array<Node<HazlerNode>>,
): Array<Edge> {
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
