import type { ItemsState } from '../redux/itemsSlice'

export const removeItemsMsgReducer = (state: ItemsState): ItemsState => {
  const items = state
  items.forEach(item => {
    item.msg = ''
  })

  return items
}
