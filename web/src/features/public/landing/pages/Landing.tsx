import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { HeroSection } from '@/features/public/landing/components/HeroSection'
import { ServiceGrid } from '@/features/public/landing/components/ServiceGrid'
import { StatsCounter } from '@/features/public/landing/components/StatsCounter'
import { AnnouncementCard } from '@/features/public/landing/components/AnnouncementCard'
import { MeetingTimeline } from '@/features/public/landing/components/MeetingTimeline'
import { useLatestAnnouncements, useLatestMeetings, useStats } from '@/features/public/landing/api/usePublicContent'
import type { Announcement } from '@/features/public/landing/types'

function SectionHeader({ title, subtitle, href }: { title: string; subtitle?: string; href: string }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">{title}</h2>
        {subtitle && <p className="text-[var(--text-secondary)] mt-2">{subtitle}</p>}
      </div>
      <Link to={href} className="flex items-center gap-1 text-sm text-blue-500 hover:gap-2 transition-all shrink-0">
        مشاهده همه
        <ArrowLeft className="w-4 h-4" />
      </Link>
    </div>
  )
}

export function Landing() {
  const { data: stats = [] } = useStats()
  const { data: announcements = [] } = useLatestAnnouncements(4)
  const { data: meetings = [] } = useLatestMeetings(5)

  const featured: Announcement | undefined = announcements.find(a => a.featured) ?? announcements[0]
  const rest = announcements.filter(a => a.id !== featured?.id).slice(0, 3)

  return (
    <>
      <HeroSection stats={stats} />

      <ServiceGrid />

      {stats.length > 0 && <StatsCounter stats={stats} />}

      {/* Announcements */}
      {announcements.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <SectionHeader title="آخرین اطلاعیه‌ها" subtitle="تازه‌ترین اخبار و اطلاعیه‌های دفتر" href="/announcements" />
          <div className="flex flex-col gap-6">
            {featured && <AnnouncementCard announcement={featured} variant="featured" />}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {rest.map(a => (
                  <AnnouncementCard key={a.id} announcement={a} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Meetings */}
      {meetings.length > 0 && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <SectionHeader title="جلسات اخیر" subtitle="مصوبات و صورت‌جلسات کمیته" href="/meetings" />
          <MeetingTimeline meetings={meetings} />
        </section>
      )}
    </>
  )
}
