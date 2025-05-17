import { dispatch } from '@shared/lib/redux'
import {
  boqRowCellKey,
  getBoqCellFromStore,
  quotationSlice,
} from '@entities/quotation'

type Props = {
  blockIndex: number
  rowIndex: number
}

export const pinBoqRowItemPriceCell = ({
  blockIndex,
  rowIndex,
}: Props): void => {
  const itemPrice = getBoqCellFromStore({
    blockIndex,
    rowIndex,
    boqRowCellKey: boqRowCellKey.itemPrice,
  })

  const isPinned = itemPrice?.pin.isPinned

  if (isPinned === true) {
    return
  }

  dispatch(quotationSlice.actions.pinItemPriceReducer({ blockIndex, rowIndex }))
}
