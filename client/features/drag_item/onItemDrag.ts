import { arrayMoveImmutable } from 'array-move'
import { copySlice, exitCopyMode } from 'client/entities/copy'
import { itemsSlice } from 'client/entities/items'
import { dispatch, getState } from 'client/shared/clients'
import { saveItemsLocally } from 'client/shared/lib'

interface Props {
  oldIndex: number
  newIndex: number
}

const onItemDragStart = (): void => {
  document.body.style.cursor = 'move'
  dispatch(copySlice.actions.enterIntoCopyMode())
}

const onItemDragEnd = ({ oldIndex, newIndex }: Props): void => {
  // exitCopyMode({ delayed: true })
  // todo: why it is 'copyMode', not good name
  exitCopyMode()
  document.body.style.removeProperty('cursor')

  if (oldIndex !== newIndex) {
    const { items } = getState()
    const reOrderedItems = arrayMoveImmutable(items, oldIndex, newIndex)
    dispatch(itemsSlice.actions.reOrderItems({ reOrderedItems }))
    saveItemsLocally({ msgAboveItemWithIndex: newIndex })
  }
}

export const onItemDrag = {
  start: onItemDragStart,
  end: onItemDragEnd,
}
