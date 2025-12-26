import type { SelectQuotation } from '@back/entities/quotation'
import type { BlockItem } from './BlockItem'
import type { PermissionLevel } from '@root-shared/const/permissionLevel'

type QuotationMetaData = SelectQuotation

type QuotationDataInBucket = {
  info: string
  blocks: BlockItem[]
}

type QuotationPermission = {
  permissionLevel: PermissionLevel
}

export type Quotation = QuotationMetaData &
  QuotationDataInBucket &
  QuotationPermission
