import { quotationSlice } from '@entities/quotation/redux/quotationSlice'
import type { OnBlockResizeStop } from '@shared/lib/re-resizable/resizablePaper'
import { dispatch, getState } from '@shared/lib/redux'

export const onPriceBlockResizeStop: OnBlockResizeStop = (props) => {
  const width = parseInt(props.elementRef.style.width)
  const prevItemWidth = getState().quotation.blocks[props.blockIndex]?.width

  if (width === prevItemWidth) {
    return
  }

  dispatch(
    quotationSlice.actions.updateBlockWidthReducer({ blockIndex: props.blockIndex, width }),
  )
}
