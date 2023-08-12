import type { TItem } from 'client/shared/types'
import { cleanItems } from './cleanItems'

interface IProps {
  items: TItem[]
}

export const saveItemsIntoLocalStorage = ({ items }: IProps): void => {
  const cleanedItems = cleanItems(items)
  localStorage.setItem('items', JSON.stringify(cleanedItems))
}