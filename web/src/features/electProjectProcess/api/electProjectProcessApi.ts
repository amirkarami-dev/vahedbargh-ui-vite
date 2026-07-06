import { get, post } from '@/shared/api/http'
import { endpoints } from '@/shared/api/endpoints'
import type {
  AssignEngineer,
  EppFilter,
  EppListResponse,
  ProjectProcessPayload,
} from '@/features/electProjectProcess/types'

export function getListProjectProcessEng(filter: EppFilter) {
  return post<EppListResponse>(endpoints.electProjectProcess.listEng, filter)
}

// Engineers eligible for assignment (old-ui ListEngineer — same GetEngineerByClient
// endpoint, filtered by grade + certification).
export function getAssignEngineers(params: { engineerGradeTypeEnum: number; filterCertEnum: number }) {
  const qs = `engineerGradeTypeEnum=${params.engineerGradeTypeEnum}&filterCertEnum=${params.filterCertEnum}`
  return get<AssignEngineer[]>(`${endpoints.engineers.list}?${qs}`)
}

// Assign the selected projects to an engineer / ERT executor (old-ui projectProcess).
export function projectProcess(data: ProjectProcessPayload) {
  return post(endpoints.electProjectProcess.projectProcess, data)
}

// Delete an assignment (old-ui deleteProjectProcess). Backend binds Id from body.
export function deleteEpp(id: string) {
  return post(endpoints.electProjectProcess.delEpp, { id })
}

// Reassign an EPP to another engineer (old-ui eppEngChange).
export function eppEngChange(data: { id: string; idEngineer: number | string }) {
  return post(endpoints.electProjectProcess.eppEngChange, data)
}

// Toggle a sub-project's main/sub flag (old-ui eppUpdateIsMain).
export function eppUpdateIsMain(data: { id: string; isMain: boolean }) {
  return post(endpoints.electProjectProcess.eppUpdateIsMain, data)
}

// Engineer accepts the assigned project (old-ui eppAccepted).
export function eppAccepted(data: { eppId: string }) {
  return post(endpoints.electProjectProcess.eppAccepted, data)
}

// Engineer declares the verdict (approve/cancel) — old-ui eppApproved.
export function eppApproved(data: {
  eppId: string
  inspectionStatusEnum: number
  des: string
  needElectNetwork?: boolean
}) {
  return post(endpoints.electProjectProcess.eppApproved, data)
}

// Defect/status update (old-ui updateByEdc). Engineer sends { des, ... };
// ElectAdmin (EDC) additionally sends electProjectStatusEnum / needElectNetwork.
export function updateByEdc(data: Record<string, unknown>) {
  return post(endpoints.electProjectProcess.updateByEdc, data)
}

// Upsert/delete a form#3 row (old-ui upsertComment). deleteId set → delete.
export function upsertComment(data: Record<string, unknown>) {
  return post(endpoints.electProjectProcess.upsertComment, data)
}

// Upsert/delete a checklist row (old-ui upsertCheckList).
export function upsertCheckList(data: Record<string, unknown>) {
  return post(endpoints.electProjectProcess.upsertCheckList, data)
}

// Upsert the ERT (electrode) identity form (old-ui upsertErtForm).
export function upsertErtForm(data: Record<string, unknown>) {
  return post(endpoints.electProjectProcess.upsertErtForm, data)
}

// Upsert/delete an EDC (distribution-company) checklist row (old-ui upsertCheckListEdc).
export function upsertCheckListEdc(data: Record<string, unknown>) {
  return post(endpoints.electProjectProcess.upsertCheckListEdc, data)
}
