import { type QuotationModelType } from '@server/db/models/quotationModel'

export type Quotation = {
  isSaved: boolean
  isLocal: boolean
} & Partial<Omit<QuotationModelType, '_id'>>
