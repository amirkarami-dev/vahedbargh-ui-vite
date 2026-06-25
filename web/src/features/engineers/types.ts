export type EngFile = {
  name?: string
  fileName?: string
}

// Partial Engineer shape — only the fields the list screen reads.
// Extend as the edit drawer / history / files are migrated.
export type Engineer = {
  id: number
  fullName: string
  idSection: number
  userName: string
  engineerGradeTypeName: string
  cellPhone: string
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
}
