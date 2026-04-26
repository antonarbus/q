import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import type { OnBlockResizeStop } from '@front/shared/lib/re-resizable/resizablePaper'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'

export const onPaymentBlockResizeStop: OnBlockResizeStop = (props) => {
  const width = Number.parseInt(props.elementRef.style.width, 10)
  const prevWidth = reduxHolder.getState().quotation.blocks[props.blockIndex]?.width

  if (width === prevWidth) {
    return
  }

  reduxHolder.dispatch(
    quotationSlice.actions.updateBlockWidth({ blockIndex: props.blockIndex, width }),
  )
}
