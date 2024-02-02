import { dispatch } from '@lib_instances/store'
import { boqRowCellKey, getBoqCellFromStore, itemsSlice, saveItemsLocally } from '@entities/items'

type Props = {
  itemIndex: number
  rowIndex: number
}

export const pinBoqRowItemPriceCell = ({ itemIndex, rowIndex }: Props): void => {
  const itemPrice = getBoqCellFromStore({ itemIndex, rowIndex, boqRowCellKey: boqRowCellKey.itemPrice })
  const isPinned = itemPrice?.pin.isPinned

  if (isPinned) return

  dispatch(itemsSlice.actions.pinItemPriceReducer({ itemIndex, rowIndex }))

  saveItemsLocally({
    msgAboveItemWithIndex: itemIndex,
  })
}
