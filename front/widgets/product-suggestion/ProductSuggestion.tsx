import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { ProductSuggestionModal } from './ProductSuggestionModal'

export const ProductSuggestion = (): React.JSX.Element | null => {
  const isOpen = reduxHolder.useSelector((state) => state.productSuggestion.isOpen)

  if (isOpen === false) {
    return null
  }

  return <ProductSuggestionModal />
}
