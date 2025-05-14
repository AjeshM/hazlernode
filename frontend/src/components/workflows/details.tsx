import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useConfirm } from '@/hooks/confirm';
import { useDocType } from '@/queries/frappe';
import { useNavigate } from '@tanstack/react-router';

import { Route as WorkflowDetailsRoute } from '@/routes/workflow.$id';
import WorkflowEditor from '@/components/workflows/editor';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

export function WorkflowDetails() {
  const params = WorkflowDetailsRoute.useParams();
  const navigate = useNavigate();
  const confirm = useConfirm();

  const { useSuspenseDoc, useDeleteDocMutation } =
    useDocType<HazlerWorkflow>('Hazler Workflow');
  const workflowDoc = useSuspenseDoc(params.id);
  const deleteWorkflowMutation = useDeleteDocMutation();

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

  const hazlerNodes = workflowDoc.data.nodes || [];
  return (
    <>
      <div className="grid h-full w-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel>
            <WorkflowEditor hazlerNodes={hazlerNodes} />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>Sidebar</ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
}

// LATER:
//<Button color="rose" onClick={handleDeleteWorkflow}>
//          Delete Workflow
//</Button>
