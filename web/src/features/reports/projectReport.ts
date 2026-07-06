import { CityFromSection } from '@/shared/geo/cityName'

// projectLevelEnum filter (old-ui report radios).
export const PROJECT_REPORT_LEVELS = [
  { value: 0, label: 'بدون فیلتر' },
  { value: 1, label: 'انتظار تایید کارشناس' },
  { value: 2, label: 'انتظار تایید نقشه' },
  { value: 3, label: 'انتظار تایید نقشه با نقص' },
]

// Add the derived fields the .mrt templates reference (old-ui report mapping).
export function mapProjectReportRows(rows: Record<string, unknown>[]) {
  return rows.map(c => {
    const executor = c.executor as { fullName?: string } | undefined
    const address = String(c.address ?? '')
    return {
      ...c,
      exeFullName: executor?.fullName,
      cityName: CityFromSection(Number(c.idSection ?? 0)),
      address: address.split(':').length > 1 ? address.split(':')[1] : address,
    }
  })
}
