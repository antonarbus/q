import { dispatch } from '@lib_instances/store'
import { quotationSlice } from '@entities/quotation'

type Props = {
  blockIndex: number
  rowIndex: number
}

export const pinBoqRowPriceCell = ({ blockIndex, rowIndex }: Props): void => {
  dispatch(quotationSlice.actions.pinPriceReducer({ blockIndex, rowIndex }))
}
