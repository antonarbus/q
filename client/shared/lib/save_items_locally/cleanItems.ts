import type { TItem } from 'client/entities/items'
import { cleanItem } from 'utils/itemsUtils'

export function cleanItems(items: TItem[]): TItem[] {
  const modifiableItems = structuredClone(items)
  const itemsWithoutMsg = modifiableItems.map((item) => {
    return cleanItem(item)
  })
  return itemsWithoutMsg
}