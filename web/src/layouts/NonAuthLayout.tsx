import { Outlet } from 'react-router-dom'

// Bare passthrough for public pages (login, register…). No header/sidebar.
export function NonAuthLayout() {
  return <Outlet />
}
