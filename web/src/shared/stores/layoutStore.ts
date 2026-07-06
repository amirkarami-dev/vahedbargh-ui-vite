import { useSyncExternalStore } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Pure UI state (was the Redux "Layout" slice). Server data does NOT belong here.
export type ThemeMode = 'light' | 'dark' | 'system'

type LayoutState = {
  collapsed: boolean
  themeMode: ThemeMode
  toggleCollapsed: () => void
  setThemeMode: (mode: ThemeMode) => void
}

export const useLayoutStore = create<LayoutState>()(
  persist(
    set => ({
      collapsed: false,
      themeMode: 'system',
      toggleCollapsed: () => set(s => ({ collapsed: !s.collapsed })),
      setThemeMode: themeMode => set({ themeMode }),
    }),
    { name: 'layout' },
  ),
)

// --- system dark-mode subscription (for themeMode === 'system') ---
const mq =
  typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)') : null

function subscribeSystemDark(cb: () => void) {
  mq?.addEventListener('change', cb)
  return () => mq?.removeEventListener('change', cb)
}

function getSystemDark() {
  return mq?.matches ?? false
}

// Resolved theme: collapses 'system' to the actual OS preference, live-updating.
export function useResolvedTheme(): 'light' | 'dark' {
  const mode = useLayoutStore(s => s.themeMode)
  const systemDark = useSyncExternalStore(subscribeSystemDark, getSystemDark)
  if (mode === 'system') return systemDark ? 'dark' : 'light'
  return mode
}
