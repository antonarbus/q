import type { DragStart, DropResult } from '@hello-pangea/dnd'
import { getRowsFromStore } from '@entity/quotation/redux/getter/getRowsFromStore'
import { quotationSlice } from '@entity/quotation/redux/quotationSlice'
import { textSlice } from '@shared/lib/tiptap/textSlice'
import { dispatch } from '@shared/lib/redux'
import { arrayMoveImmutable } from 'array-move'

export const onRowDragStart =
  ({ blockIndex }: { blockIndex: number }) =>
  (_event: DragStart): void => {
    const persistedScrollX = window.scrollX
    const persistedScrollY = window.scrollY

    // Restore scroll position after React renders
    requestAnimationFrame(() => {
      window.scrollTo(persistedScrollX, persistedScrollY)
    })

    document.body.style.cursor = 'move'
    dispatch(textSlice.actions.setNotEditable())
  }

export const onRowDragEnd =
  ({ blockIndex, rowIds }: { blockIndex: number; rowIds: string[] }) =>
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
    const rows = getRowsFromStore({ blockIndex })

    if (rows === undefined) {
      return
    }

    const reOrderedRows = arrayMoveImmutable(rows, oldIndex, newIndex)

    dispatch(
      quotationSlice.actions.reOrderRowsReducer({ reOrderedRows, blockIndex }),
    )
  }
