import type { DragStart, DropResult } from '@hello-pangea/dnd'
import { quotationSlice } from '@entity/quotation/redux/quotationSlice'
import { dispatch, getState } from '@shared/lib/redux'
import { arrayMoveImmutable } from 'array-move'

export const onBlockDragStart = (_event: DragStart): void => {
  document.body.style.cursor = 'move'
}

export const onBlockDragEnd =
  ({ itemIds }: { itemIds: string[] }) =>
  (dropResult: DropResult): void => {
    document.body.style.removeProperty('cursor')

    if (dropResult.destination === null) {
      return
    }

    if (dropResult.source.index === dropResult.destination.index) {
      return
    }

    const oldIndex = dropResult.source.index
    const newIndex = dropResult.destination.index

    const reOrderedItems = arrayMoveImmutable(
      getState().quotation.blocks,
      oldIndex,
      newIndex,
    )

    dispatch(quotationSlice.actions.reOrderBlocks({ reOrderedItems }))
  }
