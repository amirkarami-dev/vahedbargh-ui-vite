import { get, post, postAttach } from '@/shared/api/http'
import { endpoints } from '@/shared/api/endpoints'
import { toQuery } from '@/shared/lib/query'
import type {
  SupportFile,
  SupportFilter,
  SupportTicket,
  SupportUser,
  TicketMessage,
} from '@/features/support/types'

export function getSupports(filter: SupportFilter) {
  return get<SupportTicket[]>(`${endpoints.support.list}?${toQuery({ ...filter })}`)
}

// Create a ticket — multipart (old-ui upsertSupportApi → postAttach).
export function createSupport(formData: FormData) {
  return postAttach(endpoints.support.upsert, formData)
}

// Toggle closed — id goes in the query string, no body (old-ui closedSupportApi).
export function closeSupport(id: string) {
  return post(`${endpoints.support.closed}?SupportId=${id}`)
}

export function getTickets(supportId: string) {
  return get<TicketMessage[]>(`${endpoints.support.tickets}?supportId=${supportId}`)
}

export function replyTicket(data: { message: string; supportId: string }) {
  return post(endpoints.support.upsertTicket, data)
}

export function getUsersForSupport() {
  return get<SupportUser[]>(endpoints.support.usersForSupport)
}

export function addSupportFile(formData: FormData) {
  return postAttach(endpoints.support.addFile, formData)
}

export function getSupportFiles(supportId: string) {
  return get<SupportFile[]>(`${endpoints.support.files}?supportId=${supportId}`)
}

// Backend DeleteFileSupportCommand binds Guid Id from the body.
export function deleteSupportFile(id: string) {
  return post(endpoints.support.deleteFile, { id })
}
