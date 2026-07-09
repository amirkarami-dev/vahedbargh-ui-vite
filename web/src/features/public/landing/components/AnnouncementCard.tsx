import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Badge } from '@/features/public/landing/components/Badge'
import { PRIORITY_LABELS } from '@/features/public/landing/lib/constants'
import { formatJalaliDate } from '@/features/public/landing/lib/persianNumber'
import { cn } from '@/features/public/landing/lib/cn'
import type { Announcement, AnnouncementPriority } from '@/features/public/landing/types'

const priorityVariant: Record<AnnouncementPriority, 'urgent' | 'important' | 'info'> = {
  urgent: 'urgent',
  important: 'important',
  info: 'info',
}

export function AnnouncementCard({
  announcement,
  variant = 'default',
}: {
  announcement: Announcement
  variant?: 'default' | 'featured'
}) {
  const { slug, title, excerpt, category, priority, jalaliDate } = announcement
  const featured = variant === 'featured'

  return (
    <Link
      to={`/announcements/${slug}`}
      className={cn(
        'group flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] overflow-hidden transition-all duration-300 hover:border-[var(--border-active)] hover:shadow-[0_0_24px_rgba(37,99,235,0.12)] hover:-translate-y-1',
        featured && 'md:flex-row',
      )}
    >
      {featured && (
        <div
          className="md:w-2/5 min-h-[180px] relative"
          style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.25), rgba(6,182,212,0.15))' }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl font-black text-white/20">{category.charAt(0)}</span>
          </div>
        </div>
      )}

      <div className={cn('flex flex-col gap-3 p-5 flex-1', featured && 'md:p-7 justify-center')}>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant={priorityVariant[priority]}>{PRIORITY_LABELS[priority] ?? priority}</Badge>
          <span className="text-xs text-[var(--text-muted)]">{category}</span>
        </div>

        <h3
          className={cn(
            'font-bold text-[var(--text-primary)] group-hover:text-blue-500 transition-colors line-clamp-2',
            featured ? 'text-xl' : 'text-base',
          )}
        >
          {title}
        </h3>

        <p className={cn('text-sm text-[var(--text-secondary)] line-clamp-2', featured && 'line-clamp-3')}>{excerpt}</p>

        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-xs text-[var(--text-muted)]">{formatJalaliDate(jalaliDate)}</span>
          <span className="flex items-center gap-1 text-xs text-blue-500 group-hover:gap-2 transition-all">
            ادامه مطلب
            <ArrowLeft className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}
