import * as React from 'react';
import {
  ErrorComponent,
  Link,
  Outlet,
  createRootRouteWithContext,
} from '@tanstack/react-router';
import { Toaster } from '@/components/ui/sonner';
import '@/index.css';
// Dev Tools (does not get bundled in production)
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient } from '@tanstack/react-query';
import { options as userQueryOptions } from '@/queries/user';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  sessionUser: string | null;
}>()({
  beforeLoad: async ({ location, context }) => {
    if (!context.sessionUser) {
      window.location.href = '/login?redirect-to=' + location.pathname;
    }
  },
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(userQueryOptions),
  pendingComponent: () => <p>User Data loading pending...</p>,
  errorComponent: ({ error }) => <ErrorComponent error={error} />,
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <div className="flex gap-2 p-2">
        <Link to="/" className="text-gray-800 [&.active]:font-bold">
          Hazler✨Node
        </Link>
      </div>
      <hr />
      <div className="py-2">
        <Outlet />
      </div>
      <Toaster />
      <TanStackRouterDevtools position="bottom-left" />
      <ReactQueryDevtools buttonPosition="bottom-right" />
    </React.Fragment>
  );
}
