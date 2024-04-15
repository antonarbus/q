import { dispatch, getState } from '@lib_instances/store'
import { quotationSlice } from '@entities/quotation'
import { navItemId } from '@shared/consts/navItemId'
import { navSlice } from '@shared/nav'
import type { OnItemResizeStop } from '@shared/types'

export const onPriceItemResizeStop: OnItemResizeStop = ({ itemIndex, e, direction, elementRef, delta }) => {
  const width = parseInt(elementRef.style.width)
  const prevItemWidth = getState().quotation[itemIndex]?.width

  if (width === prevItemWidth) return

  dispatch(quotationSlice.actions.updateItemWidthReducer({ itemIndex, width }))
  dispatch(navSlice.actions.enableNavItems({ navItemIdKeys: [navItemId.save] }))
}
