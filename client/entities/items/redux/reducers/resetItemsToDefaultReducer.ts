import { defaultItems } from '../../model/defaultItems'
import { type Item } from '../../types'

export const resetItemsToDefaultReducer = (): Item[] => {
  return defaultItems
}
