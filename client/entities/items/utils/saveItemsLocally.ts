import { dispatch, getState } from '@lib_instances/store'
import { hideBottomMsg, showBottomMsg } from '@shared/bottom_msg'
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

  showBottomMsg('saved locally')

  setTimeout(() => {
    hideBottomMsg()
  }, 2000)

  if (msgAboveItemWithIndex !== undefined) {
    dispatch(itemsSlice.actions.tellItemSavedLocallyReducer({ itemIndex: msgAboveItemWithIndex }))
  }
}
