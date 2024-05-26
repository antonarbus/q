import { dispatch } from '@lib_instances/store'
import { quotationSlice } from '@entities/quotation'

type Props = {
  itemIndex: number
  rowIndex: number
}

export const pinBoqRowPriceCell = ({ itemIndex, rowIndex }: Props): void => {
  dispatch(quotationSlice.actions.pinPriceReducer({ itemIndex, rowIndex }))
}
