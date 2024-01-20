import { jsonParseSafe } from '@shared/lib/jsonParseSafe'
import { defaultItems } from '../model/defaultItems'
import type { Item } from '../types'

export const getDefaultOrLocalItems = (): Item[] => {
  const itemsFromLocalStorage = localStorage.getItem('items')
  if (itemsFromLocalStorage === null) return defaultItems
  const items = jsonParseSafe<Item[]>(itemsFromLocalStorage)
  if (items === undefined) return defaultItems
  return items
}
