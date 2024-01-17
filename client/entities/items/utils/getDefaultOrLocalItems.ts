import { jsonParseSafe } from '@shared/lib/jsonParseSafe'
import type { Item } from '@shared/types'
import { defaultItems } from '../model/defaultItems'
import type { ItemsState } from '../redux/itemsSlice'

export const getDefaultOrLocalItems = (): ItemsState => {
  const itemsFromLocalStorage = localStorage.getItem('items')
  if (itemsFromLocalStorage === null) return defaultItems
  const items = jsonParseSafe<Item[]>(itemsFromLocalStorage)
  if (items === undefined) return defaultItems
  return items
}
