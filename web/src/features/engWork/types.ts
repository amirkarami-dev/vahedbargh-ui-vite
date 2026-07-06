export type QuarterTariff = {
  id: string
  year?: number
  period?: number
  quarterTypeName?: string
  allotmentRoundTypeName?: string
  fee?: number
}

export type EngWorkRow = {
  id: string
  fullName?: string
  defaultQuota?: number
  sumAmountEngQuota?: number
  sumAmountEngQuotaBeforePeriod?: number
  sumAmountEngProcessFee?: number
  sumAmountEngProcessFeeBeforePeriod?: number
  sumAmountEngRealWordThisQuarter?: number
  sumAmountEngRealWordBefore?: number
}

export type EngQuotaBurn = {
  id: string
  quarterTariff?: { year?: number; period?: number }
  quarterTypeName?: string
  allotmentRoundTypeName?: string
  quotaDes?: string
  amountBurning?: number
  inspectionDelayFactor?: number
  ertCountBurning?: number
  ertDelayFactor?: number
  des?: string
  approved?: boolean
}

// Body for Quotas/EngQuotaBurnUpdate (inline edit or insert when id is null).
export type QuotaBurnUpdate = {
  id: string | null
  qtId?: string
  engId?: string
  des?: string
  amountBurning?: number
  ertCountBurning?: number
  inspectionDelayFactor?: number
  ertDelayFactor?: number
}
