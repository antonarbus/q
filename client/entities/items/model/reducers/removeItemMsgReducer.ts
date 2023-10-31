import type { ItemsState } from '../itemsSlice'

export const removeItemsMsgReducer = (state: ItemsState): void => {
  const items = state
  items.forEach(item => {
    item.msg = ''
  })
}
