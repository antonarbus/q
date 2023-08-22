import { itemsSlice } from 'client/entities/items'
import { store } from 'client/shared/clients'
import { saveItemsLocally } from 'client/shared/lib'
import type { ResizeCallback } from 're-resizable'

interface Props {
  index: number
}

type FuncReturn = ResizeCallback | undefined

export const onItemResizeStop = ({ index }: Props): FuncReturn => (e, direction, refToElement): void => {
  const width = parseInt(refToElement.style.width)
  const prevItemWidth = store.getState().items[index]?.width
  if (width === prevItemWidth) return
  store.dispatch(itemsSlice.actions.saveItemWidth({ index, width }))
  saveItemsLocally({ msgAboveItemWithIndex: index })
}
