import { dispatch, getState } from '@lib_instances/store'
import { itemsSlice } from '../redux/itemsSlice'
import type { Item } from '../types'

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
    if (item.type !== 'boq') return
    const boqRows = item.boq.rows
    boqRows.forEach(boqRow => {
      boqRow.itemPrice.pin.isShown = false
      boqRow.qty.pin.isShown = false
      boqRow.price.pin.isShown = false
    })
  })

  localStorage.setItem('items', JSON.stringify(cleanedItems))

  if (msgAboveItemWithIndex !== undefined) {
    dispatch(itemsSlice.actions.showMsgAboveItemReducer({
      itemIndex: msgAboveItemWithIndex,
      msg: 'saved locally',
    }))
  }
}
