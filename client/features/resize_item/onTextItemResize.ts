import { dispatch, getState } from '@libras/store'
import { itemsSlice, saveItemsLocally } from '@entities/items'
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
