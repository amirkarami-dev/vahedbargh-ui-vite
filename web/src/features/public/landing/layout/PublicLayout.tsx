import { Outlet } from 'react-router-dom'
import { useResolvedTheme } from '@/shared/stores/layoutStore'
import { Header } from '@/features/public/landing/layout/Header'
import { Footer } from '@/features/public/landing/layout/Footer'
import '@/styles/landing.css'

// Public (landing) zone shell. Wraps content in a `.landing` root that carries a
// `.dark` class bridged from the app's theme store — this keeps ONE theme source
// of truth (antd algorithm + landing CSS vars) without touching <html>.
export function PublicLayout() {
  const resolved = useResolvedTheme()
  return (
    <div className={`landing${resolved === 'dark' ? ' dark' : ''} min-h-screen flex flex-col`} dir="rtl">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
