import { ItemType, ItemsType } from 'client/features/items/types'

export function cleanItem(item: ItemType) {
  const modifiableItem = structuredClone(item)
  modifiableItem.msg = ''
  return modifiableItem
}

export function cleanItems(items: ItemsType) {
  const modifiableItems = structuredClone(items)
  const itemsWithoutMsg = modifiableItems.map(item => {
    item.msg = ''
    return item
  })
  return itemsWithoutMsg
}
