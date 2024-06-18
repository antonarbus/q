import { dispatch } from '@lib_instances/store'
import {
  boqRowCellKey,
  getBoqCellFromStore,
  quotationSlice,
} from '@entities/quotation'

type Props = {
  itemIndex: number
  rowIndex: number
}

export const pinBoqRowItemPriceCell = ({
  itemIndex,
  rowIndex,
}: Props): void => {
  const itemPrice = getBoqCellFromStore({
    itemIndex,
    rowIndex,
    boqRowCellKey: boqRowCellKey.itemPrice,
  })
  const isPinned = itemPrice?.pin.isPinned

  if (isPinned) return

  dispatch(quotationSlice.actions.pinItemPriceReducer({ itemIndex, rowIndex }))
}
