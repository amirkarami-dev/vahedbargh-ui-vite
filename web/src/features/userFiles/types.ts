// A user document row (old-ui lstUserFiles / GridUserFiles).
export type UserFile = {
  id: string // backend Guid
  folderName: string
  fileName: string
  fileTypeName?: string
  fileTypeEnum: number
}
