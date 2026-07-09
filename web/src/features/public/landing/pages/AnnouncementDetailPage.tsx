import { Link, useParams } from 'react-router-dom'
import { ArrowRight, Calendar, Tag } from 'lucide-react'
import { Badge } from '@/features/public/landing/components/Badge'
import { useAnnouncement } from '@/features/public/landing/api/usePublicContent'
import { PRIORITY_LABELS } from '@/features/public/landing/lib/constants'
import { formatJalaliDate } from '@/features/public/landing/lib/persianNumber'
import type { AnnouncementPriority } from '@/features/public/landing/types'

const priorityVariant: Record<AnnouncementPriority, 'urgent' | 'important' | 'info'> = {
  urgent: 'urgent',
  important: 'important',
  info: 'info',
}

export function AnnouncementDetailPage() {
  const { slug = '' } = useParams()
  const { data: ann, isLoading } = useAnnouncement(slug)

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 pb-16">
        <Link
          to="/announcements"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-blue-500 transition-colors mb-6"
        >
          <ArrowRight className="w-4 h-4" />
          بازگشت به اطلاعیه‌ها
        </Link>

        {isLoading && <div className="text-center py-16 text-[var(--text-muted)]">در حال بارگذاری…</div>}

        {!isLoading && !ann && (
          <div className="text-center py-16 text-[var(--text-muted)]">اطلاعیه مورد نظر یافت نشد.</div>
        )}

        {ann && (
          <article className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-[var(--border)]">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant={priorityVariant[ann.priority]}>{PRIORITY_LABELS[ann.priority] ?? ann.priority}</Badge>
                <span className="inline-flex items-center gap-1 text-xs text-[var(--text-muted)]">
                  <Tag className="w-3 h-3" />
                  {ann.category}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-4">{ann.title}</h1>

              <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Calendar className="w-4 h-4" />
                <time>{formatJalaliDate(ann.jalaliDate)}</time>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-[var(--text-secondary)] text-base leading-loose whitespace-pre-line">{ann.content}</p>
            </div>
          </article>
        )}
      </div>
    </div>
  )
}
