import { itemsSlice } from 'client/entities/items'
import { dispatch, getState } from 'client/shared/clients'
import { saveItemsLocally } from 'client/shared/lib'
import type { OnItemResizeStop } from 'client/shared/types'

export const onTextItemResizeStop: OnItemResizeStop = ({ index, e, direction, elementRef, delta }) => {
  const width = parseInt(elementRef.style.width)
  const prevItemWidth = getState().items[index]?.width
  if (width === prevItemWidth) return
  dispatch(itemsSlice.actions.saveItemWidth({ index, width }))
  saveItemsLocally({ msgAboveItemWithIndex: index })
}
