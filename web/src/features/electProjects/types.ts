// Partial ElectProject row — only the fields the list screen displays/acts on.
// id/parentId are backend Guids (see DeleteProjectsCommand.Id : Guid).
export type ElectProject = {
  id: string
  parentId: string | null
  fileNumber: number
  landlordName?: string
  idSection: number
  projectCreatedTypeName?: string
  electProjectStatusName?: string
  electProjectStatusEnum?: number
  solarRegisterDate?: string
  projectBalance?: number
  projectBalanceLinkForPay?: string
  electRequestNumber?: string | number
  projectLevel?: string | number
  projectLevelEnum?: number
  engCurrentName?: string
  solarDateDeliverEngineer?: string
  isUploadRelatedPermit?: boolean
  isUploadElectPlan?: boolean
  isEarthSystem?: boolean
  isBuildingInspection?: boolean
  isTestAndDelivery?: boolean
  isNeedEb?: boolean
  foundationElectrodeArea?: number | string
  countChildren?: number
  isStop?: boolean
  stopDes?: string
  isBigProject?: boolean
  amountPerArea?: number
  invoice?: { invoicePayType?: number } | null
  parentElectProject?: { fileNumber: number } | null
  panelMaker?: { id?: string; companyName?: string } | null
  // EDC review (ElectProjectProcessEdc)
  defectDes?: string
  countSendToElect?: number
  solarDateSendToElect?: string
  checkListEdcs?: EdcChecklistRow[]
  // edit-form fields (ProjectMainEdit)
  ownershipTypeEnum?: number
  companyName?: string
  landlordNaCode?: string
  landlordPhoneNumber?: string
  supervisorName?: string
  supervisorPhoneNumber?: string
  postalCode?: string
  area?: number
  areaAsBuilt?: number
  address?: string
  numberOfFloor?: number
  licenseNumber?: string
  buildingGroupTypeEnum?: number
  buildingGroupParameterTypeEnum?: number
  ertSystemTypeEnum?: number
  panelNeed?: boolean
  hasSupervision?: boolean
  hasRelatedPermit?: boolean
  childInspectionCount?: number
  childErtCount?: number
  projectTypeRequestEnum?: number
  projectTypeRequestName?: string
  electProjectProcessViewModel?: ProjectProcessRow[]
  // panel-maker fields (ElectProjectsPanelMaker)
  panelSerialNumber?: string
  solarDatePanelRegister?: string
  solarDatePanelSubmit?: string
  panelMakerSubmit?: boolean
  unitNumber?: number
  buildingTypeEnum?: number
  checkListForms?: PanelChecklistRow[]
  commentEngForms?: PanelCommentRow[]
}

// One checklist row inside the panel-maker view (old-ui checkListForms; can nest).
export type PanelChecklistRow = {
  key?: string | number
  id?: string | number
  inspectionDesEnum?: string
  solarChecked?: string
  resultDes?: string
  isComplete?: boolean
  children?: PanelChecklistRow[]
}

// One form#3 row inside the panel-maker view (old-ui commentEngForms).
export type PanelCommentRow = {
  id?: string | number
  branchingTypeEnum?: number
  fazNumberEnum?: number
  branchingCount?: number
  ampere?: number
  power?: number
  powerSum?: number
  des?: string
}

// One EDC-checklist row (old-ui checkListEdcs; tree — parents carry children + groupByValue).
export type EdcChecklistRow = {
  key?: string | number
  id?: string | number
  checkListEdcEnum?: number
  groupByValue?: string
  solarChecked?: string
  julianChecked?: string
  resultDes?: string
  isComplete?: boolean
  children?: EdcChecklistRow[]
}

// One engineer-assignment row shown by the read-only ProjectProcess viewer.
export type ProjectProcessRow = {
  id: string | number
  description?: string
  engName?: string
  cellPhone?: string
  solarDateDeliverEngineer?: string
  solarDateDeliverOffice?: string
  projectLevelName?: string
  inspectionStatusName?: string
  defect?: boolean
}

export type PanelMaker = {
  id: string
  companyName?: string
  mobileNumber?: string
  idSection: number
}

// POST body for /ElectProjects/GetClientElectProjectsFullFilter (old-ui searchQuery).
export type ElectProjectFilter = {
  page: number
  pageSize: number
  searchValue: string
  projectLevelEnum: number
  fileNumber: number
  electRequestNumber: number
  landLordName: string
  solarRegisterDate: string
  idSection: number
  relatedPermitFilter: boolean
  filterProjectLevel: boolean
  isBuildingInspection: boolean
  isEarthSystem: boolean
  isTestAndDelivery: boolean
  isStop: boolean
  filterIsFilter: boolean
  parentId?: string
}

export type ElectProjectsResponse = {
  data: ElectProject[]
  totalItems: number
}

export type ProjectFile = {
  id: string
  fileName: string
  fileTypeName?: string
  folderName: string
}

export type AmountSmsRequest = {
  electProjectId: string
  amount: number
  smsTypeEnum: number
}
