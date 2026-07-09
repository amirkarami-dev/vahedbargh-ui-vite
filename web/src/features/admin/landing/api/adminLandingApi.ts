import { get, post } from '@/shared/api/http'
import { endpoints } from '@/shared/api/endpoints'
import type { Announcement, ContactMessage, DocumentItem, Meeting, StatItem } from '@/features/public/landing/types'

const L = endpoints.landing

// --- Announcements ---
export type AnnouncementInput = {
  id?: string
  slug: string
  title: string
  excerpt?: string
  content?: string
  category?: string
  priority: string
  jalaliDate?: string
  imageUrl?: string
  featured: boolean
}
export const upsertAnnouncement = (data: AnnouncementInput) => post<Announcement>(L.announcementUpsert, data)
export const deleteAnnouncement = (id: string) => post<void>(L.announcementDelete, { id })

// --- Meetings ---
export type ResolutionInput = { text: string; status?: string }
export type MeetingInput = {
  id?: string
  sessionNumber: number
  subject: string
  jalaliDate?: string
  date: string
  status?: string
  type?: string
  pdfUrl?: string
  attendees: string[]
  notes?: string
  resolutions: ResolutionInput[]
}
export const upsertMeeting = (data: MeetingInput) => post<Meeting>(L.meetingUpsert, data)
export const deleteMeeting = (id: string) => post<void>(L.meetingDelete, { id })

// --- Documents ---
export type DocumentInput = {
  id?: string
  title: string
  category: string
  jalaliDate?: string
  date: string
  version?: string
  description?: string
  fileSize?: string
  tags: string[]
  fileUrl?: string
  featured: boolean
}
export const upsertDocument = (data: DocumentInput) => post<DocumentItem>(L.documentUpsert, data)
export const deleteDocument = (id: string) => post<void>(L.documentDelete, { id })

// --- Stats ---
export type StatInput = {
  id?: string
  label: string
  value: number
  suffix?: string
  iconName?: string
  sortOrder: number
}
export const upsertStat = (data: StatInput) => post<StatItem>(L.statUpsert, data)
export const deleteStat = (id: string) => post<void>(L.statDelete, { id })

// --- Contact inbox ---
export const getContactMessages = () => get<ContactMessage[]>(L.contactList)
export const markContactRead = (id: string, isRead: boolean) => post<void>(L.contactMarkRead, { id, isRead })
export const deleteContactMessage = (id: string) => post<void>(L.contactDelete, { id })
