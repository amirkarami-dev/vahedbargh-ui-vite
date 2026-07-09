import { get, post } from '@/shared/api/http'
import { endpoints } from '@/shared/api/endpoints'
import type { Announcement, DocumentItem, Meeting, StatItem } from '@/features/public/landing/types'
import type { ProcessFlow } from '@/features/public/landing/data/processes'

const L = endpoints.landing

// --- Stats ---
export const getStats = () => get<StatItem[]>(L.statsAll)

// --- Process flows ---
export const getProcessFlows = () => get<ProcessFlow[]>(L.processFlows)

// --- Announcements ---
export const getLatestAnnouncements = (count = 4) =>
  get<Announcement[]>(L.announcementsLatest, { params: { count } })
export const getAllAnnouncements = () => get<Announcement[]>(L.announcementsAll)
export const getUrgentAnnouncements = () => get<Announcement[]>(L.announcementsUrgent)
export const getAnnouncementBySlug = (slug: string) =>
  get<Announcement>(L.announcementBySlug, { params: { slug } })

// --- Meetings ---
export const getLatestMeetings = (count = 5) =>
  get<Meeting[]>(L.meetingsLatest, { params: { count } })
export const getAllMeetings = () => get<Meeting[]>(L.meetingsAll)
export const getMeetingById = (id: string) => get<Meeting>(L.meetingById, { params: { id } })

// --- Documents (archive) ---
export const getAllDocuments = () => get<DocumentItem[]>(L.documentsAll)
export const getDocumentCategories = () => get<string[]>(L.documentCategories)
export const incrementDownload = (id: string) => post<void>(L.documentIncrementDownload, { id })

// --- Contact ---
export type ContactForm = {
  name: string
  email: string
  mobile: string
  subject: string
  message: string
}
export const sendContact = (form: ContactForm) => post<void>(L.contactSend, form)
