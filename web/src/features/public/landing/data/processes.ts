// Process-flow shapes. The flow *data* now comes from the backend
// (/Processes/GetAll); these types describe that payload and are used by
// ProcessFlowView + the public API layer.
export interface ProcessStep {
  id: string
  number: number
  title: string
  description: string
  details?: string[]
  requiredDocs?: string[]
  tools?: string[]
  note?: string
  decision?: { yes: string; no: string }
  isDecision?: boolean
}

export interface ProcessFlow {
  id: string
  title: string
  subtitle: string
  description: string
  color: string
  glowColor: string
  icon: string
  steps: ProcessStep[]
}

// Static tariff table shown on /services (not part of the process flows).
export interface EarthElectrodeTariff {
  id: number
  method: string
  price: number
  unit: string
}

export const earthElectrodeTariffs: EarthElectrodeTariff[] = [
  { id: 1, method: 'الکترود ساده ۱', price: 14_500_000, unit: 'تومان' },
  { id: 2, method: 'الکترود ساده ۲', price: 22_500_000, unit: 'تومان' },
  { id: 3, method: 'الکترود اساسی (پنج حلقه) پایه کربن', price: 28_500_000, unit: 'تومان' },
  { id: 4, method: 'الکترود افقی', price: 21_500_000, unit: 'تومان' },
  { id: 5, method: 'الکترود زمین فونداسیون', price: 480_000, unit: 'تومان/متر' },
]
