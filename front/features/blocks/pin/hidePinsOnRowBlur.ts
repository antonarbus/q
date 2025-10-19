import { cellKey } from '@entities/quotation/const/cellKey'
import { getRowFromStore } from '@entities/quotation/redux/getter/getRowFromStore'
import { quotationSlice } from '@entities/quotation/redux/quotationSlice'
import { cls } from '@shared/cls'
import { dispatch } from '@shared/lib/redux'
import type { FocusEvent } from 'react'

type Props = {
  event: FocusEvent<HTMLDivElement>
  blockIndex: number
  rowIndex: number
}

export const hidePinsOnRowBlur = ({
  event,
  blockIndex,
  rowIndex,
}: Props): void => {
  const elementReceivedFocus = event.relatedTarget
  const pinClicked = elementReceivedFocus?.classList.contains(cls.pin)

  if (pinClicked === true) {
    return
  }

  const row = getRowFromStore({ blockIndex, rowIndex })

  if (row === undefined) {
    return
  }

  const isItemPricePinShown = row.itemPrice.pin.isShown

  if (isItemPricePinShown === true) {
    dispatch(
      quotationSlice.actions.hideCellPinReducer({
        blockIndex,
        rowIndex,
        cellKey: cellKey.itemPrice,
      }),
    )
  }

  const isQtyPinShown = row.qty.pin.isShown

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
