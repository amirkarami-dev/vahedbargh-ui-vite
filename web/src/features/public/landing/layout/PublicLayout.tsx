import { Outlet, useLocation } from 'react-router-dom'
import { useResolvedTheme } from '@/shared/stores/layoutStore'
import { Header } from '@/features/public/landing/layout/Header'
import { Footer } from '@/features/public/landing/layout/Footer'
import '@/styles/landing.css'

// Routes that are an immersive dark experience regardless of the theme toggle
// (their content is designed dark-only, so the header/footer must be dark too).
const FORCE_DARK = ['/learning']

// Public (landing) zone shell. Wraps content in a `.landing` root that carries a
// `.dark` class bridged from the app's theme store — this keeps ONE theme source
// of truth (antd algorithm + landing CSS vars) without touching <html>.
export function PublicLayout() {
  const resolved = useResolvedTheme()
  const { pathname } = useLocation()
  const dark = resolved === 'dark' || FORCE_DARK.some(p => pathname.startsWith(p))
  return (
    <div className={`landing${dark ? ' dark' : ''} min-h-screen flex flex-col`} dir="rtl">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
