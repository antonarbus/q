import { dispatch } from '@lib_instances/store'
import { itemsSlice } from '@entities/quotation'
import { navItemId } from '@shared/consts/navItemId'
import { navSlice } from '@shared/nav'

type Props = {
  itemIndex: number
  rowIndex: number
}

export const pinBoqRowPriceCell = ({ itemIndex, rowIndex }: Props): void => {
  dispatch(itemsSlice.actions.pinPriceReducer({ itemIndex, rowIndex }))
  dispatch(navSlice.actions.enableNavItems({ navItemIdKeys: [navItemId.save] }))
}
