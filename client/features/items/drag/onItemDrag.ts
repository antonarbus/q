import { dispatch, getState } from '@lib_instances/store'
import { arrayMoveImmutable } from 'array-move'
import { isFroalaSignal, quotationSlice } from '@entities/quotation'
import { navItemId } from '@shared/consts/navItemId'
import { navSlice } from '@shared/nav'

type Props = {
  oldIndex: number
  newIndex: number
}

const onItemDragStart = (): void => {
  document.body.style.cursor = 'move'
  isFroalaSignal.value = false
}

const onItemDragEnd = ({ oldIndex, newIndex }: Props): void => {
  isFroalaSignal.value = true
  document.body.style.removeProperty('cursor')

  if (oldIndex !== newIndex) {
    const items = getState().quotation.items
    const reOrderedItems = arrayMoveImmutable(items, oldIndex, newIndex)
    dispatch(quotationSlice.actions.reOrderItemsReducer({ reOrderedItems }))
  }
}

export const onItemDrag = {
  start: onItemDragStart,
  end: onItemDragEnd,
}
