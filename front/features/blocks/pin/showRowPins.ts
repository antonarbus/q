import { cellKey } from '@entities/quotation/const/cellKey'
import { getRowFromStore } from '@entities/quotation/redux/getter/getRowFromStore'
import { quotationSlice } from '@entities/quotation/redux/quotationSlice'
import { dispatch } from '@shared/lib/redux'

type Props = {
  blockIndex: number
  rowIndex: number
}

export const showRowPins = ({ blockIndex, rowIndex }: Props): void => {
  const row = getRowFromStore({ blockIndex, rowIndex })

  if (row === undefined) {
    return
  }

  const isItemPricePinShown = row.itemPrice.pin.isShown

  if (isItemPricePinShown === false) {
    dispatch(
      quotationSlice.actions.showCellPinReducer({
        blockIndex,
        rowIndex,
        cellKey: cellKey.itemPrice,
      }),
    )
  }

  const isQtyPinShown = row.qty.pin.isShown

  if (isQtyPinShown === false) {
    dispatch(
      quotationSlice.actions.showCellPinReducer({
        blockIndex,
        rowIndex,
        cellKey: cellKey.qty,
      }),
    )
  }
}
