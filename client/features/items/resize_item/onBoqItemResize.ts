import { dispatch, getState } from '@lib_instances/store'
import { type ItemBoq, quotationSlice, getBoqColumnFromStore, boqColumnKey, unfixItemImagesHeight, fixItemImagesHeight } from '@entities/quotation'
import { navItemId } from '@shared/consts/navItemId'
import { navSlice } from '@shared/nav'
import type { OnItemResize, OnItemResizeStart, OnItemResizeStop } from '@shared/types'

let initDescriptionColumnWidth = 0 // can be global var for different boqItems as we can change width of one item at a time

export const onBoqItemResizeStart: OnItemResizeStart = ({ itemIndex, e, dir, elementRef: itemElement }) => {
  unfixItemImagesHeight()
  dispatch(quotationSlice.actions.disableFroalaReducer({ itemIndex }))
  dispatch(quotationSlice.actions.hideBoqItemPinsReducer({ itemIndex }))

  initDescriptionColumnWidth = (getState().quotation.items[itemIndex] as ItemBoq).boq.column.description.width ?? 0
}

export const onBoqItemResize: OnItemResize = ({ itemIndex, e, direction, elementRef: itemElement, delta }) => {
  const width = initDescriptionColumnWidth + delta.width

  const descriptionColumn = getBoqColumnFromStore({ itemIndex, boqColumnKey: boqColumnKey.description })
  if (descriptionColumn === undefined) return
  const didWidthChange = descriptionColumn.width !== width
  if (!didWidthChange) return

  dispatch(quotationSlice.actions.updateColWidthReducer({ itemIndex, boqColumnKey: boqColumnKey.description, width }))
}

export const onBoqItemResizeStop: OnItemResizeStop = ({ itemIndex, e, direction, elementRef: itemElement, delta }) => {
  fixItemImagesHeight()
  const descriptionHeaderElement = itemElement.querySelector('.th.description')
  if (!(descriptionHeaderElement instanceof HTMLElement)) return

  const width = descriptionHeaderElement.clientWidth
  dispatch(quotationSlice.actions.updateColWidthReducer({ itemIndex, boqColumnKey: boqColumnKey.description, width }))
  dispatch(quotationSlice.actions.enableFroalaReducer({ itemIndex }))

  const itemWidth = itemElement.clientWidth
  const prevItemWidth = getState().quotation.items[itemIndex]?.width

  if (itemWidth !== prevItemWidth) {
    dispatch(quotationSlice.actions.updateItemWidthReducer({ itemIndex, width: itemWidth }))
  }

  dispatch(navSlice.actions.enableNavItems({ navItemIdKeys: [navItemId.save] }))
}
