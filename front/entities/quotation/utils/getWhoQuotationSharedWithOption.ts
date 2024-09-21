import {
  sharedWithOption,
  type SharedWithOption,
} from '@shared/consts/sharedWithOption'
import type { Quotation } from '../types'

type Props = {
  quotation: Quotation
}

type Res = SharedWithOption

export const getWhoQuotationSharedWithOption = (props: Props): Res => {
  if (props.quotation.sharedWith === undefined) {
    return sharedWithOption.nobody
  }

  if (props.quotation.sharedWith.length === 0) {
    return sharedWithOption.nobody
  }

  if (props.quotation.sharedWith.includes('*')) {
    return sharedWithOption.everybody
  }

  return sharedWithOption.persons
}
