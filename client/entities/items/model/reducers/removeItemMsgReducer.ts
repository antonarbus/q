import type { ItemsState } from '../itemsSlice'

export const removeItemsMsgReducer = (state: ItemsState): void => {
  state.forEach(item => {
    item.msg = ''
  })
}
