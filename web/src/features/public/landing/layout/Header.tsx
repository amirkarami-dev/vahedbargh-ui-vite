import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { LogIn, Menu, Moon, Sun, X } from 'lucide-react'
import { NAV_ITEMS, SITE_NAME } from '@/features/public/landing/lib/constants'
import { useScrolled } from '@/features/public/landing/hooks/useLandingHooks'
import { cn } from '@/features/public/landing/lib/cn'
import { isAuthenticated } from '@/shared/lib/auth'
import { useLayoutStore, useResolvedTheme } from '@/shared/stores/layoutStore'

export function Header() {
  const scrolled = useScrolled(80)
  const { pathname, search } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const resolved = useResolvedTheme()
  const setThemeMode = useLayoutStore(s => s.setThemeMode)
  const authed = isAuthenticated()

  const loginTo = authed ? '/dashboard' : '/login'
  const loginLabel = authed ? 'داشبورد' : 'ورود به سامانه'

  const toggleTheme = () => setThemeMode(resolved === 'dark' ? 'light' : 'dark')

  // Query-aware active state: items with a query (e.g. /learning?tab=simulator)
  // match only when that query is present; the plain-path sibling stays active
  // otherwise (so «آموزش» and «شبیه ساز» never highlight together).
  const isActive = (href: string) => {
    const [hPath, hQuery] = href.split('?')
    if (pathname !== hPath) return false
    if (hQuery) return search.includes(hQuery)
    return !NAV_ITEMS.some(
      n => n.href !== href && n.href.includes('?') && n.href.split('?')[0] === hPath && search.includes(n.href.split('?')[1]),
    )
  }

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled
          ? 'glass border-b border-[var(--border)] h-14'
          : 'bg-transparent h-[72px]',
      )}
    >
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* brand */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          {/* white plate behind the logo in dark mode so it stays legible */}
          <span className="w-9 h-9 rounded-lg flex items-center justify-center overflow-hidden dark:bg-white dark:p-1">
            <img src="/logo.png" alt={SITE_NAME} className="w-full h-full object-contain" />
          </span>
          <span className="font-bold text-sm text-[var(--text-primary)] hidden sm:block">{SITE_NAME}</span>
        </Link>

        {/* desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map(item => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'relative px-3 py-2 text-sm font-medium transition-colors',
                  active ? 'text-blue-500' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
                )}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-blue-500"
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="تغییر تم"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-raised)] transition-colors"
          >
            {resolved === 'dark' ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
          </button>

          <Link
            to={loginTo}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
          >
            <LogIn className="w-4 h-4" />
            {loginLabel}
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="منو"
            className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-raised)] transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/50 lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-[var(--bg-elevated)] border-l border-[var(--border)] p-5 lg:hidden flex flex-col gap-1"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-sm text-[var(--text-primary)]">{SITE_NAME}</span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="بستن"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-raised)]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {NAV_ITEMS.map(item => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      'px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                      active
                        ? 'bg-blue-600/10 text-blue-500'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-raised)] hover:text-[var(--text-primary)]',
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}

              <Link
                to={loginTo}
                onClick={() => setMenuOpen(false)}
                className="mt-3 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
              >
                <LogIn className="w-4 h-4" />
                {loginLabel}
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
