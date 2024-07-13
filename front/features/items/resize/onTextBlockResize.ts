import { dispatch, getState } from '@lib_instances/store'
import {
  fixImagesHeight,
  quotationSlice,
  unfixImagesHeight,
} from '@entities/quotation'
import type {
  OnItemResize,
  OnItemResizeStart,
  OnItemResizeStop,
} from '@shared/types/resizablePaper'

export const onTextBlockResizeStart: OnItemResizeStart = ({
  itemIndex,
  e,
  dir,
  elementRef,
}) => {
  unfixImagesHeight()
}

export const onTextBlockResize: OnItemResize = ({
  itemIndex,
  e,
  direction,
  elementRef,
  delta,
}) => {
  const width = parseInt(elementRef.style.width, 10)
  const prevItemWidth = getState().quotation.blocks[itemIndex]?.width
  if (width === prevItemWidth) return
  dispatch(quotationSlice.actions.updateBlockWidthReducer({ itemIndex, width }))
}

export const onTextBlockResizeStop: OnItemResizeStop = ({
  itemIndex,
  e,
  direction,
  elementRef,
  delta,
}) => {
  fixImagesHeight()
  const width = parseInt(elementRef.style.width, 10)
  const prevItemWidth = getState().quotation.blocks[itemIndex]?.width
  dispatch(quotationSlice.actions.enableFroalaReducer({ itemIndex }))

  if (width === prevItemWidth) return

  dispatch(quotationSlice.actions.updateBlockWidthReducer({ itemIndex, width }))
}
