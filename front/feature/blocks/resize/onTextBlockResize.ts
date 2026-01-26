import { quotationSlice } from '@entity/quotation/redux/quotationSlice'
import type {
  // OnBlockResize,
  OnBlockResizeStart,
  OnBlockResizeStop,
} from '@shared/lib/re-resizable/resizablePaper'
import { dispatch, getState } from '@shared/lib/redux'

export const onTextBlockResizeStart: OnBlockResizeStart = (props) => {
  // nothing yet
}

// const onTextBlockResize: OnBlockResize = ({
//   blockIndex,
//   event,
//   direction,
//   elementRef,
//   delta,
// }) => {
//   // nothing yet
// }

export const onTextBlockResizeStop: OnBlockResizeStop = (props) => {
  const width = parseInt(props.elementRef.style.width)
  const prevItemWidth = getState().quotation.blocks[props.blockIndex]?.width

  // dispatch(
  //   quotationSlice.actions.enableFroalaReducer({
  //     blockIndex: props.blockIndex,
  //   }),
  // )

  if (width === prevItemWidth) {
    return
  }

  dispatch(
    quotationSlice.actions.updateBlockWidthReducer({
      blockIndex: props.blockIndex,
      width,
    }),
  )
}
