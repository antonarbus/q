import { ItemType, ItemsType } from 'client/features/items/types'

export function cleanItem(item: ItemType) {
  const modifiableItem = structuredClone(item)
  if (modifiableItem.type === 'paste') return modifiableItem
  modifiableItem.msg = ''
  return modifiableItem
}

export function cleanItems(items: ItemsType) {
  const modifiableItems = structuredClone(items)
  const itemsWithoutMsg = modifiableItems.map(item => {
    if (item.type === 'paste') return item
    item.msg = ''
    return item
  })
  return itemsWithoutMsg
}
