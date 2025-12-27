import type { SelectQuotation } from '@root/back/entities/quotation'
import type { PermissionLevel } from '@root/shared/const/permissionLevel'
import type { BlockItem } from './BlockItem'

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
