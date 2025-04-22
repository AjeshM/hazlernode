import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { createRouter, RouterProvider } from '@tanstack/react-router';

const queryClient = new QueryClient();

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { getSessionUserId } from './data/session';
import { Skeleton } from '@/components/ui/skeleton';

// Create a new router instance
const router = createRouter({
  basepath: 'hazlernode',
  routeTree,
  defaultPreloadStaleTime: 0,
  context: {
    queryClient,
    sessionUser: getSessionUserId(),
  },
  defaultErrorComponent: () => (
    <p>Something went wrong (from default error component)</p>
  ),
  defaultPendingComponent: () => (
    <div className="p-1">
      <Skeleton className="h-8 w-[30%]" />
      <Skeleton className="mt-2 h-8 w-[50%]" />
    </div>
  ),
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* // Provide the client to your App */}
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    {/* <App/> */}
  </StrictMode>,
);
