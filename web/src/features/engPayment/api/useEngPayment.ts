import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { App } from 'antd'
import {
  engPaymentApproved,
  getEngPaymentList,
  getEngPaymentTasks,
  updateEngPaymentList,
  upsertEngPaymentList,
} from '@/features/engPayment/api/engPaymentApi'
import type { EngPaymentCreate, EngPaymentUpdate } from '@/features/engPayment/types'

export function useEngPaymentTasks() {
  return useQuery({ queryKey: ['engPaymentTasks'], queryFn: getEngPaymentTasks })
}

export function useEngPaymentList(taskId: string | null) {
  return useQuery({
    queryKey: ['engPaymentList', taskId],
    queryFn: () => getEngPaymentList(taskId!),
    enabled: !!taskId,
  })
}

export function useCreateEngPaymentList() {
  const qc = useQueryClient()
  const { message } = App.useApp()
  return useMutation<string, string, EngPaymentCreate>({
    mutationFn: data => upsertEngPaymentList(data),
    onSuccess: () => {
      message.success('لیست پرداخت ایجاد شد')
      qc.invalidateQueries({ queryKey: ['engPaymentTasks'] })
      qc.invalidateQueries({ queryKey: ['engPaymentList'] })
    },
    onError: e => message.error(String(e)),
  })
}

export function useUpdateEngPaymentRow() {
  const qc = useQueryClient()
  const { message } = App.useApp()
  return useMutation<unknown, string, EngPaymentUpdate>({
    mutationFn: data => updateEngPaymentList(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['engPaymentList'] }),
    onError: e => message.error(String(e)),
  })
}

export function useApproveEngPayment() {
  const qc = useQueryClient()
  const { message } = App.useApp()
  return useMutation<unknown, string, { engPaymentTaskId: string; solarApproved: string }>({
    mutationFn: data => engPaymentApproved(data),
    onSuccess: () => {
      message.success('لیست پرداخت بانکی تایید شد')
      qc.invalidateQueries({ queryKey: ['engPaymentTasks'] })
      qc.invalidateQueries({ queryKey: ['engPaymentList'] })
    },
    onError: e => message.error(String(e)),
  })
}
