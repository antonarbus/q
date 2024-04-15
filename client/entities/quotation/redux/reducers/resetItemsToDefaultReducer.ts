import { defaultItems } from '../../model/defaultItems'
import { type Quotation } from '../../types'

export const resetItemsToDefaultReducer = (state: Quotation): void => {
  state.items = defaultItems
}
