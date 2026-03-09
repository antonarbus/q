import type { DragStart, DropResult } from '@hello-pangea/dnd'
import { quotationSlice } from '@entity/quotation/redux/quotationSlice'
import { textSlice } from '@shared/lib/tiptap/store/textSlice'
import { dispatch, getState } from '@shared/lib/redux'
import { lockScrollOnce } from '@shared/lib/lockScrollOnce'
import { arrayMoveImmutable } from 'array-move'

export const onBlockDragStart = (_event: DragStart): void => {
  lockScrollOnce()
  document.body.style.cursor = 'move'
  dispatch(textSlice.actions.setNotEditable())
}

export const onBlockDragEnd =
  ({ itemIds }: { itemIds: string[] }) =>
  (dropResult: DropResult): void => {
    document.body.style.removeProperty('cursor')

    // Delay setEditable until after the DnD drop animation (~200ms), then lock
    // scroll before editors remount so Safari doesn't scroll to the focused editor.
    setTimeout(() => {
      lockScrollOnce()
      dispatch(textSlice.actions.setEditable())
    }, 250)

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
