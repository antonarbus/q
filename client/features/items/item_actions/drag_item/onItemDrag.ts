import { dispatch, getState } from '@lib_instances/store'
import { arrayMoveImmutable } from 'array-move'
import { isItemsFroalaSignal, itemsSlice } from '@entities/quotation'
import { navItemId } from '@shared/consts/navItemId'
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
    dispatch(navSlice.actions.enableNavItems({ navItemIdKeys: [navItemId.save] }))
  }
}

export const onItemDrag = {
  start: onItemDragStart,
  end: onItemDragEnd,
}
