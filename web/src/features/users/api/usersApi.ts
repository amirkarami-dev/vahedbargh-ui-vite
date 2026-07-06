import { get, post } from '@/shared/api/http'
import { endpoints } from '@/shared/api/endpoints'
import type { AddUser, ClientUser, UpdateUser } from '@/features/users/types'

// old-ui getUSERs — all client users (ClientId resolved from the JWT).
export function getUsers() {
  return get<ClientUser[]>(endpoints.clients.list)
}

export function addUser(data: AddUser) {
  return post(endpoints.clients.add, { ...data, sendEmail: false })
}

export function updateUser(data: UpdateUser) {
  return post(endpoints.clients.update, data)
}

// Backend DeleteClientUserCommand binds `Id` from the body (old-ui sent the raw id).
export function deleteUser(id: string) {
  return post(endpoints.clients.delete, { id })
}
