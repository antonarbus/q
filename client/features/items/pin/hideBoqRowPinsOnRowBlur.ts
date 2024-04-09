import { dispatch } from '@lib_instances/store'
import { type FocusEvent } from 'react'
import { boqRowCellKey, getBoqRowFromStore, itemsSlice } from '@entities/quotation'
import { className } from '@shared/consts/className'

type Props = {
  e: FocusEvent<HTMLDivElement, Element>
  itemIndex: number
  rowIndex: number
}

export const hideBoqRowPinsOnRowBlur = ({
  e,
  itemIndex,
  rowIndex,
}: Props): void => {
  const elementReceivedFocus = e.relatedTarget
  const pinClicked = elementReceivedFocus?.classList.contains(className.pin)

  if (pinClicked) return

  const boqRow = getBoqRowFromStore({ itemIndex, rowIndex })
  if (boqRow === undefined) return

  const isItemPricePinShown = boqRow.itemPrice.pin.isShown

  if (isItemPricePinShown) {
    dispatch(itemsSlice.actions.hideBoqRowCellPinReducer({
      itemIndex,
      rowIndex,
      boqRowCellKey: boqRowCellKey.itemPrice,
    }))
  }

  const isQtyPinShown = boqRow.qty.pin.isShown

  if (isQtyPinShown) {
    dispatch(itemsSlice.actions.hideBoqRowCellPinReducer({
      itemIndex,
      rowIndex,
      boqRowCellKey: boqRowCellKey.qty,
    }))
  }
}
