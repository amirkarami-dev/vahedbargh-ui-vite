import { App as AntApp, ConfigProvider } from 'antd'
import faIR from 'antd/locale/fa_IR'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router-dom'
import { queryClient } from '@/app/queryClient'
import { theme } from '@/app/theme'
import { router } from '@/routes/router'

export function Providers() {
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
