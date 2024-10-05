import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Authenticated from 'components/authenticated'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, isRouteErrorResponse, RouterProvider, useRouteError } from 'react-router-dom'
import { ApplicationLayout } from 'src/app/application-layout.tsx'
import { AuthProvider } from 'src/context/AuthContext.tsx'
import './index.css'
import Attendance from './pages/Attendance/Attendance'
import Data from './pages/Data/Data'
import GlobalConfig from './pages/GlobalConfig/GlobalConfig'
import Invoice from './pages/Invoice/Invoice'
import Leads from './pages/Leads/Leads'
import OrgProfile from './pages/OrgProfile/OrgProfile'
import Dashboard from './pages/projects/dashboard'
import Reports from './pages/Reports/Reports'
import Tasks from './pages/Tasks/Tasks'
import Team from './pages/Team/Team'
import Projects from './pages/projects/Projects'
import Properties from './pages/Properties/Properties'

const queryClient = new QueryClient()

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
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/projects',
        element: <Projects />,
      },
      {
        path: 'global-config',
        element: <GlobalConfig />,
      },
      {
        path: 'leads',
        element: <Leads />,
      },
      {
        path: 'data',
        element: <Data />,
      },
      {
        path: 'invoice',
        element: <Invoice />,
      },
      {
        path: 'reports',
        element: <Reports />,
      },

      {
        path: 'properties',
        element: <Properties />,
      },
      {
        path: 'attendance',
        element: <Attendance />,
      },
      {
        path: 'tasks',
        element: <Tasks />,
      },
      {
        path: 'team',
        element: <Team />,
      },
      {
        path: 'org-profile',
        element: <OrgProfile />,
      },
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

  return <div>Uncaught Error</div>
}
