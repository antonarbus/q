import { type QuotationModelType } from '@server/db/models/quotationModel'

export type Quotation = Partial<QuotationModelType> & { id: string | 'local version' }
