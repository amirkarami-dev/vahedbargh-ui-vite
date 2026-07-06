import { get, post } from '@/shared/api/http'
import { endpoints } from '@/shared/api/endpoints'
import type { Engineer } from '@/features/engineers/types'

// old-ui getListEngineerApi — returns ALL engineers for the current client.
// Filtering is done client-side (see EngineersPage), matching the legacy reducer.
export function getEngineers() {
  return get<Engineer[]>(endpoints.engineers.list)
}

// old-ui upsertEngineerApi / upsertEngHistoryApi.
export function upsertEngineer(data: unknown) {
  return post(endpoints.engineers.upsert, data)
}

export function upsertEngHistory(data: unknown) {
  return post(endpoints.engineers.upsertHistory, data)
}
