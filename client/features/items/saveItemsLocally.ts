import { store } from 'client/shared/clients'
import { cleanItems } from 'utils/itemsUtils'
import { resetMsgOnBottom, showMsgOnBottom } from 'client/shared/ui/bottom_msg'
import type { Item } from 'client/entities/items/model/types'
import { tellItemSavedLocally } from 'client/entities/items'

interface Props1 { items: Item[] }

const saveItemsIntoLocalStorage = ({ items }: Props1): void => {
  const cleanedItems = cleanItems(items)
  localStorage.setItem('items', JSON.stringify(cleanedItems))
  return cleanedItems
}


const tellItemsSavedLocally = ({ ms = 2000 } = {}): void => {
  store.dispatch(showMsgOnBottom('saved locally'))
  setTimeout(() => {
    store.dispatch(resetMsgOnBottom())
  }, ms)
}

interface Props2 {
  items?: Item[]
  msgAboveItemWithIndex?: number
}

export const saveItemsLocally = ({
  items = store.getState().items,
  msgAboveItemWithIndex,
}: Props2 = {}): void => {
  saveItemsIntoLocalStorage({ items })
  tellItemsSavedLocally()
  if (msgAboveItemWithIndex !== undefined) {
    store.dispatch(tellItemSavedLocally({ index: msgAboveItemWithIndex }))
  }
}

