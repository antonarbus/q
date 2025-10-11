import { boqRowCellKey } from '@entities/quotation/const/boqRowCellKey'
import { getBoqCellFromStore } from '@entities/quotation/redux/getter/getBoqCellFromStore'
import { quotationSlice } from '@entities/quotation/redux/quotationSlice'
import { dispatch } from '@shared/lib/redux'

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

  if (isPinned === true) {
    return
  }

  dispatch(quotationSlice.actions.pinQtyReducer({ blockIndex, rowIndex }))
}
