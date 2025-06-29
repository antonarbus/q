import { dispatch, getState } from '@shared/lib/redux'
import { quotationSlice } from '@entities/quotation'
import type {
  OnBlockResize,
  OnBlockResizeStart,
  OnBlockResizeStop,
} from '@shared/type/resizablePaper'

export const onTextBlockResizeStart: OnBlockResizeStart = ({
  blockIndex,
  event,
  dir,
  elementRef,
}) => {
  // nothing yet
}

export const onTextBlockResize: OnBlockResize = ({
  blockIndex,
  event,
  direction,
  elementRef,
  delta,
}) => {
  // nothing yet
}

export const onTextBlockResizeStop: OnBlockResizeStop = ({
  blockIndex,
  event,
  direction,
  elementRef,
  delta,
}) => {
  const width = parseInt(elementRef.style.width)
  const prevItemWidth = getState().quotation.blocks[blockIndex]?.width
  dispatch(quotationSlice.actions.enableFroalaReducer({ blockIndex }))

  if (width === prevItemWidth) {
    return
  }

  dispatch(
    quotationSlice.actions.updateBlockWidthReducer({ blockIndex, width }),
  )
}
