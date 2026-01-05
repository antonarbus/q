import { getCellFromStore } from '@entities/quotation/redux/getter/getCellFromStore'
import { quotationSlice } from '@entities/quotation/redux/quotationSlice'
import { dispatch } from '@shared/lib/redux'

type Props = {
  blockIndex: number
  rowIndex: number
}

export const pinItemPriceCell = (props: Props): void => {
  const itemPrice = getCellFromStore({
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
    cellKey: 'itemPrice',
  })

  const isPinned = itemPrice?.pin.isPinned

  if (isPinned === true) {
    return
  }

  dispatch(
    quotationSlice.actions.pinItemPriceReducer({
      blockIndex: props.blockIndex,
      rowIndex: props.rowIndex,
    }),
  )
}
