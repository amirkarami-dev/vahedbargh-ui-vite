import { AnnouncementCard } from '@/features/public/landing/components/AnnouncementCard'
import { UrgencyTicker } from '@/features/public/landing/components/UrgencyTicker'
import { useAllAnnouncements } from '@/features/public/landing/api/usePublicContent'
import { getUrgentAnnouncements } from '@/features/public/landing/api/publicApi'
import { useQuery } from '@tanstack/react-query'

export function AnnouncementsPage() {
  const { data: all = [] } = useAllAnnouncements()
  const { data: urgent = [] } = useQuery({
    queryKey: ['landing', 'announcements', 'urgent'],
    queryFn: getUrgentAnnouncements,
    staleTime: 5 * 60 * 1000,
  })

  const featured = all.find(a => a.featured)
  const rest = all.filter(a => !a.featured)

  return (
    <div className="min-h-screen">
      {urgent.length > 0 && (
        <div className="mt-[72px] sticky top-14 z-40">
          <UrgencyTicker announcements={urgent} />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">اطلاعیه‌ها</h1>
          <p className="text-[var(--text-secondary)] mt-2">آخرین اخبار، دستورالعمل‌ها و اطلاعیه‌های دفتر اجرایی</p>
        </div>

        {featured && (
          <div className="mb-8">
            <AnnouncementCard announcement={featured} variant="featured" />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map(ann => (
            <AnnouncementCard key={ann.id} announcement={ann} />
          ))}
        </div>

        {all.length === 0 && (
          <div className="text-center py-16 text-[var(--text-muted)]">اطلاعیه‌ای برای نمایش وجود ندارد.</div>
        )}
      </div>
    </div>
  )
}
