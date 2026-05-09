import { ClipboardModal } from './ClipboardModal'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'

export const Clipboard = (): React.JSX.Element | null => {
  const isCopyModalVisible = reduxHolder.useSelector((state) => state.clipboard.isVisible)

  if (isCopyModalVisible === false) {
    return null
  }

  return <ClipboardModal />
}
