import { dispatch, getState } from '@lib_instances/store'
import { quotationSlice } from '@entities/quotation'
import type {
  // OnBlockResize,
  OnBlockResizeStart,
  OnBlockResizeStop,
} from '@shared/types/resizablePaper'

export const onTextBlockResizeStart: OnBlockResizeStart = ({
  blockIndex,
  e,
  dir,
  elementRef,
}) => {
  // nothing yet
}

// export const onTextBlockResize: OnBlockResize = ({
//   blockIndex,
//   e,
//   direction,
//   elementRef,
//   delta,
// }) => {
//   const width = parseInt(elementRef.style.width, 10)
//   const prevItemWidth = getState().quotation.blocks[blockIndex]?.width
//   if (width === prevItemWidth) return
//   dispatch(
//     quotationSlice.actions.updateBlockWidthReducer({ blockIndex, width }),
//   )
// }

export const onTextBlockResizeStop: OnBlockResizeStop = ({
  blockIndex,
  e,
  direction,
  elementRef,
  delta,
}) => {
  const width = parseInt(elementRef.style.width, 10)
  const prevItemWidth = getState().quotation.blocks[blockIndex]?.width
  dispatch(quotationSlice.actions.enableFroalaReducer({ blockIndex }))

  if (width === prevItemWidth) return

  dispatch(
    quotationSlice.actions.updateBlockWidthReducer({ blockIndex, width }),
  )
}
