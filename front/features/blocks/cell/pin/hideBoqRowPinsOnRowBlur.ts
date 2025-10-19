import { cellKey } from '@entities/quotation/const/cellKey'
import { getBoqRowFromStore } from '@entities/quotation/redux/getter/getBoqRowFromStore'
import { quotationSlice } from '@entities/quotation/redux/quotationSlice'
import { cls } from '@shared/cls'
import { dispatch } from '@shared/lib/redux'
import type { FocusEvent } from 'react'

type Props = {
  event: FocusEvent<HTMLDivElement>
  blockIndex: number
  rowIndex: number
}

export const hideBoqRowPinsOnRowBlur = ({
  event,
  blockIndex,
  rowIndex,
}: Props): void => {
  const elementReceivedFocus = event.relatedTarget
  const pinClicked = elementReceivedFocus?.classList.contains(cls.pin)

  if (pinClicked === true) {
    return
  }

  const boqRow = getBoqRowFromStore({ blockIndex, rowIndex })

  if (boqRow === undefined) {
    return
  }

  const isItemPricePinShown = boqRow.itemPrice.pin.isShown

  if (isItemPricePinShown === true) {
    dispatch(
      quotationSlice.actions.hideCellPinReducer({
        blockIndex,
        rowIndex,
        cellKey: cellKey.itemPrice,
      }),
    )
  }

  const isQtyPinShown = boqRow.qty.pin.isShown

  if (isQtyPinShown === true) {
    dispatch(
      quotationSlice.actions.hideCellPinReducer({
        blockIndex,
        rowIndex,
        cellKey: cellKey.qty,
      }),
    )
  }
}
