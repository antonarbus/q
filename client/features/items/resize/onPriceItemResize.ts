import { dispatch, getState } from '@lib_instances/store'
import { quotationSlice } from '@entities/quotation'
import type { OnItemResizeStop } from '@shared/types/resizablePaper'

export const onPriceItemResizeStop: OnItemResizeStop = ({
  itemIndex,
  e,
  direction,
  elementRef,
  delta,
}) => {
  const width = parseInt(elementRef.style.width)
  const prevItemWidth = getState().quotation.items[itemIndex]?.width

  if (width === prevItemWidth) return

  dispatch(quotationSlice.actions.updateItemWidthReducer({ itemIndex, width }))
}
