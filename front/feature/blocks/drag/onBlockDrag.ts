import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { quotationSlice } from '@entity/quotation/redux/quotationSlice'
import { textSlice } from '@shared/lib/tiptap/textSlice'
import { dispatch, getState } from '@shared/lib/redux'
import { arrayMoveImmutable } from 'array-move'

export const onBlockDragStart = (_event: DragStartEvent): void => {
  document.body.style.cursor = 'move'
  dispatch(textSlice.actions.setNotEditable())
}

export const onBlockDragEnd =
  ({ itemIds }: { itemIds: string[] }) =>
  (dragEndEvent: DragEndEvent): void => {
    const persistedScrollX = window.scrollX
    const persistedScrollY = window.scrollY

    // Restore scroll position after React renders
    requestAnimationFrame(() => {
      window.scrollTo(persistedScrollX, persistedScrollY)
    })

    dispatch(textSlice.actions.setEditable())

    document.body.style.removeProperty('cursor')

    if (dragEndEvent.over === null) {
      return
    }

    if (dragEndEvent.active.id === dragEndEvent.over.id) {
      return
    }

    const oldIndex = itemIds.indexOf(String(dragEndEvent.active.id))
    const newIndex = itemIds.indexOf(String(dragEndEvent.over.id))

    const reOrderedItems = arrayMoveImmutable(
      getState().quotation.blocks,
      oldIndex,
      newIndex,
    )

    dispatch(quotationSlice.actions.reOrderBlocksReducer({ reOrderedItems }))
  }
