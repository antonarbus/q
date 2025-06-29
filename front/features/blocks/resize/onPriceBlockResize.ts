import { dispatch, getState } from '@shared/lib/redux'
import { quotationSlice } from '@entities/quotation'
import type { OnBlockResizeStop } from '@shared/type/resizablePaper'

export const onPriceBlockResizeStop: OnBlockResizeStop = ({
  blockIndex,
  event,
  direction,
  elementRef,
  delta,
}) => {
  const width = parseInt(elementRef.style.width)
  const prevItemWidth = getState().quotation.blocks[blockIndex]?.width

  if (width === prevItemWidth) {
    return
  }

  dispatch(
    quotationSlice.actions.updateBlockWidthReducer({ blockIndex, width }),
  )
}
