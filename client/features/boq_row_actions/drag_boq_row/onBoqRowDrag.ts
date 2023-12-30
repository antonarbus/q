import { arrayMoveImmutable } from 'array-move'
import { getBoqRows, itemsSlice } from 'client/entities/items'
import { dispatch } from 'client/shared/clients'
import { saveItemsLocally } from 'client/shared/lib'

type Props = {
  oldIndex: number
  newIndex: number
  itemIndex: number
}

const onBoqRowDragStart = ({ itemIndex }: Pick<Props, 'itemIndex'>): void => {
  document.body.style.cursor = 'move'
  dispatch(itemsSlice.actions.disableFroala({ itemIndex }))
}

const onBoqRowDragEnd = ({ oldIndex, newIndex, itemIndex }: Props): void => {
  dispatch(itemsSlice.actions.enableFroala({ itemIndex }))

  document.body.style.removeProperty('cursor')

  if (oldIndex !== newIndex) {
    const boqRows = getBoqRows({ itemIndex })
    if (boqRows === undefined) return
    const reOrderedBoqRows = arrayMoveImmutable(boqRows, oldIndex, newIndex)
    dispatch(itemsSlice.actions.reOrderBoqRows({ reOrderedBoqRows, itemIndex }))
    saveItemsLocally({ msgAboveItemWithIndex: itemIndex })
  }
}

export const onBoqRowDrag = {
  start: onBoqRowDragStart,
  end: onBoqRowDragEnd,
}
