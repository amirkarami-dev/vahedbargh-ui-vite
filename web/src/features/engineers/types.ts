export type EngFile = {
  name?: string
  fileName?: string
}

export type EngHistory = {
  id?: number
  engId?: number
  workPermitNum?: string
  workPermitTypeEnum?: number
  workPermitTypeName?: string
  engineerGradeTypeEnum?: number
  engineerGradeTypeName?: string
  solarIssueDate?: string
  solarValidityDate?: string
  julianIssueDate?: string
  julianValidityDate?: string
  workPermission?: boolean
  is2p?: boolean
}

export type Engineer = {
  id: number
  userId?: string
  fullName: string
  idSection: number
  userName: string
  engineerGradeTypeName: string
  cellPhone: string
  naCode?: string
  bankAccountNumber?: string
  defaultQuota?: number
  julianMembershipDate?: string
  certOfInspection: boolean
  certOfEarth: boolean
  certOfTest: boolean
  certOfFiber: boolean
  has1Percent: boolean
  hasQuarterIncrease: boolean
  solarMembershipDate: string | null
  solarValidityDate: string | null
  expiredDateWork: boolean | string | null
  inactive: boolean
  bankAccountBlocked: boolean
  engFiles: EngFile[]
  engineerHistoryViewModel?: EngHistory[]
}
