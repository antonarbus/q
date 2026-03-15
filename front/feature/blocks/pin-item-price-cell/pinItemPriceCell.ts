import { getCellFromStore } from '@entity/quotation/redux/getter/getCellFromStore'
import { quotationSlice } from '@entity/quotation/redux/quotationSlice'
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
    quotationSlice.actions.pinItemPrice({
      blockIndex: props.blockIndex,
      rowIndex: props.rowIndex,
    }),
  )
}
