import { dispatch } from '@lib_instances/store'
import { quotationSlice } from '@entities/quotation'
import { navItemId } from '@shared/consts/navItemId'
import { navSlice } from '@shared/nav'

type Props = {
  itemIndex: number
  rowIndex: number
}

export const pinBoqRowPriceCell = ({ itemIndex, rowIndex }: Props): void => {
  dispatch(quotationSlice.actions.pinPriceReducer({ itemIndex, rowIndex }))
  dispatch(navSlice.actions.enableNavItems({ navItemIdKeys: [navItemId.save] }))
}
