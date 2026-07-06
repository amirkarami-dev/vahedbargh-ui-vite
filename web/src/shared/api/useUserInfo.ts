import { useQuery } from '@tanstack/react-query'
import { get } from '@/shared/api/http'
import { endpoints } from '@/shared/api/endpoints'

// old-ui USERs.userInfo (GET /Users/GetUserInfo). `idSection` is the user's city
// binding: 0 = unrestricted (can pick any city), otherwise locked to that city.
export type UserInfo = {
  idSection: number
  firstName?: string
  lastName?: string
  email?: string
  phoneNumber?: string
  active?: boolean
  avatar?: string
  sumAmountEngInvoice?: number
  sumAmountEngPayment?: number
  countUnreadMessage?: number
}

export function useUserInfo() {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: () => get<UserInfo>(endpoints.users.info),
    staleTime: 5 * 60 * 1000,
  })
}
