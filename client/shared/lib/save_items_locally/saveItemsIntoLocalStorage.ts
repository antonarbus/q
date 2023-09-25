import type { Item } from 'client/shared/types'
import { cleanItems } from './cleanItems'

type Props = {
  items: Item[]
}

export const saveItemsIntoLocalStorage = ({ items }: Props): void => {
  const cleanedItems = cleanItems(items)
  localStorage.setItem('items', JSON.stringify(cleanedItems))
}
