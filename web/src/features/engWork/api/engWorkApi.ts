import { get, post } from '@/shared/api/http'
import { endpoints } from '@/shared/api/endpoints'
import { toQuery } from '@/shared/lib/query'
import type { EngQuotaBurn, EngWorkRow, QuarterTariff, QuotaBurnUpdate } from '@/features/engWork/types'

export function getEngWork(qtId: string, engId: string) {
  return get<EngWorkRow[]>(`${endpoints.engWork.list}?${toQuery({ qtId, engId })}`)
}

export function getQuarterTariffs() {
  return get<QuarterTariff[]>(endpoints.engWork.quarterTariffs)
}

export function getQuotaBurnList(qtId: string, engId: string) {
  return get<EngQuotaBurn[]>(`${endpoints.engWork.quotaBurnList}?${toQuery({ qtId, engId })}`)
}

export function approveQuotaBurn(id: string) {
  return post(endpoints.engWork.quotaBurnApprove, { id })
}

export function updateQuotaBurn(data: QuotaBurnUpdate) {
  return post(endpoints.engWork.quotaBurnUpdate, data)
}
