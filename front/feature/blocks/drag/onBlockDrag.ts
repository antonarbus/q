import type { DragStart, DropResult } from '@hello-pangea/dnd'
import { quotationSlice } from '@entity/quotation/redux/quotationSlice'
import { textSlice } from '@shared/lib/tiptap/textSlice'
import { dispatch, getState } from '@shared/lib/redux'
import { arrayMoveImmutable } from 'array-move'

export const onBlockDragStart = (_event: DragStart): void => {
  const persistedScrollX = window.scrollX
  const persistedScrollY = window.scrollY

  // Restore scroll position after React renders
  requestAnimationFrame(() => {
    window.scrollTo(persistedScrollX, persistedScrollY)
  })

  document.body.style.cursor = 'move'
  dispatch(textSlice.actions.setNotEditable())
}

export const onBlockDragEnd =
  ({ itemIds }: { itemIds: string[] }) =>
  (dropResult: DropResult): void => {
    const persistedScrollX = window.scrollX
    const persistedScrollY = window.scrollY

    // Restore scroll position after React renders
    requestAnimationFrame(() => {
      window.scrollTo(persistedScrollX, persistedScrollY)
    })

    dispatch(textSlice.actions.setEditable())
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

    dispatch(quotationSlice.actions.reOrderBlocksReducer({ reOrderedItems }))
  }
