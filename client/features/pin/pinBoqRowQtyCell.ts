import { dispatch } from '@lib_instances/store'
import { getBoqCellFromStore, itemsSlice, saveItemsLocally } from '@entities/items'

type Props = {
  itemIndex: number
  rowIndex: number
}

export const pinBoqRowQtyCell = ({ itemIndex, rowIndex }: Props): void => {
  const itemPrice = getBoqCellFromStore({ itemIndex, rowIndex, boqRowCellKey: 'qty' })
  const isPinned = itemPrice?.pin.isPinned

  if (isPinned) return

  dispatch(itemsSlice.actions.pinQtyReducer({ itemIndex, rowIndex }))

  saveItemsLocally({
    msgAboveItemWithIndex: itemIndex,
  })
}
