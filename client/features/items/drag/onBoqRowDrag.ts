import { type DragEndEvent, type DragStartEvent } from '@dnd-kit/core'
import { dispatch } from '@lib_instances/store'
import { arrayMoveImmutable } from 'array-move'
import { getBoqRowsFromStore, quotationSlice } from '@entities/quotation'

export const onBoqRowDragStart =
  ({ itemIndex }: { itemIndex: number }) =>
  (event: DragStartEvent): void => {
    document.body.style.cursor = 'move'
    dispatch(quotationSlice.actions.disableFroalaReducer({ itemIndex }))
  }

export const onBoqRowDragEnd =
  ({ itemIndex, boqRowIds }: { itemIndex: number; boqRowIds: string[] }) =>
  (event: DragEndEvent): void => {
    const { active, over } = event

    if (!over) return
    if (active.id === over.id) return

    const oldIndex = boqRowIds.indexOf(String(active.id))
    const newIndex = boqRowIds.indexOf(String(over.id))
    const boqRows = getBoqRowsFromStore({ itemIndex })
    if (boqRows === undefined) return
    const reOrderedBoqRows = arrayMoveImmutable(boqRows, oldIndex, newIndex)

    dispatch(
      quotationSlice.actions.reOrderBoqRowsReducer({
        reOrderedBoqRows,
        itemIndex,
      }),
    )

    dispatch(quotationSlice.actions.enableFroalaReducer({ itemIndex }))
    document.body.style.removeProperty('cursor')
  }
