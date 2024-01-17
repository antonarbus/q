import { itemsSlice } from '@entities/items'
import { dispatch, getState } from '@shared/clients'
import { saveItemsLocally } from '@shared/lib'
import type { OnItemResizeStart, OnItemResizeStop } from '@shared/types'

export const onTextItemResizeStart: OnItemResizeStart = ({ itemIndex, e, dir, elementRef }) => {
  dispatch(itemsSlice.actions.disableFroalaReducer({ itemIndex }))
}

export const onTextItemResizeStop: OnItemResizeStop = ({ itemIndex, e, direction, elementRef, delta }) => {
  const width = parseInt(elementRef.style.width)
  const prevItemWidth = getState().items[itemIndex]?.width
  dispatch(itemsSlice.actions.enableFroalaReducer({ itemIndex }))

  if (width === prevItemWidth) return

  dispatch(itemsSlice.actions.updateItemWidthReducer({ itemIndex, width }))
  saveItemsLocally({ msgAboveItemWithIndex: itemIndex })
}
