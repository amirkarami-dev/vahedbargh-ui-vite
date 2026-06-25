import { useQuery } from '@tanstack/react-query'
import { getEngineers } from '@/features/engineers/api/engineersApi'

export function useEngineers() {
  return useQuery({
    queryKey: ['engineers'],
    queryFn: getEngineers,
  })
}
