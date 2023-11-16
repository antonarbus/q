import { copySlice } from 'client/entities/copy'
import { itemsSlice } from 'client/entities/items'
import { dispatch, getState } from 'client/shared/clients'
import { saveItemsLocally } from 'client/shared/lib'
import type { OnItemResizeStop } from 'client/shared/types'

export const onTextItemResizeStart: OnItemResizeStop = ({ itemIndex, e, direction, elementRef, delta }) => {
  dispatch(copySlice.actions.enterIntoCopyMode())
}

export const onTextItemResizeStop: OnItemResizeStop = ({ itemIndex, e, direction, elementRef, delta }) => {
  const width = parseInt(elementRef.style.width)
  const prevItemWidth = getState().items[itemIndex]?.width
  dispatch(copySlice.actions.exitFromCopyMode())

  if (width === prevItemWidth) return

  dispatch(itemsSlice.actions.saveItemWidth({ itemIndex, width }))
  saveItemsLocally({ msgAboveItemWithIndex: itemIndex })
}
