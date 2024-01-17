import { defaultItems } from '../../model/defaultItems'
import type { ItemsState } from '../itemsSlice'

export const resetItemsToDefaultReducer = (): ItemsState => {
  return defaultItems
}
