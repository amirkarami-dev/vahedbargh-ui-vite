import { post } from '@/shared/api/http'
import { endpoints } from '@/shared/api/endpoints'

export type PublicProjectInfo = {
  fileNumber?: number | string
  electRequestNumber?: number | string
  landlordName?: string
  naCode?: string
  address?: string
}

// old-ui getProjectInfoApi — anonymous lookup for the public /ep page.
export function getProjectInfo(projectId: string) {
  return post<PublicProjectInfo>(`${endpoints.public.projectInfo}?projectId=${projectId}`)
}

// old-ui getPaymentMelliPublic — returns the bank token for the public /tp page.
export function getPaymentMelliPublic(data: { electProjectId: string; amount: number }) {
  return post<{ token?: string }>(endpoints.public.paymentMelliPublic, data)
}
