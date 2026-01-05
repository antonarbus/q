import { getRowFromStore } from '@entities/quotation/redux/getter/getRowFromStore'
import { quotationSlice } from '@entities/quotation/redux/quotationSlice'
import { dispatch } from '@shared/lib/redux'

type Props = {
  blockIndex: number
  rowIndex: number
}

export const showRowPins = (props: Props): void => {
  const row = getRowFromStore({
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
  })

  if (row === undefined) {
    return
  }

  const isItemPricePinShown = row.itemPrice.pin.isShown

  if (isItemPricePinShown === false) {
    dispatch(
      quotationSlice.actions.showCellPinReducer({
        blockIndex: props.blockIndex,
        rowIndex: props.rowIndex,
        cellKey: 'itemPrice',
      }),
    )
  }

  const isQtyPinShown = row.qty.pin.isShown

  if (isQtyPinShown === false) {
    dispatch(
      quotationSlice.actions.showCellPinReducer({
        blockIndex: props.blockIndex,
        rowIndex: props.rowIndex,
        cellKey: 'qty',
      }),
    )
  }
}
