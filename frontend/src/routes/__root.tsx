import * as React from 'react';
import { Link, Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { Toaster } from '@/components/ui/sonner';
import "@/index.css";
// Dev Tools (does not get bundled in production)
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
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
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(userQueryOptions);
  },
  pendingComponent: () => <p>User Data loading pending...</p>,
  errorComponent: () => <p>User Data loading failed...</p>,
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </div>
      <hr />
      <Outlet />
      <Toaster />
      <TanStackRouterDevtools position="bottom-right" />
      <ReactQueryDevtools buttonPosition="top-right" />
    </React.Fragment>
  )
}
