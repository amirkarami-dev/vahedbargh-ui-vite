import { get, post } from '@/shared/api/http'
import { endpoints } from '@/shared/api/endpoints'
import { toQuery } from '@/shared/lib/query'
import type {
  EngPaymentCreate,
  EngPaymentRow,
  EngPaymentTask,
  EngPaymentUpdate,
} from '@/features/engPayment/types'

export function getEngPaymentTasks() {
  return get<EngPaymentTask[]>(endpoints.engPayment.tasks)
}

export function getEngPaymentList(taskId: string) {
  return get<EngPaymentRow[]>(`${endpoints.engPayment.list}?${toQuery({ engPaymentTaskId: taskId })}`)
}

// Returns the new payment-task id.
export function upsertEngPaymentList(data: EngPaymentCreate) {
  return post<string>(endpoints.engPayment.upsert, data)
}

export function updateEngPaymentList(data: EngPaymentUpdate) {
  return post(endpoints.engPayment.update, data)
}

export function engPaymentApproved(data: { engPaymentTaskId: string; solarApproved: string }) {
  return post(endpoints.engPayment.approve, data)
}
