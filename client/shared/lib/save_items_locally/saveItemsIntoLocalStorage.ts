import type { Item } from '@shared/types'

type Props = {
  items: Item[]
}

export const saveItemsIntoLocalStorage = ({ items }: Props): void => {
  localStorage.setItem('items', JSON.stringify(items))
}
