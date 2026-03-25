import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import type { OnBlockResizeStop } from '@front/shared/lib/re-resizable/resizablePaper'
import { reduxHolder } from '@front/shared/lib/redux'

export const onPriceBlockResizeStop: OnBlockResizeStop = (props) => {
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
