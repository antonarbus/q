import { type DragEndEvent, type DragStartEvent } from '@dnd-kit/core'
import { dispatch, getState } from '@lib_instances/store'
import { arrayMoveImmutable } from 'array-move'
import { isFroalaSignal, quotationSlice } from '@entities/quotation'

export const onItemDragStart = (event: DragStartEvent): void => {
  document.body.style.cursor = 'move'
  isFroalaSignal.value = false
}

export const onItemDragEnd =
  ({ itemIds }: { itemIds: string[] }) =>
  (event: DragEndEvent): void => {
    const { active, over } = event

    isFroalaSignal.value = true
    document.body.style.removeProperty('cursor')

    if (!over) return
    if (active.id === over.id) return

    const oldIndex = itemIds.indexOf(String(active.id))
    const newIndex = itemIds.indexOf(String(over.id))
    const items = getState().quotation.items
    const reOrderedItems = arrayMoveImmutable(items, oldIndex, newIndex)
    dispatch(quotationSlice.actions.reOrderItemsReducer({ reOrderedItems }))
  }
