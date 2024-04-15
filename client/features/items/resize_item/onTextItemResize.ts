import { dispatch, getState } from '@lib_instances/store'
import { fixItemImagesHeight, quotationSlice, unfixItemImagesHeight } from '@entities/quotation'
import { navItemId } from '@shared/consts/navItemId'
import { navSlice } from '@shared/nav'
import type { OnItemResize, OnItemResizeStart, OnItemResizeStop } from '@shared/types'

export const onTextItemResizeStart: OnItemResizeStart = ({ itemIndex, e, dir, elementRef }) => {
  unfixItemImagesHeight()
  // dispatch(itemsSlice.actions.disableFroalaReducer({ itemIndex }))
}

export const onTextItemResize: OnItemResize = ({ itemIndex, e, direction, elementRef, delta }) => {
  const width = parseInt(elementRef.style.width)
  const prevItemWidth = getState().items[itemIndex]?.width
  if (width === prevItemWidth) return
  dispatch(quotationSlice.actions.updateItemWidthReducer({ itemIndex, width }))
}

export const onTextItemResizeStop: OnItemResizeStop = ({ itemIndex, e, direction, elementRef, delta }) => {
  fixItemImagesHeight()
  const width = parseInt(elementRef.style.width)
  const prevItemWidth = getState().items[itemIndex]?.width
  dispatch(quotationSlice.actions.enableFroalaReducer({ itemIndex }))

  if (width === prevItemWidth) return

  dispatch(quotationSlice.actions.updateItemWidthReducer({ itemIndex, width }))
  dispatch(navSlice.actions.enableNavItems({ navItemIdKeys: [navItemId.save] }))
}
