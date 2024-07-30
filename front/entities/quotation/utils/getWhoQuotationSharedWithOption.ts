import {
  sharedWithOption,
  type SharedWithOption,
} from '@shared/consts/sharedWithOption'
import type { Quotation } from '../types'

type Props = {
  quotation: Quotation
}

export const getWhoQuotationSharedWithOption = ({
  quotation,
}: Props): SharedWithOption => {
  if (quotation.sharedWith?.length === 0) {
    return sharedWithOption.nobody
  }

  if (quotation.sharedWith?.includes('*')) {
    return sharedWithOption.everybody
  }

  return sharedWithOption.persons
}
