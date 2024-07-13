import { dispatch, getState } from '@lib_instances/store'
import { quotationSlice } from '@entities/quotation'
import type { OnItemResizeStop } from '@shared/types/resizablePaper'

export const onPriceBlockResizeStop: OnItemResizeStop = ({
  itemIndex,
  e,
  direction,
  elementRef,
  delta,
}) => {
  const width = parseInt(elementRef.style.width, 10)
  const prevItemWidth = getState().quotation.blocks[itemIndex]?.width

  if (width === prevItemWidth) return

  dispatch(quotationSlice.actions.updateBlockWidthReducer({ itemIndex, width }))
}
