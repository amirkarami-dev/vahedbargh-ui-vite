import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { getRoles, isAuthenticated } from '@/shared/lib/auth'

type Props = {
  roles?: string[]
  children: ReactNode
}

// Same gate as old-ui Authmiddleware:
//  - no auth + protected -> /login (keep return-to)
//  - auth but role mismatch -> /dashboard
export function RequireRole({ roles, children }: Props) {
  const location = useLocation()

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (roles && roles.length > 0) {
    const userRoles = getRoles()
    const allowed = userRoles.some(r => roles.includes(r))
    if (!allowed) {
      return <Navigate to="/dashboard" replace />
    }
  }

  return <>{children}</>
}
