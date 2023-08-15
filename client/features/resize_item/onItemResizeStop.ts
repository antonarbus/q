import { saveItemWidth } from 'client/entities/items'
import { store } from 'client/shared/clients'
import { saveItemsLocally } from 'client/shared/lib'
import type { ResizeCallback } from 're-resizable'

interface IProps {
  index: number
}

type TResize = ResizeCallback | undefined

export const onItemResizeStop = ({ index }: IProps): TResize => (e, direction, refToElement): void => {
  const width = parseInt(refToElement.style.width)
  const prevItemWidth = store.getState().items[index]?.width
  if (width === prevItemWidth) return
  store.dispatch(saveItemWidth({ index, width }))
  saveItemsLocally({ msgAboveItemWithIndex: index })
}
