import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { AiSuggestRowModal } from './AiSuggestRowModal'

export const AiSuggestRow = (): React.JSX.Element | null => {
  const isOpen = reduxHolder.useSelector((state) => state.aiSuggestRow.isOpen)

  if (isOpen === false) {
    return null
  }

  return <AiSuggestRowModal />
}
