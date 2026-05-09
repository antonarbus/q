import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { SuggestionModal } from './SuggestionModal'

export const Suggestion = (): React.JSX.Element | null => {
  const isOpen = reduxHolder.useSelector((state) => state.suggestion.isOpen)

  if (isOpen === false) {
    return null
  }

  return <SuggestionModal />
}
