import { Activity, Award, Building2, ClipboardCheck, FileCheck, ShieldCheck, TrendingUp, Users, type LucideIcon } from 'lucide-react'
import { useCounter, useInView } from '@/features/public/landing/hooks/useLandingHooks'
import { toPersianNumber } from '@/features/public/landing/lib/persianNumber'
import type { StatItem } from '@/features/public/landing/types'

const iconMap: Record<string, LucideIcon> = {
  FileCheck,
  Users,
  Activity,
  ShieldCheck,
  TrendingUp,
  Award,
  Building2,
  ClipboardCheck,
}

function CounterItem({ stat, active }: { stat: StatItem; active: boolean }) {
  const count = useCounter(stat.value, 2500, active)
  const Icon = iconMap[stat.iconName] ?? FileCheck
  return (
    <div className="flex flex-col items-center gap-3 px-6 py-4 text-center">
      <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center">
        <Icon className="w-6 h-6 text-blue-500" />
      </div>
      <p className="text-3xl font-black text-[var(--text-primary)]">
        {toPersianNumber(count.toLocaleString('en-US'))}
        <span className="text-blue-500">{stat.suffix}</span>
      </p>
      <p className="text-sm text-[var(--text-muted)]">{stat.label}</p>
    </div>
  )
}

export function StatsCounter({ stats }: { stats: StatItem[] }) {
  const [ref, inView] = useInView<HTMLElement>()
  return (
    <section ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">عملکرد دفتر در یک نگاه</h2>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-x-reverse divide-[var(--border)] rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] overflow-hidden">
        {stats.map(stat => (
          <CounterItem key={stat.id} stat={stat} active={inView} />
        ))}
      </div>
    </section>
  )
}
