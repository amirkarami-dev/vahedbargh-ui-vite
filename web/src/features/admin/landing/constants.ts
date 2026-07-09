// Option sets shared across the landing-admin forms.

export const PRIORITY_OPTIONS = [
  { value: 'urgent', label: 'فوری' },
  { value: 'important', label: 'مهم' },
  { value: 'info', label: 'اطلاع‌رسانی' },
  { value: 'news', label: 'خبر' },
]

export const MEETING_STATUS_OPTIONS = [
  { value: 'برگزار شده', label: 'برگزار شده' },
  { value: 'مصوبه صادر شد', label: 'مصوبه صادر شد' },
  { value: 'در دستور کار', label: 'در دستور کار' },
  { value: 'در حال پیگیری', label: 'در حال پیگیری' },
]

export const RESOLUTION_STATUS_OPTIONS = [
  { value: 'اجرا شده', label: 'اجرا شده' },
  { value: 'در دست اقدام', label: 'در دست اقدام' },
  { value: 'در انتظار', label: 'در انتظار' },
]

// Must match the iconMap keys used by the landing HeroStats/StatsCounter.
export const STAT_ICON_OPTIONS = [
  'FileCheck',
  'Users',
  'Activity',
  'ShieldCheck',
  'TrendingUp',
  'Award',
  'Building2',
  'ClipboardCheck',
].map(v => ({ value: v, label: v }))
