import { useQuery } from '@tanstack/react-query'
import { get } from '@/shared/api/http'
import { endpoints } from '@/shared/api/endpoints'

// old-ui getDashboardToken — returns a signed Metabase embed URL.
export function useDashboardToken(dashboardId: number, enabled: boolean) {
  return useQuery({
    queryKey: ['dashboardToken', dashboardId],
    queryFn: () =>
      get<{ iframeUrl?: string }>(`${endpoints.metabase.dashboardToken}?dashboardId=${dashboardId}`),
    enabled,
  })
}
