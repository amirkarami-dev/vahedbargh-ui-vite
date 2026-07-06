import { useMutation, useQueryClient } from '@tanstack/react-query'
import { App } from 'antd'
import { upsertEngHistory, upsertEngineer } from '@/features/engineers/api/engineersApi'

// On success: refetch the list (old-ui re-dispatched getListEngineer) + Persian toast.
export function useUpsertEngineer() {
  const qc = useQueryClient()
  const { message } = App.useApp()
  return useMutation<unknown, string, unknown>({
    mutationFn: data => upsertEngineer(data),
    onSuccess: () => {
      message.success('کارشناس آپدیت شد')
      qc.invalidateQueries({ queryKey: ['engineers'] })
    },
    onError: e => message.error(String(e)),
  })
}

export function useUpsertEngHistory() {
  const qc = useQueryClient()
  const { message } = App.useApp()
  return useMutation<unknown, string, unknown>({
    mutationFn: data => upsertEngHistory(data),
    onSuccess: () => {
      message.success('اطلاعات کارشناسی انجام شد')
      qc.invalidateQueries({ queryKey: ['engineers'] })
    },
    onError: e => message.error(String(e)),
  })
}
