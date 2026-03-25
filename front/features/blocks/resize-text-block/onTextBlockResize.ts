import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import type {
  // OnBlockResize,
  OnBlockResizeStart,
  OnBlockResizeStop,
} from '@front/shared/lib/re-resizable/resizablePaper'
import { reduxHolder } from '@front/shared/lib/redux'

export const onTextBlockResizeStart: OnBlockResizeStart = () => {
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

  const prevItemWidth =
    reduxHolder.getState().quotation.blocks[props.blockIndex]?.width

  if (width === prevItemWidth) {
    return
  }

  reduxHolder.dispatch(
    quotationSlice.actions.updateBlockWidth({
      blockIndex: props.blockIndex,
      width,
    }),
  )
}
