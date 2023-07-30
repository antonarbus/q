import { store } from 'client/shared/clients'
import { cleanItems } from 'utils/itemsUtils'

export const saveItemsIntoLocalStorage = (items = store.getState().items) => {
  const cleanedItems = cleanItems(items)
  localStorage.setItem('items', JSON.stringify(cleanedItems))
  return cleanedItems
}
