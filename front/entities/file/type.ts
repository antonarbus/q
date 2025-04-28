export type File = {
  id: string
  name: string
  size: number
  uploadedByEmail: string
  uploadedAt: Date
  usedByDocumentIdList: string[]
}
