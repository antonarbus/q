import type { SelectQuotation } from '@back/entities/quotation'
import type { BlockItem } from './BlockItem'

type QuotationMetaData = SelectQuotation

type QuotationFromBucket = {
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
  QuotationFromBucket &
  QuotationPermission
