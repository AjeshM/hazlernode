import { createFileRoute } from "@tanstack/react-router";


export const Route = createFileRoute('/workflow/$id')({
  // loader: ({ context: { queryClient }, params: { id } }) => {
  //   return id
  // },
  component: WorkflowDetails,
})
function WorkflowDetails() {
  const id = Route.useParams().id
  return (
    <>
      <pre>
        Workflow details {id}
      </pre>
    </>
  );
};