import { getRowFromStoreByIndex } from '@front/entities/quotation/redux/getter/getRowFromStoreByIndex'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { dispatch } from '@front/shared/lib/redux'

type Props = {
  blockIndex: number
  rowIndex: number
}

export const showRowPins = (props: Props): void => {
  const row = getRowFromStoreByIndex({
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
  })

  if (row === undefined) {
    return
  }

  const isItemPricePinShown = row.itemPrice.pin.isShown

  if (isItemPricePinShown === false) {
    dispatch(
      quotationSlice.actions.showCellPin({
        blockIndex: props.blockIndex,
        rowIndex: props.rowIndex,
        cellKey: 'itemPrice',
      }),
    )
  }

  const isQtyPinShown = row.qty.pin.isShown

  if (isQtyPinShown === false) {
    dispatch(
      quotationSlice.actions.showCellPin({
        blockIndex: props.blockIndex,
        rowIndex: props.rowIndex,
        cellKey: 'qty',
      }),
    )
  }
}
