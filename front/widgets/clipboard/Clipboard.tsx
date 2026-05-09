import { ClipboardModal } from './ClipboardModal'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'

export const Clipboard = (): React.JSX.Element | null => {
  const isClipboardModalVisible = reduxHolder.useSelector((state) => state.clipboard.isVisible)

  if (isClipboardModalVisible === false) {
    return null
  }

  return <ClipboardModal />
}
