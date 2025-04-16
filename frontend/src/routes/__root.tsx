import * as React from 'react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { getSessionUserId } from '@/data/session';
import { QueryClient } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import "@/index.css";
// Dev Tools (does not get bundled in production)
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const Route = createRootRoute({
  beforeLoad: async ({ location }) => {
    if (!getSessionUserId()) {
      window.location.href = '/login?redirect-to=' + location.pathname;
    }
  },
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
