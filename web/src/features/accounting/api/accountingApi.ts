import { get, post } from '@/shared/api/http'
import { endpoints } from '@/shared/api/endpoints'
import type { Invoice, TransactionFilter, TransactionsResponse } from '@/features/accounting/types'

export function getTransactions(filter: TransactionFilter) {
  return post<TransactionsResponse>(endpoints.accounting.transactions, filter)
}

export function getInvoices() {
  return get<Invoice[]>(endpoints.accounting.invoices)
}

// Engineer's own invoices — engId is the current user's sid (old-ui getEngInvoices).
export function getEngInvoices(engId: string) {
  return get<Invoice[]>(`${endpoints.accounting.engInvoices}?engId=${engId}`)
}

// Register a project payment receipt (old-ui postPaymentCustom).
export function postPaymentCustom(data: Record<string, unknown>) {
  return post(endpoints.accounting.paymentCustom, data)
}

// Register an engineer bank payment (old-ui postEngPaymentCustom).
export function postEngPaymentCustom(data: Record<string, unknown>) {
  return post(endpoints.accounting.engPaymentCustom, data)
}
