import { Link, useParams } from 'react-router-dom'
import { ArrowRight, Calendar, FileText, Users } from 'lucide-react'
import { useMeeting } from '@/features/public/landing/api/usePublicContent'
import { MEETING_STATUS_COLORS } from '@/features/public/landing/lib/constants'
import { formatJalaliDate, toPersianNumber } from '@/features/public/landing/lib/persianNumber'

const resolutionStatusColors: Record<string, string> = {
  'اجرا شده': 'text-emerald-400',
  'در دست اقدام': 'text-amber-400',
  'در انتظار': 'text-slate-400',
}

export function MeetingDetailPage() {
  const { id = '' } = useParams()
  const { data: meeting, isLoading } = useMeeting(id)

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 pb-16">
        <Link
          to="/meetings"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-blue-500 transition-colors mb-6"
        >
          <ArrowRight className="w-4 h-4" />
          بازگشت به جلسات
        </Link>

        {isLoading && <div className="text-center py-16 text-[var(--text-muted)]">در حال بارگذاری…</div>}
        {!isLoading && !meeting && (
          <div className="text-center py-16 text-[var(--text-muted)]">جلسه مورد نظر یافت نشد.</div>
        )}

        {meeting && (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-[var(--border)]">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-sm text-[var(--text-muted)]">جلسه شماره {toPersianNumber(meeting.sessionNumber)}</span>
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border ${MEETING_STATUS_COLORS[meeting.status] ?? ''}`}
                >
                  {meeting.status}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-4">{meeting.subject}</h1>

              <div className="flex flex-wrap gap-4 text-sm text-[var(--text-muted)]">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {formatJalaliDate(meeting.jalaliDate)}
                </span>
                {meeting.attendees && meeting.attendees.length > 0 && (
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    {meeting.attendees.join(' · ')}
                  </span>
                )}
              </div>
            </div>

            {meeting.resolutions.length > 0 && (
              <div className="p-6 sm:p-8">
                <h2 className="font-semibold text-[var(--text-primary)] mb-4">مصوبات جلسه</h2>
                <ul className="space-y-3">
                  {meeting.resolutions.map((res, i) => (
                    <li key={res.id} className="flex items-start gap-3">
                      <span className="text-xs text-[var(--text-muted)] mt-1 tabular-nums">{toPersianNumber(i + 1)}.</span>
                      <div className="flex-1">
                        <p className="text-sm text-[var(--text-secondary)]">{res.text}</p>
                        <span className={`text-xs font-medium ${resolutionStatusColors[res.status] ?? 'text-slate-400'}`}>
                          {res.status}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {meeting.pdfUrl && (
              <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                <a
                  href={meeting.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  دریافت صورت‌جلسه PDF
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
