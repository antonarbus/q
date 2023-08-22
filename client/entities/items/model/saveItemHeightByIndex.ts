import { store } from 'client/shared/clients'
import { itemsSlice } from './itemsSlice'
import { className } from 'client/shared/className'

interface Props {
  index: number
}

export const saveItemHeightByIndex = ({ index }: Props): void => {
  const items = document.querySelectorAll(`.${className.paper}`)
  const item = items[index]
  if (!item) return
  const height = item.clientHeight
  store.dispatch(itemsSlice.actions.saveItemHeight({ index, height }))
}