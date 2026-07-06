import { get } from '@/shared/api/http'
import { endpoints } from '@/shared/api/endpoints'
import { toQuery } from '@/shared/lib/query'

export type ReportRow = Record<string, unknown>

// Engineer's project report (old-ui getElectProjectReport).
export function getElectProjectReport(params: Record<string, unknown>) {
  return get<ReportRow[]>(`${endpoints.reports.electProjectReport}?${toQuery(params)}`)
}

// Engineer invoice report between two dates (old-ui getEngInvoiceReport).
export function getEngInvoiceReport(p: { engId: string; startDate: string; endDate: string }) {
  return get<ReportRow[]>(
    `${endpoints.reports.engInvoiceReport}?${toQuery({
      engId: p.engId,
      startDate: p.startDate,
      endDate: p.endDate,
    })}`,
  )
}
