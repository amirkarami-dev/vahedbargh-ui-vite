import { get, post, postAttach } from '@/shared/api/http'
import { endpoints } from '@/shared/api/endpoints'
import type {
  AmountSmsRequest,
  ElectProjectFilter,
  ElectProjectsResponse,
  PanelMaker,
  ProjectFile,
} from '@/features/electProjects/types'

// old-ui getElectProjectsFullFilterApi — server-side filter + pagination.
export function getElectProjectsFullFilter(filter: ElectProjectFilter) {
  return post<ElectProjectsResponse>(endpoints.electProjects.fullFilter, filter)
}

export function getProjectFiles(electProjectId: string) {
  return get<ProjectFile[]>(`${endpoints.electProjects.files}?electProjectId=${electProjectId}`)
}

export function addProjectFile(formData: FormData) {
  return postAttach(endpoints.electProjects.addFile, formData)
}

export function updateElectProject(data: Record<string, unknown>) {
  return post(endpoints.electProjects.update, data)
}

// old-ui upsertElectProject — create a new project (CreateProject wizard).
export function upsertElectProject(data: Record<string, unknown>) {
  return post(endpoints.electProjects.upsert, data)
}

// old-ui updateElectProjectEngNew — engineer edits owner/address details.
export function updateElectProjectByEng(data: Record<string, unknown>) {
  return post(endpoints.electProjects.updateByEng, data)
}

// Backend DeleteProjectsCommand binds `Guid Id` from the body (old-ui sent { id }).
export function deleteElectProject(id: string) {
  return post(endpoints.electProjects.delete, { id })
}

// old-ui submitElectProjectByAdmin — id goes in the query string, no body.
export function submitByAdmin(id: string) {
  return post(`${endpoints.electProjects.submitByAdmin}?Id=${id}`)
}

export function amountSms(data: AmountSmsRequest) {
  return post(endpoints.electProjects.amountSms, data)
}

export function getPanelMakers() {
  return get<PanelMaker[]>(endpoints.electProjects.panelMakers)
}

export function addPanelMaker(data: { panelMakerId: string; electProjectId: string }) {
  return post(endpoints.electProjects.addPanelMaker, data)
}

// old-ui stopElectProjectApi — body { stopDes, isStop, gpId }.
export function stopElectProject(data: { stopDes: string; isStop: boolean; gpId: string }) {
  return post(endpoints.electProjects.stop, data)
}

// old-ui submitPanel — panel maker confirms the panel with its serial number.
export function submitPanel(data: { id: string; panelSerialNumber: string }) {
  return post(endpoints.electProjects.submitPanel, data)
}

// Children of a project — same endpoint with parentId set (old-ui handleExpand).
export function getElectProjectChildren(parentId: string) {
  return post<ElectProjectsResponse>(endpoints.electProjects.fullFilter, {
    page: 1,
    pageSize: 100,
    searchValue: '',
    projectLevelEnum: 0,
    fileNumber: 0,
    electRequestNumber: 0,
    landLordName: '',
    solarRegisterDate: '',
    idSection: 0,
    relatedPermitFilter: false,
    filterProjectLevel: false,
    isBuildingInspection: false,
    isEarthSystem: false,
    isTestAndDelivery: false,
    isStop: false,
    filterIsFilter: true,
    parentId,
  })
}
