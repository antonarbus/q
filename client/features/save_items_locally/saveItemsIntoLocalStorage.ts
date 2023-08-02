import type { Item } from 'client/entities/items'
import { cleanItems } from './cleanItems'

interface Props { items: Item[] }

export const saveItemsIntoLocalStorage = ({ items }: Props): void => {
  const cleanedItems = cleanItems(items)
  localStorage.setItem('items', JSON.stringify(cleanedItems))
}