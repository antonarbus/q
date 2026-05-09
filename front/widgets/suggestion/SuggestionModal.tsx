import { SuggestionProvider } from '@front/entities/suggestion/provider/SuggestionProvider'
import { SuggestionModalContent } from './SuggestionModalContent'

export const SuggestionModal = (): React.JSX.Element => (
  <SuggestionProvider>
    <SuggestionModalContent />
  </SuggestionProvider>
)
