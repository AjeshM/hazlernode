import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {
  Outlet,
  RouterProvider,
  Link,
  createRouter,
  createRoute,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from './components/ui/button.tsx'

function sessionUser() {
  const cookies = new URLSearchParams(document.cookie.split('; ').join('&'))
  let _sessionUser = cookies.get('user_id')
  if (_sessionUser === 'Guest') {
    _sessionUser = null
  }
  return _sessionUser
}
// Create a client
const queryClient = new QueryClient()

const rootRoute = createRootRoute({
  beforeLoad: async ({ location }) => {
    if (!sessionUser()) {
      window.location.href = "login?redirect-to=" + location.pathname;
    } else {
      // want to ger the userInfo if not already loaded

    }
  },
  component: () => (
    <>
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
      <TanStackRouterDevtools />
    </>
  ),
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: function Index() {
    return (
      <div className="p-2">
        <h3>Welcome Home!</h3>
      </div>
    )
  },
})
async function getUserInfo() {
  const response = await fetch('/api/method/hazlernode.api.get_current_user_info')
  if (!response.ok) {
    throw new Error('Error occured while fetching getUserInfo')
  }
  const data = await response.json()
  if (data.message) {
    return data.message
  }
  return data
}

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: function About() {
    // Access the  client
    const queryClient = useQueryClient()

    // Queries
    
    const { data, isLoading, isError, isFetching } = useQuery({ queryKey: ['current_user'], queryFn: getUserInfo })
    if (isLoading) return <p>Loading...</p>;

    if (isError) return <p>Error!</p>;

    return <>
      <Avatar className='h-24 w-24'>
        <AvatarImage src={data.user_image} alt={data.full_name} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <p>{data.full_name}</p>
      {isFetching && <p>Is Refreshing...</p>}
      <Button onClick={async () => {
        const response = await fetch("/api/method/logout")
        if (!response.ok) {
          throw new Error("Error occured while logging out")
        }
        window.location.href = "/login"
      }}>Logout</Button>
    </>
  },
})

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute])

const router = createRouter({ routeTree })

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
