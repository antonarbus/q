import { ProductSuggestionProvider } from '@front/entities/ai/provider/ProductSuggestionProvider'
import { ProductSuggestionModalContent } from './ProductSuggestionModalContent'

export const ProductSuggestionModal = (): React.JSX.Element => (
  <ProductSuggestionProvider>
    <ProductSuggestionModalContent />
  </ProductSuggestionProvider>
)
