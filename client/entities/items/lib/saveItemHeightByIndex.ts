import { store } from 'client/shared/clients'
import { saveItemHeight } from '../model/itemsSlice'
import { className } from 'client/shared/className'

interface IProps {
  index: number
}

export const saveItemHeightByIndex = ({ index }: IProps): void => {
  const items = document.querySelectorAll(`.${className.paper}`)
  const item = items[index]
  if (!item) return
  const height = item.clientHeight
  store.dispatch(saveItemHeight({ index, height }))
}