import { AskAiToSuggestRowProvider } from '@front/features/blocks/ask-ai-to-suggest-row/AskAiToSuggestRowProvider'
import { AiSuggestRowModalContent } from './AiSuggestRowModalContent'

export const AiSuggestRowModal = (): React.JSX.Element => (
  <AskAiToSuggestRowProvider>
    <AiSuggestRowModalContent />
  </AskAiToSuggestRowProvider>
)
