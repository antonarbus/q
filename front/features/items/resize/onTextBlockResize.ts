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
  blockIndex,
  e,
  dir,
  elementRef,
}) => {
  unfixImagesHeight()
}

export const onTextBlockResize: OnItemResize = ({
  blockIndex,
  e,
  direction,
  elementRef,
  delta,
}) => {
  const width = parseInt(elementRef.style.width, 10)
  const prevItemWidth = getState().quotation.blocks[blockIndex]?.width
  if (width === prevItemWidth) return
  dispatch(
    quotationSlice.actions.updateBlockWidthReducer({ blockIndex, width }),
  )
}

export const onTextBlockResizeStop: OnItemResizeStop = ({
  blockIndex,
  e,
  direction,
  elementRef,
  delta,
}) => {
  fixImagesHeight()
  const width = parseInt(elementRef.style.width, 10)
  const prevItemWidth = getState().quotation.blocks[blockIndex]?.width
  dispatch(quotationSlice.actions.enableFroalaReducer({ blockIndex }))

  if (width === prevItemWidth) return

  dispatch(
    quotationSlice.actions.updateBlockWidthReducer({ blockIndex, width }),
  )
}
