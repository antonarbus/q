import { dispatch, getState } from '@lib_instances/store'
import { arrayMoveImmutable } from 'array-move'
import { isItemsFroalaSignal, itemsSlice, saveItemsLocally } from '@entities/items'
import { navSlice } from '@shared/nav'

type Props = {
  oldIndex: number
  newIndex: number
}

const onItemDragStart = (): void => {
  document.body.style.cursor = 'move'
  isItemsFroalaSignal.value = false
}

const onItemDragEnd = ({ oldIndex, newIndex }: Props): void => {
  isItemsFroalaSignal.value = true
  document.body.style.removeProperty('cursor')

  if (oldIndex !== newIndex) {
    const { items } = getState()
    const reOrderedItems = arrayMoveImmutable(items, oldIndex, newIndex)
    dispatch(itemsSlice.actions.reOrderItemsReducer({ reOrderedItems }))
    saveItemsLocally({ msgAboveItemWithIndex: newIndex })
    dispatch(navSlice.actions.enableTopNavItem({ navMenuItemIdKey: 'save' }))
  }
}

export const onItemDrag = {
  start: onItemDragStart,
  end: onItemDragEnd,
}
