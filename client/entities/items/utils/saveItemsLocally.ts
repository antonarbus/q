import { dispatch, getState } from '@lib_instances/store'
import { hideBottomMessage, showBottomMessage } from '@shared/components/bottom_message'
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
  localStorage.setItem('items', JSON.stringify(items))

  showBottomMessage('saved locally')

  setTimeout(() => {
    hideBottomMessage()
  }, 2000)

  if (msgAboveItemWithIndex !== undefined) {
    dispatch(itemsSlice.actions.tellItemSavedLocallyReducer({ itemIndex: msgAboveItemWithIndex }))
  }
}
