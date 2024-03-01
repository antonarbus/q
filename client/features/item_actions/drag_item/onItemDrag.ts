import { dispatch, getState } from '@lib_instances/store'
import { arrayMoveImmutable } from 'array-move'
import { itemsSlice, saveItemsLocally } from '@entities/items'
import { generalSlice } from '@shared/general'
import { markAsNotSaved } from '@shared/isSaved'

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
    markAsNotSaved()
  }
}

export const onItemDrag = {
  start: onItemDragStart,
  end: onItemDragEnd,
}
