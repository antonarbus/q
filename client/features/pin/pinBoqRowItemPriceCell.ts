import { dispatch } from '@lib_instances/store'
import { itemsSlice } from '@entities/items'

type Props = {
  itemIndex: number
  rowIndex: number
}

export const pinBoqRowItemPriceCell = ({ itemIndex, rowIndex }: Props): void => {
  dispatch(itemsSlice.actions.pinItemPriceReducer({ itemIndex, rowIndex }))
}
