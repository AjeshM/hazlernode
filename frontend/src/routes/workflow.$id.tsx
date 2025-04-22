import { WorkflowDetails } from '@/components/workflows/details';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/workflow/$id')({
  // loader: ({ context: { queryClient }, params: { id } }) => {
  //   return id
  // },
  component: WorkflowDetails,
});
