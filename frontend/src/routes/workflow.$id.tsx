import { Button } from '@/components/ui/button';
import { useDocType } from '@/queries/frappe';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';

export const Route = createFileRoute('/workflow/$id')({
  // loader: ({ context: { queryClient }, params: { id } }) => {
  //   return id
  // },
  component: WorkflowDetails,
});
function WorkflowDetails() {
  const params = Route.useParams();
  const navigate = useNavigate();
  const { useSuspenseDoc, useDeleteDocMutation } =
    useDocType<HazlerWorkflow>('Hazler Workflow');
  const workflowDoc = useSuspenseDoc(params.id);
  const deleteWorkflowMutation = useDeleteDocMutation();

  function handleDeleteWorkflow() {
    // todo: ask for confirmation
    deleteWorkflowMutation.mutate(
      {
        name: params.id,
      },
      {
        onSuccess: () => {
          navigate({
            to: '/',
          });
          toast.success('Workflow deleted successfully!!!');
        },
      },
    );
  }
  return (
    <>
      <div>
        <pre>{JSON.stringify(workflowDoc.data, null, 2)}</pre>
        <Button color="rose" onClick={handleDeleteWorkflow}>
          Delete Workflow
        </Button>
      </div>
    </>
  );
}
