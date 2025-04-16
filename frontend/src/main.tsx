import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {
  createRouter,
  RouterProvider,
} from '@tanstack/react-router'

const queryClient = new QueryClient();

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
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
)
