import { tellItemsSavedLocally } from '@entities/bottom_msg' // todo: not good
import { dispatch, getState } from '@shared/clients'
import { saveItemsIntoLocalStorage } from '@shared/lib/saveItemsIntoLocalStorage'
import type { Item } from '@shared/types'
import { itemsSlice } from '../redux/itemsSlice'

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
