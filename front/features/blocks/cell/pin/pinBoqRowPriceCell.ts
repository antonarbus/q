import { dispatch } from '@shared/lib/redux'
import { quotationSlice } from '@entities/quotation'

type Props = {
  blockIndex: number
  rowIndex: number
}

export const pinBoqRowPriceCell = ({ blockIndex, rowIndex }: Props): void => {
  dispatch(quotationSlice.actions.pinPriceReducer({ blockIndex, rowIndex }))
}
