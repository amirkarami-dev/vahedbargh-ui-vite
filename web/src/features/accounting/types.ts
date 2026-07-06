export type Transaction = {
  id: string
  amount?: number
  solarCreated?: string
  idSection?: number
  bankTransactionId?: string
  gatewayTypeName?: string
  transactionStatusName?: string
  fileNumber?: number | string
  des?: string
}

export type Invoice = {
  id: string
  engineerName?: string
  engineerNaCode?: string
  amount?: number
  transactionSolarCreated?: string
  solarDateDeliverOffice?: string
  executorName?: string
  fileNumber?: number | string
  transactionDes?: string
}

// POST body for /Transactions/GetClientUserTransactions (old-ui searchQuery).
export type TransactionFilter = {
  transactionStatusEnum: number // 0 deposit · 1 withdraw · 2 both
  page: number
  pageSize: number
  idCity: number
  fileNumber: number
  solarCreated: string
}

export type TransactionsResponse = {
  data: Transaction[]
  totalItems: number
}
