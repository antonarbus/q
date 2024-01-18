import { dispatch } from '@libras/store'
import { className } from '@shared/className'
import { itemsSlice } from '../redux/itemsSlice'

type Props = {
  itemIndex: number
}

export const saveItemHeightByIndex = ({ itemIndex }: Props): void => {
  const items = document.querySelectorAll(`.${className.paper}`)
  const item = items[itemIndex]
  if (!item) return
  const height = item.clientHeight
  dispatch(itemsSlice.actions.updateItemHeightReducer({ itemIndex, height }))
}
