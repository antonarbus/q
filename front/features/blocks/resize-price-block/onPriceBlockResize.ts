import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import type { OnBlockResizeStop } from '@front/shared/lib/re-resizable/resizablePaper'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'

export const onPriceBlockResizeStop: OnBlockResizeStop = (props) => {
  const width = Number.parseInt(props.elementRef.style.width, 10)

  const prevItemWidth = reduxHolder.getState().quotation.blocks[props.blockIndex]?.width

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
