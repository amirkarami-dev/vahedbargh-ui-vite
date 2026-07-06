import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { App } from 'antd'
import {
  getEngInvoices,
  getInvoices,
  getTransactions,
  postEngPaymentCustom,
  postPaymentCustom,
} from '@/features/accounting/api/accountingApi'
import type { TransactionFilter } from '@/features/accounting/types'

export function useTransactions(filter: TransactionFilter) {
  return useQuery({
    queryKey: ['transactions', filter],
    queryFn: () => getTransactions(filter),
    placeholderData: keepPreviousData,
  })
}

export function useInvoices() {
  return useQuery({ queryKey: ['invoices'], queryFn: getInvoices })
}

export function useEngInvoices(engId: string) {
  return useQuery({
    queryKey: ['engInvoices', engId],
    queryFn: () => getEngInvoices(engId),
    enabled: !!engId,
  })
}

export function usePaymentCustom() {
  const qc = useQueryClient()
  const { message } = App.useApp()
  return useMutation<unknown, string, Record<string, unknown>>({
    mutationFn: data => postPaymentCustom(data),
    onSuccess: () => {
      message.success('پرداخت انجام شد')
      qc.invalidateQueries({ queryKey: ['transactions'] })
    },
    onError: e => message.error(String(e)),
  })
}

export function useEngPaymentCustom() {
  const { message } = App.useApp()
  return useMutation<unknown, string, Record<string, unknown>>({
    mutationFn: data => postEngPaymentCustom(data),
    onSuccess: () => message.success('پرداخت انجام شد'),
    onError: e => message.error(String(e)),
  })
}
