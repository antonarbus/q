import { jsonParseSafe } from 'client/shared/lib/jsonParseSafe'
import { defaultItems } from '../model/defaultItems'
import type { ItemsState } from '../redux/itemsSlice'
import type { Item } from 'client/shared/types'

export const getDefaultOrLocalItems = (): ItemsState => {
  const itemsFromLocalStorage = localStorage.getItem('items')
  if (itemsFromLocalStorage === null) return defaultItems
  const items = jsonParseSafe<Item[]>(itemsFromLocalStorage)
  if (items === undefined) return defaultItems
  return items
}
