import { dispatch, getState } from '@lib_instances/store'
import { tellItemsSavedLocally } from '@shared/general'
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
  localStorage.setItem('items', JSON.stringify(items))
  tellItemsSavedLocally()

  if (msgAboveItemWithIndex !== undefined) {
    dispatch(itemsSlice.actions.tellItemSavedLocallyReducer({ itemIndex: msgAboveItemWithIndex }))
  }
}
