import { get, post, postAttach } from '@/shared/api/http'
import { endpoints } from '@/shared/api/endpoints'
import type { UserFile } from '@/features/userFiles/types'

// old-ui getUserFiles / postUserFile / deleteUserFile.
export function getUserFiles(userId: string | number) {
  return get<UserFile[]>(`${endpoints.users.files}?UserId=${userId}`)
}

export function addUserFile(formData: FormData) {
  return postAttach(endpoints.users.addFile, formData)
}

// Backend binds `Guid Id` from the JSON body (DeleteUserFileCommand). old-ui sent
// post(url, id) which spread the value to garbage/{} — fixed here to { id }.
export function deleteUserFile(id: string) {
  return post(endpoints.users.deleteFile, { id })
}
