import { dispatch, getState } from '@lib_instances/store'
import { quotationSlice } from '@entities/quotation'
import type { OnBlockResizeStop } from '@shared/types/resizablePaper'

export const onPriceBlockResizeStop: OnBlockResizeStop = ({
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
