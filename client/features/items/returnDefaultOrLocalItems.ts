import { jsonSafeParse } from 'utils/jsonSafeParse'
import { defaultItems } from './defaultItems'
import { saveItemsIntoLocalStorage } from './saveItemsIntoLocalStorage'

export const returnDefaultOrLocalItems = () => {
  const items =
    jsonSafeParse(localStorage.getItem('items')) ||
    saveItemsIntoLocalStorage(defaultItems)
  return items
}
