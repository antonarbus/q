import { type Item } from '@shared/types'
import { defaultItems } from '../../model/defaultItems'

export const resetItemsToDefaultReducer = (): Item[] => {
  return defaultItems
}
