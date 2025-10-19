import { cellKey } from '@entities/quotation/const/cellKey'
import { getBoqRowFromStore } from '@entities/quotation/redux/getter/getBoqRowFromStore'
import { quotationSlice } from '@entities/quotation/redux/quotationSlice'
import { dispatch } from '@shared/lib/redux'

type Props = {
  blockIndex: number
  rowIndex: number
}

export const showBoqRowPins = ({ blockIndex, rowIndex }: Props): void => {
  const boqRow = getBoqRowFromStore({ blockIndex, rowIndex })

  if (boqRow === undefined) {
    return
  }

  const isItemPricePinShown = boqRow.itemPrice.pin.isShown

  if (isItemPricePinShown === false) {
    dispatch(
      quotationSlice.actions.showCellPinReducer({
        blockIndex,
        rowIndex,
        cellKey: cellKey.itemPrice,
      }),
    )
  }

  const isQtyPinShown = boqRow.qty.pin.isShown

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
