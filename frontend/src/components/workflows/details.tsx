import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useConfirm } from '@/hooks/confirm';
import { useDocType } from '@/queries/frappe';
import { useNavigate } from '@tanstack/react-router';

import { Route as WorkflowDetailsRoute } from '@/routes/workflow.$id';
import {
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useMemo } from 'react';
import WorkflowNode from '@/components/nodes/node';
import { NodeDetailsSheetProvider } from '@/components/nodes/details-sheet';

export function WorkflowDetails() {
  const params = WorkflowDetailsRoute.useParams();
  const navigate = useNavigate();
  const confirm = useConfirm();

  const { useSuspenseDoc, useDeleteDocMutation } =
    useDocType<HazlerWorkflow>('Hazler Workflow');
  const workflowDoc = useSuspenseDoc(params.id);
  const deleteWorkflowMutation = useDeleteDocMutation();

  const nodeTypes = useMemo(
    () => ({
      workflowNode: WorkflowNode,
    }),
    [],
  );

  async function handleDeleteWorkflow() {
    const deleteConfirmed = await confirm({
      title: 'Delete Workflow',
      description: 'Are you sure?',
      actionType: 'danger',
    });

    if (!deleteConfirmed) {
      return;
    }

    deleteWorkflowMutation.mutate(
      {
        name: params.id,
      },
      {
        onSuccess: () => {
          navigate({
            to: '/',
          });
          toast.success('🗑️ Workflow deleted!');
        },
      },
    );
  }

  const workflowNodes = workflowDoc.data?.nodes?.map((node) => {
    return {
      id: String(node.name),
      position: { x: node.position_x, y: node.position_y },
      data: { ...node },
      type: 'workflowNode',
    };
  });
  const [nodes, setNodes, onNodesChange] = useNodesState(workflowNodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const onConnect = useCallback(
    // @ts-ignore
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <>
      <div className="grid h-full w-full grid-cols-3 p-2">
        <div className="col-span-1 border-r-2 border-r-zinc-200">
          <pre>{JSON.stringify(workflowDoc.data, null, 2)}</pre>
          <Button color="rose" onClick={handleDeleteWorkflow}>
            Delete Workflow
          </Button>
        </div>
        <div className="col-span-2">
          <NodeDetailsSheetProvider>
            <ReactFlow
              className="h-full w-full"
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
            >
              <Controls position="top-right" />
              <MiniMap />
              <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
          </NodeDetailsSheetProvider>
        </div>
      </div>
    </>
  );
}
