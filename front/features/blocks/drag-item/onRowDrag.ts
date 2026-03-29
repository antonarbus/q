import type { DragStart, DropResult } from '@hello-pangea/dnd'
import { getRowsFromStoreByIndex } from '@front/entities/quotation/redux/getter/getRowsFromStoreByIndex'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { reduxHolder } from '@front/shared/lib/redux'
import { arrayMoveImmutable } from 'array-move'

export const onRowDragStart =
  () =>
  (_event: DragStart): void => {
    document.body.style.cursor = 'move'
  }

export const onRowDragEnd =
  ({ blockIndex }: { blockIndex: number }) =>
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
    const rows = getRowsFromStoreByIndex({ blockIndex })

    if (rows === undefined) {
      return
    }

    const reOrderedRows = arrayMoveImmutable(rows, oldIndex, newIndex)

    reduxHolder.dispatch(quotationSlice.actions.reOrderRows({ reOrderedRows, blockIndex }))
  }
