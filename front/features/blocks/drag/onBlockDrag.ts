import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { quotationSlice } from '@entities/quotation/redux/quotationSlice'
import { textSlice } from '@shared/lib/froala/textSlice'
import { dispatch, getState } from '@shared/lib/redux'
import { arrayMoveImmutable } from 'array-move'

export const onBlockDragStart = (_event: DragStartEvent): void => {
  document.body.style.cursor = 'move'
}

export const onBlockDragEnd =
  ({ itemIds }: { itemIds: string[] }) =>
  (dragEndEvent: DragEndEvent): void => {
    // Save scroll position before setNotEditable
    const { scrollX, scrollY } = window

    // Basically we wish to disable edit on drag start, but drag positions of dnd-kit goes crazy
    // Thus to re-render elements to let them take data from redux we switch edit, which causes blink
    // But I did not find better workaround
    dispatch(textSlice.actions.setNotEditable())

    setTimeout(() => {
      dispatch(textSlice.actions.setEditable())
    })

    // Restore scroll position after React renders
    requestAnimationFrame(() => {
      window.scrollTo(scrollX, scrollY)
    })

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
