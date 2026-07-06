// .mrt report templates + fa localization, imported as asset URLs (Vite ?url).
import electProjectReport from '@/assets/reports/ElectProjectReport.mrt?url'
import electProjectGCity from '@/assets/reports/ElectProjectGCityReport.mrt?url'
import electProjectEngGCity from '@/assets/reports/ElectProjectEngGCityReport.mrt?url'
import engInvoiceReport from '@/assets/reports/accounting/EngInvoiceReport.mrt?url'
import engInvoiceMinimal from '@/assets/reports/accounting/EngInvoiceReport-minimal.mrt?url'
import faLocalization from '@/assets/reports/fa.xml?url'

export const reportAssets = {
  electProjectReport,
  electProjectGCity,
  electProjectEngGCity,
  engInvoiceReport,
  engInvoiceMinimal,
  faLocalization,
}
