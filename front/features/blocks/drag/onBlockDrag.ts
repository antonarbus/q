import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { dispatch, getState } from '@shared/lib/redux'
import { arrayMoveImmutable } from 'array-move'
import { quotationSlice } from '@entities/quotation'
import { textSlice } from '@shared/lib/froala/textSlice'

export const onBlockDragStart = (event: DragStartEvent): void => {
  document.body.style.cursor = 'move'
  dispatch(textSlice.actions.setNotEditable())
}

export const onBlockDragEnd =
  ({ itemIds }: { itemIds: string[] }) =>
  (event: DragEndEvent): void => {
    const { active, over } = event

    dispatch(textSlice.actions.setEditable())

    document.body.style.removeProperty('cursor')

    if (!over) {
      return
    }

    if (active.id === over.id) {
      return
    }

    const oldIndex = itemIds.indexOf(String(active.id))
    const newIndex = itemIds.indexOf(String(over.id))
    const blocks = getState().quotation.blocks
    const reOrderedItems = arrayMoveImmutable(blocks, oldIndex, newIndex)
    dispatch(quotationSlice.actions.reOrderBlocksReducer({ reOrderedItems }))
  }
