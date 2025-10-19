import { quotationSlice } from '@entities/quotation/redux/quotationSlice'
import { dispatch } from '@shared/lib/redux'

type Props = {
  blockIndex: number
  rowIndex: number
}

export const pinPriceCell = ({ blockIndex, rowIndex }: Props): void => {
  dispatch(quotationSlice.actions.pinPriceReducer({ blockIndex, rowIndex }))
}
