import { useEffect, useMemo } from 'react'
import { App as AntApp, ConfigProvider } from 'antd'
import faIR from 'antd/locale/fa_IR'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router-dom'
import { queryClient } from '@/app/queryClient'
import { buildTheme } from '@/app/theme'
import { router } from '@/routes/router'
import { useResolvedTheme } from '@/shared/stores/layoutStore'

export function Providers() {
  const resolved = useResolvedTheme()
  const theme = useMemo(() => buildTheme(resolved), [resolved])

  // Keep native form controls, scrollbars, and the page canvas in sync.
  useEffect(() => {
    document.documentElement.style.colorScheme = resolved
    document.body.style.backgroundColor = resolved === 'dark' ? '#0b101b' : '#f5f5f5'
  }, [resolved])

  return (
    <ConfigProvider direction="rtl" locale={faIR} theme={theme}>
      <AntApp>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AntApp>
    </ConfigProvider>
  )
}
