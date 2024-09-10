import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Authenticated from 'components/authenticated'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, isRouteErrorResponse, RouterProvider, useRouteError } from 'react-router-dom'
import { ApplicationLayout } from 'src/app/application-layout.tsx'
import { AuthProvider } from 'src/context/AuthContext.tsx'
import './index.css'
import Dashboard from './pages/projects/dashboard'

// if (process.env.NODE_ENV === 'development') {
//     require('./mock');
// }

const queryClient = new QueryClient({})

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Authenticated>
        <ApplicationLayout />
      </Authenticated>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: 'users',
        element: <Dashboard />,
      },
      {
        path: 'groups',
        element: <Dashboard />,
      },
      {
        path: '/projects',
        element: <Dashboard />
      }
    ],
  },
  
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
)

function ErrorBoundary() {
  const error = useRouteError()
  console.error(error)

  if (isRouteErrorResponse(error)) {
    return <div>{error.statusText}</div>
  }

  // Uncaught ReferenceError: path is not defined
  return <div>Uncaught Error</div>
}
