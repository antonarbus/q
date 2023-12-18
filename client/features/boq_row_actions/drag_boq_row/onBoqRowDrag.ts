import { arrayMoveImmutable } from 'array-move'
import { itemsSlice } from 'client/entities/items'
import { dispatch, getState } from 'client/shared/clients'
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
