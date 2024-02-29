import { localStorageKey } from '@shared/consts/localStorageKey'
import { jsonParseSafe } from '@shared/lib/jsonParseSafe'
import { defaultItems } from '../model/defaultItems'
import type { Item } from '../types'

export const getDefaultOrLocalItems = (): Item[] => {
  const itemsFromLocalStorage = localStorage.getItem(localStorageKey.items)
  if (itemsFromLocalStorage === null) {
    localStorage.setItem(localStorageKey.items, JSON.stringify(defaultItems))
    return defaultItems
  }
  const items = jsonParseSafe<Item[]>(itemsFromLocalStorage)
  if (items === undefined) {
    localStorage.setItem(localStorageKey.items, JSON.stringify(defaultItems))
    return defaultItems
  }
  return items
}
