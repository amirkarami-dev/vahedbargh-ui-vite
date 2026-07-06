export type EngPaymentTask = {
  id: string
  period?: number
  solarCreated?: string
  solarPay?: string
  des?: string
  fromSolar?: string
  toSolar?: string
}

export type EngPaymentInvoice = {
  id: string
  solarCreated?: string
  transaction?: { solarCreated?: string; amount?: number; des?: string }
  electProject?: { id?: string; landlordName?: string }
}

export type EngPaymentRow = {
  id: string
  fullName?: string
  amountSystem?: number
  deduction1?: number
  deduction2?: number
  deduction3?: number
  deduction4?: number
  addition1?: number
  addition2?: number
  sumAmountWithFish?: number
  payByBankReceipt?: boolean
  approved?: boolean
  engineer?: {
    idSection?: number
    naCode?: string
    bankAccountNumber?: string
    fullName?: string
  }
  invoices?: EngPaymentInvoice[]
}

// Body for UpdateEngPaymentList (inline deduction edit).
export type EngPaymentUpdate = {
  id: string
  amountSystem?: number
  deduction2?: number
  deduction3?: number
  deduction4?: number
  addition1?: number
  addition2?: number
  payByBankReceipt?: boolean
}

export type EngPaymentCreate = {
  fromSolar: string
  toSolar: string
  description?: string
}
