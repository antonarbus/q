import { dispatch, getState } from '@shared/clients'
import { saveItemsIntoLocalStorage } from './saveItemsIntoLocalStorage'
import { tellItemsSavedLocally } from './tellItemsSavedLocally'
import { itemsSlice } from '@entities/items'
import type { Item } from '@shared/types'

type Props = {
  items?: Item[]
  msgAboveItemWithIndex?: number
}

export const saveItemsLocally = ({
  items = getState().items,
  msgAboveItemWithIndex,
}: Props = {}): void => {
  saveItemsIntoLocalStorage({ items })
  tellItemsSavedLocally()
  if (msgAboveItemWithIndex !== undefined) {
    dispatch(itemsSlice.actions.tellItemSavedLocallyReducer({ itemIndex: msgAboveItemWithIndex }))
  }
}
