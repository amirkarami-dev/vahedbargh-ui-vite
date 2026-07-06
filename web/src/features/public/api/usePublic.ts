import { useMutation, useQuery } from '@tanstack/react-query'
import { getPaymentMelliPublic, getProjectInfo } from '@/features/public/api/publicApi'

export function usePublicProjectInfo(projectId: string) {
  return useQuery({
    queryKey: ['publicProjectInfo', projectId],
    queryFn: () => getProjectInfo(projectId),
    enabled: !!projectId,
  })
}

export function usePaymentMelliPublic() {
  return useMutation<{ token?: string }, string, { electProjectId: string; amount: number }>({
    mutationFn: data => getPaymentMelliPublic(data),
  })
}
