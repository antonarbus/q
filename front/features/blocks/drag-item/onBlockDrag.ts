import type { DragStart, DropResult } from '@hello-pangea/dnd'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { recalculateTotalPrices } from '@front/entities/quotation/util/recalculateTotalPrices'
import { reduxHolder } from '@front/shared/lib/redux'
import { arrayMoveImmutable } from 'array-move'

export const onBlockDragStart = (_event: DragStart): void => {
  document.body.style.cursor = 'move'
}

export const onBlockDragEnd =
  () =>
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
      reduxHolder.getState().quotation.blocks,
      oldIndex,
      newIndex,
    )

    reduxHolder.dispatch(
      quotationSlice.actions.reOrderBlocks({ reOrderedItems }),
    )

    // Deferred so React re-renders first. The editor registry is keyed by blockIndex —
    // reordering blocks changes the price block's index, and its editor stays registered
    // under the old key until PriceValue re-renders with the new blockIndex from context.
    setTimeout(() => {
      recalculateTotalPrices()
    }, 0)
  }
