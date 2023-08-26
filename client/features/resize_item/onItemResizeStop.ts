import { itemsSlice } from 'client/entities/items'
import { dispatch, getState } from 'client/shared/clients'
import { saveItemsLocally } from 'client/shared/lib'
import type { ResizeCallback } from 're-resizable'

interface Props {
  index: number
}

type FuncReturnType = ResizeCallback | undefined

export const onItemResizeStop =
  ({ index }: Props): FuncReturnType =>
    (e, direction, refToElement): void => {
      const width = parseInt(refToElement.style.width)
      const prevItemWidth = getState().items[index]?.width
      if (width === prevItemWidth) return
      dispatch(itemsSlice.actions.saveItemWidth({ index, width }))
      saveItemsLocally({ msgAboveItemWithIndex: index })
    }
