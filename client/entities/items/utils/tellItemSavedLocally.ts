import { dispatch, getState } from '@lib_instances/store'
import { itemsSlice } from '../redux/itemsSlice'

type Props = {
  itemIndex: number
}

export const tellItemSavedLocally = ({ itemIndex }: Props): void => {
  const item = getState().items[itemIndex]
  if (item === undefined) return
  if (item.msg === 'saved locally') return

  dispatch(itemsSlice.actions.showMsgAboveItemReducer({
    msg: 'saved locally',
    itemIndex,
  }))
}
