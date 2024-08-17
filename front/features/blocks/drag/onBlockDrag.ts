import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { dispatch, getState } from '@lib_instances/store'
import { arrayMoveImmutable } from 'array-move'
import {
  isFroalaSignal,
  isDraggingSignal,
  quotationSlice,
} from '@entities/quotation'

export const onBlockDragStart = (event: DragStartEvent): void => {
  document.body.style.cursor = 'move'
  isFroalaSignal.value = false
  isDraggingSignal.value = true
}

export const onBlockDragEnd =
  ({ itemIds }: { itemIds: string[] }) =>
  (event: DragEndEvent): void => {
    const { active, over } = event

    isFroalaSignal.value = true
    isDraggingSignal.value = false
    document.body.style.removeProperty('cursor')

    if (!over) return
    if (active.id === over.id) return

    const oldIndex = itemIds.indexOf(String(active.id))
    const newIndex = itemIds.indexOf(String(over.id))
    const blocks = getState().quotation.blocks
    const reOrderedItems = arrayMoveImmutable(blocks, oldIndex, newIndex)
    dispatch(quotationSlice.actions.reOrderBlocksReducer({ reOrderedItems }))
  }
