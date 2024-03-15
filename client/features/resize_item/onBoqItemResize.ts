import { dispatch, getState } from '@lib_instances/store'
import { type BoqItem, itemsSlice, saveItemsLocally, getBoqColumnFromStore, boqColumnKey, unfixItemImagesHeight, fixItemImagesHeight } from '@entities/items'
import { navSlice } from '@shared/nav'
import type { OnItemResize, OnItemResizeStart, OnItemResizeStop } from '@shared/types'

let initDescriptionColumnWidth = 0 // can be global var for different boqItems as we can change width of one item at a time

export const onBoqItemResizeStart: OnItemResizeStart = ({ itemIndex, e, dir, elementRef: itemElement }) => {
  unfixItemImagesHeight()
  dispatch(itemsSlice.actions.disableFroalaReducer({ itemIndex }))
  dispatch(itemsSlice.actions.hideBoqItemPinsReducer({ itemIndex }))

  initDescriptionColumnWidth = (getState().items[itemIndex] as BoqItem).boq.column.description.width ?? 0
}

export const onBoqItemResize: OnItemResize = ({ itemIndex, e, direction, elementRef: itemElement, delta }) => {
  const width = initDescriptionColumnWidth + delta.width

  const descriptionColumn = getBoqColumnFromStore({ itemIndex, boqColumnKey: boqColumnKey.description })
  if (descriptionColumn === undefined) return
  const didWidthChange = descriptionColumn.width !== width
  if (!didWidthChange) return

  dispatch(itemsSlice.actions.updateColWidthReducer({ itemIndex, boqColumnKey: boqColumnKey.description, width }))
}

export const onBoqItemResizeStop: OnItemResizeStop = ({ itemIndex, e, direction, elementRef: itemElement, delta }) => {
  fixItemImagesHeight()
  const descriptionHeaderElement = itemElement.querySelector('.th.description')
  if (!(descriptionHeaderElement instanceof HTMLElement)) return

  const width = descriptionHeaderElement.clientWidth
  dispatch(itemsSlice.actions.updateColWidthReducer({ itemIndex, boqColumnKey: boqColumnKey.description, width }))
  dispatch(itemsSlice.actions.enableFroalaReducer({ itemIndex }))

  const itemWidth = itemElement.clientWidth
  const prevItemWidth = getState().items[itemIndex]?.width

  if (itemWidth !== prevItemWidth) {
    dispatch(itemsSlice.actions.updateItemWidthReducer({ itemIndex, width: itemWidth }))
  }

  saveItemsLocally({ msgAboveItemWithIndex: itemIndex })
  dispatch(navSlice.actions.enableTopNavItem({ navMenuItemIdKey: 'save' }))
}
