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

export const pinBoqRowQtyCell = ({ blockIndex, rowIndex }: Props): void => {
  const itemPrice = getBoqCellFromStore({
    blockIndex,
    rowIndex,
    boqRowCellKey: boqRowCellKey.qty,
  })

  const isPinned = itemPrice?.pin.isPinned

  if (isPinned) return

  dispatch(quotationSlice.actions.pinQtyReducer({ blockIndex, rowIndex }))
}
