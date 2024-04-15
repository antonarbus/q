import { dispatch } from '@lib_instances/store'
import { boqRowCellKey, getBoqCellFromStore, quotationSlice } from '@entities/quotation'
import { navItemId } from '@shared/consts/navItemId'
import { navSlice } from '@shared/nav'

type Props = {
  itemIndex: number
  rowIndex: number
}

export const pinBoqRowQtyCell = ({ itemIndex, rowIndex }: Props): void => {
  const itemPrice = getBoqCellFromStore({ itemIndex, rowIndex, boqRowCellKey: boqRowCellKey.qty })
  const isPinned = itemPrice?.pin.isPinned

  if (isPinned) return

  dispatch(quotationSlice.actions.pinQtyReducer({ itemIndex, rowIndex }))
  dispatch(navSlice.actions.enableNavItems({ navItemIdKeys: [navItemId.save] }))
}
