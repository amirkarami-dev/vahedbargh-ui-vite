import { useMutation } from '@tanstack/react-query'
import { App } from 'antd'
import { getElectProjectsFullFilter } from '@/features/electProjects/api/electProjectsApi'
import { getElectProjectReport, getEngInvoiceReport } from '@/features/reports/api/reportsApi'
import type { ElectProjectFilter } from '@/features/electProjects/types'

// Reports are fetched on "گزارش گیری" click — modelled as mutations.
export function useElectProjectsReportData() {
  const { message } = App.useApp()
  return useMutation({
    mutationFn: (filter: ElectProjectFilter) => getElectProjectsFullFilter(filter),
    onError: e => message.error(String(e)),
  })
}

export function useElectProjectReportData() {
  const { message } = App.useApp()
  return useMutation({
    mutationFn: (params: Record<string, unknown>) => getElectProjectReport(params),
    onError: e => message.error(String(e)),
  })
}

export function useEngInvoiceReportData() {
  const { message } = App.useApp()
  return useMutation({
    mutationFn: (p: { engId: string; startDate: string; endDate: string }) => getEngInvoiceReport(p),
    onError: e => message.error(String(e)),
  })
}
