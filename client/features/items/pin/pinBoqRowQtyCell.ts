import { dispatch } from '@lib_instances/store'
import { boqRowCellKey, getBoqCellFromStore, itemsSlice } from '@entities/items'
import { navMenuItemId } from '@shared/consts/navMenuItemId'
import { navSlice } from '@shared/nav'

type Props = {
  itemIndex: number
  rowIndex: number
}

export const pinBoqRowQtyCell = ({ itemIndex, rowIndex }: Props): void => {
  const itemPrice = getBoqCellFromStore({ itemIndex, rowIndex, boqRowCellKey: boqRowCellKey.qty })
  const isPinned = itemPrice?.pin.isPinned

  if (isPinned) return

  dispatch(itemsSlice.actions.pinQtyReducer({ itemIndex, rowIndex }))
  dispatch(navSlice.actions.enableTopNavItem({ navMenuItemIdKey: navMenuItemId.save }))
}
