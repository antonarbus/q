import { dispatch, getState } from '@lib_instances/store'
import { itemsSlice } from '@entities/items'
import { navMenuItemId } from '@shared/consts/navMenuItemId'
import { navSlice } from '@shared/nav'
import type { OnItemResizeStop } from '@shared/types'

export const onPriceItemResizeStop: OnItemResizeStop = ({ itemIndex, e, direction, elementRef, delta }) => {
  const width = parseInt(elementRef.style.width)
  const prevItemWidth = getState().items[itemIndex]?.width

  if (width === prevItemWidth) return

  dispatch(itemsSlice.actions.updateItemWidthReducer({ itemIndex, width }))
  dispatch(navSlice.actions.enableTopNavItem({ navMenuItemIdKey: navMenuItemId.save }))
}
