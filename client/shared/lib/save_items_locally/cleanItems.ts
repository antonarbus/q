import { cleanItem } from 'client/shared/lib/itemsUtils'
import type { TItem } from 'client/shared/types'

export const cleanItems = (items: TItem[]): TItem[] => {
  const modifiableItems = structuredClone(items)
  const itemsWithoutMsg = modifiableItems.map((item) => {
    return cleanItem(item)
  })
  return itemsWithoutMsg
}