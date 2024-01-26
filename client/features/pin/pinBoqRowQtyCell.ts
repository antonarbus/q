import { dispatch } from '@lib_instances/store'
import { itemsSlice, saveItemsLocally } from '@entities/items'

type Props = {
  itemIndex: number
  rowIndex: number
}

export const pinBoqRowQtyCell = ({ itemIndex, rowIndex }: Props): void => {
  dispatch(itemsSlice.actions.pinQtyReducer({ itemIndex, rowIndex }))

  saveItemsLocally({
    msgAboveItemWithIndex: itemIndex,
  })
}
