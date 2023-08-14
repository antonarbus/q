import { arrayMoveImmutable } from 'array-move'
import { exitCopyMode } from 'client/entities/copy'
import { reOrderItems } from 'client/entities/items'
import { store } from 'client/shared/clients'
import { saveItemsLocally } from 'client/shared/lib'
import { enterIntoCopyMode } from 'client/entities/copy'

interface IProps {
  oldIndex: number
  newIndex: number
}

const onItemDragStart = (): void => {
  document.body.style.cursor = 'move'
  store.dispatch(enterIntoCopyMode())
}

const onItemDragEnd = ({ oldIndex, newIndex }: IProps): void => {
  // exitCopyMode({ delayed: true })
  exitCopyMode()
  document.body.style.removeProperty('cursor')

  if (oldIndex !== newIndex) {
    const { items } = store.getState()
    const reOrderedItems = arrayMoveImmutable(items, oldIndex, newIndex)
    store.dispatch(reOrderItems({ reOrderedItems }))
    saveItemsLocally({ msgAboveItemWithIndex: newIndex })
  }
}

export const onItemDrag = {
  start: onItemDragStart,
  end: onItemDragEnd,
}
