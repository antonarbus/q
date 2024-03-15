import { dispatch } from '@lib_instances/store'
import { itemsSlice, saveItemsLocally } from '@entities/items'
import { navSlice } from '@shared/nav'

type Props = {
  itemIndex: number
  rowIndex: number
}

export const pinBoqRowPriceCell = ({ itemIndex, rowIndex }: Props): void => {
  dispatch(itemsSlice.actions.pinPriceReducer({ itemIndex, rowIndex }))
  saveItemsLocally({ msgAboveItemWithIndex: itemIndex })
  dispatch(navSlice.actions.enableTopNavItem({ navMenuItemIdKey: 'save' }))
}
