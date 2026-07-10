import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { App } from 'antd'
import * as read from '@/features/public/landing/api/publicApi'
import * as admin from '@/features/admin/landing/api/adminLandingApi'

// Admin list queries — no long stale time; kept fresh while editing.
export const useAdminAnnouncements = () =>
  useQuery({ queryKey: ['admin-landing', 'announcements'], queryFn: read.getAllAnnouncements })
export const useAdminMeetings = () =>
  useQuery({ queryKey: ['admin-landing', 'meetings'], queryFn: read.getAllMeetings })
export const useAdminDocuments = () =>
  useQuery({ queryKey: ['admin-landing', 'documents'], queryFn: read.getAllDocuments })
export const useAdminStats = () =>
  useQuery({ queryKey: ['admin-landing', 'stats'], queryFn: read.getStats })
export const useContactMessages = () =>
  useQuery({ queryKey: ['admin-landing', 'contact'], queryFn: admin.getContactMessages })
export const useAdminProcessFlows = () =>
  useQuery({ queryKey: ['admin-landing', 'processes'], queryFn: admin.getAdminProcessFlows })

// Shared mutation helper: toast + invalidate both admin and public caches.
function useLandingMutation<TArgs>(
  fn: (args: TArgs) => Promise<unknown>,
  successMsg: string,
) {
  const qc = useQueryClient()
  const { message } = App.useApp()
  return useMutation<unknown, unknown, TArgs>({
    mutationFn: fn,
    onSuccess: () => {
      message.success(successMsg)
      qc.invalidateQueries({ queryKey: ['admin-landing'] })
      qc.invalidateQueries({ queryKey: ['landing'] })
    },
    onError: e => message.error(e instanceof Error ? e.message : 'خطا در انجام عملیات'),
  })
}

// --- Announcements ---
export const useUpsertAnnouncement = () => useLandingMutation(admin.upsertAnnouncement, 'اطلاعیه ذخیره شد')
export const useDeleteAnnouncement = () => useLandingMutation(admin.deleteAnnouncement, 'اطلاعیه حذف شد')

// --- Meetings ---
export const useUpsertMeeting = () => useLandingMutation(admin.upsertMeeting, 'جلسه ذخیره شد')
export const useDeleteMeeting = () => useLandingMutation(admin.deleteMeeting, 'جلسه حذف شد')

// --- Documents ---
export const useUpsertDocument = () => useLandingMutation(admin.upsertDocument, 'سند ذخیره شد')
export const useDeleteDocument = () => useLandingMutation(admin.deleteDocument, 'سند حذف شد')

// --- Stats ---
export const useUpsertStat = () => useLandingMutation(admin.upsertStat, 'آمار ذخیره شد')
export const useDeleteStat = () => useLandingMutation(admin.deleteStat, 'آمار حذف شد')

// --- Contact ---
export const useMarkContactRead = () =>
  useLandingMutation((v: { id: string; isRead: boolean }) => admin.markContactRead(v.id, v.isRead), 'وضعیت پیام به‌روزرسانی شد')
export const useDeleteContactMessage = () => useLandingMutation(admin.deleteContactMessage, 'پیام حذف شد')

// --- Process flows ---
export const useUpsertProcessFlow = () => useLandingMutation(admin.upsertProcessFlow, 'فرآیند ذخیره شد')
export const useDeleteProcessFlow = () => useLandingMutation(admin.deleteProcessFlow, 'فرآیند حذف شد')
