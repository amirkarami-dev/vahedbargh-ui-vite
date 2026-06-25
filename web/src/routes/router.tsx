import { createBrowserRouter, Navigate } from 'react-router-dom'
import { NonAuthLayout } from '@/layouts/NonAuthLayout'
import { VerticalLayout } from '@/layouts/VerticalLayout'
import { RequireRole } from '@/routes/RequireRole'
import { Login } from '@/features/auth/Login'
import { SubmitSms } from '@/features/auth/SubmitSms'
import { Dashboard } from '@/features/dashboard/Dashboard'
import { EngineersPage } from '@/features/engineers/EngineersPage'
import { Role } from '@/shared/types/roles'

// Route table. Per-route role limits come from old-ui/src/routes/allRoutes.js.
// The protected group below only checks authentication; specific routes add
// <RequireRole roles={[...]}> for role gating.
export const router = createBrowserRouter([
  {
    element: <NonAuthLayout />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/submit-sms', element: <SubmitSms /> },
    ],
  },
  {
    element: (
      <RequireRole>
        <VerticalLayout />
      </RequireRole>
    ),
    children: [
      { path: '/', element: <Navigate to="/dashboard" replace /> },
      { path: '/dashboard', element: <Dashboard /> },
      {
        path: '/BaseInfo/ExeEng',
        element: (
          <RequireRole roles={[Role.Administrator, Role.Accountant, Role.Section]}>
            <EngineersPage />
          </RequireRole>
        ),
      },
    ],
  },
  { path: '*', element: <Navigate to="/dashboard" replace /> },
])
