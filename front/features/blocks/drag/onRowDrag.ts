import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { getRowsFromStore } from '@entities/quotation/redux/getter/getRowsFromStore'
import { quotationSlice } from '@entities/quotation/redux/quotationSlice'
import { dispatch } from '@shared/lib/redux'
import { arrayMoveImmutable } from 'array-move'

export const onRowDragStart =
  ({ blockIndex }: { blockIndex: number }) =>
  (_event: DragStartEvent): void => {
    document.body.style.cursor = 'move'
    dispatch(quotationSlice.actions.disableFroalaReducer({ blockIndex }))
  }

export const onRowDragEnd =
  ({ blockIndex, rowIds }: { blockIndex: number; rowIds: string[] }) =>
  (dragEndEvent: DragEndEvent): void => {
    dispatch(quotationSlice.actions.enableFroalaReducer({ blockIndex }))
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
