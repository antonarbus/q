import { dispatch } from '@lib_instances/store'
import { arrayMoveImmutable } from 'array-move'
import { getBoqRowsFromStore, itemsSlice, saveItemsLocally } from '@entities/items'
import { markAsNotSaved } from '@shared/isSaved'

type Props = {
  oldIndex: number
  newIndex: number
  itemIndex: number
}

const onBoqRowDragStart = ({ itemIndex }: Pick<Props, 'itemIndex'>): void => {
  document.body.style.cursor = 'move'
  dispatch(itemsSlice.actions.disableFroalaReducer({ itemIndex }))
}

const onBoqRowDragEnd = ({ oldIndex, newIndex, itemIndex }: Props): void => {
  dispatch(itemsSlice.actions.enableFroalaReducer({ itemIndex }))

  document.body.style.removeProperty('cursor')

  if (oldIndex !== newIndex) {
    const boqRows = getBoqRowsFromStore({ itemIndex })
    if (boqRows === undefined) return
    const reOrderedBoqRows = arrayMoveImmutable(boqRows, oldIndex, newIndex)
    dispatch(itemsSlice.actions.reOrderBoqRowsReducer({ reOrderedBoqRows, itemIndex }))
    saveItemsLocally({ msgAboveItemWithIndex: itemIndex })
    markAsNotSaved()
  }
}

export const onBoqRowDrag = {
  start: onBoqRowDragStart,
  end: onBoqRowDragEnd,
}
