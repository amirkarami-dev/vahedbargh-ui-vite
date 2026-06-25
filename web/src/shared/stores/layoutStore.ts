import { create } from 'zustand'

// Pure UI state (was the Redux "Layout" slice). Server data does NOT belong here.
type ThemeMode = 'light' | 'dark'

type LayoutState = {
  collapsed: boolean
  themeMode: ThemeMode
  toggleCollapsed: () => void
  setThemeMode: (mode: ThemeMode) => void
}

export const useLayoutStore = create<LayoutState>(set => ({
  collapsed: false,
  themeMode: 'light',
  toggleCollapsed: () => set(s => ({ collapsed: !s.collapsed })),
  setThemeMode: themeMode => set({ themeMode }),
}))
