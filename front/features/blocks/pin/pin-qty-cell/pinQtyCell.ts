import { getCellFromStoreByIndex } from '@front/entities/quotation/redux/getter/getCellFromStoreByIndex'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'

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

  reduxHolder.dispatch(
    quotationSlice.actions.pinQty({
      blockIndex: props.blockIndex,
      rowIndex: props.rowIndex,
    }),
  )
}
