import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { dispatch } from '@lib_instances/store'
import { arrayMoveImmutable } from 'array-move'
import {
  getBoqRowsFromStore,
  isDraggingSignal,
  quotationSlice,
} from '@entities/quotation'

export const onBoqRowDragStart =
  ({ blockIndex }: { blockIndex: number }) =>
  (event: DragStartEvent): void => {
    document.body.style.cursor = 'move'
    dispatch(quotationSlice.actions.disableFroalaReducer({ blockIndex }))
    isDraggingSignal.value = true
  }

export const onBoqRowDragEnd =
  ({ blockIndex, boqRowIds }: { blockIndex: number; boqRowIds: string[] }) =>
  (event: DragEndEvent): void => {
    const { active, over } = event

    dispatch(quotationSlice.actions.enableFroalaReducer({ blockIndex }))
    isDraggingSignal.value = false
    document.body.style.removeProperty('cursor')

    if (!over) return
    if (active.id === over.id) return

    const oldIndex = boqRowIds.indexOf(String(active.id))
    const newIndex = boqRowIds.indexOf(String(over.id))
    const boqRows = getBoqRowsFromStore({ blockIndex })
    if (boqRows === undefined) return
    const reOrderedBoqRows = arrayMoveImmutable(boqRows, oldIndex, newIndex)

    dispatch(
      quotationSlice.actions.reOrderBoqRowsReducer({
        reOrderedBoqRows,
        blockIndex,
      }),
    )
  }
