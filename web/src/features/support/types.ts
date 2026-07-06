export type SupportTicket = {
  id: string
  ticketNumber?: string
  title?: string
  closed?: boolean
  isRead?: boolean
  name?: string
  toName?: string
  fileNumber?: number | string
  solarCreate?: string
  unreadMessageCount?: number
  userId?: string
  toUserId?: string
}

export type TicketMessage = {
  id: string
  message?: string
  userId?: string
  name?: string
  toName?: string
  solarCreated?: string
  solarCreate?: string
  isSend?: boolean
  support?: {
    title?: string
    fileNumber?: number | string
    closed?: boolean
    isRead?: boolean
    toName?: string
    solarCreate?: string
  }
}

export type SupportUser = {
  id: string
  firstName?: string
  lastName?: string
  name?: string
}

export type SupportFile = {
  id: string
  folderName: string
  fileName: string
  fileTypeName?: string
  fileTypeEnum?: number
}

// Query for Supports/GetSupports (old-ui formInput, serialized).
export type SupportFilter = {
  closed: boolean
  userType: number
  supportListTypeEnum: number // 0 all · 1 received · 2 sent
  SearchUserId?: string
  ticketNumber?: string
}
