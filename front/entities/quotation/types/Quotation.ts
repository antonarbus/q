import type { SelectQuotation } from '@back/entities/quotation'
import type { BlockItem } from './BlockItem'

type QuotationMetaData = SelectQuotation

type QuotationDataInBucket = {
  info: string
  blocks: BlockItem[]
}

type QuotationPermission = {
  permissionLevel?:
    | 'Public'
    | 'Shared with you'
    | 'Owner'
    | 'Super admin'
    | 'Super admin on behalf of a user'
    | 'Forbidden'
}

export type Quotation = QuotationMetaData &
  QuotationDataInBucket &
  QuotationPermission
