import { useMutation, useQuery } from '@tanstack/react-query'
import * as api from '@/features/public/landing/api/publicApi'
import type { ContactForm } from '@/features/public/landing/api/publicApi'

// Public content is anonymous + global — cache generously (stale 5 min).
const STALE = 5 * 60 * 1000

export const useStats = () =>
  useQuery({ queryKey: ['landing', 'stats'], queryFn: api.getStats, staleTime: STALE })

export const useLatestAnnouncements = (count = 4) =>
  useQuery({
    queryKey: ['landing', 'announcements', 'latest', count],
    queryFn: () => api.getLatestAnnouncements(count),
    staleTime: STALE,
  })

export const useAllAnnouncements = () =>
  useQuery({ queryKey: ['landing', 'announcements', 'all'], queryFn: api.getAllAnnouncements, staleTime: STALE })

export const useAnnouncement = (slug: string) =>
  useQuery({
    queryKey: ['landing', 'announcement', slug],
    queryFn: () => api.getAnnouncementBySlug(slug),
    enabled: !!slug,
    staleTime: STALE,
  })

export const useLatestMeetings = (count = 5) =>
  useQuery({
    queryKey: ['landing', 'meetings', 'latest', count],
    queryFn: () => api.getLatestMeetings(count),
    staleTime: STALE,
  })

export const useAllMeetings = () =>
  useQuery({ queryKey: ['landing', 'meetings', 'all'], queryFn: api.getAllMeetings, staleTime: STALE })

export const useMeeting = (id: string) =>
  useQuery({
    queryKey: ['landing', 'meeting', id],
    queryFn: () => api.getMeetingById(id),
    enabled: !!id,
    staleTime: STALE,
  })

export const useDocuments = () =>
  useQuery({ queryKey: ['landing', 'documents'], queryFn: api.getAllDocuments, staleTime: STALE })

export const useDocumentCategories = () =>
  useQuery({ queryKey: ['landing', 'documents', 'categories'], queryFn: api.getDocumentCategories, staleTime: STALE })

export const useSendContact = () => useMutation({ mutationFn: (form: ContactForm) => api.sendContact(form) })
