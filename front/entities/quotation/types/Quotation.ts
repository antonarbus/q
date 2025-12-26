import type { SelectQuotation } from '@back/entities/quotation'
import type { BlockItem } from './BlockItem'

type QuotationMetaData = SelectQuotation

type QuotationDataInBucket = {
  info: string
  blocks: BlockItem[]
}

type QuotationPermission = {
  permissionLevel:
    | 'PUBLIC'
    | 'SHARED'
    | 'OWNER'
    | 'SUPER_ADMIN'
    | 'SUPER_ADMIN_ON_BEHALF_OF_A_USER'
    | 'FORBIDDEN'
}

export type Quotation = QuotationMetaData &
  QuotationDataInBucket &
  QuotationPermission
