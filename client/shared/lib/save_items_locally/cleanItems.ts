import { cleanItem } from 'client/shared/lib/itemsUtils'
import type { Item } from 'client/shared/types'

export const cleanItems = (items: Item[]): Item[] => {
  const modifiableItems = structuredClone(items)
  const itemsWithoutMsg = modifiableItems.map((item) => {
    return cleanItem(item)
  })
  return itemsWithoutMsg
}
