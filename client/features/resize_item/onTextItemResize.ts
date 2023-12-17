import { appSlice } from 'client/entities/app'
import { itemsSlice } from 'client/entities/items'
import { dispatch, getState } from 'client/shared/clients'
import { saveItemsLocally } from 'client/shared/lib'
import type { OnItemResizeStart, OnItemResizeStop } from 'client/shared/types'

export const onTextItemResizeStart: OnItemResizeStart = ({ itemIndex, e, dir, elementRef }) => {
  dispatch(appSlice.actions.disableFroala())
}

export const onTextItemResizeStop: OnItemResizeStop = ({ itemIndex, e, direction, elementRef, delta }) => {
  const width = parseInt(elementRef.style.width)
  const prevItemWidth = getState().items[itemIndex]?.width
  dispatch(appSlice.actions.enableFroala())

  if (width === prevItemWidth) return

  dispatch(itemsSlice.actions.saveItemWidth({ itemIndex, width }))
  saveItemsLocally({ msgAboveItemWithIndex: itemIndex })
}
