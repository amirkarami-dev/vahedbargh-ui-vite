import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { App } from 'antd'
import {
  approveQuotaBurn,
  getEngWork,
  getQuarterTariffs,
  getQuotaBurnList,
  updateQuotaBurn,
} from '@/features/engWork/api/engWorkApi'
import type { QuotaBurnUpdate } from '@/features/engWork/types'

export function useQuarterTariffs() {
  return useQuery({ queryKey: ['quarterTariffs'], queryFn: getQuarterTariffs })
}

export function useEngWork(qtId: string | null, engId: string | null) {
  return useQuery({
    queryKey: ['engWork', qtId, engId],
    queryFn: () => getEngWork(qtId!, engId ?? ''),
    enabled: !!qtId,
  })
}

export function useQuotaBurnList(qtId: string | null, engId: string | null) {
  return useQuery({
    queryKey: ['quotaBurn', qtId, engId],
    queryFn: () => getQuotaBurnList(qtId!, engId ?? ''),
    enabled: !!qtId,
  })
}

export function useApproveQuotaBurn() {
  const qc = useQueryClient()
  const { message } = App.useApp()
  return useMutation<unknown, string, string>({
    mutationFn: id => approveQuotaBurn(id),
    onSuccess: () => {
      message.success('تایید شد')
      qc.invalidateQueries({ queryKey: ['quotaBurn'] })
    },
    onError: e => message.error(String(e)),
  })
}

export function useUpdateQuotaBurn() {
  const qc = useQueryClient()
  const { message } = App.useApp()
  return useMutation<unknown, string, QuotaBurnUpdate>({
    mutationFn: data => updateQuotaBurn(data),
    onSuccess: () => {
      message.success('ذخیره شد')
      qc.invalidateQueries({ queryKey: ['quotaBurn'] })
    },
    onError: e => message.error(String(e)),
  })
}
