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
  (event: DragEndEvent): void => {
    const { active, over } = event

    // Save scroll position before setNotEditable
    const scrollX = window.scrollX
    const scrollY = window.scrollY

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

    if (over === null) {
      return
    }

    if (active.id === over.id) {
      return
    }

    const oldIndex = itemIds.indexOf(String(active.id))
    const newIndex = itemIds.indexOf(String(over.id))
    const { blocks } = getState().quotation
    const reOrderedItems = arrayMoveImmutable(blocks, oldIndex, newIndex)
    dispatch(quotationSlice.actions.reOrderBlocksReducer({ reOrderedItems }))
  }
