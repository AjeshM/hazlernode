import { useDocType } from "@/queries/frappe";
import { createFileRoute } from "@tanstack/react-router";


export const Route = createFileRoute('/workflow/$id')({
  // loader: ({ context: { queryClient }, params: { id } }) => {
  //   return id
  // },
  component: WorkflowDetails,
})
function WorkflowDetails() {
  const params = Route.useParams();
  const { useSuspenseDoc } = useDocType<HazlerWorkflow>('Hazler Workflow');
  const workflowDoc = useSuspenseDoc(params.id);
  return (
    <>
      <div>
        <pre>{JSON.stringify(workflowDoc.data, null, 2)}</pre>
      </div>
    </>
  );
};