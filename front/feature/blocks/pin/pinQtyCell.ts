import { getCellFromStore } from '@entity/quotation/redux/getter/getCellFromStore'
import { quotationSlice } from '@entity/quotation/redux/quotationSlice'
import { dispatch } from '@shared/lib/redux'

type Props = {
  blockIndex: number
  rowIndex: number
}

export const pinQtyCell = (props: Props): void => {
  const itemPrice = getCellFromStore({
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
    cellKey: 'qty',
  })

  const isPinned = itemPrice?.pin.isPinned

  if (isPinned === true) {
    return
  }

  dispatch(
    quotationSlice.actions.pinQtyReducer({
      blockIndex: props.blockIndex,
      rowIndex: props.rowIndex,
    }),
  )
}
