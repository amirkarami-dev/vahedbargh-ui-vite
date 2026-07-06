import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { App } from 'antd'
import {
  addSupportFile,
  closeSupport,
  createSupport,
  deleteSupportFile,
  getSupportFiles,
  getSupports,
  getTickets,
  getUsersForSupport,
  replyTicket,
} from '@/features/support/api/supportApi'
import type { SupportFilter } from '@/features/support/types'

export function useSupports(filter: SupportFilter) {
  return useQuery({ queryKey: ['supports', filter], queryFn: () => getSupports(filter) })
}

export function useUsersForSupport() {
  return useQuery({
    queryKey: ['usersForSupport'],
    queryFn: getUsersForSupport,
    staleTime: 5 * 60_000,
  })
}

export function useCreateSupport() {
  const qc = useQueryClient()
  const { message } = App.useApp()
  return useMutation<unknown, string, FormData>({
    mutationFn: fd => createSupport(fd),
    onSuccess: () => {
      message.success('تیکت ایجاد شد')
      qc.invalidateQueries({ queryKey: ['supports'] })
    },
    onError: e => message.error(String(e)),
  })
}

export function useTickets(supportId: string) {
  return useQuery({
    queryKey: ['tickets', supportId],
    queryFn: () => getTickets(supportId),
    enabled: !!supportId,
  })
}

export function useReplyTicket(supportId: string) {
  const qc = useQueryClient()
  const { message } = App.useApp()
  return useMutation<unknown, string, string>({
    mutationFn: msg => replyTicket({ message: msg, supportId }),
    onSuccess: () => {
      message.success('پیام ارسال شد')
      qc.invalidateQueries({ queryKey: ['tickets', supportId] })
      qc.invalidateQueries({ queryKey: ['supports'] })
    },
    onError: e => message.error(String(e)),
  })
}

export function useCloseSupport() {
  const qc = useQueryClient()
  const { message } = App.useApp()
  return useMutation<unknown, string, string>({
    mutationFn: id => closeSupport(id),
    onSuccess: () => {
      message.success('وضعیت تیکت تغییر کرد')
      qc.invalidateQueries({ queryKey: ['tickets'] })
      qc.invalidateQueries({ queryKey: ['supports'] })
    },
    onError: e => message.error(String(e)),
  })
}

export function useSupportFiles(supportId: string, enabled: boolean) {
  return useQuery({
    queryKey: ['supportFiles', supportId],
    queryFn: () => getSupportFiles(supportId),
    enabled: enabled && !!supportId,
  })
}

export function useAddSupportFile(supportId: string) {
  const qc = useQueryClient()
  const { message } = App.useApp()
  return useMutation<unknown, string, FormData>({
    mutationFn: fd => addSupportFile(fd),
    onSuccess: () => {
      message.success('فایل ذخیره شد')
      qc.invalidateQueries({ queryKey: ['supportFiles', supportId] })
    },
    onError: e => message.error(String(e)),
  })
}

export function useDeleteSupportFile(supportId: string) {
  const qc = useQueryClient()
  const { message } = App.useApp()
  return useMutation<unknown, string, string>({
    mutationFn: id => deleteSupportFile(id),
    onSuccess: () => {
      message.success('فایل حذف شد')
      qc.invalidateQueries({ queryKey: ['supportFiles', supportId] })
    },
    onError: e => message.error(String(e)),
  })
}
