import { getState } from '@lib_instances/store'
import { itemType } from '../consts/itemType'
import type { Item } from '../types'
import { tellItemSavedLocally } from './tellItemSavedLocally'

type Props = {
  items?: Item[]
  msgAboveItemWithIndex?: number
}

export const saveItemsLocally = ({
  items = getState().items,
  msgAboveItemWithIndex,
}: Props = {}): void => {
  const cleanedItems = structuredClone(items)
  cleanedItems.forEach(item => {
    item.msg = ''
    item.isFroala = true

    if (item.type !== itemType.boq) return

    item.boq.rows.forEach(boqRow => {
      boqRow.itemPrice.pin.isShown = false
      boqRow.qty.pin.isShown = false
      boqRow.price.pin.isShown = false
    })
  })

  localStorage.setItem('items', JSON.stringify(cleanedItems))

  if (msgAboveItemWithIndex !== undefined) {
    tellItemSavedLocally({
      itemIndex: msgAboveItemWithIndex,

    })
  }
}
