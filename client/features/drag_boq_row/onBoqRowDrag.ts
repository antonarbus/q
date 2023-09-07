import { arrayMoveImmutable } from 'array-move'
import { copySlice, exitCopyMode } from 'client/entities/copy'
import { itemsSlice } from 'client/entities/items'
import { dispatch, getState } from 'client/shared/clients'
import { saveItemsLocally } from 'client/shared/lib'

interface Props {
  oldIndex: number
  newIndex: number
  itemIndex: number
}

const onBoqRowDragStart = (): void => {
  document.body.style.cursor = 'move'
  dispatch(copySlice.actions.enterIntoCopyMode())
}

const onBoqRowDragEnd = ({ oldIndex, newIndex, itemIndex }: Props): void => {
  exitCopyMode({ delayed: true, delayMs: 500 })
  document.body.style.removeProperty('cursor')

  if (oldIndex !== newIndex) {
    const item = getState().items[itemIndex]
    if (item?.type !== 'boq') return
    const boqRows = item.boq.rows
    const reOrderedBoqRows = arrayMoveImmutable(boqRows, oldIndex, newIndex)
    dispatch(itemsSlice.actions.reOrderBoqRows({ reOrderedBoqRows, itemIndex }))
    saveItemsLocally({ msgAboveItemWithIndex: itemIndex })
  }
}

export const onBoqRowDrag = {
  start: onBoqRowDragStart,
  end: onBoqRowDragEnd,
}
