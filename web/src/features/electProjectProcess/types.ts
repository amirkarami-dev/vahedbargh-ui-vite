// One engineer-process row (old-ui ElectProjectProcesses.lstProjectProcessEng).
export type EppRow = {
  id: string
  electProjectId: string
  fileNumber?: number
  projectLevel?: number
  projectLevelName?: string
  inspectionStatus?: number
  inspectionStatusName?: string
  accepted?: boolean
  solarDateAccepted?: string
  description?: string
  landLordName?: string
  numberOfFloor?: number
  solarDateDeliverEngineer?: string
  solarDateDeliverOffice?: string
  enName?: string
  isMain?: boolean
  engineer?: { id: number | string; fullName?: string }
  projectBalance?: number
  projectBalanceLinkForPay?: string
  commentEngForm?: CommentRow[]
  checkListForms?: ChecklistRow[]
  checkListEdcs?: import('@/features/electProjects/types').EdcChecklistRow[]
  electProjectErtForm?: ErtFormRow
  // owner/address details (ProjectDetails edit)
  idElectProject?: string
  solarRegisterDate?: string
  ownershipTypeEnum?: number
  companyName?: string
  landlordNaCode?: string
  landlordPhoneNumber?: string
  postalCode?: string
  area?: number
  address?: string
  buildingType?: number
  packageNeed?: boolean
  pipingTypeEnum?: number
  unitNumber?: number
  electProject: {
    isOk?: boolean
    isDefectEng?: boolean
    solvedDefectEng?: boolean
    defectDes?: string
    defectEngDes?: string
    defectAdminDes?: string
    electProjectStatusEnum?: number
    buildingTypeEnum?: number
    parentProject?: unknown
    panelNeed?: boolean
    panelMakerSubmit?: boolean
  }
}

// ERT (electrode) identity form (old-ui electProjectErtForm).
export type ErtFormRow = {
  id?: string | number
  buildingTypeEnum?: number
  electrodeAddress?: string
  utmX?: number
  utmY?: number
  constructionDate?: string
  measurementDate?: string
  electrodeUsageTypeEnum?: number
  electrodeUsageTypeOther?: string
  electrodeExecuteTypeEnum?: number
  electrodeExecuteTypeOther?: string
  electrodeTypeEnum?: number
  electrodeTypeOther?: string
  electrodeMaterialTypeEnum?: number
  electrodeMaterialTypeOther?: string
  electrodeLength?: string
  electrodeDiameter?: string
  otherElectrodeMeasure?: string
  des?: string
  ertBrand?: string
  ertTesterBrand?: string
  measurementHour?: string
  temperature?: string
  rainfallAmount?: string
  electrodeResistanceValue?: string
  measurementMethod?: string
}

// POST body for GetListProjectProcessEng (old-ui searchQuery).
export type EppFilter = {
  page: number
  pageSize: number
  inspectionStatusEnum: number
  fileNumber: number
  landlordName: string
  solarDateDeliverEngineer: string
  idSection: number
}

export type EppListResponse = {
  data: EppRow[]
  totalItems: number
}

// One engineer option in the assign picker (old-ui ListEngineer).
export type AssignEngineer = {
  id: number | string
  fullName?: string
  fullDescription?: string
  idSection: number
  inactive?: boolean
  engineerGradeTypeEnum?: number
  totalQuotaBalance?: number
}

// Assign payload (old-ui projectProcess).
export type ProjectProcessPayload = {
  IdElectProjects: string[]
  IdEngineer: number | string
  projectProcessTypeEnum: number
  ertAmount: number
}

// Form#3 row (old-ui commentEngForm).
export type CommentRow = {
  key?: string | number
  id?: string | number
  branchingTypeEnum?: number
  fazNumberEnum?: number
  branchingCount?: number
  ampere?: number
  power?: number
  powerSum?: number
  des?: string
}

// Checklist row (old-ui checkListForms; tree — parents carry children).
export type ChecklistRow = {
  key?: string | number
  id?: string | number
  inspectionDesEnum?: number | string
  solarChecked?: string
  julianChecked?: string
  resultDes?: string
  isComplete?: boolean
  children?: ChecklistRow[]
}
