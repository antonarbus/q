import { dispatch, getState } from '@lib_instances/store'
import { itemsSlice, saveItemsLocally } from '@entities/items'
import type { OnItemResizeStop } from '@shared/types'

export const onPriceItemResizeStop: OnItemResizeStop = ({ itemIndex, e, direction, elementRef, delta }) => {
  const width = parseInt(elementRef.style.width)
  const prevItemWidth = getState().items[itemIndex]?.width

  if (width === prevItemWidth) return

  dispatch(itemsSlice.actions.updateItemWidthReducer({ itemIndex, width }))
  saveItemsLocally({ msgAboveItemWithIndex: itemIndex })
}
