import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { getRowsFromStore } from '@entity/quotation/redux/getter/getRowsFromStore'
import { quotationSlice } from '@entity/quotation/redux/quotationSlice'
import { textSlice } from '@shared/lib/tiptap/textSlice'
import { dispatch } from '@shared/lib/redux'
import { arrayMoveImmutable } from 'array-move'

export const onRowDragStart =
  ({ blockIndex }: { blockIndex: number }) =>
  (_event: DragStartEvent): void => {
    const persistedScrollX = window.scrollX
    const persistedScrollY = window.scrollY

    // Restore scroll position after dnd-kit resets it
    requestAnimationFrame(() => {
      window.scrollTo(persistedScrollX, persistedScrollY)
    })

    document.body.style.cursor = 'move'
    dispatch(textSlice.actions.setNotEditable())
  }

export const onRowDragEnd =
  ({ blockIndex, rowIds }: { blockIndex: number; rowIds: string[] }) =>
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

    const oldIndex = rowIds.indexOf(String(dragEndEvent.active.id))
    const newIndex = rowIds.indexOf(String(dragEndEvent.over.id))
    const rows = getRowsFromStore({ blockIndex })

    if (rows === undefined) {
      return
    }

    const reOrderedRows = arrayMoveImmutable(rows, oldIndex, newIndex)

    dispatch(
      quotationSlice.actions.reOrderRowsReducer({ reOrderedRows, blockIndex }),
    )
  }
