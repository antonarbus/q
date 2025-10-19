import { cellKey } from '@entities/quotation/const/cellKey'
import { getBoqCellFromStore } from '@entities/quotation/redux/getter/getBoqCellFromStore'
import { quotationSlice } from '@entities/quotation/redux/quotationSlice'
import { dispatch } from '@shared/lib/redux'

type Props = {
  blockIndex: number
  rowIndex: number
}

export const pinQtyCell = ({ blockIndex, rowIndex }: Props): void => {
  const itemPrice = getBoqCellFromStore({
    blockIndex,
    rowIndex,
    cellKey: cellKey.qty,
  })

  const isPinned = itemPrice?.pin.isPinned

  if (isPinned === true) {
    return
  }

  dispatch(quotationSlice.actions.pinQtyReducer({ blockIndex, rowIndex }))
}
