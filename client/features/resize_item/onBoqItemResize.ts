import { itemsSlice } from '@entities/items'
import { dispatch, getState } from '@shared/clients'
import { saveItemsLocally } from '@shared/lib'
import type { BoqItem, OnItemResize, OnItemResizeStart, OnItemResizeStop } from '@shared/types'

// can be global var for different boqItems as we can change width of one item at a time
let initDescriptionColumnWidth = 0

export const onBoqItemResizeStart: OnItemResizeStart = ({ itemIndex, e, dir, elementRef: itemElement }) => {
  // itemElement.style.width = itemElement.clientWidth + 'px'
  dispatch(itemsSlice.actions.disableFroalaReducer({ itemIndex }))
  dispatch(itemsSlice.actions.hideBoqItemPinsReducer({ itemIndex }))

  initDescriptionColumnWidth = (getState().items[itemIndex] as BoqItem).boq.column.description.width ?? 0
}

export const onBoqItemResize: OnItemResize = ({ itemIndex, e, direction, elementRef: itemElement, delta }) => {
  // const descriptionHeaderElement = itemElement.querySelector('.th.description')
  // if (!(descriptionHeaderElement instanceof HTMLElement)) return

  dispatch(itemsSlice.actions.updateColWidthReducer({
    itemIndex,
    boqColumnKey: 'description',
    width: initDescriptionColumnWidth + delta.width,
  }))

  // dispatch(itemsSlice.actions.updateItemWidthReducer({ itemIndex, width: itemElement.clientWidth }))
}

export const onBoqItemResizeStop: OnItemResizeStop = ({ itemIndex, e, direction, elementRef: itemElement, delta }) => {
  const descriptionHeaderElement = itemElement.querySelector('.th.description')
  if (!(descriptionHeaderElement instanceof HTMLElement)) return

  const descriptionColWidth = descriptionHeaderElement.clientWidth

  dispatch(itemsSlice.actions.updateColWidthReducer({
    itemIndex,
    boqColumnKey: 'description',
    width: descriptionColWidth,
  }))

  dispatch(itemsSlice.actions.enableFroalaReducer({ itemIndex }))

  // setTimeout to make save the width after it will become back to "width: auto"
  // on ResizablePaper component render
  // probably there is a better way to do it, but I am lazy now
  // setTimeout(() => {
  const itemWidth = itemElement.clientWidth
  const prevItemWidth = getState().items[itemIndex]?.width

  if (itemWidth !== prevItemWidth) {
    dispatch(itemsSlice.actions.updateItemWidthReducer({ itemIndex, width: itemWidth }))
  }

  saveItemsLocally({ msgAboveItemWithIndex: itemIndex })
  // }, 50)
}
