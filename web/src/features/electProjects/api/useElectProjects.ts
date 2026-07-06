import { keepPreviousData, useQuery } from '@tanstack/react-query'
import {
  getElectProjectChildren,
  getElectProjectsFullFilter,
} from '@/features/electProjects/api/electProjectsApi'
import type { ElectProjectFilter } from '@/features/electProjects/types'

export function useElectProjects(filter: ElectProjectFilter) {
  return useQuery({
    queryKey: ['electProjects', filter],
    queryFn: () => getElectProjectsFullFilter(filter),
    placeholderData: keepPreviousData, // keep old page visible while the next loads
  })
}

// Lazily fetch a project's sub-projects when its row is expanded.
export function useElectProjectChildren(parentId: string | null) {
  return useQuery({
    queryKey: ['electProjectChildren', parentId],
    queryFn: () => getElectProjectChildren(parentId!),
    enabled: !!parentId,
  })
}
