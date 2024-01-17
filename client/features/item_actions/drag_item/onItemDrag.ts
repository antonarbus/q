import { arrayMoveImmutable } from 'array-move'
import { generalSlice } from '@entities/general'
import { itemsSlice, saveItemsLocally } from '@entities/items'
import { dispatch, getState } from '@shared/clients'

type Props = {
  oldIndex: number
  newIndex: number
}

const onItemDragStart = (): void => {
  document.body.style.cursor = 'move'
  dispatch(generalSlice.actions.disableFroala())
}

const onItemDragEnd = ({ oldIndex, newIndex }: Props): void => {
  dispatch(generalSlice.actions.enableFroala())

  document.body.style.removeProperty('cursor')

  if (oldIndex !== newIndex) {
    const { items } = getState()
    const reOrderedItems = arrayMoveImmutable(items, oldIndex, newIndex)
    dispatch(itemsSlice.actions.reOrderItemsReducer({ reOrderedItems }))
    saveItemsLocally({ msgAboveItemWithIndex: newIndex })
  }
}

export const onItemDrag = {
  start: onItemDragStart,
  end: onItemDragEnd,
}
