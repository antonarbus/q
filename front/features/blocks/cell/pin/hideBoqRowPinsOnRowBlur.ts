import { dispatch } from '@shared/lib/redux'
import type { FocusEvent } from 'react'
import {
  boqRowCellKey,
  getBoqRowFromStore,
  quotationSlice,
} from '@entities/quotation'
import { cls } from '@shared/consts/cls'

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
      quotationSlice.actions.hideBoqRowCellPinReducer({
        blockIndex,
        rowIndex,
        boqRowCellKey: boqRowCellKey.itemPrice,
      }),
    )
  }

  const isQtyPinShown = boqRow.qty.pin.isShown

  if (isQtyPinShown === true) {
    dispatch(
      quotationSlice.actions.hideBoqRowCellPinReducer({
        blockIndex,
        rowIndex,
        boqRowCellKey: boqRowCellKey.qty,
      }),
    )
  }
}
