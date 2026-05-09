import { productSuggestionSlice } from '@front/entities/ai/productSuggestionSlice'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'

export const closeSuggestProductModal = (): void => {
  reduxHolder.dispatch(productSuggestionSlice.actions.close())
}
