import { itemsSlice } from 'client/entities/items'
import { className } from 'client/shared/className'
import { dispatch } from 'client/shared/clients'
import { type FocusEvent } from 'react'

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
  const isPin = elementReceivedFocus?.classList.contains(className.pin)

  if (isPin) return

  dispatch(itemsSlice.actions.hideBoqRowCellPinReducer({
    itemIndex,
    rowIndex,
    boqColumnKey: 'itemPrice',
  }))

  dispatch(itemsSlice.actions.hideBoqRowCellPinReducer({
    itemIndex,
    rowIndex,
    boqColumnKey: 'qty',
  }))
}
