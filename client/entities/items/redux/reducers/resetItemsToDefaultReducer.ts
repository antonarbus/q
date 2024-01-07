import type { ItemsState } from '../itemsSlice'
import { defaultItems } from '../../model/defaultItems'

export const resetItemsToDefaultReducer = (): ItemsState => {
  return defaultItems
}
