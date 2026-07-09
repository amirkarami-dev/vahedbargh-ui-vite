import { Link } from 'react-router-dom'
import { ArrowLeft, FileText } from 'lucide-react'
import { MEETING_STATUS_COLORS } from '@/features/public/landing/lib/constants'
import { formatJalaliDate, toPersianNumber } from '@/features/public/landing/lib/persianNumber'
import { cn } from '@/features/public/landing/lib/cn'
import type { Meeting } from '@/features/public/landing/types'

export function MeetingTimeline({ meetings }: { meetings: Meeting[] }) {
  return (
    <div className="relative">
      {/* vertical line */}
      <div className="absolute top-2 bottom-2 right-[7px] w-px bg-[var(--border)]" />

      <div className="flex flex-col gap-6">
        {meetings.map(meeting => {
          const statusClass = MEETING_STATUS_COLORS[meeting.status] ?? MEETING_STATUS_COLORS['در دستور کار']
          return (
            <div key={meeting.id} className="relative pr-8">
              {/* dot */}
              <span className="absolute right-0 top-1.5 w-4 h-4 rounded-full bg-blue-600 ring-4 ring-[var(--bg-base)]" />

              <div className="flex flex-col gap-2 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4 hover:border-[var(--border-active)] transition-colors">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-xs text-[var(--text-muted)]">
                    جلسه شماره {toPersianNumber(meeting.sessionNumber)} · {formatJalaliDate(meeting.jalaliDate)}
                  </span>
                  <span className={cn('inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border', statusClass)}>
                    {meeting.status}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-[var(--text-primary)]">{meeting.subject}</h3>

                <div className="flex items-center justify-between mt-1">
                  {meeting.pdfUrl ? (
                    <a
                      href={meeting.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-[var(--text-secondary)] hover:text-blue-500 transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      مشاهده صورت‌جلسه
                    </a>
                  ) : (
                    <span />
                  )}
                  <Link
                    to={`/meetings/${meeting.id}`}
                    className="flex items-center gap-1 text-xs text-blue-500 hover:gap-2 transition-all"
                  >
                    جزئیات
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
