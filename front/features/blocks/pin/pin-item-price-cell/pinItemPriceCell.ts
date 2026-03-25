import { getCellFromStoreByIndex } from '@front/entities/quotation/redux/getter/getCellFromStoreByIndex'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { reduxHolder } from '@front/shared/lib/redux'

type Props = {
  blockIndex: number
  rowIndex: number
}

export const pinItemPriceCell = (props: Props): void => {
  const itemPrice = getCellFromStoreByIndex({
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
    cellKey: 'itemPrice',
  })

  const isPinned = itemPrice?.pin.isPinned

  if (isPinned === true) {
    return
  }

  reduxHolder.dispatch(
    quotationSlice.actions.pinItemPrice({
      blockIndex: props.blockIndex,
      rowIndex: props.rowIndex,
    }),
  )
}
