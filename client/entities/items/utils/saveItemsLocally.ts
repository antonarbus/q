import { getState } from '@lib_instances/store'
import { localStorageKey } from '@shared/consts/localStorageKey'
import { itemKey } from '../consts/itemKey'
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

    if (item.type !== itemKey.boq) return

    item.boq.rows.forEach(boqRow => {
      boqRow.itemPrice.pin.isShown = false
      boqRow.qty.pin.isShown = false
      boqRow.price.pin.isShown = false
    })
  })

  localStorage.setItem(localStorageKey.items, JSON.stringify(cleanedItems))

  if (msgAboveItemWithIndex !== undefined) {
    tellItemSavedLocally({
      itemIndex: msgAboveItemWithIndex,

    })
  }
}
