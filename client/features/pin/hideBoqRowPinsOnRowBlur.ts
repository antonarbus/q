import { itemsSlice } from '@entities/items'
import { className } from '@shared/className'
import { dispatch } from '@shared/clients'
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
