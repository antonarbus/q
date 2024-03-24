import { dispatch } from '@lib_instances/store'
import { boqRowCellKey, getBoqCellFromStore, itemsSlice } from '@entities/items'
import { navSlice } from '@shared/nav'

type Props = {
  itemIndex: number
  rowIndex: number
}

export const pinBoqRowItemPriceCell = ({ itemIndex, rowIndex }: Props): void => {
  const itemPrice = getBoqCellFromStore({ itemIndex, rowIndex, boqRowCellKey: boqRowCellKey.itemPrice })
  const isPinned = itemPrice?.pin.isPinned

  if (isPinned) return

  dispatch(itemsSlice.actions.pinItemPriceReducer({ itemIndex, rowIndex }))
  dispatch(navSlice.actions.enableTopNavItem({ navMenuItemIdKey: 'save' }))
}
