import { type Item } from '../../types'

export const removeItemsMsgReducer = (state: Item[]): Item[] => {
  const items = state
  items.forEach(item => {
    item.msg = ''
  })

  return items
}
