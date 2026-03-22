import { getCellFromStoreByIndex } from '@front/entities/quotation/redux/getter/getCellFromStoreByIndex'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { dispatch } from '@front/shared/lib/redux'

type Props = {
  blockIndex: number
  rowIndex: number
}

export const pinQtyCell = (props: Props): void => {
  const itemPrice = getCellFromStoreByIndex({
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
    cellKey: 'qty',
  })

  const isPinned = itemPrice?.pin.isPinned

  if (isPinned === true) {
    return
  }

  dispatch(
    quotationSlice.actions.pinQty({
      blockIndex: props.blockIndex,
      rowIndex: props.rowIndex,
    }),
  )
}
